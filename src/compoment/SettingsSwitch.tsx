import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {colors} from '../theme/colors';
import {commonFontStyle, fontFamily} from '../theme/fonts';
import CustomSwitch from './ToggleSwitch';

type SettingsSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  svg: React.ComponentType;
};

const SettingsSwitch: React.FC<SettingsSwitchProps> = ({
  value,
  onChange,
  label,
  svg: SvgIcon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <SvgIcon />
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <CustomSwitch value={value} onChange={onChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    gap: 11,
  },
  labelText: {
    ...commonFontStyle(fontFamily.poppinsMedium, 15, colors.black0E),
  },
});

export default SettingsSwitch;
