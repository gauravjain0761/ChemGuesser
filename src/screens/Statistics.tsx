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
import {useNavigation} from '@react-navigation/native';
import StreakSvg from '../assets/svg/StreakSvg.svg';
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from 'react-native-gifted-charts';
type Props = {};

const Statistics = ({navigation}) => {
  const barData = [
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
    {value: 5, label: '5'},
  ];

  return (
    <ImageBackground
      source={IMAGES.OnboardingBg}
      style={styles.imageBackground}>
      <Header
        isBack={true}
        onPressBack={() => navigation.pop(2)}
        title="Statistics"
      />
      <Text style={styles.statisticsTitle}>Statistics of points</Text>
      <View style={styles.statsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.pointsStatsTitle}>Points Stats</Text>
          <View style={styles.streakContainer}>
            <Text style={styles.streakLabel}>Streak</Text>
            <View style={styles.streakValueContainer}>
              <Text style={styles.streakValue}>5</Text>
              <View style={styles.streakImage}>
                <StreakSvg />
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.frequencyText}>Frequency</Text>
        <BarChart
          data={barData}
          backgroundColor={colors.white}
          barBorderTopLeftRadius={10}
          barBorderTopRightRadius={10}
          barWidth={21}
          noOfSections={5}
          yAxisThickness={0}
          xAxisThickness={1}
          xAxisColor={'#2D2D2D33'}
          rulesType="solid"
          showGradient
          gradientColor={'#7C6BE1'}
          frontColor={colors.purpleGradientText}
          spacing={40}
          maxValue={5}
          initialSpacing={0}
          endSpacing={0}
          width={SCREEN_WIDTH * 0.74}
          rulesColor={'#2D2D2D0D'}
          xAxisLabelTextStyle={{
            ...commonFontStyle(fontFamily.poppinsLight, 10, colors.black2d),
          }}
          yAxisTextStyle={{
            ...commonFontStyle(fontFamily.poppinsLight, 10, colors.black2d),
          }}
        />
        <View style={styles.pointsContainer}>
          <View style={styles.purpleContainer}></View>
          <Text style={styles.pointsText}>Points</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  statisticsTitle: {
    ...commonFontStyle(fontFamily.poppinsSemiBold, 18, colors.white),
    paddingLeft: 20,
    marginBottom: 30,
  },
  statsContainer: {
    backgroundColor: colors.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsStatsTitle: {
    ...commonFontStyle(fontFamily.poppinsBold, 15, colors.purpleGradientText),
    lineHeight: 22.5,
    left: '40%',
  },
  streakContainer: {
    gap: 4,
  },
  streakLabel: {
    ...commonFontStyle(
      fontFamily.poppinsRegular,
      14,
      colors.purpleGradientText,
    ),
  },
  streakValueContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 4,
  },
  streakValue: {
    ...commonFontStyle(fontFamily.poppinsBold, 16, colors.black),
    lineHeight: 16,
  },
  frequencyText: {
    position: 'absolute',
    top: '50%',
    transform: [{rotate: '270deg'}],
    left: -10,
    ...commonFontStyle(fontFamily.poppinsLight, 10, colors.black2d),
  },
  pointsText: {
    ...commonFontStyle(fontFamily.poppinsLight, 10, colors.black2d),
  },
  purpleContainer: {
    width: 16,
    height: 8,
    backgroundColor: colors.purpleGradientText,
    borderRadius: 10,
  },
  pointsContainer: {
    gap: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  streakImage: {
    top: -2.5,
  },
});

export default Statistics;
