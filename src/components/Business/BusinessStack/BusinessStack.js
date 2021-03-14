import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import BusinessMapView from '@components/Business/BusinessMapView/BusinessMapView';
import BusinessListView from '@components/Business/BusinessListView/BusinessListView';
import BusinessDetail from '@components/Business/BusinessDetail/BusinessDetail';

const Stack = createStackNavigator();

export default function BusinessStack() {

    return (
        <Stack.Navigator>
            { Platform.OS !== 'web' &&
                <Stack.Screen
                    name="BusinessMapView"
                    component={BusinessMapView}
                />
            }
            <Stack.Screen
                name="BusinessListView"
                component={BusinessListView}
            />
            <Stack.Screen
                name="BusinessDetail"
                component={BusinessDetail}
            />
        </Stack.Navigator>
    );
}