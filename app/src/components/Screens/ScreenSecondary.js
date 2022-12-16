import React from 'react';
import { StyleSheet, View } from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const ScreenSecondary = (props) => {
  return (
    <View style={[styles.Screen,props.style]}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
    Screen:{
        flex:1,
        backgroundColor:GlobalStyle.colours.BackgroundSecondary
    }
})

export default ScreenSecondary;