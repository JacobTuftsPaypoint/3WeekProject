import React from 'react';
import { View } from 'react-native';
import ButtonFilled from '../../components/Buttons/ButtonFilled';
import ButtonFilledSecondary from '../../components/Buttons/ButtonFilledSecondary';
import ButtonOutline from '../../components/Buttons/ButtonOutline';
import ButtonOutlineSecondary from '../../components/Buttons/ButtonOutlineSecondary';
import ScreenPrimary from '../../components/Screens/ScreenPrimary';


const Splash = () =>{
    console.log("sus")
    return(
        <ScreenPrimary>
            <ButtonFilled onPress={() => console.log('Button pressed')} title="Press me" />
            <ButtonOutline onPress={() => console.log('Button pressed')} title="Press me" />
            <ButtonFilledSecondary onPress={() => console.log('Button pressed')} title="Press me" /> 
            <ButtonOutlineSecondary onPress={() => console.log('Button pressed')} title="Press me" />
        </ScreenPrimary>
    )
    
}

export default Splash