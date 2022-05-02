import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home} from '../screen/Home.screen';
import {ChatRoom} from '../screen/ChatRoom.screen'

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
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/home.png')}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
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
                source={require('../../assets/chat.png')}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
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
    bottom: 15,
    left: 20,
    right: 20,
    elevation: 5,
    backgroundColor: '#fcb126',
    borderRadius: 15,
    height: 65,
    shadowColor: '#fcb126',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
});
