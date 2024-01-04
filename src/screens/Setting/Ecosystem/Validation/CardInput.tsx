import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import { colors } from '@themes/colors';
import { fonts } from '@themes/fonts';

interface CardInputProps {
    placeholder: string;
    onChangeText: (value: string) => void;
    icon?: any;
    maxLength?: number;
    value?: string;
}

const CardInput: React.FC<CardInputProps> = ({
    placeholder,
    onChangeText,
    icon,
    maxLength,
    value,
}) => {
    return (
        <View style={styles.inputContainer}>
            {icon && <Image source={icon} style={styles.iconStyle} />}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={colors.gray2}
                onChangeText={onChangeText}
                maxLength={maxLength}
                value={value}
            />
        </View>
    );
};

export default CardInput;

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
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
        color: 'black',
        fontFamily: fonts.AS,
        fontSize: 14,
    },
});
