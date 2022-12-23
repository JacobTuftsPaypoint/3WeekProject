import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonWithNav from '../../components/Buttons/ButtonWithNav';
import { Button as PaperButton } from 'react-native-paper';

const Splash = ({navigation}) =>{
    console.log("sus")
    return(
        <View>
            <ButtonWithNav text='Login' icon='login' testMsg='Button pressed' canNavigate={true} route='Login' />
            <ButtonWithNav text='Register' icon='account-plus-outline' testMsg='Button pressed' canNavigate={true} route='Register' style={{marginTop: -20}} />
            <ButtonWithNav text='Home' icon='home' testMsg='Home' canNavigate={true} route='Home' style={{marginTop: -20}} />
        </View>
    )
    
}

const styles = StyleSheet.create({
    Buttons:{
        flex:1,
        alignContent:"flex-start",
    },
    Holder:{
        height:80,
        paddingHorizontal:"10%"
    },
    TextHolder:{
        borderRadius:5,
        marginHorizontal:"5%",
        padding:10
    },
})

export default Splash