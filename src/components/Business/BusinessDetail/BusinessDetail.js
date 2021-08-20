import { HeaderBackButton } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import { Button } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { Dimensions } from 'react-native';
import StarRating from "react-native-star-rating";
import {
  setSelectedChat,
  fetchChatSuccess,
} from "@redux"
import store from '@redux/store';
import storePng from '../../../../assets/store.png';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Pressable } from "react-native";
import moment from "moment";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function BusinessDetail({ navigation }) {
  const selectedBusiness = useSelector((state) => state.business.selectedBusiness);
  const chatList = useSelector(state => state.chat.chatList)
  const user = useSelector(state => state.auth.user)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.goBack()} title="BusinessDetail" />
      ),
    });
  }, [navigation]);

  const onChat = () => {
    let chat = chatList.find(_chat => _chat.business.id === selectedBusiness.id)
    if (chat) {
      store.dispatch(setSelectedChat(chat));
    }
    else {
      chat = {
        consumer: user,
        business: selectedBusiness,
        messages: []
      }
      store.dispatch(fetchChatSuccess([chat, ...chatList]));
      store.dispatch(setSelectedChat(chat));
    }
    navigation.navigate('Chat');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.profileCard, { flex: 1, flexDirection: 'column' }]}>
          <View style={[{ flex: 1, flexDirection: 'row' }]}>
            <Image style={styles.avatar} source={storePng} />
            <View style={styles.detailName}>
              <Text style={[styles.name, { marginBottom: 8, textAlign: "center", fontWeight: 'bold' }]} numberOfLines={2}>{selectedBusiness.name}</Text>
              <StarRating
                starSize={30}
                disabled={true}
                maxStars={5}
                emptyStar={'star-outline'}
                fullStar={'star'}
                halfStar={'star-half-full'}
                iconSet={'MaterialCommunityIcons'}
                rating={selectedBusiness.rate}
                fullStarColor={'gold'}
              />
              <View style={{ marginTop: 8, flex: 1, flexDirection: 'row' }}>
                <View style={{ marginRight: 8 }}>
                  <FontAwesome5 name="coins" size={18} color="#616161" />
                  <Text style={{ marginBottom: 8, fontSize: 18, color: "#616161", }} numberOfLines={2}>{selectedBusiness.minOrderCost}</Text>
                </View>
                <Pressable
                  style={[styles.centeredView, { flex: 1, flexDirection: 'row', borderWidth: 2, borderColor: "#1976d2", borderRadius: 8, padding: 8, width: 100, height: 40, justifyContent: 'center', alignItems: 'center' }]}
                  activeOpacity={1}
                  onPress={onChat}
                >
                  <Entypo name="chat" size={24} color="#1976d2" />
                  <Text style={{ marginLeft: 8, fontSize: 18, color: "#616161", }} numberOfLines={2}>Chat</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 120 }]}>
            <Text style={[{ marginBottom: 8, color: "#616161", fontSize: 18, }]}>Work Hours: {selectedBusiness.openingTime} - {selectedBusiness.closingTime}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTittle}>Information</Text>
          <Text style={[{ fontWeight: "700", fontSize: 14, marginBottom: 2 }]}>Category: {selectedBusiness.category}</Text>
          <Text style={[{ fontWeight: "700", fontSize: 14, marginBottom: 2 }]}>Email: {selectedBusiness.email}</Text>
          <Text style={[{ fontWeight: "700", fontSize: 14, marginBottom: 2 }]}>Phone: {selectedBusiness.phone}</Text>
          <Text style={[{ fontWeight: "700", fontSize: 14, marginBottom: 2 }]}>Authorized Person: {selectedBusiness.authorizedPerson}</Text>
          <Text style={[{ fontWeight: "700", fontSize: 14, marginBottom: 2 }]}>Delivery: {selectedBusiness.maxServiceRange ? "yes" : "no"}</Text>
        </View>
        {
          selectedBusiness.products.map((category) => {
            return (
              <View style={styles.card}
                key={category.category}
              >
                <Text style={styles.cardTittle}>{category.category}</Text>
                {
                  category.items.map((item) => {
                    return (
                      <Text
                        key={item}
                      >{item}</Text>
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 16,
    height: "100%"
  },
  cardTittle: {
    color: "#808080",
    fontSize: 22,
    marginBottom: 5,
  },
  avatar: {
    width: 150,
    height: 150,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  profileCard: {
    height: 200,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,

  },
  detailName: {
    padding: 10,
    width: screenWidth - 180,
  },
  name: {
    fontSize: 22,
    color: "#808080",
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
  },
  photosCard: {
    marginTop: 10,
  },
  photo: {
    width: 113,
    height: 113,
    marginTop: 5,
    marginRight: 5,
  }
});