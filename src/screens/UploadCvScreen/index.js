/* eslint-disable prettier/prettier */
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
import { launchCamera } from 'react-native-image-picker'
import {post} from '../../adapter';
import {Auth} from 'aws-amplify';
import ModalsChoseUpload from '../../components/ModalsChoseUpload';
import { useRecoilState } from 'recoil'
import { modalsChoseFile } from '../../store'

const UploadCvScreen = ({navigation, route}) => {
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [modals, setModals] = useRecoilState(modalsChoseFile);

  const uploadData = async () => {
    if (file !== '') {
      setLoading(true);
      let formData = new FormData();
      formData.append('pdf', file);
      formData.append('roleName', route.params.role);
      formData.append('createdBy', Auth.user.attributes.name);

      const postData = await post('upload-pdf', formData);
      if (postData.data.statusCode === 201) {
        setLoading(false);
        navigation.navigate('Result', {result: postData.data.data, role :route.params.role});
      } else if (postData.data.statusCode === 400) {
        setLoading(false);
        Alert.alert('Uh-oh', 'Bad Request!');
        console.log(postData.data.statusCode);
      }
      else {
        setLoading(false);
        Alert.alert('Uh-oh', 'Wrong type of file!');
        console.log(postData.data.statusCode);
      }
    } else {
      Alert.alert('Uh-oh', 'Please upload file!');
    }
  };

  const pickFile = async () => {
    try {
      setModals(false)
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setFile(res[0]);
      Alert.alert('Yeay', 'Successfully uploaded!');
    } catch (error) {
      Alert.alert('Uh-oh', 'Upload failed!');
    }
  };

  const pickPicture = async () => {
    try {
      setModals(false)

      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
  
      await launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          Alert.alert('Uh-oh', 'Upload canceled!');

        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          Alert.alert('Uh-oh', response.error);

        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);

        } else {
          const sendToServer = {
            name : response.assets[0].fileName,
            type : response.assets[0].type,
            size : response.assets[0].fileSize,
            uri  : response.assets[0].uri
          }
  
          setFile(sendToServer)
          Alert.alert('Yeay', 'Successfully uploaded!');
        }
      });

    } catch (error) {
      Alert.alert('Uh-oh', 'Upload failed!');
    }

  }

  return (
    <View>
      <ModalsChoseUpload value onPickFile={() => pickFile()} onPickPicture={() => pickPicture()}/>
      <View style={{backgroundColor: '#34495e'}}>
        <View style={{marginTop: 70, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => setModals(true)}
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
        <TouchableOpacity onPress={() => uploadData()}>
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

export default UploadCvScreen;
