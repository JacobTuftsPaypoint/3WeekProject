import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonFilled from '../../components/Buttons/ButtonFilled';
import Input from '../../components/Inputs/TextInput';
import Error from '../../components/Popups/Error';
import ScreenPrimary from '../../components/Screens/ScreenPrimary';
import TitleText from '../../components/Text/Title';
import HandleRegister from '../../logic/HandleRegister';

const Register = ({navigation}) =>{
    const [UsernameValue, SetUsernameValue] = useState('');
    const [EmailValue,SetEmailValue] = useState("")
    const [PasswordValue, SetPasswordValue] = useState('');
    const [ConfirmPasswordValue, SetConfirmPasswordValue] = useState('');
    const [ErrorValue, SetErrorValue] = useState('');
    
    return(
        <ScreenPrimary>
            <TitleText style={styles.Title}>Register</TitleText>
            <Input style={styles.Input} placeholder="Email" onChangeText={(text)=>{SetEmailValue(text)}}/>
            <Input style={styles.Input} placeholder="Username" onChangeText={(text)=>{SetUsernameValue(text)}}/>
            <Input style={styles.Input} placeholder="Password" onChangeText={(text)=>{SetPasswordValue(text)}}/>
            <Input style={styles.Input} placeholder="Confirm Password" onChangeText={(text)=>{SetConfirmPasswordValue(text)}}/>
            <Error state={ErrorValue}/>
            <View style={styles.ButtonHolder}>
                <ButtonFilled style={styles.Button} title="Register" onPress={()=>{
                    HandleRegister(UsernameValue,PasswordValue,ConfirmPasswordValue,EmailValue,SetErrorValue)
                }}/>
            </View>
        </ScreenPrimary>
    )
    
}

const styles = StyleSheet.create({
    Title:{
        fontSize:60,
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
    }
})

export default Register