import { View, SafeAreaView } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '@themes/colors'
import { screens } from '@contants/screens'
import { navigate } from '@utils/navigationRef'
import Dropdown from './Dropdown'
import Txt from '@commom/Txt'
import { IAddListBanking } from '@models/BANKING/addListBanking';
import { addListBanking } from '@utils/userCallApi';
import Btn from '@commom/Btn'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import { fonts } from '@themes/fonts'
import CreditCardForm from './CreditCardForm'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cardSchema } from './Validation/formValidation'
import CardInput from './Validation/CardInput'
import { formatCardNumber, formatExpiryDate } from './CreditCardForm'

const Ecosystem = () => {
    const { t } = useTranslation()
    const [selectedBank, setSelectedBank] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [logo, setLogo] = React.useState('');
    const [error, setError] = React.useState('')
    const [cardNumber, setCardNumber] = React.useState('')
    const [cardHolder, setCardHolder] = React.useState('')
    const [expiryDate, setExpiryDate] = React.useState('')
    const [nameBanking, setNameBanking] = React.useState('')
    const { handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(cardSchema)
    });

    const handleBankChange = async (value: any) => {
        await AsyncStorage.getItem('@selected_bank')
        setSelectedBank(value);
        setNameBanking(value);
        setValue('bankName', value);    
    };

    const handleLogoChange = async (value: any) => {
        setLogo(value);
    }

    const handleAdd = async (inputData: any) => {
        const { cardNumber, cardHolderName } = inputData;
        const data: IAddListBanking = {
            numberBanking: cardNumber,
            nameBanking: nameBanking.trim(),
            ownerBanking: cardHolderName,
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

    const handleCardNumber = (value: string) => {
        const cardNumber = formatCardNumber(value);
        setCardNumber(cardNumber);
        setValue('cardNumber', value);
    }

    const handleCardHolder = (value: string) => {
        setCardHolder(value);
        setValue('cardHolderName', value);
    }

    const handleExpiryDate = (value: string) => {
        const expiryDate = formatExpiryDate(value);
        setExpiryDate(expiryDate);
        setValue('cardExpiryDate', value);
    }

    return (
        <SafeAreaView style={{ justifyContent: 'space-between', height: '90%' }}>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <CreditCardForm
                bankLogo={logo}
                onChangeCardNumber={handleCardNumber}
                onChangeCardHolder={handleCardHolder}
                onChangeExpiryDate={handleExpiryDate}
                cardNumber={cardNumber}
                cardHolder={cardHolder}
                expiryDate={expiryDate}
            />
            <View style={{ marginTop: 20 }}>
                <Dropdown onChange={handleBankChange} onLogoChange={handleLogoChange} />
                {errors.bankName && <Txt size={12} color={colors.red} paddingHorizontal={5} marginLeft={20} style={{ zIndex: -1 }} marginTop={7} bold>
                    {errors.bankName?.message}
                </Txt>}
                <CardInput
                    placeholder="Card Number"
                    onChangeText={handleCardNumber}
                    icon={require('@images/setting/credit-card-number.png')}
                    maxLength={19}
                    value={cardNumber}
                />
                {errors.cardNumber && <Txt size={12} color={colors.red} paddingHorizontal={5} marginLeft={20} style={{ zIndex: -1 }} marginTop={7} bold>
                    {errors.cardNumber?.message}
                </Txt>}
                <CardInput
                    placeholder="Card Holder Name"
                    onChangeText={handleCardHolder}
                    icon={require('@images/setting/name.png')}
                    maxLength={50}
                    value={cardHolder}
                />
                {errors.cardHolderName && <Txt size={12} color={colors.red} paddingHorizontal={5} marginLeft={20} style={{ zIndex: -1 }} marginTop={7} bold>
                    {errors.cardHolderName?.message}
                </Txt>}
                <CardInput
                    placeholder="Expiry Date"
                    onChangeText={handleExpiryDate}
                    icon={require('@images/setting/expiry-date.png')}
                    maxLength={5}
                    value={expiryDate}
                />
                {errors.cardExpiryDate && <Txt size={12} color={colors.red} paddingHorizontal={5} marginLeft={20} style={{ zIndex: -1 }} marginTop={7} bold>
                    {errors.cardExpiryDate?.message}
                </Txt>}
                <Txt size={12} color={colors.red} paddingHorizontal={5} marginLeft={20} style={{ zIndex: -1 }}>
                    {error}
                </Txt>
            </View>
            <View style={{ marginTop: 100, zIndex: -1 }}>
                <Btn
                    zIndex={-1}
                    onPress={handleSubmit(handleAdd)}
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
        </SafeAreaView>
    )
}

export default Ecosystem