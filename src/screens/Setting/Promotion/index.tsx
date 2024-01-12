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
import Icon from '@commom/Icon'
import { keys } from '@contants/keys'

const Promotion = () => {
    const { t } = useTranslation()
    const userWallet = useAppSelector(userWalletUserSelector)
    const coins = useAppSelector(coinListSelector)
    const balanceOfUSDT = userWallet?.usdt_balance ?? 0
    const iconUSDT = coins.find(item => item.name === 'USDT')?.image
    // console.log('balanceOfUSDT', iconUSDT)
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
                        <Txt size={14} color='black' center fontFamily={fonts.AS}>{t('Estimated assets value of USDT')}</Txt>
                        <Box row
                        justifyCenter={true}
                        alignCenter={true} 
                        marginTop={10}
                        >
                            <Txt center size={14} color='black' fontFamily={fonts.AS}>{balanceOfUSDT.toLocaleString()} USDT </Txt>

                            <Icon source={{ uri: `${keys.HOSTING_API}${iconUSDT}` }}
                                width={wp('5%')} height={wp('5%')} marginLeft={5} />
                        </Box>
                    </Box>
                </Box>

                <Box row>
                    <Box padding={10}>
                        <Txt size={14} color='black' center fontFamily={fonts.AS}>{t('Start buying and selling cryptocurrencies')}</Txt>
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