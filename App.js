import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "@redux/store";
import { createStackNavigator } from '@react-navigation/stack';

import Main from "@components/Main/Main";
import BusinessMapView from '@components/BusinessMapView/BusinessMapView';
import BusinessListView from '@components/BusinessListView/BusinessListView';
import BusinessDetail from '@components/BusinessDetail/BusinessDetail';

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
          />
          <Stack.Screen
            name="BusinessMapView"
            component={BusinessMapView}
          />
          <Stack.Screen
            name="BusinessListView"
            component={BusinessListView}
          />
          <Stack.Screen
            name="BusinessDetail"
            component={BusinessDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
