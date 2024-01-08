import React from 'react';
import { View, Text } from 'react-native';
import Btn from '@commom/Btn';
import { colors } from '@themes/colors';
import { userCancelP2pCommand, userConfirmP2pCommand, companyConfirmP2pCommand, companyCancelP2pCommand } from '@utils/userCallApi';
import { IUserCancelP2pCommand } from '@models/P2P/USER/Operation/userCancelP2pCommand';
import { IUserConfirmP2pCommand } from '@models/P2P/USER/Operation/userConfirmP2pCommand';
import { ICompanyConfirmP2pCommand } from '@models/P2P/COMPANY/companyConfirmF2pCommand';
import { ICompanyCancelF2pCommand } from '@models/P2P/COMPANY/companyCancelF2pCommand';
import { Alert } from 'react-native';
import { navigate } from '@utils/navigationRef';
import { screens } from '@contants/screens';
import { useTranslation } from 'react-i18next';
interface FooterButtonsProps {
    typeUser: number;
    userid: number;
    loginUserid: number;
    idP2p: number;
}

const FooterButtons: React.FC<FooterButtonsProps> = ({ typeUser, userid, loginUserid, idP2p }) => {
    const { t } = useTranslation();
    const handleCancelOrder = async () => {
        const data: IUserCancelP2pCommand = {
            idP2p: idP2p,
        };
        const response = await userCancelP2pCommand(data);
        if (response?.status) {
            Alert.alert('Success', 'Cancel order successfully');
            navigate(screens.SETTING_STACK, {
                screen: screens.HISTORY_TRANSACTION,
            })
        }
    }
    const handleConfirmOrder = async () => {
        const data: IUserConfirmP2pCommand = {
            idP2p: idP2p,
        };
        const response = await userConfirmP2pCommand(data);
        if (response?.status) {
            Alert.alert('Success', 'Confirm order successfully');
            navigate(screens.SETTING_STACK, {
                screen: screens.HISTORY_TRANSACTION
            })
        }
    }
    const handleCompanyConfirmOrder = async () => {
        const data: ICompanyConfirmP2pCommand = {
            idP2p: idP2p,
        };
        const response = await companyConfirmP2pCommand(data);
        if (response?.status) {
            Alert.alert('Success', 'Confirm order successfully');
            navigate(screens.SETTING_STACK, {
                screen: screens.HISTORY_TRANSACTION
            })
        }
    }
    const handleCompanyCancelOrder = async () => {
        const data: ICompanyCancelF2pCommand = {
            idP2p: idP2p,
        };
        const response = await companyCancelP2pCommand(data);
        if (response?.status) {
            Alert.alert('Success', 'Cancel order successfully');
            navigate(screens.SETTING_STACK, {
                screen: screens.HISTORY_TRANSACTION
            })
        }
    }

    if (typeUser === 2) {
        if (userid === loginUserid) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Btn backgroundColor={colors.darkGreen} radius={3} padding={8} onPress={
                        handleConfirmOrder
                    }>
                        <Text style={{ color: 'white' }}>{t('Confirm Transaction')}</Text>
                    </Btn>
                    <Btn backgroundColor={colors.red} padding={8} radius={3} marginLeft={10} onPress={
                        handleCancelOrder
                    }>
                        <Text style={{ color: 'white' }}>{t('Cancel Transaction')}</Text>
                    </Btn>
                </View>
            );
        } else {
            return (
                <Btn radius={3} padding={8} disabled>
                    <Text style={{ color: 'black' }}>{t('Waiting for the other party to transfer money')}</Text>
                </Btn>
            );
        }
    } else if (typeUser === 1) {
        if (userid === loginUserid) {
            return (
                <Btn backgroundColor={colors.black3} radius={3} padding={8} disabled>
                    <Text style={{ color: 'white' }}>{t('Waiting for the other party to confirm')}</Text>
                </Btn>
            );
        } else {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <Btn backgroundColor={colors.darkGreen} radius={3} padding={8} onPress={handleCompanyConfirmOrder}>
                        <Text style={{ color: 'white' }}>{t('Received Money')}</Text>
                    </Btn>
                    <Btn backgroundColor={colors.red} padding={8} radius={3} marginLeft={10} onPress={handleCompanyCancelOrder}>
                        <Text style={{ color: 'white' }}>{t('Not Received Money')}</Text>
                    </Btn>
                </View>
            );
        }
    }
    return null;
}

export default FooterButtons;