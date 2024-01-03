import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient'
import Tab from './Tab'
import { goBack } from '@utils/navigationRef'
import { TouchableOpacity } from 'react-native'
import { colors } from '@themes/colors'
import Box from '@commom/Box';
import Icon from '@commom/Icon';
import Txt from '@commom/Txt';

type RootStackParamList = {
  Withdraw: { symbol: string };
};

type WithdrawScreenRouteProp = RouteProp<RootStackParamList, 'Withdraw'>;

export interface WithdrawProps {
  route?: WithdrawScreenRouteProp;
}
const Withdraw:React.FC<WithdrawProps> = ({route}) => {
  console.log("Withdraw", route?.params.symbol)
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
            {`  ${t('Withdraw')}`}
          </Txt>
        </Box>
        <Box paddingHorizontal={10}>
          <Tab t={t} route={route} />
        </Box>
      </Box>
    </LinearGradient>
  )
}

export default Withdraw
