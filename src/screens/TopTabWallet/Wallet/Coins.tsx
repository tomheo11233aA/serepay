import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'
import { socket } from '../../../helper/AxiosInstance'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@redux/store/store'
import { setListCoinRealtime } from '@redux/slice/coinSlice'
import { coinListSelector } from '@redux/selector/userSelector'
import { keys } from '@contants/keys' 
import { ICoin } from '@models/coin'
import Btn from '@commom/Btn'
import { useCoinSocket } from '../../../helper/useCoinSocket'

type Props = {
    t?: any
    style?: any
    isShowHeader?: boolean
    onCoinSelected?: (coin: ICoin) => void
}
const Coins:React.FC<Props> = ({t, style, isShowHeader, onCoinSelected}) => {
    // const dispatch: AppDispatch = useDispatch()
    const coins = useSelector(coinListSelector)
    // React.useEffect(() => {
    //     socket.connect();
    //     socket.on("listCoin", (resp) => {
    //         dispatch(setListCoinRealtime(resp));
    //     });
    //     return () => {
    //         socket.off("listCoin");
    //         socket.disconnect();
    //     }
    // }, [])
    useCoinSocket()

    return (
        <Box>
            <Scroll style={style} showsVerticalScrollIndicator={false}>
                {/* {isShowHeader && (
                    <Box
                        row
                        alignCenter
                        padding={20}
                        justifySpaceBetween
                    >
                        <Txt bold size={16} color={colors.darkGreen}>
                            {t('Coin')}
                        </Txt>
                        <Txt bold size={16} color={colors.darkGreen}>
                            {t('24h Volume')}
                        </Txt>
                    </Box>
                )} */}
                {coins.map((coin) => {
                    return (
                        <Btn
                            row
                            alignCenter
                            padding={20}
                            key={coin.id}
                            justifySpaceBetween
                            onPress={() => onCoinSelected && onCoinSelected(coin)}
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
                                        {`$${coin.price}  `}
                                        <Txt color={coin.percent >= 0 ? '#75c1a8' : '#c94d4d'}>
                                            {coin.percent >= 0 ? `+${coin.percent}%` : `${coin.percent}%`}
                                        </Txt>
                                    </Txt>

                                </Box>
                            </Box>
                            <Txt bold color={colors.darkGreen}>
                                {`${coin.volume} ${coin.symbolWallet}`}
                            </Txt>
                        </Btn>
                    )
                })}
            </Scroll>
        </Box>
    )
}

export default React.memo(Coins)