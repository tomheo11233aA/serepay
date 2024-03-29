import { View, SafeAreaView, Alert } from 'react-native'
import React, { useEffect } from 'react'
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
import { fonts } from '@themes/fonts'
import CreditCardForm from './CreditCardForm'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cardSchema } from './Validation/formValidation'
import CardInput from './Validation/CardInput'
import { formatCardNumber, formatExpiryDate } from './CreditCardForm'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LottieView from 'lottie-react-native'
import Safe from '@reuse/Safe'

const Ecosystem = () => {
    const { t } = useTranslation()
    const [_, setSelectedBank] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [logo, setLogo] = React.useState('');
    const [error, setError] = React.useState('')
    const [cardNumber, setCardNumber] = React.useState('')
    const [cardHolder, setCardHolder] = React.useState('')
    const [expiryDate, setExpiryDate] = React.useState('')
    const [nameBanking, setNameBanking] = React.useState('')
    const [fakeLoading, setFakeLoading] = React.useState<boolean>(true)
    const { handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(cardSchema)
    });
    
    const handleBankChange = async (value: any) => {
        // await AsyncStorage.getItem('@selected_bank')
        // setSelectedBank(value);
        // setNameBanking(value);
        // setValue('bankName', value);

        try {
            setIsLoading(true);
            await AsyncStorage.setItem('@selected_bank', value);
            setSelectedBank(value);
            setNameBanking(value);
            setValue('bankName', value);
        } catch (error) {
            Alert.alert(t('Error'), t('Something went wrong'));
        } finally {
            setIsLoading(false);
        }
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setFakeLoading(false);
        }, 300);
        return () => {
            clearTimeout(timer);
        }
    }, [])

    if (fakeLoading) {
        return (
            <Safe backgroundColor='white'>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '96%',
                }}>
                    <LottieView
                        source={require('@lottie/loading.json')}
                        style={{
                            width: 300,
                            height: 300,
                            alignSelf: 'center',
                        }}
                        autoPlay
                        loop />
                    <Txt size={18} fontFamily={fonts.AS}>Loading...</Txt>
                </View>
            </Safe>
        );
    }

    return (
        <KeyBoardSafe
            styles={{ marginBottom: hp('10%') }}
        >
            <SafeAreaView style={{
                justifyContent: 'space-between',
                height: hp('85%'),
                width: wp('100%'),
            }}>
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
                    <Dropdown onChange={handleBankChange} onLogoChange={handleLogoChange} isStoreData={true} />
                    {errors.bankName && <Txt size={12} color={colors.red} paddingHorizontal={5} marginLeft={20} style={{ zIndex: -1 }} marginTop={7} bold>
                        {t(`${errors.bankName?.message}`)}
                    </Txt>}
                    <CardInput
                        placeholder={t('Card Number')}
                        onChangeText={handleCardNumber}
                        icon={require('@images/setting/credit-card-number.png')}
                        maxLength={19}
                        value={cardNumber}
                    />
                    {errors.cardNumber && <Txt size={12} color={colors.red} paddingHorizontal={5} marginLeft={20} style={{ zIndex: -1 }} marginTop={7} bold>
                        {t(`${errors.cardNumber?.message}`)}
                    </Txt>}
                    <CardInput
                        placeholder={t('Card Holder name')}
                        onChangeText={handleCardHolder}
                        icon={require('@images/setting/name.png')}
                        maxLength={50}
                        value={cardHolder}
                    />
                    {errors.cardHolderName && <Txt size={12} color={colors.red} paddingHorizontal={5} marginLeft={20} style={{ zIndex: -1 }} marginTop={7} bold>
                        {t(`${errors.cardHolderName?.message}`)}
                    </Txt>}
                    <CardInput
                        placeholder={t('Expiry Date')}
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
                <View style={{
                    zIndex: -1
                }}>
                    <Btn
                        zIndex={-1}
                        onPress={() => { navigate(screens.CURRENT_BANK) }}
                        radius={5}
                        width={'90%'}
                        paddingVertical={7}
                        backgroundColor={colors.darkViolet}
                        marginBottom={10}
                        alignSelf={'center'}>
                        <Txt bold size={16} color={'white'} fontFamily={fonts.AS}>
                            {t('Current Bank')}
                        </Txt>
                    </Btn>

                    <Btn
                        zIndex={-1}
                        onPress={handleSubmit(handleAdd)}
                        radius={5}
                        width={'90%'}
                        paddingVertical={7}
                        backgroundColor={colors.violet}
                        alignSelf={'center'}>
                        <Txt bold size={16} color={'white'} fontFamily={fonts.AS}>
                            {t('Add Card')}
                        </Txt>
                    </Btn>
                </View>
            </SafeAreaView>
        </KeyBoardSafe>
    )
}

export default React.memo(Ecosystem)