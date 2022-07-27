/* eslint-disable prettier/prettier */
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Modals from "../../components/Modals"

const HomeScreen = ({ navigation, route }) => {
    return (
        <View>
            <Modals navigation={navigation}/>
            <View style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <View style={{marginTop:50}}>
                    <TouchableOpacity onPress={() => navigation.navigate("CheckCV")}>
                        <View style={style.btnNav}>
                            <Icon name="plus" size={80} color={"#fff"}/>
                        </View>
                        <View style={{display:'flex', alignItems:'center', paddingVertical:5, marginVertical:5, backgroundColor:"#fff", borderRadius:5}}>
                            <Text>Check CV</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:50}}>
                    <TouchableOpacity onPress={() => navigation.navigate("CheckHistory")}>
                        <View style={style.btnNav}>
                            <Icon name="history" size={80} color={"#fff"}/>
                        </View>
                        <View style={{display:'flex', alignItems:'center', paddingVertical:5, marginVertical:5, backgroundColor:"#fff", borderRadius:5}}>
                            <Text>Check History</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    btnNav : {
        padding:10,
        borderRadius:15,
        backgroundColor : "#f39c12",
        width:130,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default HomeScreen;
