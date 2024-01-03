import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@themes/colors';
import { fonts } from '@themes/fonts';
import { selectedRateSelector } from '@redux/selector/userSelector';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface AdvertisementInfoProps {
    item: any;
    coin: any;
}

const AdvertisementInfo: React.FC<AdvertisementInfoProps> = ({ item, coin }) => {
    const { t } = useTranslation()
    const selectedRate = useSelector(selectedRateSelector);
    const priceInSelectedCurrency = coin?.price * selectedRate.rate;
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{ color: colors.black2, fontWeight: 'bold', fontSize: 16 }}>{t('Advertisement Informations')}</Text>
            <View style={{ padding: 10, backgroundColor: colors.gray8, borderRadius: 5, marginTop: 10, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: fonts.AS }}>{t('Price')}</Text>
                    <Text style={{ fontFamily: fonts.AS }}>{priceInSelectedCurrency?.toFixed(3)} {selectedRate.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontFamily: fonts.AS }}>{t('Amount limits')}</Text>
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
                    <Text style={{ fontFamily: fonts.AS }}>{t('Payment method')}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: fonts.AS, color: colors.black3 }}>{item.bankName}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontFamily: fonts.AS }}>{t('Payment Window')}</Text>
                    <Text style={{ fontFamily: fonts.AS, color: colors.black3 }}>15 minutes</Text>
                </View>
            </View>
        </View>
    );
};

export default React.memo(AdvertisementInfo);