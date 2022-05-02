import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View} from 'react-native'
import {ListItem, Avatar} from '@rneui/themed'
import firestore from "@react-native-firebase/firestore";

export const CustomListItem = ({id, chatName, enterChat}) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(()=>{
        const unsubscribe = 
        firestore()
        .collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => (
            setChatMessages(snapshot.docs.map(doc => doc.data()))
        ))
        return unsubscribe;
    },[])

    return (
        <ListItem onPress={()=> enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{uri: chatMessages?.[0]?.photoURL || 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'}}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: '800'}}>
                   {chatName} 
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {(chatMessages?.[0]?.displayName) ? (chatMessages?.[0]?.displayName+' : ') : null }  {(chatMessages?.[0]?.message || chatMessages?.[0]?.image) ? (chatMessages?.[0]?.message || '📷 photo') : 'No messages yet.'}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}