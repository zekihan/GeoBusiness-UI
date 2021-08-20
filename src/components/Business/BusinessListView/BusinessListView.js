import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import BusinessListViewItem from '@components/Business/BusinessListViewItem/BusinessListViewItem'
import { TextInput } from "react-native-gesture-handler";

export default function BusinessListView({ navigation, businessList }) {

  const [filtered, setFiltered] = useState(businessList)
  const [search, setSearch] = useState("")

  const searchFilterFunction = (text) => {
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = businessList.filter(function (item) {
        // Applying filter for the inserted text in search bar
        return item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1 || item.category.toLowerCase().indexOf(text.toLowerCase()) !== -1;
      });
      setFiltered(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFiltered(businessList);
      setSearch(text);
    }
  }
  return (
    <View style={styles.container}>
      <View style={[styles.search, { width: '100%' }]}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="search"
        />
      </View>

      <FlatList
        data={filtered}
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
  },
  search: {
    margin: 5,
    padding: 10,
    backgroundColor: "#FFF",
    width: "100%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 4,
  },
  textInputStyle: {
    width: '100%'
  }
});