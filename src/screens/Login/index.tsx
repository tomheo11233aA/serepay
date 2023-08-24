import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Scroll from '@commom/Scroll'
import Safe from '@reuse/Safe'
import { colors } from '@themes/colors'
import { width } from '@utils/responsive'
import React from 'react'
import Form from './Form'
import Header from './Header'

const Login = () => {
  return (
    <Box flex={1} backgroundColor={colors.darkViolet}>
      <Safe>
        <Header title={'Login'} />
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

export default Login