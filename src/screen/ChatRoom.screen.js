import React,{useLayoutEffect, useState, useEffect}  from 'react';
import {View,Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import Modal from 'react-native-modal';
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

import {CustomListItem} from '../components/CustomListItem.component'

export const ChatRoom = ({navigation}) => {
    const user = auth().currentUser.photoURL;
    const [chats, setChats] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Chat Room",
            headerStyle: {backgroundColor: '#fcb126'},
            headerTitleStyle: {color: '#fff', fontSize: 20},
            headerTitleAlign: 'center',
            headerRight: () => (
                <View style={styles.avatar}>
                    <Image source={{uri: user ? user : 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'}} style={styles.avatar}/>
                </View>
            )
        })
    },[navigation])

    //GET Request
    useEffect(()=>{
        const unsubscribe = firestore().collection('chats').onSnapshot((snapshot)=>
         setChats(
             snapshot.docs.map((doc)=> ({
                 id: doc.id,
                 data: doc.data()
             }))
         ))
         return unsubscribe;
    },[])

    //POST Request
    const createChat = async () => {
        if(input === ''){
            alert('Enter chat name')
        } else {
            await firestore()
            .collection("chats")
            .add({
                chatName: input
            })
            .then(()=> setIsOpen(!isOpen))
            .catch((error)=> alert(error))
        }
    }

    //navigate using params
    const enterChat = (id, chatName) => {
        navigation.navigate('Chat',{
            id: id,
            chatName: chatName
        })
    }

    return(
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Modal
              useNativeDriver={true}
              animationIn="fadeIn"
              animationOut="fadeOut"
              isVisible={isOpen}
              coverScreen
              hasBackdrop
              onBackdropPress={() => [setIsOpen(!isOpen), setInput('')]}
              backdropColor={'rgba(0, 0, 0, 0.7)'}
              style={{width: '100%',alignSelf: 'center'}}>
                <View style={styles.modalContainer}>
                    <Text style={styles.label}>Creat Chat</Text>
                    <Text style={{fontSize: 16, fontWeight: '200', color: '#777777aa', alignSelf: 'center', marginTop: -10}}>__________________________</Text>
                    <View style={styles.input}>
                        <TextInput
                            value={input}
                            onChangeText={(value)=> setInput(value)}
                            placeholder="Let's talk crypto?"
                            placeholderTextColor="#999999aa"
                            maxLength={50}
                            style={{color: '#333', marginLeft: 10, fontSize: 14}}
                        />
                    </View>
                    <View style={input.length>0 ? styles.button : styles.disableButton}>
                        <TouchableOpacity onPress={createChat}>
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ScrollView showsVerticalScrollIndicator={false} style={{height: '100%'}}>
                {chats.map(({id, data: {chatName}})=> (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.fab} onPress={()=> setIsOpen(!isOpen)} activeOpacity={0.5}>
                <Image source={require('../../assets/FAB.png')} resizeMode='contain' style={{width:50, height:50}} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    avatar:{
        width: 40,
        height: 40,
        borderRadius:50,
        marginRight: 15
    },
    fab:{
        width:50, 
        height:50, 
        position: 'absolute', 
        bottom:75, 
        right:20
    },
    modalContainer:{
        width: 350,
        height:250,
        borderRadius:25,
        backgroundColor: '#fff',
        alignSelf: 'center'
    },
    label:{
        fontSize:20,
        fontWeight:'500',
        color: '#fcb126',
        alignSelf: 'center',
        marginTop: 20
    },
    input:{
        width: 275,
        height: 50,
        borderWidth: 1,
        borderColor: '#fcb126',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 35,
    },
    button: {
        width: 150,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#fcb126',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        alignSelf: 'center',
      },
      buttonText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFFFFF',
      },
      disableButton:{
        width: 150,
        height: 50,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        alignSelf: 'center',
      }
})