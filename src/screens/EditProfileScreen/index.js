/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Auth} from 'aws-amplify';

const EditProfileScreen = ({ navigation }) => {
    const username = Auth.user.attributes.name;
    const email = Auth.user.attributes.email;
    const [password, setPassword]       = useState('sample_password');
    const [repeatPass, setRepeatPass]   = useState('sample_password');

    const [showPassword, setShowPassword]               = useState(true);
    const [showPasswordRepeat, setShowPasswordRepeat]   = useState(true);

    return (
        <ScrollView>
            <View style={{justifyContent:'center', alignItems:'center', paddingTop:20}}>
                <View style={{width:'80%', marginVertical:10}}>
                    <View>
                        <View>
                            <Text style={{fontWeight:'bold', fontSize:15}}>Username</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <TextInput
                                style={{ backgroundColor:'#fff', paddingHorizontal:10, paddingVertical:5 }}
                                placeholder="Insert username"
                                onTextInput={(e) => username(e)}
                                value={username}
                            />
                        </View>
                    </View>
                </View>
                <View style={{width:'80%', marginVertical:10}}>
                    <View>
                        <View>
                            <Text style={{fontWeight:'bold', fontSize:15}}>Email</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <TextInput
                                style={{ backgroundColor:'#fff', paddingHorizontal:10, paddingVertical:5 }}
                                placeholder="Insert email"
                                onTextInput={(e) => email(e)}
                                value={email}
                            />
                        </View>
                    </View>
                </View>
                <View style={{width:'80%', marginVertical:10}}>
                    <View>
                        <View>
                            <Text style={{fontWeight:'bold', fontSize:15}}>Password</Text>
                        </View>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                            <TextInput
                                style={{ backgroundColor:'#fff', paddingHorizontal:10, paddingVertical:5, width:'90%' }}
                                placeholder="Insert password"
                                onTextInput={(e) => setPassword(e)}
                                value={password}
                                secureTextEntry={showPassword}
                            />
                            {
                                showPassword === true ?
                                <Icon name="eye" size={20} style={{ backgroundColor: '#fff', paddingVertical:9, paddingHorizontal:5}} onPress={() => setShowPassword(false)}/>
                                :
                                <Icon name="eye-off" size={20} style={{ backgroundColor: '#fff', paddingVertical:9, paddingHorizontal:5}} onPress={() => setShowPassword(true)}/>
                            }
                        </View>
                    </View>
                </View>
                <View style={{width:'80%', marginVertical:10}}>
                    <View>
                        <View>
                            <Text style={{fontWeight:'bold', fontSize:15}}>Repeat password</Text>
                        </View>
                        <View style={{marginTop:10, flexDirection:'row', alignItems:'center'}}>
                            <TextInput
                                style={{backgroundColor:'#fff', paddingHorizontal:10, paddingVertical:5, width:'90%' }}
                                placeholder="Insert repeat password"
                                onTextInput={(e) => setRepeatPass(e)}
                                value={repeatPass}
                                secureTextEntry={showPasswordRepeat}
                            />
                            {
                                showPasswordRepeat === true ?
                                <Icon name="eye" size={20} style={{ backgroundColor: '#fff', paddingVertical:9, paddingHorizontal:5}} onPress={() => setShowPasswordRepeat(false)}/>
                                :
                                <Icon name="eye-off" size={20} style={{ backgroundColor: '#fff', paddingVertical:9, paddingHorizontal:5}} onPress={() => setShowPasswordRepeat(true)}/>
                            }
                        </View>
                    </View>
                </View>
                <View style={{width:'80%', marginTop:20}}>
                    <TouchableOpacity  style={{backgroundColor:'#f39c12', paddingHorizontal:20, paddingVertical:10, borderRadius:10, alignItems:'center'}} onPress={() => navigation.navigate('Profile')}>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>
                            SAVE
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default EditProfileScreen;
