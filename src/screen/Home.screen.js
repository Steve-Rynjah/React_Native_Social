import React, {useLayoutEffect} from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';




export const Home = ({navigation}) => {
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Home",
            headerStyle: {backgroundColor: '#fff'},
            headerTitleStyle: {color: '#fcb126', fontSize: 22},
            headerTitleAlign: 'center',
            // headerRight: () => (
            //     <View style={styles.avatar}>
            //         <Image source={{uri: user ? user : 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg'}} style={styles.avatar}/>
            //     </View>
            // )
        })
    },[navigation])

    return(
        <View style={{flex: 1, backgroundColor: '#fff', justifyContent:'center', alignItems:'center'}}>

        </View>
    )
}