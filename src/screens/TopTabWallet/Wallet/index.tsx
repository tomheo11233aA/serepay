import React, { useMemo, useState, useEffect } from 'react'
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
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import { roundCoin } from '@screens/Swap/MakePrice'
import Btn from '@commom/Btn'
import { localStorage } from '@utils/localStorage'

const Wallet = () => {
  const { t } = useTranslation()
  const dispatch: AppDispatch = useDispatch()
  const userWallet = useSelector(userWalletUserSelector)
  const userInfo = useSelector(userInfoUserSelector)
  const coins = useSelector(coinListSelector)
  const selectedRate = useSelector(selectedRateSelector)
  const [supportedCurrencies, setSupportedCurrencies] = useState<any>([]);

  useEffect(() => {
    dispatch(fetchUserWallet())
    dispatch(fetchUserInfo())
    dispatch(fetchListExchange())
  }, [dispatch])
  useEffect(() => {
    const loadSupportedCurrencies = async () => {
      const currencies = await getSupportedCurrencies();
      setSupportedCurrencies(currencies.map(currency => currency.code));
    };
    loadSupportedCurrencies();
  }, []);
  const currencyCode = useMemo(() => {
    return supportedCurrencies.includes(selectedRate.title) ? selectedRate.title : null;
  }, [supportedCurrencies, selectedRate.title]);

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

  const displayCurrency = useMemo(() => {
    if (currencyCode) {
      const transferPriceRounded = currencyCode === 'VND' ? Math.round(transferPrice) : transferPrice;
      const [valueFormattedWithSymbol, valueFormattedWithoutSymbol] = formatCurrency({
        amount: Number(roundCoin(transferPriceRounded)),
        code: currencyCode,
      });
      return `${valueFormattedWithoutSymbol} ${currencyCode}`;
    } else {
      return `${transferPrice.toLocaleString()} ${selectedRate.title}`;
    }
  }, [transferPrice, currencyCode]);

  return (
    <Box flex={1} marginTop={50}>
      <Box alignCenter>
        <Txt size={16} marginTop={10} color={'white'}>
          {t('HELLO')} {userInfo?.username}
        </Txt>
        {/* <Btn
          backgroundColor={'red'}
          onPress={() => {
            localStorage.clearAll()
          }}
        >
          <Box marginTop={10} row justifyCenter alignCenter>
            <Txt color={'white'} size={30} marginLeft={10}>
              Test expired token
            </Txt>
          </Box>
        </Btn> */}
        <Box marginTop={10} row justifyCenter alignCenter>
          <Icon size={30} source={require('@images/wallet/bitcoin.png')} />
          <Txt color={'white'} size={30} marginLeft={10}>
            {totalValueInBTC.toLocaleString('en-US', { maximumFractionDigits: 8 })}
            {' BTC'}
          </Txt>
        </Box>
        <Box marginTop={10} row justifyCenter alignCenter style={{ alignSelf: 'center' }}>
          <Icon size={30} source={require('@images/wallet/dollar.png')} />
          <Txt color={'white'} size={30} marginLeft={10} justify>
            {displayCurrency}
          </Txt>
        </Box>
      </Box>
      <Box flex={1} marginTop={hp('2.5%')} borderTopLeftRadius={20} borderTopRightRadius={20} backgroundColor={'white'} marginBottom={hp(10)}
      >
        <Options t={t} />
        <Coins
          style={{ paddingBottom: hp('20%') }}
        />
      </Box>
    </Box>
  )
}

export default React.memo(Wallet)