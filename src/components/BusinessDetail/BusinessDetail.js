import { HeaderBackButton } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function BusinessDetail({ navigation }) {
  const selectedBusiness = useSelector((state) => state.business.selectedBusiness);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} title="BusinessDetail" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {selectedBusiness &&
        <Text>{selectedBusiness.key}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    padding: 10,
  },
});