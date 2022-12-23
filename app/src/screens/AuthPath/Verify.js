import React, { useState} from 'react';
import { View, TextInput as ReactTextInput, StyleSheet} from 'react-native';
import { HelperText, Text, TextInput } from 'react-native-paper';
import ButtonWithNav from '../../components/Buttons/ButtonWithNav';

const Verify = () =>{

    const [verificationErr, setVerificationErr] = useState(false)
    
    const [value1, setValue] = useState('')

    const [inputErr, setInputErr] = useState(false)
    const [errorText, setErrorText] = useState('')

    const Verification = (input) => {
        if (input.length == 0) {
            setVerificationErr(true),
            setErrorText('Error: Please Enter the Code'),
            setInputErr(true)
            return
        } else if(input.length < 6) {
            setVerificationErr(true),
            setErrorText('Error: Please Enter 6 Digits'),
            setInputErr(true)
            return
        } else {
            console.log(input),
            setVerificationErr(false)
            return
        }
    }

    const HandleInput = (text) => {
        if((text.match(/[^0-9.]+/g))) {
            setErrorText('Error: Numbers Only')
            setInputErr(true)
        } 
        setValue(text.replace(/[^0-9.]+/g, ''))
    }

    return(
    <View>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
            <Text variant='bodyLarge' style={{paddingBottom: 10}}>Please Enter the 6 Digit Code Sent to Your Email</Text>
            <TextInput label='Code' 
                maxLength={6} 
                keyboardType='phone-pad' 
                textContentType='oneTimeCode' 
                mode='outlined' 
                value={value1}
                error={verificationErr} 
                onChange={(input) => {
                    setVerificationErr(false)
                    setInputErr(false)
                    HandleInput(input.nativeEvent.text)
                }}

            />
            <HelperText type='error' visible={inputErr} >{errorText}</HelperText>

        </View>


        <View>
            <ButtonWithNav text='Submit' icon='check' testMsg='Submit Code' onPressIn={() => {
                {Verification(value1)}
                console.log(value1)
            }} style={{marginTop: -15}} />

            <ButtonWithNav text='Resend Verification Code?' icon='email-send-outline' style={{marginTop: -20}}/>
        </View>

    </View>
    )
}

const styles = StyleSheet.create({
    boxes: {
        borderColor: 'black',
        borderWidth: 3,
        textAlign: 'center'
    }
})

export default Verify
