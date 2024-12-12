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

import {navigationRef} from '../navigation/RootContainer';
import {useNavigation} from '@react-navigation/native';
import ShareSvg from '../assets/svg/ShareSvg.svg';
import StarSvg from '../assets/svg/Star.svg';
import LineSvg from '../assets/svg/LineSvg.svg';
import StreakSvg from '../assets/svg/StreakSvg.svg';
import HeartSvg from '../assets/svg/HeartSvg.svg';
import GradientTick from '../assets/svg/GradientTick.svg';
import FixedGradientButton from '../compoment/CustomButton';
type Props = {};

const HomeScreen = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelected] = useState(1);
  const [answer, setAnswer] = useState('');
  const navigation = useNavigation();

  const hearts = [
    {id: 1, icon: icons.heart},
    {id: 2, icon: icons.heart},
    {id: 3, icon: icons.heart},
  ];

  const questions = [
    {
      id: 1,
      questionNo: '01',
      question: 'You probably drink coffee to get a kick from this drug',
      img: IMAGES.questionImg,
    },
    {
      id: 2,
      questionNo: '02',
      question: '2 You probably drink coffee to get a kick from this drug',
      img: IMAGES.questionImg,
    },
    {
      id: 3,
      questionNo: '03',
      question: '3 You probably drink coffee to get a kick from this drug',
      img: IMAGES.questionImg,
    },
    {
      id: 4,
      questionNo: '04',
      question: '4 You probably drink coffee to get a kick from this drug',
      img: IMAGES.questionImg,
    },
    {
      id: 5,
      questionNo: '05',
      question: '5 You probably drink coffee to get a kick from this drug',
      img: IMAGES.questionImg,
    },
  ];

  const handlePrevious = () => {
    if (selectedId > 1) {
      setSelected(selectedId - 1);
    }
  };

  const handleNext = () => {
    if (selectedId < questions.length) {
      setSelected(selectedId + 1);
    }
  };

  const renderItem = ({item}: any) => (
    <View style={styles.questionItemContainer}>
      {item.id === selectedId ? (
        <GradientTick />
      ) : (
        <View style={[styles.questionCircle]}>
          <Text style={styles.questionCircleText}>{item.id}</Text>
        </View>
      )}

      {item?.id !== 1 && <View style={styles.questionLine}></View>}
    </View>
  );

  return (
    <ImageBackground
      source={IMAGES.OnboardingBg}
      style={styles.imageBackground}>
      <Header
        isHome
        title="ChemGuess"
        onPressModal={() => setIsVisible(true)}
        onPressBurger={() => navigation.openDrawer()}
      />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.background}>
        <View style={styles.greetingContainer}>
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
        </View>
        <ImageBackground
          source={IMAGES.streakBg}
          style={styles.imagebgBackground}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.resultText}>Yesterday quiz result</Text>
              <View style={styles.resultDetailsContainer}>
                <StarSvg />
                <View style={styles.scoreContainer}>
                  <Text style={styles.score}>2100</Text>
                  <Text style={styles.separator}>|</Text>
                  <Text style={styles.level}>Platinum</Text>
                </View>
              </View>
            </View>
            <LineSvg />
            <View style={styles.streakContainer}>
              <Text style={styles.streakText}>Streak</Text>
              <Text style={styles.streakCount}>5</Text>
              <StreakSvg />
            </View>
          </View>
        </ImageBackground>

        <View style={styles.questionContainer}>
          <Text style={styles.questionIntroText}>
            Chemguesser 4: Guess a mystery chemical
          </Text>
          <View style={styles.pointsAndHeartsContainer}>
            <View style={styles.pointBadge}>
              <Text style={styles.pointBadgeText}>1 Point</Text>
            </View>
            <View style={styles.heartsContainer}>
              {hearts.map(item => {
                return <HeartSvg />;
              })}
            </View>
          </View>
          <FlatList
            data={questions}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.questionsListContainer}
          />
          <Text style={styles.questionText}>
            {questions.find(question => question?.id === selectedId)?.question}
          </Text>
          <Image
            style={styles.questionImage}
            source={
              questions.find(question => question?.id === selectedId)?.img
            }
          />
          <TextInput
            style={styles.answerInput}
            placeholder="Answer e.g. hydrogen, H or 1"
            placeholderTextColor={colors.grey6}
            value={answer}
            onChangeText={setAnswer}
          />
          <View style={styles.navigationButtonsContainer}>
            <IconButton
              icon={icons.leftarrow}
              onPress={() => handlePrevious()}
            />
            <FixedGradientButton
              title="Submit"
              onPress={() => null}
              style={{height: 48, width: '55%', borderRadius: 20}}
            />

            <IconButton icon={icons.rightarrow} onPress={() => handleNext()} />
          </View>
          <Text style={styles.revealAnswerText}>Reveal Answer</Text>
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
              style={styles.shareButtonContainer}>
              <ShareSvg width={120} height={120} />
              {/* <Image source={icons.shareLink} /> */}
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
    gap: 0,
    paddingBottom: 50,
    alignItems: 'flex-start',
  },
  imageBackground: {
    marginBottom: 50,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  greetingContainer: {
    width: '85%',
    right: -10,
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
    height: 20,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    ...commonFontStyle(fontFamily.poppinsRegular, 10, colors.greenText),
  },
  streakImage: {
    alignSelf: 'center',
    marginBottom: -40,
    marginTop: -10,
  },
  questionContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 24,
    gap: 10,
    width: '100%',
  },
  questionIntroText: {
    ...commonFontStyle(fontFamily.poppinsRegular, 12, colors.grey),
  },
  pointsAndHeartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointBadge: {
    backgroundColor: colors.backgroundLightGreen,
    height: 24,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  pointBadgeText: {
    ...commonFontStyle(fontFamily.poppinsMedium, 12, colors.darkGreen),
    alignSelf: 'center',
    textAlign: 'center',
  },
  heartsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  questionsListContainer: {
    flexDirection: 'row-reverse',
    width: '100%',
    justifyContent: 'space-between',
  },
  questionItemContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  questionCircle: {
    height: 24,
    width: 24,
    borderRadius: 40,
    borderColor: colors.greyLine,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionCircleText: {
    ...commonFontStyle(fontFamily.poppinsMedium, 10, colors.black_light),
  },
  questionLine: {
    borderColor: colors.greyLine,
    borderTopWidth: 2,
    transform: [{rotate: '180deg'}],
    width: 23,
    top: '-17%',
  },
  questionText: {
    ...commonFontStyle(fontFamily.poppinsMedium, 14, colors.neutral_dark_1),
    lineHeight: 21,
  },
  questionImage: {
    borderRadius: 20,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 20,
    padding: 16,
    height: 50,
    ...commonFontStyle(fontFamily.poppinsRegular, 14, colors.black),
  },
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  revealAnswerText: {
    ...commonFontStyle(fontFamily.poppinsBold, 15, colors.purpleGradientText),
    textDecorationLine: 'underline',
    marginTop: -50,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '50%',
    backgroundColor: 'white',
    borderRadius: 40,
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
  shareButtonContainer: {
    alignSelf: 'center',
    top: 10,
  },
  imagebgBackground: {
    height: 68,
    width: '100%',
    borderRadius: 20,
    marginVertical: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  resultText: {
    ...commonFontStyle(fontFamily.poppinsRegular, 12, colors.white),
  },
  resultDetailsContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  score: {
    ...commonFontStyle(fontFamily.poppinsMedium, 16, colors.white),
  },
  separator: {
    ...commonFontStyle(fontFamily.poppinsMedium, 16, colors.white),
  },
  level: {
    ...commonFontStyle(fontFamily.poppinsRegular, 10, colors.white),
  },
  streakContainer: {
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
  },
  streakText: {
    ...commonFontStyle(fontFamily.poppinsBold, 15, colors.white),
  },
  streakCount: {
    ...commonFontStyle(fontFamily.poppinsBold, 20, colors.white),
  },
});

export default HomeScreen;
