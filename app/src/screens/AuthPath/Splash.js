import React from 'react';
import { View } from 'react-native';
import ButtonWithNav from '../../components/Buttons/ButtonWithNav';

const Splash = ({navigation}) =>{
    console.log("sus")
    return(
        <View>
            <ButtonWithNav text='Login' icon='login' testMsg='Button pressed' route='Login' />
        </View>
    )
    
}

export default Splash