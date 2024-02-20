import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '@themes/colors';
import LinearGradient from 'react-native-linear-gradient';
import Box from '@commom/Box';
import Icon from '@commom/Icon';
import Txt from '@commom/Txt';
import Scroll from '@commom/Scroll';
import { goBack } from '@utils/navigationRef';
import Btn from '@commom/Btn';
import { fonts } from '@themes/fonts';
import ImportImage from './ImportImage';
import { uploadKyc } from '@utils/userCallApi';
import { fetchUserInfo } from '@redux/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@redux/store/store'
import { userInfoUserSelector } from '@redux/selector/userSelector'
import Spinner from 'react-native-loading-spinner-overlay'
import { schema, MyData } from './formValidation'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from './CustomInput';
import { navigate } from '@utils/navigationRef';
import { screens } from '@contants/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FormKYC = () => {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [frontIdImage, setFrontIdImage] = useState(null);
    const [backIdImage, setBackIdImage] = useState(null);
    const [selfieImage, setSelfieImage] = useState(null);
    const [userId, setUserId] = useState<number | null>(null);
    const { handleSubmit, formState: { errors }, setValue } = useForm<MyData>({
        resolver: yupResolver(schema)
    });

    const dispatch: AppDispatch = useDispatch()
    const userInfo = useSelector(userInfoUserSelector)

    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch]);

    useEffect(() => {
        if (userInfo) {
            setUserId(userInfo.id)
        }
    }, [userInfo]);

    const submitKyc = async (data: MyData) => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('fullname', data.fullName);
            formData.append('address', data.address);
            formData.append('phone', data.phone);
            formData.append('company', data.company);
            formData.append('passport', data.passport);
            const frontIdPhoto = {
                uri: frontIdImage,
                type: 'image/jpeg',
                name: 'frontIdImage.jpg',
            };
            const backIdPhoto = {
                uri: backIdImage,
                type: 'image/jpeg',
                name: 'backIdImage.jpg',
            };
            const selfiePhoto = {
                uri: selfieImage,
                type: 'image/jpeg',
                name: 'selfieImage.jpg',
            };
            formData.append('photo', frontIdPhoto);
            formData.append('photo', backIdPhoto);
            formData.append('photo', selfiePhoto);
            formData.append('userid', userId?.toString());
            try {
                await uploadKyc(formData)
                dispatch(fetchUserInfo())
                navigate(screens.SETTING)
            } catch (error: any) {
                Alert.alert(t(error?.response?.data?.message) ?? t('Update KYC fail'))
            }
        } catch (error: any) {
            Alert.alert(t(error) ?? t('Update KYC fail'))
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <LinearGradient
            style={{ flex: 1 }}
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            colors={[colors.darkViolet, colors.violet]}
        >
            <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={{
                marginTop: hp('8%'),
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: 'white',
                marginBottom: hp('10%'),
            }}>
                <Box
                    row
                    alignCenter
                    paddingTop={10}
                    paddingHorizontal={15}
                >
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon
                            size={25}
                            source={require('@images/unAuth/left.png')}
                        />
                    </TouchableOpacity>
                    <Txt bold color={colors.violet} size={18}>
                        {t('Update Infomation')}
                    </Txt>
                </Box>
                <Scroll paddingHorizontal={15} paddingVertical={20}>
                    <CustomInput
                        placeholder="Full Name"
                        icon={require('@images/unAuth/user.png')}
                        onChangeText={(value: string) => setValue('fullName', value)}
                    />
                    <Txt size={12} color={colors.red} paddingHorizontal={5}>
                        {errors.fullName?.message}
                    </Txt>
                    <CustomInput
                        placeholder="Address"
                        icon={require('@images/unAuth/pin.png')}
                        onChangeText={(value: string) => setValue('address', value)}
                    />
                    <Txt size={12} color={colors.red} paddingHorizontal={5}>
                        {errors.address?.message}
                    </Txt>
                    <CustomInput
                        placeholder="Phone"
                        icon={require('@images/unAuth/telephone.png')}
                        onChangeText={(value: string) => setValue('phone', value)}
                    />
                    <Txt size={12} color={colors.red} paddingHorizontal={5}>
                        {errors.phone?.message}
                    </Txt>
                    <CustomInput
                        placeholder="Company"
                        icon={require('@images/unAuth/company.png')}
                        onChangeText={(value: string) => setValue('company', value)}
                    />
                    <Txt size={12} color={colors.red} paddingHorizontal={5}>
                        {errors.company?.message}
                    </Txt>
                    <CustomInput
                        placeholder="Passport"
                        icon={require('@images/unAuth/passport.png')}
                        onChangeText={(value: string) => setValue('passport', value)}
                    />
                    <Txt size={12} color={colors.red} paddingHorizontal={5}>
                        {errors.passport?.message}
                    </Txt>
                </Scroll>

                <ImportImage title='Front Image of Citizen Identification Card or Identity Card'
                    onImageSelected={(image: any) => {
                        setValue('frontImage', image);
                        setFrontIdImage(image);
                    }} />
                <Txt marginLeft={15} size={12} color={colors.red} paddingHorizontal={5}>
                    {errors.frontImage?.message}
                </Txt>

                <ImportImage title='Back Image of Citizen Identification Card or Identity Card'
                    onImageSelected={(image: any) => {
                        setValue('backImage', image);
                        setBackIdImage(image);
                    }} />
                <Txt marginLeft={15} size={12} color={colors.red} paddingHorizontal={5}>
                    {errors.backImage?.message}
                </Txt>

                <ImportImage title='Portrait'
                    onImageSelected={(image: any) => {
                        setValue('selfieImage', image);
                        setSelfieImage(image);
                    }} />
                <Txt marginLeft={15} size={12} color={colors.red} paddingHorizontal={5}>
                    {errors.selfieImage?.message}
                </Txt>

                <Btn
                    onPress={handleSubmit(submitKyc)}
                    radius={5}
                    width={'90%'}
                    paddingVertical={7}
                    backgroundColor={colors.violet}
                    alignSelf={'center'}>
                    <Txt bold size={16} color={'white'} fontFamily={fonts.AS}>
                        {t('Upload KYC')}
                    </Txt>
                </Btn>
            </ScrollView>
        </LinearGradient>
    );
};

export default React.memo(FormKYC);