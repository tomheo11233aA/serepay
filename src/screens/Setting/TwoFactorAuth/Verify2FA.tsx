import React, { useState } from 'react';
import Btn from '@commom/Btn';
import { turnOn2FA } from '@utils/userCallApi';
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { colors } from '@themes/colors';
import Safe from '@reuse/Safe';
import { useTranslation } from 'react-i18next';
import Input from '@commom/Input';
import Icon from '@commom/Icon';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { goBack, navigate } from '@utils/navigationRef';
import { screens } from '@contants/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';


const Verify2FA = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const { t } = useTranslation();
    const handleTurnOn2FA = async () => {
        if (code) {
          try {
            await turnOn2FA({ otp: code });
            await AsyncStorage.setItem('isTwoFA', '1');
            navigate(screens.SETTING);
          } catch (error: any) {
            setError(error?.response?.data?.message);
          }
        }
      };

    return (
        <LinearGradient
            style={{ flex: 1 }}
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            colors={[colors.darkViolet, colors.violet]}
        >
            <Box
                flex={1}
                marginTop={60}
                paddingHorizontal={15}
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                backgroundColor={'white'}
            >
                <Box
                    row
                    alignCenter
                    paddingTop={10}
                >
                    <TouchableOpacity onPress={() => {
                        setCode('')
                        navigate(screens.SETTING)
                    }}>
                        <Icon
                            size={25}
                            source={require('@images/unAuth/left.png')}
                        />
                    </TouchableOpacity>
                    <Txt bold color={colors.violet} size={18}>
                        {`  ${t('TWO FACTOR AUTHENTICATION')}`}
                    </Txt>
                </Box>
                <Box
                    marginTop={30}
                    paddingHorizontal={15}
                >
                    <Safe>
                        <Txt color={colors.darkGreen} bold size={18} >
                            {t('Enter the 6-digit code from authenticator app')}
                        </Txt>
                        <Input
                            marginTop={20}
                            radius={5}
                            height={45}
                            width={'100%'}
                            hint={t('6 digit code')}
                            borderWidth={1}
                            tintColor={colors.gray2}
                            borderColor={colors.gray}
                            value={code}
                            onChangeText={(text: string) => setCode(text)}
                            iconOne={require('@images/unAuth/mail.png')}
                        />
                        <Txt color={colors.red} bold size={18} >
                            {error}
                        </Txt>
                    </Safe>

                    <Box row justifyEnd>
                        <Btn
                            onPress = {() => {
                                setCode('')
                                navigate(screens.TWO_FACTOR_AUTHENTICATION)
                            }}
                            radius={5}
                            height={45}
                            marginTop={20}
                            marginRight={20}
                            width={'25%'}
                            borderWidth={1}
                        >
                            <Txt bold size={18} color={colors.darkGreen}>
                                {t('Previous')}
                            </Txt>
                        </Btn>

                        <Btn
                            onPress={handleTurnOn2FA}
                            radius={5}
                            height={45}
                            marginTop={20}
                            width={'50%'}
                            backgroundColor={colors.darkViolet}
                        >
                            <Txt bold size={18} color={'white'}>
                                {t('Turn on 2FA')}
                            </Txt>
                        </Btn>
                    </Box>


                </Box>
            </Box>
        </LinearGradient>
    );
};

export default Verify2FA;