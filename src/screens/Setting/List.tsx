import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React from 'react'
import { ImageSourcePropType } from 'react-native'
import Animated from 'react-native-reanimated'
import Item from './Item'
import { useAppDispatch } from '@hooks/redux'
import { setLogin } from '@redux/slice/userSlice'
import { useNavigation } from '@react-navigation/native'
import { screens } from '@contants/screens'
import { navigate } from '@utils/navigationRef'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { keys } from '@contants/keys'
import { useTranslation } from 'react-i18next'
import { convertLanguage } from '@utils/convert'
import { setLanguage } from '@redux/slice/userSlice'
import { languageUserSelector } from '@redux/selector/userSelector'
import { useAppSelector } from '@hooks/redux'

export interface IOption {
  title: string;
  icon: ImageSourcePropType;
  onClick?: () => void;
}

interface Props {
  t: any;
}

const List = ({ t }: Props) => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const language = useAppSelector(languageUserSelector)

  const handleChangeLanguage = async () => {
    const lng = i18n.language == 'en' ? 'vn' : 'en'
    i18n.changeLanguage(lng)
    await AsyncStorage.setItem(keys.LANGUAGE, lng)
    const lngObj = convertLanguage(lng)
    dispatch(setLanguage(lngObj))
  }
  const data: IOption[] = [
    {
      title: 'Ecosystem',
      icon: require('@images/setting/menu.png'),
      onClick: () => navigate(screens.ECOSYSTEM)
    },
    {
      title: 'Promotion',
      icon: require('@images/setting/gift.png'),
      onClick: () => navigate(screens.PROMOTION)
    },
    {
      title: 'Listing',
      icon: require('@images/setting/list.png'),
      onClick: () => navigate(screens.ADVERTISING_HISTORY)
    },
    {
      title: 'History',
      icon: require('@images/setting/history.png'),
      onClick: () => navigate(screens.HISTORY_TRANSACTION)
    },
    {
      title: 'Security 12 characters',
      icon: require('@images/unAuth/lock.png')
    },
    {
      title: '2FA Security',
      icon: require('@images/unAuth/lock.png'),
      onClick: () => navigate(screens.TWO_FACTOR_AUTHENTICATION)
    },
    {
      title: 'Change password',
      icon: require('@images/setting/wifi.png')
    },
    {
      title: 'KYC',
      icon: require('@images/setting/security.png'),
      onClick: () => navigate(screens.KYC)
    },
    {
      title: 'Change Language',
      icon: i18n.language == 'en' ? require('@images/unAuth/america.png') : require('@images/unAuth/vietnam.png'),
      onClick: () => {
        handleChangeLanguage()
      }
    },
    {
      title: 'Logout',
      icon: require('@images/setting/logout.png'),
      onClick: () => {
        dispatch(setLogin(false))
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('isLogin')
      }
    },  
  ]

  return (
    <Animated.View
      style={{
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: 'white',
      }}
    >
      {data.map((item) =>
        <Item
          t={t}
          item={item}
          key={item.title}
          onClick={item.onClick}
        />
      )}
    </Animated.View>
  )
}

export default List