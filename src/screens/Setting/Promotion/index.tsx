import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Safe from '@reuse/Safe'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import Btn from '@commom/Btn'
import { fonts } from '@themes/fonts'
import { colors } from '@themes/colors'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@hooks/redux'
import { userWalletUserSelector, coinListSelector, selectedRateSelector } from '@redux/selector/userSelector'
import { navigate } from '@utils/navigationRef'
import { screens } from '@contants/screens'
import Coins from './Coins'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Promotion = () => {
    const { t } = useTranslation()
    const userWallet = useAppSelector(userWalletUserSelector)
    const coins = useAppSelector(coinListSelector)
    const selectedRate = useAppSelector(selectedRateSelector)
    const totalValueInUSD = Object.keys(userWallet ?? {}).reduce((total, coinKey) => {
        const coin = coins.find(coin => coin?.symbolWallet?.toLowerCase() === coinKey.split('_')[0])
        return total + ((coin?.price ?? 0) * (userWallet?.[coinKey] ?? 0))
    }, 0)
    const transferPrice = totalValueInUSD * selectedRate.rate

    return (
        <Safe flex={1} backgroundColor='white'>
            <Box
                radius={wp('2%')}
                backgroundColor={colors.gray3}
                alignSelf={'center'}
                alignCenter
                width={wp('90%')}
            >
                <Box row>
                    <Box padding={10}>
                        <Txt size={14} color='black' fontFamily={fonts.AS}>{t('Estimated assets value')}</Txt>
                        <Txt center marginTop={15} size={14} color='black' fontFamily={fonts.AS}>{transferPrice.toLocaleString()} {selectedRate.title} </Txt>
                    </Box>
                </Box>

                <Box row>
                    <Box padding={10}>
                        <Txt size={14} color='black' fontFamily={fonts.AS}>{t('Start buying and selling cryptocurrencies')}</Txt>
                        <Box row alignCenter justifyCenter>
                            <Btn padding={7} backgroundColor={colors.violet} marginTop={10}
                                radius={wp('1%')}
                                onPress={() => navigate(screens.WALLET_STACK)}
                            >
                                <Txt size={14} color='black' fontFamily={fonts.OSB}>{t('BUY NOW')}</Txt>
                            </Btn>
                            <Btn padding={7} marginTop={10} marginLeft={10}
                                radius={wp('1%')} borderWidth={1} borderColor={colors.violet}
                                onPress={() => navigate(screens.WALLET_STACK)}
                            >
                                <Txt size={14} color={colors.violet} fontFamily={fonts.OSB}>{t('SELL NOW')}</Txt>
                            </Btn>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Coins />
        </Safe>
    )
}

export default Promotion

const styles = StyleSheet.create({})