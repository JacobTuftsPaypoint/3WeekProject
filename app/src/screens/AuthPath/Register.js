import React, {useState} from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import TopBar from '../../components/AppBars/TopBar';
import ButtonWithNav from '../../components/Buttons/ButtonWithNav';

const Register = () =>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState(false)

    return(
        <View>
            {/* <TopBar title='Register' /> */}

            <View style={{paddingHorizontal: 20}}>
                <TextInput textContentType='name' maxLength={40} style={{marginVertical: 5}} label='Name' mode='outlined' onChangeText={text => {setName(text)}} />

                <TextInput maxLength={40} textContentType='email' style={{marginVertical: 5}} label='Email' mode='outlined' onChangeText={text => setEmail(text)} />
                <TextInput maxLength={40} textContentType='email' style={{marginVertical: 5}} label='Confirm Email' mode='outlined' error={emailErr} onChangeText={text => {text == email ? setEmailErr(false) : setEmailErr(true)}} />

                <TextInput 
                    maxLength={15} 
                    textContentType='password' 
                    style={{marginVertical: 5}} 
                    label='Password' 
                    mode='outlined' 
                    secureTextEntry={true} 
                    onChangeText={text => setPassword(text)} 
                />

                <TextInput 
                    maxLength={15} 
                    textContentType='password' 
                    style={{marginVertical: 5}} 
                    label='Confirm Password' mode='outlined' 
                    secureTextEntry={true} 
                    error={passwordErr} 
                    onChangeText={text => {text == password ? setPasswordErr(false) : setPasswordErr(true)}} 
                />
            </View>
            <View>
                <ButtonWithNav text='submit' icon='check' textMsg='submit' />
            </View>
        </View>
    )
}

export default Register