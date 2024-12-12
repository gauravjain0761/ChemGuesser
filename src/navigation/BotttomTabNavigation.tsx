import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Pressable, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {commonFontStyle, fontFamily, hp, wp} from '../theme/fonts';

import {SCREENS} from './screenNames';
import HomeScreen from '../screens/HomeScreen';
import {colors} from '../theme/colors';

const Tab = createBottomTabNavigator();

const TabBarItem = ({state, navigation}: BottomTabBarProps) => {
  return <SafeAreaView style={styles.itemContainer}></SafeAreaView>;
};

function BottomTabBar() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBarItem {...props} />}
      initialRouteName={SCREENS.HomeScreen}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name={SCREENS.HomeScreen} component={HomeScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: hp(70),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: wp(15),
  },
});

export default BottomTabBar;
