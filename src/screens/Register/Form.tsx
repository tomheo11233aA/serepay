import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { screens } from '@contants/screens'
import { colors } from '@themes/colors'
import { navigate } from '@utils/navigationRef'
import { TFunction, use } from 'i18next'
import React, { useState, useRef } from 'react'
import SelectCountry from './SelectCountry'
import Terms from './Terms'
import AxiosInstance from '../../helper/AxiosInstance'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'

interface Props {
    t: TFunction<"translation", undefined>
}

const Form = ({ t }: Props) => {
    const [security, setSecurity] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>('testuser1')
    const [password, setPassword] = useState<string>('')
    const [rePassword, setRePassword] = useState<string>('')
    const [email, setEmail] = useState<string>('testuser1@gmail.com')
    const [ref, setRef] = useState<string>('67d5497458ce') // người giới thiệu mình không đổi được
    const [country, setCountry] = useState<string>('Vietnam')
    const [tokenRecaptcha, setTokenRecaptcha] = useState<string>('anything')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [txtError, setTxtError] = useState<string>('')

    const handleRegister = async () => {
        const axiosInstance = AxiosInstance()
        setIsLoading(true)
        if (password !== rePassword) {
            return Alert.alert('Password and rePassword not match')
        }
        if (!userName || !password || !rePassword || !email) {
            return Alert.alert('Please fill all fields')
        }
        try {
            const response = await axiosInstance.post('api/user/signup', {
                userName: userName,
                password: password,
                country: country,
                firstName: firstName,
                lastName: lastName,
                Referral: ref,
                email: email,
                tokenRecaptcha: tokenRecaptcha
            })
            await AsyncStorage.setItem('tokenVerifyEmail', response.data)
        } catch (error: any) {
            console.log('error', error)
            setTxtError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    // const verifyEmail = async () => {
    //     setIsLoading(true)
    //     const axiosInstance = AxiosInstance()
    //     try {
    //         const token = await AsyncStorage.getItem('tokenVerifyEmail')
    //         const response = await axiosInstance.get(`api/user/verifyEmail/${token}`)
    //         if (response.status) {
    //             navigate(screens.LOGIN)
    //         }
    //         await AsyncStorage.removeItem('tokenVerifyEmail')
    //     } catch (error: any) {
    //         setTxtError(error.response.data.message)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }
    return (
        <Box width={'100%'} paddingHorizontal={40} alignCenter>
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />

            <Input
                radius={5}
                height={45}
                width={'100%'}
                hint={t('Email')}
                borderWidth={1}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                value={email}
                onChangeText={(text: string) => setEmail(text)}
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
                value={userName}
                onChangeText={(text: string) => setUserName(text)}
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
                value={password}
                onChangeText={(text: string) => setPassword(text)}
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
                value={rePassword}
                onChangeText={(text: string) => setRePassword(text)}
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
                value={ref}
                onChangeText={(text: string) => setRef(text)}
            />
            <SelectCountry t={t} />
            <Terms t={t} />
            <Box>
                <Box
                    width={20}
                />
            </Box>
            <Txt color={colors.red} bold marginTop={10}>
                {txtError}
            </Txt>


            <Btn
                radius={5}
                height={45}
                marginTop={20}
                width={'100%'}
                backgroundColor={colors.darkViolet}
                onPress={handleRegister}
            >

                <Txt color={'white'} bold>
                    {t('REGISTER')}
                </Txt>

            </Btn>

            {/* <Btn
                onPress={verifyEmail}
                radius={5}
                height={45}
                marginTop={20}
                width={'100%'}
                backgroundColor={colors.darkViolet}
            >
                <Txt color={'white'} bold>
                    {t('Verify Email')}
                </Txt>
            </Btn> */}

            <Btn
                onPress={() => navigate(screens.LOGIN)}
                marginVertical={20}
            >
                <Txt>
                    {t('Do you already have an account')}?
                    <Txt color={colors.violet} bold> {t('LOGIN')} </Txt>{t('right')} !
                </Txt>
            </Btn>
        </Box>
    )
}

export default Form