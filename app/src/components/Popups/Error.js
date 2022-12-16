import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GlobalStyle from '../../Styles/GlobalStyle';

const Error = (props) => {
    if (props.state != "") {
        return(
            <View style={styles.Container}>
                <Text style={styles.text}>{props.state}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container:{
        backgroundColor:GlobalStyle.colours.Negative,
        borderRadius:5,
        marginHorizontal:"5%",
        padding:10
    },
    text:{
        color:GlobalStyle.colours.TextColour,
        fontFamily:GlobalStyle.fonts.Bold,
        fontSize:15
    }
})

export default Error;