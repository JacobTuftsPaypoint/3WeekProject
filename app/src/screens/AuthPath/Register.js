import React, {useState} from 'react';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import TopBar from '../../components/AppBars/TopBar';
import ButtonWithNav from '../../components/Buttons/ButtonWithNav';

const Register = () =>{

    const [name, setName] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [nameErrMsg, setNameErrMsg] = useState('')

    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState(false)
    const [emailErrMsg, setEmailErrMsg] = useState('')

    const [emailErr2, setEmailErr2] = useState(false)
    const [emailErrMsg2, setEmailErrMsg2] = useState('')

    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState(false)
    const [passwordErrMsg, setPasswordErrMsg] = useState('')

    const [passwordErr2, setPasswordErr2] = useState(false)
    const [passwordErrMsg2, setPasswordErrMsg2] = useState('')

    const [canNavigate, setCanNavigate] = useState(false)

    function ValidateForm(name, email, password) {
        if(name.length == 0) {
            setNameErrMsg('Please Enter Your Name')
            setNameErr(true)
        } 

        if (email.length == 0 && !email.includes('@')) {
            setEmailErrMsg('Please Enter Your Email')
            setEmailErr(true)
            setEmailErrMsg2('Please Make Sure That Your Emails Match')
            setEmailErr2(true)
        }

        if (password.length == 0) {
            setPasswordErrMsg('Please Enter Your Password')
            setPasswordErr(true)
            setPasswordErrMsg2('Please Make Sure That Your Passwords Match')
            setPasswordErr2(true)
        }

        if(password.length > 0 && name.length > 0 && email.length > 0) {
            setCanNavigate(true)
        }

    }

    return(
        <View>

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
                <HelperText type='error' visible={nameErr}>{nameErrMsg}</HelperText>

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
                <HelperText type='error' visible={emailErr}>{emailErrMsg}</HelperText>

                <TextInput 
                    label='Confirm Email'
                    maxLength={40} 
                    textContentType='email' 
                    style={{marginVertical: 5}} 
                    mode='outlined' 
                    error={emailErr2} 
                    onChangeText={text => 
                        {text == email ? setEmailErr2(false) : setEmailErr2(true), setCanNavigate(false)}
                    } 
                />
                <HelperText type='error' visible={emailErr2}>{emailErrMsg2}</HelperText>

                <TextInput 
                    label='Password'
                    maxLength={15} 
                    textContentType='password' 
                    style={{marginVertical: 5}} 
                    mode='outlined' 
                    error={passwordErr}
                    secureTextEntry={true} 
                    onChangeText={text => 
                        {setPassword(text); setPasswordErr(false)}
                    } 
                />
                <HelperText type='error' visible={passwordErr}>{passwordErrMsg}</HelperText>

                <TextInput 
                    label='Confirm Password'
                    maxLength={15} 
                    textContentType='password' 
                    style={{marginVertical: 5}}  
                    mode='outlined' 
                    secureTextEntry={true} 
                    error={passwordErr2} 
                    onChangeText={text => {text == password ? setPasswordErr2(false) : setPasswordErr2(true), setCanNavigate(false)}} 
                />
                <HelperText type='error' visible={passwordErr2}>{passwordErrMsg2}</HelperText>

            </View>
            <View>
                <ButtonWithNav text='submit' icon='check' canNavigate={canNavigate} route='Splash' textMsg='submit' onPressIn={() => {
                    ValidateForm(name, email, password)
                }} />
            </View>
        </View>
    )
}

export default Register