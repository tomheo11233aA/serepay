import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import React from 'react'
import { ICoin } from '@models/coin'

interface Props {
    title: string;
    buttonText: string;
    buttonColor: string;
    selectedCoin: ICoin | null;
}
const BuySellItem = ({
    title,
    buttonText,
    buttonColor,
    selectedCoin
}: Props) => {
    const price = selectedCoin ? selectedCoin.price : 0;
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
                {price ? price.toLocaleString() : 0} USD
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

export default React.memo(BuySellItem)