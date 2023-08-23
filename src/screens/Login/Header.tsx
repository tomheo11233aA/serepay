import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { goBack } from '@utils/navigationRef'
import React from 'react'

interface Props {
    title: string;
}

const SIZE = 30

const Header = ({ title }: Props) => {
    return (
        <Box
            row
            alignCenter
            justifySpaceBetween
            paddingHorizontal={15}
        >
            <Btn onPress={() => goBack()}>
                <Icon
                    size={SIZE}
                    tintColor={'white'}
                    source={require('@images/unAuth/left.png')}
                />
            </Btn>

            <Txt color={'white'} size={18}>
                {title}
            </Txt>
            <Icon
                size={SIZE}
                tintColor={colors.darkViolet}
                source={require('@images/unAuth/left.png')}
            />
        </Box>
    )
}

export default Header