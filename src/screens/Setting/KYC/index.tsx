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
import { launchImageLibrary } from 'react-native-image-picker';


const TestKYC = () => {
    const { t } = useTranslation()
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: FormData) => console.log(data);
    const [frontIdImage, setFrontIdImage] = React.useState<any>(null);
    const [backIdImage, setBackIdImage] = React.useState<any>(null);
    const [selfieImage, setSelfieImage] = React.useState<any>(null);

    const selectImage = (setImage: any) => {
        let options: any = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            includeBase64: true,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                setImage(response);
            }
        }
        );
    };

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
                <Box
                    paddingHorizontal={15}
                    marginRight={15}
                >
                    <Warn title={t('To keep your assets safe, we need to verify your identity.')} />
                    <Warn title={t('Please fill in the information correctly. Once the identity verification is complete, the information cannot be edited anymore.')} />
                </Box>
                <Scroll paddingHorizontal={15}>
                    <InputField control={control} name="fullName" placeholder="Full Name" errors={errors} icon={require('@images/unAuth/user.png')} />
                    <InputField control={control} name="address" placeholder="Address" errors={errors} icon={require('@images/unAuth/user.png')} />
                    <InputField control={control} name="phone" placeholder="Phone" errors={errors} icon={require('@images/unAuth/user.png')} />
                    <InputField control={control} name="company" placeholder="Company" errors={errors} icon={require('@images/unAuth/user.png')} />
                    <InputField control={control} name="passport" placeholder="Passport" errors={errors} icon={require('@images/unAuth/user.png')} />
                </Scroll>
                <Btn onPress={() => selectImage(setFrontIdImage)}>
                    <Txt>{frontIdImage ? frontIdImage : 'Select Image 1'}</Txt>
                </Btn>
                <Btn onPress={() => selectImage(setBackIdImage)}>
                    <Txt>{backIdImage ? backIdImage : 'Select Image 2'}</Txt>
                </Btn>
                <Btn onPress={() => selectImage(selfieImage)}>
                    <Txt>{selfieImage ? selfieImage : 'Select Image 3'}</Txt>
                </Btn>
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

export default TestKYC;