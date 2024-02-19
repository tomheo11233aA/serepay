import React, { useEffect, useState, useCallback } from 'react'
import { RouteProp } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker';
import { coinListSelector } from '@redux/selector/userSelector'
import { useAppSelector } from '@hooks/redux'
import { Image, StyleProp, ViewStyle, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { keys } from '@contants/keys'
import { fonts } from '@themes/fonts'
import Safe from '@reuse/Safe';
import Txt from '@commom/Txt';
import Icon from '@commom/Icon';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import { getDepositHistory } from '@utils/userCallApi';
import { IHistoryRecharge } from '@models/WALLET/historyRecharge';
import LottieView from 'lottie-react-native';
import AxiosInstance from '../../../helper/AxiosInstance';
import { colors } from '@themes/colors';

type RootStackParamList = {
    Deposit: { symbol: string, address: string };
};

export type DepositScreenRouteProp = RouteProp<RootStackParamList, 'Deposit'>;

export interface DepositProps {
    route: DepositScreenRouteProp;
}

type Item = {
    label: string;
    value: string;
    disabled: boolean;
    icon: () => JSX.Element;
};

const containerStyle: StyleProp<ViewStyle> = { width: '90%', alignSelf: 'center' };
const dropdownStyle: StyleProp<ViewStyle> = { backgroundColor: '#fafafa' };

const CreateWallet: React.FC<DepositProps> = ({ route }) => {
    const { t } = useTranslation();
    const coinList = useAppSelector(coinListSelector)
    const [symbol, setSymbol] = useState<any>(route?.params?.symbol || 'USDT');
    const [address, setAddress] = useState('');
    const [items, setItems] = useState<Item[]>([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(route?.params?.symbol);
    const [networkItems, setNetworkItems] = useState([
        { label: 'BEP20', value: 'BEP20' },
    ]);
    const [networkOpen, setNetworkOpen] = useState(false);
    const [networkValue, setNetworkValue] = useState('BEP20');
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<[]>([]);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = () => {
        Clipboard.setString(address);
        setCopySuccess(true);
    };

    useEffect(() => {
        if (route?.params?.symbol) {
            setSymbol(route?.params?.symbol)
        }
    }, [route?.params?.symbol])

    useEffect(() => {
        const data: IHistoryRecharge = {
            page: 1,
            limit: '10',
            symbol: symbol || 'USDT.BEP20',
        }
        const getHistory = async () => {
            setIsLoading(true)
            try {
                const res = await getDepositHistory(data)
                if (res?.data) {
                    setHistory(res?.data?.array)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getHistory()
    }, [symbol])

    useEffect(() => {
        const axios = AxiosInstance()
        const createWallet = async () => {
            setIsLoading(true)
            const data = {
                symbol: 'USDT.BEP20'
            }
            try {
                setIsLoading(true)
                const res = await axios.post('/api/blockico/createWalletBEP20', data)
                if (res?.data) {
                    setAddress(res?.data?.data?.address)
                }
            } catch (error: any) {
                setIsLoading(true)
                if (error.response) {
                    setIsLoading(true)
                    setAddress(error.response.data.errors.address)
                }
            } finally {
                setIsLoading(false)
            }
        }
        createWallet()
    }, [])

    useEffect(() => {
        if (coinList.length > 0) {
            const formattedData = coinList.map((item) => ({
                label: `${item.name} (${item.token_key})`,
                value: item.symbolWallet,
                disabled: item.symbolWallet !== symbol,
                icon: () => <Image source={{ uri: `${keys.HOSTING_API}${item.image}` }}
                    style={{ width: 18, height: 18 }} resizeMode='contain' />,
            }));
            if (JSON.stringify(items) !== JSON.stringify(formattedData)) {
                setItems(formattedData as Item[]);
            }
        }
    }, [coinList, symbol])



    return (
        <Safe flex={1} backgroundColor={'white'}>
            <>
                <View style={{ justifyContent: 'center', marginTop: 20 }}>
                    <Txt paddingHorizontal={20} fontFamily={fonts.AS} size={16} bold style={{ marginBottom: 10 }}>{t('Select Coin')}</Txt>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        containerStyle={containerStyle}
                        style={dropdownStyle}
                        placeholder={t('select_coin')}
                        labelStyle={{
                            fontWeight: 'bold',
                            fontFamily: fonts.JR,
                        }}
                        dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
                        zIndex={1}
                    />
                </View>

                <View style={{ justifyContent: 'center', marginTop: 20, zIndex: -1 }}>
                    <Txt paddingHorizontal={20} fontFamily={fonts.AS} size={16} bold style={{ marginBottom: 10 }}>{t('Select Network')}</Txt>
                    <DropDownPicker
                        open={networkOpen}
                        value={networkValue}
                        items={networkItems}
                        setOpen={setNetworkOpen}
                        setValue={setNetworkValue}
                        setItems={setNetworkItems}
                        containerStyle={containerStyle}
                        style={dropdownStyle}
                        labelStyle={{
                            fontWeight: 'bold',
                            fontFamily: fonts.JR,
                        }}
                        dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
                        zIndex={-1}
                        disabled={true}
                    />
                </View>

                <View style={{ justifyContent: 'center', marginTop: 20, zIndex: -1 }}>
                    <Txt paddingHorizontal={20} fontFamily={fonts.AS} size={16} bold style={{ marginBottom: 10 }}>{t('Desposite Address')}</Txt>
                    <View style={{ alignSelf: 'center' }}>
                        {address ? <QRCode value={address} /> : <Txt>No address provided</Txt>}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Txt justify paddingHorizontal={20} fontFamily={fonts.AS} size={16} bold marginVertical={15} width={'80%'}>{address}</Txt>
                        <TouchableOpacity onPress={handleCopy} style={{ marginLeft: 10 }}>
                            <Icon size={20} source={copySuccess ? require('@images/unAuth/check.png') : require('@images/setting/copy.png')} />

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', marginTop: 20, zIndex: -1 }}>
                    <Txt paddingHorizontal={20} fontFamily={fonts.AS} size={16} bold style={{ marginBottom: 10 }}>{t('History send USDT')}</Txt>
                    {isLoading ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                            <LottieView
                                source={require('@lottie/loading.json')}
                                autoPlay
                                loop
                                style={{ width: 100, height: 100 }}
                            />
                        </View>
                    ) : (
                        <View style={{ alignSelf: 'center', width: '90%' }}>
                            {history.length > 0 ? (
                                history.map((item: any, index: number) => {
                                    const coin = coinList.find((coin) => coin.name === item?.coin_key.toUpperCase())
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
                                                    <Txt marginLeft={20} color={colors.green} fontFamily={fonts.OSB} size={16}> +{item?.before_amount}</Txt>
                                                    <Icon marginLeft={5} size={15} source={{ uri: `${keys.HOSTING_API}${coin?.image}` }} />
                                                </View>
                                            </View>
                                        </View>
                                    );
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
        </Safe>
    )
}

export default CreateWallet