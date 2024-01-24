import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import Safe from '@reuse/Safe'
import { colors } from '@themes/colors'
import React, { useState, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Wallet from './Wallet'
import P2p from './P2p'
import Staking from './Staking'
import Lending from './Lending'
import { useTranslation } from 'react-i18next'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Platform } from 'react-native'
import { Animated } from 'react-native';

const TopTabWallet = () => {
    const { t } = useTranslation()
    const [tabChoosed, setTabChoosed] = useState<string>('WALLET')
    const tabs = ['WALLET', 'P2P', 'STAKING', 'LENDING']
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const handleTabChange = (tab: string) => {
        fadeOut();
        setTimeout(() => {
            setTabChoosed(tab);
            fadeIn();
        }, 150);
    };
    return (
        <LinearGradient
            style={{
                flex: 1,
                marginBottom: Platform.OS === 'ios' ? 0 : hp('10%'),
            }}
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            colors={[colors.darkViolet, colors.violet]}
        >
            <Safe flex={1}>
                <Box
                    row
                    alignCenter
                    paddingHorizontal={15}
                >
                    <Icon
                        size={23}
                        marginRight={10}
                        tintColor={'white'}
                        source={require('@images/wallet/bell.png')}
                    />
                    <Box
                        row
                        flex={1}
                        radius={15}
                        alignCenter
                        borderWidth={0.5}
                        justifySpaceBetween
                        borderColor={colors.violet2}
                        backgroundColor={colors.violet}
                    >
                        {tabs.map((tab) =>
                            <Btn
                                key={tab}
                                radius={15}
                                paddingVertical={7}
                                paddingHorizontal={12}
                                onPress={() => setTabChoosed(tab)}
                                backgroundColor={tab === tabChoosed && colors.violet2}
                            >
                                <Txt color={'white'} size={12} bold>
                                    {t(tab)}
                                </Txt>
                            </Btn>
                        )}
                    </Box>
                    <Icon
                        size={23}
                        marginLeft={10}
                        tintColor={'white'}
                        source={require('@images/wallet/scanner.png')}
                    />
                </Box>

                {tabChoosed === 'WALLET' ?
                    <Wallet /> : tabChoosed === 'P2P' ?
                        <P2p /> : tabChoosed === 'STAKING' ?
                            <Staking /> : <Lending />
                }
            </Safe>
        </LinearGradient>
    )
}

export default TopTabWallet