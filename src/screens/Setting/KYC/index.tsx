import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Form from './Form'
import Success from './KYCSuccess'
import Waiting from './KYCWaiting'
import { AppDispatch } from '@redux/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo } from '@redux/slice/userSlice'
import { userInfoUserSelector } from '@redux/selector/userSelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'

const KYCScreen = () => {
  const [isVerify, setIsVerify] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    AsyncStorage.getItem('verified').then((value) => {
      setIsVerify(Number(value))
      setIsLoading(false);
    })
  }, []);
  return (
    <>
    <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
      {!isLoading && (isVerify === 1 ? <Success /> : isVerify === 2 ? <Waiting /> : <Form />)}
    </>
  )
}

export default React.memo(KYCScreen)