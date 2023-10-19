import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

interface Props {
    t: any;
}

const Tab = ({ t }: Props) => {
    return (
        <Box row alignStart marginTop={40}>
            <Box
                marginRight={20}
                paddingVertical={5}
                borderBottomWidth={3}
                paddingHorizontal={10}
                borderColor={colors.violet}
            >
                <Txt bold color={colors.darkGreen} size={16}>
                    {t('Make price')}
                </Txt>
            </Box>
            <Box
                paddingVertical={5}
                paddingHorizontal={10}
                borderColor={colors.violet}
            >
                <Txt color={colors.darkGreen} size={16}>
                    {t('Your Price')}
                </Txt>
            </Box>
        </Box>
    )
}

export default Tab