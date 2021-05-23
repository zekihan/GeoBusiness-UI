import React from 'react'
import {
    setSelectedBusiness
} from "@redux"
import { Text } from 'react-native-elements';
import { StyleSheet, TouchableOpacity } from 'react-native';
import store from '@redux/store';
import { View } from 'react-native';
import { Image } from 'react-native';

export default function BusinessListViewItem({ navigation, item }) {
    const goToDetailScreen = (item) => {
        if (item) {
            store.dispatch(setSelectedBusiness(item));
            navigation.navigate('BusinessDetail');
        }
    }

    return (
        <TouchableOpacity onPress={(e) => { goToDetailScreen(item) }}>
            <View style={styles.listItem}>
                <Image source={{ uri: item.photo }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                <View style={{ alignItems: "center", flex: 1 }}>
                    <Text style={{ fontWeight: "bold", alignSelf: "flex-start" }} numberOfLines={2}>{item.name}</Text>
                    <Text style={{ fontWeight: "300", alignSelf: "flex-end" }} numberOfLines={2}>category: {item.category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listItem: {
        margin: 2,
        padding: 10,
        backgroundColor: "#FFF",
        width: "100%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    }
});