import { RootState } from "@redux/store/store";

export const isLoginUserSelector = (state: RootState) => state.user.isLogin

export const languageUserSelector = (state: RootState) => state.user.language 

export const userInfoUserSelector = (state: RootState) => state.user.userInfo

export const userWalletUserSelector = (state: RootState) => state.user.userWallet

export const coinListSelector = (state: RootState) => state.coin

export const exchangeRateSelector = (state: RootState) => state.exchangeRate

export const historySelector = (state: RootState) => state.history

export const adsBuySelector = (state: RootState) => state.history.buy

export const adsSellSelector = (state: RootState) => state.history.sell

export const configSelector = (state: RootState) => state.config.data

export const selectedRateSelector = (state: RootState) => state.user.selectedRate