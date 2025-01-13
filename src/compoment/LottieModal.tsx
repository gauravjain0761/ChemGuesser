import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';

import LottieView from 'lottie-react-native';
import {commonFontStyle, fontFamily, SCREEN_WIDTH} from '../theme/fonts';
import {colors} from '../theme/colors';

const LottieModal = ({
  onPressSaveName,
  isVisible,
  onCloseModal,
  text,
  subText,
  onYesClose,
}) => {
  useEffect(() => {
    setTimeout(() => {
      onCloseModal();
    }, 5000);
  }, []);
  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <LottieView
            source={require('../assets/json/congress.json')}
            style={{width: 300, height: 280}}
            autoPlay
            loop
          />
          <View style={{position: 'absolute', bottom: 20}}>
            <LottieView
              source={require('../assets/json/success.json')}
              style={{width: 300, height: 280}}
              autoPlay
              loop
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.8,
    padding: 30,
    backgroundColor: colors.modalBg,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default LottieModal;
