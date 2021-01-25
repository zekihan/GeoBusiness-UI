import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import { StyleSheet, Dimensions } from "react-native";
import * as Location from "expo-location";
import { useSelector } from "react-redux";

export default function BusinessMapView() {
  const businessList = useSelector((state) => state.business.businessList);
  const [loc, setLoc] = useState({
    mapRegion: {
      latitude: 30.4237,
      longitude: 20.1428,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
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

  const _handleMapRegionChange = (mapRegion) => {
    setLoc({ mapRegion });
  };

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setLoc({
        locationResult: "Permission to access location was denied",
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    setLoc({
      locationResult: JSON.stringify(location),
      location: {
        coords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      },
    });
  };

  return (
    <MapView
      style={styles.map}
      region={loc.location.coords}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      {businessList.map((business) => (
        <MapView.Marker
          key={business.id}
          coordinate={business.location}
          title={business.name}
          description={business.email}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    marginTop: 20,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 50,
  },
});
