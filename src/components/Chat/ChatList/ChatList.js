import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import ChatListItem from '@components/Chat/ChatListItem/ChatListItem';

export default function ChatList({navigation}) {
    const [data, setData] = useState([
        {
            "name": "Miyah Myles",
            "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6",
            "lastMessage": "asd"
        },
        {
            "name": "June Cha",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg",
            "lastMessage": "asd"
        },
        {
            "name": "Iida Niskanen",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/68.jpg",
            "lastMessage": "asd"
        },
        {
            "name": "Renee Sims",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/65.jpg",
            "lastMessage": "asd"
        },
        {
            "name": "Jonathan Nu\u00f1ez",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg",
            "lastMessage": "asd"
        },
        {
            "name": "Sasha Ho",
            "photo": "https:\/\/images.pexels.com\/photos\/415829\/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb",
            "lastMessage": "asd"
        },
        {
            "name": "Abdullah Hadley",
            "photo": "https:\/\/images.unsplash.com\/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f",
            "lastMessage": "asd"
        },
        {
            "name": "Thomas Stock",
            "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg",
            "lastMessage": "asd"
        },
        {
            "name": "Veeti Seppanen",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg",
            "lastMessage": "asd"
        },
        {
            "name": "Bonnie Riley",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg",
            "lastMessage": "asd"
        }
    ])

    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1 }}
                data={data}
                renderItem={({ item }) => <ChatListItem navigation={navigation} item={item} />}
                keyExtractor={item => item.email}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    }
});