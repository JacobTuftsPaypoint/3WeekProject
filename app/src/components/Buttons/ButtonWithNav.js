import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button } from "react-native-paper";

const ButtonWithNav = (props) => {
    const navigation = useNavigation()
    return(
        <View style={{padding: 20}}>
            <Button icon={props.icon} mode='contained' onPress={() => {
                console.log(props.testMsg);
                {props.canNavigate ? navigation.navigate(props.route) : console.log("cant naviagte")}
                }}>
                {props.text}
            </Button>
        </View>
    )
}

    // List of props for ButtonWithNav:
    // type Boolean: canNavigate
    //-----------------------------
    //Type String: 
    //route (if canNavigate is true then the button can navigate to a new page, name of said page should be defined in App.js),
    // icon (Name of MaterialcommuniyIcon that you want. List of their names can be found here under 'see the list of supported icons' : https://callstack.github.io/react-native-paper/icons.html),
    // text (what text to display on the button),
    // testMsg (console.log value for testing/debugging purposes), 

export default ButtonWithNav