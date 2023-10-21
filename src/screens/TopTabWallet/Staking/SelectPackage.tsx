import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import React from 'react'
import Animated from 'react-native-reanimated'

const SelectPackage = ({ t }: any) => {
    return (
        <Box paddingHorizontal={15}>
            <Animated.View
                style={{
                    marginTop: 20,
                    borderRadius: 5,
                    overflow: 'hidden',
                }}
            >
                <Box
                    height={40}
                    alignCenter
                    justifyCenter
                    backgroundColor={colors.gray}
                >
                    <Txt color={'black'} bold fontFamily={fonts.AS}>
                        {t('Select Package Staking')}
                    </Txt>
                </Box>
                <Box
                    paddingHorizontal={30}
                    paddingVertical={20}
                    backgroundColor={'white'}
                >
                    <Box
                        row
                        radius={5}
                        alignCenter
                        justifySpaceBetween
                        paddingVertical={10}
                        paddingHorizontal={10}
                        backgroundColor={colors.violet3}
                    >
                        <Icon
                            size={18}
                            opacity={0}
                            source={require('@images/wallet/more.png')}
                        />
                        <Txt bold>
                            $500
                        </Txt>
                        <Icon
                            size={18}
                            source={require('@images/wallet/more.png')}
                        />
                    </Box>
                </Box>
            </Animated.View>
        </Box>
    )
}

export default SelectPackage