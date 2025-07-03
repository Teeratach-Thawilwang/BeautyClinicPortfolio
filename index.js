/**
 * @format
 */


import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

messaging().setBackgroundMessageHandler(async (_remoteMessage) => { });

AppRegistry.registerComponent(appName, () => App);
