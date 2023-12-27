import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { fonts } from '@themes/fonts'
import React from 'react'
import { ICoin } from '@models/coin'
import { useSelector, useDispatch } from 'react-redux'
import { configSelector } from '@redux/selector/userSelector'
import { fetchConfig } from '@redux/slice/getConfig'
import { AppDispatch } from '@redux/store/store'

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
    React.useEffect(() => {
        dispatch(fetchConfig({"name": "exchangeRate"}))
    }, [])
    React.useEffect(() => {
        if (config) {
            const newValue = config.length > 0 ? config[0].value : 0;
            setValue(newValue);
        }
    }, [config])

    let price = 0
    if (type === 'buy') {
        price = selectedCoin && selectedCoin.price !== undefined ? selectedCoin.price - (selectedCoin.price * (value/100)) : 0;
    } else {
        price = selectedCoin && selectedCoin.price !== undefined ? selectedCoin.price + (selectedCoin.price * (value/100)) : 0;
    }

    const [isPressed, setIsPressed] = React.useState(false);

    const handlePress = () => {
        setIsPressed(true);
        if (onPress) {
            onPress();
        }
    };

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
                onPress={handlePress}
            >
                <Txt color={'white'} bold>{isPressed ? 'Pressed' : buttonText}</Txt>
            </Btn>
        </Box>
    )
}

export default React.memo(BuySellItem)