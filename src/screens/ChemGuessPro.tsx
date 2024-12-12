import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {icons, IMAGES} from '../assets/Images';
import {commonFontStyle, fontFamily, SCREEN_WIDTH} from '../theme/fonts';
import {colors} from '../theme/colors';
import Header from '../compoment/Header';
import PopularSvg from '../assets/svg/popular.svg';
import Ticksvg from '../assets/svg/Tick.svg';
import FixedGradientButton from '../compoment/CustomButton';

type Props = {};

const ChemGuessPro = ({navigation}) => {
  const features = [
    {id: 1, text: 'Access to all advanced features'},
    {id: 2, text: 'Access to all questions'},
    {id: 3, text: 'Life time validity'},
  ];

  return (
    <ImageBackground
      source={IMAGES.OnboardingBg}
      style={styles.imageBackground}>
      <Header
        isBack={true}
        onPressBack={() => navigation.pop(2)}
        title="ChemGuessPro"
      />
      <View style={styles.container}>
        <View style={styles.subscribeContainer}>
          <Text style={styles.subscribeText}>OUR SUBSCRIBE</Text>
        </View>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Subscribe for solutions</Text>
          <Text style={styles.description}>
            {
              '3 Days free trial. No credit card required,\n start for enjoy our benefits'
            }
          </Text>
        </View>
        <View style={styles.proPlanCard}>
          <View style={styles.popularSvgContainer}>
            <PopularSvg width={'100%'} />
          </View>
          <View style={styles.planContent}>
            <Text style={styles.planTitle}>Pro Plan</Text>
            <Text style={styles.planDescription}>Access all questions...</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>£3</Text>
              <Text style={styles.priceDuration}>Life time</Text>
            </View>
            <View style={styles.featuresContainer}>
              {features.map(item => {
                return (
                  <View key={item.id} style={styles.featureItem}>
                    <Ticksvg width={24} height={24} />
                    <Text style={styles.featureText}>{item.text}</Text>
                  </View>
                );
              })}
            </View>
            <FixedGradientButton
              title="Pay Now"
              style={styles.payNowButton}
              onPress={() => null}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  imageBackground: {
    flex: 1,
  },
  subscribeContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.white,
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  subscribeText: {
    ...commonFontStyle(fontFamily.poppinsRegular, 12, colors.white),
    lineHeight: 18,
  },
  centerContent: {
    gap: 12,
    alignItems: 'center',
  },
  title: {
    ...commonFontStyle(fontFamily.PJSSB, 24, colors.white),
    lineHeight: 30.34,
  },
  description: {
    textAlign: 'center',
    ...commonFontStyle(fontFamily.PJSRegular, 14, colors.white),
    lineHeight: 24,
  },
  proPlanCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    alignSelf: 'center',
    width: '90%',
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 16,
  },
  popularSvgContainer: {
    marginTop: -1,
    width: '100%',
  },
  planContent: {
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    paddingTop: 16,
  },
  planTitle: {
    ...commonFontStyle(fontFamily.PJSB, 20, colors.black28),
  },
  planDescription: {
    ...commonFontStyle(fontFamily.poppinsRegular, 14, colors.black42),
    lineHeight: 24,
  },
  priceContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  price: {
    ...commonFontStyle(fontFamily.poppinsBold, 32, colors.black),
  },
  priceDuration: {
    ...commonFontStyle(fontFamily.poppinsRegular, 20, colors.black51),
    bottom: 6,
  },
  featuresContainer: {
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    gap: 8,
  },
  featureText: {
    ...commonFontStyle(fontFamily.poppinsRegular, 14, colors.black28),
  },
  payNowButton: {
    height: 48,
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.8,
    marginTop: 40,
  },
});

export default ChemGuessPro;
