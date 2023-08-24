import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

const Coins = () => {
    const coins = [
        {
            price: 0,
            title: 'VND',
            symbol: 'VND',
            icon: require('@images/unAuth/vietnam.png'),
        },
        {
            price: 0,
            USDT: 0.5,
            percent: 33,
            symbol: 'SWB',
            title: 'SWB Coin',
            icon: require('@images/wallet/swb.png'),
        },
        {
            price: 0,
            percent: 0,
            USDT: 0.001,
            symbol: 'STF',
            title: 'Swap Tobe Coin',
            icon: require('@images/wallet/swb.png'),
        },
        {
            price: 0,
            symbol: 'BTC',
            percent: -8.201,
            USDT: 38_590.45,
            title: 'Bitcoin',
            icon: require('@images/wallet/bitcoin.png'),
        },
        {
            price: 0,
            symbol: 'ETH',
            USDT: 2_844.44,
            percent: -9.603,
            title: 'Ethereum',
            icon: require('@images/wallet/eth.png'),
        },
    ]

    return (
        <Box
            flex={1}
            marginTop={20}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            backgroundColor={'white'}
        >
            <Scroll>
                {coins.map((coin) => {
                    let [percent, colorPercent] = ['', 'red']
                    if (coin.percent) {
                        percent = coin.percent >= 0 ? `+${coin.percent}%` : `${coin.percent}%`
                        colorPercent = coin.percent >= 0 ? 'green' : 'red'
                    }
                    return (
                        <Box
                            row
                            alignCenter
                            padding={20}
                            key={coin.symbol}
                            justifySpaceBetween
                            borderBottomWidth={1}
                            borderColor={colors.gray}
                        >
                            <Box row alignCenter>
                                <Icon
                                    size={35}
                                    marginRight={10}
                                    source={coin.icon}
                                />
                                <Box>
                                    <Txt bold size={16}>
                                        {coin.title}
                                    </Txt>
                                    {percent &&
                                        <Txt marginTop={10} size={15} bold>
                                            {`$${coin.USDT}       `}
                                            <Txt bold color={colorPercent}>
                                                {percent}
                                            </Txt>
                                        </Txt>
                                    }
                                </Box>
                            </Box>
                            <Txt bold size={18}>
                                {`${coin.price} ${coin.symbol}`}
                            </Txt>
                        </Box>
                    )
                })}
            </Scroll>
        </Box>
    )
}

export default Coins