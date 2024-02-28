import React, { useEffect, useState, useMemo } from 'react';
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
import { config2Selector, config3Selector, selectedRateSelector } from '@redux/selector/userSelector';
import { useAppSelector } from '@hooks/redux';

const Transaction = () => {
    const { t } = useTranslation();
    useCoinSocket();
    const selectedRate = useAppSelector(selectedRateSelector);
    const config2 = useAppSelector(config2Selector);
    const coins = useSelector(coinListSelector)
    const [item, setItem] = useState<any>();
    const [isChecked, setIsChecked] = useState(false);
    const [bankList, setBankList] = useState([]);
    const [_, setSelected] = React.useState();
    const [coin, setCoin] = useState<any>();
    const dispatch = useDispatch<AppDispatch>();
    const exchangeRate = useSelector(exchangeRateSelector);
    const [loading, setLoading] = useState(true);
    const [bankListId, setBankListId] = useState<number | null>(null);
    const [myAmount, setMyAmount] = useState(0);
    const [value2, setValue2] = React.useState(0);
    const [flag, setFlag] = useState<number>();
    const [_amount, _setAmount] = useState(0);
    const [_receiveAmount, _setReceiveAmount] = useState(0);

    React.useEffect(() => {
        if (config2) {
            const newValue2 = config2.length > 0 ? config2[0].value : 0;
            setValue2(newValue2);
        }
    }, [config2])
    const handleBuyNow = () => {
        if (!_amount) {
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
                            amount: item.side === 'buy' ? Number(_amount) : Number(_receiveAmount),
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
                    _setAmount(amountVND);
                }
            } else {
                _setAmount(myAmount);
            }
        }
    }, [item, exchangeRate, myAmount]);
    useEffect(() => {
        if (item) {
            const coin = coins.find(coin => coin?.name === item.symbol);
            if (coin) {
                const amountNumber = Number(_amount);
                const rateDollar = exchangeRate.find((item) => item.title === 'VND')?.rate ?? 1;
                if (item.side === 'buy') {
                    const coinPrice = coin.price ?? 0;
                    const amountCoin = _amount * coinPrice * rateDollar;
                    _setReceiveAmount(amountCoin);
                } else {
                    const inputValueDollar = amountNumber / rateDollar;
                    const coinPrice = coin.price ?? 0;
                    const amountCoin = inputValueDollar / coinPrice;
                    _setReceiveAmount(amountCoin);
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
    const price = useMemo(() => {
        let price = 0;
        if (item) {
            if (item.side === 'sell') {
                price = coin && coin.price !== undefined ? coin.price : 0;
            } else {
                price = item.amount ?? 1;
                setFlag((coin && coin.price !== undefined ? coin.price - (coin.price * (value2 / 100)) : 0) * selectedRate.rate)
            }
            return item.side === 'sell' ? price * selectedRate.rate : price;
        }
    }, [item, value2, coin]);
    useEffect(() => {
        if (item) {
            const _price = price ?? 0;
            const _myReceiveAmount = item.side === 'sell' ? Number(_receiveAmount) : _price * Number(flag);
            const _myAmount = item.side === 'sell' ? _price * _receiveAmount : _price;
            _setAmount(_myAmount);
            _setReceiveAmount(_myReceiveAmount);
        }
    }, [price, item, _receiveAmount, flag]);
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
                    amount={_amount}
                    setAmount={_setAmount as React.Dispatch<React.SetStateAction<string | number>>}
                    // setAmount={_setAmount as any}
                    receiveAmount={_receiveAmount}
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