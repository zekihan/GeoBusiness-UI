import React from 'react'
import {
    setSelectedBusiness
} from "@redux"
import { Text } from 'react-native-elements';
import { StyleSheet, TouchableOpacity } from 'react-native';
import store from '@redux/store';

export default function BusinessListViewItem({ navigation, item }) {
    const goToDetailScreen = (item) => {
        if (item) {
            store.dispatch(setSelectedBusiness(item));
            navigation.navigate('BusinessDetail');
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => goToDetailScreen(item)} >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 2
    },
    itemTitle: {
        fontSize: 18,
    },
    itemDescription: {
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: 14,
        color: 'gray'
    }
});