import React from 'react'
import Box from '@commom/Box'
import { colors } from '@themes/colors'
import Safe from '@reuse/Safe'
import Scroll from '@commom/Scroll'
import Icon from '@commom/Icon'
import { width } from '@utils/responsive'
import Header from '@screens/Login/Header'
import Form from './Form'
import { useTranslation } from 'react-i18next'

const Register = () => {
  const { t } = useTranslation()

  return (
    <Box flex={1} backgroundColor={colors.darkViolet}>
      <Safe>
        <Header title={t('Register')} />
      </Safe>
      <Scroll flex={1} backgroundColor={'white'}>
        <Box alignCenter>
          <Icon
            resizeMode={'contain'}
            size={width * 40 / 100}
            tintColor={colors.darkViolet}
            source={require('@images/logo.png')}
          />
          <Form t={t} />
        </Box>
      </Scroll>
    </Box>
  )
}

export default Register