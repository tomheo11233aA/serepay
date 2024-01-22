import Box from '@commom/Box'
import React, { useState, useCallback, useEffect } from 'react'
import Txt from '@commom/Txt'
import { getHistorySwapApi } from '@utils/userCallApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '@themes/colors'
import { fonts } from '@themes/fonts'
import { View } from 'react-native'
import Icon from '@commom/Icon'
import { FlatList, ActivityIndicator } from 'react-native'
import { useAppSelector } from '@hooks/redux'
import { keys } from '@contants/keys'
import { coinListSelector } from '@redux/selector/userSelector'
import LottieView from 'lottie-react-native'

interface Props {
  t: any;
}

const YourPrice: React.FC<Props> = ({ t }) => {
  const [coinForm, setCoinForm] = useState<string>('')
  const [coinTo, setCoinTo] = useState<string>('')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const coinList = useAppSelector(coinListSelector)
  const [fakeLoading, setFakeLoading] = useState<boolean>(false)
  const getCoin = useCallback(async () => {
    const coinForm = await AsyncStorage.getItem('coinFrom')
    const coinTo = await AsyncStorage.getItem('coinTo')
    setCoinForm(coinForm || 'BTC')
    setCoinTo(coinTo || 'ETH')
  }, [])
  useEffect(() => {
    getCoin()
  }, [])
  const loadMoreData = async () => {
    if (!loading && hasMore) {
      setLoading(true);
      let response;
      try {
        response = await getHistorySwapApi({
          limit: '5',
          page: page,
          symbolForm: coinForm.trim(),
          symbolTo: coinTo.trim(),
        });
      } catch (error) {
      }
      if (Array.isArray(response?.data?.array)) {
        const newData = response.data.array;
        const isDuplicate = newData.some((item: any) => data.some((item2: any) => item.id === item2.id));
        if (!isDuplicate) {
          setData(prevData => [...prevData, ...newData]);
        }
        if (newData.length === 0) {
          setHasMore(false);
        }
      } else {
      }
      setPage(page + 1);
      setLoading(false);
    }
  };
  useEffect(() => {
    setFakeLoading(true)
    let fakeLoad = setTimeout(() => {
      loadMoreData()
      setFakeLoading(false)
    }, 1000)
    return () => {
      setData([])
      setPage(1)
      setHasMore(true)
      clearTimeout(fakeLoad)
    }
  }, [coinForm, coinTo])

  if (fakeLoading) {
    return (
      <LottieView
        source={require('@lottie/loading.json')}
        autoPlay
        loop
        style={{
          width: '100%',
          height: hp('50%'),
          alignSelf: 'center',
        }}
      />
    )
  }
  if (data.length === 0) {
    return (
      <LottieView
        source={require('@lottie/searchNodata.json')}
        autoPlay
        loop
        style={{
          width: '100%',
          height: hp('50%'),
          alignSelf: 'center',
        }}
      />
    )
  }
  return (
    <Box marginBottom={hp('5%')} marginTop={hp('3%')}>
      <FlatList
        style={{
          marginBottom: hp('38%')
        }}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item, index }) => {
          const wallet = coinList.find((coin) => coin.name === item.wallet)
          const coin_key = coinList.find((coin) => coin.name === item.coin_key)
          return (
            <View key={index} style={{ marginBottom: 20 }}>
              <View style={{
                backgroundColor: 'black',
                padding: 7,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Icon
                  size={16}
                  tintColor={'white'}
                  source={require('@images/setting/calendar.png')}
                  marginRight={10} />
                <Txt fontFamily={fonts.LR}
                  size={16}
                  color={'white'}
                  bold>{item?.created_at}</Txt>
              </View>
              <View style={{
                backgroundColor: colors.gray5,
                padding: 7,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignContent: 'center'
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Txt
                      fontFamily={fonts.LR}
                      size={16}
                      color={'black'}
                      bold>{item?.coin_key}: </Txt>
                    <Txt
                      fontFamily={fonts.LR}
                      size={16}
                      color={'red'}
                      bold
                    > -{item?.amount}</Txt>
                    <Icon
                      marginLeft={5}
                      size={15}
                      source={{ uri: `${keys.HOSTING_API}${coin_key?.image}` }} />
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 15
                  }}>
                    <Txt
                      fontFamily={fonts.LR}
                      size={16}
                      color={'black'}
                      bold
                    >{item?.wallet}: </Txt>
                    <Txt
                      fontFamily={fonts.LR}
                      size={16}
                      color={'green'}
                      bold> +{item?.wallet_amount}</Txt>
                    <Icon
                      marginLeft={5}
                      size={15}
                      source={{ uri: `${keys.HOSTING_API}${wallet?.image}` }} />
                  </View>
                </View>
                <View style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  marginTop: 10,
                  alignItems: 'center',
                  marginBottom: 10
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <Txt
                      fontFamily={fonts.LR}
                      size={16}
                      color={'black'}
                      bold> Rate {item?.wallet}: </Txt>
                    <Txt
                      fontFamily={fonts.LR}
                      size={16}
                      color={'black'}
                      bold
                    >{item?.rate.toLocaleString()}</Txt>
                  </View>
                </View>
              </View>
            </View>
          )
        }}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() => loading && hasMore && <ActivityIndicator size="large" color={colors.blue} />}
      />
    </Box>
  )
}

export default YourPrice
