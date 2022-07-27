/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
  } from 'react-native';
import Modals from '../../components/Modals';
import {Auth} from 'aws-amplify';
import Logo from '../../../assets/images/Logo_1.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({ navigation }) => {
    const name = Auth.user.attributes.name;
    const email = Auth.user.attributes.email;

    return (
        <View style={{padding:0}}>
            <Modals navigation={navigation}/>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo]}
                    resizeMode="contain"
                />
                <View style={{marginTop:5}}>
                    <Text style={{fontSize:20, color:'#000'}}>Welcome to CV Checker, </Text>
                    <Text style={{fontSize:30, fontWeight: 'bold', color:'#f39c12', textAlign: 'center'}}>{name}!</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Icon name="email" size={20} color={'#f39c12'}/>
                    <Text style={{fontSize:15, fontWeight: 'bold', color:'#000'}}>{email}</Text>
                </View>
            </View>
            {/* <View style={{marginVertical:20, alignItems:'center'}}>
                <TouchableOpacity style={{backgroundColor:'#f39c12', paddingHorizontal:20, paddingVertical:10, borderRadius:10, width:'70%', alignItems:'center'}} onPress={() => navigation.navigate('EditProfile')}>
                    <Text style={{color:'#fff', fontWeight:'bold'}}>Edit Profile</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 0,
    },
    logo: {
      width: '70%',
      maxWidth: 300,
      maxHeight: 200,
    },
  });

export default ProfileScreen;
