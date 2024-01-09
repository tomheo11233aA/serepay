import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React, { useEffect } from 'react'
import ItemBuyCoin from './ItemBuyCoin'
import Scroll from '@commom/Scroll'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListAdsBuy, fetchListAdsSell } from '@redux/slice/historySlice'
import { adsBuySelector, adsSellSelector } from '@redux/selector/userSelector'
import { AppDispatch } from '@redux/store/store'
import { IHistory } from '@models/history'
import { Image } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BuyCoin = ({ t, type, selectedCoin }: any) => {
    const dispatch: AppDispatch = useDispatch()
    const users: IHistory[] = type === 'buy' ? useSelector(adsSellSelector) : useSelector(adsBuySelector)
    const symbol = selectedCoin ? selectedCoin.name : 'BTC';
    const [sellLoading, setSellLoading] = React.useState(true);
    const [buyLoading, setBuyLoading] = React.useState(true);
    useEffect(() => {
        const fetchListAds = async () => {
            if (type === 'buy') {
                await dispatch(fetchListAdsBuy({
                    page: 1,
                    limit: 5,
                    symbol: symbol
                }))
                setBuyLoading(false)
            } else {
                await dispatch(fetchListAdsSell({
                    page: 1,
                    limit: 5,
                    symbol: symbol
                }))
                setSellLoading(false)
            }
        }
        fetchListAds()
    }, [dispatch, type, selectedCoin])

    return (
        <Box paddingHorizontal={15}>
            <Box row alignCenter >
                <Spinner
                    visible={type === 'buy' ? buyLoading : sellLoading}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                <Icon
                    size={25}
                    marginRight={10}
                    resizeMode={'contain'}
                    source={require('@images/wallet/down.png')}
                />
                <Txt>
                    {t('You want to')}
                    {type === 'buy' ? <Txt color={colors.green} bold>
                        {` ${t('Buy')} `}
                    </Txt> : <Txt color={colors.red} bold>
                        {` ${t('Sell')} `}
                    </Txt>}
                    {symbol}?
                    <Txt>
                    </Txt>
                </Txt>
            </Box>

            <Scroll>
                {Number(users.length) > 0 ? (
                    users.map((user) =>
                        <ItemBuyCoin
                            key={user.id}
                            user={user}
                            t={t}
                            adType={type}
                        />
                    )
                ) : (
                    <Box marginVertical={20}
                        alignCenter
                        minHeight={hp('15%')}
                        maxHeight={hp('22%')}
                        justifyContent={'center'}
                    >
                        <Image
                            source={require('@images/tab/nodata.png')}
                            style={{
                                alignSelf: 'center',
                            }}
                        />
                        <Txt marginTop={10} color={colors.darkGreen} size={14}>
                            {t('No data')}
                        </Txt>
                    </Box>
                )
                }
            </Scroll>
        </Box>
    )
}

export default React.memo(BuyCoin)