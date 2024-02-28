import { MMKV } from "react-native-mmkv"
import { Storage } from "redux-persist";

export const localStorage = new MMKV({ id: 'local' })

const storage = new MMKV();

const reduxStorage: Storage = {
  setItem: (key:string, value:any) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key:string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key:string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export default reduxStorage;