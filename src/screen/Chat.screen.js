import React,{useLayoutEffect, useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard} from 'react-native'
import {Avatar} from '@rneui/themed'
import ImagePicker from 'react-native-image-crop-picker';

import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

export const Chat = ({navigation, route}) => {
    const [input, setInput] = useState('');
    const [image, setImage] = useState('');
    const [messages, setMessages] = useState([]);

    //Header
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle: {backgroundColor: '#fcb126'},
            // headerRight: () => (
            //     <View style={styles.avatar}>
            //         <Image source={{uri: user ? user : 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'}} style={styles.avatar}/>
            //     </View>
            // )
            headerLeft : () => (
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Image source={require('../../assets/Back.png')} resizeMode='contain' style={{width: 20, height: 20, marginLeft: 10}} />
                </TouchableOpacity>
            ),
            headerTitle: () => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Avatar
                        rounded
                        source={{uri: messages[0]?.data.photoURL || 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'}}
                    />
                    <Text style={{fontSize: 18, fontWeight: '500', marginLeft: 15, color: '#fff'}}>{route.params.chatName}</Text>
                </View>
            )
        })
    },[navigation, messages])

    //GET Request
    useLayoutEffect(()=>{
       const unsubscribe = firestore()
       .collection('chats')
       .doc(route.params.id)
       .collection('messages')
       .orderBy('timestamp', 'desc')
       .onSnapshot((snapshot)=> setMessages(
          snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
          }
          ))
       )) 
       return unsubscribe;
    },[route])

    
    //POST Request
    const sendMessage = () => {
        Keyboard.dismiss();

        firestore()
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add({
            timestamp: firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth().currentUser.displayName,
            email: auth().currentUser.email,
            photoURL: auth().currentUser.photoURL,
            // image: image.length>0 ? image : null
        })
        .then(()=> setInput(''))
    }

    //POST IMAGES
    const onChooseFromLibrary = () => {
        ImagePicker.openPicker({
          width: 400,
          height: 300,
          cropping: true,
          mediaType: 'photo',
          compressImageQuality: 0.4,
          avoidEmptySpaceAroundImage: false
        }).then(image => {
            firestore()
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .add({
                timestamp: firestore.FieldValue.serverTimestamp(),
                displayName: auth().currentUser.displayName,
                email: auth().currentUser.email,
                photoURL: auth().currentUser.photoURL,
                image: image.path.length>0 ? image.path : null
            })  
          setImage(image.path)
        })
    }



    return(
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <StatusBar barStyle='light-content' backgroundColor="#fcb126cc"/>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={90}>
                <>
                    <ScrollView contentContainerStyle={{paddingTop:10}} showsVerticalScrollIndicator={false}>
                        {messages.map(({id, data}) => (
                            //checking whether you are a sender or not!
                            data.email === auth().currentUser.email ? (
                                <View key={id} style={styles.receiver}>
                                    <Avatar
                                        position="absolute"
                                        rounded
                                        source={{
                                            uri: data.photoURL
                                        }}
                                        bottom={-15}
                                        right={-5}
                                        size={25}
                                        //For Web
                                        containerStyle={{
                                            position:"absolute",
                                            bottom:-15,
                                            right:-5 
                                        }}
                                    />
                                    {data.message ? <Text style={styles.receiverText}>{data.message}</Text> : null}
                                    {data.image ? <Image source={{uri: data.image}} resizeMode='contain' style={{width: 125, height: 125, borderRadius: 15, margin:-8.5}} /> : null}
                                </View>
                            ):(
                                <>
                                <View key={id} style={styles.sender}>
                                    <Avatar
                                        position="absolute"
                                        rounded
                                        source={{
                                            uri: data.photoURL
                                        }}
                                        bottom={-15}
                                        left={-5}
                                        size={25}
                                        //For Web
                                        containerStyle={{
                                            position:"absolute",
                                            bottom:-15,
                                            left:-5 
                                        }}
                                    />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                </View>
                                <Text key={id+'_'} style={styles.senderName}>@{data.displayName}</Text>
                                </>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <View style={styles.textInput}>
                            <TextInput
                                value={input}
                                onChangeText={(value)=> setInput(value)}
                                placeholder='Message...'
                                placeholderTextColor='#777777aa'
                                onSubmitEditing={sendMessage}
                                style={{width: 260}}
                            />
                            <TouchableOpacity activeOpacity={0.5}>
                                <Image source={require('../../assets/mic.png')} resizeMode='contain' style={{width: 30, height:30,tintColor: 'rgba(0,0,0,0.5)'}} />
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity activeOpacity={0.5} onPress={onChooseFromLibrary}>
                            <Image source={require('../../assets/attach.png')} resizeMode='contain' style={{width: 30, height:30, marginRight:5 ,tintColor: '#fcb126cc'}}/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                            <Image source={require('../../assets/send.png')} resizeMode='contain' style={{width: 30, height:30, tintColor: '#fcb126cc'}}/>
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    footer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding:15,
    },
    textInput:{
        width: 310,
        bottom:0,
        height:40,
        marginRight:5,
        backgroundColor: '#ECECEC',
        padding:0,
        color:'grey',
        borderRadius:30,
        paddingLeft:10,
        flexDirection: 'row',
        paddingRight:10,
        alignItems: 'center'
    },
    receiver:{
        padding:15,
        backgroundColor: '#fcb126',
        alignSelf: 'flex-end',
        borderRadius:20,
        marginRight: 15,
        marginBottom:20,
        maxWidth: '50%',
        position: 'relative'
    },
    receiverText:{
        fontSize:12,
        color: '#fff',
        fontWeight: '500',
        marginLeft:5
    },
    sender:{
        padding:15,
        paddingBottom:-5,
        paddingLeft: 10,
        backgroundColor: '#2B68E6cc',
        alignSelf: 'flex-start',
        borderRadius:20,
        marginLeft: 15,
        marginBottom:20,
        maxWidth: '50%',
        position: 'relative'
    },
    senderText:{
        fontSize:12,
        color: '#fff',
        fontWeight: '500',
        marginLeft:5,
        marginBottom:15
    },
    senderName:{
        left:5,
        paddingRight:5,
        fontSize:9,
        color: 'rgba(0,0,0,0.3)',
        marginLeft: 32.5,
        marginTop: -20,
        fontWeight: '400' 
    }
})