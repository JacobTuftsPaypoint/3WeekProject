import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

const PasswordField = (props) => {
    const confirmation = props.confirmation

    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState(false)
    const [passwordErrMsg, setPasswordErrMsg] = useState('')
    const [showPass, setShowPass] = useState(true)

    const [confirmPass, setConfirmPass] = useState('')
    const [confirmPassErr, setConfirmPassErr] = useState(false)
    const [confirmPassErrMsg, setConfirmPassErrMsg] = useState('')
    const [showPass2, setShowPass2] = useState(true)

    return (
        <View>
            <TextInput 
                {...props}
                label='Password Test'
                textContentType='password'
                mode='outlined'
                style={{marginVertical: 5}}
                error={passwordErr}
                secureTextEntry={showPass}

                right={<TextInput.Icon  icon={!showPass ? 'eye' : 'eye-off'} onPress={() => {
                    {showPass == false ? setShowPass(true) : setShowPass(false)}
                } }/>}

                onChangeText={text => 
                    {setPassword(text); setPasswordErr(false)}
                } 

                onEndEditing={(text) => {
                    { text.nativeEvent.text.length == 0 ?
                        (setPasswordErr(true)) :
                        (setPasswordErr(false))
                    }
                }}
            />
            {   passwordErr ?
                (
                    <HelperText type='error' >
                        {passwordErrMsg}
                    </HelperText>
                ) 
                : 
                (
                    null
                )
            }
            

            {
                confirmation ?
                (
                    <View>
                        <TextInput 
                            label='Confirm Password'
                            maxLength={15} 
                            textContentType='password' 
                            style={{marginVertical: 5}}  
                            mode='outlined'
                            error={confirmPassErr}
                            secureTextEntry={showPass2}
                            right={<TextInput.Icon  icon={!showPass2 ? 'eye' : 'eye-off'} onPress={() => {
                                {showPass2 == false ? setShowPass2(true) : setShowPass2(false)}
                            } }/>}

                            onEndEditing={(text1) => {
                                { text1.nativeEvent.text == password ?
                                    (
                                        setConfirmPassErr(false),
                                        setConfirmPassErrMsg()
                                    ) 
                                    :
                                    (
                                        setConfirmPassErr(true),
                                        setConfirmPassErrMsg("Passwords don't Match")
                                    )
                                }
                            }}
                        />

                    {   confirmPassErr ?
                        (
                            <HelperText type='error'>
                                {confirmPassErrMsg}
                            </HelperText>
                        ) 
                        : 
                        (
                            null
                        )
                    }
                    </View>
                ) 
                :
                (
                    null
                )
            }
        </View>
    )
}

export default PasswordField