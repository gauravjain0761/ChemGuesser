import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../theme/colors';

type Props = {};

const Loader = ({visible = false}) => {
  return (
    <View>
      <ActivityIndicator size={'large'} color={colors.black} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
