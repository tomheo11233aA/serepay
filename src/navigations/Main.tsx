import { useAppSelector } from '@hooks/redux'
import { isLoginUserSelector } from '@redux/selector/userSelector'
import React, { useEffect } from 'react'
import AuthNavigation from './AuthNavigation'
import UnAuthNavigation from './UnAuthNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setLogin } from '@redux/slice/userSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@redux/store/store'
import { fetchUserInfo } from '@redux/slice/userSlice'
import { userInfoUserSelector } from '@redux/selector/userSelector'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'

const Main = () => {
    const isLogin = useAppSelector(isLoginUserSelector)
    const userInfo = useSelector(userInfoUserSelector)
    const dispatch: AppDispatch = useDispatch()
    const isEnebleTwoFA = useCallback(async () => {
        const isTwoFA = userInfo?.enabled_twofa
        await AsyncStorage.setItem('isTwoFA', (isTwoFA ?? 0).toString())
        if (isTwoFA == 1) {
            dispatch(setLogin(false))
        } else if (isTwoFA == 0) {
            dispatch(setLogin(true))
        }
    }, [userInfo?.enabled_twofa, dispatch])

    useEffect(() => {
        dispatch(fetchUserInfo())
        isEnebleTwoFA()
    }, [isEnebleTwoFA]);
    return (
        <>
            { isLogin ? <AuthNavigation /> : <UnAuthNavigation />}
        </>
    )
}

export default Main