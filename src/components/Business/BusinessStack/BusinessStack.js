import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import BusinessView from '@components/Business/BusinessView/BusinessView';
import BusinessDetail from '@components/Business/BusinessDetail/BusinessDetail';
import Chat from '@components/Chat/Chat/Chat';

const Stack = createStackNavigator();

export default function BusinessStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Business"
                component={BusinessView}
            />
            <Stack.Screen
                name="BusinessDetail"
                component={BusinessDetail}
            />
            <Stack.Screen
                name="ChatForBusiness"
                component={Chat}
            />
        </Stack.Navigator>
    );
}