import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';

import Chat from '@components/Chat/Chat/Chat';
import ChatList from '@components/Chat/ChatList/ChatList';
import BusinessDetail from '@components/Business/BusinessDetail/BusinessDetail';

const Stack = createStackNavigator();

export default function ChatStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ChatList"
                component={ChatList}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
            />
            <Stack.Screen
                name="BusinessDetail"
                component={BusinessDetail}
            />
        </Stack.Navigator>
    );
}