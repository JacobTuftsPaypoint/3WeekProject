import React from 'react';
import ButtonFilled from '../../components/Buttons/ButtonFilled';
import ButtonFilledNegative from '../../components/Buttons/ButtonFilledNegative';
import ButtonFilledSecondary from '../../components/Buttons/ButtonFilledSecondary';
import ButtonOutline from '../../components/Buttons/ButtonOutline';
import ButtonOutlineSecondary from '../../components/Buttons/ButtonOutlineSecondary';
import TextInput from '../../components/Inputs/TextInput';
import ScreenPrimary from '../../components/Screens/ScreenPrimary';
import ParaText from '../../components/Text/Para';
import TitleText from '../../components/Text/Title';

const Splash = () =>{
    console.log("sus")
    return(
        <ScreenPrimary>
            <ButtonFilled onPress={() => console.log('Button pressed')} title="Press me" />
            <ButtonOutline onPress={() => console.log('Button pressed')} title="Press me" />
            <ButtonFilledSecondary onPress={() => console.log('Button pressed')} title="Press me" /> 
            <ButtonOutlineSecondary onPress={() => console.log('Button pressed')} title="Press me" />
            <ButtonFilledNegative onPress={() => console.log('Button pressed')} title="Negative" />
            <TextInput placeholder="Input element"/>
            <TitleText>Title</TitleText>
            <ParaText>This is a paragraph of text that can span multiple lines but allows more global configuration than the standard react native text element</ParaText>
        </ScreenPrimary>
    )
    
}

export default Splash