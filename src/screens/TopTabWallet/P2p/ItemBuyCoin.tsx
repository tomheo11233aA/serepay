import { View, Text } from 'react-native'
import React from 'react'
import { IUser } from './BuyCoin'
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import Btn from '@commom/Btn';
import { styled } from '@themes/styled';
import { colors } from '@themes/colors';

interface Props {
    user: IUser;
}

const ItemBuyCoin = ({ user }: Props) => {
    return (
        <Box
            row
            padding={20}
            marginVertical={7}
            backgroundColor={'#fafafa'}
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
                    {`Maximum: ${user.max} ${user.symbol}`}
                </Txt>
                <Txt marginTop={10} color={colors.gray4}>
                    Swaptobe Wallet
                </Txt>
                <Txt marginTop={5} color={colors.gray4} bold>
                    Completion time: {user.time}
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
                    Buy
                </Txt>
            </Btn>
        </Box>
    )
}

export default ItemBuyCoin