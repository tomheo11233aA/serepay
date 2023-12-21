import { ImageSourcePropType } from "react-native";

export interface IUserSlice {
    isLogin: boolean;
    language: ILanguage;
    userInfo?: IUserInfo;
    userWallet?: IUserWallet;
}

export interface ILanguage {
    title: string,
    value: string,
    image: ImageSourcePropType,
}

export interface IUserInfo {
    id: number;
    unique_code: string;
    username: string;
    email: string;
    fullname: string;
    first_name: string;
    last_name: string;
    address: string;
    enabled_twofa: number;
}

export interface IUserWallet {
    btc_balance: number;
    eth_balance: number;
    usdt_balance: number;
    bch_balance: number;
    ltc_balance: number;
    xrp_balance: number;
    bnb_balance: number;
    doge_balance: number;
    dot_balance: number;
    uni_balance: number;
    win_balance: number;
}
