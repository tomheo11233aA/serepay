import React from 'react';
import { Text, View } from 'react-native';
import Btn from '@commom/Btn';
import { navigate } from '@utils/navigationRef';
import { screens } from '@contants/screens';
import { colors } from '@themes/colors';
import { Transaction } from './All';
import { socket } from '../../../helper/AxiosInstance';
import { useTranslation } from 'react-i18next';

interface TransactionItemProps {
    item: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ item }) => {
    const { t } = useTranslation()
    const renderAction = (typeP2p: number, typeUser: number, idP2p: number) => {
        if (typeP2p === 2) {
            return (
                <Btn
                    radius={7}
                    alignCenter
                    padding={10}
                    width={'100%'}
                    justifySpaceBetween
                    borderColor={colors.blue}
                    borderWidth={1}
                    onPress={() => {
                        navigate(screens.CONFIRM_TRANSACTION, { idP2p });
                        socket.emit("operationP2p", idP2p)
                    }}
                >
                    <Text style={{ color: colors.blue }}>{t('Pending Transaction')}</Text>
                </Btn>
            );
        } else if (typeP2p === 1) {
            return (
                <Btn
                    radius={7}
                    alignCenter
                    padding={10}
                    width={'100%'}
                    justifySpaceBetween
                    borderColor={colors.green}
                    borderWidth={1}
                    disabled
                >
                    <Text style={{ color: colors.green }}>{t('Successful Transaction')}</Text>
                </Btn>
            );
        } else if (typeP2p === 3 && typeUser === 3) {
            return (
                <Btn
                    radius={7}
                    alignCenter
                    padding={10}
                    width={'100%'}
                    justifySpaceBetween
                    borderColor={colors.red}
                    borderWidth={1}
                    disabled
                >
                    <Text style={{ color: colors.red }}>{t('Transaction Cancelled')}</Text>
                </Btn>
            );
        } else if (typeP2p === 3) {
            return (
                <Btn
                    radius={7}
                    alignCenter
                    padding={10}
                    width={'100%'}
                    justifySpaceBetween
                    borderColor={colors.red}
                    borderWidth={1}
                    disabled
                >
                    <Text style={{ color: colors.red }}>{t('Advertiser Not Received Funds')}</Text>
                </Btn>
            );
        }
    };

    return (
        <View style={{ padding: 10, backgroundColor: colors.gray3, marginBottom: 20, borderRadius: 10, paddingVertical: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.email} ({item.userName})</Text>

            <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', flex: 1 }}>{t('Amount')}</Text>
                    <Text style={{ fontWeight: 'bold', flex: 1 }}>{t('Coin')}</Text>
                    <Text style={{ fontWeight: 'bold', flex: 1 }}>{t('Price')}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1 }}>{item.amount}</Text>
                    <Text style={{ flex: 1 }}>{item.symbol}</Text>
                    <Text style={{ flex: 1 }}>{item.rate}</Text>
                </View>
            </View>

            <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold', flex: 1 }}>{t('Pay')}</Text>
                    <Text style={{ fontWeight: 'bold', flex: 1 }}>{t('Created at')}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ flex: 1 }}>{item.pay}</Text>
                    <Text style={{ flex: 1 }}>{item.created_at}</Text>
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                {renderAction(item.typeP2p, item.typeUser, item.idP2p)}
            </View>
        </View>
    );
};

export default React.memo(TransactionItem);