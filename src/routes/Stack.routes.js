import React from "react";
import {createStackNavigator} from '@react-navigation/stack'

import {Login} from '../screen/Login.screen'
import {Register} from '../screen/Register.screen'


const Stack = createStackNavigator();

export const StackNav = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}