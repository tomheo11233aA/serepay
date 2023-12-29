import { useAppSelector } from '@hooks/redux'
import { isLoginUserSelector } from '@redux/selector/userSelector'
import React, { useEffect } from 'react'
import AuthNavigation from './AuthNavigation'
import UnAuthNavigation from './UnAuthNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setLogin } from '@redux/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@redux/store/store'
import { userInfoUserSelector } from '@redux/selector/userSelector'
import { socket } from '../helper/AxiosInstance'

const Main = () => {
    const isLogin = useAppSelector(isLoginUserSelector)
    const userInfo = useSelector(userInfoUserSelector)
    const dispatch: AppDispatch = useDispatch()
    // const isEnebleTwoFA = useCallback(async () => {
    //     const isTwoFA = userInfo?.enabled_twofa
    //     await AsyncStorage.setItem('isTwoFA', (isTwoFA ?? 0).toString())
    //     if (isTwoFA == 1) {
    //         dispatch(setLogin(false))
    //     } else if (isTwoFA == 0) {
    //         dispatch(setLogin(true))
    //     }
    // }, [userInfo?.enabled_twofa, dispatch])

    // useEffect(() => {
    //     dispatch(fetchUserInfo())
    //     isEnebleTwoFA()
    // }, [isEnebleTwoFA]);
    // get
    // get isLogin from AsyncStorage

    useEffect(() => {
        const fetchIsLogin = async () => {
            const isLogin = await AsyncStorage.getItem('isLogin')
            dispatch(setLogin(isLogin == 'true' ? true : false))
        }
        fetchIsLogin()
    }, [])

    // useEffect(() => {
    //     if (userInfo && userInfo.id) {
    //         socket.emit('join', userInfo.id);
    //         socket.on("ok", (res) => {
    //             console.log(res, "ok");
    //         });
    //         return () => {
    //             console.log("leave");
    //             socket.off("ok");
    //         }
    //     } else {
    //         socket.off("ok");
    //     }
    // }, [userInfo]);

    return (
        <>
            { isLogin ? <AuthNavigation /> : <UnAuthNavigation />}
        </>
    )
}

export default Main