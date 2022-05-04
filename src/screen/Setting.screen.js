import React,{useLayoutEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import {Avatar} from '@rneui/themed'
import auth from '@react-native-firebase/auth';

export const Setting = ({navigation}) => {
    const user = auth().currentUser

    const [displayName, setDisplayName] = useState(user.displayName)
    const [email, setEmail] = useState(user.email)

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Setting",
            headerStyle: {backgroundColor: '#fcb126'},
            headerTitleStyle: {color: '#fff', fontSize: 20},
            headerTitleAlign: 'center',
            // headerRight: () => (
            //     <View style={styles.avatar}>
            //         <Image source={{uri: user ? user : 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'}} style={styles.avatar}/>
            //     </View>
            // )
        })
    },[navigation])

    return(
        <View style={{flex:1, backgroundColor:'#fff'}}>
            <View style={{alignItems: 'center', marginTop:25}}>
                <Avatar
                    rounded
                    size={150}
                    source={{uri: user.photoURL}}
                />
                <TouchableOpacity activeOpacity={0.5}>
                    <Text style={styles.text}>Edit Photo</Text>
                </TouchableOpacity>
            </View>
            
            <Text style={[styles.label, {marginTop:25}]}>Username</Text>
            <View style={styles.input}>
                <TextInput
                    value={displayName}
                    onChangeText={(value)=> setDisplayName(value)}
                    style={{fontSize:14, color: '#333', paddingLeft:10}}
                />
            </View>

            <Text style={styles.label}>Email</Text>
            <View style={styles.input}>
                <TextInput
                    value={email}
                    onChangeText={(value)=> setEmail(value)}
                    style={{fontSize:14, color: '#333', paddingLeft:10}}
                />
            </View>

            <View style={styles.button}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </View>

        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:18,
        fontWeight:'400',
        color: 'rgba(0,0,0,0.5)',
        marginTop:10
    },
    input:{
        width:350,
        height:50,
        borderWidth:1,
        borderColor: '#fcb126',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10
    },
    label:{
        fontSize:16,
        fontWeight:'400',
        color: '#777777aa',
        marginLeft: 35,
        marginTop:10
    },
    button:{
        width: 100,
        height: 50,
        borderRadius:10,
        backgroundColor: '#fcb126',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35,
        marginTop: 30
    },
    buttonText:{
        fontSize:16,
        fontWeight:'400',
        color: '#FFFFFF'
    },

})