/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useRecoilState } from 'recoil';
import { modalsChoseFile } from '../../store';

const ModalsChoseUpload = ({ onPickFile, onPickPicture }) => {
    const [modals, setModals] = useRecoilState(modalsChoseFile);

    return (
        <Modal isVisible={modals} backdropOpacity={0.3}>
            <View style={{backgroundColor:'#fff', height:180, alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
                <TouchableOpacity style={{alignItems:'center', flexDirection:'row', padding:10, backgroundColor:'#f39c12', width:'60%', justifyContent:'center', borderRadius:5}} onPress={() => onPickFile()}>
                    <Text style={{marginRight:10, color:'#fff', fontWeight:'bold'}}>Chose document or images</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center', flexDirection:'row', padding:10, backgroundColor:'#f39c12', width:'60%', justifyContent:'center', borderRadius:5, marginTop:5}} onPress={() => onPickPicture()}>
                    <Text style={{marginRight:10, color:'#fff', fontWeight:'bold'}}>Take a picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center', flexDirection:'row', padding:10, width:'40%', justifyContent:'center', marginTop:15}} onPress={() => setModals(false)}>
                    <Text style={{marginRight:10, color:'#000', fontWeight:'bold'}}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default ModalsChoseUpload;