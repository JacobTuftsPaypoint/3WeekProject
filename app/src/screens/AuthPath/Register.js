import { useFocusEffect } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import ButtonWithNav from '../../components/Buttons/ButtonWithNav';

const Register = () =>{

    // Name Input field
    const [name, setName] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [nameErrMsg, setNameErrMsg] = useState('')

    //Email input field
    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState(false)
    const [emailErrMsg, setEmailErrMsg] = useState('')

    //Confirm Email Stuff
    const [email2, setEmail2] = useState('')
    const [emailErr2, setEmailErr2] = useState(false)
    const [emailErrMsg2, setEmailErrMsg2] = useState('')

    //Password Stuff
    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState(false)
    const [passwordErrMsg, setPasswordErrMsg] = useState('')

    //confirm Password stuff
    const [password2, setPassword2] = useState('')
    const [passwordErr2, setPasswordErr2] = useState(false)
    const [passwordErrMsg2, setPasswordErrMsg2] = useState('')

    //Show Password stuff
    const [showPass, setShowPass] = useState(true)
    const [showPass2, setShowPass2] = useState(true)

    const [error1, setError1] = useState(true)

    //To control whether we can move on to the next page
    const [canNavigate, setCanNavigate] = useState(false)

    async function ValidateForm(Username, Email1, Email2, Password1, Password2) {

        if(Username.length === 0 ) {
            setNameErr(true)
            setNameErrMsg('Please enter your name')
            console.log(4)
        } 

        if(Email1.length === 0) {
            setEmailErr(true)
            setEmailErrMsg('Enter Email')
            console.log(5)
        } 

        if(!Email1.includes("@")) {
            setEmailErr(true)
            setEmailErrMsg('Enter Valid Email')
            console.log(6)   
        } 

        if(Email2.length === 0) {
            setEmailErr2(true)
            setEmailErrMsg2('Enter Email')
            console.log(7) 
        } 

        if(Password1.length < 6) {
            setPasswordErr(true)
            setPasswordErrMsg('Your Password should be at least 6 characters') 
            console.log(3)
        } 

        if(Password2.length < 6) {
            setPasswordErr2(true)
            setPasswordErrMsg2('Your Password should be at least 6 characters')  
            console.log(2)
        } 

        if(Password2 !== Password1) {
            setPasswordErr2(true)
            setPasswordErrMsg2('Password should match')  
            console.log(1)
        }

        if ((Username.length === 0) || (Email1.length === 0) || (Email2.length === 0) || (Password1.length === 0) || (Password2.length === 0)) {
            return false
        } 

        if(nameErr | emailErr | emailErr2 | passwordErr | passwordErr2) {
            return false
        } else {
            return true
        }
    }

    return(
        <ScrollView>

            <View style={{paddingHorizontal: 20}}>

                <TextInput 
                    label='Name' 
                    textContentType='name'
                    maxLength={40} 
                    style={{marginVertical: 5}} 
                    mode='outlined' 
                    error={nameErr} 
                    onChangeText={text => 
                        {setName(text); setNameErr(false)}
                    } 
                />
                { nameErr ? (<HelperText type='error' visible={nameErr}>{nameErrMsg}</HelperText>) : (null)}

                <TextInput 
                    label='Email'
                    maxLength={40} 
                    textContentType='email' 
                    style={{marginVertical: 5}}  
                    mode='outlined' 
                    error={emailErr} 
                    onChangeText={text => 
                        {setEmail(text); setEmailErr(false)}
                    } 
                />
                {emailErr ? (<HelperText type='error' visible={emailErr}>{emailErrMsg}</HelperText>) : (null)}

                <TextInput 
                    label='Confirm Email'
                    maxLength={40} 
                    textContentType='email' 
                    style={{marginVertical: 5}} 
                    mode='outlined' 
                    error={emailErr2} 
                    onEndEditing={text => 
                        {text.nativeEvent.text == email ? (setEmailErr2(false), setEmail2(text.nativeEvent.text)) : setEmailErr2(true),setEmailErrMsg2('Please Make Sure That Your Emails Match') , setCanNavigate(false)}
                    } 
                />
                {emailErr2 ? (<HelperText type='error' visible={emailErr2}>{emailErrMsg2}</HelperText>) : (null)}


                <TextInput 
                    label='Password'
                    maxLength={15} 
                    textContentType='password' 
                    style={{marginVertical: 5}} 
                    mode='outlined' 
                    error={passwordErr}
                    secureTextEntry={showPass} 
                    onChangeText={text => 
                        {setPassword(text); setPasswordErr(false)}
                    } 
                    right={<TextInput.Icon  icon={!showPass ? 'eye' : 'eye-off'} onPress={() => {
                        {showPass == false ? setShowPass(true) : setShowPass(false)}
                    } }/>}
                />
                {passwordErr ? (<HelperText type='error' visible={passwordErr}>{passwordErrMsg}</HelperText>) : (null)}


                <TextInput 
                    label='Confirm Password'
                    maxLength={15} 
                    textContentType='password' 
                    style={{marginVertical: 5}}  
                    mode='outlined' 
                    secureTextEntry={showPass2} 
                    error={passwordErr2} 
                    onEndEditing={(text) => 
                        {text.nativeEvent.text == password ? (setPasswordErr2(false), setPassword2(text.nativeEvent.text)) : setPasswordErr2(true),setPasswordErrMsg2('Please Make Sure That Your Passwords Match'), setCanNavigate(false)}
                    } 
                    right={<TextInput.Icon  icon={!showPass2 ? 'eye' : 'eye-off'} onPress={() => {
                        {showPass2 == false ? setShowPass2(true) : setShowPass2(false)}
                    } }/>}
                />
                {passwordErr2 ? (<HelperText type='error' visible={passwordErr2}>{passwordErrMsg2}</HelperText>) : (null)}


            </View>
            <View>
                <ButtonWithNav text='submit' icon='check' canNavigate={canNavigate} route='Splash' textMsg='submit'  onPressIn={ async () => {
                    {await ValidateForm(name, email, email2, password, password2)}
                }} 
                onPressOut={async () => {
                    {await ValidateForm(name, email, email2, password, password2) ? setCanNavigate(true) : setCanNavigate(false)}
                }}
                />
            </View>
        </ScrollView>
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