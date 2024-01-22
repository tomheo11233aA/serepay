import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@themes/colors';
import { fonts } from '@themes/fonts';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface PartnerInfoProps {
    item: any;
}

const PartnerInfo: React.FC<PartnerInfoProps> = ({ item }) => {
    const { t } = useTranslation()
    return (
        <View style={{
            marginTop: 10,
            marginBottom: hp(5),
        }}>
            <Text style={{ color: colors.black2, fontWeight: 'bold', fontSize: 16 }}>{t('Partner Informations')}</Text>
            <View style={{ padding: 10, backgroundColor: colors.gray8, borderRadius: 5, marginTop: 10, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: fonts.AS }}>{t('Username')}</Text>
                    <Text style={{ fontFamily: fonts.AS, color: colors.green }}>{item.userName}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontFamily: fonts.AS }}>{t('Status')}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: fonts.AS, color: colors.black3 }}>Online</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontFamily: fonts.AS }}>{t('Country')}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: fonts.AS, color: colors.black3 }}>Vietnam</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

export default React.memo(PartnerInfo);