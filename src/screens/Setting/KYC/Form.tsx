import React, { useState } from 'react';
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
import { navigate } from '@utils/navigationRef';
import { fetchUserInfo } from '@redux/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@redux/store/store'
import { userInfoUserSelector } from '@redux/selector/userSelector'
import Spinner from 'react-native-loading-spinner-overlay'
import { screens } from '@contants/screens';
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

    const dispatch: AppDispatch = useDispatch()
    const userInfo = useSelector(userInfoUserSelector)
    React.useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch]);

    React.useEffect(() => {
        if (userInfo) {
            setUserId(userInfo.id)
        }
    }, [userInfo]);

    const submitKyc = async () => {
        setIsLoading(true)
        try {
            const data = new FormData();
            data.append('fullname', fullName);
            data.append('address', address);
            data.append('phone', phone);
            data.append('company', company);
            data.append('passport', passport);

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
            data.append('photo', frontIdPhoto);
            data.append('photo', backIdPhoto);
            data.append('photo', selfiePhoto);
            data.append('userid', userId?.toString());
            await uploadKyc(data)?.then((res) => {
                Alert.alert('Update KYC success');
                setTimeout(() => {
                    navigate(screens.KYC);
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
                <Scroll paddingHorizontal={15}>
                    <Input
                        value={fullName}
                        hint="Full Name"
                        onChangeText={(value: string) => setFullName(value)}
                    />
                    <Input
                        value={address}
                        hint="Address"
                        onChangeText={(value: string) => setAddress(value)}
                    />
                    <Input
                        value={phone}
                        hint="Phone"
                        onChangeText={(value: string) => setPhone(value)}
                    />
                    <Input
                        value={company}
                        hint="Company"
                        onChangeText={(value: string) => setCompany(value)}
                    />
                    <Input
                        value={passport}
                        hint="Passport"
                        onChangeText={(value: string) => setPassport(value)}
                    />
                </Scroll>
                <ImportImage title='Front Image of Citizen Identification Card or Identity Card'
                    onImageSelected={(image: any) => setFrontIdImage(image)} />
                <ImportImage title='Back Image of Citizen Identification Card or Identity Card'
                    onImageSelected={(image: any) => setBackIdImage(image)} />
                <ImportImage title='Portrait'
                    onImageSelected={(image: any) => setSelfieImage(image)} />
                <Btn
                    onPress={() => submitKyc()}
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