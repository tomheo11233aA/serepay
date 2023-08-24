import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

const AD = () => {
    return (
        <Box
            marginTop={20}
            borderWidth={2}
            paddingVertical={10}
            paddingHorizontal={20}
            borderColor={colors.violet}
        >
            <Txt>Want better price?</Txt>
            <Btn
                radius={5}
                marginTop={10}
                paddingVertical={10}
                paddingHorizontal={25}
                alignSelf={'flex-start'}
                backgroundColor={colors.darkViolet}
            >
                <Txt color={'white'} bold>CREATE BUY AD</Txt>
            </Btn>
        </Box>
    )
}

export default AD