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
import Input from '@commom/Input';
import { fetchUserInfo } from '@redux/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@redux/store/store'
import { userInfoUserSelector } from '@redux/selector/userSelector'
import Spinner from 'react-native-loading-spinner-overlay'
import RNRestart from 'react-native-restart';
import { schema, FormData } from './formValidation'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const FormKYC = () => {
    const { t } = useTranslation()
    const [fullName, setFullName] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [passport, setPassport] = useState('');
    const [frontIdImage, setFrontIdImage] = useState(null);
    const [backIdImage, setBackIdImage] = useState(null);
    const [selfieImage, setSelfieImage] = useState(null);
    const [userId, setUserId] = useState<number | null>(null);
    const { handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
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

    const submitKyc = async (data: FormData) => {
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
            await uploadKyc(formData)?.then(() => {
                Alert.alert('Update KYC success');
                setTimeout(() => {
                    RNRestart.Restart();
                }, 3000);
            });
        } catch (error: any) {
            console.log("Error", error);
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
                marginTop: 60,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: 'white',
                marginBottom: 90
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
                    <Input
                        value={fullName}
                        hint="Full Name"
                        onChangeText={(value: string) => setFullName(value)}
                        radius={5}
                        height={45}
                        width={'100%'}
                        borderWidth={1}
                        tintColor={colors.gray2}
                        borderColor={colors.gray}
                        iconOne={require('@images/unAuth/user.png')}
                    />
                    <Txt size={12} color={colors.red} paddingHorizontal={5}>
                        {errors.fullName?.message}
                    </Txt>
                    <Input
                        marginTop={10}
                        value={address}
                        hint="Address"
                        onChangeText={(value: string) => setAddress(value)}
                        radius={5}
                        height={45}
                        width={'100%'}
                        borderWidth={1}
                        tintColor={colors.gray2}
                        borderColor={colors.gray}
                        iconOne={require('@images/unAuth/pin.png')}
                    />
                    <Txt size={12} color={colors.red} paddingHorizontal={5}>
                        {errors.address?.message}
                    </Txt>
                    <Input
                        marginTop={10}
                        value={phone}
                        hint="Phone"
                        onChangeText={(value: string) => setPhone(value)}
                        radius={5}
                        height={45}
                        width={'100%'}
                        borderWidth={1}
                        tintColor={colors.gray2}
                        borderColor={colors.gray}
                        iconOne={require('@images/unAuth/telephone.png')}
                    />
                    <Txt size={12} color={colors.red} paddingHorizontal={5}>
                        {errors.phone?.message}
                    </Txt>
                    <Input
                        marginTop={10}
                        value={company}
                        hint="Company"
                        onChangeText={(value: string) => setCompany(value)}
                        radius={5}
                        height={45}
                        width={'100%'}
                        borderWidth={1}
                        tintColor={colors.gray2}
                        borderColor={colors.gray}
                        iconOne={require('@images/unAuth/company.png')}
                    />
                    <Txt size={12} color={colors.red} paddingHorizontal={5}>
                        {errors.company?.message}
                    </Txt>
                    <Input
                        marginTop={10}
                        value={passport}
                        hint="Passport"
                        onChangeText={(value: string) => setPassport(value)}
                        radius={5}
                        height={45}
                        width={'100%'}
                        borderWidth={1}
                        tintColor={colors.gray2}
                        borderColor={colors.gray}
                        iconOne={require('@images/unAuth/passport.png')}
                    />
                    <Txt size={12} color={colors.red} paddingHorizontal={5}>
                        {errors.passport?.message}
                    </Txt>
                </Scroll>
                <ImportImage title='Front Image of Citizen Identification Card or Identity Card'
                    onImageSelected={(image: any) => setFrontIdImage(image)} />
                <Txt size={12} color={colors.red} paddingHorizontal={5}>
                    {errors.frontImage?.message}
                </Txt>
                <ImportImage title='Back Image of Citizen Identification Card or Identity Card'
                    onImageSelected={(image: any) => setBackIdImage(image)} />
                <Txt size={12} color={colors.red} paddingHorizontal={5}>
                    {errors.backImage?.message}
                </Txt>
                <ImportImage title='Portrait'
                    onImageSelected={(image: any) => setSelfieImage(image)} />
                <Txt size={12} color={colors.red} paddingHorizontal={5}>
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
                        {t('Update')}
                    </Txt>
                </Btn>
            </ScrollView>
        </LinearGradient>
    );
};

export default React.memo(FormKYC);