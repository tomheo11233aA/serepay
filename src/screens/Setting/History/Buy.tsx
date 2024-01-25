import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { getListHistoryP2pWhere } from '@utils/userCallApi';
import { colors } from '@themes/colors';
import TransactionItem from './TransactionItem';
import LottieView from 'lottie-react-native';
import { socket } from '../../../helper/AxiosInstance';
import { setCount } from '@redux/slice/notificationSlice';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { AppDispatch } from '@redux/store/store';
import { notificationSelector } from '@redux/selector/userSelector';

const BuyHistory = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dispatch: AppDispatch = useAppDispatch();
  const notification = useAppSelector(notificationSelector);

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    setPage(1);
    const loadAgain = async () => {
      if (!loading && hasMore) {
        setLoading(true);
        const response = await
          getListHistoryP2pWhere({
            page: 1,
            limit: 10,
            where: "side='buy'"
          });
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
      loadMoreData();
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

  const loadMoreData = async () => {
    if (!loading && hasMore) {
      setLoading(true);
      const response = await getListHistoryP2pWhere({
        limit: 10,
        page,
        where: "side='buy'"
      });
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
  };

  if (data.length === 0) {
    return (
      <LottieView
        source={require('../../../assets/lottie/nodataanimation.json')}
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
      ListFooterComponent={() => loading && hasMore && <ActivityIndicator size="large" color={colors.blue} />}
      renderItem={({ item }) => <TransactionItem item={item} />}
    />
  );
};

export default React.memo(BuyHistory);