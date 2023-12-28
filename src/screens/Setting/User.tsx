import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import React , {useEffect} from 'react'
import { TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo } from '@redux/slice/userSlice'
import { userInfoUserSelector } from '@redux/selector/userSelector'
import { AppDispatch } from '@redux/store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
interface Props {
    t: any;
}
const User = ({ t }: Props) => {
    const dispatch : AppDispatch = useDispatch()
    const userInfo = useSelector(userInfoUserSelector)
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch]);
    AsyncStorage.setItem('verified', userInfo?.verified?.toString() || '')
    AsyncStorage.setItem('isTwoFA', userInfo?.enabled_twofa?.toString() || '')
    console.log("userInfo", userInfo?.verified)
    
    return (
        <TouchableOpacity
            onPress={() => { }}
        >
            <Box
                row
                radius={3}
                alignCenter
                marginVertical={10}
                justifySpaceBetween
                paddingHorizontal={5}
                backgroundColor={'white'}
            >
                <Box
                    row
                    alignCenter
                    padding={10}
                >
                    <Icon
                        size={25}
                        marginRight={10}
                        source={require('@images/unAuth/user.png')}
                    />
                    <Txt size={16}>
                        {t('HELLO')} {userInfo?.username}
                    </Txt>
                </Box>
                <Box rotateZ={'180deg'} marginRight={10}>
                    <Icon
                        size={25}
                        tintColor={colors.gray2}
                        source={require('@images/unAuth/left.png')}
                    />
                </Box>
            </Box>
        </TouchableOpacity>
    )
}

export default User