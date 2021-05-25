import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-native";
import { Modal, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { Input } from "react-native-elements";
import Toast from "react-native-root-toast";
import { Pressable } from "react-native";
import { Picker } from 'react-native-picker-dropdown'

export default function CompleteOrder({
    modalVisible,
    setModalVisible
}) {

    const onSubmit = () => {
        setModalVisible(false);
        Toast.show('Request failed to send.', {
            duration: Toast.durations.LONG,
        });
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            closeOnClick={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            style={styles.modal}
        >
            <Pressable
                style={styles.centeredView}
                activeOpacity={1}
                onPress={() => { setModalVisible(!modalVisible) }}
            >
                <View style={styles.modalView}>
                    <ScrollView style={styles.scrollView}>
                        <Picker
                            style={{ height: 50, width: 100 }}
                        >
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                        <Input name="street" label="Daire" style={{ margin: 10 }}></Input>
                    </ScrollView>
                    <Button style={styles.button} title="Submit" onPress={(e) => onSubmit(e)} />
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
        width: "100%",
        height: "50%",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
    },
    scrollView: {
        paddingRight: 20,
        paddingLeft: 20,
        width: "100%",
        height: "50%",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
});