import {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useAppDispatch} from '../redux/hooks';
import {colors} from '../theme/colors';
import {Text} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import {SCREENS} from './screenNames';
export type RootStackParamList = {
  HomeScreen: undefined;
};
const headerStyleTransparent = {
  headerStyle: {
    backgroundColor: colors.white,
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    // ...commonFontStyle(i18n.language, 500, 19, colors.black),
  },
  headerTitleAlign: 'center',
  // ...TransitionPresets.SlideFromRightIOS,
};
const Stack = createStackNavigator<RootStackParamList>();

const LogoHeader = () => {
  return <Text>hi</Text>;
};

const StackNavigator: FC = () => {
  const dispatch = useAppDispatch();

  //   const checkNotification = (remoteMessage: any) => {};
  // useEffect(() => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     if (remoteMessage) {
  //       console.log(
  //         'Notification caused app to open from background state:',
  //         remoteMessage.notification,
  //       );
  //       checkNotification(remoteMessage);
  //     }
  //   });
  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       console.log('getInitialNotification', remoteMessage);
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //       checkNotification(remoteMessage);
  //     });
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //     checkNotification(remoteMessage);
  //   });
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', remoteMessage);
  //     checkNotification(remoteMessage);
  //     onDisplayNotification(remoteMessage);
  //   });
  //   return unsubscribe;
  // }, []);
  // async function onDisplayNotification(message: any) {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission();

  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //     importance: AndroidImportance.HIGH,
  //   });
  //   notifee.displayNotification({
  //     title: message.notification.title,
  //     body: message.notification.body,
  //     android: {
  //       channelId,
  //       smallIcon: 'ic_stat_name',
  //       sound: 'noti.mp3',
  //     },
  //     ios: {
  //       sound: 'noti.wav',
  //     },
  //   });
  // }
  return (
    <Stack.Navigator initialRouteName={'HomeScreen'}>
      <Stack.Screen
        options={({navigation}) => ({headerShown: false})}
        name={SCREENS.HomeScreen}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;
