import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Scroll from '@commom/Scroll'
import { colors } from '@themes/colors'
import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { coinListSelector } from '@redux/selector/userSelector'
import { keys } from '@contants/keys'
import { ICoin } from '@models/coin'
import Btn from '@commom/Btn'
import { useCoinSocket } from '../../../helper/useCoinSocket'
import { userWalletUserSelector } from '@redux/selector/userSelector'
import { IUserWallet } from '@models/user'
import { selectedRateSelector } from '@redux/selector/userSelector'
import { fonts } from '@themes/fonts'
import { roundDecimalValues } from '../../../helper/function/roundCoin'
import { View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { createWalletApi } from '@utils/userCallApi'
import { ActivityIndicator } from 'react-native'
import { navigate } from '@utils/navigationRef'
import { screens } from '@contants/screens'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Safe from '@reuse/Safe'
import Txt from '@commom/Txt'
import LottieView from 'lottie-react-native'
import { Alert } from 'react-native'

type Props = {
    style?: any
    onCoinSelected?: (coin: ICoin) => void
}
const Coins: React.FC<Props> = ({ style }) => {
    const { t } = useTranslation()
    useCoinSocket()
    const coins = useSelector(coinListSelector)
    const userWallet: IUserWallet | undefined = useSelector(userWalletUserSelector);
    const selectedRate = useSelector(selectedRateSelector)
    const [loadingStates, setLoadingStates] = React.useState<Record<string, boolean>>({})
    const [loadingWithdraw, setLoadingWithdraw] = React.useState<Record<string, boolean>>({})
    const [isLoadingCoins, setIsLoadingCoins] = React.useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingCoins(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleDeposit = useCallback(async (symbol: string) => {
        setLoadingStates(prev => ({ ...prev, [symbol]: true }))
        try {
            // const res = await createWalletApi(symbol)
            // if (res?.data) {
            // navigate(screens.DEPOSIT, { symbol, address: res?.data?.address })
            navigate(screens.DEPOSIT, { symbol, address: 'USDT.BEP20' })
            // }
        } catch (error) {
            Alert.alert(t('Error'), t('Something went wrong'))
        } finally {
            setLoadingStates(prev => ({ ...prev, [symbol]: false }))
        }
    }, [])
    const handelWithdraw = useCallback(async (symbol: string) => {
        setLoadingWithdraw(prev => ({ ...prev, [symbol]: true }))
        let timeoutId = setTimeout(() => {
            navigate(screens.WITHDRAW, { symbol });
            setLoadingWithdraw(prev => ({ ...prev, [symbol]: false }));
        }, 250);

        return () => clearTimeout(timeoutId);
    }, [])

    if (isLoadingCoins) {
        return (
            <Safe backgroundColor='white'>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80%',
                }}>
                    <LottieView
                        source={require('@lottie/loading.json')}
                        style={{ width: 200, height: 200, alignSelf: 'center' }}
                        autoPlay
                        loop />
                    <Txt size={18} fontFamily={fonts.AS}>Loading...</Txt>
                </View>
            </Safe>
        );
    }

    return (
        <Box flex={1} marginBottom={hp('10%')}>
            <Scroll style={style} showsVerticalScrollIndicator={false}>
                {coins.map((coin) => {
                    const priceOfCoin = coin.price * selectedRate.rate
                    const ownedCoin = roundDecimalValues(userWallet?.[`${coin?.symbolWallet?.toLowerCase()}_balance`] || 0, coin.price);
                    return (
                        <View key={coin.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: hp('2%'), backgroundColor: 'white', borderRadius: wp('2.5%'), marginBottom: hp('1%') }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon
                                    size={wp('8.5%')}
                                    marginRight={wp('2.5%')}
                                    source={{ uri: `${keys.HOSTING_API}${coin.image}` }}
                                />
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{
                                            fontFamily: fonts.FSCR,
                                            fontSize: wp('4%'),
                                            color: 'black'
                                        }}>
                                            {coin.name}
                                        </Text>
                                        <Text style={{ fontFamily: fonts.FSCR, fontSize: wp('4%'), color: colors.black3, marginLeft: 7 }}>
                                            {coin.token_key}
                                        </Text>
                                    </View>
                                    <Text style={{ fontFamily: fonts.FSCR, fontSize: wp('4%'), color: colors.darkGreen }}>
                                        {priceOfCoin.toLocaleString()} {selectedRate.title}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: fonts.FSCR, fontSize: wp('4%'), color: colors.black3 }}>
                                            {t('You have')} {ownedCoin} {coin.symbolWallet}
                                        </Text>
                                        <Icon
                                            marginLeft={5}
                                            size={15}
                                            source={{ uri: `${keys.HOSTING_API}${coin.image}` }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View>
                                {coin.name === 'USDT' ? (
                                    <Btn
                                        onPress={() => handleDeposit(coin.name ?? 'USDT')}
                                        padding={wp('1.4%')}
                                        radius={wp('1.4%')}
                                        backgroundColor={colors.violet}
                                    >
                                        {loadingStates[coin.name ?? ''] ? (
                                            <ActivityIndicator size="small" color="#fff" />
                                        ) : (
                                            <Text style={{ fontFamily: fonts.OSB, fontWeight: 'bold', fontSize: wp('4%'), color: 'white' }}>
                                                {t('Deposit')}
                                            </Text>
                                        )}
                                    </Btn>
                                ) : null}

                                <Btn
                                    onPress={() => handelWithdraw(coin.name ?? '')}
                                    padding={wp('1.4%')}
                                    radius={wp('1.4%')}
                                    borderWidth={1}
                                    marginTop={hp('1%')}
                                    borderColor={colors.violet}
                                >
                                    {loadingWithdraw[coin.name ?? ''] ? (
                                        <ActivityIndicator size="small" color={colors.violet} />
                                    ) : (
                                        <Text style={{ fontFamily: fonts.LR, fontSize: wp('4%'), color: colors.violet }}>
                                            {t('Withdraw')}
                                        </Text>
                                    )}
                                </Btn>
                            </View>
                        </View>
                    )
                })}
            </Scroll>
        </Box>
    )
}

export default React.memo(Coins)