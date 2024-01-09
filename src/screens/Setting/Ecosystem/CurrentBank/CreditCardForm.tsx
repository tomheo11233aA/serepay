import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import CreditCard from '@images/setting/bg-card1.svg'
import CreditCard2 from '@images/setting/bg-card2.svg'
import CreditCard3 from '@images/setting/bg-card3.svg'
import { fonts } from '@themes/fonts';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface CreditCardFormProps {
    item: any
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
const CreditCardForm: React.FC<CreditCardFormProps> = ({ item }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <CreditCard width={width * 0.9} height={height * 0.3} style={{ alignSelf: 'center' }} />
            <Text
                style={{
                    position: 'absolute',
                    top: hp('7%'),
                    width: '95%',
                    fontFamily: fonts.OSB,
                    color: '#fff',
                    fontSize: 25,
                    fontWeight: 'bold',
                }}>
                {item?.name_banking}
            </Text>

            <Text
                style={{
                    height: 40,
                    position: 'absolute',
                    top: 120,
                    width: '95%',
                    fontFamily: fonts.OSB,
                    color: '#fff',
                    fontSize: 25,
                    fontWeight: 'bold',
                }}>
                {item?.number_banking}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', top: 170 }}>
                <View>
                    <Text style={{ fontFamily: fonts.JR, color: 'white' }}>{t('Card Holder name')}</Text>
                    <Text
                        style={{ height: 30, width: 150, fontFamily: fonts.OSB, color: '#fff', fontSize: 16, fontWeight: 'bold' }}
                    >
                        {item?.owner_banking}

                    </Text>
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