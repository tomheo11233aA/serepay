type BalanceKey = 'btc_balance' | 'eth_balance' | 'usdt_balance' | 'bch_balance' | 'ltc_balance' | 'xrp_balance' | 'bnb_balance' | 'doge_balance' | 'dot_balance' | 'uni_balance' | 'win_balance';

export const getBalanceOfChoosedCoin = (nameCoin: string, userWallet : any) => {
    const balanceKey = `${nameCoin.toLowerCase()}_balance` as BalanceKey;
    return userWallet?.[balanceKey] ?? 0;
}
