import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@themes/colors';
import Input from '@commom/Input';
import { fonts } from '@themes/fonts';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native';
import { useCoinSocket } from '../../../../helper/useCoinSocket';
import { useSelector } from 'react-redux';
import { coinListSelector } from '@redux/selector/userSelector';
import { ScrollView } from 'react-native';
import { getListBanking } from '@utils/userCallApi';
import { SelectList } from 'react-native-dropdown-select-list'
import Safe from '@reuse/Safe';

const Transaction = () => {
    useCoinSocket();
    const coins = useSelector(coinListSelector)
    const [item, setItem] = useState<any>(null);
    const [payment, setPayment] = useState('');
    const [amount, setAmount] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [bankList, setBankList] = useState([]);
    const [selected, setSelected] = React.useState("");
    const handleBuyNow = () => {
        if (!payment || !amount || !isChecked) {
            Alert.alert('Error', 'Please fill all fields and agree to the terms');
            return;
        }

        // Handle the buy now action here
    };
    useEffect(() => {
        const fetchItem = async () => {
            const itemString = await AsyncStorage.getItem('adsItem');
            if (itemString) {
                setItem(JSON.parse(itemString));
            }
        };

        fetchItem();
    }, []);

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


    if (!item) {
        return <LottieView style={{ flex: 1 }} source={require('../../../../assets/lottie/loading.json')} autoPlay loop />;
    }

    const coin = coins.find(coin => coin?.name === item.symbol);
    if (!coin) {
        return <LottieView style={{ flex: 1 }} source={require('../../../../assets/lottie/loading.json')} autoPlay loop />;
    }

    return (
        <Safe flex={1} backgroundColor='white'>
            <ScrollView showsVerticalScrollIndicator={false} style={{padding: 20}}>
                <View style={{ padding: 10, backgroundColor: colors.gray8, borderRadius: 5 }}>
                    <Text style={{ color: colors.black2, fontWeight: 'bold', fontSize: 16 }}>
                        <Text style={{ color: item.side === 'buy' ? 'green' : 'red' }}>
                            {item.side.charAt(0).toUpperCase() + item.side.slice(1) + ' '}
                        </Text>
                        {item.symbol} via Bank transfer (VND)
                    </Text>
                </View>

                <View style={{ padding: 10, backgroundColor: colors.gray8, borderRadius: 5, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontFamily: fonts.AS }}> I will pay</Text>
                            <Input
                                height={40}
                                backgroundColor={'white'}
                                value={amount}
                                onChangeText={setAmount}
                                radius={3}
                            />
                        </View>
                        <View style={{ padding: 5 }}></View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontFamily: fonts.AS }}> To receive</Text>
                            <Input
                                height={40}
                                backgroundColor={colors.gray7}
                                readonly
                                radius={3}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontFamily: fonts.AS }}> Choose your payment</Text>
                        <SelectList fontFamily={fonts.AS} boxStyles={{ marginTop: 5 }} inputStyles={{ color: colors.black3, fontFamily: fonts.AS }} setSelected={setSelected} data={bankList} />

                    </View>
                    <View style={{ marginTop: 15 }}>
                        <BouncyCheckbox
                            size={25}
                            fillColor="green"
                            unfillColor="#FFFFFF"
                            text="By Clicking Continue, You Agree to Sereso's P2P Terms of Service"
                            style={{ width: '90%' }}
                            textStyle={{ textDecorationLine: "none" }}
                            onPress={setIsChecked}
                            isChecked={isChecked} />
                    </View>

                    <TouchableOpacity onPress={handleBuyNow} style={{ marginTop: 15, backgroundColor: colors.violet, padding: 10, borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Buy now</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: colors.black2, fontWeight: 'bold', fontSize: 16 }}>Advertisement Informations</Text>
                    <View style={{ padding: 10, backgroundColor: colors.gray8, borderRadius: 5, marginTop: 10, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: fonts.AS }}> Price</Text>
                            <Text style={{ fontFamily: fonts.AS }}>{coin.price?.toFixed(3)} USD</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontFamily: fonts.AS }}> Amount limits</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ padding: 5, backgroundColor: colors.darkGreen, borderRadius: 3 }}>
                                    <Text style={{ fontFamily: fonts.AS, color: 'white' }}>{item.amountMinimum} {item.symbol}</Text>
                                </View>
                                <Text style={{ fontFamily: fonts.AS, color: 'black', textAlign: 'center', alignSelf: 'center', padding: 5 }}>-</Text>
                                <View style={{ padding: 5, backgroundColor: colors.darkGreen, borderRadius: 3 }}>
                                    <Text style={{ fontFamily: fonts.AS, color: 'white' }}>{item.amount} {item.symbol}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontFamily: fonts.AS }}> Payment method</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontFamily: fonts.AS, color: 'white' }}>{item.bankName}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontFamily: fonts.AS }}> Payment Window</Text>
                            <Text style={{ fontFamily: fonts.AS, color: colors.black3 }}>15 minutes</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: colors.black2, fontWeight: 'bold', fontSize: 16 }}>Partner Informations</Text>
                    <View style={{ padding: 10, backgroundColor: colors.gray8, borderRadius: 5, marginTop: 10, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: fonts.AS }}> Username</Text>
                            <Text style={{ fontFamily: fonts.AS, color: colors.green }}>{item.userName}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontFamily: fonts.AS }}> Status</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontFamily: fonts.AS, color: colors.black3 }}>Online</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontFamily: fonts.AS }}> Country</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontFamily: fonts.AS, color: colors.black3 }}>Vietnam</Text>
                            </View>
                        </View>
                    </View>
                </View>
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