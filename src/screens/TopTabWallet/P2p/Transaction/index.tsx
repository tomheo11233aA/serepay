import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCoinSocket } from '../../../../helper/useCoinSocket';
import { coinListSelector } from '@redux/selector/userSelector';
import { ScrollView } from 'react-native';
import { getListBanking } from '@utils/userCallApi';
import Safe from '@reuse/Safe';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@redux/store/store';
import { exchangeRateSelector } from '@redux/selector/userSelector';
import { fetchListExchange } from '@redux/slice/exchangeRateSlice';
import { createP2p } from '@utils/userCallApi';
import { ICreateP2p } from '@models/P2P/USER/Operation/createP2p';
import Loading from './Loading';
import TransactionForm from './TransactionForm';
import AdvertisementInfo from './AdvertisementInfo';
import PartnerInfo from './PartnerInfo';
import { navigate } from '@utils/navigationRef';
import { screens } from '@contants/screens';
import { goBack } from '@utils/navigationRef';
import Btn from '@commom/Btn';
import Icon from '@commom/Icon';
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { fonts } from '@themes/fonts';
import { useTranslation } from 'react-i18next';
import { setCount } from '@redux/slice/notificationSlice';

const Transaction = () => {
    const { t } = useTranslation();
    useCoinSocket();
    const coins = useSelector(coinListSelector)
    const [item, setItem] = useState<any>();
    const [amount, setAmount] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [bankList, setBankList] = useState([]);
    const [_, setSelected] = React.useState();
    const [receiveAmount, setReceiveAmount] = useState('');
    const [coin, setCoin] = useState<any>();
    const dispatch = useDispatch<AppDispatch>();
    const exchangeRate = useSelector(exchangeRateSelector);
    const [loading, setLoading] = useState(true);
    const [bankListId, setBankListId] = useState<number | null>(null);
    const [myAmount, setMyAmount] = useState(0);
    const handleBuyNow = () => {
        if (!amount) {
            Alert.alert(t('Error'), t('Please fill all fields and agree to the terms'));
            return;
        }
        if (!isChecked) {
            Alert.alert(t('Error'), t('Not yet accpet EULA'));
            return;
        }
        Alert.alert(
            t('Confirmation'),
            t('Are you sure you want to proceed?'),
            [
                {
                    text: 'Cancel',
                    style: 'destructive',
                },
                {
                    text: 'OK',
                    style: 'default',
                    onPress: async () => {
                        const data: ICreateP2p = {
                            amount: item.side === 'buy' ? Number(amount) : Number(receiveAmount),
                            idP2p: item.id,
                            idBankingUser: bankListId,
                        }
                        setLoading(true);
                        await createP2p(data)?.then((res) => {
                            Alert.alert(t('Success'), t('Your transaction has been created'));
                            dispatch(setCount(1));
                            navigate(screens.CONFIRM_TRANSACTION);
                            setLoading(false);
                        }).catch((err: any) => {
                            Alert.alert(t('Error'), t(err?.response?.data?.message));
                            setLoading(false);
                        }).finally(() => {
                            setLoading(false);
                        });
                    }
                },
            ],
            { cancelable: false },
        );
    };
    useEffect(() => {
        dispatch(fetchListExchange());
    }, [dispatch]);
    useEffect(() => {
        if (item) {
            if (item.side === 'sell') {
                const coin = coins.find(coin => coin?.name === item.symbol);
                if (coin) {
                    const rateDollar = exchangeRate.find((item) => item.title === 'VND')?.rate ?? 1;
                    const coinPrice = coin.price ?? 0;
                    const amountVND = myAmount * coinPrice * rateDollar;
                    setAmount(amountVND.toString());
                }
            } else {
                setAmount(myAmount.toString());
            }
        }
    }, [item, exchangeRate, myAmount]);
    useEffect(() => {
        if (item) {
            const coin = coins.find(coin => coin?.name === item.symbol);
            if (coin) {
                const amountNumber = Number(amount.replace(/,/g, ''));
                const rateDollar = exchangeRate.find((item) => item.title === 'VND')?.rate ?? 1;
                if (item.side === 'buy') {
                    const coinPrice = coin.price ?? 0;
                    const amountCoin = amountNumber * coinPrice * rateDollar;
                    setReceiveAmount(amountCoin.toString());
                } else {
                    const inputValueDollar = amountNumber / rateDollar;
                    const coinPrice = coin.price ?? 0;
                    const amountCoin = inputValueDollar / coinPrice;
                    setReceiveAmount(amountCoin.toString());
                }
            }
        }
    }, [item, coins, exchangeRate]);
    useEffect(() => {
        if (item) {
            const coin = coins.find(coin => coin?.name === item.symbol);
            if (coin) {
                setCoin(coin);
            }
        }
    }, [item, coins]);
    useEffect(() => {
        const fetchBanking = async () => {
            const data = {
                "page": 1,
                "limit": 1000,
            }
            const res = await getListBanking(data);
            const formattedData = res?.data.array.map((bank: any) => {
                const label = `${bank.name_banking} (${bank.owner_banking}: ${bank.number_banking.toString()})`;
                return {
                    label,
                    value: label,
                    key: bank.id,
                };
            });
            setBankList(formattedData);
        };

        const fetchData = async () => {
            const itemString = await AsyncStorage.getItem('adsItem');
            if (itemString) {
                const itemParsed = JSON.parse(itemString);
                setItem(itemParsed);
                fetchMyAmount(itemParsed);
            }
        }

        const fetchMyAmount = async (item: any) => {
            const myAmountString = await AsyncStorage.getItem('myAmount');
            if (myAmountString) {
                setMyAmount(Number(myAmountString));
            } else {
                console.log('item click vao nut buy', item);
                setMyAmount(item?.amount - item?.amountSuccess ?? 0);
            }
        }

        Promise.all([fetchBanking(), fetchData(), fetchMyAmount(item)])
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            })
    }, []);
    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Safe flex={1} backgroundColor='white'>
            <Box
                row
                alignCenter
                paddingHorizontal={20}
            >
                <Btn onPress={() => goBack()}>
                    <Icon
                        size={20}
                        source={require('@images/unAuth/left.png')}
                    />
                </Btn>
                <Box row>
                    <Txt
                        size={18}
                        color={item.side === 'buy' ? 'red' : 'green'}
                        fontFamily={fonts.OSB}
                    > {item.side === 'sell' ? t('Buy') : t('Sell')} </Txt>
                    <Txt
                        size={18}
                        color={'black'}
                        fontFamily={fonts.OSB}
                    > {item.symbol} {t('via Bank Transfer (VND)')}
                    </Txt>
                </Box>
            </Box>

            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 20,
            }}>
                <TransactionForm
                    amount={amount}
                    setAmount={setAmount}
                    receiveAmount={receiveAmount}
                    bankList={bankList}
                    setSelected={setSelected}
                    setBankListId={setBankListId}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    handleBuyNow={handleBuyNow}
                    item={item}
                    coin={coin}
                    setMaxAmount={setMyAmount}
                    setMaxReceiveAmount={setMyAmount}
                />
                <AdvertisementInfo item={item} coin={coin} />
                <PartnerInfo item={item} />
            </ScrollView>
        </Safe>
    );
};

export default React.memo(Transaction);