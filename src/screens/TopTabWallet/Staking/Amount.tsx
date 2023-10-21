import React from 'react'
import Box from '@commom/Box'
import { colors } from '@themes/colors'
import Txt from '@commom/Txt'
import Icon from '@commom/Icon'
import Btn from '@commom/Btn'
import { styled } from '@themes/styled'
import { fonts } from '@themes/fonts'

const Amount = ({ t }: any) => {
    return (
        <Box
            radius={5}
            paddingVertical={10}
            paddingHorizontal={20}
            backgroundColor={colors.gray6}
            style={[styled.shadow, { shadowColor: colors.gray2 }]}
        >
            <Box row justifySpaceBetween>
                <Txt size={20} fontFamily={fonts.IBMPM}>$500</Txt>
                <Box
                    row
                    radius={3}
                    alignCenter
                    justifyCenter
                    paddingVertical={5}
                    paddingHorizontal={10}
                    backgroundColor={colors.violet}
                >
                    <Txt color={'white'} fontFamily={fonts.IBMPM}>
                        3 month (1%/month)
                    </Txt>
                    <Icon
                        tintColor={'white'}
                        size={15}
                        source={require('@images/wallet/more.png')}
                    />
                </Box>
            </Box>

            <Box row marginTop={15}>
                <Box marginRight={20}>
                    <Txt color={colors.gray4}>{t('Interest')}</Txt>
                    <Txt color={colors.gray4} marginVertical={3}>{t('Total')}</Txt>
                    <Txt color={colors.gray4}>USD</Txt>
                </Box>
                <Box>
                    <Txt>1%/month</Txt>
                    <Txt marginVertical={3}>3.00%</Txt>
                    <Txt>$51500</Txt>
                </Box>
            </Box>

            <Btn
                radius={5}
                width={'80%'}
                marginTop={20}
                paddingVertical={7}
                alignSelf={'center'}
                backgroundColor={colors.violet}
            >
                <Txt color={'white'} fontFamily={fonts.AS}>
                    {t('STAKING NOW')}
                </Txt>
            </Btn>
        </Box>
    )
}

export default Amount