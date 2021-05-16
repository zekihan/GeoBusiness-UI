import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import Layout from "@components/Layout/Layout";
import store from "@redux/store";
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <NavigationContainer>
          <Layout></Layout>
        </NavigationContainer>
      </Provider>
    </RootSiblingParent>
  );
}
