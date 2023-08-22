import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('screen');

//iPhone 12
const DESIGN_WIDTH: number = 390;
const DESIGN_HEIGHT: number = 844;

const WIDTH: number = width > height ? height : width;
const HEIGHT: number = width > height ? width : height;

const scale = (size: number): number => {
    return (WIDTH / DESIGN_WIDTH) * size;
};

const verticalScale = (size: number): number => {
    return (HEIGHT / DESIGN_HEIGHT) * size;
};

const moderateScale = (size: number, factor: number = 0.5): number => {
    return size + (scale(size) - size) * factor;
};

/**
 * getSize.m(10) Responsive for padding - margin - fontSize.
 *
 * getSize.s(10) Responsive by width screen. (Image Size)
 *
 * getSize.v(10) Responsive by height screen.
 **/

export const getSize = {
    m: moderateScale,
    s: scale,
    v: verticalScale,
};
