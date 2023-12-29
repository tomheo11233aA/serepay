import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, Image } from 'react-native';
import CreditCard from '../../../assets/images/setting/bg-card2.svg';
import { fonts } from '@themes/fonts';

interface CreditCardFormProps {
    bankLogo?: string;
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    onChangeCardNumber?: (value: string) => void;
    onChangeCardHolder?: (value: string) => void;
    onChangeExpiryDate?: (value: string) => void;
}
const CreditCardForm: React.FC<CreditCardFormProps> = ({  bankLogo, cardNumber, cardHolder, expiryDate, onChangeCardHolder, onChangeCardNumber, onChangeExpiryDate}) => {
    // const [cardNumber, setCardNumber] = useState('');
    // const [cardHolder, setCardHolder] = useState('');
    // const [expiryDate, setExpiryDate] = useState('');
    const formatCardNumber = (value: string) => {
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

    const formatExpiryDate = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.slice(0, 2) + '/' + v.slice(2);
        }
        return v;
    };
    return (
        <View style={styles.container}>
            <CreditCard width={500} height={240} style={{ alignSelf: 'center' }} />
            <Image
                source={bankLogo ? { uri: bankLogo } : {}}
                style={{ width: 160, height: 80, position: 'absolute', resizeMode: 'contain', justifyContent: 'center', alignSelf: 'center' }}
            />

            <TextInput
                style={{ height: 40, position: 'absolute', top: 80, width: '95%', fontFamily: fonts.OSB, color: '#fff', fontSize: 25, alignSelf: 'center', fontWeight: 'bold' }}
                // onChangeText={text => setCardNumber(formatCardNumber(text))}
                onChangeText={text => onChangeCardNumber && onChangeCardNumber(formatCardNumber(text))}
                value={cardNumber}
                placeholder={'Card Number'}
                placeholderTextColor={'#fff'}
                keyboardType={'numeric'}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 150 }}>
                <View>
                    <Text style={{ fontFamily: fonts.JR, color: 'white' }}>Card Holder name</Text>
                    <TextInput
                        style={{ height: 30, width: 150, fontFamily: fonts.OSB, color: '#fff', fontSize: 16, fontWeight: 'bold' }}
                        // onChangeText={text => setCardHolder(text)}
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
        // flex: 1,
        position: 'relative',
        width: 300,
        height: 300,
        alignSelf: 'center',
    }
});

export default CreditCardForm;