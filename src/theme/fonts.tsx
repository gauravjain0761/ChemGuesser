import {RFValue} from 'react-native-responsive-fontsize';

export const fontFamily = {
  poppinsMedium: 'Poppins-Medium',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsBold: 'Poppins-Bold',
  poppinsRegular: 'Poppins-Regular',
  poppinsLight: 'Poppins-Light',
  PJSRegular: 'PlusJakartaSans-Regular',
  PJSSB: 'PlusJakartaSans-SemiBold',
  PJSB: 'PlusJakartaSans-Bold',
};

export const fontSizeValue = (val: number) => RFValue(val, 812);
export const commonFontStyle = (fontWeight: any, fontSize: any, color: any) => {
  return {
    fontFamily: fontWeight,
    fontSize: actuatedNormalize(fontSize - 2),
    color: color,
    includeFontPadding: false,
  };
};

import {Dimensions, Platform, PixelRatio} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

export const hp = (i: any) => {
  return heightPercentageToDP(i);
};

export const wp = (i: any) => {
  return widthPercentageToDP(i);
};
const scale = SCREEN_WIDTH / 320;

export function actuatedNormalize(size: any) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
