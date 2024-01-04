import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WithdrawProps } from './Withdraw'
import { useAppSelector } from '@hooks/redux'
import { userWalletUserSelector } from '@redux/selector/userSelector'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import { useTranslation } from 'react-i18next'
import { roundDecimalValues } from '../../../helper/function/roundCoin'
import Warn from '@screens/Swap/Warn'
import Scroll from '@commom/Scroll'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { transferToAddress, historytransfer } from '@utils/userCallApi'
import { ITransferToAddress } from '@models/SWAP/transferToAddress'
import { IHistoryTransfer } from '@models/TRANSFER/historyTransfer'
import LottieView from 'lottie-react-native'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { walletSchema } from './Validation/formValidation'
import WalletCoinInput from './Validation/WalletCoinInput'

interface Props {
    route?: WithdrawProps['route'];
}

const WalletBTC: React.FC<Props> = ({ route }) => {
    const { t } = useTranslation()
    const userWallet = useAppSelector(userWalletUserSelector)
    const [address, setAddress] = React.useState<string>('')
    const [note, setNote] = React.useState<string>('')
    const [amount, setAmount] = React.useState<string>('')
    const balanceKey = `${route?.params?.symbol.toLocaleLowerCase()}_balance`;
    const maxAvailable = userWallet?.[balanceKey] || 0;
    const [isLoading, setIsLoading] = React.useState(false);
    const [history, setHistory] = React.useState<[]>([]);
    const { handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(walletSchema)
    });

    const handleChangeAmount = (value: string) => {
        setValue('amount', value)
        setAmount(value)
    }

    const handleSend = async (inputData: any) => {
        const { address, note, amount } = inputData;
        const data: ITransferToAddress = {
            to_address: address,
            symbol: route?.params?.symbol ?? 'BTC',
            amount: amount,
            note: note,
            type: '1',
        }
        try {
            setIsLoading(true)
            const res = await transferToAddress(data)
            if (res?.data?.data) {
                setIsLoading(false)
                setAddress('')
                setNote('')
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
        <>
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <View style={{ padding: 8, backgroundColor: colors.gray2, borderRadius: 5 }}>
                        <Text style={{ fontFamily: fonts.LR, color: 'black' }}>TRC20</Text>
                    </View>
                    <View style={{ padding: 8, backgroundColor: colors.gray2, borderRadius: 5, marginHorizontal: 10 }}>
                        <Text style={{ fontFamily: fonts.LR, color: 'black' }}>ERC20</Text>
                    </View>
                    <View style={{ padding: 8, backgroundColor: colors.gray2, borderRadius: 5 }}>
                        <Text style={{ fontFamily: fonts.LR, color: 'black' }}>BEP20</Text>
                    </View>
                </View>
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{t('Address')}</Text>
                <WalletCoinInput
                    placeholder="Enter address"
                    onChangeText={(value: string) => setValue('address', value)}
                    maxLength={100}
                />
                {errors.address && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                    {errors.address?.message}
                </Txt>}
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 15, fontSize: 18 }}>{t('Note')}</Text>
                <WalletCoinInput
                    placeholder="Enter note"
                    onChangeText={(value: string) => setValue('note', value)}
                    maxLength={100}
                />
                {errors.note && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                    {errors.note?.message}
                </Txt>}
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 15, fontSize: 18 }}>{t('Amount of')} {route?.params?.symbol}</Text>
                <WalletCoinInput
                    placeholder="Enter amount"
                    onChangeText={handleChangeAmount}
                    maxLength={100}
                    value={amount}
                    coin={route?.params?.symbol}
                    onPress={() => {
                        setAmount(maxAvailable.toString())
                    }}
                />
                {errors.amount && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                    {errors.amount?.message}
                </Txt>}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 15, fontSize: 18 }}>{t('Max available:')}</Text>
                    <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{roundDecimalValues(maxAvailable, 10001)} {route?.params?.symbol}</Text>
                </View>
                <View style={{ marginTop: 15, marginRight: 10 }}>
                    <Warn title={t('You must keep a minimum of 20 TRX in your wallet to secure enough gas fees for trading TRC20 tokens.')} />
                    <Warn title={t('The overhead fees are not fixed, subject to change depending on the state of the blockchain networks.')} />
                    <Warn title={t('Estimated completion time: 2 minutes.')} />
                </View>
                <Btn
                    onPress={handleSubmit(handleSend)}
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

        </>
    )
}

export default WalletBTC

const styles = StyleSheet.create({})