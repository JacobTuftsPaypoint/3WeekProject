import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const ButtonFilledSecondary = (props) => {
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
    backgroundColor: GlobalStyle.colours.Secondary,
    padding: 5,
    borderRadius:5,
  },
  buttonText: {
    color: GlobalStyle.colours.TextColour,
    fontSize:20,
    alignSelf:'center',
  },
});

export default ButtonFilledSecondary;

// <ButtonFilledSecondary onPress={() => console.log('Button pressed')} title="Press me" />