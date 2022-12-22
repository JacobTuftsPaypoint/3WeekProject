import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const Input = (props) => {
  return (
    <TextInput placeholder={props.placeholder} style={[styles.input,props.style]} onChangeText={props.onChangeText}/>
  );
}

const styles = StyleSheet.create({
    input:{
        borderColor:GlobalStyle.colours.BackgroundSecondary,
        fontFamily:GlobalStyle.fonts.Standard,
        borderWidth:2,
        borderRadius:5,
        fontSize:20
    }
  });

export default Input
