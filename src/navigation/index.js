/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot, useRecoilState } from 'recoil';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Auth, Hub} from 'aws-amplify';

import { modalsLogout } from '../store';
import Home from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CheckCvScreen from '../screens/CheckCvScreen';
import UploadCvScreen from '../screens/UploadCvScreen';
import UploadCvScreen2 from '../screens/UploadCvScreen2';
import ResultScreen from '../screens/ResultScreen';
import ResultScreen2 from '../screens/ResultScreen2';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen/NewPasswordScreen';
import HistoryScreen from '../screens/HistoryScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeTab"
                component={NavHome}
                options={{
                    headerShown:false,
                    tabBarShowLabel: false,
                    tabBarStyle : {
                        height:60,
                    },
                    tabBarIcon : ({ color }) => (
                        <Icon name="home" size={30} style={color !== '#8E8E8F' ? style.activeTab : ''} color={color === '#8E8E8F' ? '#f39c12' : '#fff'}/>
                    ),
                }}
            />
            <Tab.Screen name="ProfileTab"
                component={NavProfile}
                options={{
                    headerShown:false,
                    tabBarShowLabel: false,
                    tabBarStyle : {
                        height:60,
                    },
                    tabBarIcon : ({ color }) => (
                        <Icon name="account" size={30} style={color !== '#8E8E8F' ? style.activeTab : ''} color={color === '#8E8E8F' ? '#f39c12' : '#fff'}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const NavHome = () => {
    const [modals, setModals] = useRecoilState(modalsLogout);

    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeNav"
                component={Home}
                options={{
                    headerShown: true,
                    headerTitle: 'Home',
                    headerTitleAlign:'center',
                    headerTintColor : '#f39c12',
                    headerRight: () => (
                        <Icon name="menu" size={20} onPress={() => setModals(true)}/>
                    ),
                }}
            />
            <Stack.Screen name="CheckCV"
                component={CheckCvScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Check CV',
                    headerTitleAlign:'center',
                    headerTintColor : '#f39c12',
                }}
            />
            <Stack.Screen name="UploadCV"
                component={UploadCvScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Upload CV SA',
                    headerTitleAlign:'center',
                    headerTintColor : '#f39c12',
                }}
            />
            <Stack.Screen name="UploadCV2"
                component={UploadCvScreen2}
                options={{
                    headerShown: true,
                    headerTitle: 'Upload CV Sales',
                    headerTitleAlign:'center',
                    headerTintColor : '#f39c12',
                }}
            />
            <Stack.Screen name="Result"
                component={ResultScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Result',
                    headerTitleAlign:'center',
                    headerTintColor : '#f39c12',
                }}
            />
            <Stack.Screen name="Result2"
                component={ResultScreen2}
                options={{
                    headerShown: true,
                    headerTitle: 'Result',
                    headerTitleAlign:'center',
                    headerTintColor : '#f39c12',
                }}
            />
            <Stack.Screen name="CheckHistory"
                component={HistoryScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'History',
                    headerTitleAlign:'center',
                    headerTintColor : '#f39c12',
                }}
            />
        </Stack.Navigator>
    );
};

const NavProfile = () => {
    const [modals, setModals] = useRecoilState(modalsLogout);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Profile',
                    headerTitleAlign:'center',
                    headerTintColor : '#f39c12',
                    headerRight: () => (
                        <Icon name="menu" size={20} onPress={() => setModals(true)}/>
                    ),
                }}
            />
            <Stack.Screen name="EditProfile"
                component={EditProfileScreen}
                options={{
                    headerShown: true,
                    headerTitle: 'Edit Profile',
                    headerTitleAlign:'center',
                    headerTintColor : '#f39c12',
                }}
            />
        </Stack.Navigator>
    );
};

// const Navigations = () => {
//     return (
//         <RecoilRoot>
//             <NavigationContainer>
//                 <Stack.Navigator>
//                     <Stack.Screen name="SignIn"
//                         component={SignInScreen}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                     <Stack.Screen name="SignUp"
//                         component={SignUpScreen}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                     <Stack.Screen name="ConfirmEmail"
//                         component={ConfirmEmailScreen}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                     <Stack.Screen name="ForgotPassword"
//                         component={ForgotPasswordScreen}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                     <Stack.Screen name="NewPassword"
//                         component={NewPasswordScreen}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                     <Stack.Screen name="Home"
//                         component={TabNavigation}
//                         options={{
//                             headerShown: false,
//                         }}
//                     />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         </RecoilRoot>
//     );
// };

const Navigation = () => {
    const [user, setUser] = useState(undefined);

    const checkUser = async() => {
      try {
        const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
        setUser(authUser);
      } catch (e) {
        setUser(null);
      }
    };

    useEffect(() => {
      checkUser();
    }, []);

    useEffect(() => {
      const listener = (data) => {
        if (data.payload.event === 'signIn' || data.payload.event === 'signOut'){
          checkUser();
        };
      };

      Hub.listen('auth', listener);
      return () => Hub.remove('auth', listener);
    }, []);

    if (user === undefined) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
        <RecoilRoot>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                {user ? (
                    <Stack.Screen name="Home" component={TabNavigation} />
                ): (
                    <>
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                    </>
                )}
                </Stack.Navigator>
            </NavigationContainer>
        </RecoilRoot>
    );
  };

const style = StyleSheet.create({
    activeTab : {
        backgroundColor: '#f39c12',
        paddingHorizontal:15,
        paddingVertical:3,
        margin:5,
        borderRadius:10,
    },
});

export default Navigation;
