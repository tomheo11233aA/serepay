import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import Safe from '@reuse/Safe'
import { colors } from '@themes/colors'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Wallet from './Wallet'
import P2p from './P2p'
import Staking from './Staking'

const TopTabWallet = () => {
    const [tabChoosed, setTabChoosed] = useState<string>('WALLET')
    const tabs = ['WALLET', 'P2P', 'STAKING', 'LENDING']

    return (
        <LinearGradient
            style={{ flex: 1 }}
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            colors={[colors.darkViolet, colors.violet]}
        >
            <Safe>
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
                                    {tab}
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
            </Safe>
            {tabChoosed === 'WALLET' ?
                <Wallet /> : tabChoosed === 'P2P' ?
                    <P2p /> : <Staking />
            }
        </LinearGradient>
    )
}

export default TopTabWallet