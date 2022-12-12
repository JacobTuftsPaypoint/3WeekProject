import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const ButtonOutline = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "##ffffff00",
    borderColor:GlobalStyle.colours.Primary,
    padding: 5,
    borderRadius:10,
    borderWidth:2
  },
  buttonText: {
    color: GlobalStyle.colours.Primary,
    fontSize:20,
    alignSelf:'center',
  },
});

export default ButtonOutline;

// <ButtonOutline onPress={() => console.log('Button pressed')} title="Press me" />