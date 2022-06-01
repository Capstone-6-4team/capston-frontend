import React, { useEffect, useRef, useState } from "react";

import styled from "@emotion/styled";
import tw from "twin.macro";

const ChatListWrapper = styled.div`
  &::-webkit-scrollbar {
    width: 4px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  ${tw`flex flex-col mt-2 overflow-y-auto gap-1 w-full h-full`}`;

const MyChatWrapper = styled.div`
${tw`mx-2 py-2 px-4 bg-indigo-300 border text-sm rounded-bl-3xl font-semibold rounded-tl-3xl rounded-tr-xl `}
`;

const MyChat = ({ chat }) => {
    return (
        <div class="text-right my-1">
            <span class="mx-3 text-xs block">{chat.username}</span>
            <span class="mx-2 py-1 px-4 bg-green-300 border text-sm rounded-bl-3xl font-semibold rounded-tl-3xl rounded-tr-xl">
                {chat.message}
            </span>
        </div>
    );
};

const OhterChat = ({ chat }) => {
    return (
        <div class="text-left my-1">
            <span class="mx-3 text-xs block">{chat.username}</span>
            <span class="mx-2 py-1 px-4 bg-gray-300 text-sm border rounded-br-3xl font-semibold rounded-tr-3xl rounded-tl-xl">
                {chat.message}
            </span>
        </div>
    );
};

export const ChatList = ({ chatList, myId }) => {

    const scrollRef = useRef(null);

    useEffect(() => {
        const scroll = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
        scrollRef.current.scrollTo(0, scroll);
    }, [chatList])

    return (
        <ChatListWrapper ref={scrollRef}>
            {chatList ? chatList.map((chat, index) => {
                if (chat.userId == myId) {
                    return <MyChat chat={chat} key={index} />;
                } else {
                    return <OhterChat chat={chat} key={index} />;
                }
            }) : null}
        </ChatListWrapper>
    )
};