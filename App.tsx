import React from 'react';
import Animated from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Modal, Portal } from 'react-native-paper';
import { useAppSelector, useAppDispatch } from '@hooks/redux';
import { isTokenExpiredSelector } from '@redux/selector/userSelector';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '@redux/store/store';
import { setLogin, setIsTokenExpired } from '@redux/slice/userSlice';
import Container from '@navigations/Container';
import { fonts } from '@themes/fonts';
import { colors } from '@themes/colors';

const App = () => {
  const { t } = useTranslation()
  const dispatch: AppDispatch = useAppDispatch()
  const isTokenExpired = useAppSelector(isTokenExpiredSelector)
  return (
    <Animated.View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider>
          <Portal>
            <Modal
              visible={isTokenExpired}
              dismissable={false}
              contentContainerStyle=
              {{
                backgroundColor: 'white',
                padding: 20,
                margin: 20,
                borderRadius: 10,
              }}
            >
              <Txt
                fontFamily={fonts.OSB}
                center
                size={16}
              >
                {t('Please login again!')}
              </Txt>
              <Btn
                style={{ marginTop: 20, width: '100%' }}
                backgroundColor={colors.violet}
                padding={10}
                radius={10}
                onPress={async () => {
                  dispatch(setLogin(false))
                  dispatch(setIsTokenExpired(false))
                }}>
                <Txt
                  fontFamily={fonts.OSB}
                  center
                  size={16}
                >
                  Ok
                </Txt>
              </Btn>
            </Modal>
          </Portal>
          <Container />
        </PaperProvider>
      </SafeAreaProvider>
    </Animated.View>
  )
}

export default App;