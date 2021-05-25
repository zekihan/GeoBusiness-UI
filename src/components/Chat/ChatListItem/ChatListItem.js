import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import {
    setSelectedChat
} from "@redux"
import store from '@redux/store';
import { useSelector } from 'react-redux';
import storePng from '../../../../assets/store.png';


export default function ChatListItem({ navigation, item }) {
    const user = useSelector(state => state.auth.user)

    const onItemClick = (item) => {
        if (item) {
            store.dispatch(setSelectedChat(item));
            navigation.navigate('Chat');
        }
    }

    return (
        <TouchableOpacity onPress={(e) => { onItemClick(item) }}>
            <View style={styles.listItem}>
                <Image source={storePng} style={{ width: 60, height: 60 }} />
                <View style={{ alignItems: "center", flex: 1, paddingLeft: 16, paddingRight: 16  }}>
                    <Text style={{ fontWeight: "bold" }} numberOfLines={2}>{item.business.name}</Text>
                    {item.messages && item.messages.length > 0 &&
                        <Text>{item.messages[0].user.sub === user.sub ? "you:" + item.messages[0].text : "market:" + item.messages[0].text}</Text>
                    }
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
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 4,
    }
});