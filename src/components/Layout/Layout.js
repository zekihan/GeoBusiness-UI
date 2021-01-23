import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect } from "react";
import { View } from "react-native";
import Main from "@components/Main/Main";
import BusinessMapView from '@components/BusinessMapView/BusinessMapView';

const Drawer = createDrawerNavigator();
export default function Layout() {

  return ( 
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Map" component={BusinessMapView} />
    </Drawer.Navigator>
  );
}
