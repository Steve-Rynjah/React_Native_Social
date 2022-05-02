import React,{useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

import {StackNav} from './src/routes/Stack.routes'
import {AppNav} from './src/routes/App.routes'

export default function App(){
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;

  return(
    <SafeAreaProvider>
      <NavigationContainer>
        {!user ? (<StackNav/>) : (<AppNav/>)}
      </NavigationContainer>
    </SafeAreaProvider>
  )
}