import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import { BOTTOM_TAB_HEIGHT } from '@utils/responsive'

interface Props {
    bg?: string,
    styles?: any,
    paddingBottom?: number,
    paddingHorizontal?: number,
    children: JSX.Element | JSX.Element[],
}

const KeyBoardSafe = ({
    bg,
    styles,
    children,
    paddingBottom,
    paddingHorizontal,
}: Props) => {
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'android' ? -1000 : 0}
            behavior='padding'
            enabled
            style={[{
                flex: 1,
                backgroundColor: bg,
            }, styles]}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Box
                    flex={1}
                    // isPaddingAdnroid
                    paddingTop={Platform.OS === 'android' ? 10 : 0}
                >
                    <Scroll
                        flexGrow={1}
                        paddingBottom={paddingBottom || BOTTOM_TAB_HEIGHT / 2}
                        paddingHorizontal={paddingHorizontal}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    >
                        {children}
                    </Scroll>
                </Box>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default KeyBoardSafe