import React from 'react';
import { StyleSheet, View } from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const ScreenPrimary = (props) => {
  return (
    <View style={styles.Screen}>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
    Screen:{
        backgroundColor:GlobalStyle.colours.Background,
        flex:1
    }
})

export default ScreenPrimary;