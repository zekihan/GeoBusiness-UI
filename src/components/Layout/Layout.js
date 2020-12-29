import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect } from "react";
import { View } from "react-native";
import Main from "@components/Main/Main";

const Drawer = createDrawerNavigator();
export default function Layout() {

  return ( 
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Main" component={Main} />
    </Drawer.Navigator>
  );
}
