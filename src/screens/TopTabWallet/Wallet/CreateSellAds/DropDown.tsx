import React, { useState, useEffect, FC } from 'react';
import { View, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { fonts } from '@themes/fonts';
import { useAppSelector } from '@hooks/redux';
import { bankSelector } from '@redux/selector/userSelector';

interface Bank {
    id: number;
    name: string;
    shortName: string;
    logo: string;
}

const containerStyle: StyleProp<ViewStyle> = { width: '90%' };
const dropdownStyle: StyleProp<ViewStyle> = { backgroundColor: '#fafafa' };
const imageStyle: StyleProp<ImageStyle> = { width: 100, height: 50 };

interface Props {
    onChange: (value: string) => void;
    myContainerStyle?: StyleProp<ViewStyle>;
}

const Dropdown: FC<Props> = ({ onChange, myContainerStyle }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState<any>([]);
    const { t } = useTranslation();
    const bank = useAppSelector(bankSelector);

    useEffect(() => {
        if (bank) {
            const formattedData = bank.map((item: Bank) => ({
                label: item.shortName,
                value: item.shortName,
                icon: () => <Image source={{ uri: item.logo }} style={imageStyle} resizeMode='contain' />,
                logo: item.logo,
            }));
            setItems(formattedData);
            if (formattedData.length > 0) {
                setValue(formattedData[1].value);
            }
        }
    }, []);

    return (
        <View style={{ alignItems: 'center' }}>
            {items.length > 0 && (
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems as Dispatch<SetStateAction<any[]>>}
                    containerStyle={[containerStyle, myContainerStyle]}
                    style={dropdownStyle}
                    placeholder={t('Choose your bank')}
                    onChangeValue={(value: any) => {
                        onChange(value);
                    }}
                    labelStyle={{
                        fontWeight: 'bold',
                        fontFamily: fonts.JR,
                    }}
                    dropDownContainerStyle={{ backgroundColor: '#fafafa', borderWidth: 1, borderColor: 'black' }}
                    zIndex={1}
                    listMode='SCROLLVIEW'
                    searchable={true}
                    searchTextInputProps={{ maxLength: 15 }}
                    searchContainerStyle={{ borderBottomWidth: 0 }}
                    searchPlaceholder='Search your bank'
                    searchPlaceholderTextColor='black'
                    searchTextInputStyle={{ fontFamily: fonts.JR }}
                />
            )}
        </View>
    );
};

export default React.memo(Dropdown);