// React and React Native imports
import React, { useEffect, memo, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

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
import QRCode from 'react-native-qrcode-svg'
import { Modal, Portal } from 'react-native-paper'

interface Props {
    route?: WithdrawProps['route'];
}

const BASE_URL = 'https://demo.dk-technical.vn/wallet-2'

const Aliases: React.FC<Props> = ({ route }) => {
    const { t } = useTranslation()
    const dispatch: AppDispatch = useAppDispatch()
    const userWallet = useAppSelector(userWalletUserSelector)
    const [amount, setAmount] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const balanceKey = `${route?.params?.symbol.toLocaleLowerCase()}_balance`;
    const maxAvailable = userWallet?.[balanceKey] || 0;
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<[]>([]);
    const coinList = useAppSelector(coinListSelector)
    const [qrData, setQrData] = useState('');
    const [visible, setVisible] = useState(false);

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
        if (!isLoading) {
            setIsLoading(true);
            const response = await historytransfer(data);
            if (Array.isArray(response?.data?.array)) {
                setHistory(response.data.array);
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
            } else {
                console.error('response.data.array is not an array:', response?.data?.array);
            }
            setPage(newPage);
            setIsLoading(false);
        }
    }
    const handleLoadMore = () => {
        loadMoreData();
    }
    useEffect(() => {
        loadMoreData();
    }, []);

    const showModal = (userName: string, amount: string, message: string) => {
        const qrValue = generateQRCode(userName, amount, route?.params?.symbol, message);
        setQrData(qrValue);
        setVisible(true);
    };

    const generateQRCode = (userName: string, amount: string, coin: any, message: string) => {
        const data = `${BASE_URL}?username=${encodeURIComponent(userName)}&coin=${encodeURIComponent(coin)}&amountCoin=${encodeURIComponent(amount)}&note=${encodeURIComponent(message)}`;
        return data;
    };
    const hideModal = () => setVisible(false);

    return (
        <View>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 20 }}>
                        <Txt center fontFamily={fonts.LR} size={16} bold style={{ marginBottom: 10 }}>{t('Scan QR code to send')}</Txt>
                        <QRCode value={qrData} size={200} />
                    </View>
                    <Btn
                        onPress={hideModal}
                        marginTop={20}
                        height={50}
                        width={200}
                        radius={5}
                        backgroundColor={colors.lviolet}>
                        <Txt color={'white'} size={18} bold fontFamily={fonts.LR}>{t('Close')}</Txt>
                    </Btn>
                </Modal>
            </Portal>
            <View>
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18 }}>{t('User Name')}</Text>
                <WalletCoinInput
                    placeholder={t('Enter user name')}
                    onChangeText={handleChangeUserName}
                    maxLength={100}
                    value={userName}
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
                <Text style={{ fontFamily: fonts.LR, color: 'black', marginTop: 20, fontSize: 18, marginBottom: 5}}>
                    {t('Message')}
                </Text>
                <WalletCoinInput
                    placeholder={t('I\'m fine, thank you. And you?')}
                    onChangeText={handleChangeMessage}
                    maxLength={100}
                    height={150}
                    value={message}
                />
                {errors.message && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                    {t(`${errors.message?.message}`)}
                </Txt>}
                <TouchableOpacity
                    onPress={() => showModal(userName, amount, message)}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Icon source={require('@images/setting/eye-review.png')} tintColor={colors.gray5} marginRight={10} style={{ tintColor: 'black' }} />
                        <Txt fontFamily={fonts.LR} size={16} bold>{t('Quick send')}</Txt>
                    </View>
                </TouchableOpacity>
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
                            {page > 0 && (
                                <Btn
                                    onPress={loadPreviousData}
                                    marginTop={20}
                                    height={hp(6)}
                                    padding={10}
                                    radius={5}
                                    width={'48%'}
                                    backgroundColor={colors.darkViolet}>
                                    <Txt color={'white'} size={18} bold fontFamily={fonts.LR}>{t('Previous page')}</Txt>
                                </Btn>
                            )}
                            <Btn
                                onPress={handleLoadMore}
                                marginTop={20}
                                height={hp(6)}
                                padding={10}
                                width={'48%'}
                                radius={5}
                                backgroundColor={colors.lviolet}>
                                <Txt color={'white'} size={18} bold fontFamily={fonts.LR}>{t('Next page')}</Txt>
                            </Btn>
                        </View>
                    </View>
                )}
            </View>
        </View >

    )
}

export default memo(Aliases)

