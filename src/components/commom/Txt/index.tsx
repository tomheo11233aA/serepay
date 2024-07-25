import {getSize} from '@utils/responsive';
import {isNumber} from 'lodash';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {handleMargin, handlePadding} from '../shared';

const Txt = ({
  onPressIn,
  onPressOut,
  onPress,
  numberOfLines,
  flex,
  flexShrink,
  flexGrow,
  size = 14,
  color = 'black',
  center,
  right,
  left,
  italic,
  justify,
  opacity,
  line,
  backgroundColor,
  width,
  padding,
  margin,
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
  style,
  fontType = 'normal',
  bold,
  lineHeight,
  animated,
  customFont = 'default',
  textDecorationLine,
  children,
  alignSelf,
  relative,
  absolute,
  fontFamily,
  maxWidth,
  ...textProps
}: Props) => {
  const textStyle = [
    alignSelf && {alignSelf},
    flex && {flex: 1},
    flexShrink && {flexShrink: 1},
    flexGrow && {flexGrow: 1},
    fontType && {fontWeight: fontType || 'normal'},
    bold && {fontWeight: 'bold'},
    {color: color},
    center && {textAlign: 'center'},
    right && {textAlign: 'right'},
    left && {textAlign: 'left'},
    justify && {textAlign: 'justify'},
    line && {textDecorationLine: 'underline'},
    padding && {...handlePadding(getSize.m(padding))},
    margin && {...handleMargin(getSize.m(margin))},
    backgroundColor && {backgroundColor},
    width && {width},
    opacity && {opacity},
    fontFamily && {fontFamily: fontFamily},
    relative && {position: 'relative'},
    absolute && {position: 'absolute'},
    italic && {fontStyle: 'italic'},
    paddingTop && {paddingTop: getSize.m(paddingTop)},
    paddingRight && {paddingRight: getSize.m(paddingRight)},
    paddingBottom && {paddingBottom: getSize.m(paddingBottom)},
    paddingLeft && {paddingLeft: getSize.m(paddingLeft)},
    marginBottom && {marginBottom: getSize.m(marginBottom)},
    marginTop && {marginTop: getSize.m(marginTop)},
    marginRight && {marginRight: getSize.m(marginRight)},
    marginLeft && {marginLeft: getSize.m(marginLeft)},
    paddingHorizontal && {paddingHorizontal: getSize.m(paddingHorizontal)},
    paddingVertical && {paddingVertical: getSize.m(paddingVertical)},
    marginHorizontal && {marginHorizontal: getSize.m(marginHorizontal)},
    marginVertical && {marginVertical: getSize.m(marginVertical)},
    isNumber(lineHeight) && {lineHeight: getSize.m(lineHeight)},
    {fontSize: getSize.m(size)},
    textDecorationLine && {textDecorationLine},
    maxWidth && {maxWidth: getSize.m(maxWidth)},
    {...StyleSheet.flatten(style)},
  ];

  return (
    <Text
      {...textProps}
      style={textStyle}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default React.memo(Txt);

interface Props {
  onPressIn?: any;
  onPressOut?: any;
  maxWidth?: any;
  onPress?: any;
  numberOfLines?: any;
  flex?: any;
  flexShrink?: any;
  flexGrow?: any;
  size?: any;
  color?: any;
  center?: any;
  line?: any;
  right?: any;
  left?: any;
  justify?: any;
  opacity?: any;
  backgroundColor?: any;
  width?: any;
  italic?: any;
  padding?: any;
  margin?: any;
  paddingTop?: any;
  paddingBottom?: any;
  paddingLeft?: any;
  paddingRight?: any;
  marginBottom?: any;
  marginLeft?: any;
  marginRight?: any;
  marginTop?: any;
  paddingVertical?: any;
  paddingHorizontal?: any;
  marginVertical?: any;
  marginHorizontal?: any;
  style?: any;
  fontType?: any;
  bold?: any;
  lineHeight?: any;
  animated?: any;
  customFont?: any;
  textDecorationLine?: any;
  children?: any;
  alignSelf?: any;
  relative?: any;
  absolute?: any;
  fontFamily?: any;
}
