import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import * as React from "react";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import fetchBusinessList from "@commons/api/fetchBusinessList";

const auth0ClientId = "0RkrbD08xD6Bi1DuGrWPKSsDdlpiF1VU";
const authorizationEndpoint = "https://geobusiness.eu.auth0.com/authorize";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function Main({ navigation }) {
  const onclick = () => {
    navigation.openDrawer();
  };
  const [name, setName] = React.useState(null);
  const [jwtToken, setJwtToken] = React.useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: "id_token",
      // retrieve the user's profile
      scopes: ["openid", "profile"],
      extraParams: {
        // ideally, this will be a random value
        nonce: "nonce",
      },
    },
    { authorizationEndpoint }
  );

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

  React.useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          "Authentication error",
          result.params.error_description || "something went wrong"
        );
        return;
      }
      if (result.type === "success") {
        // Retrieve the JWT token and decode it
        const _jwtToken = result.params.id_token;
        const decoded = jwtDecode(_jwtToken);
        const { name } = decoded;
        setName(name);
        setJwtToken(_jwtToken);
      }
    }
  }, [result]);

  React.useEffect(() => {
    if (jwtToken) {
      fetchBusinessList(jwtToken);
      console.log(jwtToken)
    }
  }, [jwtToken]);

  return (
    <View style={styles.container}>
      {name ? (
        <>
          <Text style={{margin:10}}>You are logged in, {name}!</Text>
          <Button style={{margin:10}} onPress={onclick} title="Learn More" color="#841584" />
          <Text></Text>
          <Button style={{margin:10}} title="Log out" onPress={() => setName(null)} />
        </>
      ) : (
        <Button
          disabled={!request}
          title="Log in with Auth0"
          onPress={() => promptAsync({ useProxy })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
