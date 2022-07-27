/* eslint-disable prettier/prettier */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/navigation';
import {name as appName} from './app.json';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

AppRegistry.registerComponent(appName, () => App);
