import * as AuthSession from "expo-auth-session"
import jwtDecode from "jwt-decode"
import * as React from "react"
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native"
import * as FileSystem from 'expo-file-system';

import fetchBusinessList from "@commons/api/fetchBusinessList"
import {
    setUser,
    setToken,
    setAuth,
} from "@redux"
import store from '@redux/store'
import { useSelector } from "react-redux"

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

    React.useEffect(() => {
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

    React.useEffect(() => {
        if (auth) {
            fetchBusinessList()
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
            {auth ? (
                <>
                    <Text style={{ margin: 10 }}>You are logged in, {user.name}!</Text>
                    <Button style={{ margin: 10 }} title="Log out" onPress={onLogout} />
                </>
            ) : (
                <Button
                    disabled={!request}
                    title="Log in with Auth0"
                    onPress={() => promptAsync({ useProxy })}
                />
            )}
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
})
