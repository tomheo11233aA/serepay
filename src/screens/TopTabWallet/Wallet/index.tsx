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
import { fetchListExchange } from '../../../redux/slice/exchangeRateSlice'
import { coinListSelector } from '@redux/selector/userSelector'
import Icon from '@commom/Icon'

const Wallet = () => {
  const { t } = useTranslation()
  const dispatch: AppDispatch = useDispatch()
  const userWallet = useSelector(userWalletUserSelector)
  const userInfo = useSelector(userInfoUserSelector)
  const coins = useSelector(coinListSelector)
  const price = coins.find((coin) => coin?.name === 'BTC')?.price ?? 0
  const [selectedRate, setSelectedRate] = React.useState<any>({ title: 'USD', rate: 1 })
  const transferPrice = (userWallet?.btc_balance ?? 0) * price * selectedRate.rate
  React.useEffect(() => {
    dispatch(fetchUserWallet())
    dispatch(fetchUserInfo())
    dispatch(fetchListExchange())
  }, [dispatch]);
  const totalValueInUSD = Object.keys(userWallet ?? {}).reduce((total, coinKey) => {
    const coin = coins.find(coin => coin?.symbolWallet?.toLowerCase() === coinKey.split('_')[0]);
    return total + ((coin?.price ?? 0) * (userWallet?.[coinKey] ?? 0));
  }, 0);
  const totalValueInBTC = totalValueInUSD / (coins.find(coin => coin.name === 'BTC')?.price ?? 1);
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
        <Box marginTop={10} row justifyCenter alignCenter>
          <Icon
            size={30}
            source={require('@images/wallet/bitcoin.png')}
          />
          <Txt color={'white'} size={30} marginLeft={10}>
            {totalValueInBTC.toFixed(8)}
          </Txt>
        </Box>
        <Box marginTop={10} row justifyCenter alignCenter>
          <Icon
            size={30}
            source={require('@images/wallet/dollar.png')}
          />
          <Txt color={'white'} size={30} marginLeft={10}>
          {transferPrice.toFixed(3)}
          </Txt>
        </Box>
      </Box>
      <Box
        flex={1}
        marginTop={30}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor={'white'}
      >
        <Options t={t} setSelectedRate={setSelectedRate} />
        <Coins style={{ paddingBottom: 150 }} />
      </Box>
    </Box>
  )
}

export default React.memo(Wallet)