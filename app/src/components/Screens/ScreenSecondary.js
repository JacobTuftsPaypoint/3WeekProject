import React from 'react';
import { StyleSheet, View } from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const ScreenSecondary = (props) => {
  return (
    <View style={styles.Screen}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
    Screen:{
        flex:1,
        backgroundColour:GlobalStyle.colours.BackgroundSecondary
    }
})

export default ScreenSecondary;