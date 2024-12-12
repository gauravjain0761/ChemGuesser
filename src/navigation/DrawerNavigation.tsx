import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {SCREENS} from './screenNames';
import CustomDrawer from '../compoment/CustomDrawer';
import BottomTabBar from './BotttomTabNavigation';
import HomeScreen from '../screens/HomeScreen';
import Statistics from '../screens/Statistics';
import QuestionBank from '../screens/QuestionBank';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {width: '100%'},
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name={SCREENS.HomeScreen} component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
