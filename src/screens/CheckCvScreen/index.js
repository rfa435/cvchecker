/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-dupe-keys */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CheckCvScreen = ({navigation}) => {
  return (
    <View>
      <View style={{backgroundColor: '#34495e'}}>
        <View style={{marginTop: 70, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UploadCV', {role: 'Solutions Architect'})
            }
            style={{marginBottom: 40}}>
            <View style={style.btnNav}>
              <Text style={{fontSize: 20, color: '#fff'}}>
                Solutions Architect
              </Text>
            </View>
          </TouchableOpacity>
          <View style={style.textChoseProfile}>
            <Text>CHOOSE YOUR ROLE</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('UploadCV', {role: 'Sales'})}>
            <View style={style.btnNav}>
              <Text style={{fontSize: 20, color: '#fff'}}>Sales</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  btnNav: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#f39c12',
    width: 130,
    height: 130,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textChoseProfile: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    marginVertical: 10,
    position: 'absolute',
    bottom: -30,
    color: '#34495e',
  },
});

export default CheckCvScreen;
