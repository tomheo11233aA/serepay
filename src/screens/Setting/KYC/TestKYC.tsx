import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Warn from '@screens/Swap/Warn'
import { useTranslation } from 'react-i18next'
import Input from '@commom/Input'
import { colors } from '@themes/colors'

const TestKYC = () => {
    const { t } = useTranslation()
    return (
        <SafeAreaView>
            <Text>Update Infomation</Text>
            <Warn title={t('To keep your assets safe, we need to verify your identity.')} />
            <Warn title={t('Please fill in the information correctly. Once the identity verification is complete, the information cannot be edited anymore.')} />

            <Input
                radius={5}
                height={45}
                width={'100%'}
                hint={t('Full Name')}
                borderWidth={1}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                iconOne={require('@images/unAuth/user.png')}
            />

            <Input
                radius={5}
                height={45}
                width={'100%'}
                borderWidth={1}
                hint={t('Address')}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                iconOne={require('@images/unAuth/user.png')}
            />

<Input
                radius={5}
                height={45}
                width={'100%'}
                borderWidth={1}
                hint={t('Phone')}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                iconOne={require('@images/unAuth/user.png')}
            />

<Input
                radius={5}
                height={45}
                width={'100%'}
                borderWidth={1}
                hint={t('Company')}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                iconOne={require('@images/unAuth/user.png')}
            />

<Input
                radius={5}
                height={45}
                width={'100%'}
                borderWidth={1}
                hint={t('Passport')}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                iconOne={require('@images/unAuth/user.png')}
            />
        <Text>Front Image of Citizen Identification Card or Identity Card</Text>
        </SafeAreaView>
    )
}

export default TestKYC

const styles = StyleSheet.create({})