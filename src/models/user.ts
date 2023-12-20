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
    bnb_balance: number;
    usdt_balance: number;
    block_token_balance: number;
    stf_trc20_balance: number;
    vnd_balance: number;
    usd_balance: number;
    btc_balance: number;
    eth_balance: number;
    ltc_balance: number;
}
