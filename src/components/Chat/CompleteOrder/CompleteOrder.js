import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, View, Button, Pressable, Keyboard } from "react-native";
import { Input } from "react-native-elements";
import { Picker } from '@react-native-picker/picker';

export default function CompleteOrder({
    modalVisible,
    setModalVisible,
    onSubmitPress
}) {
    const [value1, setValue1] = useState("1");
    const [value2, setValue2] = useState("1");
    const [margin, setMargin] = useState(0);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => {
        setMargin(500)
    };

    const _keyboardDidHide = () => {
        setMargin(0)
    };

    const onSubmit = () => {
        onSubmitPress(value1, value2)
        setModalVisible(false);
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
            style={{ justifyContent: "flex-end" }}
        >
            <View style={[styles.modalView, { marginBottom: margin }]}>
                <Picker
                    selectedValue={value1}
                    onValueChange={(itemValue, itemIndex) =>
                        setValue1(itemValue)
                    }
                    style={{ height: 75, width: "100%" }}
                >
                    <Picker.Item label="Self Service" value="1" />
                    <Picker.Item label="Carrier" value="2" />
                </Picker>
                <Picker
                    selectedValue={value2}
                    onValueChange={(itemValue, itemIndex) =>
                        setValue2(itemValue)
                    }
                    style={{ height: 75, width: "100%" }}
                >
                    <Picker.Item label="Credit Card" value="1" />
                    <Picker.Item label="Cash" value="2" />
                </Picker>
                <Input name="street" label="Additional Notes" style={{ margin: 10 }}></Input>
                <Button style={styles.button} title="Submit" onPress={(e) => onSubmit(e)} />
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
        height: 350,
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