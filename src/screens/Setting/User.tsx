import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

interface Props {
    t: any;
}

const User = ({ t }: Props) => {
    return (
        <Box
            row
            radius={3}
            alignCenter
            marginVertical={10}
            justifySpaceBetween
            paddingHorizontal={5}
            backgroundColor={'white'}
        >
            <Box
                row
                alignCenter
                padding={10}
            >
                <Icon
                    size={25}
                    marginRight={10}
                    source={require('@images/unAuth/user.png')}
                />
                <Txt size={16}>
                    Hello PHIXUAN
                </Txt>
            </Box>
            <Box rotateZ={'180deg'} marginRight={10}>
                <Icon
                    size={25}
                    tintColor={colors.gray2}
                    source={require('@images/unAuth/left.png')}
                />
            </Box>
        </Box>
    )
}

export default User