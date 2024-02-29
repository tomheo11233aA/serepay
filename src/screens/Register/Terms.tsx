import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { TFunction } from 'i18next'
import React from 'react'
import { Checkbox } from 'react-native-paper';

interface Props {
    t: TFunction<"translation", undefined>
    checked: boolean
    setChecked: (value: boolean) => void
}

const Terms = ({ t, checked, setChecked }: Props) => {
    return (
        <Box alignStart marginTop={10} width={'100%'} row>
            {/* <View style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: colors.violet }} /> */}

            <Checkbox.Android
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
                color={colors.violet}
            />

            <Txt marginLeft={5}
                onPress={() => {
                    setChecked(!checked);
                }}
            >
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