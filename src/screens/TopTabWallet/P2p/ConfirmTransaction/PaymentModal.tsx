import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Btn from '@commom/Btn';
import { colors } from '@themes/colors';
import Icon from '@commom/Icon';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastAndroid, Platform, Alert } from 'react-native';

interface PaymentModalProps {
    visible: boolean;
    hideModal: () => void;
    selectedBankName: string;
    selectedBankNumber: string;
    selectedBankOwner: string;
    content: string;
    side?: string;
    amount?: number;
    pay: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ visible, hideModal, selectedBankName, selectedBankNumber, selectedBankOwner, content, side, amount, pay }) => {
    const notifyMessage = (text: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
        } else {
            Alert.alert(`Copied ${text} to clipboard`);
        }
    }
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, width: '90%', alignSelf: 'center', borderRadius: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Payment info</Text>
                <Text style={{ marginBottom: 5 }}>You are {side} {amount} through Sereso.</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 10 }}>Please make the payment for the correct amount, content, and account number below</Text>

                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }} />
                <View style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={{ marginBottom: 5 }}>Tên ngân hàng: </Text>
                            <Text style={{ marginBottom: 5, color: colors.blue, fontWeight: 'bold' }}>{selectedBankName}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                const bankName = selectedBankName;
                                Clipboard.setString(bankName);
                                notifyMessage(bankName);
                            }}>
                            <Icon source={require('../../../.././assets/images/setting/copy.png')}
                                size={20}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={{ marginBottom: 5 }}>Số tài khoản: </Text>
                            <Text style={{ marginBottom: 5, color: colors.green, fontWeight: 'bold' }}>{selectedBankNumber}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                const bankNumber = selectedBankNumber;
                                Clipboard.setString(bankNumber);
                                notifyMessage(bankNumber);
                            }}>
                            <Icon source={require('../../../.././assets/images/setting/copy.png')}
                                size={20}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={{ marginBottom: 5 }}>Chủ tài khoản: </Text>
                            <Text style={{ marginBottom: 5, color: colors.red, fontWeight: 'bold' }}>{selectedBankOwner}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                const bankOwner = selectedBankOwner;
                                Clipboard.setString(bankOwner);
                                notifyMessage(bankOwner);
                            }}>
                            <Icon source={require('../../../.././assets/images/setting/copy.png')}
                                size={20}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={{ marginBottom: 5 }}>Nội dung chuyển khoản: </Text>
                            <Text style={{ marginBottom: 5, color: colors.green, fontWeight: 'bold' }}>{content}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                const text = content;
                                Clipboard.setString(text);
                                notifyMessage(text);
                            }}>
                            <Icon source={require('../../../.././assets/images/setting/copy.png')}
                                size={20}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={{ marginBottom: 5 }}>Với số tiền </Text>
                            <Text style={{ marginBottom: 5, color: colors.green, fontWeight: 'bold' }}>{pay.toLocaleString()}đ</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                const value = pay;
                                Clipboard.setString(value.toString());
                                notifyMessage(value.toLocaleString());
                            }}>
                            <Icon source={require('../../../.././assets/images/setting/copy.png')}
                                size={20}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }} />

                <Btn
                    alignSelf={'flex-end'}
                    onPress={hideModal}
                    backgroundColor={colors.darkGreen}
                    padding={7}
                    radius={3}
                >
                    <Text style={{ fontWeight: 'bold', color: colors.gray8 }}>Close</Text>
                </Btn>
            </Modal>
        </Portal>
    );
}

export default PaymentModal;