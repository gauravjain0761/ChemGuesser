import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import Header from '../compoment/Header';
import {IMAGES} from '../assets/Images';
import SoundSvg from '../assets/svg/SoundSvg.svg';
import MoonSvg from '../assets/svg/MoonSvg.svg';
import NotificationSvg from '../assets/svg/NotificationSvg.svg';

import SettingsSwitch from '../compoment/SettingsSwitch';
type Props = {};

const Settings = ({navigation}) => {
  const [isSoundSwitch, setIsSoundSwitch] = useState(false);
  const [isDarkModeSwitch, setIsDarkModeSwitch] = useState(false);

  return (
    <ImageBackground
      source={IMAGES.OnboardingBg}
      style={styles.imageBackground}>
      <Header
        isBack={true}
        onPressBack={() => navigation.pop(2)}
        title="Settings"
      />
      <View style={{gap: 16}}>
        <SettingsSwitch
          label="Sound"
          svg={SoundSvg}
          value={isSoundSwitch}
          onChange={setIsSoundSwitch}
        />
        <SettingsSwitch
          label="Dark Mode"
          svg={MoonSvg}
          value={isDarkModeSwitch}
          onChange={setIsDarkModeSwitch}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
});

export default Settings;
