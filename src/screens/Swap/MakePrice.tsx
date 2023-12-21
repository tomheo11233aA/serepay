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

interface Props {
    t: any;
}

const MakePrice = ({ t }: Props) => {
    const coins = useSelector(coinListSelector)
    const userWallet = useSelector(userWalletUserSelector)
    const [symbolForm, setSymbolForm] = useState<string>('BTC')
    const [symbolTo, setSymbolTo] = useState<string>('ETH')
    const balance = useMemo(() =>  getBalanceOfChoosedCoin(symbolForm, userWallet), [symbolForm, userWallet])
    const [amountForm, setAmountForm] = useState<string>('0')
    const [iconForm, setIconForm] = useState<string>('')
    const [selectedCoin, setSelectedCoin] = useState<ICoin | null>(null)
    const [visible, setVisible] = useState(false);
    const showModal = useCallback(() => setVisible(true), [])
    const hideModal = useCallback(() => setVisible(false), [])

    useEffect(() => {
        const btc = coins.find((coin: ICoin) => coin.name === 'BTC')
        if (btc) {
            setSelectedCoin(btc)
        }
    }, [coins])

    const changeCoin = useCallback((coin: ICoin) => {
        setSelectedCoin(coin)
        setSymbolForm(coin?.name ?? 'BTC')
        setIconForm(coin?.image ?? '')
        hideModal()
    }, [hideModal])

    const swapCoin = useCallback(async (swapData: ISwap) => {
        try {
            const res = await swapCoinApi(swapData)
            Alert.alert(res?.data?.message ?? 'Successful coin conversion!')
            console.log(res)
        } catch (error) {
            Alert.alert('Insufficient balance! ')
            console.log(error)
        }
    }, [])

    return (
        <Box>
            <CoinModal visible={visible} hideModal={hideModal} t={t} handleChooseCoin={changeCoin} />
            <ItemConver
                symbol={symbolForm}
                title={`Amount of ${symbolForm}`}
                icon={iconForm ? { uri: `${keys.HOSTING_API}${iconForm}` } : require('@images/wallet/bitcoin.png')}
                value={amountForm}
                setValue={setAmountForm}
                changeCoin={showModal}
            />
            <Box
                top={3}
                row
                justifySpaceBetween>
                <Txt
                    marginTop={10}
                    color={'#999999'}>
                    {`Balance: ${balance.toFixed(8)} ${symbolForm}`}
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
                symbol={'ETH'}
                iconConvert={true}
                title={'Amount of ETH'}
                icon={require('@images/wallet/eth.png')}
                readonly={true}
                
            />

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