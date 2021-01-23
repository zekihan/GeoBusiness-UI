import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";

export default function BusinessMapView() {
  return (
    <MapView
      style={styles.map}
      region={{
        latitude: 38.4237,
        longitude: 27.1428,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <MapView.Marker
        coordinate={{ latitude: 38.4237, longitude: 27.1428 }}
        title={"marker.title1"}
        description={"desss"}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 1,
  },
});
