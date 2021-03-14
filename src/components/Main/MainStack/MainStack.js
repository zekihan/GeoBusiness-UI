import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';

import Login from "@components/Main/Login/Login";

const Stack = createStackNavigator();

export default function BusinessStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
            />
        </Stack.Navigator>
    );
}