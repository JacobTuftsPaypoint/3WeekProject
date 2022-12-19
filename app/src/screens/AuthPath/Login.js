import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonWithNav from '../../components/ButtonWithNav';

const Login = ({ navigation }) =>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [caps, setCaps] = useState()

    

    return(
    <View>
        <ButtonWithNav text='Home' icon='home' canNavigate={true} route='Splash' />

        <View style={{paddingHorizontal: 20}}>
            <TextInput textContentType='name' maxLength={40} style={styles.textBox} label='Name' mode='outlined' onChangeText={text => {setName(text)}} />

            <TextInput maxLength={40} textContentType='email' style={styles.textBox} label='Email' mode='outlined' onChangeText={text => setEmail(text)} />

            <TextInput maxLength={15} textContentType='password' style={styles.textBox} label='Password' mode='outlined' secureTextEntry={true} onChangeText={text => setPassword(text)} />
        </View>

        <View>
            <ButtonWithNav text='Submit' icon='check' testMsg='Submit' />
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
    }
})

export default Login