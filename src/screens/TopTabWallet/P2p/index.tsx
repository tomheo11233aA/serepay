import Box from '@commom/Box'
import { colors } from '@themes/colors'
import React, {useEffect, useState} from 'react'
import BuySellItem from './BuySellItem'
import ChooseCoin from './ChooseCoin'
import Note from './Note'
import BuyCoin from './BuyCoin'
import { useTranslation } from 'react-i18next'
import CoinChoosed from './CoinChoosed'
import { ICoin } from '@models/coin'
import { useSelector } from 'react-redux'
import { coinListSelector } from '@redux/selector/userSelector'
//

const P2p = () => {
  const { t } = useTranslation()
  const coins = useSelector(coinListSelector)
  const [selectedCoin, setSelectedCoin] = React.useState<ICoin | null>(null)

  useEffect(() => {
    const btc = coins.find((coin: ICoin) => coin.name === 'BTC')
    if (btc) {
      setSelectedCoin(btc)
    }
  }, [coins])

  return (
    <Box
      flex={1}
      marginTop={10}
    >
      <CoinChoosed setSelectedCoin={setSelectedCoin} selectedCoin={selectedCoin}  />
      <Box
        row
        marginTop={20}
        justifySpaceBetween
        paddingHorizontal={15}
      >

        <BuySellItem
          buttonText={t('Buy now')}
          title={t('Selling price')}
          buttonColor={colors.green}
          selectedCoin={selectedCoin}
        />
        <BuySellItem
          buttonColor={colors.red2}
          title={t('Buying price')}
          buttonText={t('Sell now')}
          selectedCoin={selectedCoin}
        />
      </Box>
      <Box
        flex={1}
        marginTop={20}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor={'white'}
      >
        <Note t={t} />
        <BuyCoin t={t} />
      </Box>
    </Box>
  )
}

export default P2p