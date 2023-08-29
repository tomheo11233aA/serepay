import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'
import { IOption } from './List'

interface Props {
    item: IOption
}

const Item = ({item}: Props) => {
    return (
        <Box
            row
            alignCenter
            key={item.title}
            justifySpaceBetween
            paddingHorizontal={10}
            paddingVertical={10}
            borderBottomWidth={1}
            borderColor={colors.gray}
        >
            <Box row alignCenter>
                <Icon
                    size={25}
                    marginRight={10}
                    source={item.icon}
                />
                <Txt size={16}>{item.title}</Txt>
            </Box>
            <Box rotateZ={'180deg'}>
                <Icon
                    size={20}
                    tintColor={colors.gray4}
                    source={require('@images/unAuth/left.png')}
                />
            </Box>
        </Box>
    )
}

export default Item