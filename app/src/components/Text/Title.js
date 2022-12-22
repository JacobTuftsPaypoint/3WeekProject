import React from 'react';
import { Text , StyleSheet} from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const TitleText = (props) => {
  return (
    <Text style={[styles.text,props.style]}>
        {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
    text: {
      fontSize: 80,
      fontFamily:GlobalStyle.fonts.Display,
      textAlign:'center',
      color:GlobalStyle.colours.Primary
    }
  });

export default TitleText