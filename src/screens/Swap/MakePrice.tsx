import Box from '@commom/Box'
import React, { useMemo, useState, useCallback, useEffect } from 'react'
import ItemConver from './ItemConver'
import Warn from './Warn'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { ICoin } from '@models/coin'
import CoinModal from '@commom/Modal/CoinModal'
import { coinListSelector } from '@redux/selector/userSelector'
import { swapCoinApi } from '@utils/userCallApi'
import { ISwap } from '@models/SWAP/swap'
import { keys } from '@contants/keys'
import { getBalanceOfChoosedCoin } from '../../helper/function/getBalanceOfChoosedCoin'
import { userWalletUserSelector } from '@redux/selector/userSelector'
import { useCoinSocket } from '../../helper/useCoinSocket'
import { calculateConversionRate, checkPriceOfCoins } from '../../helper/function/calculateConversionRate'
import LottieView from 'lottie-react-native';
import { fetchUserWallet } from '@redux/slice/userSlice'
import { useAppDispatch } from '@hooks/redux'
import { AppDispatch } from '@redux/store/store'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { roundDecimalValues } from '@helper/function/roundCoin'

interface Props {
    t: any;
}

export const roundCoin = (coin: number) => {
    if (coin > 10000) {
        return coin.toFixed(8)
    } else if (coin > 100) {
        return coin.toFixed(6)
    } else {
        return coin.toFixed(2)
    }
}

const MakePrice = ({ t }: Props) => {
    useCoinSocket()
    const dispatch: AppDispatch = useAppDispatch()
    const coins = useSelector(coinListSelector)
    const userWallet = useSelector(userWalletUserSelector)
    const [symbolForm, setSymbolForm] = useState<string>('USDT')
    const [symbolTo, setSymbolTo] = useState<string>('USDT')
    const balance = useMemo(() => getBalanceOfChoosedCoin(symbolForm, userWallet), [symbolForm, userWallet])
    const [amountForm, setAmountForm] = useState<string>('0')
    const [amountTo, setAmountTo] = useState<string>('0')
    const [iconForm, setIconForm] = useState<string>('images/USDT.png')
    const [iconTo, setIconTo] = useState<string>('images/USDT.png')
    const [visible, setVisible] = useState(false);
    const showModal = useCallback(() => setVisible(true), [])
    const hideModal = useCallback(() => setVisible(false), [])
    const [isChoosingForSymbolTo, setIsChoosingForSymbolTo] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [priceOfCoins, setPriceOfCoins] = useState<number>(0)
    useEffect(() => {
        const conversionRate = calculateConversionRate(symbolForm, symbolTo, coins)
        const checkPrice = checkPriceOfCoins(symbolTo, coins)
        setPriceOfCoins(checkPrice)
        const amountTo = parseFloat(amountForm) * Number(conversionRate);
        setAmountTo(roundDecimalValues(amountTo, checkPrice))
    }, [amountForm, symbolForm, symbolTo, coins])

    const swapSymbol = useCallback(() => {
        const currentFrom = symbolForm
        const currentTo = symbolTo
        const currentIconForm = iconForm
        const currentIconTo = iconTo
        setIconForm(currentIconTo)
        setIconTo(currentIconForm)
        setSymbolForm(currentTo)
        setSymbolTo(currentFrom)
    }, [symbolForm, symbolTo])

    const showModalForSymbolForm = useCallback(() => {
        setIsChoosingForSymbolTo(false);
        showModal();
    }, [showModal]);

    const showModalForSymbolTo = useCallback(() => {
        setIsChoosingForSymbolTo(true);
        showModal();
    }, [showModal]);

    const changeCoin = useCallback(async (coin: ICoin) => {
        if (isChoosingForSymbolTo) {
            setSymbolTo(coin?.name ?? 'ETH')
            setIconTo(coin?.image ?? '')
            await AsyncStorage.setItem('coinTo', coin?.name ?? 'ETH')
        } else {
            setSymbolForm(coin?.name ?? 'BTC')
            setIconForm(coin?.image ?? '')
            await AsyncStorage.setItem('coinFrom', coin?.name ?? 'BTC')
        }
        hideModal()
    }, [hideModal, isChoosingForSymbolTo])
    const swapCoin = useCallback(async (swapData: ISwap) => {
        setIsLoading(true)
        try {
            const res: any = await swapCoinApi(swapData)
            dispatch(fetchUserWallet())
            Alert.alert(t(res?.message) ?? t('Successful coin conversion! '))
        } catch (error) {
            Alert.alert(t('Insufficient balance!'))
        }
        setIsLoading(false)
    }, [])

    const confirmSwap = () => {
        Alert.alert(
            t('Confirm Swap'),
            t('Do you want to exchange') + ` ${amountForm} ${symbolForm} ${t('for')} ${amountTo} ${symbolTo}?`,
            [
                {
                    text: t("Cancel"),
                    style: "destructive"
                },
                {
                    text: t("Swap"),
                    style: "default",
                    onPress: () => {
                        swapCoin({
                            symbolForm: symbolForm,
                            symbolTo: symbolTo,
                            amountForm: amountForm,
                        })
                        setAmountForm('0')
                    }
                }
            ]
        );
    }

    return (
        <Box>
            {isLoading && (
                <LottieView
                    source={require('@lottie/loading.json')}
                    autoPlay
                    loop
                />
            )}
            <CoinModal visible={visible} hideModal={hideModal} t={t} handleChooseCoin={changeCoin} />
            <ItemConver
                symbol={symbolForm}
                title={t('Amount of') + ` ${symbolForm}`}
                icon={iconForm ? { uri: `${keys.HOSTING_API}${iconForm}` } : require('@images/wallet/bitcoin.png')}
                value={amountForm}
                setValue={setAmountForm}
                changeCoin={showModalForSymbolForm}
            />
            <Box
                top={3}
                row
                justifySpaceBetween>
                <Txt
                    marginTop={10}
                    color={'#999999'}>
                    {t('Balance')} {roundCoin(balance)} {symbolForm}
                </Txt>
                <Btn
                    radius={5}
                    padding={10}
                    backgroundColor={colors.gray5}
                    onPress={() => setAmountForm(roundCoin(balance))}
                >
                    <Txt>
                        {`${t('Max')} `}
                    </Txt>
                </Btn>
            </Box>

            <ItemConver
                symbol={symbolTo}
                iconConvert={true}
                title={t('Amount of') + ` ${symbolTo}`}
                icon={iconTo ? { uri: `${keys.HOSTING_API}${iconTo}` } : require('@images/wallet/eth.png')}
                readonly={true}
                changeCoin={showModalForSymbolTo}
                value={amountTo === 'NaN' ? '0' : amountTo}
                swapSymbol={swapSymbol}
            />
            <Box
                top={3}
                row
                justifySpaceBetween>
                <Txt
                    marginTop={10}
                    color={'#999999'}>
                    {`1 ${symbolForm} = ${roundDecimalValues(calculateConversionRate(symbolForm, symbolTo, coins), priceOfCoins)} ${symbolTo}`}
                </Txt>
            </Box>

            <Btn
                height={hp('5%')}
                width={wp('90%')}
                radius={5}
                alignSelf={'center'}
                paddingVertical={7}
                paddingHorizontal={25}
                backgroundColor={colors.violet}
                marginTop={20}
                onPress={() => {
                    confirmSwap()
                }}
            >
                <Txt color={'white'} size={18}>
                    {t('Swap')}
                </Txt>
            </Btn>
            <Warn
                title={t('The final amount you receive may be slightly different due to market volatility')}
            />
            <Warn
                title={t('Swap Fee 0.25% implementation and has been deducted from the estimate above')}
            />
        </Box>
    )
}

export default React.memo(MakePrice)