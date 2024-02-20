import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { screens } from '@contants/screens'
import { colors } from '@themes/colors'
import { navigate } from '@utils/navigationRef'
import { TFunction } from 'i18next'
import React, { useState, useRef } from 'react'
import SelectCountry from './SelectCountry'
import Terms from './Terms'
import AxiosInstance from '../../helper/AxiosInstance'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import RegisterInput from './Validation/Input'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './Validation/formvalidation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Platform } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface Props {
    t: TFunction<"translation", undefined>
}

const Form = ({ t }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ref] = useState<string>('67d5497458ce')
    const [country] = useState<string>('Vietnam')
    const [tokenRecaptcha] = useState<string>('anything')
    const [firstName] = useState<string>('')
    const [lastName] = useState<string>('')
    const [txtError, setTxtError] = useState<string>('')
    const [checked, setChecked] = React.useState(false);

    const { handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const handleRegister = async (data: any) => {
        const axiosInstance = AxiosInstance()
        setIsLoading(true)
        const { email, userName, password } = data
        try {
            const response = await axiosInstance.post('api/user/signup', {
                email: email,
                userName: userName,
                password: password,
                country: country,
                firstName: firstName,
                lastName: lastName,
                Referral: ref,
                tokenRecaptcha: tokenRecaptcha
            })
            console.log(response)
            if (response.status) {
                Alert.alert(t('Success'), t('Please check your email to verify your account'))
                await AsyncStorage.setItem('tokenVerifyEmail', response.data)
            }
        } catch (error: any) {
            setTxtError(t(error.response.data.message))
        } finally {
            setIsLoading(false)
        }
    }

    const emailInputRef = useRef<any>(null)
    const userNameInputRef = useRef<any>(null)
    const passwordInputRef = useRef<any>(null)
    const rePasswordInputRef = useRef<any>(null)

    const handleSetChecked = () => {
        setChecked(!checked)
        setValue('acceptWithEula', !checked)
    }

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={20}
            enableOnAndroid={true}
            enableAutomaticScroll={Platform.OS === 'ios'}
            style={{
                backgroundColor: 'white',
                width: '100%',
                paddingHorizontal: 20,
                marginBottom: hp('15%')
            }}>

            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            
            <RegisterInput
                placeholder={t('Email')}
                maxLength={100}
                onChangeText={(value: string) => setValue('email', value)}
                returnKeyType={'next'}
                keyboardType={'email-address'}
                iconOne={'mail'}
                tintColor={colors.gray2}
                onSubmitEditing={() => userNameInputRef?.current?.focus()}
                ref={emailInputRef}
            ></RegisterInput>
            {errors.email && errors.email.message && <Txt color={colors.red} bold marginTop={10}>{t(errors.email.message)}</Txt>}

            <RegisterInput
                placeholder={t('Username')}
                maxLength={100}
                onChangeText={(value: string) => setValue('userName', value)}
                returnKeyType={'next'}
                iconOne={"user"}
                tintColor={colors.gray2}
                onSubmitEditing={() => passwordInputRef?.current?.focus()}
                ref={userNameInputRef}
            ></RegisterInput>
            {errors.userName && errors.userName.message && <Txt color={colors.red} bold marginTop={10}>{t(errors.userName.message)}</Txt>}

            <RegisterInput
                placeholder={t('Password')}
                maxLength={100}
                onChangeText={(value: string) => setValue('password', value)}
                returnKeyType={'next'}
                iconOne={"lock"}
                tintColor={colors.gray2}
                security
                iconTwo
                onSubmitEditing={() => rePasswordInputRef?.current?.focus()}
                ref={passwordInputRef}
            ></RegisterInput>
            {errors.password && errors.password.message && <Txt color={colors.red} bold marginTop={10}>{t(errors.password.message)}</Txt>}

            <RegisterInput
                placeholder={t('Re-Password')}
                maxLength={100}
                onChangeText={(value: string) => setValue('rePassword', value)}
                returnKeyType={'done'}
                iconOne={"lock"}
                tintColor={colors.gray2}
                security
                iconTwo
                ref={rePasswordInputRef}
            ></RegisterInput>
            {errors.rePassword && errors.rePassword.message && <Txt color={colors.red} bold marginTop={10}>{t(errors.rePassword.message)}</Txt>}

            {/* <Input
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
                readonly
            /> */}

            <SelectCountry t={t} />

            <Terms
                t={t}
                checked={checked}
                setChecked={handleSetChecked}
            >
            </Terms>
            {checked === false && <Txt color={colors.red} bold marginTop={10}>{t('You must accept the terms and conditions')}</Txt>}


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
                onPress={handleSubmit(handleRegister)}
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
                    {t('Do you already have an account')}?
                    <Txt color={colors.violet} bold> {t('LOGIN')} </Txt>{t('right')} !
                </Txt>
            </Btn>
        </KeyboardAwareScrollView>
    )
}

export default Form