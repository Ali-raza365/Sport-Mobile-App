import { create } from "zustand";
import { FETCH_CHAT_LIST_API, FETCH_CHAT_MESSAGES_API } from "../api/apis";
import { handleAxiosError } from "../utils/ErrorHandler";

const ChatStore = create((set) => ({

    chatList: [],
    chatMessage:[],

    fetchChatList: async (detail, token) => {
        try {
            const resp = await FETCH_CHAT_LIST_API(detail, token)
            if (resp?.data) {
                set({ chatList: resp?.data?.chatlist })
                return resp?.data?.chatlist
            } else {
                handleAxiosError(resp.data)
            }
        } catch (error) {
            handleAxiosError(error)
        }
    },
    fetchChatMessages:async (detail, token) => {
        try {
            const resp = await FETCH_CHAT_MESSAGES_API(detail, token)
            if (resp?.data) {
                set({ chatList: resp?.data?.messages||[] })
                return resp?.data?.messages ||[]
            } else {
                handleAxiosError(resp.data)
            }
        } catch (error) {
            handleAxiosError(error)
        }
    },

}))

export default ChatStore