import { ImageSourcePropType } from "react-native";

export interface IUserSlice {
    isLogin: boolean;
    language: ILanguage;
}

export interface ILanguage {
    title: string,
    value: string,
    image: ImageSourcePropType,
}