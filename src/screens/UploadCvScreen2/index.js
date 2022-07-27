/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-dupe-keys */
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import {post} from '../../adapter';
import {getStorage} from '../../helper/storage';
import {Auth} from 'aws-amplify';

const UploadCvScreen2 = ({navigation, route}) => {
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadData2 = async () => {
    if (file !== '') {
      setLoading(true);
      let formData2 = new FormData();
      formData2.append('pdf', file);
      formData2.append('roleName', route.params.role);
      formData2.append('createdBy', Auth.user.attributes.name);

      const postData2 = await post('upload-pdf', formData2);
      if (postData2.data.statusCode === 201) {
        setLoading(false);
        navigation.navigate('Result2', {result: postData2.data.data});
      } else {
        setLoading(false);
        Alert.alert(postData2.data.message);
      }
    } else {
      Alert.alert('Please upload file!');
    }
  };

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setFile(res[0]);
      Alert.alert('Yeay', 'Successfully uploaded!');
    } catch (error) {
      Alert.alert('Uh-oh', 'Upload failed!');
    }
  };

  return (
    <View>
      <View style={{backgroundColor: '#34495e'}}>
        <View style={{marginTop: 70, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => pickFile()}
            style={{marginBottom: 40}}>
            <View style={style.btnNav}>
              <Icon name="upload" size={70} color={'#f39c12'} />
            </View>
          </TouchableOpacity>
          <View style={style.textChoseProfile}>
            <Text style={{color: '#f39c12'}}>UPLOAD FILE</Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 40, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => uploadData2()}>
          <View style={style.submitBtn}>
            <Text style={{color: '#fff', marginRight: 5}}>SUBMIT</Text>
            {loading === true && <ActivityIndicator size={15} color={'#fff'} />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  btnNav: {
    padding: 10,
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
    borderRadius: 5,
  },
  submitBtn: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: '#f39c12',
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default UploadCvScreen2;
