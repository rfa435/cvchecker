import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('error save data');
  }
};

export const getStorage = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log('error get data');
  }
};
