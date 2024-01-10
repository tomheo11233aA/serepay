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
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { transferToAddress } from '@utils/userCallApi'
import { ITransferToAddress } from '@models/SWAP/transferToAddress'
import LottieView from 'lottie-react-native'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { walletSchema } from './Validation/formValidation'
import WalletCoinInput from './Validation/WalletCoinInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from '@commom/Icon'
import { keys } from '@contants/keys'
import { coinListSelector } from '@redux/selector/userSelector'
import { getHistoryWidthdraw } from '@utils/userCallApi'
import { IHistoryWidthdraw } from '@models/WALLET/gethHstoryWidthDraw'

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
    const coinList = useAppSelector(coinListSelector)


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
            // const data: IHistoryTransfer = {
            //     page: 1,
            //     limit: '10',
            //     symbol: route?.params?.symbol ?? 'BTC',
            // }
            // const res = await historytransfer(data)
            // if (res?.data?.array) {
            //     setHistory(res?.data?.array)
            // }
            const data: IHistoryWidthdraw = {
                page: 1,
                limit: '10',
                symbol: route?.params?.symbol ?? 'BTC',
            }
            const res = await getHistoryWidthdraw(data)
            if (res?.data?.array) {
                setHistory(res?.data?.array)
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
                    placeholder={t('Enter address')}
                    onChangeText={(value: string) => setValue('address', value)}
                    maxLength={100}
                />
                {errors.address && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                    {errors.address?.message}
                </Txt>}
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 15, fontSize: 18 }}>{t('Note')}</Text>
                <WalletCoinInput
                    placeholder={t('Enter note')}
                    onChangeText={(value: string) => setValue('note', value)}
                    maxLength={100}
                />
                {errors.note && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                    {errors.note?.message}
                </Txt>}
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 15, fontSize: 18 }}>{t('Amount of')} {route?.params?.symbol}</Text>
                <WalletCoinInput
                    placeholder={t('Enter amount')}
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 15, fontSize: 18 }}>{t('Max available:')}</Text>
                    <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{roundDecimalValues(maxAvailable, 10001)} {route?.params?.symbol}</Text>
                </View>
                <View style={{ marginTop: 15, paddingRight: wp('3%') }}>
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
                            history.map((item: any, index: number) => {
                                const coin = coinList.find((coin) => coin?.name === item?.coin_key.toUpperCase())
                                return (
                                    <View key={index} style={{ marginBottom: 10 }}>
                                        <View style={{ backgroundColor: 'black', padding: 7, borderTopLeftRadius: 10, borderTopRightRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <Icon size={16} tintColor={'white'} source={require('@images/setting/calendar.png')} marginRight={10} />
                                            <Txt fontFamily={fonts.LR} size={16} color={'white'} bold>{item?.created_at}</Txt>
                                        </View>
                                        <View style={{ backgroundColor: colors.gray5, padding: 7, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                                <Txt fontFamily={fonts.LR} size={16}>{item?.coin_key.toUpperCase()}</Txt>
                                                <Txt marginLeft={20} color={colors.green} fontFamily={fonts.OSB} size={16}> +{item?.usd_amount} {t('coins')}</Txt>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: 10, alignItems: 'center', marginBottom: 7 }}>
                                                <Txt fontFamily={fonts.LR} size={16}>{t('Final Amount:')}</Txt>
                                                <Txt marginLeft={20} color={colors.green} fontFamily={fonts.OSB} size={16}> +{item?.amount}</Txt>
                                                <Icon marginLeft={5} size={15} source={{ uri: `${keys.HOSTING_API}${coin?.image}` }} />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
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