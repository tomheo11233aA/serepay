// FooterButtons.tsx
import React from 'react';
import { View, Text } from 'react-native';
import Btn from '@commom/Btn';
import { colors } from '@themes/colors';

interface FooterButtonsProps {
    typeUser: number;
    userid: number;
    loginUserid: number;
}

const FooterButtons: React.FC<FooterButtonsProps> = ({ typeUser, userid, loginUserid }) => {
    if (typeUser === 2) {
        if (userid === loginUserid) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Btn backgroundColor={colors.darkGreen} radius={3} padding={8} onPress={() => { /* handle confirm payment */ }}>
                        <Text style={{ color: 'white' }}>Xác nhận đã chuyển tiền</Text>
                    </Btn>
                    <Btn backgroundColor={colors.red} padding={8} radius={3} marginLeft={10} onPress={() => { /* handle cancel order */ }}>
                        <Text style={{ color: 'white' }}>Hủy lệnh</Text>
                    </Btn>
                </View>
            );
        } else {
            return (
                <Btn backgroundColor={colors.darkGreen} radius={3} padding={8} disabled>
                    <Text style={{ color: 'white' }}>Đang chờ đối phương chuyển tiền</Text>
                </Btn>
            );
        }
    } else if (typeUser === 1) {
        if (userid === loginUserid) {
            return (
                <Btn backgroundColor={colors.darkGreen} radius={3} padding={8} disabled>
                    <Text style={{ color: 'white' }}>Đang chờ đối phương xác nhận</Text>
                </Btn>
            );
        } else {
            return (
                <View>
                    <Btn backgroundColor={colors.darkGreen} radius={3} padding={8} onPress={() => { /* handle confirm received money */ }}>
                        <Text style={{ color: 'white' }}>Đã nhận được tiền</Text>
                    </Btn>
                    <Btn backgroundColor={colors.red} padding={8} radius={3} marginLeft={10} onPress={() => { /* handle not received money */ }}>
                        <Text style={{ color: 'white'}}>Chưa nhận được tiền</Text>
                    </Btn>
                </View>
            );
        }
    }
    return null;
}

export default FooterButtons;