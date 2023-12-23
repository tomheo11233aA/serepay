import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Safe from '@reuse/Safe'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import Btn from '@commom/Btn'
import { navigate } from '@utils/navigationRef'
import { screens } from '@contants/screens'
import LottieView from 'lottie-react-native'
import { useTranslation } from 'react-i18next'
import Input from '@commom/Input'
import { turnOff2FA } from '@utils/userCallApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TurnOff2FA = () => {
  const { t } = useTranslation()
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState('')
  const handleTurnOff2FA = async () => {
    if (code) {
      try {
        await turnOff2FA({ otp: code });
        await AsyncStorage.setItem('isTwoFA', '0');
        navigate(screens.SETTING);
      } catch (error: any) {
        setError(error?.response?.data?.message);
      }
    }
  };
  return (
    <Safe backgroundColor='white' width={'100%'}>
      <LottieView style={{ height: '60%' }} source={require('../../../assets/lottie/success.json')} loop={false} autoPlay />
      <Txt color={colors.darkGreen} bold size={18} >
        {t('Congrats! You have successfully turned on 2FA. If you want to turn off 2FA, please enter the OTP code below.')}
      </Txt>
      <Box
        marginTop={15}>
        <Input
          value={code}
          onChangeText={setCode}
          hint={t('Enter OTP code')}
          height={45}
          radius={5}
          borderWidth={1}
          borderColor={colors.darkGreen}
          paddingHorizontal={10}
          fontSize={18}
        />
        <Txt color={colors.red} bold size={18} >
          {error}
        </Txt>

        <Box row justifyEnd>
          <Btn
            onPress={() => {
              setCode('')
              navigate(screens.SETTING)
            }}
            radius={5}
            height={45}
            marginTop={20}
            marginRight={20}
            width={'30%'}
            borderWidth={1}
          >
            <Txt bold size={18} color={colors.darkGreen}>
              {t('Previous')}
            </Txt>
          </Btn>

          <Btn
            onPress={handleTurnOff2FA}
            radius={5}
            height={45}
            marginTop={20}
            width={'50%'}
            backgroundColor={colors.darkViolet}
          >
            <Txt bold size={18} color={'white'}>
              {t('Turn off 2FA')}
            </Txt>
          </Btn>
        </Box>
      </Box>
    </Safe>
  )
}

export default TurnOff2FA

const styles = StyleSheet.create({})