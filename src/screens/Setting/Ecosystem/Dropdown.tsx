import React, { useState, useEffect, FC } from 'react';
import { View, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Bank {
    id: number;
    name: string;
    shortName: string;
    logo: string;
}

const containerStyle: StyleProp<ViewStyle> = { height: 40, width: '90%' };
const dropdownStyle: StyleProp<ViewStyle> = { backgroundColor: '#fafafa' };
const imageStyle: StyleProp<ImageStyle> = { width: 100, height: 50 };

interface Props {
    onChange: (value: string) => void;
}

const Dropdown: FC<Props> = ({ onChange }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState([]);
    const { t } = useTranslation();

    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem('@selected_bank', value)
        } catch (e) {
            // saving error
            console.error(e);
        }
    }

    useEffect(() => {
        fetch('https://api.vietqr.io/v2/banks')
            .then((response) => response.json())
            .then((json) => {
                if (json && json.data) {
                    const formattedData = json.data.map((item: Bank) => ({
                        label: item.shortName,
                        value: item.shortName,
                        icon: () => <Image source={{ uri: item.logo }} style={imageStyle} resizeMode='contain' />,
                    }));
                    setItems(formattedData);
                }
            })
            .catch((error) => {
                // Handle error appropriately
                console.error(error);
            });
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {items.length > 0 && (
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems as Dispatch<SetStateAction<any[]>>}
                    containerStyle={containerStyle}
                    style={dropdownStyle}
                    placeholder={t('Choose your bank')}
                    onChangeValue={(value: any) => {
                        onChange(value);
                        storeData(value);
                    }}
                />
            )}
        </View>
    );
};

export default Dropdown;