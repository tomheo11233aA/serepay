import { TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useMemo, useCallback } from 'react'
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
import { buyAdvertisementSchema } from '../Validation/formValidation'
import BuyAdvertisementInput from './BuyAdvertisementInput'
import { useAppSelector } from '@hooks/redux'
import { coinListSelector } from '@redux/selector/userSelector'
import { ICoin } from '@models/coin'
import CoinModal from '@commom/Modal/CoinModal'
import { configSelector } from '@redux/selector/userSelector'
import { companyAddAds } from '@utils/userCallApi'
import { ICompanyAddAds } from '@models/P2P/COMPANY/companyAddAds'
import { selectedRateSelector } from '@redux/selector/userSelector'

const CreateBuyAds = () => {
    const { t } = useTranslation()
    const coins = useAppSelector(coinListSelector)
    const selectedRate = useAppSelector(selectedRateSelector)
    const config = useAppSelector(configSelector);
    const [myValue, setMyValue] = React.useState(0);
    const { handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(buyAdvertisementSchema)
    });
    const [selectedCoin, setSelectedCoin] = React.useState<ICoin | null>(null)
    const [visible, setVisible] = React.useState(false);
    const showModal = useCallback(() => setVisible(true), []);
    const hideModal = useCallback(() => setVisible(false), []);
    const handleChooseCoin = useCallback((coin: ICoin) => {
        setSelectedCoin(coin);
        hideModal();
    }, [hideModal]);

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
            const btc = coins.find((coin: ICoin) => coin.name === 'BTC')
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
        const { amount, amountMinimum } = data; 
        try { 
            const body: ICompanyAddAds = {
                amount: amount,
                amountMinimum: amountMinimum,
                symbol: selectedCoin?.name || 'BTC',
                side: 'buy',
            }
            const res = await companyAddAds(body);
            if (res?.status) {
                goBack();
            }
        } catch (error) {   
            console.log('error', error);    
        }
    }, [])
    return (
        <LinearGradient
            style={{ flex: 1 }}
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            colors={[colors.darkViolet, colors.violet]}
        >
            <Box
                flex={1}
                marginTop={60}
                paddingHorizontal={15}
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                backgroundColor={'white'}
            >
                <CoinModal visible={visible} hideModal={hideModal} handleChooseCoin={handleChooseCoin} t={t} />
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
                        {`${t('Create new buy advertisement')}`}
                    </Txt>
                </Box>
                <Box flex={1} marginTop={20}>
                    <SafeAreaView>
                        <Txt fontFamily={fonts.LR} onPress={() => navigate(screens.CREATE_SELL_ADS)}>{t('Do you want to sell ?')}</Txt>
                        <Box row justifySpaceBetween={true} marginTop={20}>
                            <Txt size={20} fontFamily={fonts.LR}>{t(`ADS to Buy `) + selectedCoin?.name}</Txt>                      
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
                        <Box marginTop={20} style={{ alignItem: 'center' }}>
                            <Txt size={20} fontFamily={fonts.LR}>{t(`Amount of `) + selectedCoin?.name}</Txt>                            
                            <BuyAdvertisementInput
                                placeholder={t('Enter amount')}
                                maxLength={100}
                                onChangeText={(value: number) => setValue('amount', value)}
                            />
                            {errors.amount && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                                {errors.amount?.message}
                            </Txt>}
                        </Box>
                        <Box marginTop={20} style={{ alignItem: 'center' }}>
                            <Txt size={20} fontFamily={fonts.LR}>{t(`Minimum `) + selectedCoin?.name + t('Amount:')}</Txt>
                            <BuyAdvertisementInput
                                placeholder={t('Enter minimum amount')}
                                maxLength={100}
                                onChangeText={(value: number) => setValue('amountMinimum', value)}
                            />
                            {errors.amount && <Txt size={12} color={colors.red} style={{ zIndex: -1 }} marginTop={7} bold>
                                {errors.amountMinimum?.message}
                            </Txt>}
                        </Box>
                    </SafeAreaView>
                </Box>
                <Btn
                    onPress={handleSubmit(handleBuyAds)}
                    radius={5}
                    marginBottom={100}
                    paddingVertical={15}
                    backgroundColor={colors.violet}
                >
                    <Txt color={'white'} bold>{t('Create')}</Txt>
                </Btn>
            </Box>
        </LinearGradient>
    )
}

export default React.memo(CreateBuyAds)
