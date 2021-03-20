import React, { useState } from 'react'

import BusinessMapView from '@components/Business/BusinessMapView/BusinessMapView';
import BusinessListView from '@components/Business/BusinessListView/BusinessListView';

import { StyleSheet, Platform, View, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';


export default function BusinessView({ navigation }) {

    const [viewMode, setViewMode] = useState(Platform.OS !== 'web' ? 'BusinessMapView' : 'BusinessListView')

    const switchView = () => {
        if (viewMode === 'BusinessListView') {
            setViewMode('BusinessMapView')
        }
        if (viewMode === 'BusinessMapView') {
            setViewMode('BusinessListView')
        }
    }

    return (
        <View>
            {
                Platform.OS !== 'web' &&
                <TouchableOpacity style={styles.overlay} onPress={() => switchView()}>
                    <FontAwesome name="exchange" size={24} color="black" />
                </TouchableOpacity>
            }
            {
                Platform.OS === 'web' ?
                    <BusinessListView /> :
                    viewMode === 'BusinessListView' ?
                        <BusinessListView navigation={navigation} /> :
                        <BusinessMapView navigation={navigation} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
});
