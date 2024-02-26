import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Btn from '@commom/Btn';
import { colors } from '@themes/colors';
import Icon from '@commom/Icon';
import Clipboard from '@react-native-clipboard/clipboard';
import { ToastAndroid, Platform, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import Txt from '@commom/Txt';
import { fonts } from '@themes/fonts';
import Img from '@commom/Img';
import { ActivityIndicator } from 'react-native';

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
    acqId?: string | null;
}

const generateQR = async (accountNo: number, accountName: string, amount: number, addInfo: string, acqId: string) => {
    const response = await fetch('https://api.vietqr.io/v2/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accountNo: accountNo,
            accountName: accountName,
            acqId: acqId,
            amount: amount,
            addInfo: addInfo,
            format: 'text',
            template: 'compact'
        })
    });
    const data = await response.json();
    return data;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ visible, hideModal, selectedBankName, selectedBankNumber, selectedBankOwner, content, side, amount, pay, acqId }) => {
    const { t } = useTranslation();
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            setIsLoading(true);
            const fetchData = async () => {
                const roundPay = Math.round(pay);
                const clearSpaceOfSelectedBankNumber = selectedBankNumber.replace(/\s/g, '');
                const qrData = await generateQR(Number(clearSpaceOfSelectedBankNumber), selectedBankOwner, roundPay, content, acqId || '970436');
                setQrDataUrl(qrData.data.qrDataURL);
                setIsLoading(false);
            }
            fetchData();
        }
    }, [visible]);

    const notifyMessage = (Txt: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
        } else {
            Alert.alert(`Copied ${Txt} to clipboard`);
        }
    }
    const [bankNameSuccess, setBankNameSuccess] = React.useState(false);
    const [bankNumberSuccess, setBankNumberSuccess] = React.useState(false);
    const [bankOwnerSuccess, setBankOwnerSuccess] = React.useState(false);
    const [contentSuccess, setContentSuccess] = React.useState(false);
    const [paySuccess, setPaySuccess] = React.useState(false);
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, width: '90%', alignSelf: 'center', borderRadius: 10 }}>
                <Txt
                    fontFamily={fonts.OSB}
                    style={{
                        fontSize: 16,
                        marginBottom: 10
                    }}>
                    {t('Payment info')}
                </Txt>
                <Txt
                    fontFamily={fonts.LR}
                    size={14}
                    style={{
                        marginBottom: 5,
                        height: 20
                    }}>
                    {t('You are')} {side} {amount} {t('through Serepay.')
                    }</Txt>

                <Txt
                    fontFamily={fonts.OSB}
                    style={{
                        fontSize: 14,
                        marginBottom: 10
                    }}>
                    {t('Please make the payment for the correct amount, content, and account number below')}
                </Txt>

                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }} />
                <View style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Txt
                                fontFamily={fonts.OSB}
                                style={{ marginBottom: 5 }}
                            >
                                {t('Bank name: ')}
                            </Txt>
                            <Txt style={{ marginBottom: 5, color: colors.blue, fontWeight: 'bold' }}>{selectedBankName}</Txt>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                const bankName = selectedBankName;
                                Clipboard.setString(bankName);
                                notifyMessage(bankName);
                                setBankNameSuccess(true);
                            }}>
                            <Icon size={20} style={{ marginLeft: 10 }}
                                source={bankNameSuccess ? require('@images/unAuth/check.png')
                                    : require('@images/setting/copy.png')} />

                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Txt
                                fontFamily={fonts.OSB}
                                style={{ marginBottom: 5 }}
                            >
                                {t('Account number: ')}
                            </Txt>
                            <Txt style={{ marginBottom: 5, color: colors.green2, fontWeight: 'bold' }}>{selectedBankNumber}</Txt>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                const bankNumber = selectedBankNumber;
                                Clipboard.setString(bankNumber);
                                notifyMessage(bankNumber);
                                setBankNumberSuccess(true);
                            }}>
                            <Icon size={20} style={{ marginLeft: 10 }}
                                source={bankNumberSuccess ? require('@images/unAuth/check.png')
                                    : require('@images/setting/copy.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Txt
                                fontFamily={fonts.OSB}
                                style={{ marginBottom: 5 }}
                            >
                                {t('Account owner: ')}
                            </Txt>
                            <Txt style={{ marginBottom: 5, color: colors.red, fontWeight: 'bold' }}>{selectedBankOwner}</Txt>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                const bankOwner = selectedBankOwner;
                                Clipboard.setString(bankOwner);
                                notifyMessage(bankOwner);
                                setBankOwnerSuccess(true);
                            }}>
                            <Icon size={20} style={{ marginLeft: 10 }}
                                source={bankOwnerSuccess ? require('@images/unAuth/check.png')
                                    : require('@images/setting/copy.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Txt fontFamily={fonts.OSB} style={{ marginBottom: 5 }}>{t('Transfer content: ')}</Txt>
                            <Txt fontFamily={fonts.OSB} style={{ marginBottom: 5, color: colors.green2, fontWeight: 'bold' }}>{content}</Txt>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                const Txt = content;
                                Clipboard.setString(Txt);
                                notifyMessage(Txt);
                                setContentSuccess(true);
                            }}>
                            <Icon size={20} style={{ marginLeft: 10 }}
                                source={contentSuccess ? require('@images/unAuth/check.png')
                                    : require('@images/setting/copy.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Txt fontFamily={fonts.OSB} style={{ marginBottom: 5 }}>{t('With amount: ')}</Txt>
                            <Txt style={{ marginBottom: 5, color: colors.green2, fontWeight: 'bold' }}>₫{Math.round(pay).toLocaleString('en-US')}</Txt>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                const value = pay;
                                Clipboard.setString(value.toString());
                                notifyMessage(value.toLocaleString());
                                setPaySuccess(true);
                            }}>
                            <Icon size={20} style={{ marginLeft: 10 }}
                                source={paySuccess ? require('@images/unAuth/check.png')
                                    : require('@images/setting/copy.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }} />
                <Txt
                    fontFamily={fonts.OSB}
                    style={{
                        fontSize: 14,
                        marginBottom: 10
                    }}>
                    {t('Or scan the QR code below to make the payment')}
                </Txt>
                {/* <View style={{ alignItems: 'center' }}>
                    {qrDataUrl !== '' && <Img source={{ uri: qrDataUrl }} style={{ width: 150, height: 150 }} />}
                </View> */}
                <View style={{ alignItems: 'center' }}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" /> // Hiển thị spinner khi đang tải
                    ) : (
                        qrDataUrl !== '' && <Img source={{ uri: qrDataUrl }} style={{ width: 150, height: 150 }} />
                    )}
                </View>

                <Btn
                    alignSelf={'flex-end'}
                    onPress={hideModal}
                    backgroundColor={colors.darkGreen}
                    padding={7}
                    radius={3}
                >
                    <Txt style={{ fontWeight: 'bold', color: colors.gray8 }}>Close</Txt>
                </Btn>
            </Modal>
        </Portal>
    );
}

export default PaymentModal;