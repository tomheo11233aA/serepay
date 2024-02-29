import { Text, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '@themes/colors';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import Btn from '@commom/Btn';
import Countdown from './Countdown';
import { fonts } from '@themes/fonts';
import { useAppSelector } from "@hooks/redux";
import { userInfoUserSelector, exchangeRateSelector } from "@redux/selector/userSelector";
import { bankSelector } from '@redux/selector/userSelector';
import { selectedRateSelector } from '@redux/selector/userSelector';

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
    setId: (value: any) => void;
    setAcqId: (value: string | null) => void;
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
    showModal,
    setId,
    setAcqId
}) => {
    const banks = useAppSelector(bankSelector);
    const userInfo = useAppSelector(userInfoUserSelector);
    const exchangeRate = useAppSelector(exchangeRateSelector);
    const vndRate = exchangeRate.find((rate) => rate.title === 'VND');
    const [profileId, setProfileId] = useState<number | null>(null);
    const [_side, _setSide] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const selectedRate = useAppSelector(selectedRateSelector)
    useEffect(() => {
        if (userInfo?.id === item.userid) {
            _setSide('sell');
        } else {
            _setSide('buy');
        }
    }, [userInfo, item]);

    useEffect(() => {
        if (userInfo) {
            setProfileId(userInfo.id)
        }
    }, [userInfo]);

    const date = moment(item.created_at).format('DD/MM/YYYY HH:mm:ss');
    const id = item.id;
    useEffect(() => {
        setId(id);
    }, [id]);
    const bank = banks.find((bank) => bank.shortName === item.bankName);
    useEffect(() => {
        if (bank) {
            setAcqId(bank.bin);
        } else {
            setAcqId('970436')
        }
    }, [bank]);
    if (header.data === 'code') {
        return (
            <Text style={{ color: colors.green2, flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>{item.code}</Text>
        );
    }
    if (header.data === 'userName') {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    <Text style={{ color: 'black', fontFamily: fonts.AS, marginLeft: 5 }}>{t('If you need assistance, please contact the ')}
                        <Text style={{ color: colors.green2, fontFamily: fonts.AS, marginLeft: 5, fontWeight: 'bold' }}>
                            {item.userid === profileId ? item.userNameAds : item.userName}
                        </Text>
                    </Text>

                    <Text style={{ color: 'black', fontFamily: fonts.AS, marginLeft: 5 }}>{t('Email: ')}</Text>
                    <Text style={{ color: colors.green2, fontWeight: 'bold', fontFamily: fonts.AS }}>
                        {item.userid === profileId ? item.emailAds : item.email}
                    </Text>

                    <Text style={{ color: 'black', fontFamily: fonts.AS, marginLeft: 5 }}>{t('Contact: ')}
                        <Text style={{ color: colors.green2, fontFamily: fonts.AS, marginLeft: 5, fontWeight: 'bold' }}>
                            {item.contact}
                        </Text>
                    </Text>
                </View>
            </View>
        );
    }
    if (header.data === 'typeP2p') {
        return (
            <View style={{ marginRight: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
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
            <Text style={{ color: 'black', flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>
                <Text
                    style={{ color: _side === 'buy' ? '#ff0000' : colors.green2, flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>
                    {item.amount}
                </Text>
                {' ' + item.symbol}
            </Text>
        );
    }
    if (header.data === 'rate') {
        return (
            <Text style={{ color: '#ff0000', flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>
                {selectedRate.title==='VND' ? '₫' + Math.round(item.rate * selectedRate.rate).toLocaleString('en-US') : '$' + (item.rate * selectedRate.rate).toLocaleString('en-US')}
            </Text>
        );
    }

    if (header.data === 'amount') {
        return (
            <Text style={{ color: '#ff0000', flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>{'₫' + Math.round(item.pay).toLocaleString('en-US')}
                <Text style={{ color: 'black', flexShrink: 1, fontFamily: fonts.AS, marginLeft: 5 }}>
                    {' '} ({t('Including transaction fee: 0 VND and transfer fee: ')}
                    {
                        _side === 'buy'
                            ? vndRate
                                ? <Text style={{ color: '#ff0000', flexShrink: 1, fontFamily: fonts.AS }}>{(Math.round(item.pay - item.amount * (item.rate * vndRate.rate)).toLocaleString('en-US') + ' VND')}</Text>
                                : 'vndRate is undefined'
                            : vndRate
                                ? <Text style={{ color: '#ff0000', flexShrink: 1, fontFamily: fonts.AS }}>{(Math.abs(Math.round(item.pay - item.amount * (item.rate * vndRate.rate))).toLocaleString('en-US') + ' VND')}
                                </Text>
                                : 'vndRate is undefined'
                    })
                </Text>
            </Text>
        );
    }
    if (header.data === 'created_at') {
        return (
            <Text style={{ color: colors.green2, fontWeight: 'bold', marginLeft: 5, flexShrink: 1, fontFamily: fonts.AS }}>
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
