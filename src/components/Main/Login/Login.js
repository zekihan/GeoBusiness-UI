import * as AuthSession from "expo-auth-session"
import jwtDecode from "jwt-decode"
import * as React from "react"
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native"
import * as FileSystem from 'expo-file-system';

import fetchBusinessList from "@commons/api/fetchBusinessList"
import fetchChatList from "@commons/api/fetchChatList"
import {
    setUser,
    setToken,
    setAuth,
} from "@redux"
import store from '@redux/store'
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useState } from "react";
import { Input } from "react-native-elements";
import Address from "../Address/Address";
import logo from '../../../../assets/logo.png';
import { Image } from "react-native";

const auth0ClientId = "0RkrbD08xD6Bi1DuGrWPKSsDdlpiF1VU"
const authorizationEndpoint = "https://geobusiness.eu.auth0.com/authorize"

const useProxy = Platform.select({ web: false, default: true })
const redirectUri = AuthSession.makeRedirectUri({ useProxy })
const returnUrl = redirectUri

export default function Main({ navigation }) {

    const auth = useSelector((state) => state.auth.auth);
    const user = useSelector((state) => state.auth.user);

    const [request, result, promptAsync] = AuthSession.useAuthRequest(
        {
            defaultReturnUrl: returnUrl,
            returnUrl,
            redirectUri,
            clientId: auth0ClientId,
            responseType: "id_token",
            scopes: ["openid", "profile"],
            extraParams: {
                nonce: "nonce",
            },
        },
        { authorizationEndpoint }
    )
    // console.log(`Redirect URL: ${redirectUri}`)

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (result) {
            if (result.error) {
                Alert.alert(
                    "Authentication error",
                    result.params.error_description || "something went wrong"
                )
                onLogout()
                return
            }
            if (result.type === "success") {
                const _jwtToken = result.params.id_token

                let fileUri = FileSystem.documentDirectory + "token";
                FileSystem.writeAsStringAsync(fileUri, _jwtToken, { encoding: FileSystem.EncodingType.UTF8 })
                    .then(() => {
                        const decoded = jwtDecode(_jwtToken)
                        store.dispatch(setUser(decoded))
                        store.dispatch(setToken(_jwtToken))
                        store.dispatch(setAuth(true))
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    }, [result])

    useEffect(() => {
        if (auth) {
            fetchBusinessList()
            fetchChatList()
        }
    }, [auth])

    const onLogout = () => {
        let fileUri = FileSystem.documentDirectory + "token";
        FileSystem.deleteAsync(fileUri)
            .then(() => {
                store.dispatch(setAuth(false))
                store.dispatch(setToken(null))
                store.dispatch(setUser(null))
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <>
                <Image style={{ height: 200, width: 200, marginBottom: 200 }} source={logo} />
                {auth ? (
                    <>
                        {/* <Text style={{ margin: 10 }}>You are logged in, {user.name}!</Text>
                        <Button style={{ margin: 10 }} title="Get Address" onPress={(e) => setModalVisible(true)} /> */}
                        <Button style={{ margin: 10 }} title="Log out" onPress={onLogout} />
                        <Address modalVisible={modalVisible} setModalVisible={setModalVisible} />
                    </>
                ) : (
                    <View style={{ width: 150 }}>
                        <Button
                            disabled={!request}
                            title="Log in"
                            onPress={() => promptAsync({ useProxy })}
                            color="#244397"
                        />
                    </View>


                )}
            </>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    formContainer: {
        width: "100%",
        height: "100px",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    }
})
