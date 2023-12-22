import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from './InputField';
import { FormData, schema } from './formValidation';
import { colors } from '@themes/colors';
import LinearGradient from 'react-native-linear-gradient';
import Box from '@commom/Box';
import Icon from '@commom/Icon';
import Txt from '@commom/Txt';
import { useTranslation } from 'react-i18next';
import Scroll from '@commom/Scroll';
import { goBack } from '@utils/navigationRef';
import { TouchableOpacity } from 'react-native';
import Btn from '@commom/Btn';
import { fonts } from '@themes/fonts';
import Warn from '@screens/Swap/Warn';
import { ScrollView } from 'react-native';
import ImportImage from './ImportImage';
import { uploadKyc } from '@utils/userCallApi';
import { IUploadKYC } from '@models/USER/uploadKYC';
import { fetchUserInfo } from '@redux/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@redux/store/store'
import { userInfoUserSelector } from '@redux/selector/userSelector'

const FormKYC = () => {
    const { t } = useTranslation()
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: FormData) => console.log(data);
    const [fullname, setFullname] = React.useState<string>('');
    const [isVerify, setIsVerify] = React.useState<number | null>(null);
    const [address, setAddress] = React.useState<string>('');
    const [phone, setPhone] = React.useState<string>('');
    const [company, setCompany] = React.useState<string>('');
    const [passport, setPassport] = React.useState<string>('');
    const [frontIdImage, setFrontIdImage] = React.useState<any>(null);
    const [backIdImage, setBackIdImage] = React.useState<any>(null);
    const [selfieImage, setSelfieImage] = React.useState<any>(null);
    const [userId, setUserId] = React.useState<number | null>(null);

    const dispatch: AppDispatch = useDispatch()
    const userInfo = useSelector(userInfoUserSelector)
    React.useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch]);

    React.useEffect(() => {
        if (userInfo) {
            setUserId(userInfo.id)   
            setIsVerify(userInfo?.verified)
        }
    }, [userInfo]);


    const uploadKYC = async () => {
        const data: IUploadKYC = {
            // photo: frontIdImage,
            // backIdImage: backIdImage,
            // selfieImage: selfieImage
            fullname
        }
        const res = await uploadKyc(data)
        console.log(res)
    }

    return (
        <LinearGradient
            style={{ flex: 1 }}
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            colors={[colors.darkViolet, colors.violet]}
        >
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
                {/* <Box
                    paddingHorizontal={15}
                    marginRight={15}
                >
                    <Warn title={t('To keep your assets safe, we need to verify your identity.')} />
                    <Warn title={t('Please fill in the information correctly. Once the identity verification is complete, the information cannot be edited anymore.')} />
                </Box> */}
                <Scroll paddingHorizontal={15}>
                    <InputField control={control} name="fullName" placeholder="Full Name" errors={errors} icon={require('@images/unAuth/user.png')} />
                    <InputField control={control} name="address" placeholder="Address" errors={errors} icon={require('@images/unAuth/user.png')} />
                    <InputField control={control} name="phone" placeholder="Phone" errors={errors} icon={require('@images/unAuth/user.png')} />
                    <InputField control={control} name="company" placeholder="Company" errors={errors} icon={require('@images/unAuth/user.png')} />
                    <InputField control={control} name="passport" placeholder="Passport" errors={errors} icon={require('@images/unAuth/user.png')} />
                </Scroll>
                {/* <Box row justifySpaceBetween>
                    <ImportImage title='Front Image of Citizen Identification Card or Identity Card' />
                    <ImportImage title='Back Image of Citizen Identification Card or Identity Card' />
                    <ImportImage title='Portrait' />
                </Box> */}
                <ImportImage title='Front Image of Citizen Identification Card or Identity Card' />
                <ImportImage title='Back Image of Citizen Identification Card or Identity Card' />
                <ImportImage title='Portrait' />
                <Btn
                    onPress={handleSubmit(onSubmit)}
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