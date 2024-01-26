import { TouchableOpacity, SafeAreaView, Alert, ScrollView, Platform } from 'react-native'
import React, { useEffect, useMemo, useCallback, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '@themes/colors'
import Box from '@commom/Box'
import { goBack } from '@utils/navigationRef'
import Txt from '@commom/Txt'
import Icon from '@commom/Icon'
import { useTranslation } from 'react-i18next'
import Btn from '@commom/Btn'
import { navigate } from '@utils/navigationRef'
import { screens } from '@contants/screens'
import { fonts } from '@themes/fonts'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sellAdvertisementSchema } from '../Validation/sellFormValidation'
import { useAppSelector } from '@hooks/redux'
import { coinListSelector } from '@redux/selector/userSelector'
import { ICoin } from '@models/coin'
import CoinModal from '@commom/Modal/CoinModal'
import { configSelector } from '@redux/selector/userSelector'
import { companyAddAds } from '@utils/userCallApi'
import { ICompanyAddAds } from '@models/P2P/COMPANY/companyAddAds'
import { selectedRateSelector } from '@redux/selector/userSelector'
import BuyAdvertisementInput from '../CreateBuyAds/BuyAdvertisementInput'
import Dropdown from './DropDown'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useAppDispatch } from '@hooks/redux'
import { AppDispatch } from '@redux/store/store'
import { fetchListAdsSell } from '@redux/slice/advertisingSlice'
import { fetchListAdsSellPendding } from '@redux/slice/advertisingSlice'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const CreateBuyAds = () => {
    const { t } = useTranslation()
    const coins = useAppSelector(coinListSelector)
    const selectedRate = useAppSelector(selectedRateSelector)
    const config = useAppSelector(configSelector);
    const [myValue, setMyValue] = React.useState(0);
    const [, setSelectedBank] = React.useState(null);
    // const [logo, setLogo] = React.useState('');
    const [, setNameBanking] = React.useState('')
    const { handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(sellAdvertisementSchema)
    });
    const [selectedCoin, setSelectedCoin] = React.useState<ICoin | null>(null)
    const [visible, setVisible] = React.useState(false);
    const showModal = useCallback(() => setVisible(true), []);
    const hideModal = useCallback(() => setVisible(false), []);
    const dispatch: AppDispatch = useAppDispatch()
    
    const handleBankChange = async (value: any) => {
        setSelectedBank(value);
        setNameBanking(value);
        setValue('bankName', value);
    }

    useEffect(() => {
        if (config) {
            const newValue = config.length > 0 ? config[0].value : 0;
            setMyValue(newValue);
        }
    }, [config])

    const price = useMemo(() => {
        let price = 0;
        price = selectedCoin && selectedCoin.price !== undefined ? selectedCoin.price + (selectedCoin.price * (myValue / 100)) : 0;
        return price * selectedRate.rate;
    }, [selectedCoin, myValue]);

    useEffect(() => {
        if (!selectedCoin) {
            const btc = coins.find((coin: ICoin) => coin.name === 'USDT')
            if (btc) {
                setSelectedCoin(btc)
            }
        } else {
            const coin = coins.find((coin: ICoin) => coin.name === selectedCoin.name)
            if (coin) {
                setSelectedCoin(coin)
            }
        }
    }, [selectedCoin, coins])

    const handleBuyAds = useCallback(async (data: any) => {
        const { amount, amountMinimum, bankName, ownerAccount, numberBank } = data;
        try {
            const body: ICompanyAddAds = {
                amount: amount,
                amountMinimum: amountMinimum,
                symbol: selectedCoin?.name || 'BTC',
                side: 'sell',
                bankName: bankName,
                ownerAccount: ownerAccount,
                numberBank: numberBank,
            }
            const res = await companyAddAds(body);
            if (res?.status) {
                Alert.alert('Success', 'Create new sell advertisement success', [
                    {
                        text: 'OK',
                        // onPress: () => goBack()
                        onPress: () => {
                            dispatch(fetchListAdsSell())
                            dispatch(fetchListAdsSellPendding())
                            goBack();
                        }
                    }
                ])
            }
        } catch (error) {
            console.log('error', error);
        }
    }, [])

    const amountInputRef = useRef<any>(null);
    const amountMinimumInputRef = useRef<any>(null);
    const fullNameInputRef = useRef<any>(null);
    const accountNumberInputRef = useRef<any>(null);

    return (
        <LinearGradient
            style={{ flex: 1 }}
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            colors={[colors.darkViolet, colors.violet]}
        >
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={20}
                enableOnAndroid={true}
                enableAutomaticScroll={Platform.OS === 'ios'}
                style={{
                    flex: 1,
                    marginTop: 60,
                    paddingHorizontal: 15,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: 'white'
                }}>
                <CoinModal
                    visible={visible}
                    hideModal={hideModal}
                    // handleChooseCoin={handleChooseCoin}
                    t={t}
                />
                <Box
                    row
                    alignCenter
                    paddingTop={10}
                >
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon
                            size={25}
                            source={require('@images/unAuth/left.png')}
                        />
                    </TouchableOpacity>
                    <Txt bold color={colors.violet} size={18}>
                        {`${t('Create new sell advertisement')}`}
                    </Txt>
                </Box>
                <Box flex={1} marginTop={20}>
                    <SafeAreaView>
                        <Txt fontFamily={fonts.LR} onPress={() => navigate(screens.CREATE_BUY_ADS)}>{t('Do you want to buy ?')}</Txt>
                        <Box row justifySpaceBetween={true} marginTop={20}>
                            <Txt size={20} fontFamily={fonts.LR}>{t(`ADS to Sell `) + selectedCoin?.name}</Txt>

                            <TouchableOpacity onPress={() => { showModal() }}>
                                <Icon
                                    size={25}
                                    source={require('@images/wallet/editing.png')}
                                />
                            </TouchableOpacity>
                        </Box>
                        <Box row marginTop={20} style={{ alignItem: 'center' }}>
                            <Txt fontFamily={fonts.LR}>{t('Market Buy Price:')}</Txt>
                            <Txt marginLeft={5} fontFamily={fonts.OSB}>{`${price.toLocaleString()} ${selectedRate.title}`}</Txt>
                        </Box>
                        <Txt size={20} marginTop={20} fontFamily={fonts.LR}>{t('Amount')}</Txt>
                        <Box style={{ alignItem: 'center' }}>
                            <BuyAdvertisementInput
                                placeholder={t('Enter amount')}
                                maxLength={100}
                                onChangeText={(value: number) => setValue('amount', value)}
                                returnKeyType={'next'}
                                onSubmitEditing={() => amountMinimumInputRef?.current?.focus()}
                                ref={amountInputRef}
                            />
                            {errors.amount && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                                {errors.amount.message && t(errors.amount.message)}
                            </Txt>}
                        </Box>
                        <Box marginTop={20} style={{ alignItem: 'center' }}>
                            <Txt size={20} fontFamily={fonts.LR}>{t('Minimum amount of ') + selectedCoin?.name}</Txt>
                            <BuyAdvertisementInput
                                placeholder={t('Enter minimum amount')}
                                maxLength={100}
                                onChangeText={(value: number) => setValue('amountMinimum', value)}
                                returnKeyType={'next'}
                                onSubmitEditing={() => fullNameInputRef?.current?.focus()}
                                ref={amountMinimumInputRef}
                            />
                            {errors.amount && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                                {errors.amountMinimum?.message && t(errors.amountMinimum?.message)}
                            </Txt>}
                        </Box>
                        <Txt size={20} marginTop={20} fontFamily={fonts.LR}>{t('Payment Details')}</Txt>
                        <Txt marginVertical={10} fontFamily={fonts.LR}>{t('Bank name:')}</Txt>
                        <Dropdown onChange={handleBankChange}
                            myContainerStyle={{ width: '100%' }}
                        />
                        {errors.bankName && <Txt size={12} color={colors.red} paddingHorizontal={5} style={{ zIndex: -1 }} marginTop={7} bold>
                            {errors.bankName?.message && t(errors.bankName?.message)}
                        </Txt>}
                        <Box marginTop={10} style={{ alignItem: 'center', zIndex: -1 }}>
                            <Txt fontFamily={fonts.LR}>{t('Full name:')}</Txt>
                            <BuyAdvertisementInput
                                placeholder={t('Enter full name')}
                                maxLength={100}
                                onChangeText={(value: string) => setValue('ownerAccount', value)}
                                returnKeyType={'next'}
                                onSubmitEditing={() => accountNumberInputRef?.current?.focus()}
                                ref={fullNameInputRef}
                            />
                            {errors.ownerAccount && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                                {errors.ownerAccount?.message && t(errors.ownerAccount?.message)}
                            </Txt>}
                        </Box>
                        <Box marginVertical={20} style={{ alignItem: 'center', zIndex: -1 }}>
                            <Txt fontFamily={fonts.LR}>{t('Account number:')}</Txt>
                            <BuyAdvertisementInput
                                placeholder={t('Enter account number')}
                                maxLength={100}
                                onChangeText={(value: string) => setValue('numberBank', value)}
                                returnKeyType={'done'}
                                ref={accountNumberInputRef}
                            />
                            {errors.numberBank && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                                {errors.numberBank?.message && t(errors.numberBank?.message)}
                            </Txt>}
                        </Box>
                    </SafeAreaView>
                </Box>
                <Btn
                    style={{ zIndex: -1 }}
                    onPress={handleSubmit(handleBuyAds)}
                    radius={5}
                    marginBottom={hp('10%')}
                    paddingVertical={15}
                    backgroundColor={colors.violet}>
                    <Txt color={'white'} bold>{t('Create')}</Txt>
                </Btn>
            </KeyboardAwareScrollView>
        </LinearGradient>
    )
}

export default React.memo(CreateBuyAds)
