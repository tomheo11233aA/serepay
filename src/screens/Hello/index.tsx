import Box from '@commom/Box'
import Icon from '@commom/Icon'
import { keys } from '@contants/keys'
import { screens } from '@contants/screens'
import { useAppDispatch } from '@hooks/redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { setLanguage } from '@redux/slice/userSlice'
import { colors } from '@themes/colors'
import { convertLanguage } from '@utils/convert'
import { width } from '@utils/responsive'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchBanks } from '@redux/slice/bankSlice'

const Hello = () => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const navigation = useNavigation<any>()

  useEffect(() => {
    dispatch(fetchBanks())
  }, [])

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      const lng = await AsyncStorage.getItem(keys.LANGUAGE) || 'en'
      i18n.changeLanguage(lng)
      const lngObj = convertLanguage(lng)
      dispatch(setLanguage(lngObj))
      navigation.replace(screens.MAIN)
    }, 2000)

    return () => clearTimeout(timeOut)
  }, [])

  return (
    <Box
      flex={1}
      alignCenter
      justifyCenter
      backgroundColor={colors.darkViolet}
    >
      <Icon
        resizeMode={'contain'}
        source={require('@images/logowhite.png')}
        size={width * 40 / 100}
      />
    </Box>
  )
}

export default Hello