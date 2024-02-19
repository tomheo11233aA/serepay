import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React, { useState, useRef } from 'react'
import Btn from '@commom/Btn'
import WalletBTC from './WalletBTC'
import Aliases from './Aliases'
import { WithdrawProps } from './Withdraw'
import { ScrollView } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { BOTTOM_TAB_HEIGHT } from '@utils/responsive'
import { Animated } from 'react-native'

interface Props {
    t: any;
    route?: WithdrawProps['route'];
}

const Tab = ({ t, route }: Props) => {
    const [tabChoosed, setTabChoosed] = useState<string>(`Wallet`)
    const scrollViewRef = useRef<ScrollView>(null);

    const tabs = ['Wallet', 'Aliases']
    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
        >
            <Box
                marginTop={20}
                marginRight={20}
                paddingVertical={5}
                paddingHorizontal={10}
                row
                alignStart
            >
                {tabs.map((tab) =>
                    <Btn
                        key={tab}
                        paddingVertical={7}
                        paddingHorizontal={12}
                        marginRight={15}
                        onPress={() => setTabChoosed(tab)}
                        borderColor={tab === tabChoosed ? colors.violet : colors.violet2}
                        borderBottomWidth={tab === tabChoosed ? 3 : 0}
                    >
                        <Txt color={colors.darkGreen} size={16} bold>
                            {t(tab)} {tab === 'Wallet' ? route?.params?.symbol : ''}
                        </Txt>
                    </Btn>
                )}
                
            </Box>
           
            {tabChoosed === 'Wallet' ? <WalletBTC route={route} /> : <Aliases route={route} />}

        </ScrollView>
    )
}

export default Tab
