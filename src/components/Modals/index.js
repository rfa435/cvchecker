/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LogoutIcon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import { useRecoilState } from 'recoil';
import { modalsLogout } from '../../store';
import {Auth} from 'aws-amplify';

const Modals = ({ navigation }) => {
    const [modals, setModals] = useRecoilState(modalsLogout);

    const logOut = () => {
        setModals(false);
        Auth.signOut();
    };

    return (
        <Modal isVisible={modals} backdropOpacity={0.3}>
            <View style={{backgroundColor:'#fff', height:150, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity style={{alignItems:'center', flexDirection:'row', padding:10, backgroundColor:'#f39c12', width:'40%', justifyContent:'center', borderRadius:5}} onPress={() => logOut()}>
                    <Text style={{marginRight:10, color:'#fff', fontWeight:'bold'}}>SIGN OUT</Text>
                    <LogoutIcon name="logout" size={20} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center', flexDirection:'row', padding:10, width:'40%', justifyContent:'center', marginTop:10}} onPress={() => setModals(false)}>
                    <Text style={{marginRight:10, color:'#000', fontWeight:'bold'}}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default Modals;