import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonFilled from '../../components/Buttons/ButtonFilled';
import Input from '../../components/Inputs/TextInput';
import Error from '../../components/Popups/Error';
import ScreenPrimary from '../../components/Screens/ScreenPrimary';
import TitleText from '../../components/Text/Title';
import HandleLogin from '../../logic/HandleLogin';

const Login = ({navigation}) =>{
    const [UsernameValue, SetUsernameValue] = useState('');
    const [PasswordValue, SetPasswordValue] = useState('');
    const [ErrorValue, SetErrorValue] = useState('');

    return(
        <ScreenPrimary>
            <TitleText style={styles.Title}>Login</TitleText>
            <Input style={styles.Input} placeholder="Username/Email" onChangeText={(text)=>{SetUsernameValue(text)}}/>
            <Input style={styles.Input} placeholder="Password" onChangeText={(text)=>{SetPasswordValue(text)}}/>
            <Error state={ErrorValue}/>
            <View style={styles.ButtonHolder}>
                <ButtonFilled style={styles.Button} title="Login" onPress={()=>{
                    HandleLogin(UsernameValue,PasswordValue,SetErrorValue)
                }}/>
                <ButtonFilled style={styles.Button} title="Forgot Password" onPress={()=>{navigation.navigate("Forgot")}}/>
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

export default Login