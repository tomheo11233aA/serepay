import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
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
            width={'48%'}
            paddingVertical={15}
            paddingHorizontal={10}
            backgroundColor={'white'}
        >
            <Box
                row
                alignEnd
                alignSelf={'flex-start'}
            >
                <Txt fontFamily={fonts.IBMPM}>
                    {title}
                </Txt>
            </Box>
            <Txt
                bold
                size={15}
                marginVertical={15}
            >
                {price} VND
            </Txt>
            <Btn
                radius={5}
                paddingVertical={7}
                paddingHorizontal={10}
                backgroundColor={buttonColor}
                alignSelf={'flex-start'}
            >
                <Txt color={'white'} bold>{buttonText}</Txt>
            </Btn>
        </Box>
    )
}

export default BuySellItem