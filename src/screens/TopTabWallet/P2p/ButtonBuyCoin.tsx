import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import { colors } from '@themes/colors';
import { useTranslation } from 'react-i18next';

interface Props {
    typeUser: number;
    userId: number;
    loggedInUserId: number;
    typeP2P: number;
}

const ButtonBuyCoin: React.FC<Props> = ({ typeUser, userId, loggedInUserId, typeP2P }) => {
    const { t } = useTranslation();
    if (typeUser === 2) {
        if (userId === loggedInUserId) {
            return (
                <View>

                    <Btn
                        radius={5}
                        alignSelf={'center'}
                        paddingVertical={7}
                        paddingHorizontal={25}
                        backgroundColor={colors.green}
                        maxWidth={150}
                    >
                        <Txt color={'white'}>
                            {/* {'Xác nhận đã chuyển tiền'} */}
                            {t('Confirm transfer money')}
                        </Txt>
                    </Btn>
                    <Btn
                        radius={5}
                        alignSelf={'center'}
                        paddingVertical={7}
                        paddingHorizontal={25}
                        backgroundColor={colors.green}
                        top={10}
                        maxWidth={150}
                    >
                        <Txt>
                            {/* {'Hủy lệnh'} */}
                            {t('Cancel order')}
                        </Txt>
                    </Btn>
                </View>
            );
        } else {
            return (
                <Btn
                    radius={5}
                    alignSelf={'center'}
                    paddingVertical={7}
                    paddingHorizontal={25}
                    maxWidth={150}
                    backgroundColor={colors.green}
                    disabled>
                    <Txt>
                        {/* {'Đang chờ đối phương chuyển tiền'} */}
                        {t('Waiting transfer money')}
                    </Txt>
                </Btn>
            );
        }
    } else if (typeUser === 1) {
        if (userId === loggedInUserId) {
            return (
                <Btn
                    radius={5}
                    alignSelf={'center'}
                    paddingVertical={7}
                    paddingHorizontal={25}
                    backgroundColor={colors.green}
                    maxWidth={150}>
                    <Txt color={'white'}>
                        {/* {'Đang chờ đối phương xác nhận'} */}
                        {t('Waiting confirm')}
                    </Txt>
                </Btn>
            );
        } else {
            return (
                <View>
                    <Btn
                        radius={5}
                        alignSelf={'center'}
                        paddingVertical={7}
                        paddingHorizontal={25}
                        backgroundColor={colors.green}
                        maxWidth={150}>
                        <Txt color={'white'}>
                            {/* {'Đã nhận được tiền'} */}
                            {t('Received money')}
                        </Txt>
                    </Btn>
                    <Btn
                        radius={5}
                        alignSelf={'center'}
                        paddingVertical={7}
                        paddingHorizontal={25}
                        top={10}
                        backgroundColor={colors.green}
                        maxWidth={150}>
                        <Txt color={'white'}>
                            {/* {'Chưa nhận được tiền'} */}
                            {t('Not received money')}
                        </Txt>
                    </Btn>
                </View>
            );
        }
    } else if (typeP2P === 3) {
        if (typeUser === 3) {
            return (
                <Btn
                    radius={5}
                    alignSelf={'center'}
                    paddingVertical={7}
                    paddingHorizontal={25}
                    backgroundColor={colors.green}
                    maxWidth={150}>
                    <Txt color={'white'}>
                        {/* {'Người giao dịch hủy lệnh'} */}
                        {t('User cancel')}
                    </Txt>
                </Btn>
            );
        } else {
            return (
                <Btn
                    radius={5}
                    alignSelf={'center'}
                    paddingVertical={7}
                    paddingHorizontal={25}
                    backgroundColor={colors.green}
                    maxWidth={150}>
                    <Txt color={'white'}>
                        {/* {'Người quảng cáo báo chưa nhận được tiền'} */}
                        {t('Advertiser report not received money')}
                    </Txt>
                </Btn>
            );
        }
    } else if (typeP2P === 2) {
        return (
            <Btn
                radius={5}
                alignSelf={'center'}
                paddingVertical={7}
                paddingHorizontal={25}
                backgroundColor={colors.green}
                maxWidth={150}>
                <Txt color={'white'}>
                    {/* {'Xem chi tiết lệnh'} */}
                    {t('View order details')}
                </Txt>
            </Btn>
        );
    } else if (typeP2P === 1) {
        return (
            <Btn
                radius={5}
                alignSelf={'center'}
                paddingVertical={7}
                paddingHorizontal={25}
                backgroundColor={colors.green}
                maxWidth={150}>
                <Txt color={'white'}>
                    {/* {'Giao dịch thành công'} */}
                    {t('Transaction successful')}
                </Txt>
            </Btn>
        );
    }

    return null;
}

export default React.memo(ButtonBuyCoin)

const styles = StyleSheet.create({})