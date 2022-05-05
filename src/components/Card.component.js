import React from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {Avatar} from '@rneui/themed'
import auth from '@react-native-firebase/auth';

export const Card = ({timestamp,image,feed}) => {
    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Avatar rounded source={{uri: auth().currentUser.photoURL}} size={50}/>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.displayName}>{auth().currentUser.displayName}</Text>
                    <Text style={styles.timestamp}>{timestamp}</Text>
                </View>
            </View>
            <View style={{width: '100%', height: 300, marginTop: 10}}>
                <Image source={{uri: image}} resizeMode='cover' style={styles.image}/>
            </View>
            <Text style={styles.displayName}>{auth().currentUser.displayName}{'   '}<Text style={styles.feed}>{feed}</Text></Text>
            <View style={styles.footerContainer}>
                <Image source={require('../../assets/heart.png')} resizeMode='contain' style={styles.icon}/>
                <Text style={styles.text}>Likes</Text>
                <Image source={require('../../assets/comment.png')} resizeMode='contain' style={styles.icon} />
                <Text style={styles.text}>Comment</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 455,
        backgroundColor: '#fff',
        elevation: 1,
        marginTop:5
    },
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop:10,
        paddingLeft:10
    },
    footerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop:10,
        paddingLeft:10
    },
    displayName:{
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(0,0,0,0.8)',
        marginLeft: 10,
        marginTop:5
    },
    timestamp:{
        fontSize: 11,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.3)',
        marginLeft: 10
    },
    feed:{
        fontSize: 12,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.5)',
        marginLeft: 10
    },
    image:{
        flex:1
    },
    icon:{
        width:22.5,
        height:22.5
    },
    text:{
        fontSize: 12,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.7)',
        marginLeft:5,
        marginRight:10
    }
})