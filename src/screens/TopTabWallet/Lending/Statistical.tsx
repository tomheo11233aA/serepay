import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { styled } from '@themes/styled'
import React from 'react'

interface Props {
    t: any;
}

const Statistical = ({ t }: Props) => {
    return (
        <Box marginTop={40}>
            <Box
                alignCenter
                paddingVertical={10}
                paddingHorizontal={20}
                backgroundColor={colors.gray}
            >
                <Txt>{t('History Lending')}</Txt>
            </Box>
            <Box
                row
                height={150}
                backgroundColor={colors.gray6}
                style={[styled.shadow, { shadowColor: colors.gray2 }]}
            >
                <Box
                    row
                    alignCenter
                    justifyCenter
                    width={'100%'}
                    marginBottom={10}
                    alignSelf={'flex-end'}
                >
                    <Box
                        paddingVertical={3}
                        paddingHorizontal={20}
                        backgroundColor={'white'}
                    >
                        <Txt color={colors.gray2}>{t('Next Page')}</Txt>
                    </Box>
                    <Box rotateZ={'180deg'}>
                        <Icon
                            size={17}
                            tintColor={colors.gray2}
                            source={require('@images/unAuth/left.png')}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Statistical