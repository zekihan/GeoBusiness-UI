import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import BusinessListViewItem from '@components/Business/BusinessListViewItem/BusinessListViewItem'

export default function BusinessListView({ navigation }) {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width:'100%',
    paddingTop: 22,
    padding: 10,
  }
});