import React from 'react';
import { View } from 'react-native';
import ButtonWithNav from '../../components/Buttons/ButtonWithNav';

const Splash = ({navigation}) =>{
    console.log("sus")
    return(
        <View>
            <ButtonWithNav text='Login' icon='login' testMsg='Button pressed' canNavigate={true} route='Login' />
            <ButtonWithNav text='Register' icon='account-plus-outline' testMsg='Button pressed' canNavigate={true} route='Login' style={{marginTop: -20}} />
        </View>
    )
    
}

export default Splash