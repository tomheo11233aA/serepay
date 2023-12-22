import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import Btn from '@commom/Btn'
import { useTranslation } from 'react-i18next'
import * as ImagePicker from 'react-native-image-picker'

interface Props {
    title?: string
}

const ImportImage:React.FC<Props> = ({title}) => {
    const { t } = useTranslation()
    return (
        <Box marginHorizontal={20} marginBottom={15}>
            <Txt color={colors.black2}>
                {t(title ?? '')}
            </Txt>
            <Btn
                borderWidth={0.5}
                width={'25%'}
                backgroundColor={colors.gray}
                padding={3}
                radius={3}
                onPress={() => {
                    ImagePicker.launchImageLibrary(
                        {
                            mediaType: 'photo',
                            includeBase64: false,
                            maxHeight: 200,
                            maxWidth: 200,
                        },
                        (response) => {
                            console.log('Response = ', response);
                            if (response.didCancel) {
                                console.log('User cancelled image picker');
                            } else if (response.errorCode) {
                                console.log('ImagePicker Error: ', response.errorMessage);
                            } else {
                                // const source = { uri: response?.assets[0]?.uri ?? ''};
                                // console.log("tomheo", source)
                            }
                        },
                    );
                }}>
                <Txt>
                    {t('Choose file')}
                </Txt>
            </Btn>
        </Box>
    )
}

export default ImportImage

const styles = StyleSheet.create({})