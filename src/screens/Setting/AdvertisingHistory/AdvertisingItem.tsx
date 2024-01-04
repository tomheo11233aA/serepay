import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { IAdvertising } from '.';
import moment from 'moment';
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { fonts } from '@themes/fonts';
import { colors } from '@themes/colors';
import Btn from '@commom/Btn';
import { cancelP2p } from '@utils/userCallApi';
import { navigate } from '@utils/navigationRef';
import { screens } from '@contants/screens';
import { getInfoP2p } from '@utils/userCallApi';
import { useTranslation } from 'react-i18next';

interface TransactionItemProps {
    item: IAdvertising;
    refreshData?: () => void;
}

const TransactionItem = ({ item , refreshData}: TransactionItemProps) => {
    const { t } = useTranslation()
    const [hasP2PInfo, setHasP2PInfo] = React.useState(false)
    const formatTime = (time: string) => {
        return moment(time, "DD/MM/YYYY H:m:s").format('DD/MM/YYYY')
    }
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await getInfoP2p({ idP2p: item.id })
                if (response?.data) {
                    setHasP2PInfo(true)
                }
            } catch (error) {
            }
        }
        getInfo()
    }, [])
    return (
        <View style={styles.container}>
            <Box justifySpaceBetween>
                <Box row>
                    <Txt fontFamily={fonts.AS}>{capitalizeFirstLetter(item.userName)}</Txt>
                    <Box row marginLeft={20}>
                        <Txt fontFamily={fonts.AS}>{item.bankName ? item.bankName : "Unknown"}: </Txt>
                        <Txt fontFamily={fonts.AS} color={colors.gray2}>{item.numberBank ? item.numberBank : "Unknown"}</Txt>
                    </Box>
                </Box>
                <Box row>
                    <Txt color={colors.gray2} fontFamily={fonts.AS}>{t('Available')}: </Txt>
                    <Txt fontFamily={fonts.AS}>{parseFloat((item.amount - item.amountSuccess).toFixed(8))} {item.symbol}</Txt>
                </Box>
                <Box row>
                    <Box row>
                        <Txt color={colors.gray2} fontFamily={fonts.AS}>{t('Min')}: </Txt>
                        <Txt fontFamily={fonts.AS}>{item.amountMinimum}</Txt>
                    </Box>
                    <Box row marginLeft={10}>
                        <Txt color={colors.gray2} fontFamily={fonts.AS}>{t('Max')}: </Txt>
                        <Txt fontFamily={fonts.AS}>{item.amount}</Txt>
                    </Box>
                </Box>
                <Box row>
                    <Txt color={colors.gray2} fontFamily={fonts.AS}>{t('Created at')}: </Txt>
                    <Txt fontFamily={fonts.AS}>{formatTime(item.created_at)}</Txt>
                </Box>
            </Box>
            <Box justifyCenter>
                {(item.type === 1 || item.type === 2) && (
                    <Btn backgroundColor={colors.red} padding={5} radius={5} onPress={async () => {
                        try {
                            await cancelP2p({ idP2p: item.id })
                            Alert.alert("Cancel success")
                            // refreshData && refreshData();
                            navigate(screens.SETTING)
                        } catch (error) {
                            console.log(error)
                        }
                    }} >
                        <Txt fontFamily={fonts.AS} color={'white'}>Cancel</Txt>
                    </Btn>
                )}
                {hasP2PInfo && (
                    <Btn backgroundColor={colors.green} radius={5} padding={5} marginTop={5} onPress={() => navigate(screens.CONFIRM_TRANSACTION, { idP2p: item.id })}>
                        <Txt fontFamily={fonts.AS} color={colors.blue}>Info</Txt>
                    </Btn>
                )}
            </Box>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 7,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
    },
});

export default TransactionItem;

