import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import BusinessListViewItem from '@components/Business/BusinessListViewItem/BusinessListViewItem'

export default function BusinessListView({ navigation, businessList }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={businessList}
        renderItem={({ item }) => <BusinessListViewItem navigation={navigation} item={item} />}
        keyExtractor={item => item.id.toString()}
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
    width: '100%',
    padding: 10,
  }
});