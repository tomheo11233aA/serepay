import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Form from './Form'
import Success from './KYCSuccess'
import Waiting from './KYCWaiting'
import { AppDispatch } from '@redux/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo } from '@redux/slice/userSlice'
import { userInfoUserSelector } from '@redux/selector/userSelector'


const KYCScreen = () => {
  const dispatch: AppDispatch = useDispatch()
  const [isVerify, setIsVerify] = React.useState<number | null>(null);
  const userInfo = useSelector(userInfoUserSelector)
  React.useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch]);

  React.useEffect(() => {
    if (userInfo) {
      setIsVerify(userInfo?.verified)
    }
  }, [userInfo]);
  return (
    <>
    {/* if isVerify is 1 will render success, 2 is waiting, if !=1 and !=2 will render form */}
      {isVerify === 1 ? <Success /> : isVerify === 2 ? <Waiting /> : <Form />}
    </>
  )
}

export default KYCScreen

const styles = StyleSheet.create({})