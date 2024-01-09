import React from 'react'
import Form from './Form'
import Success from './KYCSuccess'
import Waiting from './KYCWaiting'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { userInfoUserSelector } from '@redux/selector/userSelector'
import { fetchUserInfo } from '@redux/slice/userSlice'
const KYCScreen = () => {
  const [isVerify, setIsVerify] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const userInfo = useAppSelector(userInfoUserSelector);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  React.useEffect(() => {
    if (userInfo) {
      setIsVerify(userInfo.verified);
      setIsLoading(false);
    }
  }, [userInfo]);

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