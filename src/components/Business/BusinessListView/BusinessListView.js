import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import BusinessListViewItem from '@components/Business/BusinessListViewItem/BusinessListViewItem'
import { FontAwesome } from '@expo/vector-icons';

export default function BusinessListView({ navigation }) {

  const switchView = () => {
    navigation.navigate('BusinessMapView')
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {
            key: "business.id1",
            title: "business.name",
            description: "business.category"
          },
          {
            key: "business.id2",
            title: "business.name",
            description: "business.category"
          },
          {
            key: "business.id3",
            title: "business.name",
            description: "business.category"
          },
          {
            key: "business.id4",
            title: "business.name",
            description: "business.category"
          },
          {
            key: "business.id5",
            title: "business.name",
            description: "business.category"
          },
          {
            key: "business.id6",
            title: "business.name",
            description: "business.category"
          },
          {
            key: "business.id7",
            title: "business.name",
            description: "business.category"
          },
          {
            key: "business.id8",
            title: "business.name",
            description: "business.category"
          },
          {
            key: "business.id9",
            title: "business.name",
            description: "business.category"
          },
          {
            key: "business.id10",
            title: "business.name",
            description: "business.category"
          },
          {
            key: "business.id11",
            title: "business.name",
            description: "business.category"
          },
        ]}
        renderItem={({ item }) => <BusinessListViewItem navigation={navigation} item={item} />}
      />
      <TouchableOpacity style={styles.overlay} onPress={() => switchView()}>
        <FontAwesome name="exchange" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    padding: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});