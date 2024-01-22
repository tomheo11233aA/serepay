import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { fonts } from '@themes/fonts'
import React, { useCallback, useEffect, useState, useMemo, memo } from 'react'
import { ICoin } from '@models/coin'
import { useSelector, useDispatch } from 'react-redux'
import { configSelector } from '@redux/selector/userSelector'
import { fetchConfig } from '@redux/slice/getConfig'
import { AppDispatch } from '@redux/store/store'
import { selectedRateSelector } from '@redux/selector/userSelector'

interface Props {
    title: string;
    buttonText: string;
    buttonColor: string;
    selectedCoin: ICoin | null;
    type?: 'buy' | 'sell';
    onPress?: () => void;
}
const BuySellItem = ({
    title,
    buttonText,
    buttonColor,
    selectedCoin,
    type,
    onPress
}: Props) => {
    const config = useSelector(configSelector);
    const dispatch = useDispatch<AppDispatch>();
    const [value, setValue] = React.useState(0);
    const selectedRate = useSelector(selectedRateSelector);
    React.useEffect(() => {
        dispatch(fetchConfig({ "name": "exchangeRate" }))
    }, [])

    React.useEffect(() => {
        if (config) {
            const newValue = config.length > 0 ? config[0].value : 0;
            setValue(newValue);
        }
    }, [config])
    const price = useMemo(() => {
        let price = 0;
        if (type === 'buy') {
            // price = selectedCoin && selectedCoin.price !== undefined ? selectedCoin.price - (selectedCoin.price * (value / 100)) : 0;
            price = selectedCoin && selectedCoin.price !== undefined ? selectedCoin.price + (selectedCoin.price * (value / 100)) : 0;

        } else {
            // price = selectedCoin && selectedCoin.price !== undefined ? selectedCoin.price + (selectedCoin.price * (value / 100)) : 0;
            price = selectedCoin && selectedCoin.price !== undefined ? selectedCoin.price - (selectedCoin.price * (value / 100)) : 0;

        }
        return price * selectedRate.rate;
    }, [type, selectedCoin, value, selectedRate]);
    
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
                color={type === 'buy' ? 'green' : 'red'}
            >
                {price ? price.toFixed(2) : 0} {selectedRate.title} 
            </Txt>
            <Btn
                radius={5}
                paddingVertical={7}
                paddingHorizontal={10}
                backgroundColor={buttonColor}
                alignSelf={'flex-start'}
                onPress={onPress}
            >
                <Txt color={'white'} bold>{buttonText}</Txt>
            </Btn>
        </Box>
    )
}

export default React.memo(BuySellItem)