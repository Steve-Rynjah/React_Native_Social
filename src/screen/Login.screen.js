import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Dimensions, TextInput, Text, TouchableOpacity, Image, Alert} from 'react-native'
const {width, height} = Dimensions.get('screen');

import auth from '@react-native-firebase/auth';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useEffect(()=>{
    //     GoogleSignin.configure({
    //     scopes: ['email'],
    //     webClientId: '786082796818-2gl90kc0rsrd9g86kf51jl4usuvnvn08.apps.googleusercontent.com',
    //     offlineAccess: true
    //       }); 
    // },[])

    const onLogin = () => {
        if(email === '' || password === ''){
            Alert.alert('Empty field alert! Please fill the required field.')
        } else {
            auth().signInWithEmailAndPassword(email,password)
            .then(()=>{
                navigation.navigate('Home')
                setEmail('')
                setPassword('')
            })
            .catch(() => Alert.alert('Authentication Failed'))
        }
    }

    // const onGoogleSignIn = () => {
    //     const funCall = async () => {
    //         try {
    //           const { idToken } = await GoogleSignin.signIn();
    //           const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
    //           auth().signInWithCredential(googleCredential)
    //             .then(() => { navigation.navigate('ChatRoom')})
    //         } catch (error) {
    //           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             console.log('Google singIn cancel')
    //           } else if (error.code === statusCodes.IN_PROGRESS) {
    //             console.log('In Progress')
    //           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             console.log('Not Available')
    //           } else {
    //             console.log('Developer Error')
    //           }
    //         }
    //       }
    //       funCall()
    // }


    return (
        <View style={styles.container}>
            <View style={{marginTop: 350}}/>
            <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={email}
                        placeholder="name@gmail.com"
                        placeholderTextColor='#999999aa'
                        onChangeText={(value)=> setEmail(value)}
                        maxLength={25}
                        keyboardType='email-address'
                        style={{color: '#333', marginLeft: 10, fontSize: 14}}
                    />
                </View>
            <Text style={[styles.label, {marginTop: 10}]}>Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={password}
                        placeholder="* * * * * * *"
                        placeholderTextColor='#999999aa'
                        secureTextEntry
                        onChangeText={(value)=> setPassword(value)}
                        maxLength={25}
                        style={{color: '#333', marginLeft: 10, fontSize: 14}}
                    />
                </View>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={onLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.button_}>
                    <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                        <Text style={styles.buttonText_}>Register</Text>
                    </TouchableOpacity>
                </View>  
            </View>

                {/* <TouchableOpacity style={[styles.goggleButton, {flexDirection: 'row'}]} onPress={onGoogleSignIn}>
                    <Text style={styles.buttonText}>Signing in through </Text>
                    <Image source={require('../../assets/image/icons8-google-96.png')} style={{width: 40, height: 40, marginLeft: 10}}/>
                </TouchableOpacity> */}
         
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#FFFFFF',
    },
    label:{
        fontSize:16,
        fontWeight:'400',
        color: '#777777aa',
        marginLeft: 35,
    },
    inputContainer:{
        width: width/2 * 1.7,
        height: height/17.5,
        borderWidth:1,
        borderColor: '#fcb126',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10
    },
    button:{
        width: width/2 - 50,
        height: height/15,
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
    button_:{
        width: width/2 - 50,
        height: height/15,
        borderRadius:10,
        borderWidth:1,
        borderColor: '#fcb126',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35,
        marginTop: 30
    },
    buttonText_:{
        fontSize:16,
        fontWeight:'400',
        color: '#fcb126'
    },
    goggleButton:{
        width: width/2 * 1.7,
        height: height/15,
        borderRadius:10,
        backgroundColor: '#5789ffcc',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35,
        marginTop: 30
    }
    
})