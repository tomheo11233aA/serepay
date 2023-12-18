import { useAppSelector } from '@hooks/redux'
import { isLoginUserSelector } from '@redux/selector/userSelector'
import React from 'react'
import AuthNavigation from './AuthNavigation'
import UnAuthNavigation from './UnAuthNavigation'

const Main = () => {
    //test
    const isLogin = useAppSelector(isLoginUserSelector)
    return (
        <>
            { isLogin ? <AuthNavigation /> : <UnAuthNavigation />}
        </>
    )
}

export default Main