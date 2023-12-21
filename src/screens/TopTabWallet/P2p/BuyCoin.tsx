import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React, { useEffect } from 'react'
import ItemBuyCoin from './ItemBuyCoin'
import Scroll from '@commom/Scroll'
import { useSelector, useDispatch } from 'react-redux'
import { fetchListAdsBuy } from '@redux/slice/historySlice'
import { historySelector } from '@redux/selector/userSelector'
import { AppDispatch } from '@redux/store/store'
import { IGetListAdsBuy } from '@models/P2P/USER/getListAdsBuy'
import { setListAdsBuy } from '@redux/slice/historySlice'
import { IResponse } from '@redux/slice/historySlice'

const BuyCoin = ({ t , type}: any) => {
    const dispatch: AppDispatch = useDispatch()
    const users: IResponse[] = useSelector(historySelector)
    useEffect(() => {
            dispatch(fetchListAdsBuy({
                page: 1,
                limit: 10,
                symbol: 'ETH'
            }))        
    }, [dispatch, type])

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
                    {t('You want to')}
                    <Txt color={colors.green} bold>
                        {` ${t('Buy')} `}
                    </Txt>
                    BTC?
                </Txt>
            </Box>

            <Scroll>
                {users.map((user) =>
                    <ItemBuyCoin
                        key={user.id}
                        user={user}
                        t={t}
                    />
                )}
            </Scroll>
        </Box>
    )
}

export default BuyCoin