import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from '../../components/AppBars/TopBar';
import { HelperText, Text, TextInput } from 'react-native-paper';
import ButtonWithNav from '../../components/Buttons/ButtonWithNav';


const Forgot = () =>{

    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState(false)

    const [inputErr, setInputErr] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [canNavigate, setCanNavigate] = useState(false)

    function ValidateInput(input) {
        if(!input.includes('@')) {
            setErrorText('Please Enter a Valid Email Address')
            setInputErr(true)
            setCanNavigate(false)
        } else {
            setCanNavigate(true)
        }
    }

    return(
        <View>
            <View style={{paddingHorizontal: 20, paddingTop: 20}}>
                <Text variant='bodyLarge'>Please Enter the Email Associated With Your Account</Text>
                <TextInput 
                    maxLength={40} 
                    textContentType='email' 
                    style={{marginVertical: 5}} 
                    label='Email' 
                    mode='outlined' 
                    error={emailErr} 
                    onChangeText={(text) => {
                        setEmail(text)
                        setInputErr(false)
                    }} />
                <HelperText type='error' visible={inputErr} >{errorText}</HelperText>
            </View>
            <ButtonWithNav text='submit' icon='check' textMsg='submit' canNavigate={canNavigate} route='Verify' onPressIn={() => {
                ValidateInput(email)
            }} />
        </View>
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

export default Forgot