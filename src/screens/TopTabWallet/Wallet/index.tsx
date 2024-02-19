import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import Icon from '@commom/Icon'
import Coins from './Coins'
import Options from './Options'
import { AppDispatch } from '@redux/store/store'
import { fetchUserInfo, fetchUserWallet } from '@redux/slice/userSlice'
import { fetchListExchange } from '../../../redux/slice/exchangeRateSlice'
import { userWalletUserSelector, userInfoUserSelector, coinListSelector, selectedRateSelector } from '@redux/selector/userSelector'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Wallet = () => {
  const { t } = useTranslation()
  const dispatch: AppDispatch = useDispatch()
  const userWallet = useSelector(userWalletUserSelector)
  const userInfo = useSelector(userInfoUserSelector)
  const coins = useSelector(coinListSelector)
  const selectedRate = useSelector(selectedRateSelector)

  React.useEffect(() => {
    dispatch(fetchUserWallet())
    dispatch(fetchUserInfo())
    dispatch(fetchListExchange())
  }, [dispatch])

  const coinMap = useMemo(() => {
    const map = new Map();
    coins.forEach(coin => {
      if (coin?.symbolWallet) {
        map.set(coin?.symbolWallet?.toLowerCase(), coin);
      }
    })
    return map;
  }, [coins]);

  const totalValueInUSD = useMemo(() => {
    if (!userWallet) return 0;

    return Object.keys(userWallet).reduce((total, coinKey) => {
      const coinSymbol = coinKey.split('_')[0];
      const coin = coinMap.get(coinSymbol);
      const coinPrice = coin?.price ?? 0;
      const coinAmount = userWallet[coinKey] ?? 0;

      return total + coinPrice * coinAmount;
    }, 0);
  }, [userWallet, coinMap]);

  const totalValueInBTC = useMemo(() => {
    const btcPrice = coins.find(coin => coin.name === 'BTC')?.price ?? 1;
    return totalValueInUSD / btcPrice;
  }, [totalValueInUSD, coins]);

  const transferPrice = useMemo(() => {
    return totalValueInUSD * selectedRate.rate;
  }, [totalValueInUSD, selectedRate]);

  return (
    <Box flex={1} marginTop={50}>
      <Box alignCenter>
        <Txt size={16} marginTop={10} color={'white'}>
          {t('HELLO')} {userInfo?.username}
        </Txt>
        <Box marginTop={10} row justifyCenter alignCenter>
          <Icon size={30} source={require('@images/wallet/bitcoin.png')} />
          <Txt color={'white'} size={30} marginLeft={10}>
            {/* {totalValueInBTC.toFixed(8)} */}
            {totalValueInBTC.toLocaleString('en-US', { maximumFractionDigits: 8 })}
            {' BTC'}
          </Txt>
        </Box>
        <Box marginTop={10} row justifyCenter alignCenter style={{ alignSelf: 'center' }}>
          <Icon size={30} source={require('@images/wallet/dollar.png')} />
          <Txt color={'white'} size={30} marginLeft={10}
            justify
          >
            {transferPrice.toLocaleString('en-US', { maximumFractionDigits: 2})} {selectedRate.title}
          </Txt>
        </Box>
      </Box>
      <Box flex={1} marginTop={hp('2.5%')} borderTopLeftRadius={20} borderTopRightRadius={20} backgroundColor={'white'}>
        <Options t={t} />
        <Coins
          style={{ paddingBottom: hp('20%') }}
        />
      </Box>
    </Box>
  )
}

export default React.memo(Wallet)