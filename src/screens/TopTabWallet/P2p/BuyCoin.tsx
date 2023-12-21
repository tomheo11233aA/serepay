import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React, { useEffect } from 'react'
import ItemBuyCoin from './ItemBuyCoin'
import Scroll from '@commom/Scroll'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListAdsBuy, fetchListAdsSell } from '@redux/slice/historySlice'
import { historySelector, adsBuySelector, adsSellSelector } from '@redux/selector/userSelector'
import { AppDispatch } from '@redux/store/store'
import { IHistory } from '@models/history'
import { Image } from 'react-native'

const BuyCoin = ({ t, type }: any) => {
    const dispatch: AppDispatch = useDispatch()
    const users: IHistory[] = type === 'buy' ? useSelector(adsBuySelector) : useSelector(adsSellSelector)
    useEffect(() => {
        type === 'buy' ? dispatch(fetchListAdsBuy({
            page: 1,
            limit: 5,
            symbol: 'BTC'
        })) : dispatch(fetchListAdsSell({
            page: 1,
            limit: 5,
            symbol: 'BTC'
        }))
    }, [dispatch, type])

    return (
        <Box paddingHorizontal={15}>
            <Box row alignCenter >
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
                    BTC?
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
                        />
                    )
                ) : (
                    <Box marginTop={20} alignCenter>
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

export default BuyCoin