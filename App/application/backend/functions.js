import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import { DEFAULT_PICTURE } from '../theme/config';
import { Platform } from 'react-native';




export const _uploadProfilePic = (file) => {
     return new Promise((res, rej) => {
          if (file) {
               const filename = file.substring(file.lastIndexOf('/') + 1);
               const uploadUri = Platform.OS === 'ios' ? file.replace('file://', '') : file;
               const task = storage();

               task.ref("ProfilePictures/" + filename).putFile(uploadUri).then(async (result) => {
                    // res(result)
                    const url = await task.ref("ProfilePictures/" + filename).getDownloadURL()
                    // console.log(url)
                    res(url)
                    console.log("Success")
               }).catch((err) => {
                    rej(err)
                    console.log({ err })
               })
          }
          else {
               res("")
          }
     })
}

export const _createUser = (number, userName, profilePic, userId) => {
     return new Promise((res, rej) => {
          const newRef = database().ref("/users").push();
          newRef.set({
               phoneNumber: number,
               userName: userName,
               profilePic: profilePic == "" ? DEFAULT_PICTURE : profilePic,
               isOnline: false,
               userId: userId
          }).then((result) => {
               res(true)
               console.log("Success")
          }).catch((err) => {
               console.log(err)
               rej(err)
          })
     })
}