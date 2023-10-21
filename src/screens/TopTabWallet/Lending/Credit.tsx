import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import React from 'react'
import Animated from 'react-native-reanimated'

interface Props {
    t: any;
}

const Credit = ({ t }: Props) => {
    return (
        <Box paddingHorizontal={15}>
            <Animated.View
                style={{
                    marginTop: 20,
                    borderRadius: 5,
                    paddingBottom: 20,
                    overflow: 'hidden',
                    backgroundColor: 'white',
                }}
            >
                <Box
                    height={40}
                    alignCenter
                    justifyCenter
                    backgroundColor={colors.gray}
                >
                    <Txt color={'black'} bold>
                        {t('TOBE CREDIT')}
                    </Txt>
                </Box>
                <Box row alignCenter paddingVertical={20}>
                    <Box alignCenter flex={1}>
                        <Txt fontFamily={fonts.IBMPR} color={colors.gray4}>{t('Bonus')}/{('month')}</Txt>
                        <Txt>1%</Txt>
                    </Box>
                    <Box alignCenter flex={1}>
                        <Box
                            row
                            radius={3}
                            alignCenter
                            justifySpaceBetween
                            paddingVertical={5}
                            paddingHorizontal={5}
                            backgroundColor={colors.violet}
                        >
                            <Icon
                                size={13}
                                opacity={0}
                                source={require('@images/wallet/more.png')}
                            />
                            <Txt color={'white'}>{` 6 ${t('MONTH')}   `}</Txt>
                            <Icon
                                size={13}
                                tintColor={'white'}
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
                    backgroundColor={colors.violet}
                >
                    <Txt bold color={'white'}>
                        {t('ACTIVATED')}
                    </Txt>
                </Btn>
            </Animated.View>
        </Box>
    )
}

export default Credit