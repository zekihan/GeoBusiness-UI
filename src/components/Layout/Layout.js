import React, { useEffect } from "react";
import jwtDecode from "jwt-decode"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MainStack from "@components/Main/MainStack/MainStack";
import BusinessStack from '@components/Business/BusinessStack/BusinessStack';

import * as FileSystem from 'expo-file-system';

import {
    setUser,
    setToken,
    setAuth,
} from "@redux"
import store from '@redux/store'
import moment from 'moment';

const Tab = createBottomTabNavigator();

export default function Layout() {

    useEffect(() => {
        let fileUri = FileSystem.documentDirectory + "token";
        FileSystem.readDirectoryAsync(
            FileSystem.documentDirectory
        )
            .then((files) => {
                if (files.includes('token')) {
                    FileSystem.readAsStringAsync(
                        fileUri
                    )
                        .then((_jwtToken) => {
                            const decoded = jwtDecode(_jwtToken)
                            var date = moment();
                            if (decoded.exp > parseInt(date.valueOf() / 1000)) {
                                store.dispatch(setUser(decoded))
                                store.dispatch(setToken(_jwtToken))
                                store.dispatch(setAuth(true))
                            }
                            else {
                                FileSystem.deleteAsync(fileUri)
                                    .then(() => {
                                        store.dispatch(setAuth(false))
                                        store.dispatch(setToken(null))
                                        store.dispatch(setUser(null))
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

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
