import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {icons, IMAGES} from '../assets/Images';
import {commonFontStyle, fontFamily, SCREEN_WIDTH} from '../theme/fonts';
import {colors} from '../theme/colors';
import Header from '../compoment/Header';
import GreenTickSvg from '../assets/svg/GreenTickSvg.svg';
import GreyTickSvg from '../assets/svg/GreyTickSvg.svg';
import RedCrossSvg from '../assets/svg/RedCrossSvg.svg';
import CgSvg from '../assets/svg/CgSvg.svg';
type Props = {};

const QuestionBank = ({navigation}) => {
  const data = [
    {
      id: 1,
      text: 'ChemGusser 1',
      icon: CgSvg,
      tick: GreenTickSvg,
      today: '',
    },
    {
      id: 2,
      text: 'ChemGusser 2',
      icon: CgSvg,
      tick: GreyTickSvg,
      today: '',
    },
    {
      id: 3,
      text: 'ChemGusser 3',
      icon: CgSvg,
      tick: RedCrossSvg,
      today: '',
    },
    {
      id: 4,
      text: 'ChemGusser 4',
      icon: CgSvg,
      today: 'Current Day',
    },
    {
      id: 5,
      text: 'ChemGusser 5',
      icon: CgSvg,
      opacity: true,
      today: '',
    },
  ];

  return (
    <ImageBackground
      source={IMAGES.OnboardingBg}
      style={styles.imageBackground}>
      <SafeAreaView />
      <Header
        isBack={true}
        onPressBack={() => navigation.pop(2)}
        title="Question Bank"
      />
      <View style={styles.container}>
        {data.map(item => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeScreen')}
              key={item.id}
              style={[styles.itemContainer, {opacity: item.opacity ? 0.5 : 1}]}>
              <View style={styles.itemContent}>
                <item.icon />
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemText}>{item.text}</Text>
                  <Text style={styles.itemToday}>{item.today}</Text>
                </View>
              </View>
              {item.tick && <item.tick />}
            </TouchableOpacity>
          );
        })}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    gap: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: colors.white,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 50,
    height: 50,
  },
  itemTextContainer: {
    marginLeft: 10,
  },
  itemText: {
    ...commonFontStyle(fontFamily.poppinsMedium, 15, colors.black0E),
    lineHeight: 21,
  },
  itemToday: {
    ...commonFontStyle(fontFamily.poppinsBold, 13, colors.gold),
    lineHeight: 21,
  },
});

export default QuestionBank;
