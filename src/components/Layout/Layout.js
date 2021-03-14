import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MainStack from "@components/Main/MainStack/MainStack";
import BusinessStack from '@components/Business/BusinessStack/BusinessStack';

const Tab = createBottomTabNavigator();

export default function Layout() {

    return (
        <Tab.Navigator initialRouteName="Main"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Main') {
                        return <MaterialCommunityIcons name="home" size={size} color={color} />
                    } else if (route.name === 'Business') {
                        return <MaterialCommunityIcons name="google-my-business" size={size} color={color} />
                    }
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Main" component={MainStack} />
            <Tab.Screen name="Business" component={BusinessStack} />
        </Tab.Navigator>
    );
}
