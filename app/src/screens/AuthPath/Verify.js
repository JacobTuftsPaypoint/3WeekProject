import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonFilled from '../../components/Buttons/ButtonFilled';
import Input from '../../components/Inputs/TextInput';
import Error from '../../components/Popups/Error';
import ScreenPrimary from '../../components/Screens/ScreenPrimary';
import ScreenSecondary from '../../components/Screens/ScreenSecondary';
import ParaTextSecondary from '../../components/Text/ParaSecondary';
import TitleText from '../../components/Text/Title';
import HandleForget from '../../logic/HandleForget';


 
const Login = ({navigation}) =>{
    const [UsernameValue, SetUsernameValue] = useState('');
    const [ErrorValue, SetErrorValue] = useState('');

    return(
        <ScreenPrimary>
            <TitleText style={styles.Title}>Forgot    Password</TitleText>
            <ScreenSecondary style={styles.Desc}>
                <ParaTextSecondary>If you can't remember the password to your ODD account enter the email or username associated with the account below and a recovery email will be sent to you</ParaTextSecondary>
            </ScreenSecondary>
            <Input style={styles.Input} placeholder="Username/Email" onChangeText={(text)=>{SetUsernameValue(text)}}/>
            <Error state={ErrorValue}/>
            <View style={styles.ButtonHolder}>
                <ButtonFilled style={styles.Button} title="Recover" onPress={()=>{
                    HandleForget(UsernameValue,SetErrorValue)
                }}/>
            </View>
        </ScreenPrimary>
    )
    
}

const styles = StyleSheet.create({
    Title:{
        fontSize:50,
        marginBottom:40
    },
    Input:{
        marginHorizontal:"5%",
        marginVertical:10
    },
    Button:{
        marginHorizontal:"10%",
        marginVertical: 5,
        padding:20
    },
    ButtonHolder:{
        marginTop:40
    },
    Desc:{
        margin:"5%",
        borderRadius:5,
        padding:5,
        flex:0
    }
})

export default Login