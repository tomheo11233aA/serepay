import Box from '@commom/Box'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@themes/colors'
import React from 'react'
import Form from './Form'
import Icon from '@commom/Icon'
import { width } from '@utils/responsive'
import { styled } from '@themes/styled'

const Language = () => {
    return (
        <KeyBoardSafe bg={colors.darkViolet} paddingHorizontal={20}>
            <Box style={styled.box}>
                <Icon
                    resizeMode={'contain'}
                    size={width * 40 / 100}
                    source={require('@images/logo.png')}
                />
                <Form />
            </Box>
        </KeyBoardSafe>
    )
}

export default Language