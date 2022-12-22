import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const ButtonFilledNegative = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button,props.style]}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyle.colours.Negative,
    padding: 5,
    borderRadius:5,
  },
  buttonText: {
    color: GlobalStyle.colours.TextColour,
    fontFamily:GlobalStyle.fonts.Bold,
    fontSize:20,
    alignSelf:'center',
  },
});

export default ButtonFilledNegative;

// <ButtonFilledNegative onPress={() => console.log('Button pressed')} title="Press me" />