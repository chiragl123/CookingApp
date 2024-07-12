import React, { useMemo } from "react";
import { FlatList, Image, Text, View } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import createStyles from "./HomeScreenStyle";
import CardItem from "./components/card-item/CardItem";
import MockData from "./mock/MockData";
import fonts from "@fonts";
import { useTheme } from "@react-navigation/native";
import { SCREENS } from "@shared-constants";

const profileURI =
  // eslint-disable-next-line max-len
  "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80";

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleItemPress = () => {
    NavigationService.push(SCREENS.DETAIL);
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const renderMenuButton = () => (
    <Icon
      name="menu"
      type={IconType.Ionicons}
      color={colors.iconBlack}
      size={30}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {renderMenuButton()}
      <Image
        resizeMode="cover"
        source={{ uri: profileURI }}
        style={styles.profilePicImageStyle}
      />
    </View>
  );

  const renderList = () => (
    <View style={styles.listContainer}>
      <FlatList
        data={MockData}
        renderItem={({ item }) => (
          <CardItem data={item} onPress={handleItemPress} />
        )}
      />
    </View>
  );

  const renderWelcome = () => (
    <>
      <Text style={{color: colors.text}}>Hello Kuray</Text>
      <Text style={{color: colors.placeholder, fontFamily: fonts.montserrat.lightItalic}}>
        Welcome Back
      </Text>
    </>
  );

  const renderContent = () => (
    <View style={styles.contentContainer}>
      {renderWelcome()}
      {renderList()}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
};

export default HomeScreen;
