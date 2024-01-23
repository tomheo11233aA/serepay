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
import View, { Alert } from 'react-native'
import { set } from 'lodash'

interface Props {
    t: TFunction<"translation", undefined>
}

const Form = ({ t }: Props) => {
    const [txtError, setTxtError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')

    const handleSendMail = async () => {
        const axiosInstance = AxiosInstance()
        setIsLoading(true)
        try {
            const response = await axiosInstance.post('api/user/sendmailforgetpassword', {
                email: email,
            })
            if (response.status) {
                Alert.alert('Thông báo', 'Vui lòng kiểm tra email để lấy lại mật khẩu')
            }
        } catch (error: any) {
            setTxtError(error.response.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box width={'100%'} paddingHorizontal={40} alignCenter backgroundColor={'white'}>
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
                hint={t('Your email')}
                value={email}
                onChangeText={setEmail}
                tintColor={colors.gray2}
                borderColor={colors.gray}
                iconOne={require('@images/unAuth/user.png')}
            />
            <Btn
                onPress={handleSendMail}
                radius={5}
                height={45}
                marginTop={20}
                width={'100%'}
                backgroundColor={colors.darkViolet}
            >
                <Txt color={'white'} bold>
                    {t('SEND EMAIL')}
                </Txt>
            </Btn>
            <Btn marginVertical={20} onPress={() => navigate(screens.FORGOT_PASSWORD)}>
                <Txt color={colors.violet}>
                    {t('Already have an account? ')}
                    <Txt
                        onPress={() => navigate(screens.LOGIN)}
                        bold
                        color={colors.darkViolet}>{t('LOGIN')}</Txt>
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