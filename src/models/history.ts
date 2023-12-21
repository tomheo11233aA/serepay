export interface IHistory {
    id: number;
    side: string;
    amount: number;
    amountMinimum: number;
    userName: string;
    email: string;
    type: number;
    userid: number;
    created_at: string;
    addressWallet: string;
    bankName: string;
    ownerAccount: string;
    numberBank: string;
    symbol: string;
    amountSuccess: number;
}

export interface IType {
    buy: IHistory[],
    sell: IHistory[]
}