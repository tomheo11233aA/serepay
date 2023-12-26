import React from 'react';
import { Text, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Btn from '@commom/Btn';
import { colors } from '@themes/colors';

interface PaymentModalProps {
    visible: boolean;
    hideModal: () => void;
    selectedBankName: string;
    selectedBankNumber: string;
    selectedBankOwner: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ visible, hideModal, selectedBankName, selectedBankNumber, selectedBankOwner }) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, width: '90%', alignSelf: 'center', borderRadius: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Payment info</Text>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }} />
                <View style={{ paddingVertical: 15 }}>
                    <Text style={{ marginBottom: 5 }}>Tên ngân hàng: {selectedBankName}</Text>
                    <Text style={{ marginBottom: 5 }}>Số tài khoản: {selectedBankNumber}</Text>
                    <Text style={{ marginBottom: 5 }}>Chủ tài khoản: {selectedBankOwner}</Text>
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