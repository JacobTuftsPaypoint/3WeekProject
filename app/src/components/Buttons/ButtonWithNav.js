import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const ButtonWithNav = (props) => {
    const navigation = useNavigation()

    return(
        <View style={{padding: 20}}>
            <Button icon={props.icon} mode='contained' onPress={() => {
                {props.testMsg !== undefined ? console.log(props.testMsg) : null }
                {props.route !== undefined && props.canNavigate == true ? navigation.navigate(props.route) : console.log("cant naviagte")}
                }} {...props}
            >
                {props.text !== undefined && props.text}
            </Button>
        </View>
    )
}

    // List of props for ButtonWithNav:
    // type Boolean: canNavigate
    // this needs to be true to enable navigation to a new page
    //-----------------------------
    // Type String: 
    // route (if canNavigate is true then the button can navigate to a new page, name of said page should be defined in App.js),
    // icon (Name of MaterialcommuniyIcon that you want. List of their names can be found here under 'see the list of supported icons' : https://callstack.github.io/react-native-paper/icons.html),
    // text (what text to display on the button),
    // testMsg (console.log value for testing/debugging purposes), 

    // Note: Use onPressIn or onPressOut instead of onPress.
    // Note: This button can use the props of the react-native-paper Button
    // --> Link for more info about the react-native-paper button --> https://callstack.github.io/react-native-paper/button.html

export default ButtonWithNav