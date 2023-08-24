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

const TopTabWallet = () => {
    const [tabChoosed, setTabChoosed] = useState<string>('Wallet')
    const tabs = ['Wallet', 'P2P', 'Staking', 'Lending']

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
                        radius={5}
                        alignCenter
                        borderWidth={0.5}
                        justifySpaceAround
                        paddingVertical={5}
                        borderColor={'#DF9BFF'}
                        backgroundColor={colors.violet}
                    >
                        {tabs.map((tab) =>
                            <Btn
                                key={tab}
                                radius={5}
                                paddingVertical={5}
                                borderColor={'white'}
                                paddingHorizontal={10}
                                onPress={() => setTabChoosed(tab)}
                                borderWidth={tab === tabChoosed && 0.5}
                                backgroundColor={tab === tabChoosed && colors.darkViolet}
                            >
                                <Txt color={'white'}>{tab}</Txt>
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
            {tabChoosed === 'Wallet' ?
                <Wallet /> : <P2p />
            }
        </LinearGradient>
    )
}

export default TopTabWallet