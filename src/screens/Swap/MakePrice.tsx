import Box from '@commom/Box'
import React from 'react'
import ItemConver from './ItemConver'
import Warn from './Warn'
import AxiosInstance from '../../helper/AxiosInstance'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { Alert } from 'react-native'
import { userWalletUserSelector } from '@redux/selector/userSelector'
import { useSelector } from 'react-redux'
// import { RootState } from '@redux/reducers'
// import { WalletUser } from '@redux/schema/user'
interface Props {
    t: any;
}

const MakePrice = ({ t }: Props) => {
    const [symbolForm, setSymbolForm] = React.useState<string>('BTC')
    const [symbolTo, setSymbolTo] = React.useState<string>('ETH')
    const [amountForm, setAmountForm] = React.useState<string>('0')
    const [amountTo, setAmountTo] = React.useState<string>('0')
    const userWallet = useSelector(userWalletUserSelector)
    React.useEffect(() => {
        console.log(userWallet)
    }, [])
    const handleSymbolFormClick = () => {

    }
    const handleSymbolToClick = () => {

    }
    const convertCoin = async () => {
        const data = {
            symbolForm,
            symbolTo,
            amountForm
        }
        try {
            const response = await AxiosInstance().post('/api/swap/swap', data)
            Alert.alert('Success', 'Swap success')
            console.log(response)
        } catch (error: any) {
            console.log("loi", error.response.data.message)
            Alert.alert('Error', error.response.data.message)
        }
    }
    return (
        <Box>
            <ItemConver
                symbol={'BTC'}
                title={'Amount of BTC'}
                icon={require('@images/wallet/bitcoin.png')}
                amount={amountForm}
                onAmountChange={setAmountForm}
                onSymbolClick={handleSymbolFormClick}
            />
            <ItemConver
                symbol={'ETH'}
                iconConvert={true}
                title={'Amount of ETH'}
                icon={require('@images/wallet/eth.png')}
                amount={amountTo}
                onAmountChange={setAmountForm}
                onSymbolClick={handleSymbolToClick}
            />

            <Btn
                radius={5}
                alignSelf={'center'}
                paddingVertical={7}
                paddingHorizontal={25}
                backgroundColor={colors.green}
                marginTop={20}
                onPress={convertCoin}
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

export default MakePrice