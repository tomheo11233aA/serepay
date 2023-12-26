import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Safe from '@reuse/Safe'
import Scroll from '@commom/Scroll'
import { colors } from '@themes/colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getInfoP2p } from '@utils/userCallApi';
import { IGetInfoP2p } from '@models/P2P/USER/Operation/getInfoP2p';
import Btn from '@commom/Btn';
import LottieView from 'lottie-react-native';
import { fetchUserInfo, setLogin } from '@redux/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@redux/store/store';
import { userInfoUserSelector } from '@redux/selector/userSelector'
import FooterButtons from './Footer';
import PaymentModal from './PaymentModal';
import TransactionTable from './TransactionTable';
import { RouteProp } from '@react-navigation/native';

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

type ConfirmTransactionScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmTransaction'>;

interface ConfirmTransactionProps {
    route: ConfirmTransactionScreenRouteProp;
}

const ConfirmTransaction:React.FC<ConfirmTransactionProps> = ({route}) => {
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

    React.useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const adsItem = await AsyncStorage.getItem('adsItem');
                if (adsItem) {
                    const adsItemParse = JSON.parse(adsItem);
                    setIdP2p(adsItemParse.id);
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
                    const formattedData = p2pInfo?.data?.map((item: IResponse) => [
                        item.code,
                        <View style={{}}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <LottieView
                                    style={{ width: 35, height: 35 }}
                                    source={require('../../../../assets/lottie/smallloading.json')}
                                    autoPlay
                                    loop
                                />
                                <Text style={{ color: '#0101ff' }}>Đang chờ thanh toán từ ngân hàng</Text>
                            </View>
                        </View>,
                        <Btn
                            padding={10}
                            backgroundColor={colors.darkGreen}
                            onPress={() => {
                                setSelectedBankName(item.bankName);
                                setSelectedBankNumber(item.numberBank);
                                setSelectedBankOwner(item.ownerAccount);
                                showModal();
                            }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', flexShrink: 1 }}>Mở màn hình thanh toán</Text>
                        </Btn>,
                        item.amount,
                        item.rate,
                        item.pay.toFixed(3),
                        <Text style={{ color: colors.green, fontWeight: 'bold', marginLeft: 5, flexShrink: 1 }}>
                            {new Date(item.created_at).toLocaleString()}
                        </Text>,
                        <View style={{ alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 }}>
                            <Text style={{ flexShrink: 1, textAlign: 'justify' }}>
                                • Vui lòng thanh toán đúng thông tin tại màn hình
                                thanh toán trong thời gian quy định. Nếu bạn đã thanh
                                toán có thể nhắn tin cho người bán ngay để họ kiểm tra.{`\n`}
                                • Chúng tôi chỉ mua bán tiền điện tử, không liên quan
                                đến bất kì dự án nào. {`\n`}
                                • Khách hàng lưu ý chỉ giao dịch trên web. Các giao
                                dịch bên ngoài website chúng tôi không chịu trách
                                nhiệm. {`\n`}
                                • Nếu khách hàng thanh toán bị chậm, lỗi ngân hàng ...
                                vui lòng liên hệ người bán để được hỗ trợ
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

    const refresh = () => {
        fetchP2pInfo();
    }

    return (
        <Safe flex={1} backgroundColor='white'>
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
                    <View style={styles.header}>
                        <Text style={styles.tableTitle}>Giao dịch BTC</Text>
                    </View>
                    <TransactionTable tableData={tableData} showModal={showModal} />
                    <View style={styles.viewFooter}>
                        <FooterButtons typeUser={typeUser} userid={userId} loginUserid={loginUserid} idP2p={selectedidP2p} refresh={refresh} />
                    </View>
                    <PaymentModal
                        visible={visible}
                        hideModal={hideModal}
                        selectedBankName={selectedBankName}
                        selectedBankNumber={selectedBankNumber}
                        selectedBankOwner={selectedBankOwner}
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