import React, { useState, useEffect, FC } from 'react';
import { View, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    onLogoChange?: (value: string) => void;
    myContainerStyle?: StyleProp<ViewStyle>;
    isStoreData?: boolean;
}

const Dropdown: FC<Props> = ({ onChange, onLogoChange, myContainerStyle, isStoreData }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState<any>([]);
    const { t } = useTranslation();
    const bank = useAppSelector(bankSelector);

    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem('@selected_bank', value)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (bank) {
            const formattedData = bank.map((item: Bank) => ({
                label: item.shortName,
                value: item.shortName,
                icon: () => <Image source={{ uri: item.logo }} style={imageStyle} resizeMode='contain' />,
                logo: item.logo,
            }));
            setItems(formattedData);
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
                        if (isStoreData && value) {
                            storeData(value);
                        }
                        const selectedItem = items.find((item: any) => item.value === value);
                        if (selectedItem && onLogoChange) {
                            onLogoChange(selectedItem.logo);
                        }
                    }}
                    labelStyle={{
                        fontWeight: 'bold',
                        fontFamily: fonts.JR,
                    }}
                    dropDownContainerStyle={{ backgroundColor: '#fafafa' }}
                    listMode='SCROLLVIEW'
                    zIndex={1}
                />
            )}
        </View>
    );
};

export default React.memo(Dropdown);