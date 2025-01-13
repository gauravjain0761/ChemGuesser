import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {icons, IMAGES} from '../../assets/Images';
import {commonFontStyle, fontFamily} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import SplashScreen from 'react-native-splash-screen';

type Props = {};

const SplashScreen1 = (props: Props) => {
  // return (
  //   <ImageBackground source={IMAGES.OnboardingBg} style={{flex: 1}}>
  //     <Image source={IMAGES.Decoration} />
  //     <View style={{top: '-10%'}}>
  //       <Image
  //         source={icons.AppIcon}
  //         style={{
  //           width: 100,
  //           height: 100,
  //           alignSelf: 'center',
  //           borderColor: colors.white,
  //         }}
  //         // tintColor={colors.white}
  //       />

  //       <Text style={styles.Name}>ChemGuess</Text>
  //     </View>
  //   </ImageBackground>
  // );
  return (
    <ImageBackground source={IMAGES.splash} style={{flex: 1}}>
      {/* <Image source={IMAGES.Decoration} />
      <View style={{top: '-10%'}}>
        <Image
          source={icons.AppIcon}
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
            borderColor: colors.white,
          }}
          // tintColor={colors.white}
        />

        <Text style={styles.Name}>ChemGuess</Text>
      </View> */}
    </ImageBackground>
  );
};

export default SplashScreen1;

const styles = StyleSheet.create({
  Name: {
    ...commonFontStyle(fontFamily.poppinsSemiBold, 48, colors.white),
    alignSelf: 'center',
  },
});
