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

export default function Address({
    modalVisible,
    setModalVisible
}) {

    const [address, setAddress] = useState(null);
    const [loc, setLoc] = useState({
        locationResult: null,
        location: {
            coords: {
                latitude: 30.4237,
                longitude: 20.1428,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        },
    });

    useEffect(() => {
        _getLocationAsync();
    }, []);

    const _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            setLoc({
                locationResult: "Permission to access location was denied",
                location,
            });
        }

        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setLoc({
            locationResult: JSON.stringify(location),
            location: {
                coords: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                },
            },
        });
    };

    const onReverse = async () => {
        let location2 = await Location.reverseGeocodeAsync(loc.location.coords);
        setAddress(location2[0])
    }

    useEffect(() => {
        if (loc)
            onReverse();
    }, [loc]);

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
                        <Input name="country" label="Ülke" style={{ margin: 10 }} defaultValue={address && address.country && address.country}></Input>
                        <Input name="region" label="İl" style={{ margin: 10 }} defaultValue={address && address.region && address.region}></Input>
                        <Input name="subregion" label="İlçe" style={{ margin: 10 }} defaultValue={address && address.subregion && address.subregion}></Input>
                        <Input name="district" label="Mahalle" style={{ margin: 10 }} defaultValue={address && address.district && address.district}></Input>
                        <Input name="street" label="Sokak" style={{ margin: 10 }} defaultValue={address && address.street && address.street}></Input>
                        <Input name="name" label="Kapı No" style={{ margin: 10 }} defaultValue={address && address.name && address.name}></Input>
                        <Input name="street" label="Kat" style={{ margin: 10 }}></Input>
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