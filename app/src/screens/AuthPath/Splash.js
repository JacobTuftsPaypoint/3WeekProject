import React from 'react';
import { View } from 'react-native';
import ButtonWithNav from '../../components/ButtonWithNav';

const Splash = ({navigation}) =>{
    console.log("sus")
    return(
        <View>
            <ButtonWithNav text='Login' icon='home' testMsg='Button pressed' canNavigate={true} route='Login' />
        </View>
    )
    
}

export default Splash