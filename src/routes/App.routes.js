import React from "react";
import {createStackNavigator} from '@react-navigation/stack'

import {TabNav} from './Tab.routes'
import {Chat} from '../screen/Chat.screen'

const Stack = createStackNavigator();

export const AppNav = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="TabNav" component={TabNav} options={{headerShown: false}}/>
            <Stack.Screen name="Chat" component={Chat}/>
        </Stack.Navigator>
    )
}