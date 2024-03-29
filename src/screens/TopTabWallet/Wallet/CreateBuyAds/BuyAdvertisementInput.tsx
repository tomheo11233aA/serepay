import React, { forwardRef } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { colors } from '@themes/colors';
import { fonts } from '@themes/fonts';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';

interface WalletBTCProps {
    placeholder: string;
    onChangeText: (value: any) => void;
    maxLength?: number;
    value?: string;
    coin?: any;
    onPress?: () => void;
    height?: number;
    returnKeyType?: any;
    onSubmitEditing?: any;
    keyboardType?: any;
}

const BuyAdvertisementInput = forwardRef<TextInput, WalletBTCProps>(({
    placeholder,
    onChangeText,
    maxLength,
    value,
    coin,
    onPress,
    height,
    returnKeyType = 'done',
    onSubmitEditing,
    keyboardType = 'default'
}, ref) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, { height: height || 45 }]}
                placeholder={placeholder}
                placeholderTextColor={colors.gray2}
                onChangeText={onChangeText}
                maxLength={maxLength}
                value={value}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                ref={ref}
                keyboardType={keyboardType}
            />
            {coin &&
                <Btn onPress={onPress}>
                    <Txt
                        center
                        justify={'center'}
                        alignSelf={'center'}
                    >
                        {coin}
                    </Txt>
                </Btn>
            }
        </View>
    );
});

export default React.memo(BuyAdvertisementInput);

const styles = StyleSheet.create({
    inputContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        paddingHorizontal: 10,
        marginTop: 10,
        zIndex: -1,
    },
    input: {
        flex: 1,
        height: 45,
        paddingLeft: 10,
        color: 'black',
        fontFamily: fonts.LR,
        fontSize: 16,
    },
});
