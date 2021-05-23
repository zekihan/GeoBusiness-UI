import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import ChatListItem from '@components/Chat/ChatListItem/ChatListItem';
import { useSelector } from 'react-redux';

export default function ChatList({ navigation }) {
    const chatList = useSelector(state => state.chat.chatList)
    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1 }}
                data={chatList}
                renderItem={({ item }) => <ChatListItem navigation={navigation} item={item} />}
                keyExtractor={item => item.consumer.sub + item.business.id}
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