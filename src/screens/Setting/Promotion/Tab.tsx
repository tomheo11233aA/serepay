import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React, { useState } from 'react'
import Btn from '@commom/Btn'
import WalletBTC from './WalletBTC'
import Aliases from './Aliases'
import { WithdrawProps } from './Withdraw'
import Scroll from '@commom/Scroll'
import { ScrollView } from 'react-native'

interface Props {
    t: any;
    route?: WithdrawProps['route'];  
}

const Tab = ({ t, route}: Props) => {
    const [tabChoosed, setTabChoosed] = useState<string>(`Wallet ${route?.params?.symbol}`)
    const tabs = [`Wallet ${route?.params?.symbol}`, 'Aliases']
    return (
        <ScrollView style={{marginBottom: 130}} showsVerticalScrollIndicator={false}>
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
                            {t(tab)}
                        </Txt>
                    </Btn>
                )}
            </Box>
            {tabChoosed === `Wallet ${route?.params?.symbol}` ? <WalletBTC  route={route}/> : <Aliases route={route} />}
        </ScrollView>
    )
}

export default Tab
