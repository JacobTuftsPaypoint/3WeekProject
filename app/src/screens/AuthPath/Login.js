import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import TopBar from '../../components/AppBars/TopBar';
import ButtonWithNav from '../../components/Buttons/ButtonWithNav';

const Login = () =>{

    const [name, setName] = useState('')
    const [nameErr, setNameErr] = useState(false)

    const [email, setEmail] = useState('')
    const [emailErr, setEmailErr] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState(false)


    return(
    <View>

        {/* <TopBar title='Login' /> */}

        <View style={{paddingHorizontal: 20}}>
            <TextInput textContentType='name' maxLength={40} style={styles.textBox} label='Name' mode='outlined' error={nameErr} onChangeText={text => {setName(text)}} />

            <TextInput maxLength={40} textContentType='email' style={styles.textBox} label='Email' mode='outlined' error={emailErr} onChangeText={text => {setEmail(text)}} />

            <TextInput maxLength={15} textContentType='password' style={styles.textBox} label='Password' mode='outlined' error={passwordErr} secureTextEntry={true} onChangeText={text => setPassword(text)} />
        </View>

        <View>
            <ButtonWithNav text='Submit' icon='check' testMsg='Submit' onPressIn={ () => {
                {name.length > 0 ? (setNameErr(false)) : (setNameErr(true))}
                {email.length > 0 ? setEmailErr(false) : setEmailErr(true)}
                {password.length > 0 ? setPasswordErr(false) : setPasswordErr(true)}
            }} />
        </View>

        <View style={{flexDirection: 'row'}}>
            <View style={styles.buttonBox}>
                <ButtonWithNav text='Register' icon='account' canNavigate={true} testMsg='Register' route='Register'/>
            </View>
            <View style={styles.buttonBox}>
                <ButtonWithNav text='Forgot' icon='lock-reset' canNavigate={true} testMsg='Forgot' route='Forgot'/>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    textBox: {
        marginVertical: 5
    },
    buttonBox: {
        flexGrow: 1
    }
})

export default Login