import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { TFunction } from 'i18next'
import React from 'react'

interface Props {
    t: TFunction<"translation", undefined>
}

const SelectCountry = ({ t }: Props) => {
    return (
        <Box
            row
            radius={5}
            height={45}
            alignCenter
            width={'100%'}
            marginTop={15}
            borderWidth={1}
            justifySpaceBetween
            paddingHorizontal={10}
            borderColor={colors.gray}
        >
            <Txt>{t('Select Country')}</Txt>
            <Box rotateZ={'-90deg'}>
                <Icon
                    size={25}
                    tintColor={'black'}
                    source={require('@images/unAuth/left.png')}
                />
            </Box>
        </Box>
    )
}

export default SelectCountry