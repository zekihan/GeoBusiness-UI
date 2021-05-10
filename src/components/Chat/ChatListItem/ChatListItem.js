import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import {
    setSelectedChat
} from "@redux"
import store from '@redux/store';

export default function ChatListItem({ navigation, item }) {

    const onItemClick = (item) => {
        if (item) {
            store.dispatch(setSelectedChat(item));
            navigation.navigate('Chat');
        }
    }

    return (
        <TouchableOpacity onPress={(e) => { onItemClick(item) }}>
            <View style={styles.listItem}>
                <Image source={{ uri: item.photo }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                <View style={{ alignItems: "center", flex: 1 }}>
                    <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                    <Text>{item.lastMessage}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    listItem: {
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "80%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    }
});