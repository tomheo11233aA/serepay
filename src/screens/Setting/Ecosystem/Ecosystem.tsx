import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Safe from '@reuse/Safe'
import { colors } from '@themes/colors'
import { screens } from '@contants/screens'
import { navigate } from '@utils/navigationRef'
import Dropdown from './Dropdown'
import Txt from '@commom/Txt'
import Scroll from '@commom/Scroll'
import Input from '@commom/Input'
import { IAddListBanking } from '@models/BANKING/addListBanking';
import { addListBanking } from '@utils/userCallApi';
import Btn from '@commom/Btn'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Box from '@commom/Box'
import Spinner from 'react-native-loading-spinner-overlay'
import { fonts } from '@themes/fonts'

const Ecosystem = () => {

    const { t } = useTranslation()
    const [accountNumber, setAccountNumber] = React.useState('')
    const [accountName, setAccountName] = React.useState('')
    const [nameBanking, setNameBanking] = React.useState('')
    const [selectedBank, setSelectedBank] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('')

    const handleBankChange = async (value: any) => {
        await AsyncStorage.getItem('@selected_bank')
        setSelectedBank(value);
        setNameBanking(value);
    };

    const handleUpdate = async () => {
        const data: IAddListBanking = {
            numberBanking: accountNumber,
            nameBanking: nameBanking,
            ownerBanking: accountName,
        };

        try {
            setIsLoading(true);
            await addListBanking(data);
            // clear data
            setAccountNumber('');
            setAccountName('');
            setNameBanking('');
            setSelectedBank(null);
            setError('');
            navigate(screens.SETTING);
        } catch (error: any) {
            setError(error?.response?.data?.errors);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Safe backgroundColor='white' >
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <Dropdown onChange={handleBankChange} />
            <Box marginTop={100}>
                <Input
                    hint={'Account Number'}
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                />
                <Input
                    hint={'Account Name'}
                    value={accountName}
                    onChangeText={setAccountName}
                />
                <Txt color={colors.red} bold size={18} paddingHorizontal={20} >
                    {error}
                </Txt>

                <Btn
                    onPress={handleUpdate}
                    radius={5}
                    width={'90%'}
                    paddingVertical={7}
                    backgroundColor={colors.violet}
                    alignSelf={'center'}>
                    <Txt bold size={16} color={'white'} fontFamily={fonts.AS}>
                        {t('Update')}
                    </Txt>
                </Btn>
            </Box>




        </Safe>
    )
}

export default Ecosystem

const styles = StyleSheet.create({})