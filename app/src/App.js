import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/AuthPath/Register';
import Login from './screens/AuthPath/Login';
import Verify from './screens/AuthPath/Verify';
import Forgot from './screens/AuthPath/Forgot';
import Home from './screens/MainPath/Home';
import Splash from './screens/AuthPath/Splash';
import TopBar from './components/AppBars/TopBar';

const Stack = createNativeStackNavigator()

const App = () =>{
  
  return(
    <NavigationContainer>
      {true == true ? ( 
        <Stack.Navigator initialRouteName='Splash' screenOptions={{
          header: (props) => <TopBar {...props} />
        }}>
          <Stack.Screen name="Splash" component={Splash} initialParams={{title: 'Splash'}} />
          <Stack.Screen name="Register" component={Register} initialParams={{title: 'Register'}}  />
          <Stack.Screen name="Login" component={Login} initialParams={{title: 'Login'}}  />
          <Stack.Screen name="Verify" component={Verify} initialParams={{title: 'Verification'}}  />
          <Stack.Screen name="Forgot" component={Forgot} initialParams={{title: 'Password Reset'}}  />
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
