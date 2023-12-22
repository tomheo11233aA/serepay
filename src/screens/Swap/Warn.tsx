import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'

interface Props {
    title: string;
}

const Warn = ({ title }: Props) => {
    return (
        <Box row marginVertical={10} paddingRight={20}>
            <Icon
                size={25}
                marginRight={10}
                tintColor={'#c6edf2'}
                source={require('@images/wallet/attention.png')}
            />
            <Txt fontFamily={fonts.IBMPR} color={colors.black2} lineHeight={25}>
                {title}
            </Txt>
        </Box>
    )
}

export default Warn