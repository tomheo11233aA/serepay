// React and React Native imports
import React, { useEffect, memo, useState } from 'react'
import { Text, View } from 'react-native'

// Redux imports
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { AppDispatch } from '@redux/store/store'
import { fetchUserWallet } from '@redux/slice/userSlice'
import { coinListSelector, userWalletUserSelector } from '@redux/selector/userSelector'

// Model imports
import { IHistoryTransfer } from '@models/TRANSFER/historyTransfer'
import { ITransferToUserName } from '@models/TRANSFER/transferToUsername'
import { WithdrawProps } from './Withdraw'

// Utility and helper function imports
import { historytransfer, transferToUsername } from '@utils/userCallApi'
import { roundDecimalValues } from '../../../helper/function/roundCoin'
import { keys } from '@contants/keys'

// Component imports
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import WalletCoinInput from './Validation/WalletCoinInput'
import LottieView from 'lottie-react-native'

// Other imports
import { aliasesSchema } from './Validation/aliasesValidation'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface Props {
    route?: WithdrawProps['route'];
}
const Aliases: React.FC<Props> = ({ route }) => {
    const { t } = useTranslation()
    const dispatch: AppDispatch = useAppDispatch()
    const userWallet = useAppSelector(userWalletUserSelector)
    const [amount, setAmount] = useState<string>('')
    const [, setUserName] = useState<string>('')
    const [, setMessage] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState(true);
    const balanceKey = `${route?.params?.symbol.toLocaleLowerCase()}_balance`;
    const maxAvailable = userWallet?.[balanceKey] || 0;
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<[]>([]);
    const coinList = useAppSelector(coinListSelector)
    const { handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(aliasesSchema)
    });

    const handleChangeAmount = (value: string) => {
        setValue('amount', value)
        setAmount(value)
    }
    const handleChangeUserName = (value: string) => {
        setValue('userName', value)
        setUserName(value)
    }
    const handleChangeMessage = (value: string) => {
        setValue('message', value)
        setMessage(value)
    }
    useEffect(() => {
        dispatch(fetchUserWallet())
    }, [])

    const handleSend = async (inputData: any) => {
        const { userName, amount, message } = inputData;
        const data: ITransferToUserName = {
            symbol: route?.params?.symbol ?? 'BTC',
            userName: userName,
            amount: amount,
            note: message,
        }
        try {
            setIsLoading(true)
            const res = await transferToUsername(data)
            console.log(res)
            if (res?.status) {
                setIsLoading(false)
                dispatch(fetchUserWallet())
                setAmount('')
                setUserName('')
                setMessage('')
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    const loadMoreData = async () => {
        const data: IHistoryTransfer = {
            page: page,
            limit: '5',
            symbol: route?.params?.symbol ?? 'BTC',
        }
        if (!isLoading && hasMore) {
            setIsLoading(true);
            const response = await historytransfer(data);
            if (Array.isArray(response?.data?.array)) {
                // setHistory(prevData => [...prevData, ...response.data.array] as []);
                setHistory(response.data.array);
                if (response.data.array.length === 0) {
                    setHasMore(false);
                }
            } else {
                console.error('response.data.array is not an array:', response?.data?.array);
            }
            setPage(page + 1);
            setIsLoading(false);
        }
    };
    const loadPreviousData = async () => {
        if (page > 1) {
            const newPage = page - 1;
            const data: IHistoryTransfer = {
                page: newPage,
                limit: '5',
                symbol: route?.params?.symbol ?? 'BTC',
            }
            setIsLoading(true);
            const response = await historytransfer(data);
            if (Array.isArray(response?.data?.array)) {
                setHistory(response.data.array);
                if (response.data.array.length === 0) {
                    setHasMore(false);
                }
            } else {
                console.error('response.data.array is not an array:', response?.data?.array);
            }
            setPage(newPage);
            setIsLoading(false);
        }
    }
    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            loadMoreData();
        }
    }
    useEffect(() => {
        loadMoreData();
    }, []);
    return (
        <View>
            <View>
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{t('User Name')}</Text>
                <WalletCoinInput
                    placeholder={t('Enter user name')}
                    onChangeText={handleChangeUserName}
                    maxLength={100}
                />
                {errors.userName && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                    {t(`${errors.userName?.message}`)}
                </Txt>}
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{t('Amount of')} {route?.params?.symbol}</Text>
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
                    {t(`${errors.amount?.message}`)}
                </Txt>}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{t('Max available:')}</Text>
                    <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{roundDecimalValues(maxAvailable, 10001)} {route?.params?.symbol}</Text>
                </View>
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>Message</Text>
                <WalletCoinInput
                    placeholder={t('I\'m fine, thank you. And you?')}
                    onChangeText={handleChangeMessage}
                    maxLength={100}
                    height={150}
                />
                {errors.message && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                    {t(`${errors.message?.message}`)}
                </Txt>}

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
                    <View style={{ alignSelf: 'center', width: '100%' }}>
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
                                            <View style={{ flexDirection: 'row', alignContent: 'center', marginBottom: 7 }}>
                                                <Txt fontFamily={fonts.LR} size={16}>Coin: </Txt>
                                                <Txt fontFamily={fonts.LR} size={16}>{item?.coin_key.toUpperCase()}</Txt>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginBottom: 7 }}>
                                                <Txt fontFamily={fonts.LR} size={16}>{t('Final Amount:')}</Txt>
                                                <Txt marginLeft={5} color={colors.green} fontFamily={fonts.OSB} size={16}> {item?.amount}</Txt>
                                                <Icon marginLeft={5} size={15} source={{ uri: `${keys.HOSTING_API}${coin?.image}` }} />
                                            </View>
                                            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                                <Txt fontFamily={fonts.LR} size={16}>Type: </Txt>
                                                <Txt fontFamily={fonts.LR} size={16}>{item?.type_exchange}</Txt>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: 7, alignItems: 'center' }}>
                                                <Txt fontFamily={fonts.LR} size={16}>Note: </Txt>
                                                <Txt fontFamily={fonts.LR} size={16}>{item?.note}</Txt>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: 7, alignItems: 'center' }}>
                                                <Txt fontFamily={fonts.LR} size={16}>From User: </Txt>
                                                <Txt fontFamily={fonts.LR} size={16}>{item?.address_form}</Txt>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: 7, alignItems: 'center', marginBottom: 7 }}>
                                                <Txt fontFamily={fonts.LR} size={16}>From To: </Txt>
                                                <Txt fontFamily={fonts.LR} size={16}>{item?.address_to}</Txt>
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {page > 1 && (
                                <Btn
                                    onPress={loadPreviousData}
                                    marginTop={20}
                                    height={hp(5)}
                                    padding={10}
                                    radius={5}
                                    width={'48%'}
                                    backgroundColor={colors.darkViolet}>
                                    <Txt color={'white'} size={18} bold fontFamily={fonts.LR}>{t('Previous page')}</Txt>
                                </Btn>
                            )}
                            {hasMore && (
                                <Btn
                                    onPress={handleLoadMore}
                                    marginTop={20}
                                    height={hp(5)}
                                    padding={10}
                                    width={'48%'}
                                    radius={5}
                                    backgroundColor={colors.lviolet}>
                                    <Txt color={'white'} size={18} bold fontFamily={fonts.LR}>{t('Next page')}</Txt>
                                </Btn>
                            )}
                        </View>
                    </View>
                )}
            </View>
        </View>

    )
}

export default memo(Aliases)

