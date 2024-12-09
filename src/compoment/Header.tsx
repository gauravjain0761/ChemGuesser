import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';
import {icons} from '../assets/Images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {commonFontStyle, fontFamily} from '../theme/fonts';

type Props = {
  title: string;
  onPressModal: () => void;
};

const Header = (props: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity>
        <Image source={icons.hamburger} />
      </TouchableOpacity>
      <Text
        style={{
          ...commonFontStyle(fontFamily.poppinsSemiBold, 24, colors.white),
        }}>
        {props.title}
      </Text>
      <TouchableOpacity onPress={props.onPressModal}>
        <Image source={icons.share} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
