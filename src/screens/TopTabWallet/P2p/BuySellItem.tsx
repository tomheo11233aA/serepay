import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

interface Props {
    title: string;
    price: number | string;
    buttonText: string;
    buttonColor: string;
}

const BuySellItem = ({
    title,
    price,
    buttonText,
    buttonColor,
}: Props) => {
    return (
        <Box
            radius={5}
            alignCenter
            width={'48%'}
            paddingVertical={15}
            backgroundColor={colors.violet}
        >
            <Box
                row
                alignEnd
                paddingHorizontal={5}
                alignSelf={'flex-start'}
            >
                <Icon
                    size={18}
                    marginRight={10}
                    tintColor={'white'}
                    source={require('@images/wallet/uploadarrow.png')}
                />
                <Txt color={'white'}>
                    {title}
                </Txt>
            </Box>
            <Txt
                bold
                size={15}
                color={'white'}
                marginVertical={15}
            >
                {price} VND
            </Txt>
            <Btn
                radius={5}
                paddingVertical={7}
                paddingHorizontal={10}
                backgroundColor={buttonColor}
            >
                <Txt color={'white'} bold>{buttonText}</Txt>
            </Btn>
        </Box>
    )
}

export default BuySellItem