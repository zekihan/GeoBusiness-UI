import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MainStack from "@components/Main/MainStack/MainStack";
import BusinessStack from '@components/Business/BusinessStack/BusinessStack';
import ChatStack from '@components/Chat/ChatStack/ChatStack';

import * as FileSystem from 'expo-file-system';

import {
    setUser,
    setToken,
    setAuth,
    fetchChatSuccess,
    setSelectedChat
} from "@redux"
import store from '@redux/store'
import moment from 'moment';
import { useSelector } from "react-redux";
import Login from "@components/Main/Login/Login";
import { API, BASE_URL } from "@commons/config";
import SockJsClient from 'react-stomp';
import { IS_ORDER_STRING_SET } from "@commons/Enums"

const Tab = createBottomTabNavigator();
SOCKET_URL = "http://192.168.254.128:8084/chat"

export default function Layout() {

    const auth = useSelector((state) => state.auth.auth);
    const user = useSelector((state) => state.auth.user);
    const chatList = useSelector(state => state.chat.chatList)
    const selectedChat = useSelector(state => state.chat.selectedChat)

    let onConnected = () => {
        console.log("Connected!!")
    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const isOrder = (message) => {
        let _message = Object.assign({}, message)
        if (!_message.isOrder && new RegExp(IS_ORDER_STRING_SET.join("|")).test(_message.text)) {
            _message.quickReplies = {
                type: 'radio', // 'radio' or 'checkbox',
                values: [
                    {
                        title: 'Mark As Order',
                        value: "order",
                    }
                ],
            }
        }
        return _message
    }


    let onMessageReceived = (msg) => {
        console.log(msg)
        let _chatList = Object.assign([], chatList)
        let _selectedChat = Object.assign([], selectedChat)
        let a = uuidv4()
        msg._id = a
        msg.isOrder = msg.isOrder === "true" ? true : false
        msg.businessId = msg.from
        msg.consumer = user
        msg.createdAt = new Date()
        msg.id = a
        msg.user = {
            _id: msg.from
        }
        msg = isOrder(msg)
        let ab = _chatList.map(chat => {
            if (chat.businessId === "1")
                return { ...chat, messages: [msg, ...chat.messages] }
            else
                return chat
        })
        let ab2 = { ..._selectedChat, messages: [msg, ..._selectedChat.messages] }
        store.dispatch(fetchChatSuccess(ab))
        store.dispatch(setSelectedChat(ab2))

    }

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
        <>
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/message']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                autoReconnect={true}
                debug={false}
            />
            {
                auth ?
                    <Tab.Navigator initialRouteName="Main"
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                if (route.name === 'Main') {
                                    return <MaterialCommunityIcons name="home" size={size} color={color} />
                                } else if (route.name === 'Business') {
                                    return <MaterialCommunityIcons name="google-my-business" size={size} color={color} />
                                }
                                else if (route.name === 'Chat') {
                                    return <MaterialCommunityIcons name="chat" size={size} color={color} />
                                }
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: "#1976d2",
                            inactiveTintColor: 'gray',
                            keyboardHidesTabBar: true,
                        }}>
                        <Tab.Screen name="Main" component={MainStack} />
                        <Tab.Screen name="Business" component={BusinessStack} />
                        <Tab.Screen name="Chat" component={ChatStack} />
                    </Tab.Navigator>
                    :
                    <Login />
            }
        </>

    );
}
