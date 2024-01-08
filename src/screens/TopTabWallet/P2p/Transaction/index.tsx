import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
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

const Transaction = () => {
    useCoinSocket();
    const coins = useSelector(coinListSelector)
    const [item, setItem] = useState<any>();
    const [amount, setAmount] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [bankList, setBankList] = useState([]);
    const [selected, setSelected] = React.useState();
    const [receiveAmount, setReceiveAmount] = useState('');
    const [coin, setCoin] = useState<any>();
    const dispatch = useDispatch<AppDispatch>();
    const exchangeRate = useSelector(exchangeRateSelector);
    const [loading, setLoading] = useState(true);
    const [bankListId, setBankListId] = useState<number | null>(null);
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
        fetchBanking();
    }, []);

    const handleBuyNow = async () => {
        if (!amount) {
            Alert.alert('Error', 'Please fill all fields and agree to the terms');
            return;
        }
        if (!isChecked) {
            Alert.alert('Error', 'Not yet accpet EULA');
            return;
        }
        const data: ICreateP2p = {
            amount: item.side === 'sell' ? Number(receiveAmount) : Number(amount),
            idP2p: item.id,
            idBankingUser: bankListId,
        }
        setLoading(true);
        await createP2p(data)?.then((res) => {
            Alert.alert('Success', 'Your transaction has been created');
            navigate(screens.CONFIRM_TRANSACTION);
            setLoading(false);
        }).catch((err: any) => {
            Alert.alert('Error', err?.response?.data?.message);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    };
    useEffect(() => {
        dispatch(fetchListExchange());
    }, [dispatch]);
    useEffect(() => {
        const fetchData = async () => {
            const itemString = await AsyncStorage.getItem('adsItem');
            if (itemString) {
                setItem(JSON.parse(itemString));
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (item) {
            const coin = coins.find(coin => coin?.name === item.symbol);
            if (coin) {
                const amountNumber = Number(amount);
                const rateDollar = exchangeRate.find((item) => item.title === 'VND')?.rate ?? 1;
                if (item.side === 'buy') {
                    const coinPrice = coin.price ?? 0;
                    const amountCoin = amountNumber * coinPrice * rateDollar;
                    setReceiveAmount(amountCoin.toFixed(3));
                } else {
                    const inputValueDollar = amountNumber / rateDollar;
                    const coinPrice = coin.price ?? 0;
                    const amountCoin = inputValueDollar / coinPrice;
                    setReceiveAmount(amountCoin.toFixed(8));
                }
            }
        }
    }, [item, coins, exchangeRate]);
    useEffect(() => {
        if (item) {
            setAmount(item.amountMinimum.toString());
            if (item.side === 'sell') {
                const coin = coins.find(coin => coin?.name === item.symbol);
                if (coin) {
                    const rateDollar = exchangeRate.find((item) => item.title === 'VND')?.rate ?? 1;
                    const coinPrice = coin.price ?? 0;
                    const amountVND = item.amountMinimum * coinPrice * rateDollar;
                    setAmount(amountVND.toFixed(3));
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
                justifySpaceBetween
                paddingHorizontal={15}
            >
                <Btn onPress={() => goBack()}>
                    <Icon
                        size={20}
                        source={require('@images/unAuth/left.png')}
                    />
                </Btn>
            </Box>

            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
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
                />
                <AdvertisementInfo item={item} coin={coin} />
                <PartnerInfo item={item} />
            </ScrollView>
        </Safe>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    }
});

export default Transaction;