import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import Safe from '@reuse/Safe'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import Box from '@commom/Box'
import { goBack } from '@utils/navigationRef'
import Icon from '@commom/Icon'

const Success = () => {
  const { t } = useTranslation()
  return (
    <Safe flex={1} backgroundColor='white'>
      <TouchableOpacity onPress={goBack}>
        <Box>
          <Icon
            size={30}
            source={require('@images/unAuth/left.png')}
          />
        </Box>
      </TouchableOpacity>
      <LottieView style={{ flex: 3, position: 'relative' }} source={require('../../../assets/lottie/success.json')} autoPlay loop />
      <Txt center size={20} flex={1} paddingHorizontal={20} >
        {t('Congratulation! Your account has been verified!')}
      </Txt>
    </Safe>
  )
}

export default React.memo(Success)

const styles = StyleSheet.create({})