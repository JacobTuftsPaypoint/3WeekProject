import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const ButtonFilled = (props) => {
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
    backgroundColor: GlobalStyle.colours.Primary,
    padding: 5,
    borderRadius:10,
  },
  buttonText: {
    color: GlobalStyle.colours.TextColour,
    fontSize:20,
    alignSelf:'center',
  },
});

export default ButtonFilled;

// <ButtonFilled onPress={() => console.log('Button pressed')} title="Press me" />