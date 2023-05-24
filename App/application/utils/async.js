import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * function that will set a value in async storage
 * @param {string} key 
 * @param {string} value 
 */
export const _setItem = (key, value) => {
     return new Promise(async (resolve, reject) => {
          await AsyncStorage.setItem(key, value)
               .then(() => {
                    resolve(true);
               })
               .catch((err) => {
                    reject(err);
               })
     })
}

/**
 * function that will get a value from async storage
 * @param {string} key 
 */
export const _getItem = (key) => {
     return new Promise(async (resolve, reject) => {
          await AsyncStorage.getItem(key)
               .then((data) => {
                    resolve(data);
               })
               .catch((err) => {
                    reject(err);
               })
     })
}