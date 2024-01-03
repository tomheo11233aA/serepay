import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WithdrawProps } from './Withdraw'
import { useAppSelector } from '@hooks/redux'
import { userWalletUserSelector } from '@redux/selector/userSelector'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import Input from '@commom/Input'
import { useTranslation } from 'react-i18next'
import { roundDecimalValues } from '../../../helper/function/roundCoin'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { IHistoryTransfer } from '@models/TRANSFER/historyTransfer'
import { historytransfer } from '@utils/userCallApi'
import { transferToUsername } from '@utils/userCallApi'
import { ITransferToUserName } from '@models/TRANSFER/transferToUsername'
import LottieView from 'lottie-react-native'

interface Props {
    route?: WithdrawProps['route'];
}
const Aliases: React.FC<Props> = ({ route }) => {
    const { t } = useTranslation()
    const userWallet = useAppSelector(userWalletUserSelector)
    const [userName, setUserName] = React.useState<string>('')
    const [amount, setAmount] = React.useState<string>('')
    const [message, setMessage] = React.useState<string>('')
    const balanceKey = `${route?.params?.symbol.toLocaleLowerCase()}_balance`;
    const maxAvailable = userWallet?.[balanceKey] || 0;
    const [isLoading, setIsLoading] = React.useState(false);
    const [history, setHistory] = React.useState<[]>([]);

    const handleSend = async () => {
        const data: ITransferToUserName = {
            symbol: route?.params?.symbol ?? 'BTC', 
            userName: userName,
            amount: amount,
            note: message,
        }
        try {
            setIsLoading(true)
            const res = await transferToUsername(data)
            if (res?.data?.data) {
                setIsLoading(false)
                setUserName('')
                setAmount('')
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    React.useEffect(() => {
        const getHistory = async () => {
            const data: IHistoryTransfer = {
                page: 1,
                limit: '10',
                symbol: route?.params?.symbol ?? 'BTC',
            }
            const res = await historytransfer(data)
            if (res?.data?.data) {
                setHistory(res?.data?.data)
            }
        }
        getHistory()
    }, [])
    return (
        <View>
            <View>
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{t('Address')}</Text>
                <Input
                    value={userName}
                    onChangeText={setUserName}
                    hint={t('Enter address')}
                    height={45}
                    radius={5}
                    borderWidth={1}
                    borderColor={colors.darkGreen}
                    paddingHorizontal={10}
                    fontSize={18}
                    marginTop={10}
                />
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{t('Amount of')} {route?.params?.symbol}</Text>
                <Input
                    value={amount}
                    onChangeText={setAmount}
                    hint={t('Enter amount')}
                    height={45}
                    radius={5}
                    borderWidth={1}
                    borderColor={colors.darkGreen}
                    paddingHorizontal={10}
                    fontSize={18}
                    marginTop={10}
                    coin={route?.params?.symbol}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{t('Max available')}:</Text>
                    <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{roundDecimalValues(maxAvailable, 10001)} {route?.params?.symbol}</Text>
                </View>
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>Message</Text>
                <Input
                    value={message}
                    onChangeText={setMessage}
                    hint={t('I am fine, tks. And u!')}
                    height={150}
                    radius={5}
                    borderWidth={1}
                    borderColor={colors.darkGreen}
                    paddingHorizontal={10}
                    fontSize={18}
                    marginTop={10}
                />
                <Btn
                    onPress={handleSend}
                    marginTop={20}
                    height={50}
                    radius={5}
                    backgroundColor={colors.lviolet}>
                    <Txt color={'white'} size={18} bold fontFamily={fonts.LR}>{t('Send')}</Txt>
                </Btn>
            </View>

            <View style={{ justifyContent: 'center', marginTop: 20, zIndex: -1 }}>
                <Txt paddingHorizontal={20} fontFamily={fonts.AS} size={16} bold style={{ marginBottom: 10 }}>{t('History')}</Txt>
                {isLoading ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <LottieView
                            source={require('../../../assets/lottie/loading.json')}
                            autoPlay
                            loop
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                ) : (
                    <View style={{ alignSelf: 'center', width: '90%' }}>
                        {history.length > 0 ? (
                            history.map((item: any, index: number) => (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <Txt fontFamily={fonts.AS} size={16} bold>{item.symbol}</Txt>
                                    <Txt fontFamily={fonts.AS} size={16} bold>{item.amount}</Txt>
                                </View>
                            ))
                        ) : (
                            <>
                                <LottieView
                                    source={require('../../../assets/lottie/nodata.json')}
                                    autoPlay
                                    loop
                                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                                />
                                <Txt center fontFamily={fonts.AS} size={16} bold>{t('No data')}</Txt>
                            </>
                        )}
                    </View>
                )}
            </View>
        </View>

    )
}

export default Aliases

const styles = StyleSheet.create({})