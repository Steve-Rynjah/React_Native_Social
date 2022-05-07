import React, {useLayoutEffect, useState, useEffect} from 'react';
import {View,Text, TouchableOpacity, StyleSheet, Image, FlatList, Alert} from 'react-native';
import {Images} from '../../assets'
import {Card} from '../components/Card.component'
import firestore from "@react-native-firebase/firestore";
import storage from '@react-native-firebase/storage'

export const Home = ({navigation}) => {
    const [state, setState] = useState([])
    const [deleted, setDeleted] = useState(false)

    //Header
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle: {backgroundColor: '#fcb126'},
            headerRight: () => (
                <TouchableOpacity style={{marginRight:15}} activeOpacity={0.5} onPress={()=> navigation.navigate('Post')}>
                    <Image source={Images.add} resizeMode='contain' style={{width:35, height:35, tintColor: '#fff'}}/>
                </TouchableOpacity>
            ),
            headerLeft: () => (
                <Text style={{fontSize: 20, fontWeight: '500', color: '#fff', marginLeft: 15}}>RN Social</Text>
            ) 
        })
    },[navigation])

    //GET Request
    useEffect(()=>{
        const unsubscribe = firestore()
        .collection('posts')
        .onSnapshot((snapshot)=> setState(
            snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data()
            }))
        ))
        console.log('State',state)
        return unsubscribe;
    },[])

    //For Rendering after Delete Post
    useEffect(()=>{
        const unsubscribe = firestore()
        .collection('posts')
        .onSnapshot((snapshot)=> setState(
            snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data()
            }))
        ))
        console.log('State',state)
        setDeleted(false)
        return unsubscribe;
    },[deleted])

    const deleteHandler = (postId) => {
        Alert.alert(
          'Delete post',
          'Are you sure?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed!'),
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => onDeletePost(postId),
            },
          ],
          {cancelable: false},
        );
      };

    //DELETE Request
    const onDeletePost = (postId) => {
        console.log('POST ID', postId)

        firestore()
        .collection('posts')
        .doc(postId)
        .get()
        .then(snapshot => {
            if(snapshot.exists){
                const {postImg} = snapshot.data()

                if(postImg != null){
                    const storageRef = storage().refFromURL(postImg)
                    const imageRef = storage().ref(storageRef.fullPath)

                    imageRef
                    .delete()
                    .then(()=> {
                        console.log(`${postImg} has been deleted`)
                        deletePostFirestore(postId)
                        setDeleted(true)
                    })
                    .catch((e)=>{
                        console.log("Error",e)
                    })
                }
            }
        })
    }

    const deletePostFirestore = (postId) => {
        firestore()
        .collection('posts')
        .doc(postId)
        .delete()
        .then(()=>{
            Alert.alert('Post successfully deleted')
        })
        .catch((e)=>{
            Alert.alert(e)
        })
    }

    return(
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <FlatList
                data={state}
                keyExtractor={(_,index)=> index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:50, marginTop: -5}}
                renderItem={({item})=>(
                    <Card item={item} onDelete={deleteHandler}/>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    fab:{
        width:50, 
        height:50, 
        position: 'absolute', 
        bottom:100, 
        right:20
    },
})

{/* <Card 
                    avatar={'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'}
                    displayName={'Bunny'}
                    timestamp={'7hr'}
                    image={'https://www.newsbtc.com/wp-content/uploads/2022/04/bitcoin-9.jpeg'}   
                    feed={'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'} 
                    /> */}