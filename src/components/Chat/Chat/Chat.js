import React, { useCallback, useEffect, useState } from 'react';

import { Bubble, GiftedAvatar, GiftedChat, MessageText } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { IS_ORDER_STRING_SET } from "@commons/Enums"
import postMessage from "@commons/api/postMessage"
import putMessage from "@commons/api/putMessage"
import { StyleSheet, Clipboard } from 'react-native';
import {
  setSelectedBusiness
} from "@redux"
import store from '@redux/store';
import { View } from 'react-native';
import CompleteOrder from '../CompleteOrder/CompleteOrder';
import { Text } from 'react-native';
import storePng from '../../../../assets/store.png';
import { Image } from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import StarRating from "react-native-star-rating";

export default function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const selectedChat = useSelector(state => state.chat.selectedChat)
  const user = useSelector(state => state.auth.user)
  const [modalVisible, setModalVisible] = useState(false);
  const [_reply, _setReply] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setMessages(selectedChat.messages)
  }, [selectedChat])

  const isOrder = (message) => {
    let _message = Object.assign({}, message)
    if (new RegExp(IS_ORDER_STRING_SET.join("|")).test(_message.text)) {
      _message.quickReplies = {
        type: 'radio', // 'radio' or 'checkbox',
        values: [
          {
            title: 'Mark As Order',
            value: "order",
          }
        ],
      }
    }
    _message.businessId = selectedChat.business.id
    _message.id = _message._id
    return _message
  }

  const onSend = useCallback((messages = []) => {
    let _message = isOrder(messages[0])
    _message.isOrder = false
    _message.from = _message.user._id
    _message.to = _message.businessId
    postMessage(_message)
  }, [])

  const onQuickReply = (e) => {
    let reply = e[0]
    _setReply(reply)
    if (reply.value === "order") {
      setModalVisible(true)
    }
    else if (reply.value === "completeOrder") {
      let _message = messages.find(message => message._id === reply.messageId)

      if (_message) {
        _message.quickReplies = null
        _message.isAccepted = true
        putMessage(_message)
      }
    }
  }

  const onSubmitPress = (v1, v2) => {
    let _message = messages.find(message => message._id === _reply.messageId)

    if (_message) {
      _message.quickReplies = null
      putMessage(_message)
      _message2 = Object.assign({}, _message)
      _message2._id = "order" + _message2._id
      _message2.isOrder = true
      _message2.payment = v1
      _message2.service = v2
      _message2.text = `${_message2.text}
${v1 ? "Self Service" : "Carrier"}
${v2 ? "Credit Card" : "Cash"}
address`
      postMessage(_message2)
    }
  }

  const onRenderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: props.currentMessage.isOrder ? "#303f9f" : "#1976d2",
            textColor: "#fff",
          },
          left: {
            backgroundColor: "#1976d2",
            textColor: "#fff",
          },
        }}
      />
    )
  }

  const onRenderMessageText = (props) => (
    <MessageText
      {...props}
      textStyle={{
        left: { color: '#fff' },
        right: { color: '#fff' },
      }}
      linkStyle={{
        left: { color: 'orange' },
        right: { color: 'orange' },
      }}
    />
  );

  const onLongPress = (context, message) => {
    if (message.user._id === user.sub) {
      const options = [
        'Copy Text',
        message.isOrder ? 'Mark As Not Order' : 'Mark As Order',
        'Cancel',
      ];

      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex,
      },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(message.text);
              break;
            case 1:
              let copyOfMessages = Object.assign([], messages)
              let messageToOrder = copyOfMessages.find(_message => _message._id === message._id)
              if (messageToOrder) {
                if (messageToOrder.isOrder) {
                  messageToOrder.quickReplies = null
                  messageToOrder.isOrder = false
                  messageToOrder.up = "1"
                  putMessage(messageToOrder)
                }
                else {
                  messageToOrder.quickReplies = null
                  messageToOrder.isOrder = true
                  messageToOrder.up = "2"
                  putMessage(messageToOrder)
                }
              }
              break;
          }
        })
    }
    else {

    }
  }

  const onPressAvatar = (user) => {
    store.dispatch(setSelectedBusiness(selectedChat.business));
    navigation.navigate('BusinessDetail');
  }

  const renderSystemMessage = (props) => {
    return (
      <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please Rate</Text>
        <StarRating
          starSize={30}
          maxStars={5}
          emptyStar={'star-outline'}
          fullStar={'star'}
          halfStar={'star-half-full'}
          iconSet={'MaterialCommunityIcons'}
          fullStarColor={'gold'}
          rating={rating}
          selectedStar={(rate) => selectedStar(rate)}
        />
      </View>
    )
  }

  const selectedStar = (rate) => {
    setRating(rate)
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          ...user,
          _id: user.sub,
          name: user.name,
          avatar: selectedChat && selectedChat.user && selectedChat.user.picture && selectedChat.user.picture,
        }}
        renderAvatar={null}
        onQuickReply={(e) => { onQuickReply(e) }}
        renderBubble={(props) => onRenderBubble(props)}
        renderMessageText={(props) => onRenderMessageText(props)}
        onLongPress={onLongPress}
        onPressAvatar={onPressAvatar}
        renderSystemMessage={(props) => renderSystemMessage(props)}
      />
      <CompleteOrder modalVisible={modalVisible} setModalVisible={setModalVisible} onSubmitPress={onSubmitPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});