import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/AuthPath/Register';
import Login from './screens/AuthPath/Login';
import Verify from './screens/AuthPath/Verify';
import Forgot from './screens/AuthPath/Forgot';
import Home from './screens/MainPath/Home';
import Splash from './screens/AuthPath/Splash';

const Stack = createNativeStackNavigator()

const App = () =>{
  
  return(
    <NavigationContainer>
      {true == true ? ( 
        <Stack.Navigator initialRouteName='Splash'>
          <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="Verify" component={Verify} options={{headerShown: false}}/>
          <Stack.Screen name="Forgot" component={Forgot} options={{headerShown: false}}/>
        </Stack.Navigator>
      ):(
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        </Stack.Navigator>
      )}
      
    </NavigationContainer>
  )
}

export default App;
