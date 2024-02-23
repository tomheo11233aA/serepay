import { ICoin } from "@models/coin"
export const calculateConversionRate = (symbolForm: string, symbolTo: string, coins: ICoin[]) => {
    const priceOfSymbolForm = coins?.find((coin: ICoin) => coin.name === symbolForm)?.price ?? 0
    const priceOfSymbolTo = coins?.find((coin: ICoin) => coin.name === symbolTo)?.price ?? 0
    return (priceOfSymbolForm / priceOfSymbolTo)
}

export const checkPriceOfCoins = (symbolTo: string | undefined, coins: ICoin[]) => {
    const priceOfCoins = coins?.find((coin: ICoin) => coin.name === symbolTo)?.price ?? 0
    return priceOfCoins
}