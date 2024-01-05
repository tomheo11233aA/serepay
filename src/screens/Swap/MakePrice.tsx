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
import { calculateConversionRate } from '../../helper/function/calculateConversionRate'
import LottieView from 'lottie-react-native';
import { fetchUserWallet } from '@redux/slice/userSlice'
import { useAppDispatch } from '@hooks/redux'
import { AppDispatch } from '@redux/store/store'

interface Props {
    t: any;
}

const MakePrice = ({ t }: Props) => {
    useCoinSocket()
    const dispatch: AppDispatch = useAppDispatch()
    const coins = useSelector(coinListSelector)
    const userWallet = useSelector(userWalletUserSelector)
    const [symbolForm, setSymbolForm] = useState<string>('BTC')
    const [symbolTo, setSymbolTo] = useState<string>('ETH')
    const balance = useMemo(() => getBalanceOfChoosedCoin(symbolForm, userWallet), [symbolForm, userWallet])
    const [amountForm, setAmountForm] = useState<string>('0')
    const [amountTo, setAmountTo] = useState<string>('0')
    const [iconForm, setIconForm] = useState<string>('images/BTC.png')
    const [iconTo, setIconTo] = useState<string>('images/ETH.png')
    const [visible, setVisible] = useState(false);
    const showModal = useCallback(() => setVisible(true), [])
    const hideModal = useCallback(() => setVisible(false), [])
    const [isChoosingForSymbolTo, setIsChoosingForSymbolTo] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    useEffect(() => {
        const conversionRate = calculateConversionRate(symbolForm, symbolTo, coins)
        const amountTo = parseFloat(amountForm) * Number(conversionRate);
        setAmountTo(amountTo.toLocaleString())
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

    const changeCoin = useCallback((coin: ICoin) => {
        if (isChoosingForSymbolTo) {
            setSymbolTo(coin?.name ?? 'ETH')
            setIconTo(coin?.image ?? '')
        } else {
            setSymbolForm(coin?.name ?? 'BTC')
            setIconForm(coin?.image ?? '')
        }
        hideModal()
    }, [hideModal, isChoosingForSymbolTo])
    const swapCoin = useCallback(async (swapData: ISwap) => {
        setIsLoading(true)
        try {
            const res = await swapCoinApi(swapData)
            dispatch(fetchUserWallet())
            Alert.alert(res?.data?.message ?? 'Successful coin conversion!')
        } catch (error) {
            Alert.alert('Insufficient balance! ')
            console.log(error)
        } 
        setIsLoading(false)
    }, [])

    return (
        <Box>
            {isLoading && (
                <LottieView
                    source={require('../../assets/lottie/loading.json')}
                    autoPlay
                    loop
                />
            )}
            <CoinModal visible={visible} hideModal={hideModal} t={t} handleChooseCoin={changeCoin} />
            <ItemConver
                symbol={symbolForm}
                title={`Amount of ${symbolForm}`}
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
                    {`Balance: ${balance.toLocaleString()} ${symbolForm}`}
                </Txt>
                <Btn
                    radius={5}
                    padding={10}
                    backgroundColor={colors.gray5}
                    onPress={() => setAmountForm(balance.toFixed(8))}
                >
                    <Txt>
                        {`${t('Max')} `}
                    </Txt>
                </Btn>
            </Box>

            <ItemConver
                symbol={symbolTo}
                iconConvert={true}
                title={`Amount of ${symbolTo}`}
                icon={iconTo ? { uri: `${keys.HOSTING_API}${iconTo}` } : require('@images/wallet/eth.png')}
                readonly={true}
                changeCoin={showModalForSymbolTo}
                value={amountTo}
                swapSymbol={swapSymbol}
            />
            <Box
                top={3}
                row
                justifySpaceBetween>
                <Txt
                    marginTop={10}
                    color={'#999999'}>
                    {`1 ${symbolForm} = ${calculateConversionRate(symbolForm, symbolTo, coins)} ${symbolTo}`}
                </Txt>
            </Box>

            <Btn
                radius={5}
                alignSelf={'center'}
                paddingVertical={7}
                paddingHorizontal={25}
                backgroundColor={colors.green}
                marginTop={20}
                onPress={() => {
                    swapCoin({
                        symbolForm: symbolForm,
                        symbolTo: symbolTo,
                        amountForm: amountForm,
                    })
                }}
            >
                <Txt color={'white'}>
                    {t('Swap')}
                </Txt>
            </Btn>
            <Warn
                title={t('The final ETH amount you receive may be slightly different due to market volatility')}
            />
            <Warn
                title={t('Swap Fee 0.25% implementation and has been deducted from the estimate above')}
            />



        </Box>
    )
}

export default React.memo(MakePrice)