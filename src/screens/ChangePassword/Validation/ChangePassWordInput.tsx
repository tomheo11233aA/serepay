import React, { forwardRef } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { colors } from '@themes/colors';
import { fonts } from '@themes/fonts';
import Box from '@commom/Box';
import Icon from 'react-native-vector-icons/Entypo';
import Btn from '@commom/Btn';

interface ChangePasswordProps {
    placeholder: string;
    onChangeText: (value: any) => void;
    maxLength?: number;
    value?: string;
    height?: number;
    returnKeyType?: any;
    onSubmitEditing?: any;
    keyboardType?: any;
    iconOne?: any;
    sizeIcon?: number;
    tintColor?: string;
    security?: boolean;
    iconTwo?: any;
}

const ChangePasswordInput = forwardRef<TextInput, ChangePasswordProps>(({
    placeholder,
    onChangeText,
    maxLength,
    value,
    height,
    returnKeyType = 'done',
    onSubmitEditing,
    keyboardType = 'default',
    iconOne,
    sizeIcon = 25,
    tintColor,
    security,
    iconTwo,
}, ref) => {
    const [isSecure, setIsSecure] = React.useState(security);
    const handleIconPress = () => {
        setIsSecure(!isSecure);
    };
    return (
        <View style={styles.inputContainer}>
            {iconOne &&
                <Box
                    alignCenter
                    justifyCenter
                >
                    <Icon
                        name={iconOne}
                        size={sizeIcon}
                        color={tintColor}
                    />
                </Box>
            }
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={colors.gray2}
                onChangeText={onChangeText}
                maxLength={maxLength}
                value={value}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                ref={ref}
                keyboardType={keyboardType}
                style={[styles.input, { height: height || 45 }]}
                secureTextEntry={isSecure}
                autoCapitalize='none'
            />
            {iconTwo &&
                <Btn
                    onPress={handleIconPress}
                    padding={5}
                >
                    <Icon
                        name={isSecure ? 'eye' : 'eye-with-line'}
                        size={sizeIcon}
                        color={tintColor}
                    />
                </Btn>
            }
        </View>
    );
});

export default React.memo(ChangePasswordInput);

const styles = StyleSheet.create({
    inputContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        zIndex: -1,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 5,
        paddingHorizontal: 10,
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
