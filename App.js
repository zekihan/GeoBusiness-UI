import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import Layout from "@components/Layout/Layout";
import store from "@redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Layout></Layout>
      </NavigationContainer>
    </Provider>
  );
}
