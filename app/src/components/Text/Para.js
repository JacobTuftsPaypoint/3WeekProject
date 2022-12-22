import React from 'react';
import { Text , StyleSheet} from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const ParaText = (props) => {
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
      color:GlobalStyle.colours.TextColourSecondary,
      marginHorizontal:10
    }
  });

export default ParaText