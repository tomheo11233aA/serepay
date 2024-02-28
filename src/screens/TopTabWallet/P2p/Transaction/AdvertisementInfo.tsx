import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { colors } from '@themes/colors';
import { fonts } from '@themes/fonts';
import { selectedRateSelector, config2Selector, config3Selector } from '@redux/selector/userSelector';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface AdvertisementInfoProps {
    item: any;
    coin: any;
}

const AdvertisementInfo: React.FC<AdvertisementInfoProps> = ({ item, coin }) => {
    const { t } = useTranslation()
    const selectedRate = useSelector(selectedRateSelector);
    const config2 = useSelector(config2Selector);
    // const config3 = useSelector(config3Selector);
    const [value, setValue] = React.useState(0);
    const [value2, setValue2] = React.useState(0);
    React.useEffect(() => {
        // if (config3) {
        //     const newValue3 = config3.length > 0 ? config3[0].value : 0;
        //     setValue(newValue3);
        // }
        if (config2) {
            const newValue2 = config2.length > 0 ? config2[0].value : 0;
            setValue2(newValue2);
        }
    }, [config2])
    const price = useMemo(() => {
        let price = 0;
        if (item.side === 'sell') {
            // price = coin && coin.price !== undefined ? coin.price + (coin.price * (value / 100)) : 0;
            price = coin && coin.price !== undefined ? coin.price : 0;
        } else {
            price = coin && coin.price !== undefined ? coin.price - (coin.price * (value2 / 100)) : 0;
        }
        return price * selectedRate.rate;
    }, [item, value, value2, coin]);
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{ color: colors.black2, fontWeight: 'bold', fontSize: 16 }}>{t('Advertisement Informations')}</Text>
            <View style={{ padding: 10, backgroundColor: colors.gray8, borderRadius: 5, marginTop: 10, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: fonts.AS }}>{t('Price')}</Text>
                    <Text style={{ fontFamily: fonts.AS, color: item.side === 'buy' ? colors.green2 : '#ff0000' }}>
                        {Math.round(price).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        {' '}
                        {selectedRate.title}
                    </Text>
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
                    <Text style={{ fontFamily: fonts.AS }}>{t('Available')}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ padding: 5 }}>
                            <Text style={{ fontFamily: fonts.AS, color: colors.black2 }}>{item.amount - item.amountSuccess} {item.symbol}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontFamily: fonts.AS }}>{t('Payment method')}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: fonts.AS, color: colors.black2 }}>{item.bankName}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontFamily: fonts.AS }}>{t('Payment Window')}</Text>
                    <Text style={{ fontFamily: fonts.AS, color: colors.black2 }}>15 minutes</Text>
                </View>
            </View>
        </View>
    );
};

export default React.memo(AdvertisementInfo);