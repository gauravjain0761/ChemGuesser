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
import * as Progress from 'react-native-progress';
import Header from '../compoment/Header';
import IconButton from '../compoment/LogoButton';
import PrimaryButton from '../compoment/CustomButton';

type Props = {};

const HomeScreen = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelected] = useState('01');
  const [answer, setAnswer] = useState('');
  const hearts = [
    {id: 1, icon: icons.heart},
    {id: 2, icon: icons.heart},
    {id: 3, icon: icons.heart},
  ];

  const questions = [
    {
      id: '01',
      question: 'You probably drink coffee to get a kick from this drug',
      img: IMAGES.questionImg,
    },
    {
      id: '02',
      question: 'You probably drink coffee to get a kick from this drug',
      img: IMAGES.questionImg,
    },
    {
      id: '03',
      question: 'You probably drink coffee to get a kick from this drug',
      img: IMAGES.questionImg,
    },
    {
      id: '04',
      question: 'You probably drink coffee to get a kick from this drug',
      img: IMAGES.questionImg,
    },
    {
      id: '05',
      question: 'You probably drink coffee to get a kick from this drug',
      img: IMAGES.questionImg,
    },
  ];
  const renderItem = ({item}) => (
    <View style={{flexDirection: 'row', gap: 10}}>
      <View
        style={{
          height: 24,
          width: 24,
          borderRadius: 40,
          borderColor: colors.greyLine,
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...commonFontStyle(
              fontFamily.poppinsMedium,
              10,
              colors.black_light,
            ),
          }}>
          {item.id}
        </Text>
      </View>
      {item?.id !== '01' && (
        <View
          style={{
            borderColor: colors.greyLine,
            borderTopWidth: 2,
            transform: [{rotate: '180deg'}],
            width: 23,
            // marginHorizontal: 10,
            top: '-17%',
          }}></View>
      )}
    </View>
  );

  return (
    <ImageBackground source={IMAGES.OnboardingBg} style={{marginBottom: 100}}>
      <Header title="ChemGuess" onPressModal={() => setIsVisible(true)} />
      <ScrollView
        style={{flexGrow: 1}}
        contentContainerStyle={styles.background}>
        <Text style={styles.greetingText}>Hi Gaurav👋</Text>
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={60 / 100}
            width={SCREEN_WIDTH * 0.8}
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
        <Image
          source={IMAGES.streak}
          style={{alignSelf: 'center', marginBottom: -30}}
        />
        <View
          style={{
            backgroundColor: colors.white,
            padding: 20,
            borderRadius: 24,
            gap: 10,
            width: '100%',
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
          <FlatList
            data={questions}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{
              flexDirection: 'row-reverse',
              width: '100%',
              justifyContent: 'space-between',
            }}
          />
          <Text
            style={{
              ...commonFontStyle(
                fontFamily.poppinsMedium,
                14,
                colors.neutral_dark_1,
              ),
              lineHeight: 21,
            }}>
            {questions.find(question => question?.id === selectedId)?.question}
          </Text>
          <Image
            style={{borderRadius: 20}}
            source={
              questions.find(question => question?.id === selectedId)?.img
            }
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.inputBorder,
              borderRadius: 20,
              padding: 16,
              height: 50,
              ...commonFontStyle(fontFamily.poppinsRegular, 14, colors.black),
            }}
            placeholder="Answer e.g. hydrogen, H or 1"
            placeholderTextColor={colors.grey6}
            value={answer}
            onChangeText={setAnswer}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <IconButton icon={icons.leftarrow} onPress={() => null} />
            <TouchableOpacity>
              <Image source={icons.submit} />
            </TouchableOpacity>
            <IconButton icon={icons.rightarrow} onPress={() => null} />
          </View>
          <Text
            style={{
              ...commonFontStyle(
                fontFamily.poppinsBold,
                15,
                colors.purpleGradientText,
              ),
              textDecorationLine: 'underline',
              marginTop: -45,
              textAlign: 'center',
            }}>
            Reveal Answer
          </Text>
        </View>
      </ScrollView>
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
    paddingHorizontal: 10,
    paddingVertical: 16,
    gap: 16,
    marginBottom: 30,
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
