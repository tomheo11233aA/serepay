import Box from '@commom/Box'
import Txt from '@commom/Txt'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Coins from './Coins'
import Options from './Options'
import { fetchUserInfo, fetchUserWallet } from '@redux/slice/userSlice'
import { userWalletUserSelector, userInfoUserSelector } from '@redux/selector/userSelector'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@redux/store/store'

const Wallet = () => {
  const { t } = useTranslation()
  const dispatch: AppDispatch = useDispatch()
  const userWallet = useSelector(userWalletUserSelector)
  const userInfo = useSelector(userInfoUserSelector)
  React.useEffect(() => {
    dispatch(fetchUserWallet())
    dispatch(fetchUserInfo())
  }, [dispatch]);
  return (
    <Box flex={1} marginTop={50}>
      <Box alignCenter>
        <Txt
          size={16}
          marginTop={10}
          color={'white'}
        >
          {t('HELLO')} {userInfo?.username}
        </Txt>
        <Txt color={'white'} size={30} marginTop={10}>
          ${userWallet?.bnb_balance}
        </Txt>
      </Box>
      <Box
        flex={1}
        marginTop={30}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor={'white'}
      >
        <Options t={t} />
        <Coins style={{paddingBottom: 150}} />
      </Box>
    </Box>
  )
}

export default React.memo(Wallet)