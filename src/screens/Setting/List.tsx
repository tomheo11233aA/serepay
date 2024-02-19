import React, { useState } from 'react'
import { ImageSourcePropType, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import Item from './Item'
import { useAppDispatch } from '@hooks/redux'
import { setLogin } from '@redux/slice/userSlice'
import { screens } from '@contants/screens'
import { navigate } from '@utils/navigationRef'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { keys } from '@contants/keys'
import { useTranslation } from 'react-i18next'
import { convertLanguage } from '@utils/convert'
import { setLanguage } from '@redux/slice/userSlice'
import { Portal, Modal } from 'react-native-paper'
import Scroll from '@commom/Scroll'
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import { FlatList } from 'react-native'

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
  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const handleChangeLanguage = async (lng: string) => {
    console.log('lng', lng)
    i18n.changeLanguage(lng)
    await AsyncStorage.setItem(keys.LANGUAGE, lng)
    const lngObj = convertLanguage(lng)
    dispatch(setLanguage(lngObj))
    hideModal()
  }
  const languageOptions = ['en', 'vn', 'ko', 'ja', 'zh', 'th', 'km', 'lo', 'id', 'fr', 'es', 'it', 'de', 'pt', 'tr', 'ru', 'nl', 'ms', 'ar', 'he', 'el', 'pl', 'hi'];

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
        showModal()
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
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}
          contentContainerStyle={{ backgroundColor: 'white', padding: 20, borderRadius: 10, marginTop: 20 }}>
          <FlatList
            data={languageOptions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleChangeLanguage(item)}>
                <Box
                  row
                  alignCenter
                  key={item}
                  justifySpaceBetween
                  paddingHorizontal={10}
                  paddingVertical={10}
                  borderBottomWidth={1}
                  borderColor={colors.gray}
                >
                  <Box row alignCenter>
                    <Icon
                      size={25}
                      marginRight={10}
                      source={convertLanguage(item).image}
                    />
                    <Txt size={16}>{t(convertLanguage(item).title)}</Txt>
                  </Box>
                </Box>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
          />
        </Modal>
      </Portal>
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