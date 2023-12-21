// export const getBalanceOfChoosedCoin = (nameCoin: string, userWallet : any) => {
//     if (nameCoin === 'BTC') {
//         return userWallet?.btc_balance ?? 0
//     } else if (nameCoin === 'ETH'){
//         return userWallet?.eth_balance ?? 0
//     } else if (nameCoin === 'USDT'){
//         return userWallet?.usdt_balance ?? 0
//     }   else if (nameCoin === 'BCH'){
//         return userWallet?.bch_balance ?? 0
//     }  else if (nameCoin === 'XRP'){
//         return userWallet?.xrp_balance ?? 0
//     } else if (nameCoin === 'LTC'){
//         return userWallet?.ltc_balance ?? 0
//     } else if (nameCoin === 'XRP') {
//         return userWallet?.xrp_balance ?? 0
//     } else if (nameCoin === 'BNB') {
//         return userWallet?.bnb_balance ?? 0
//     } else if (nameCoin === 'DOGE') {
//         return userWallet?.doge_balance ?? 0
//     } else if (nameCoin === 'DOT') {
//         return userWallet?.dot_balance ?? 0
//     } else if (nameCoin === 'UNI') {
//         return userWallet?.uni_balance ?? 0
//     } else if (nameCoin === 'WIN') {
//         return userWallet?.win_balance ?? 0
//     } else {
//         return userWallet?.btc_balance ?? 0
//     }

// }


type BalanceKey = 'btc_balance' | 'eth_balance' | 'usdt_balance' | 'bch_balance' | 'ltc_balance' | 'xrp_balance' | 'bnb_balance' | 'doge_balance' | 'dot_balance' | 'uni_balance' | 'win_balance';

export const getBalanceOfChoosedCoin = (nameCoin: string, userWallet : any) => {
    const balanceKey = `${nameCoin.toLowerCase()}_balance` as BalanceKey;
    return userWallet?.[balanceKey] ?? 0;
}