import React from "react";
import { Button, StyleSheet, View } from "react-native";

export default function Main({ navigation }) {
  const onclick = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.container}>
      <Button onPress={onclick} title="Learn More" color="#841584" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
