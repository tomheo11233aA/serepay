import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'
import ItemBuyCoin from './ItemBuyCoin'
import Scroll from '@commom/Scroll'

export interface IUser {
    max: string;
    time: string;
    USDT: string;
    name: string;
    price: string;
    symbol: string;
}

const BuyCoin = () => {
    const users: IUser[] = [
        {
            time: '0s',
            USDT: 'VNDR',
            symbol: 'BTC',
            max: '0.0000936',
            name: 'davidpham',
            price: '835,069,199',
        },
        {
            time: '0s',
            USDT: 'VNDR',
            symbol: 'BTC',
            max: '0.0000936',
            name: 'davidpham',
            price: '835,069,199',
        },
    ]

    return (
        <Box paddingHorizontal={15}>
            <Box row alignCenter>
                <Icon
                    size={25}
                    marginRight={10}
                    resizeMode={'contain'}
                    source={require('@images/wallet/down.png')}
                />
                <Txt>
                    You want to
                    <Txt color={colors.green} bold>
                        {' Buy '}
                    </Txt>
                    BTC?
                </Txt>
            </Box>

            <Scroll>
                {users.map((user) =>
                    <ItemBuyCoin
                        key={Math.random()}
                        user={user}
                    />
                )}
            </Scroll>
        </Box>
    )
}

export default BuyCoin