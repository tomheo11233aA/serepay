import React from 'react';
import { Controller } from 'react-hook-form';
import Input from '@commom/Input'
import Box from '@commom/Box'
import { colors } from '@themes/colors'
import Txt from '@commom/Txt';
import { fonts } from '@themes/fonts';

interface InputFieldProps {
    control: any;
    name: string;
    placeholder: string;
    errors: any;
    icon?: any;
}

const InputField: React.FC<InputFieldProps> = ({ control, name, placeholder, errors, icon }) => (
    <Box 
    paddingVertical={10}
    >
        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <Input
                    onBlur={onBlur}
                    value={value}
                    hint={placeholder}
                    onChangeText={(value: string) => onChange(value)}
                    radius={5}
                    height={45}
                    width={'100%'}
                    borderWidth={1}
                    tintColor={colors.gray2}
                    borderColor={colors.gray}
                    iconOne={icon}
                />
            )}
            name={name}
            defaultValue=""
        />
        {/* {errors[name] && <Text>{errors[name].message}</Text>} */}
        {errors[name] && <Txt fontFamily={fonts.AS} color={colors.red}>{errors[name].message}</Txt>}

    </Box>
);

export default InputField;