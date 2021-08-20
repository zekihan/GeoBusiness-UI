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
import postCustomer from "@commons/api/postCustomer"
import { useSelector } from "react-redux";

export default function Address({
    modalVisible,
    setModalVisible
}) {
    const user = useSelector((state) => state.auth.user);

    const [address, setAddress] = useState(null);
    const [name, set_name] = useState(null);
    const [phone, set_phone] = useState(null);
    const [country, set_country] = useState(null);
    const [region, set_region] = useState(null);
    const [subregion, set_subregion] = useState(null);
    const [district, set_district] = useState(null);
    const [street, set_street] = useState(null);
    const [outsideDoor, set_outsideDoor] = useState(null);
    const [floor, set_floor] = useState(null);
    const [insideDoor, set_insideDoor] = useState(null);
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
        set_country(location2[0] && location2[0].country && location2[0].country)
        set_region(location2[0] && location2[0].region && location2[0].region)
        set_subregion(location2[0] && location2[0].subregion && location2[0].subregion)
        set_district(location2[0] && location2[0].district && location2[0].district)
        set_street(location2[0] && location2[0].street && location2[0].street)
        set_outsideDoor(location2[0] && location2[0].name && location2[0].name)
    }

    useEffect(() => {
        if (loc)
            onReverse();
    }, [loc]);

    const onSubmit = () => {
        setModalVisible(false);
        let arr = [country, region, subregion, district, street, outsideDoor, floor, insideDoor].join()
        postCustomer({
            id: user.sub,
            name: name ? name : "",
            phone: phone ? phone : "",
            address: arr,
            photo: user.picture ? user.picture : "",
            email: "email"
        })
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
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView style={styles.scrollView}>
                        <Input name="name" label="Name" style={{ margin: 10 }} onChangeText={name => set_name(name)} value={name}></Input>
                        <Input name="phone" label="Phone" style={{ margin: 10 }} onChangeText={phone => set_phone(phone)} value={phone}></Input>
                        <Input name="country" label="Ülke" style={{ margin: 10 }} onChangeText={country => set_country(country)} value={country} defaultValue={address && address.country && address.country}></Input>
                        <Input name="region" label="İl" style={{ margin: 10 }} onChangeText={region => set_region(region)} value={region} defaultValue={address && address.region && address.region}></Input>
                        <Input name="subregion" label="İlçe" style={{ margin: 10 }} onChangeText={subregion => set_subregion(subregion)} value={subregion} defaultValue={address && address.subregion && address.subregion}></Input>
                        <Input name="district" label="Mahalle" style={{ margin: 10 }} onChangeText={district => set_district(district)} value={district} defaultValue={address && address.district && address.district}></Input>
                        <Input name="street" label="Sokak" style={{ margin: 10 }} onChangeText={street => set_street(street)} value={street} defaultValue={address && address.street && address.street}></Input>
                        <Input name="outsideDoor" label="Kapı No" style={{ margin: 10 }} onChangeText={outsideDoor => set_outsideDoor(outsideDoor)} value={outsideDoor} defaultValue={address && address.name && address.name}></Input>
                        <Input name="floor" label="Kat" style={{ margin: 10 }} onChangeText={floor => set_floor(floor)} value={floor}></Input>
                        <Input name="insideDoor" label="Daire" style={{ margin: 10 }} onChangeText={insideDoor => set_insideDoor(insideDoor)} value={insideDoor}></Input>
                    </ScrollView>
                    <Button style={styles.button} title="Submit" onPress={(e) => onSubmit(e)} />
                </View>
            </View>
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