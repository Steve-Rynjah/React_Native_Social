import React,{useLayoutEffect, useState} from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert} from 'react-native'
import {Images} from '../../assets'
import ImagePicker from 'react-native-image-crop-picker';
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage'

export const Post = ({navigation}) => {
    const [image, setImage] = useState(null)
    const [input, setInput] = useState('')

        //Header
        useLayoutEffect(()=>{
            navigation.setOptions({
                headerStyle: {backgroundColor: '#fcb126'},
                headerLeft : () => (
                    <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <Image source={require('../../assets/Back.png')} resizeMode='contain' style={{width: 20, height: 20, marginLeft: 10}} />
                    </TouchableOpacity>
                ),
                headerTitle: () => (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '500', color: '#fff'}}>Post Feed</Text>
                    </View>
                )
            })
        },[navigation])

        const onChooseFromLibrary = () => {
            ImagePicker.openPicker({
              width: 400,
              height: 300,
              cropping: true,
              mediaType: 'photo',
              compressImageQuality: 0.4,
              avoidEmptySpaceAroundImage: false
            }).then(image => {
              const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path
              setImage(imageUri)
            });
        }

        // const uploadImage = async () => {
        //     const uploadUri = image;    
        //     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)
            
        //     const extension = filename.split('.').pop()
        //     const name = filename.split('.').slice(0,-1).join('.')
        //     filename = name + Date.now() + '.' +extension

        //     const task = storage().ref(filename).putFile(uploadUri) 

        //     try{
        //         await task
        //     }catch(e){()=> console.log("error",e)}
        // }
        // firestore()
        //     .collection('posts')
        //     .add({
        //         userId: auth().currentUser.uid,
        //         post: input,
        //         // postImg: imageUrl,
        //         time: firestore.Timestamp.fromDate(new Date()),
        //         likes: null,
        //         comment: null
        //     })

        

        const submitPost = async () => {
            const imageUrl = await uploadImage();
            console.log('Image Url: ', imageUrl);
          
            firestore()
            .collection('posts')
            .add({
              userId: auth().currentUser.uid,
              post: input,
              postImg: imageUrl,
              postTime: firestore.Timestamp.fromDate(new Date()),
              likes: null,
              comments: null,
            })
            .then(() => {
              navigation.navigate('Home')
              setPost(null);
            })
            .catch((error) => {
              console.log('Something went wrong with added post to firestore.', error);
            });
          }
        
          const uploadImage = async () => {
            if( image == null ) {
              return null;
            }
            const uploadUri = image;
            let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        
            // Add timestamp to File Name
            const extension = filename.split('.').pop(); 
            const name = filename.split('.').slice(0, -1).join('.');
            filename = name + Date.now() + '.' + extension;
        
            // setUploading(true);
            // setTransferred(0);
        
            const storageRef = storage().ref(`photos/${filename}`);
            const task = storageRef.putFile(uploadUri);
        
            // Set transferred state
            // task.on('state_changed', (taskSnapshot) => {
            //   console.log(
            //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            //   );
        
            //   setTransferred(
            //     Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            //       100,
            //   );
            // });
        
            try {
              await task;
        
              const url = await storageRef.getDownloadURL();
              setImage(null);
              setInput('')
        
              // Alert.alert(
              //   'Image uploaded!',
              //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
              // );
              return url;
        
            } catch (e) {
              console.log(e);
              return null;
            }
        }

    return(
        <View style={{flex:1, backgroundColor: '#fff'}}>
        <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{flex:1}}
                keyboardVerticalOffset={90}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={onChooseFromLibrary} activeOpacity={0.5}>
                        <Image source={image != null ? {uri: image} : Images.gallery} resizeMode='cover' style={image != null ? styles.image : styles.nonImage} />
                    </TouchableOpacity>
                </View>

                <View style={styles.input}>
                    <TextInput
                        value={input}
                        onChangeText={(value)=> setInput(value)}
                        placeholder="Type something..."
                        placeholderTextColor="#999999aa"
                        multiline
                        maxLength={150}
                        style={{color: '#333', marginLeft: 10, fontSize: 14, marginRight:10}}
                    />
                </View>

                <View style={image != null  && input.length>0 ? styles.button : styles.disableButton}>
                    <TouchableOpacity activeOpacity={0.5} onPress={submitPost}>
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer:{
        width: '100%',
        height: 300,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input:{
        width:350,
        height:100,
        borderWidth:1,
        borderColor: '#fcb126',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 25
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
    disableButton:{
        width: 100,
        height: 50,
        borderRadius:10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 35,
        marginTop: 30
    },
    nonImage:{
        width: 150, 
        height:150, 
        tintColor: 'rgba(0,0,0,0.3)'
    },
    image:{
        width: 410,
        height: 300
    }
})