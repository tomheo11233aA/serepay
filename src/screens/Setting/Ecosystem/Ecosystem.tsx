import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Safe from '@reuse/Safe'
import { colors } from '@themes/colors'
import { screens } from '@contants/screens'
import { navigate } from '@utils/navigationRef'
import Dropdown from './Dropdown'
import Txt from '@commom/Txt'
import Input from '@commom/Input'
import { IAddListBanking } from '@models/BANKING/addListBanking';
import { addListBanking } from '@utils/userCallApi';
import Btn from '@commom/Btn'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Box from '@commom/Box'
import Spinner from 'react-native-loading-spinner-overlay'
import { fonts } from '@themes/fonts'
import Svg, { Use, Image } from 'react-native-svg';
import MyCard from '../../../assets/images/setting/bg-card1.svg';
import CreditCardForm from './CreditCardForm'
import { set } from 'lodash'
import { err } from 'react-native-svg/lib/typescript/xml'

const Ecosystem = () => {

    const { t } = useTranslation()
    const [selectedBank, setSelectedBank] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [logo, setLogo] = React.useState('');
    const [error, setError] = React.useState('')
    const [accountNumber, setAccountNumber] = React.useState('')
    const [accountName, setAccountName] = React.useState('')
    const [cardNumber, setCardNumber] = React.useState('')
    const [cardHolder, setCardHolder] = React.useState('')
    const [expiryDate, setExpiryDate] = React.useState('')
    const [nameBanking, setNameBanking] = React.useState('')

    const handleBankChange = async (value: any) => {
        await AsyncStorage.getItem('@selected_bank')
        setSelectedBank(value);
        setNameBanking(value);
    };

    const handleLogoChange = async (value: any) => {
        setLogo(value);
    }

    const handleAdd = async () => {
        const data: IAddListBanking = {
            numberBanking: cardNumber,
            nameBanking: nameBanking.trim(),
            ownerBanking: cardHolder,
        };

        try {
            setIsLoading(true);
            await addListBanking(data);
            navigate(screens.SETTING);
        } catch (error: any) {
            setError(error?.response?.data?.errors);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box flex={1} backgroundColor='white' >
            <Safe backgroundColor='white' flex={1} >
                <Spinner
                    visible={isLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                <CreditCardForm
                    bankLogo={logo}
                    onChangeCardNumber={setCardNumber}
                    onChangeCardHolder={setCardHolder}
                    onChangeExpiryDate={setExpiryDate}
                    cardNumber={cardNumber}
                    cardHolder={cardHolder}
                    expiryDate={expiryDate}

                />
                {error ? <Txt style={{ color: 'red', textAlign: 'center' }}>{error}</Txt> : <></>}
                <Dropdown onChange={handleBankChange} onLogoChange={handleLogoChange} />
                <View style={{ marginTop: 100, zIndex: -1 }}>
                    <Btn
                        zIndex={-1}
                        onPress={handleAdd}
                        radius={5}
                        width={'90%'}
                        paddingVertical={7}
                        backgroundColor={colors.violet}
                        alignSelf={'center'}>
                        <Txt bold size={16} color={'white'} fontFamily={fonts.AS}>
                            {t('Update')}
                        </Txt>
                    </Btn>
                </View>
            </Safe>
        </Box>
    )
}

export default Ecosystem

const styles = StyleSheet.create({})