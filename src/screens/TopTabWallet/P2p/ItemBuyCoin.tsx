import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import { colors } from '@themes/colors';
import { styled } from '@themes/styled';
import React from 'react';
import { IUser } from './BuyCoin';

interface Props {
    t: any;
    user: IUser;
}

const ItemBuyCoin = ({ user, t }: Props) => {
    return (
        <Box
            row
            padding={20}
            marginVertical={7}
            backgroundColor={colors.gray6}
            style={[styled.shadow, { shadowColor: '#f6f6f6' }]}
        >
            <Box flex={1}>
                <Txt color={colors.green} bold>
                    {user.price}
                    <Txt bold color={colors.gray4}>
                        {' VNDR/BTC'}
                    </Txt>
                </Txt>
                <Txt
                    marginTop={5}
                    color={colors.gray4}
                >
                    {`${t('Maximum')}: ${user.max} ${user.symbol}`}
                </Txt>
                <Txt marginTop={10} color={colors.gray4}>
                    {t('Swaptobe Wallet')}
                </Txt>
                <Txt marginTop={5} color={colors.gray4} bold>
                    {t('Completion time')}: {user.time}
                </Txt>
                <Txt marginTop={10} color={'#72f7af'}>
                    {'● '}
                    <Txt color={colors.gray4}>
                        {user.name}
                    </Txt>
                </Txt>
            </Box>

            <Btn
                radius={5}
                alignSelf={'center'}
                paddingVertical={7}
                paddingHorizontal={25}
                backgroundColor={colors.green}
            >
                <Txt color={'white'}>
                    {t('Buy')}
                </Txt>
            </Btn>
        </Box>
    )
}

export default ItemBuyCoin