import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { keys } from '@contants/keys'
import { screens } from '@contants/screens'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { languageUserSelector } from '@redux/selector/userSelector'
import { setLanguage } from '@redux/slice/userSlice'
import { colors } from '@themes/colors'
import { convertLanguage } from '@utils/convert'
import { navigate } from '@utils/navigationRef'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Modal, Portal } from 'react-native-paper'

const Form = () => {
  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation()
  const language = useAppSelector(languageUserSelector)
  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const handleChangeLanguage = async (lng: string) => {
    i18n.changeLanguage(lng)
    await AsyncStorage.setItem(keys.LANGUAGE, lng)
    const lngObj = convertLanguage(lng)
    dispatch(setLanguage(lngObj))
    hideModal()
  }
  const languageOptions = ['en', 'vn', 'ko', 'ja', 'zh', 'th', 'km', 'lo', 'id', 'fr', 'es', 'it', 'de', 'pt', 'tr', 'ru', 'nl', 'ms', 'ar', 'he', 'el', 'pl', 'hi'];

  return (
    <Box width={'100%'} marginBottom={100}>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}
          contentContainerStyle={{ backgroundColor: 'white', padding: 20, borderRadius: 10, marginTop: 50 }}>
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
      <Btn
        onPress={showModal}
        row
        radius={7}
        alignCenter
        padding={10}
        width={'100%'}
        justifySpaceBetween
        backgroundColor={'white'}
      >
        <Box row alignCenter>
          <Icon
            size={30}
            marginRight={10}
            source={language.image}
          />
          <Txt size={15}>{t(language.title)}</Txt>
        </Box>
        <Icon
          size={25}
          marginRight={10}
          source={require('@images/unAuth/refresh.png')}
        />
      </Btn>

      <Box
        row
        alignCenter
        marginTop={20}
        justifySpaceBetween
      >
        <Btn
          style={styles.button}
          onPress={() => navigate(screens.LOGIN)}
        >
          <Txt style={styles.textButton}>{t('LOGIN')}</Txt>
        </Btn>
        <Btn
          style={styles.button}
          onPress={() => navigate(screens.REGISTER)}
        >
          <Txt style={styles.textButton}>{t('REGISTER')}</Txt>
        </Btn>
      </Box>

      <Btn alignSelf={'center'}>
        <Txt color={colors.violet} bold marginTop={20}>
          {t('Email active again?')}
        </Txt>
      </Btn>
    </Box>
  )
}

export default Form

const styles = StyleSheet.create({
  button: {
    width: '45%',
    borderRadius: 30,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  textButton: {
    fontWeight: 'bold',
    color: colors.darkViolet,
  },
})