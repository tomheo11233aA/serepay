import { Text, View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
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
import { RouteProp } from '@react-navigation/native';
import { goBack } from '@utils/navigationRef';
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import { useTranslation } from 'react-i18next'
import { fonts } from '@themes/fonts'
import Txt from '@commom/Txt'
import { socket } from '@helper/AxiosInstance'
import { Table, Row } from 'react-native-table-component';
import { Dimensions } from 'react-native';
import RowData from './RowData'
import { navigate } from '@utils/navigationRef'
import { screens } from '@contants/screens'

type RootStackParamList = {
    ConfirmTransaction: { idP2p: number };
};

export type ConfirmTransactionScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmTransaction'>;

export interface ConfirmTransactionProps {
    route: ConfirmTransactionScreenRouteProp;
}

const ConfirmTransaction: React.FC<ConfirmTransactionProps> = ({ route }) => {
    const [idP2p, setIdP2p] = React.useState(route?.params?.idP2p || '');
    const padding = 20;
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [selectedBankName, setSelectedBankName] = React.useState('');
    const [selectedBankNumber, setSelectedBankNumber] = React.useState('');
    const [selectedBankOwner, setSelectedBankOwner] = React.useState('');
    const [loginUserid, setLoginUserid] = React.useState(0);
    const dispatch: AppDispatch = useDispatch();
    const userInfo = useSelector(userInfoUserSelector)
    const [_, setLoading] = React.useState<boolean>(true);
    const [content, setContent] = React.useState<string>('');
    const [side, setSide] = React.useState<string>('');
    const [amount, setAmount] = React.useState<number>(0);
    const [pay, setPay] = React.useState<number>(0);
    const { t } = useTranslation();
    const [fakeLoading, setFakeLoading] = React.useState<boolean>(false)
    const [p2pInfoData, setP2pInfoData] = React.useState<any[]>([]);
    const [type] = React.useState<string>('');
    const windowWidth = Dimensions.get('window').width;
    const borderWidth = 1;
    const adjustedWidth = windowWidth - 2 * (padding + borderWidth);
    const columnWidthRatios = [0.33, 0.67];
    const tableHead = [
        { title: t('Transaction Code'), data: 'code' },
        { title: t('Trader'), data: 'userName' },
        { title: t('Status'), data: 'typeP2p' },
        { title: t('Payment'), data: 'pay' },
        { title: t('You are ') + (type === 'sell' ? t('buying') : t('selling')), data: 'side' },
        { title: t('Exchange rate'), data: 'rate' },
        { title: t('Amount'), data: 'amount' },
        { title: t('Time'), data: 'created_at' },
        { title: t('Note'), data: 'content' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adsItem = await AsyncStorage.getItem('adsItem');
                if (adsItem) {
                    const adsItemParse = JSON.parse(adsItem);
                    setIdP2p(adsItemParse.id);
                    setSide(adsItemParse.side);
                } else {
                    setIdP2p(route?.params?.idP2p || '');
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

    useEffect(() => {
        socket.on("operationP2p", (_idP2p) => {
            fetchP2pInfo();
        });
        return () => {
            socket.off("operationP2p");
        }
    }, [idP2p])

    const fetchP2pInfo = async () => {
        if (idP2p) {
            try {
                const data: IGetInfoP2p = {
                    idP2p: Number(idP2p),
                }
                const p2pInfo = await getInfoP2p(data);
                if (p2pInfo?.status) {
                    setP2pInfoData(p2pInfo?.data);
                }
            } catch (error) {
                console.log("lỗi 2", error);
                navigate(screens.SETTING_STACK, {
                    screen: screens.HISTORY_TRANSACTION,
                })
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchP2pInfo();
        setFakeLoading(true);
        const timer = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [idP2p])

    useEffect(() => {
        setLoginUserid(userInfo?.id ?? 0);
    }, [userInfo])

    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch]);

    if (fakeLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>
                <LottieView
                    style={{
                        width: '80%',
                        height: '30%',
                        alignSelf: 'center',
                    }}
                    source={require('@lottie/loading.json')}
                    autoPlay
                    loop
                />
                <Txt size={18} fontFamily={fonts.AS}>Loading...</Txt>
            </View>
        )
    }

    return (
        <Safe flex={1} backgroundColor={'white'}>
            <Scroll>
                <Box
                    row
                    alignCenter
                    justifySpaceBetween
                    paddingVertical={15}
                    maxWidth={'80%'}
                    marginLeft={10}
                >
                    <Btn
                        width={25}
                        height={25}
                        radius={25}
                        onPress={() => goBack()}
                    >
                        <Icon
                            size={20}
                            source={require('@images/unAuth/left.png')}
                        />
                    </Btn>
                </Box>
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
                >
                </PaymentModal>
                {p2pInfoData.map((item: any, index) => (
                    <Box
                        key={index}
                        alignCenter
                        marginBottom={50}
                    >
                        <View style={styles.header}>
                            <Text style={styles.tableTitle}>{t('BTC Transaction')}</Text>
                        </View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: colors.gray8, borderRadius: 5 }}>
                            {
                                tableHead.map((header, index) => (
                                    <Row
                                        key={index}
                                        data={[
                                            header.title,
                                            <RowData
                                                header={header}
                                                item={item}
                                                t={t}
                                                setSelectedBankName={setSelectedBankName}
                                                setSelectedBankNumber={setSelectedBankNumber}
                                                setSelectedBankOwner={setSelectedBankOwner}
                                                setContent={setContent}
                                                setSide={setSide}
                                                setAmount={setAmount}
                                                setPay={setPay}
                                                showModal={showModal}
                                            />
                                        ]}
                                        style={{ ...styles.row, ...(index % 2 ? styles.rowAlternate : {}) }}
                                        textStyle={{ margin: 6, flexShrink: 1, fontWeight: 'bold' }}
                                        widthArr={columnWidthRatios.map(ratio => adjustedWidth * ratio)}
                                    />
                                ))
                            }
                        </Table>
                        <View style={styles.viewFooter}>
                            <FooterButtons
                                typeUser={item.typeUser}
                                userid={item.userid}
                                loginUserid={loginUserid}
                                idP2p={item.id}
                            />
                        </View>
                    </Box>
                ))}
            </Scroll>
        </Safe>
    )
}

export default ConfirmTransaction

const styles = StyleSheet.create({
    tableBorder: { borderWidth: 1, borderColor: colors.gray8 },
    row: { minHeight: 40, backgroundColor: 'white' },
    rowAlternate: { backgroundColor: colors.gray5 },
    header: {
        width: '90%',
        backgroundColor: colors.gray7,
        padding: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    tableTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        justifyContent: 'center',
        padding: 5,
        color: 'black'
    },
    viewFooter: {
        width: '90%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray7,
        padding: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
})