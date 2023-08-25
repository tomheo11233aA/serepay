import Box from '@commom/Box'
import React from 'react'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
    width?: any;
    flex?: number;
    backgroundColor?: string;
    children: JSX.Element | JSX.Element[];
}

const Safe = ({
    flex,
    children,
    width = '100%',
    backgroundColor,
}: Props) => {
    return (
        <SafeAreaView
            style={{
                flex: flex,
                width: width,
                backgroundColor,
            }}
        >
            <Box
                flex={flex}
                // isPaddingAdnroid
                paddingTop={Platform.OS === 'android' ? 10 : 0}
            >
                {children}
            </Box>
        </SafeAreaView>
    )
}

export default Safe