import { create } from "zustand"
import { handleAxiosError } from "../utils/ErrorHandler"
import { GET_USER_INFO_API } from "../api/apis"
import { _gotoAuthStack, _gotoHomeNavigator } from "../navigation/navigationServcies";
import React from "react";

const UserStore = create((set) => ({

    token: null,
    user: null,

    loginSucess: (user) => set({
        user: user?.user,
        token: user?.access_token
    }),

    signupSucess: (user) => set({
        user: user?.user,
        token: user?.access_token
    }),

    splashSucess: async (token, navigation) => {
        try {
            await GET_USER_INFO_API(token).then((resp) => {
                // console.log(resp.data)
                if (resp?.data?.user) {
                    set({ user: resp?.data?.user, token: token })
                    _gotoHomeNavigator(navigation);
                } else {
                    _gotoAuthStack(navigation)
                }

            }).catch((err) => {
                _gotoAuthStack(navigation)
            })
        } catch (error) {
            _gotoAuthStack(navigation)
        }

    }
    // fetchUsers: async () => {
    //     set((state) => ({ ...state, loading: true }))
    //     try {
    //         const res = await fetch("https://jsonplaceholder.typicode.com/users")
    //         const users = await res.json()
    //         set((state) => ({ ...state, error: "", users }))
    //     } catch (error) {
    //         set((state) => ({
    //             ...state,
    //             error: error.message,
    //         }))
    //     } finally {
    //         set((state) => ({
    //             ...state,
    //             loading: false,
    //         }))
    //     }
    // },

    // In our example we only need to fetch the users, but you'd probably want to define other methods here
    // addUser: async (user) => { },
    // updateUser: async (user) => { },
    // deleteUser: async (id) => { },
}))

export default UserStore