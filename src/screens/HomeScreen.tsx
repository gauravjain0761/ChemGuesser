import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {icons, IMAGES} from '../assets/Images';
import {commonFontStyle, fontFamily, SCREEN_WIDTH} from '../theme/fonts';
import {colors} from '../theme/colors';
import * as Progress from 'react-native-progress';
import Header from '../compoment/Header';

type Props = {};

const HomeScreen = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const hearts = [
    {id: 1, icon: icons.heart},
    {id: 2, icon: icons.heart},
    {id: 3, icon: icons.heart},
  ];
  return (
    <ImageBackground source={IMAGES.OnboardingBg} style={styles.background}>
      <Header title="ChemGuess" onPressModal={() => setIsVisible(true)} />
      <View>
        <Text style={styles.greetingText}>Hi Gaurav👋</Text>
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={60 / 100}
            width={SCREEN_WIDTH * 0.75}
            color={colors.progressGreen}
            unfilledColor={colors.progressWhite}
            borderColor="transparent"
            borderWidth={0}
            borderRadius={10}
            height={8}
          />
          <View style={styles.percentageContainer}>
            <Text style={styles.percentageText}>60</Text>
          </View>
        </View>
        <Image source={IMAGES.streak} style={{alignSelf: 'center'}} />
        <View
          style={{
            backgroundColor: colors.white,
            padding: 20,
            borderRadius: 24,
            gap: 5,
          }}>
          <Text
            style={{
              ...commonFontStyle(fontFamily.poppinsRegular, 12, colors.grey),
            }}>
            Chemguesser 4: Guess a mystery chemical
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                backgroundColor: colors.backgroundLightGreen,
                height: 24,
                width: 55,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  ...commonFontStyle(
                    fontFamily.poppinsMedium,
                    12,
                    colors.darkGreen,
                  ),
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                1 Point
              </Text>
            </View>
            <View style={{flexDirection: 'row', gap: 5}}>
              {hearts.map(item => {
                return <Image source={item.icon} key={item.id} />;
              })}
            </View>
          </View>
        </View>
      </View>
      <Modal transparent visible={isVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              {'Share Your Points\n with Friends!'}
            </Text>
            <Text style={styles.modalText2}>
              {'Loreum epsum sit dolor\n emit loreum'}
            </Text>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={{top: '15%'}}>
              <Image source={icons.shareLink} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  greetingText: {
    ...commonFontStyle(fontFamily.poppinsSemiBold, 18, colors.white),
  },
  progressContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageContainer: {
    backgroundColor: colors.lightGreen,
    borderRadius: 6,
  },
  percentageText: {
    alignSelf: 'center',
    color: colors.greenText,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '90%',
    maxHeight: '50%',
    backgroundColor: 'white',
    borderRadius: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  modalText: {
    ...commonFontStyle(fontFamily.poppinsBold, 28, colors.purpleText),
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 100,
  },
  modalImage: {
    width: 30,
    height: 30,
  },
  modalText2: {
    ...commonFontStyle(fontFamily.poppinsRegular, 16, colors.grayText),
    alignSelf: 'center',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HomeScreen;
