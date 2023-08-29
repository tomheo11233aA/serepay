import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'
import Animated from 'react-native-reanimated'

const Credit = () => {
    return (
        <Box paddingHorizontal={15}>
            <Animated.View
                style={{
                    marginTop: 20,
                    borderRadius: 5,
                    paddingBottom: 20,
                    overflow: 'hidden',
                    backgroundColor: colors.violet,
                }}
            >
                <Box
                    height={40}
                    alignCenter
                    justifyCenter
                    backgroundColor={colors.darkViolet}
                >
                    <Txt color={'white'} bold size={16}>
                        TOBE CREDIT
                    </Txt>
                </Box>
                <Box row alignCenter paddingVertical={20}>
                    <Box alignCenter flex={1}>
                        <Txt color={'white'}>Bonus/month</Txt>
                        <Txt color={'white'} bold>1%</Txt>
                    </Box>
                    <Box alignCenter flex={1}>
                        <Box
                            row
                            radius={3}
                            alignCenter
                            justifySpaceBetween
                            paddingVertical={5}
                            paddingHorizontal={5}
                            backgroundColor={colors.violet2}
                        >
                            <Icon
                                size={13}
                                opacity={0}
                                source={require('@images/wallet/more.png')}
                            />
                            <Txt>{'   6 MONTH   '}</Txt>
                            <Icon
                                size={13}
                                source={require('@images/wallet/more.png')}
                            />
                        </Box>
                    </Box>
                </Box>
                <Btn
                    radius={5}
                    width={'70%'}
                    paddingVertical={8}
                    alignSelf={'center'}
                    backgroundColor={'white'}
                >
                    <Txt bold color={colors.darkViolet}>
                        ACTIVATED
                    </Txt>
                </Btn>
            </Animated.View>
        </Box>
    )
}

export default Credit