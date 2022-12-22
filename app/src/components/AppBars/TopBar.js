import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { View } from "react-native";


function TopBar({back, navigation, route}) {
    
    return(
        <Appbar.Header elevated={true} {...Appbar}>
            {back ? ( <Appbar.BackAction onPress={() => {
                navigation.goBack()
            }} />) : null }
            <Appbar.Content title={route.params.title} />
            <Appbar.Action icon='dots-vertical' onPress={() => {console.log("Options")}}/>
        </Appbar.Header>
    )
}

export default TopBar