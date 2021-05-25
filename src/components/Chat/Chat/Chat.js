import React, { useCallback, useEffect, useState } from 'react';

import { Bubble, GiftedChat, MessageText } from 'react-native-gifted-chat';
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

export default function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const selectedChat = useSelector(state => state.chat.selectedChat)
  const user = useSelector(state => state.auth.user)
  const [modalVisible, setModalVisible] = useState(false);

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
    postMessage(_message)
  }, [])

  const onQuickReply = (e) => {
    let reply = e[0]
    if (reply.value === "order") {
      let _message = messages.find(message => message._id === reply.messageId)

      if (_message) {
        _message.quickReplies = null
        _message.isOrder = true
        putMessage(_message)
      }
    }
    else if (reply.value === "completeOrder") {
      setModalVisible(true)
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
        onQuickReply={(e) => { onQuickReply(e) }}
        renderBubble={(props) => onRenderBubble(props)}
        renderMessageText={(props) => onRenderMessageText(props)}
        onLongPress={onLongPress}
        onPressAvatar={onPressAvatar}
      />
      <CompleteOrder modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});