import React, { useState } from 'react'

import BusinessMapView from '@components/Business/BusinessMapView/BusinessMapView';
import BusinessListView from '@components/Business/BusinessListView/BusinessListView';

import { StyleSheet, Platform, View, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function BusinessView({ navigation }) {

    const businessList = useSelector((state) => state.business.businessList);

    const [viewMode, setViewMode] = useState(Platform.OS !== 'web' ? 'BusinessMapView' : 'BusinessListView')

    useEffect(() => {
        const switchView = () => {
            if (viewMode === 'BusinessListView') {
                setViewMode('BusinessMapView')
            }
            if (viewMode === 'BusinessMapView') {
                setViewMode('BusinessListView')
            }
        }

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.overlay} onPress={() => switchView()}>
                    <FontAwesome name="exchange" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, viewMode]);



    return (
        <View>
            {
                Platform.OS === 'web' ?
                    <BusinessListView /> :
                    viewMode === 'BusinessListView' ?
                        <BusinessListView navigation={navigation} businessList={businessList} /> :
                        <BusinessMapView navigation={navigation} businessList={businessList} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
