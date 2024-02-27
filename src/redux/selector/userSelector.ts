import { RootState } from "@redux/store/store";

export const isLoginUserSelector = (state: RootState) => state.user.isLogin

export const languageUserSelector = (state: RootState) => state.user.language 

export const userInfoUserSelector = (state: RootState) => state.user.userInfo

export const userWalletUserSelector = (state: RootState) => state.user.userWallet

export const coinListSelector = (state: RootState) => state.coin.coins

export const exchangeRateSelector = (state: RootState) => state.exchangeRate

export const historySelector = (state: RootState) => state.history

export const adsBuySelector = (state: RootState) => state.history.buy

export const adsSellSelector = (state: RootState) => state.history.sell

export const configSelector = (state: RootState) => state.config.data

export const config2Selector = (state: RootState) => state.config.data2

export const config3Selector = (state: RootState) => state.config.data3

export const selectedRateSelector = (state: RootState) => state.user.selectedRate

export const socketConnectedSelector = (state: RootState) => state.coin.connected

export const listAdsBuyToUserSelector = (state: RootState) => state.advertising.listAdsBuyToUser

export const listAdsBuyPenddingToUserSelector = (state: RootState) => state.advertising.listAdsBuyPenddingToUser

export const listAdsSellToUserSelector = (state: RootState) => state.advertising.listAdsSellToUser

export const listAdsSellPenddingToUserSelector = (state: RootState) => state.advertising.listAdsSellPenddingToUser

export const notificationSelector = (state: RootState) => state.notification.count

export const bankSelector = (state: RootState) => state.bank.banks

export const isTokenExpiredSelector = (state: RootState) => state.user.isTokenExpired