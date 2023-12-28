import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from './AxiosInstance'
import { setListCoinRealtime } from '@redux/slice/coinSlice'
import { AppDispatch } from '@redux/store/store';
import { socketConnectedSelector } from '@redux/selector/userSelector';
import { useSelector } from 'react-redux';
import { setConnected } from '@redux/slice/coinSlice';
export const useCoinSocket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const socketConnected = useSelector(socketConnectedSelector);
  // useEffect(() => {
  //   socket.connect();
  //   socket.on("listCoin", (resp) => {
  //     dispatch(setListCoinRealtime(resp));
  //     console.log("socket on");
  //   });
  //   return () => {
  //     console.log("socket off");
  //     socket.off("listCoin");
  //     socket.disconnect();
  //   }
  // }, [dispatch]);
  useEffect(() => {
    if (!socketConnected) {
      socket.connect();
      dispatch(setConnected(true));
    }

    socket.on("listCoin", (resp) => {
      dispatch(setListCoinRealtime(resp));
      console.log("socket on");
    });

    return () => {
      console.log("socket off");
      socket.off("listCoin");
      // Không disconnect ở đây nữa
    }
  }, [dispatch, socketConnected]);
}
