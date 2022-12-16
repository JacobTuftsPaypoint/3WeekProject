import React from 'react';
import { StyleSheet, View } from 'react-native';
import ButtonFilled from '../../components/Buttons/ButtonFilled';
import ScreenPrimary from '../../components/Screens/ScreenPrimary';
import ParaTextSecondary from '../../components/Text/ParaSecondary';
import TitleText from '../../components/Text/Title';
import GlobalStyle from '../../Styles/GlobalStyle';

const Splash = ({navigation}) =>{
    return(
        <ScreenPrimary>
            <TitleText>Odd App</TitleText>
            <View style={styles.Buttons}>
                <View style={styles.Holder}>
                    <ButtonFilled title="Login" onPress={()=>{navigation.navigate("Login")}}/>
                </View>
                <View style={styles.Holder}>
                    <ButtonFilled title="Register" onPress={()=>{navigation.navigate("Register")}}/>
                </View>
                <View style={styles.TextHolder}>
                    <ParaTextSecondary>This app currently serves no purpose and probably never will, we made it anyway though.</ParaTextSecondary>
                </View>
                
            </View>
        </ScreenPrimary>
    )
    
}

const styles = StyleSheet.create({
    Buttons:{
        flex:1,
        alignContent:"flex-start",
    },
    Holder:{
        height:80,
        paddingHorizontal:"10%"
    },
    TextHolder:{
        backgroundColor:GlobalStyle.colours.BackgroundSecondary,
        borderRadius:5,
        marginHorizontal:"5%",
        padding:10
    },
})

export default Splash