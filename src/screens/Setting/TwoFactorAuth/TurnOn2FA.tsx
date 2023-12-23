import React, { useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'
import Safe from '@reuse/Safe'
import Box from '@commom/Box'
import { generateOTPToken, turnOn2FA } from '@utils/userCallApi'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import Btn from '@commom/Btn'
import { navigate } from '@utils/navigationRef'
import { screens } from '@contants/screens'
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from '@commom/Icon'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const TurnOn2FA = () => {
    const [otp, setOtp] = useState('')
    const [otpAuthUrl, setOtpAuthUrl] = useState('')
    useEffect(() => {
        const fetchOtpAuth = async () => {
          try {
            const storedOtp = await AsyncStorage.getItem('otp');
            const storedOtpAuthUrl = await AsyncStorage.getItem('otpAuthUrl');
      
            if (storedOtp && storedOtpAuthUrl) {
              setOtp(storedOtp);
              setOtpAuthUrl(storedOtpAuthUrl);
            } else {
              const response = await generateOTPToken();
              setOtp(response?.data.secret);
              setOtpAuthUrl(response?.data.otpAuth);
              AsyncStorage.setItem('otp', response?.data.secret);
              AsyncStorage.setItem('otpAuthUrl', response?.data.otpAuth);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchOtpAuth();
      }, []);

    const handleCopy = () => {
        Clipboard.setString(otp);
    };

    return (
        <Safe>
            <Txt color={colors.darkGreen} bold size={18} >
                Scan this QR code in the authenticator app, or enter the code below manually into the app
            </Txt>
            <Box alignCenter marginVertical={30}>
                {otpAuthUrl && <QRCode size={200} value={otpAuthUrl} />}
            </Box>
            <Box row justifyCenter>
                <Txt color={colors.darkGreen} bold size={18} center>
                    {otp}
                </Txt>
                <TouchableOpacity onPress={handleCopy} style={{marginLeft: 10}}>
                    <Icon size={20} source={require('../../../assets/images/setting/copy.png')} />
                </TouchableOpacity>
            </Box>

            <Btn
                onPress={() => navigate(screens.VERIFY2FA)}
                radius={5}
                height={45}
                marginTop={20}
                width={'100%'}
                backgroundColor={colors.darkViolet}
            >
                <Txt bold size={18} color={'white'}>
                    Next
                </Txt>
            </Btn>
        </Safe>
    )
}

export default React.memo(TurnOn2FA)

