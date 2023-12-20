import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { screens } from '@contants/screens'
import { useAppDispatch } from '@hooks/redux'
import { setLogin } from '@redux/slice/userSlice'
import { colors } from '@themes/colors'
import { navigate } from '@utils/navigationRef'
import { TFunction } from 'i18next'
import React, { useState } from 'react'
import AxiosInstance from '../../helper/AxiosInstance'
import Spinner from 'react-native-loading-spinner-overlay'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Props {
    t: TFunction<"translation", undefined>
}

const Form = ({ t }: Props) => {
    const dispatch = useAppDispatch()
    const [security, setSecurity] = useState<boolean>(true)
    const [userName, setUserName] = useState<string>('test2fa1')
    const [password, setPassword] = useState<string>('123123')
    const [txtError, setTxtError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [otp2fa, setOtp2fa] = useState<string>('')
    const [show2FA, setShow2FA] = useState<boolean>(false)
    const handleLogin = async () => {
        const axiosInstance = AxiosInstance()
        setIsLoading(true)
        try {
            const response = await axiosInstance.post('api/user/login', {
                userName: userName,
                password: password,
                otp: otp2fa
            })
            if (response.data.status) {
                AsyncStorage.setItem('token', response.data.token)
                await AsyncStorage.setItem('isLogin', 'true')
                dispatch(setLogin(true))
            }
        } catch (error: any) {
            setTxtError(error.response.data.message)
            if (error.response.data.errors === 2) {
                setShow2FA(true)
                setTxtError('Tài khoản đã được kích hoạt 2FA, vui lòng nhập mã OTP')
            } else if (error.response.data.errors === 11) {
                setTxtError('Mã OTP không đúng')
            }
        } finally {
            setIsLoading(false)
        }
    }

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
                value={password}
                onChangeText={(text: string) => setPassword(text)}
                iconTwo={security ?
                    require('@images/unAuth/view.png') :
                    require('@images/unAuth/hide.png')
                }
            />
            {show2FA && (
                <Input
                    radius={5}
                    height={45}
                    width={'100%'}
                    marginTop={15}
                    borderWidth={1}
                    hint={t('OTP 2FA')}
                    tintColor={colors.gray2}
                    borderColor={colors.gray}
                    value={otp2fa}
                    onChangeText={(text: string) => setOtp2fa(text)}
                    iconOne={require('@images/unAuth/lock.png')}
                />
            )}
            <Btn
                radius={5}
                height={45}
                marginTop={20}
                width={'100%'}
                backgroundColor={colors.darkViolet}
                onPress={handleLogin}
            >
                <Txt color={'white'} bold>
                    {t('LOGIN')}
                </Txt>
            </Btn>
            <Btn marginVertical={20}>
                <Txt color={colors.violet}>
                    {t('Forgot password ?')}
                </Txt>
            </Btn>
            <Btn onPress={() => navigate(screens.REGISTER)}>
                <Txt color={colors.violet}>
                    {t('Do not have an account?')} <Txt bold color={colors.darkViolet}>{t('REGISTER')}</Txt>
                </Txt>
            </Btn>
            <Txt color={colors.red} marginTop={20}>
                {txtError}
            </Txt>

            

        </Box>
    )
}

export default Form