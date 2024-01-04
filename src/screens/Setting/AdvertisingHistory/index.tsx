import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React, {useState} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Tab from './Tab'
import { useTranslation } from 'react-i18next'
import { goBack } from '@utils/navigationRef'
import { TouchableOpacity } from 'react-native'

export interface IAdvertising {
  id: number;
  side: string;
  amount: number;
  amountMinimum: number;
  userName: string;
  email: string;
  type: number;
  userid: number;
  created_at: string;
  addressWallet: string;
  bankName: string;
  ownerAccount: string;
  numberBank: string;
  symbol: string;
  amountSuccess: number;
}

const Advertising = () => {
  const { t } = useTranslation()
  return (
    <LinearGradient
      style={{ flex: 1 }}
      end={{ x: 1, y: 0.5 }}
      start={{ x: 0, y: 0.5 }}
      colors={[colors.darkViolet, colors.violet]}
    >
      <Box
        flex={1}
        marginTop={60}
        paddingHorizontal={15}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor={'white'}
      >
        <Box
          row
          alignCenter
          paddingTop={10}
        >
          <TouchableOpacity onPress={() => goBack()}>
            <Icon
              size={25}
              source={require('@images/unAuth/left.png')}
            />
          </TouchableOpacity>
          <Txt bold color={colors.violet} size={18}>
            {`  ${t('Advertising History')}`}
          </Txt>
        </Box>
        <Box paddingHorizontal={10}>
          <Tab t={t} />
        </Box>
      </Box>
    </LinearGradient>
  )
}

export default Advertising