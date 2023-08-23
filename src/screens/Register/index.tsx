import React from 'react'
import Box from '@commom/Box'
import { colors } from '@themes/colors'
import Safe from '@reuse/Safe'
import Scroll from '@commom/Scroll'
import Icon from '@commom/Icon'
import { width } from '@utils/responsive'
import Header from '@screens/Login/Header'
import Form from './Form'

const Register = () => {
  return (
    <Box flex={1} backgroundColor={colors.darkViolet}>
      <Safe>
        <Header title={'Register'} />
      </Safe>
      <Scroll flex={1} backgroundColor={'white'}>
        <Box alignCenter>
          <Icon
            resizeMode={'contain'}
            size={width * 40 / 100}
            tintColor={colors.darkViolet}
            source={require('@images/logo.png')}
          />
          <Form />
        </Box>
      </Scroll>
    </Box>
  )
}

export default Register