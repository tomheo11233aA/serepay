import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Safe from '@reuse/Safe'
import Scroll from '@commom/Scroll'
import { colors } from '@themes/colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInfoP2p } from '@utils/userCallApi';
import { IGetInfoP2p } from '@models/P2P/USER/Operation/getInfoP2p';
import Btn from '@commom/Btn';
import LottieView from 'lottie-react-native';
import { fetchUserInfo } from '@redux/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@redux/store/store';
import { userInfoUserSelector } from '@redux/selector/userSelector'
import FooterButtons from './Footer';
import PaymentModal from './PaymentModal';
import TransactionTable from './TransactionTable';
import { RouteProp } from '@react-navigation/native';
import Countdown from './Countdown'
import { goBack } from '@utils/navigationRef';
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

interface IResponse {
    amount: number;
    bankName: string;
    code: string;
    created_at: string;
    email: string;
    emailAds: string;
    id: number;
    idP2p: number;
    numberBank: string;
    ownerAccount: string;
    pay: number;
    rate: number;
    side: string;
    symbol: string;
    typeP2p: number;
    typeUser: number;
    userName: string;
    userNameAds: string;
    userid: number;
    useridAds: number;
}

type RootStackParamList = {
    ConfirmTransaction: { idP2p: number };
};

export type ConfirmTransactionScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmTransaction'>;

export interface ConfirmTransactionProps {
    route: ConfirmTransactionScreenRouteProp;
}

const ConfirmTransaction: React.FC<ConfirmTransactionProps> = ({ route }) => {
    const [idP2p, setIdP2p] = React.useState(route?.params?.idP2p || '');
    const [tableData, setTableData] = React.useState([]);
    const padding = 20;
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [selectedBankName, setSelectedBankName] = React.useState('');
    const [selectedBankNumber, setSelectedBankNumber] = React.useState('');
    const [selectedBankOwner, setSelectedBankOwner] = React.useState('');
    const [loginUserid, setLoginUserid] = React.useState(0);
    const [typeUser, setTypeUser] = React.useState(0);
    const [userId, setUserId] = React.useState(0);
    const dispatch: AppDispatch = useDispatch();
    const userInfo = useSelector(userInfoUserSelector)
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectedidP2p, setSelectedidP2p] = React.useState<number>(0);
    const [content, setContent] = React.useState<string>('');
    const [side, setSide] = React.useState<string>('');
    const [amount, setAmount] = React.useState<number>(0);
    const [pay, setPay] = React.useState<number>(0);
    const { t } = useTranslation();

    React.useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const adsItem = await AsyncStorage.getItem('adsItem');
                if (adsItem) {
                    const adsItemParse = JSON.parse(adsItem);
                    setIdP2p(adsItemParse.id);
                    setSide(adsItemParse.side);
                }
            } catch (error) {
                console.log("lỗi 1", error);
            } finally {
                await AsyncStorage.removeItem('adsItem');
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    const fetchP2pInfo = async () => {
        if (idP2p) {
            setLoading(true);
            try {
                const data: IGetInfoP2p = {
                    idP2p: Number(idP2p),
                }
                const p2pInfo = await getInfoP2p(data);
                if (p2pInfo?.status) {
                    setTypeUser(p2pInfo?.data[0]?.typeUser);
                    setUserId(p2pInfo?.data[0]?.userid);
                    setSelectedidP2p(p2pInfo?.data[0]?.id);
                    setSide(p2pInfo?.data[0]?.side);
                    setPay(p2pInfo?.data[0]?.pay);
                    setAmount(p2pInfo?.data[0]?.amount);
                    const date = moment.utc(p2pInfo?.data[0]?.created_at).format('DD/MM/YYYY HH:mm:ss');
                    console.log(p2pInfo?.data[0]?.created_at)
                    const formattedData = p2pInfo?.data?.map((item: IResponse) => [
                        item.code,
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                <Text style={{ color: 'black' }}>{t('If you need assistance, please contact the ')}
                                    <Text style={{ color: 'green', fontWeight: 'bold' }}>{item.userNameAds}</Text>
                                </Text>
                                <Text style={{ color: 'black' }}>{t('Email: ')}
                                    <Text style={{ color: 'green', fontWeight: 'bold' }}>{item.emailAds}</Text>
                                </Text>
                            </View>
                        </View>
                        ,
                        <View style={{ marginRight: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <LottieView
                                    style={{ width: 35, height: 35 }}
                                    source={require('../../../../assets/lottie/smallloading.json')}
                                    autoPlay
                                    loop
                                />
                                <Text style={{ color: 'black', flexShrink: 1 }}>{t('Waiting for payment from the bank')}</Text>
                            </View>
                            <Countdown createdAt={item.created_at} />
                        </View>,
                        <Btn
                            padding={10}
                            backgroundColor={colors.darkGreen}
                            onPress={() => {
                                setSelectedBankName(item.bankName);
                                setSelectedBankNumber(item.numberBank);
                                setSelectedBankOwner(item.ownerAccount);
                                setContent(item.code.toString());
                                showModal();
                            }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', flexShrink: 1 }}>{t('Open payment screen')}</Text>
                        </Btn>,
                        item.amount + ' ' + item.symbol,
                        item.rate,
                        item.pay.toFixed(3),
                        <Text style={{ color: colors.green, fontWeight: 'bold', marginLeft: 5, flexShrink: 1 }}>
                            {/* {new Date(item.created_at).toLocaleString()} */}
                            {date}
                        </Text>,
                        <View style={{ alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 }}>
                            <Text style={{ flexShrink: 1, textAlign: 'justify' }}>
                                {t('• Please pay the correct information on the payment screen within the prescribed time. If you have paid, you can message the seller immediately for them to check.')}{"\n"}
                                {t('• We only buy and sell cryptocurrencies, not related to any project.')}{"\n"}
                                {t('• Customers should note that only transactions on the website. Transactions outside our website are not responsible.')}{"\n"}
                                {t('• If the customer payment is delayed, bank error ... please contact the seller for support')}
                            </Text>
                        </View>,
                    ]);
                    setTableData(formattedData);
                }
            } catch (error) {
                console.log("lỗi 2", error);
            } finally {
                setLoading(false);
            }
        }
    }

    React.useEffect(() => {
        fetchP2pInfo();
    }, [idP2p])

    React.useEffect(() => {
        setLoginUserid(userInfo?.id ?? 0);
    }, [userInfo])

    React.useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch]);

    return (
        <Safe flex={1} backgroundColor={'white'}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LottieView
                        style={{ width: 100, height: 100 }}
                        source={require('../../../../assets/lottie/loading.json')}
                        autoPlay
                        loop
                    />
                </View>
            ) : (
                <Scroll justifyCenter padding={padding}>
                    <Box
                        row
                        alignCenter
                        justifySpaceBetween
                        paddingVertical={15}
                    >
                        <Btn onPress={() => goBack()}>
                            <Icon
                                size={20}
                                source={require('@images/unAuth/left.png')}
                            />
                        </Btn>
                    </Box>
                    <View style={styles.header}>
                        <Text style={styles.tableTitle}>{t('BTC Transaction')}</Text>
                    </View>
                    <TransactionTable tableData={tableData} showModal={showModal}
                        type={side === 'sell' ? t('selling') : t('buying')}
                    />
                    <View style={styles.viewFooter}>
                        <FooterButtons typeUser={typeUser} userid={userId} loginUserid={loginUserid} idP2p={selectedidP2p} />
                    </View>
                    <PaymentModal
                        visible={visible}
                        hideModal={hideModal}
                        selectedBankName={selectedBankName}
                        selectedBankNumber={selectedBankNumber}
                        selectedBankOwner={selectedBankOwner}
                        content={content}
                        side={side === 'sell' ? t('selling') : t('buying')}
                        amount={amount}
                        pay={pay}
                    />
                </Scroll>
            )}
        </Safe >
    )
}

export default ConfirmTransaction

const styles = StyleSheet.create({
    header: { backgroundColor: colors.gray7, padding: 5, borderTopLeftRadius: 5, borderTopRightRadius: 5 },
    tableTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        justifyContent: 'center',
        padding: 5
    },
    viewFooter: {
        padding: 10,
        backgroundColor: colors.gray3,
        justifyContent: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
})