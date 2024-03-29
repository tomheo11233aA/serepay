import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React, { useState } from 'react'
import Btn from '@commom/Btn'
import MakePrice from './MakePrice'
import YourPrice from './YourPrice'

interface Props {
    t: any;
}

const Tab = ({ t }: Props) => {
    const [tabChoosed, setTabChoosed] = useState<string>('Make price')
    const tabs = ['Make price', 'Your Price']
    return (
        <Box>
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
            {tabChoosed === 'Make price' ? <MakePrice t={t} /> : <YourPrice t={t} />}
        </Box>
    )
}

export default Tab
