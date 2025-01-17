import React, { useCallback, useContext, useMemo } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import createStyles from "./ProfileScreenStyle";
import { useTheme } from "@react-navigation/native";
import { AuthContext } from "context/AuthContext";
import * as NavigationService from "react-navigation-helpers";
import { APP_THEME, SCREENS } from "@shared-constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { translations } from "shared/localization";
import HeaderTitle from "@shared-components/HeaderTitle/HeaderTitle";
import THEME from "@assets/images/theme.svg";
import MORE_MENU from "@assets/images/more_menu.svg";
import AVATAR_2 from "assets/images/avatar_2.svg";
import Button from "@shared-components/Button/Button";
import TabSwitcher from "@shared-components/TabSwitcher/TabSwitcher";
import TrendingItems from "@screens/home/components/TrendingItems/TrendingItems";
import LoginPlaceHolder from "@shared-components/LoginPlaceHolder/LoginPlaceHolder";

const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {signOut, authData, applyTheme, appTheme} = useContext(AuthContext)
  const {
    container, 
    subContainer, 
    touchableBtn, 
    view, 
    row, 
    profileContainer, 
    btnStyle, 
    btnTextStyle, 
    nameTextStyle, 
    descTextStyle,
    divider
  } = styles;

  const logOut = () =>{
    Alert.alert(  
      translations.titleSignOut,  
      translations.msgSignOut,  
      [  
          {  
              text: translations.cancel,  
              style: 'cancel',  
          },  
          {text: translations.yes, onPress: () => {
            signOut();
            NavigationService.navigate(SCREENS.SIGNIN);}
          }
      ]  
  )}
  const changeTheme = useCallback(() =>{
    applyTheme(appTheme === APP_THEME.LIGHT && APP_THEME.DARK || APP_THEME.LIGHT)
  },[appTheme])

  return (
    <SafeAreaView style={container}>
      {
        authData && authData?.isLoggedIn ? (
          <View style={subContainer}>
          <View style={row}>
            <View style={view}><HeaderTitle title={translations.myProfileTitle}/></View>
            <TouchableOpacity style={touchableBtn} onPress={()=> changeTheme()}><THEME /></TouchableOpacity>
            <TouchableOpacity style={touchableBtn} onPress={()=> logOut()}><MORE_MENU /></TouchableOpacity>
          </View>
          <View style={profileContainer}>
              <AVATAR_2 height={100} width={100}/>
              <Button title={translations.editProfile} buttonStyle={btnStyle} titleStyle={btnTextStyle}/>
          </View>
          {authData && authData?.isLoggedIn && authData?.name && authData.name && (
            <View>
              <Text style={nameTextStyle}>{authData?.name}</Text>
              <Text style={descTextStyle}>{translations.formatString(translations.bio, authData?.name)}</Text>
            </View>
          )}
          <View style={divider}/>
          <TabSwitcher tab1={translations.tabVideos} tab2={translations.tabRecipies}/>
          <TrendingItems showTitle={false} isHorizontal={false}/>
      </View>
        ) :(
          <LoginPlaceHolder message={translations.loginPlaceholder}/>
        )
      }
      
    </SafeAreaView>
  );
};

export default ProfileScreen;
