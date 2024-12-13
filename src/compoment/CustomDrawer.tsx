import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {commonFontStyle, fontFamily, hp, wp} from '../theme/fonts';
import {colors} from '../theme/colors';
import {icons, IMAGES} from '../assets/Images';
import Header from './Header';
import HelpSvg from '../assets/svg/HelpSvg.svg';
import StatisticsSvg from '../assets/svg/StatisticsSvg.svg';
import GuessSvg from '../assets/svg/GuessSvg.svg';
import QuestionSvg from '../assets/svg/QuestionSvg.svg';
import SettingsSvg from '../assets/svg/SettingsSvg.svg';
import ProSvg from '../assets/svg/ProSvg.svg';

const CustomDrawer = ({navigation}) => {
  // const navigation = useNavigation();

  const items = [
    {id: 1, name: 'Help', icon: HelpSvg, navigateTo: 'HomeScreen'},
    {
      id: 2,
      name: 'Statistics',
      icon: StatisticsSvg,
      navigateTo: 'Statistics',
    },
    {id: 3, name: 'Previous Guesses', icon: GuessSvg, navigateTo: ''},
    {
      id: 4,
      name: 'Question Bank',
      icon: QuestionSvg,
      navigateTo: 'QuestionBank',
    },
    {id: 5, name: 'ChemGuess Pro', icon: ProSvg, navigateTo: 'ChemGuessPro'},
    {id: 6, name: 'Settings', icon: SettingsSvg, navigateTo: 'Settings'},
  ];

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ImageBackground
        source={IMAGES.OnboardingBg}
        style={{flex: 1, paddingHorizontal: 10}}>
        <Header
          title="ChemGuess"
          isHome={false}
          onPressCross={() => navigation.dispatch(DrawerActions.closeDrawer())}
        />
        <View style={{flex: 1, paddingHorizontal: 10, gap: 36}}>
          {items.map(item => {
            return (
              <TouchableOpacity
                onPress={() =>
                  item.navigateTo == ''
                    ? null
                    : item.navigateTo == 'HomeScreen'
                    ? navigation.navigate(item.navigateTo, {
                        tooltipVisible: Math.random() * 100,
                      })
                    : navigation.navigate(item.navigateTo)
                }
                style={{flexDirection: 'row', alignItems: 'center', gap: 18}}>
                <item.icon />
                <Text
                  style={{
                    ...commonFontStyle(
                      fontFamily.poppinsMedium,
                      14,
                      colors.white,
                    ),
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    width: '100%',
  },
  image_container: {
    paddingLeft: wp(20),
    paddingBottom: hp(20),
    borderBottomWidth: hp(1),
    borderColor: colors.inputBorder,
    marginTop: hp(30),
  },
  img: {
    width: wp(74),
    height: wp(74),
  },
  img_conatiner: {
    borderWidth: 2,
    borderColor: colors.inputBorder,
    width: wp(83),
    height: wp(82),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(12),
    overflow: 'hidden',
  },
  user_title: {
    ...commonFontStyle(fontFamily.poppinsBold, 16, colors.black),
    marginTop: hp(10),
  },
  account_container: {
    marginHorizontal: wp(20),
    marginTop: hp(16),
  },
  account_title: {
    ...commonFontStyle(fontFamily.poppinsBold, 16, colors.black),
  },
  drawerTab_conatiner: {},
  Tab_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: hp(20),
    paddingVertical: hp(20),
  },
  tab_img_constiner: {
    flexDirection: 'row',
    gap: wp(15),
    alignItems: 'center',
  },
  tab_title: {
    ...commonFontStyle(fontFamily.poppinsMedium, 14, colors.black),
  },
  drawer_border: {
    borderBottomWidth: 1,
    borderColor: colors.inputBorder,
  },
  connect_us: {
    width: wp(127),
    height: hp(48),
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  connect_btn: {
    alignSelf: 'flex-start',
    marginBottom: hp(30),
    paddingLeft: wp(20),
  },
  tab_img: {
    width: wp(20),
    height: wp(20),
  },
});
