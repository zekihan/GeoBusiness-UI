import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react";
import Main from "@components/Main/Main";
import BusinessMapView from '@components/BusinessMapView/BusinessMapView';
import BusinessListView from '@components/BusinessListView/BusinessListView';
import BusinessDetail from '@components/BusinessDetail/BusinessDetail';
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';

const Drawer = createDrawerNavigator();
export default function Layout() {

    const auth = useSelector(state => state.auth.auth)

    return (
        <Drawer.Navigator initialRouteName="Main">
            <Drawer.Screen name="Main" component={Main} />
            { Platform.OS !== 'web' && auth &&
                <Drawer.Screen name="Map" component={BusinessMapView} />
            }
            <Drawer.Screen name="BusinessListView" component={BusinessListView} />
            <Drawer.Screen name="BusinessDetail" component={BusinessDetail} />
        </Drawer.Navigator>
    );
}
