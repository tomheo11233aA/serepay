import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from './AxiosInstance'
import { setListCoinRealtime } from '@redux/slice/coinSlice'
import { AppDispatch } from '@redux/store/store';

export const useCoinSocket = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.connect();
    socket.on("listCoin", (resp) => {
      dispatch(setListCoinRealtime(resp));
    });

    return () => {
      socket.off("listCoin");
      socket.disconnect();
    }
  }, [dispatch]);
}