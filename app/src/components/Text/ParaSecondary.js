import React from 'react';
import { Text , StyleSheet} from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const ParaTextSecondary = (props) => {
  return (
    <Text style={[styles.text,props.style]}>
        {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      fontFamily:GlobalStyle.fonts.Standard,
      color:GlobalStyle.colours.TextColour,
      marginHorizontal:10
    }
  });

export default ParaTextSecondary