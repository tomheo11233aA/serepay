import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { fonts } from '@themes/fonts'
import React, { useEffect, useState, useMemo } from 'react'
import { ICoin } from '@models/coin'
import { useSelector, useDispatch } from 'react-redux'
import { config2Selector, config3Selector } from '@redux/selector/userSelector'
import { fetchConfig2, fetchConfig3 } from '@redux/slice/getConfig'
import { AppDispatch } from '@redux/store/store'
import { selectedRateSelector } from '@redux/selector/userSelector'
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import { roundCoin } from '@screens/Swap/MakePrice'

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
    const config2 = useSelector(config2Selector);
    // const config3 = useSelector(config3Selector);
    const selectedRate = useSelector(selectedRateSelector);
    const [supportedCurrencies, setSupportedCurrencies] = useState<any>([]);
    const dispatch = useDispatch<AppDispatch>();
    // const [value, setValue] = React.useState(0);
    const [value2, setValue2] = React.useState(0);

    useEffect(() => {
        dispatch(fetchConfig2())
        // dispatch(fetchConfig3())
    }, [])

    useEffect(() => {
        // if (config3) {
        //     const newValue3 = config3.length > 0 ? config3[0].value : 0;
        //     setValue(newValue3);
        // }

        if (config2) {
            const newValue2 = config2.length > 0 ? config2[0].value : 0;
            setValue2(newValue2);
        }
    }, [config2])

    const price = useMemo(() => {
        let price = 0;
        if (type === 'buy') {
            // price = selectedCoin && selectedCoin.price !== undefined ? selectedCoin.price + (selectedCoin.price * (value / 100)) : 0;
            price = selectedCoin && selectedCoin.price !== undefined ? selectedCoin.price : 0;
        } else {
            price = selectedCoin && selectedCoin.price !== undefined ?
                selectedCoin.price - (selectedCoin.price * (value2 / 100)) : 0;
        }
        return price * selectedRate.rate;
    }, [type, selectedCoin, selectedRate]);
    useEffect(() => {
        const loadSupportedCurrencies = async () => {
            const currencies = await getSupportedCurrencies();
            setSupportedCurrencies(currencies.map(currency => currency.code));
        };
        loadSupportedCurrencies();
    }, []);
    const currencyCode = useMemo(() => {
        return supportedCurrencies.includes(selectedRate.title) ? selectedRate.title : null;
    }, [supportedCurrencies]);
    const displayCurrency = useMemo(() => {
        if (currencyCode) {
            const transferPriceRounded = currencyCode === 'VND' ? Math.round(price) : price;
            const [valueFormattedWithSymbol, valueFormattedWithoutSymbol] = formatCurrency({
                amount: Number(roundCoin(transferPriceRounded)),
                code: currencyCode,
            });
            return `${valueFormattedWithoutSymbol} ${currencyCode}`;
        } else {
            return `${price.toLocaleString()} ${selectedRate.title}`;
        }
    }, [currencyCode, price]);
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
                {displayCurrency}
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