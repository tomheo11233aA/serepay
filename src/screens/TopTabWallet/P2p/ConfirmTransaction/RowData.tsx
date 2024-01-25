import { Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '@themes/colors';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import Btn from '@commom/Btn';
import Countdown from './Countdown';
import { fonts } from '@themes/fonts';
import { useAppSelector } from "@hooks/redux";
import { userInfoUserSelector } from "@redux/selector/userSelector";

type RowDataProps = {
    header: any;
    item: any;
    t: any;
    setSelectedBankName: (value: any) => void;
    setSelectedBankNumber: (value: any) => void;
    setSelectedBankOwner: (value: any) => void;
    setContent: (value: any) => void;
    setSide: (value: any) => void;
    setAmount: (value: any) => void;
    setPay: (value: any) => void;
    showModal: () => void;
};

const RowData: React.FC<RowDataProps> = ({
    header,
    item,
    t,
    setSelectedBankName,
    setSelectedBankNumber,
    setSelectedBankOwner,
    setContent,
    setSide,
    setAmount,
    setPay,
    showModal
}) => {
    const userInfo = useAppSelector(userInfoUserSelector);
    const [profileId, setProfileId] = useState<number | null>(null);
    useEffect(() => {
        if (userInfo) {
            setProfileId(userInfo.id)
        }
    }, [userInfo]);
    const date = moment(item.created_at).format('DD/MM/YYYY HH:mm:ss');
    if (header.data === 'code') {
        return (
            <Text style={{ color: 'black', flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>{item.code}</Text>
        );
    }
    if (header.data === 'userName') {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    <Text style={{ color: 'black', fontFamily: fonts.AS, marginLeft: 5 }}>{t('If you need assistance, please contact the ')}
                        <Text style={{ color: 'green', fontFamily: fonts.AS, marginLeft: 5, fontWeight: 'bold' }}>
                            {item.userid === profileId ? item.userNameAds : item.userName}
                        </Text>
                    </Text>

                    <Text style={{ color: 'black', fontFamily: fonts.AS, marginLeft: 5 }}>{t('Email: ')}</Text>
                    <Text style={{ color: 'green', fontWeight: 'bold', fontFamily: fonts.AS }}>
                        {/* {item.email} */}
                        {item.userid === profileId ? item.emailAds : item.email}
                    </Text>
                </View>
            </View>
        );
    }
    if (header.data === 'typeP2p') {
        return (
            <View style={{ marginRight: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <LottieView
                        style={{ width: 35, height: 35 }}
                        source={require('@lottie/smallloading.json')}
                        autoPlay
                        loop
                    />
                    <Text style={{ color: 'black', flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>{t('Waiting for payment from the bank')}</Text>
                </View>
                <Countdown createdAt={item.created_at} />
            </View>
        );
    }
    if (header.data === 'pay') {
        return (
            <Btn
                padding={10}
                backgroundColor={colors.darkGreen}
                onPress={() => {
                    setSelectedBankName(item.bankName);
                    setSelectedBankNumber(item.numberBank);
                    setSelectedBankOwner(item.ownerAccount);
                    setContent(item.code.toString());
                    setSide(item.side);
                    setAmount(item.amount);
                    setPay(item.pay);
                    showModal();
                }}>
                <Text style={{ color: 'white', fontWeight: 'bold', flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>{t('Open payment screen')}</Text>
            </Btn>
        );
    }
    if (header.data === 'side') {
        return (
            <Text style={{ color: 'black', flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>{item.amount + ' ' + item.symbol}</Text>
        );
    }
    if (header.data === 'rate') {
        return (
            <Text style={{ color: 'black', flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>{item.rate}</Text>
        );
    }
    if (header.data === 'amount') {
        return (
            <Text style={{ color: 'black', flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>{item.pay.toFixed(3)}</Text>
        );
    }
    if (header.data === 'created_at') {
        return (
            <Text style={{ color: colors.green, fontWeight: 'bold', marginLeft: 5, flexShrink: 1, fontFamily: fonts.AS }}>
                {date}
            </Text>
        );
    }
    if (header.data === 'content') {
        return (
            <View style={{ alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 }}>
                <Text style={{ flexShrink: 1, textAlign: 'justify', color: 'black', fontFamily: fonts.AS, marginLeft: 5 }}>
                    {t('• Please pay the correct information on the payment screen within the prescribed time. If you have paid, you can message the seller immediately for them to check.')}{"\n"}
                    {t('• We only buy and sell cryptocurrencies, not related to any project.')}{"\n"}
                    {t('• Customers should note that only transactions on the website. Transactions outside our website are not responsible.')}{"\n"}
                    {t('• If the customer payment is delayed, bank error ... please contact the seller for support')}
                </Text>
            </View>
        );
    }
}

export default RowData
