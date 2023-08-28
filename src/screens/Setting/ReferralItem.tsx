import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

interface Props {
    title: string;
}

const ReferralItem = ({ title }: Props) => {
    return (
        <Box
            row
            alignCenter
            radius={5}
            width={'48%'}
            paddingVertical={10}
            paddingHorizontal={15}
            backgroundColor={colors.violet}
        >
            <Icon
                size={25}
                tintColor={'white'}
                source={require('@images/setting/copy.png')}
            />
            <Txt color={'white'} bold marginLeft={5}>
                {title}
            </Txt>
        </Box>
    )
}

export default ReferralItem