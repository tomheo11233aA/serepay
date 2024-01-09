import Box from '@commom/Box'
import Txt from '@commom/Txt'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@themes/colors'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import List from './List'
import ReferralItem from './ReferralItem'
import User from './User'
import SocialNetwork from './SocialNetwork'
import { useTranslation } from 'react-i18next'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const Setting = () => {
  const { t } = useTranslation()

  return (
    <LinearGradient
      style={{ flex: 1, marginBottom: hp('2%')
      }}
      end={{ x: 1, y: 0.5 }}
      start={{ x: 0, y: 0.5 }}
      colors={[colors.darkViolet, colors.violet]}
    >
      <KeyBoardSafe>
        <Box paddingHorizontal={15} marginBottom={10}>
          <Txt color={'white'} bold size={20}>
            {t('Setting')}
          </Txt>
        </Box>
        <Box flex={1} backgroundColor={colors.gray5} paddingHorizontal={15}>
          <User t={t} />
          <Box row justifySpaceBetween>
            <ReferralItem
              title={t('Referral link')}
            />
            <ReferralItem
              title={t('Referral code')}
            />
          </Box>
          <List t={t} />
          <SocialNetwork t={t} />
        </Box>
      </KeyBoardSafe>
    </LinearGradient>
  )
}

export default Setting