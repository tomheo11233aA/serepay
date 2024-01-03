import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Scroll from '@commom/Scroll'
import { colors } from '@themes/colors'
import React, { useCallback } from 'react'
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

    const handleDeposit = useCallback(async (symbol: string) => {
        setLoadingStates(prev => ({ ...prev, [symbol]: true }))
        try {
            const res = await createWalletApi(symbol)
            if (res?.data) {
                navigate(screens.DEPOSIT, { symbol, address: res?.data?.address })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingStates(prev => ({ ...prev, [symbol]: false }))
        }
    }, [])
    const handelWithdraw = useCallback(async (symbol: string) => {
        setLoadingStates(prev => ({ ...prev, [symbol]: true }))
        navigate(screens.WITHDRAW, { symbol })
        setLoadingStates(prev => ({ ...prev, [symbol]: false }))
    }, [])

    return (
        <Box flex={1} marginBottom={50}>
            <Scroll style={style} showsVerticalScrollIndicator={false}>
                {coins.map((coin) => {
                    const priceOfCoin = coin.price * selectedRate.rate
                    const ownedCoin = roundDecimalValues(userWallet?.[`${coin?.symbolWallet?.toLowerCase()}_balance`] || 0, coin.price);
                    return (
                        <View key={coin.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: 'white', borderRadius: 10, marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon
                                    size={35}
                                    marginRight={10}
                                    source={{ uri: `${keys.HOSTING_API}${coin.image}` }}
                                />
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: fonts.FSCR, fontSize: 16, color: 'black' }}>
                                            {coin.name}
                                        </Text>
                                        <Text style={{ fontFamily: fonts.FSCR, fontSize: 16, color: colors.black3, marginLeft: 7 }}>
                                            {coin.token_key}
                                        </Text>
                                    </View>
                                    <Text style={{ fontFamily: fonts.FSCR, fontSize: 16, color: colors.darkGreen }}>
                                        {priceOfCoin.toLocaleString()} {selectedRate.title}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: fonts.FSCR, fontSize: 16, color: colors.black3 }}>
                                            You have {ownedCoin} {coin.symbolWallet}
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
                                <Btn
                                    onPress={() => handleDeposit(coin.name ?? '')}
                                    padding={5}
                                    backgroundColor={colors.violet}
                                    radius={7}>
                                    {loadingStates[coin.name ?? ''] ? (
                                        <ActivityIndicator size="small" color="#fff" />
                                    ) : (
                                        <Text style={{ fontFamily: fonts.OSB, fontWeight: 'bold', fontSize: 16, color: 'white' }}>
                                            {t('Deposit')}
                                        </Text>
                                    )}
                                </Btn>
                                <Btn
                                    onPress={() => handelWithdraw(coin.name ?? '')}
                                    padding={5}
                                    radius={7}
                                    borderWidth={1}
                                    marginTop={5}
                                    borderColor={colors.violet}
                                >
                                    {loadingStates[coin.name ?? ''] ? (
                                        <ActivityIndicator size="small" color={colors.violet} />
                                    ) : (
                                        <Text style={{ fontFamily: fonts.LR, fontSize: 16, color: colors.violet }}>
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