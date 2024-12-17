import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {icons, IMAGES} from '../../assets/Images';
import {commonFontStyle, fontFamily} from '../../theme/fonts';
import {colors} from '../../theme/colors';

type Props = {};

const SplashScreen = (props: Props) => {
  return (
    <ImageBackground source={IMAGES.OnboardingBg} style={{flex: 1}}>
      <Image source={IMAGES.Decoration} />
      <View style={{top: '-10%'}}>
        <Image
          source={icons.SplashIcon}
          style={{
            width: 120,
            height: 120,
            alignSelf: 'center',
            borderColor: colors.white,
          }}
          // tintColor={colors.white}
        />

        <Text style={styles.Name}>ChemGuess</Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  Name: {
    ...commonFontStyle(fontFamily.poppinsSemiBold, 46, colors.white),
    alignSelf: 'center',
  },
});
