import React from 'react'
import {
    setSelectedBusiness
} from "@redux"
import store from '@redux/store';
import { Text } from 'react-native-elements';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Image } from 'react-native';
import storePng from '../../../../assets/store.png';

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
                <Image source={storePng} style={{ width: 60, height: 60 }} />
                <View style={{ alignItems: "center", flex: 1, paddingLeft: 16, paddingRight: 16 }}>
                    <Text style={{ fontWeight: "bold", alignSelf: "flex-start" }} numberOfLines={2}>{item.name}</Text>
                    <Text style={{ fontWeight: "300", alignSelf: "flex-end" }} numberOfLines={2}>category: {item.category}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    listItem: {
        margin: 5,
        padding: 10,
        backgroundColor: "#FFF",
        width: "100%",
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