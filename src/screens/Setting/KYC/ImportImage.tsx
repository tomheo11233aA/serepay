import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@themes/colors'
import Btn from '@commom/Btn'
import { useTranslation } from 'react-i18next'
import * as ImagePicker from 'react-native-image-picker'
import { set } from 'lodash'

interface Props {
    title?: string
}

const ImportImage:React.FC<Props> = ({title}) => {
    const { t } = useTranslation()
    const [selectedName, setSelectedName] = React.useState<string | null>(null)
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
                            if (response.didCancel) {
                                console.log('User cancelled image picker');
                            } else if (response.errorCode) {
                                console.log('ImagePicker Error: ', response.errorMessage);
                            } else {
                                const source = { uri: 'data:image/jpeg;base64,' + (response?.assets?.[0]?.base64 ?? '') };
                                setSelectedName(response?.assets?.[0]?.fileName ?? 'khong co anh')
                            }
                        },
                    );
                }}>
                <Txt>
                    {t('Choose file')}
                </Txt>
            </Btn>
            {selectedName && <Txt> {selectedName} </Txt>}
        </Box>
    )
}

export default ImportImage

const styles = StyleSheet.create({})