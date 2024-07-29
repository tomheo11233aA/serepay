import React, {useState, useRef} from 'react';
import Animated from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider, Modal, Portal} from 'react-native-paper';
import {useAppSelector, useAppDispatch} from '@hooks/redux';
import {isTokenExpiredSelector} from '@redux/selector/userSelector';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import {useTranslation} from 'react-i18next';
import {AppDispatch} from '@redux/store/store';
import {setLogin, setIsTokenExpired} from '@redux/slice/userSlice';
import Container from '@navigations/Container';
import {fonts} from '@themes/fonts';
import {colors} from '@themes/colors';
import Box from '@commom/Box';
import Input from '@commom/Input';
import AxiosInstance from '@helper/AxiosInstance';
import {localStorage} from '@utils/localStorage';
import Spinner from 'react-native-loading-spinner-overlay';
import {TextInput} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const {t} = useTranslation();
  const dispatch: AppDispatch = useAppDispatch();
  const [security, setSecurity] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [txtError, setTxtError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isTokenExpired = useAppSelector(isTokenExpiredSelector);

  const handleLogin = async () => {
    const axiosInstance = AxiosInstance();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('api/user/login', {
        userName: userName,
        password: password,
      });
      if (response.data.status) {
        localStorage.set('token', response.data.token);
        localStorage.set('isLogin', true);
        dispatch(setLogin(true));
        dispatch(setIsTokenExpired(false));
        setUserName('');
        setPassword('');
        setTxtError('');
      }
    } catch (error: any) {
      setTxtError(error.response.data.message);
      if (error.response.data.message === 'Email or password is incorrect! ') {
        setTxtError(t('Email or password is incorrect!'));
      } else if (error.response.data.message === 'Account is not activated! ') {
        setTxtError(t('Account is not activated!'));
      } else if (error.response.data.message === 'Code Emty! ') {
        setTxtError(t('Account is not activated 2FA, please enter OTP code'));
      } else if (error.response.data.errors === 11) {
        setTxtError(t('OTP code is incorrect'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const userNameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  return (
    <Animated.View style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <PaperProvider>
            <Portal>
              <Spinner
                visible={isLoading}
                textContent={'Loading...'}
                textStyle={{color: '#FFF'}}
              />
              <Modal
                visible={isTokenExpired}
                dismissable={false}
                contentContainerStyle={{
                  backgroundColor: 'white',
                  padding: 20,
                  margin: 20,
                  borderRadius: 10,
                }}>
                <Txt fontFamily={fonts.OSB} size={16}>
                  {t('Please login again!')}
                </Txt>
                <Box
                  style={{
                    height: 1,
                    backgroundColor: colors.gray2,
                    marginVertical: 10,
                  }}
                />
                <Txt fontFamily={fonts.OL} size={16}>
                  {t('Login session has expired!')}
                  <Txt fontFamily={fonts.OL} size={16}>
                    {'\n'}
                    {t('Please log in again to continue using the app.')}
                  </Txt>
                </Txt>
                <Box
                  style={{
                    height: 1,
                    backgroundColor: colors.gray2,
                    marginVertical: 10,
                  }}
                />

                <Txt
                  fontFamily={fonts.OL}
                  size={16}
                  color={colors.blue}
                  marginBottom={10}>
                  {t('Please log in here or press OK to hide the dialog.')}
                </Txt>

                <Box>
                  <Input
                    font={fonts.OL}
                    radius={5}
                    height={45}
                    width={'100%'}
                    borderWidth={1}
                    hint={t('User Name')}
                    tintColor={colors.gray2}
                    borderColor={colors.gray}
                    value={userName}
                    onChangeText={(text: string) => setUserName(text)}
                    iconOne={require('@images/unAuth/user.png')}
                    returnKeyType={'next'}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    ref={userNameRef}
                  />
                  <Input
                    font={fonts.OL}
                    radius={5}
                    height={45}
                    width={'100%'}
                    marginTop={15}
                    borderWidth={1}
                    hint={t('Password')}
                    security={security}
                    tintColor={colors.gray2}
                    borderColor={colors.gray}
                    onPress={() => setSecurity(!security)}
                    iconOne={require('@images/unAuth/lock.png')}
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}
                    iconTwo={
                      security
                        ? require('@images/unAuth/view.png')
                        : require('@images/unAuth/hide.png')
                    }
                    ref={passwordRef}
                  />
                </Box>
                {txtError && (
                  <Txt fontFamily={fonts.OL} color={colors.red} marginTop={20}>
                    {'* '}
                    {t(txtError)}
                  </Txt>
                )}

                <Box row justifySpaceBetween>
                  <Btn
                    style={{marginTop: 20, minWidth: 100}}
                    backgroundColor={colors.violet}
                    padding={10}
                    radius={10}
                    onPress={async () => {
                      dispatch(setLogin(false));
                      dispatch(setIsTokenExpired(false));
                    }}>
                    <Txt fontFamily={fonts.OSB} center size={16}>
                      OK
                    </Txt>
                  </Btn>
                  <Box style={{width: 10}} />
                  <Btn
                    flex={1}
                    style={{marginTop: 20}}
                    backgroundColor={colors.darkViolet}
                    padding={10}
                    radius={10}
                    onPress={async () => {
                      await handleLogin();
                    }}>
                    <Txt
                      fontFamily={fonts.OSB}
                      center
                      size={16}
                      color={'white'}>
                      Login
                    </Txt>
                  </Btn>
                </Box>
              </Modal>
            </Portal>
            <Container />
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Animated.View>
  );
};

export default App;
