import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'

const Coins = () => {
    const coins = [
        {
            price: 10,
            USDT: 0.5,
            percent: 33,
            symbol: 'SWB',
            title: 'SWB Coin',
            icon: require('@images/wallet/swb.png'),
        },
        {
            price: 0,
            percent: 1,
            USDT: 0.001,
            symbol: 'STF',
            title: 'Swap Tobe Coin',
            icon: require('@images/wallet/swb.png'),
        },
        {
            price: 200,
            symbol: 'BTC',
            percent: -8.201,
            USDT: 38_590.45,
            title: 'Bitcoin',
            icon: require('@images/wallet/bitcoin.png'),
        },
        {
            price: 25,
            symbol: 'ETH',
            USDT: 2_844.44,
            percent: -9.603,
            title: 'Ethereum',
            icon: require('@images/wallet/eth.png'),
        },
        {
            price: 0,
            USDT: 0.5,
            percent: 33,
            symbol: 'SWBS',
            title: 'SWB Coin',
            icon: require('@images/wallet/swb.png'),
        },
    ]

    return (
        <Box>
            <Scroll>
                {coins.map((coin) => {
                    let [percent, colorPercent] = ['', 'red']
                    if (coin.percent) {
                        percent = coin.percent >= 0 ? `+${coin.percent}%` : `${coin.percent}%`
                        colorPercent = coin.percent >= 0 ? '#75c1a8' : '#c94d4d'
                    }
                    return (
                        <Box
                            row
                            alignCenter
                            padding={20}
                            key={coin.symbol}
                            justifySpaceBetween
                        >
                            <Box row alignCenter>
                                <Icon
                                    size={35}
                                    marginRight={10}
                                    source={coin.icon}
                                />
                                <Box>
                                    <Txt bold size={16} color={colors.darkGreen}>
                                        {coin.title}
                                    </Txt>
                                    <Txt marginTop={9} size={14} color={colors.darkGreen}>
                                        {`$${coin.USDT}  `}
                                        <Txt color={colorPercent}>
                                            {percent}
                                        </Txt>
                                    </Txt>

                                </Box>
                            </Box>
                            <Txt bold color={colors.darkGreen}>
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