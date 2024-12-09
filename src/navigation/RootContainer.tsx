import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, {FC} from 'react';
import {useAppSelector} from '../redux/hooks';
import Loader from '../compoment/Loader';
import StackNavigator from './StackNavigator';
import {StatusBar} from 'react-native';
import {colors} from '../theme/colors';

export const navigationRef = createNavigationContainerRef();

const RootContainer: FC = () => {
  const {isLoading} = useAppSelector(state => state.common);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.bg} />
      <StackNavigator />
      {/* <Loader visible={isLoading} /> */}
    </NavigationContainer>
  );
};
export default RootContainer;
