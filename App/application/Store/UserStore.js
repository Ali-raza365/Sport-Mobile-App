import { create } from 'zustand';
import { handleAxiosError } from '../utils/ErrorHandler';
import { CHANGE_PASSWORD_API, FORGOT_PASSWORD_API, GET_USER_INFO_API, UPDATE_USER_INFO_API, VERIFY_OTP__API } from '../api/apis';
import {
  _gotoAuthStack,
  _gotoHomeNavigator,
} from '../navigation/navigationServcies';
import React from 'react';

const UserStore = create(set => ({
  token: null,
  user: null,

  loginSucess: user =>
    set({
      user: user?.user,
      token: user?.access_token,
    }),

  signupSucess: user =>
    set({
      user: user?.user,
      token: user?.access_token,
    }),
  splashSucess: async (token, navigation) => {
    try {
      await GET_USER_INFO_API(token)
        .then(resp => {
          // console.log(resp.data)
          if (resp?.data?.user) {
            set({ user: resp?.data?.user, token: token });
            _gotoHomeNavigator(navigation);
          } else {
            _gotoAuthStack(navigation);
          }
        })
        .catch(err => {
          _gotoAuthStack(navigation);
        });
    } catch (error) {
      _gotoAuthStack(navigation);
    }
  },
  updatePrfiler: async (token, detail) => {
    try {
      //   console.log({detail});
      const form = new FormData();
      if (detail?.image) {
        form.append('image', {
          uri: detail?.image?.uri,
          name: detail?.image?.fileName,
          type: detail?.image?.type,
        });
      }
      form.append('fullname', detail?.fullname);
      form.append('avatar', detail?.avatar);
      form.append('username', detail?.username);
      form.append('email', detail?.email);
      form.append('mobile', detail?.mobile);

      let resp = await UPDATE_USER_INFO_API(token, form);
      if (resp?.data) {
        set({ user: resp?.data?.user })
        alert(resp?.data?.msg)
      } else {
        handleAxiosError(resp?.data);
      }
      return resp?.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
  forgotPassword: async (email) => {
    try {
      let resp = await FORGOT_PASSWORD_API({ email })
      return resp?.data
    } catch (error) {
      handleAxiosError(error);
    }
  },
  verifyOTP: async (daitail) => {
    try {
      let resp = await VERIFY_OTP__API(daitail)
      return resp?.data
    } catch (error) {
      handleAxiosError(error);
    }
  },
  changePassword: async (detail) => {
    try {
      let resp = await CHANGE_PASSWORD_API(detail)
      return resp?.data
    } catch (error) {
      handleAxiosError(error);
    }
  },

}));

export default UserStore;
