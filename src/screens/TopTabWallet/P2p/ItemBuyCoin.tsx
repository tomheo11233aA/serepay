import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import { colors } from '@themes/colors';
import { styled } from '@themes/styled';
import React from 'react';
import { roundDecimalValues } from '../../../helper/function/roundCoin';
import moment from 'moment';

import { IHistory } from '@models/history';
import { fonts } from '@themes/fonts';
interface Props {
    t: any;
    user: IHistory;
    adType?: 'buy' | 'sell';
}

const ItemBuyCoin = ({ user, t, adType }: Props) => {
    const formatTime = (time: string) => {
        return moment(time, "DD/MM/YYYY H:m:s").format('DD/MM/YYYY HH:mm:ss')
    }
    return (
        <Box
            row
            padding={15}
            marginVertical={7}
            radius={5}
            backgroundColor={colors.gray6}
            justifySpaceBetween
            style={[styled.shadow, { shadowColor: '#f6f6f6' }]}>
            <Box flex={1}>
                <Box row>
                    <Txt fontFamily={fonts.IBMPM} bold color={colors.gray4}>
                        {t('Maximum')}:
                    </Txt>
                    <Txt fontFamily={fonts.IBMPM} color={'black'} marginLeft={5}>
                        {parseFloat(roundDecimalValues(user.amount, 10001))} {user.symbol}
                    </Txt>
                </Box>
                <Box row marginTop={5}>
                    <Txt fontFamily={fonts.IBMPM} bold color={colors.gray4}>
                        {t('Minimum')}:
                    </Txt>
                    <Txt fontFamily={fonts.IBMPM} color={'black'} marginLeft={5}>
                        {parseFloat(roundDecimalValues(user.amountMinimum, 10001))} {user.symbol}
                    </Txt>
                </Box>
                <Box row marginTop={5}>
                    <Txt fontFamily={fonts.IBMPM} bold color={colors.gray4}>
                        {`${t(adType === 'buy' ? 'Seller' : 'Buyer')}:`}
                    </Txt>
                    <Txt fontFamily={fonts.IBMPM} color={'black'} marginLeft={5}>
                        {user.userName.replace(/\b\w/g, l => l.toUpperCase())}
                    </Txt>
                </Box>

                {/* <Box row marginTop={5}>
                    <Txt fontFamily={fonts.IBMPM} color={colors.gray4}>
                        {t('Available')}:
                    </Txt>
                    <Txt fontFamily={fonts.IBMPM} marginLeft={5} color={'black'}>
                        {parseFloat(roundDecimalValues(user.amount - user.amountSuccess, 10001))} {user.symbol}
                    </Txt>
                </Box>
                <Box row marginTop={5}>
                    <Box row>
                        <Txt fontFamily={fonts.IBMPM} color={colors.gray4}>
                            {t('Min')}:
                        </Txt>
                        <Txt fontFamily={fonts.IBMPM} marginLeft={5} color={'black'}>
                            {user.amountMinimum}
                        </Txt>
                    </Box>
                    <Box row marginLeft={15}>
                        <Txt fontFamily={fonts.IBMPM} color={colors.gray4}>
                            {t('Max')}:
                        </Txt>
                        <Txt fontFamily={fonts.IBMPM} marginLeft={5} color={'black'}>
                            {user.amount}
                        </Txt>
                    </Box>
                </Box>
                <Box row marginTop={5}>
                    <Txt fontFamily={fonts.IBMPM} color={colors.gray4}>
                        {t('Created At')}:
                    </Txt>
                    <Txt fontFamily={fonts.IBMPM} marginLeft={5} color={'black'}>
                        {formatTime(user.created_at)}
                    </Txt>
                </Box> */}
            </Box>
            <Box flex={1} justifyCenter maxWidth={'33%'}>
                <Txt alignSelf={'center'} fontFamily={fonts.IBMPM} bold color={colors.gray4} flexShrink={1}>
                    {t('Banking')}
                </Txt>
            </Box>
            <Btn radius={5} alignSelf={'center'} paddingVertical={7} paddingHorizontal={25} maxWidth={150} backgroundColor={adType === 'buy' ? colors.green : colors.red}>
                <Txt bold fontFamily={fonts.IBMPM} color={'white'}>
                    {t(adType === 'buy' ? 'Buy' : 'Sell')}
                </Txt>
            </Btn>
        </Box>
    )
}

export default React.memo(ItemBuyCoin)