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

const Transaction = () => {
    useCoinSocket();
    const coins = useSelector(coinListSelector)
    const [item, setItem] = useState<any>(null);
    const [payment, setPayment] = useState('');
    const [amount, setAmount] = useState('');
    const [isChecked, setIsChecked] = useState(false);
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

    if (!item) {
        return <LottieView style={{ flex: 1 }} source={require('../../../../assets/lottie/loading.json')} autoPlay loop />;
    }

    const coin = coins.find(coin => coin?.name === item.symbol);
    if (!coin) {
        return <LottieView style={{ flex: 1 }} source={require('../../../../assets/lottie/loading.json')} autoPlay loop />;
    }

    return (
        <View style={styles.container}>
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
                            backgroundColor={colors.gray7}
                            readonly
                            radius={3}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontFamily: fonts.AS }}> Choose your payment</Text>
                    <Input
                        backgroundColor={'white'}
                        value={payment}
                        onChangeText={setPayment}
                        radius={3}
                    />
                </View>
                <View style={{ marginTop: 15 }}>
                    <BouncyCheckbox
                        size={25}
                        fillColor="green"
                        unfillColor="#FFFFFF"
                        text="By Clicking Continue, You Agree to Sereso's P2P Terms of Service"
                        textStyle={{ textDecorationLine: "none" }}
                        onPress={setIsChecked}
                        isChecked={isChecked} />
                </View>

                <TouchableOpacity onPress={handleBuyNow} style={{ marginTop: 15, backgroundColor: colors.violet, padding: 10, borderRadius: 5 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Buy now</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ fontFamily: fonts.AS, marginTop: 15 }}>{coin.price}</Text>
            </View>
        </View>
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