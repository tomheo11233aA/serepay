import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { screens } from '@contants/screens'
import { colors } from '@themes/colors'
import { navigate } from '@utils/navigationRef'
import { TFunction } from 'i18next'
import React, { useState } from 'react'
import SelectCountry from './SelectCountry'
import Terms from './Terms'

interface Props {
    t: TFunction<"translation", undefined>
}

const Form = ({ t }: Props) => {
    const [security, setSecurity] = useState<boolean>(true)

    return (
        <Box width={'100%'} paddingHorizontal={40} alignCenter>
            <Input
                radius={5}
                height={45}
                width={'100%'}
                hint={t('Email')}
                borderWidth={1}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                iconOne={require('@images/unAuth/mail.png')}
            />
            <Input
                radius={5}
                height={45}
                width={'100%'}
                marginTop={15}
                borderWidth={1}
                hint={t('Username')}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                iconOne={require('@images/unAuth/user.png')}
            />
            <Input
                radius={5}
                height={45}
                width={'100%'}
                marginTop={15}
                borderWidth={1}
                hint={t('Password')}
                security={security}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                onPress={() => setSecurity(!security)}
                iconOne={require('@images/unAuth/lock.png')}
                iconTwo={security ?
                    require('@images/unAuth/view.png') :
                    require('@images/unAuth/hide.png')
                }
            />
            <Input
                radius={5}
                height={45}
                width={'100%'}
                marginTop={15}
                borderWidth={1}
                hint={t('Password')}
                security={security}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                onPress={() => setSecurity(!security)}
                iconOne={require('@images/unAuth/lock.png')}
                iconTwo={security ?
                    require('@images/unAuth/view.png') :
                    require('@images/unAuth/hide.png')
                }
            />
            <Input
                radius={5}
                height={45}
                hint={'Ref'}
                width={'100%'}
                marginTop={15}
                borderWidth={1}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                iconOne={require('@images/unAuth/message.png')}
            />
            <SelectCountry t={t} />
            <Terms t={t} />
            <Box>
                <Box
                    width={20}
                />
            </Box>
            <Btn
                radius={5}
                height={45}
                marginTop={20}
                width={'100%'}
                backgroundColor={colors.darkViolet}
            >
                <Txt color={'white'} bold>
                    {t('REGISTER')}
                </Txt>
            </Btn>
            <Btn
                onPress={() => navigate(screens.LOGIN)}
                marginVertical={20}
            >
                <Txt>
                    {t('Do you already have an account')} ?
                    <Txt color={colors.violet} bold> {t('LOGIN')} </Txt> {t('right')} !
                </Txt>
            </Btn>
        </Box>
    )
}

export default Form