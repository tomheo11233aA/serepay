import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, Image } from 'react-native';
import CreditCard from '../../../assets/images/setting/bg-card2.svg';
import { fonts } from '@themes/fonts';
import { Dimensions } from 'react-native';

interface CreditCardFormProps {
    bankLogo?: string;
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    onChangeCardNumber?: (value: string) => void;
    onChangeCardHolder?: (value: string) => void;
    onChangeExpiryDate?: (value: string) => void;
}
const { width, height } = Dimensions.get('window');
export const formatCardNumber = (value: string) => {
    let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = v.match(/\d{4,19}/g);
    let match = (matches && matches[0]) || '';
    let parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
        return parts.join(' ');
    } else {
        return value;
    }
};

export const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
        return v.slice(0, 2) + '/' + v.slice(2);
    }
    return v;
};
const CreditCardForm: React.FC<CreditCardFormProps> = ({ bankLogo, cardNumber, cardHolder, expiryDate, onChangeCardHolder, onChangeCardNumber, onChangeExpiryDate }) => {
    return (
        <View style={styles.container}>
            <CreditCard width={width * 0.9} height={height * 0.3} style={{ alignSelf: 'center' }} />
            <Image
                source={bankLogo ? { uri: bankLogo } : {}}
                style={{ width: 160, height: 100, position: 'absolute', resizeMode: 'contain', justifyContent: 'center', alignSelf: 'center' }}
            />

            <TextInput
                style={{
                    height: 40,
                    position: 'absolute',
                    top: 90,
                    width: '95%',
                    fontFamily: fonts.OSB,
                    color: '#fff',
                    fontSize: 25,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                }}
                onChangeText={text => onChangeCardNumber && onChangeCardNumber(text)}
                value={cardNumber}
                placeholder={'Card Number'}
                placeholderTextColor={'#fff'}
                keyboardType={'numeric'}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 170 }}>
                <View>
                    <Text style={{ fontFamily: fonts.JR, color: 'white' }}>Card Holder name</Text>
                    <TextInput
                        style={{ height: 30, width: 150, fontFamily: fonts.OSB, color: '#fff', fontSize: 16, fontWeight: 'bold' }}
                        onChangeText={text => onChangeCardHolder && onChangeCardHolder(text)}
                        value={cardHolder}
                        placeholder={'YOUR NAME'}
                        placeholderTextColor={'#fff'}
                    />
                </View>
                <View style={{ marginLeft: 25 }}>
                    <Text style={{ fontFamily: fonts.JR, color: 'white' }}>Expiry Date</Text>
                    <TextInput
                        style={{ height: 30, width: 150, fontFamily: fonts.OSB, color: '#fff', fontSize: 16, fontWeight: 'bold' }}
                        onChangeText={text => onChangeExpiryDate && onChangeExpiryDate(formatExpiryDate(text))}
                        value={expiryDate}
                        placeholder={'MM/YY'}
                        placeholderTextColor={'#fff'}
                        maxLength={5}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 300,
        height: 300,
        alignSelf: 'center',
    }
});

export default CreditCardForm;