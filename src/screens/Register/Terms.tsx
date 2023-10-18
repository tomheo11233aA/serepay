import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { TFunction } from 'i18next'
import React from 'react'

interface Props {
    t: TFunction<"translation", undefined>
}

const Terms = ({ t }: Props) => {
    return (
        <Box alignStart marginTop={10} width={'100%'} row>
            <Box
                width={15}
                height={15}
                borderWidth={1}
                borderColor={colors.gray2}
            />
            <Txt marginLeft={5}>
                {t('Do you agree with')}
                <Txt color={colors.violet}>{` ${t('Terms of Service')} `}</Txt>
                {t('and')}
                <Txt color={colors.violet}>{` ${t('Privacy Policy')} `}</Txt>
                {`${t('of Swap Tobe')}.`}
            </Txt>
        </Box>
    )
}

export default Terms