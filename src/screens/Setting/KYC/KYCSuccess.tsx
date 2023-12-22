import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import Safe from '@reuse/Safe'

const Success = () => {
  return (
    <Safe flex={1} backgroundColor='white'>
      <LottieView source={require('../../../assets/lottie/success.json')} autoPlay loop={false} />
    </Safe>
  )
}

export default Success

const styles = StyleSheet.create({})