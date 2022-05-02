import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
const {width, height} = Dimensions.get('screen');

import auth from '@react-native-firebase/auth';
import BottomSheet from 'react-native-simple-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';

export const Register = ({navigation}) => {
  const panelRef = useRef(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);


  const onTakePhoto = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 0.4,
      avoidEmptySpaceAroundImage: false
    }).then(image => {
      setImage(image.path)
      // panelRef.current.togglePanel()
      setIsOpen(!isOpen)
    });
}

const onChooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
      mediaType: 'photo',
      compressImageQuality: 0.4,
      avoidEmptySpaceAroundImage: false
    }).then(image => {
      setImage(image.path)
      // panelRef.current.togglePanel()
      setIsOpen(!isOpen)
    });
}

const onCancel = () => {
    panelRef.current.togglePanel()
}

    const onRegister = () => {
        if(username === '' || email === '' || password === ''){
            Alert.alert('Empty field alert! Please fill the require field.')
        } else {
            auth().createUserWithEmailAndPassword(email,password)
            .then(()=>{
                auth().currentUser.updateProfile({
                    displayName: username,
                    photoURL: image.length>0 ? image : 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'
                })
                navigation.navigate('Login')
                setUsername('')
                setEmail('')
                setPassword('')
            })
            .catch(() => Alert.alert('Authentication Failed'))
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.avatar}>
            <Image source={{uri: image.length>0 ? image : 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'}} resizeMode='contain' style={{width: 110, height: 110, borderRadius:60}} />
        </View>

        {!isOpen ? (
          <TouchableOpacity onPress={()=> panelRef.current.togglePanel()}>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#fcb126', alignSelf: 'center', marginTop: 15}}>Upload Photo</Text>
        </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={()=> [setIsOpen(!isOpen), panelRef.current.togglePanel()]}>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#fcb126', alignSelf: 'center', marginTop: 15}}>Save</Text>
        </TouchableOpacity>
        )}

      <Text style={[styles.label, {marginTop: 50}]}>Username</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={username}
          placeholder="Bob_Dylan"
          placeholderTextColor="#999999aa"
          onChangeText={value => setUsername(value)}
          maxLength={25}
          style={{color: '#333', marginLeft: 10, fontSize: 14}}
        />
      </View>

      <Text style={[styles.label, {marginTop: 10}]}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          placeholder="bob@gmail.com"
          placeholderTextColor="#999999aa"
          onChangeText={value => setEmail(value)}
          maxLength={25}
          style={{color: '#333', marginLeft: 10, fontSize: 14}}
        />
      </View>

      <Text style={[styles.label, {marginTop: 10}]}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={password}
          placeholder="* * * * * * *"
          placeholderTextColor="#999999aa"
          onChangeText={value => setPassword(value)}
          secureTextEntry
          maxLength={25}
          style={{color: '#333', marginLeft: 10, fontSize: 14}}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={onRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet 
        isOpen={false}
        ref={ref => panelRef.current = ref}
        sliderMinHeight={0}
        >
            <Text style={{fontWeight: '300', fontSize:16, color: '#777777aa', alignSelf: 'center'}}>Choose what you opt to.</Text>
            <Text style={{color: '#777777aa', alignSelf: 'center', fontWeight:'100'}}>______________________________________________________</Text>

            <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={onTakePhoto}>
                    <Text style={styles.buttonText}>Take a photo</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.bottomContainer, {marginBottom: 15}]}>
                <TouchableOpacity onPress={onChooseFromLibrary}>
                    <Text style={styles.buttonText}>Choose from library</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomContainer_}>
                <TouchableOpacity onPress={onCancel}>
                    <Text style={[styles.buttonText, {color: '#FCB126'}]}>Cancel</Text>
                </TouchableOpacity>
            </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#777777aa',
    marginLeft: 35,
  },
  inputContainer: {
    width: (width / 2) * 1.7,
    height: height / 17.5,
    borderWidth: 1,
    borderColor: '#fcb126',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  button: {
    width: width / 2 - 50,
    height: height / 15,
    borderRadius: 10,
    backgroundColor: '#fcb126',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  avatar:{
      width:120,
      height:120,
      borderRadius:100,
      borderWidth: 5,
      borderColor: '#fcb126',
      backgroundColor: 'transparent',
      alignSelf: 'center',
      marginTop: 100
  },
  bottomContainer:{
    width: width / 2 + 150,
    height: height / 15,
    borderRadius: 10,
    backgroundColor: '#fcb126',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'center',
  },
  bottomContainer_:{
    width: width / 2 + 150,
    height: height / 15,
    borderRadius: 10,
    borderWidth:1,
    borderColor: '#fcb126',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15
  },

});
