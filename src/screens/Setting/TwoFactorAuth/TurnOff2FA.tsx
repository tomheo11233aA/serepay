import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AxiosInstance from '../../../helper/AxiosInstance'
import { Switch } from 'react-native'
const TurnOff2FA = () => {
  const [otp, setOtp] = React.useState('')
  // React.useEffect(() => {
  //   const fetchOTP = async () => {
  //     const response = await AxiosInstance().post('/api/user/turnOff2FA', {
  //       otp: otp
  //     })
  //     console.log(response.data)
  //   }
  //   fetchOTP()
  // }, [otp])
  return (
    <View>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        ios_backgroundColor='#3e3e3e'
      />
    </View>
  )
}

export default TurnOff2FA

const styles = StyleSheet.create({})