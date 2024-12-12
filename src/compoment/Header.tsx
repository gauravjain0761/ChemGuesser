import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import {icons} from '../assets/Images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {commonFontStyle, fontFamily} from '../theme/fonts';
import BackSvg from '../assets/svg/BackSvg.svg';
import CrossSvg from '../assets/svg/CrossSvg.svg';
import HamburgerSvg from '../assets/svg/HamburgerSvg.svg';
import Share from '../assets/svg/Share.svg';

type Props = {
  title: string;
  onPressModal: () => void;
  onPressBurger: () => void;
  onPressCross: () => void;
  onPressBack: () => void;
  isHome: boolean;
  isBack: boolean;
};

const Header = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      {props.isHome || props.isBack == false ? (
        <TouchableOpacity onPress={props.onPressBurger}>
          <HamburgerSvg />
        </TouchableOpacity>
      ) : props.isBack ? (
        <TouchableOpacity onPress={props.onPressBack}>
          <BackSvg />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={props.onPressCross}>
          <CrossSvg />
        </TouchableOpacity>
      )}

      <Text
        style={{
          ...commonFontStyle(fontFamily.poppinsSemiBold, 24, colors.white),
        }}>
        {props.title}
      </Text>

      <TouchableOpacity onPress={props.onPressModal}>
        {props.isHome && <Share />}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
