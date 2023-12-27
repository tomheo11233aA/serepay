import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import { colors } from '@themes/colors';
import { fonts } from '@themes/fonts';

interface CustomTextInputProps {
    placeholder: string;
    onChangeText: (value: string) => void;
    icon?: any;
}

const CustomInput: React.FC<CustomTextInputProps> = ({
    placeholder,
    onChangeText,
    icon,
}) => {
    return (
        <View style={styles.inputContainer}>
            {icon && <Image source={icon} style={styles.iconStyle} />}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={colors.gray2}
                onChangeText={onChangeText}
            />
        </View>
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.gray,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    iconStyle: {
        position: 'absolute',
        width: 20,
        height: 20,
        left: 15,
    },
    input: {
        flex: 1,
        height: 45,
        paddingLeft: 40,
        color: colors.gray2,
        fontFamily: fonts.AS,
        fontSize: 14,
    },
});
