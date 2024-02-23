import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'
import { useSelector } from 'react-redux';
import { coinListSelector } from '@redux/selector/userSelector'
import { keys } from '@contants/keys'
import { ICoin } from '@models/coin'
import Btn from '@commom/Btn'
import { useCoinSocket } from '../../../helper/useCoinSocket'
import { userWalletUserSelector } from '@redux/selector/userSelector'
import { IUserWallet } from '@models/user'
import { roundDecimalValues } from '../../../helper/function/roundCoin'


type Props = {
    t?: any
    style?: any
    isShowHeader?: boolean
    onCoinSelected?: (coin: ICoin) => void
}
const Coins: React.FC<Props> = ({ t, style, isShowHeader, onCoinSelected }) => {
    useCoinSocket()
    const coins = useSelector(coinListSelector)
    const userWallet: IUserWallet | undefined = useSelector(userWalletUserSelector);
    return (
        <Box>
            <Scroll style={style} showsVerticalScrollIndicator={false}>
                {coins.map((coin) => {
                    const volume = roundDecimalValues(userWallet?.[`${coin?.symbolWallet?.toLowerCase()}_balance`] || 0, coin.price);
                    return (
                        <Btn
                            row
                            alignCenter
                            padding={20}
                            key={coin.id}
                            justifySpaceBetween
                            onPress={() => {
                                if (onCoinSelected) {
                                    onCoinSelected(coin)
                                }
                            }}
                        >
                            <Box row alignCenter>
                                <Icon
                                    size={35}
                                    marginRight={10}
                                    source={{ uri: `${keys.HOSTING_API}${coin.image}` }}
                                />
                                <Box>
                                    <Txt bold size={16} color={colors.darkGreen}>
                                        {coin.name}
                                    </Txt>
                                    <Txt marginTop={9} size={14} color={colors.darkGreen}>
                                        {`$${coin.price.toLocaleString()}  `}
                                        <Txt color={coin.percent >= 0 ? '#75c1a8' : '#c94d4d'}>
                                            {coin.percent >= 0 ? `+${coin.percent}%` : `${coin.percent}%`}
                                        </Txt>
                                    </Txt>

                                </Box>
                            </Box>
                            <Txt bold color={colors.darkGreen}>
                                {/* {`${Number(volume)} ${coin.symbolWallet}`} */}
                                {`${Number(volume) < 0.0001 ? Number(volume) : volume.toLocaleString()} ${coin.symbolWallet}`}
                            </Txt>
                        </Btn>
                    )
                })}
            </Scroll>
        </Box>
    )
}

export default React.memo(Coins)