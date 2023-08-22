import { getSize } from '@utils/responsive';
import { isNumber } from 'lodash';
import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { handleMargin, handlePadding, handleRound, handleSquare } from '../shared';
import styles from '@commom/Box/styles';
import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Img from '@commom/Img';

const Input = ({
    value,
    onChangeText,
    hint,
    hintColor = '#6666',
    security,
    font,
    fontSize,
    iconOne,
    iconTwo,
    onPress,
    onFocus,
    onBlur,
    color = 'black',
    textAlign = 'left',
    keyboardType = 'default',
    autoCapitalize = 'none',
    disabled = true,
    flex,
    flexShrink,
    flexGrow,
    row,
    column,
    shadow,
    backgroundColor,
    space,
    padding,
    margin,
    alignStart,
    alignCenter,
    alignEnd,
    wrap,
    justifyCenter,
    justifyEnd,
    justifyStart,
    justifySpaceAround,
    justifySpaceBetween,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    paddingVertical,
    paddingHorizontal,
    marginVertical,
    marginHorizontal,
    radius,
    height,
    width,
    square,
    round,
    borderWidth,
    relative,
    absolute,
    top,
    left,
    right,
    bottom,
    borderColor,
    children,
    overflow,
    alignSelf,
    style,
    shadowColor,
    opacity,
    elevation,
    maxWidth,
    maxHeight,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    isPaddingIos,
    isPaddingAdnroid,
    zIndex,
    borderTopLeftRadius,
    borderTopRightRadius,
    ...rest
}: Props) => {
    const insets = useSafeAreaInsets();

    const blockStyles = [
        isPaddingAdnroid && { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
        isPaddingIos && {
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : getSize.m(20),
        },
        { color: color },
        flex && styles.block,
        flexShrink && styles.flexShrink,
        flexGrow && styles.flexGrow,
        !flex && { flex: 0 },
        maxWidth && { maxWidth },
        maxHeight && { maxHeight },
        width && { width: width },
        height && { height: height },
        font && { fontFamily: font },
        fontSize && { fontSize: fontSize },
        row && styles.row,
        column && styles.column,
        shadow && {
            ...styles.shadow,
            shadowColor: shadowColor,
            elevation: elevation || 3,
        },
        wrap && { flexWrap: 'wrap' },
        backgroundColor && {
            backgroundColor: backgroundColor,
        },
        padding && { ...handlePadding(getSize.m(padding)) },
        margin && { ...handleMargin(getSize.m(margin)) },
        alignStart && styles.alignStart,
        alignCenter && styles.alignCenter,
        alignEnd && styles.alignEnd,
        justifyCenter && styles.justifyCenter,
        justifyStart && styles.justifyStart,
        justifyEnd && styles.justifyEnd,
        justifySpaceAround && styles.justifySpaceAround,
        justifySpaceBetween && styles.justifySpaceBetween,
        space && { justifyContent: `space-${space}` },
        paddingTop && { paddingTop: getSize.m(paddingTop) },
        paddingRight && { paddingRight: getSize.m(paddingRight) },
        paddingBottom && { paddingBottom: getSize.m(paddingBottom) },
        paddingLeft && { paddingLeft: getSize.m(paddingLeft) },
        marginBottom && { marginBottom: getSize.m(marginBottom) },
        // marginTop && { marginTop: getSize.m(marginTop) },
        marginRight && { marginRight: getSize.m(marginRight) },
        marginLeft && { marginLeft: getSize.m(marginLeft) },
        paddingHorizontal && { paddingHorizontal: getSize.m(paddingHorizontal) },
        paddingVertical && { paddingVertical: getSize.m(paddingVertical) },
        marginHorizontal && { marginHorizontal: getSize.m(marginHorizontal) },
        marginVertical && { marginVertical: getSize.m(marginVertical) },
        radius && { borderRadius: getSize.s(radius) },
        borderWidth && { borderWidth: borderWidth },
        square && { ...handleSquare(getSize.s(square)) },
        round && { ...handleRound(getSize.s(round)) },
        isNumber(opacity) && { opacity: opacity },
        borderColor && {
            borderColor: borderColor,
        },
        relative && { position: 'relative' },
        absolute && { position: 'absolute' },
        isNumber(top) && { top: getSize.v(top) },
        isNumber(left) && { left: getSize.s(left) },
        isNumber(right) && { right: getSize.s(right) },
        isNumber(bottom) && { bottom: getSize.v(bottom) },
        overflow && { overflow },
        alignSelf && { alignSelf },
        borderTopWidth && { borderTopWidth },
        borderRightWidth && { borderRightWidth },
        borderBottomWidth && { borderBottomWidth },
        borderLeftWidth && { borderLeftWidth },
        zIndex && { zIndex },
        borderTopLeftRadius && { borderTopLeftRadius },
        borderTopRightRadius && { borderTopRightRadius },
        { ...StyleSheet.flatten(style) },
    ];

    return (
        <Box width={width} height={height} marginBottom={marginBottom} marginTop={marginTop}>
            {iconOne &&
                <Box height={'100%'} justifyCenter absolute left={12}>
                    <Image
                        source={iconOne}
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                </Box>
            }
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={hint}
                placeholderTextColor={hintColor}
                style={blockStyles} {...rest}
                secureTextEntry={security ? true : false}
                keyboardType={keyboardType}
                editable={disabled}
                autoCapitalize={autoCapitalize}
                textAlign={textAlign}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {iconTwo &&
                <Btn
                    absolute
                    onPress={onPress}
                    height={'100%'}
                    right={12}
                >
                    <Img source={iconTwo}
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                </Btn>
            }
        </Box>
    );
};

export default Input;

interface Props {
    value?: any,
    onChangeText?: any,
    hint?: any,
    font?: any,
    selectionColor?: any,
    fontSize?: any,
    hintColor?: any,
    security?: any,
    iconOne?: any,
    iconTwo?: any,
    onPress?: any,
    onFocus?: any,
    onBlur?: any,
    color?: any,
    textAlign?: any,
    keyboardType?: any,
    autoCapitalize?: any,
    disabled?: any,
    flex?: any,
    flexShrink?: any,
    flexGrow?: any,
    row?: any,
    column?: any,
    shadow?: any,
    backgroundColor?: any,
    space?: any,
    padding?: any,
    margin?: any,
    alignStart?: any,
    alignCenter?: any,
    alignEnd?: any,
    wrap?: any,
    justifyCenter?: any,
    justifyEnd?: any,
    justifyStart?: any,
    justifySpaceAround?: any,
    justifySpaceBetween?: any,
    paddingTop?: any,
    paddingBottom?: any,
    paddingLeft?: any,
    paddingRight?: any,
    marginBottom?: any,
    marginLeft?: any,
    marginRight?: any,
    marginTop?: any,
    paddingVertical?: any,
    paddingHorizontal?: any,
    marginVertical?: any,
    marginHorizontal?: any,
    radius?: any,
    height?: any,
    width?: any,
    square?: any,
    round?: any,
    borderWidth?: any,
    relative?: any,
    absolute?: any,
    top?: any,
    left?: any,
    right?: any,
    bottom?: any,
    borderColor?: any,
    children?: any,
    overflow?: any,
    alignSelf?: any,
    style?: any,
    shadowColor?: any,
    opacity?: any,
    elevation?: any,
    maxWidth?: any,
    maxHeight?: any,
    borderTopWidth?: any,
    borderRightWidth?: any,
    borderBottomWidth?: any,
    borderLeftWidth?: any,
    isPaddingIos?: any,
    isPaddingAdnroid?: any,
    zIndex?: any,
    borderTopLeftRadius?: any,
    borderTopRightRadius?: any,
}


