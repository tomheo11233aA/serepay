import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

const Terms = () => {
    return (
        <Box alignStart marginTop={10} width={'100%'} row>
            <Box
                width={15}
                height={15}
                borderWidth={1}
                borderColor={colors.gray2}
            />
            <Txt marginLeft={5}>
                Do you agree with
                <Txt color={colors.violet}>{' Terms of Service '}</Txt>
                and
                <Txt color={colors.violet}>{' Privacy Policy '}</Txt>
                of Swap Tobe.
            </Txt>
        </Box>
    )
}

export default Terms