import Box from '@commom/Box'
import { colors } from '@themes/colors'
import React, { useEffect, useState } from 'react'
import BuySellItem from './BuySellItem'
import Note from './Note'
import BuyCoin from './BuyCoin'
import { useTranslation } from 'react-i18next'
import CoinChoosed from './CoinChoosed'
import { ICoin } from '@models/coin'
import { useSelector } from 'react-redux'
import { coinListSelector } from '@redux/selector/userSelector'
import { ScrollView, View } from 'react-native'
import { useCoinSocket } from '../../../helper/useCoinSocket'
import SearchBox from './SearchBox'
import { socketConnectedSelector } from '@redux/selector/userSelector'
import { setConnected } from '@redux/slice/coinSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@redux/store/store'

const P2p = () => {
  useCoinSocket()
  const { t } = useTranslation()
  const dispatch: AppDispatch = useDispatch()
  const [selectedCoin, setSelectedCoin] = React.useState<ICoin | null>(null)
  const [searchType, setSearchType] = useState<'buy' | 'sell' | null>(null)
  const coins = useSelector(coinListSelector)
  const socketConnected = useSelector(socketConnectedSelector)
  useEffect(() => {
    if (!selectedCoin) {
      const btc = coins.find((coin: ICoin) => coin.name === 'BTC')
      if (btc) {
        setSelectedCoin(btc)
      }
    } else {
      const coin = coins.find((coin: ICoin) => coin.name === selectedCoin.name)
      if (coin) {
        setSelectedCoin(coin)
      }
    }
  }, [selectedCoin, coins])
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, marginTop: 10 }}>
      <CoinChoosed setSelectedCoin={setSelectedCoin} selectedCoin={selectedCoin} />
      <Box
        row
        marginTop={20}
        justifySpaceBetween
        paddingHorizontal={15}
      >
        <BuySellItem
          type={'buy'}
          buttonText={t('Buy now')}
          title={t('Selling price')}
          buttonColor={colors.green}
          selectedCoin={selectedCoin}
          onPress={() => setSearchType('buy')}
        />
        <BuySellItem
          type={'sell'}
          buttonColor={colors.red2}
          title={t('Buying price')}
          buttonText={t('Sell now')}
          selectedCoin={selectedCoin}
          onPress={() => setSearchType('sell')}
        />
      </Box>
      {searchType && <SearchBox coin={selectedCoin?.name || ''} type={searchType} />}
      <View
        style={{
          marginTop: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'white',
          marginBottom: 50,
          flex: 1
        }}
      >
        <Note t={t} />
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <BuyCoin t={t} type={'buy'} selectedCoin={selectedCoin} />
          <BuyCoin t={t} type={'sell'} selectedCoin={selectedCoin} />
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default React.memo(P2p)