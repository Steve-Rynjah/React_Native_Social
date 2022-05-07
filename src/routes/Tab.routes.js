import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Images} from '../../assets'

import {Home} from '../screen/Home.screen';
import {ChatRoom} from '../screen/ChatRoom.screen';
import {Setting} from '../screen/Setting.screen';

const Tab = createBottomTabNavigator();

export const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.bottomTabContainer,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle:'',
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={Images.home}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? '#ffffff' : '#f1f1f1aa',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen name="ChatRoom" component={ChatRoom} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={Images.chat}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? '#ffffff' : '#f1f1f1aa',
                }}
              />
            </View>
          ),
        }}/>
      <Tab.Screen name="Setting" component={Setting} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={Images.profile}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                  tintColor: focused ? '#ffffff' : '#f1f1f1aa',
                }}
              />
            </View>
          ),
        }}/>  
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5,
    backgroundColor: '#fcb126',
    // borderTopLeftRadius:15,
    // borderTopRightRadius:15,
    height: 55,
    shadowColor: '#fcb126',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
});
