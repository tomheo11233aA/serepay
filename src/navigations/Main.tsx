import NetInfo from "@react-native-community/netinfo";
import { useAppSelector } from '@hooks/redux'
import { isLoginUserSelector } from '@redux/selector/userSelector'
import React, { useEffect } from 'react'
import AuthNavigation from './AuthNavigation'
import UnAuthNavigation from './UnAuthNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setLogin } from '@redux/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@redux/store/store'
import { userInfoUserSelector } from '@redux/selector/userSelector'
import { socket } from '../helper/AxiosInstance'
import LottieView from "lottie-react-native";
import Btn from "@commom/Btn";
import Txt from "@commom/Txt";
import { fonts } from "@themes/fonts";
import { colors } from "@themes/colors";

const Main = () => {
    const isLogin = useAppSelector(isLoginUserSelector)
    const userInfo = useSelector(userInfoUserSelector)
    const dispatch: AppDispatch = useDispatch()
    const [isConnected, setIsConnected] = React.useState(true);

    useEffect(() => {
        const fetchIsLogin = async () => {
            const isLogin = await AsyncStorage.getItem('isLogin')
            dispatch(setLogin(isLogin == 'true' ? true : false))
        }
        fetchIsLogin()
    }, [])

    useEffect(() => {
        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected ?? false);
        });

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (userInfo && userInfo.id) {
            socket.emit('join', userInfo.id);
            socket.on("ok", (res) => {
                console.log(res, "ok");
            });
            return () => {
                socket.off("ok");
            }
        } else {
            socket.off("ok");
        }
    }, [userInfo]);

    return (
        <>
            {isConnected ? (isLogin ? <AuthNavigation /> : <UnAuthNavigation />) :
                <>
                    <LottieView
                        source={require('../assets/lottie/nointernet.json')}
                        autoPlay
                        loop
                        style={{ width: '100%', height: '80%' }}
                    />
                    <Txt style={{ alignSelf: 'center' }} center paddingHorizontal={20} fontFamily={fonts.AS} size={16} bold marginVertical={15} width={'80%'}>
                        {isConnected ? 'Connecting...' : 'Please connect internet and try again'}
                    </Txt>
                    <Btn
                        radius={5}
                        height={45}
                        marginTop={20}
                        backgroundColor={colors.darkViolet}
                        alignSelf={'center'}
                        width={'90%'}
                        onPress={() => {
                            setTimeout(() => {
                                NetInfo.fetch().then(state => {
                                    setIsConnected(state.isConnected ?? false);
                                });
                            }, 1000);
                        }}
                    >
                        <Txt color={'white'} bold>
                            Retry
                        </Txt>
                    </Btn>
                </>
            }
        </>
    )
}

export default Main