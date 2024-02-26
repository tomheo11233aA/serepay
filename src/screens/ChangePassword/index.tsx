import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { goBack, navigate } from '@utils/navigationRef';
import { colors } from '@themes/colors';
import { userInfoUserSelector } from '@redux/selector/userSelector';
import { useAppSelector } from '@hooks/redux';
import { fonts } from '@themes/fonts';
import Safe from '@reuse/Safe';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updatePassword } from '@utils/userCallApi';
import { Alert } from 'react-native';
import { useAppDispatch } from '@hooks/redux';
import { setLogin } from '@redux/slice/userSlice';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { screens } from '@contants/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { AppDispatch } from '@redux/store/store';

import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import Icon from '@commom/Icon';
import ChangePassWordInput from './Validation/ChangePassWordInput';
import { changePasswordSchema, ChangePasswordData } from './Validation/changePassValidation';

const ChangePassword = () => {
    const { t } = useTranslation()
    const { handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(changePasswordSchema)
    });
    const userInfo = useAppSelector(userInfoUserSelector)
    const dispatch: AppDispatch = useAppDispatch()
    const [loading, setLoading] = React.useState<boolean>(false)
    const handleChangePassword = async (data: ChangePasswordData) => {
        setLoading(true)
        const { currentPassword, newPassword, confirmPassword } = data
        try {
            const reponse = await updatePassword({
                password: currentPassword,
                passwordNew: newPassword,
            })
            console.log(reponse)
            if (reponse?.status) {
                Alert.alert(
                    t('Success'),
                    t('Change password successfully'),
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                dispatch(setLogin(false))
                                AsyncStorage.clear()
                                navigate(screens.HELLO)
                            }
                        }
                    ]
                )
            }
        } catch (error: any) {
            console.log(error.response.data.message)
            Alert.alert(
                t('Error'),
                t(error.response.data.message)
            )
        } finally {
            setLoading(false)
        }
    }
    const currentPasswordRef = useRef<any>(null)
    const newPasswordRef = useRef<any>(null)
    const confirmPasswordRef = useRef<any>(null)
    if (loading) {
        return (
            <Safe backgroundColor='white'>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90%',
                }}>
                    <LottieView
                        source={require('@lottie/loading.json')}
                        style={{
                            width: '50%',
                            height: '50%',
                            alignSelf: 'center',
                        }}
                        autoPlay
                        loop />
                    <Txt size={18} fontFamily={fonts.AS}>Loading...</Txt>
                </View>
            </Safe>
        );
    }
    return (
        <Safe
            flex={1}
            backgroundColor='white'
        >
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={20}
                enableOnAndroid={true}
                enableAutomaticScroll={Platform.OS === 'ios'}
                style={{
                    backgroundColor: 'white',
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingTop: 0,
                    paddingBottom: 20,

                }}>

                <Btn
                    onPress={() => goBack()}
                    style={{
                        alignItems: 'flex-start',
                    }}
                >
                    <Icon
                        size={30}
                        tintColor={'black'}
                        source={require('@images/unAuth/left.png')}
                    />
                </Btn>

                <Txt
                    size={16}
                    marginTop={10}
                    fontFamily={fonts.FLG}
                >
                    {userInfo?.username} • Serepay
                </Txt>

                <Txt
                    size={20}
                    bold
                    marginTop={10}
                    marginBottom={10}
                    fontFamily={fonts.FLG}
                >
                    {t('Change password')}
                </Txt>

                <Txt
                    size={16}
                    marginBottom={10}
                    fontFamily={fonts.FLG}
                >
                    {t('Your password must be at least 8 characters long and contain at least one number and one letter.')}
                </Txt>

                <Box
                    flex={1}
                >
                    <ChangePassWordInput
                        placeholder={t('Current password')}
                        onChangeText={(value: any) => setValue('currentPassword', value)}
                        security={true}
                        iconOne='lock'
                        sizeIcon={25}
                        tintColor={colors.black2}
                        iconTwo
                        ref={currentPasswordRef}
                        onSubmitEditing={() => newPasswordRef.current.focus()}
                        returnKeyType={'next'}
                    />
                    {
                        errors.currentPassword &&
                        errors.currentPassword.message &&
                        <Txt color={colors.red} bold marginTop={10}>
                            {t(errors.currentPassword.message)}
                        </Txt>
                    }
                    <ChangePassWordInput
                        placeholder={t('New password')}
                        onChangeText={(value: any) => setValue('newPassword', value)}
                        security={true}
                        iconOne='lock'
                        sizeIcon={25}
                        tintColor={colors.black2}
                        iconTwo
                        ref={newPasswordRef}
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                        returnKeyType={'next'}
                    />
                    {
                        errors.newPassword &&
                        errors.newPassword.message &&
                        <Txt color={colors.red} bold marginTop={10}>
                            {t(errors.newPassword.message)}
                        </Txt>
                    }
                    <ChangePassWordInput
                        placeholder={t('Confirm new password')}
                        onChangeText={(value: any) => setValue('confirmPassword', value)}
                        security={true}
                        iconOne='lock'
                        sizeIcon={25}
                        tintColor={colors.black2}
                        iconTwo
                        ref={confirmPasswordRef}
                        returnKeyType={'done'}
                    />
                    {
                        errors.confirmPassword &&
                        errors.confirmPassword.message &&
                        <Txt color={colors.red} bold marginTop={10}>
                            {t(errors.confirmPassword.message)}
                        </Txt>
                    }
                </Box>

            </KeyboardAwareScrollView>

            <Box
                marginBottom={20}
                paddingHorizontal={20}
            >
                <Btn
                    backgroundColor={colors.violet}
                    padding={15}
                    radius={25}
                    onPress={handleSubmit(handleChangePassword)}
                >
                    <Txt
                        size={16}
                        color={'black'}
                    >
                        {t('Change password')}
                    </Txt>
                </Btn>
            </Box>

        </Safe>
    )
}

export default ChangePassword
