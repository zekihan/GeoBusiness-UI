import React, { useCallback, useEffect, useState } from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

export default function Chat({ navigation }) {
  const [messages, setMessages] = useState([]);
  const selectedChat = useSelector(state => state.chat.selectedChat)

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: selectedChat.lastMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: selectedChat.name,
          avatar: selectedChat.photo,
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}