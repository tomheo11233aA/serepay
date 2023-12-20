import { RootState } from "@redux/store/store";

export const isLoginUserSelector = (state: RootState) => state.user.isLogin

export const languageUserSelector = (state: RootState) => state.user.language 

export const userInfoUserSelector = (state: RootState) => state.user.userInfo

export const userWalletUserSelector = (state: RootState) => state.user.userWallet

export const coinListSelector = (state: RootState) => state.coin