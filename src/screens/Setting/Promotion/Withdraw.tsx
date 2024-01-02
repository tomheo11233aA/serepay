import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Withdraw: { symbol: string };
};

export type DepositScreenRouteProp = RouteProp<RootStackParamList, 'Withdraw'>;

export interface DepositProps {
  route: DepositScreenRouteProp;
}

const Withdraw:React.FC<DepositProps> = ({route}) => {
  return (
    <View>
      <Text>Withdraw</Text>
    </View>
  )
}

export default Withdraw

const styles = StyleSheet.create({})