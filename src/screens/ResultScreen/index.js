/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import CheckIcon from 'react-native-vector-icons/FontAwesome';
import TimesIcon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SoundPlayer from 'react-native-sound-player';

const ResultScreen = ({ navigation, route }) => {
    const playAudio = (url) => {
        try {
            SoundPlayer.playUrl(url);
        } catch (e) {
            Alert.alert("Can't play sound!");
        }
    };

    return (
        <ScrollView>
            <View>
                <View style={{alignItems:'center', marginTop:40}}>
                    <View style={{backgroundColor:'#f39c12', paddingHorizontal:40, paddingVertical:20, borderRadius:10}}>
                        <Text style={{fontSize:60, color:'#fff'}}>{route.params.result.score}</Text>
                    </View>
                </View>
                <View style={{alignItems:'center', marginTop:40}}>
                    <View style={{width:'80%', backgroundColor:'#f39c12', borderRadius:5}}>
                        <View style={{backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10, borderRadius:5, alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#f39c12'}}>RESULT-TO-SPEECH</Text>
                        </View>
                        <View style={{marginTop:5, padding:10, alignItems:'center', justifyContent:'center'}}>
                            <View>
                                <TouchableOpacity onPress={() => playAudio(route.params.result.urlAudio)}>
                                    <Icon name="motion-play-outline" size={50} color="#fff"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{alignItems:'center', marginTop:40}}>
                    <View style={{width:'80%', backgroundColor:'#f39c12', borderRadius:5}}>
                        <View style={{backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10, borderRadius:5, alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#f39c12'}}>SUGGESTED KEYWORDS</Text>
                        </View>
                        <View style={{marginTop:5, padding:10, alignItems:'flex-start'}}>
                            <View style={{marginVertical:5, flexDirection:'row'}}>
                                <View style={{width:'90%'}}>
                                    <Text style={{color:'#fff'}}>{route.params.role === 'Solutions Architect' ? 'Project' : 'Business'}</Text>
                                </View>
                                <View>
                                    {
                                        route.params.role === 'Solutions Architect' ?
                                            route.params.result.detailScore.project !== true ?
                                            <TimesIcon name="times" size={15} color="#fff"/>
                                            :
                                            <CheckIcon name="check" size={15} color="#fff" />

                                        :

                                            route.params.result.detailScore.business !== true ?
                                            <TimesIcon name="times" size={15} color="#fff"/>
                                            :
                                            <CheckIcon name="check" size={15} color="#fff" />
                                    }
                                </View>
                            </View>
                            <View style={{marginVertical:5, flexDirection:'row'}}>
                                <View style={{width:'90%'}}>
                                    <Text style={{color:'#fff'}}>Internship</Text>
                                </View>
                                <View>
                                    {
                                        route.params.result.detailScore.internship !== true ?
                                        <TimesIcon name="times" size={15} color="#fff"/>
                                        :
                                        <CheckIcon name="check" size={15} color="#fff" />
                                    }
                                </View>
                            </View>
                            <View style={{marginVertical:5, flexDirection:'row'}}>
                                <View style={{width:'90%'}}>
                                    <Text style={{color:'#fff'}}>{route.params.role === 'Solutions Architect' ? 'Leader' : 'Communication'}</Text>
                                </View>
                                <View>
                                    {
                                        route.params.role === 'Solutions Architect' ?
                                            route.params.result.detailScore.leader !== true ?
                                            <TimesIcon name="times" size={15} color="#fff"/>
                                            :
                                            <CheckIcon name="check" size={15} color="#fff" />

                                        :

                                            route.params.result.detailScore.communication !== true ?
                                            <TimesIcon name="times" size={15} color="#fff"/>
                                            :
                                            <CheckIcon name="check" size={15} color="#fff" />
                                    }
                                </View>
                            </View>
                            <View style={{marginVertical:5, flexDirection:'row'}}>
                                <View style={{width:'90%'}}>
                                    <Text style={{color:'#fff'}}>{route.params.role === 'Solutions Architect' ? 'Solutions Architect' : 'Accounts'}</Text>
                                </View>
                                <View>
                                    {
                                        route.params.role === 'Solutions Architect' ?
                                            route.params.result.detailScore.solutionsarchitect !== true ?
                                            <TimesIcon name="times" size={15} color="#fff"/>
                                            :
                                            <CheckIcon name="check" size={15} color="#fff" />

                                        :

                                            route.params.result.detailScore.accounts !== true ?
                                            <TimesIcon name="times" size={15} color="#fff"/>
                                            :
                                            <CheckIcon name="check" size={15} color="#fff" />
                                    }
                                </View>
                            </View>
                            <View style={{marginVertical:5, flexDirection:'row'}}>
                                <View style={{width:'90%'}}>
                                    <Text style={{color:'#fff'}}>{route.params.role === 'Solutions Architect' ? 'Supervised' : 'Client'}</Text>
                                </View>
                                <View>
                                    {
                                        route.params.role === 'Solutions Architect' ?
                                            route.params.result.detailScore.supervised !== true ?
                                            <TimesIcon name="times" size={15} color="#fff"/>
                                            :
                                            <CheckIcon name="check" size={15} color="#fff" />

                                        :

                                            route.params.result.detailScore.client !== true ?
                                            <TimesIcon name="times" size={15} color="#fff"/>
                                            :
                                            <CheckIcon name="check" size={15} color="#fff" />
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{alignItems:'center', marginTop:40}}>
                    <View style={{width:'80%', backgroundColor:'#f39c12', borderRadius:5}}>
                        <View style={{backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:10, borderRadius:5, alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#f39c12'}}>FEEDBACKS</Text>
                        </View>
                        <View style={{marginTop:5, padding:10, alignItems:'flex-start'}}>
                            <View style={{marginVertical:5, flexDirection:'row'}}>
                                <View style={{width:'90%'}}>
                                    <Text style={{color:'#fff'}}>Email</Text>
                                </View>
                                <View>
                                    {
                                        route.params.result.detailScore.email !== true ?
                                        <TimesIcon name="times" size={15} color="#fff"/>
                                        :
                                        <CheckIcon name="check" size={15} color="#fff" />
                                    }
                                </View>
                            </View>
                            <View style={{marginVertical:5, flexDirection:'row'}}>
                                <View style={{width:'90%'}}>
                                    <Text style={{color:'#fff'}}>Linkedin</Text>
                                </View>
                                <View>
                                    {
                                        route.params.result.detailScore.linkedin !== true ?
                                        <TimesIcon name="times" size={15} color="#fff"/>
                                        :
                                        <CheckIcon name="check" size={15} color="#fff" />
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{alignItems:'center', marginTop:40, marginBottom:30}}>
                    <TouchableOpacity style={{backgroundColor:'#fff', paddingHorizontal:20, paddingVertical:13, borderRadius:15, alignItems:'center', width:'50%'}} onPress={() => navigation.navigate('HomeNav')}>
                        <Text style={{color:'#f39c12', fontWeight:'bold'}}>
                            BACK TO HOME
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default ResultScreen;
