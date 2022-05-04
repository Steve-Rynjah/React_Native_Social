import React, {useLayoutEffect} from 'react';
import {View,Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import {Images} from '../../assets'
import {Card} from '../components/Card.component'


export const Home = ({navigation}) => {
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

    return(
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView contentContainerStyle={{paddingBottom: 45, marginTop:-10}} showsVerticalScrollIndicator={false}>
                <Card 
                    avatar={'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'}
                    displayName={'Bunny'}
                    timestamp={'7hr'}
                    image={'https://www.newsbtc.com/wp-content/uploads/2022/04/bitcoin-9.jpeg'}   
                    feed={'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'} 
                    />  

                <Card 
                    avatar={'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'}
                    displayName={'Bunny'}
                    timestamp={'7hr'}
                    image={'https://www.newsbtc.com/wp-content/uploads/2022/04/bitcoin-9.jpeg'}   
                    feed={'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'} 
                    /> 
            </ScrollView>

            

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