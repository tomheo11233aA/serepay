import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getListHistoryP2p } from '@utils/userCallApi';
import { colors } from '@themes/colors';
import TransactionItem from './TransactionItem';
import LottieView from 'lottie-react-native';
import { socket } from '../../../helper/AxiosInstance';
import { setCount } from '@redux/slice/notificationSlice';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { AppDispatch } from '@redux/store/store';
import { notificationSelector } from '@redux/selector/userSelector';
import { useNavigation } from '@react-navigation/native';
export interface Transaction {
  id: number;
  userid: number;
  userName: string;
  email: string;
  useridAds: number;
  userNameAds: string;
  emailAds: string;
  amount: number;
  symbol: string;
  typeP2p: number;
  created_at: string;
  idP2p: number;
  numberBank: string;
  ownerAccount: string;
  bankName: string;
  rate: number;
  typeUser: number;
  side: string;
  code: string;
  pay: number;
}

const AllHistory = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dispatch: AppDispatch = useAppDispatch();
  const notification = useAppSelector(notificationSelector);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setData([]);
      setPage(1);
      setHasMore(true);
      loadMoreData();
      setLoading(false);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    setPage(1);
    const loadAgain = async () => {
      if (!loading && hasMore) {
        setLoading(true);
        const response = await getListHistoryP2p({ page: 1, limit: 10 });
        if (Array.isArray(response?.data?.array)) {
          setData(response.data.array);
          if (response.data.array.length === 0) {
            setHasMore(false);
          }
        } else {
          console.error('response.data.array is not an array:', response?.data?.array);
        }
        setLoading(false);
      }
    }
    socket.on("createP2p", (res) => {
      dispatch(setCount(notification + 1));
      setData([]);
      loadAgain();
      setPage(2)
    });
    socket.on("operationP2p", (idP2p) => {
      dispatch(setCount(notification - 1));
      setData([]);
      loadAgain();
      setPage(2)
    });
    return () => {
      socket.off("createP2p");
      socket.off("operationP2p");
    }
  }, [socket, notification]);



  const loadMoreData = useCallback(async () => {
    if (!loading && hasMore) {
      setLoading(true);
      const response = await getListHistoryP2p({ page, limit: 10 });
      if (Array.isArray(response?.data?.array)) {
        setData(prevData => [...prevData, ...response.data.array]);
        if (response.data.array.length === 0) {
          setHasMore(false);
        }
      } else {
        console.error('response.data.array is not an array:', response?.data?.array);
      }
      setPage(page + 1);
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  const ListFooterComponent = useMemo(() => {
    return () => loading && hasMore && <ActivityIndicator size="large" color={colors.blue} />;
  }, [loading, hasMore]);

  if (data.length === 0) {
    return (
      <LottieView
        source={require('@lottie/nodataanimation.json')}
        autoPlay
        loop
        style={{ alignSelf: 'center', width: 200, height: 200, marginTop: 200 }}
      />
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 15, marginBottom: 240 }}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
      ListFooterComponent={ListFooterComponent}
      renderItem={({ item }) => <TransactionItem item={item} />}
    />
  );
};

export default React.memo(AllHistory);