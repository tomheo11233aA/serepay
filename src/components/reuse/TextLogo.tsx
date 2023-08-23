import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import React from 'react'

const TextLogo = ({ size = 35 }) => {
    return (
        <Txt
            size={size + 10}
            color={colors.green}
            fontFamily={fonts.FLG}
        >
            S<Txt size={size} color={colors.green}>
                wap
            </Txt>
            <Txt size={size} color={'white'}>
                tobe
            </Txt>
        </Txt>
    )
}

export default TextLogo