import React, { useState, useEffect } from "react";
import { Redirect, useParams } from 'react-router-dom';

import { Button, Input, TextField } from "@mui/material";
import { hasToken } from "../../utils/hasToken";
import { ChatList } from "./ChatList"
import { stompClient } from "../../App"
import axios from "axios";

const SimpleChat = () => {

    const { roomId, type } = useParams();
    const [state, setState] = useState(true);
    const [messages, setMessages] = useState([
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 1,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 2,
            message: "hello",
            username: "이룸"
        },
        {
            userId: 1,
            message: "hello",
            username: "이룸"
        },
    ]);
    const [message, setMessage] = useState("");
    const [chatRoomId, setChatRoomId] = useState(null);
    const myId = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const sendChat = () => {
        if (!message) return;
        stompClient.send("/pub/" + type + "/" + roomId, { Authorization: token }, message);
        setMessage("");
    }

    const sendIfEnter = (e) => {
        if (e.key === "Enter") {
            sendChat();
        }
    }

    useEffect(() => {
        console.log(token);
        if (!token) {
            setState(false);
            return;
        }

        axios.get("/api/chat/" + type + "/room-info/" + roomId, {
            headers: {
                Authorization: "Bearer " + token
            },
        }).then(res => {
            console.log(res);
            setChatRoomId(res.data.chatRoomId);
            const chatRoomId = res.data.chatRoomId;
            axios.get("/api/chat/prev-chat/" + chatRoomId, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(res => {
                console.log(res.data);
                addMessages(res.data);
            });
        })

        stompClient.connect({ Authorization: token }, () => {
            stompClient.subscribe('/sub/' + type + '/' + roomId, (data) => {
                const newMessage = JSON.parse(data.body);
                addMessage(newMessage);
            }, {
                Authorization: token
            }, (e) => {
                console.log("에러 잡아지나?");
                console.log(e);
            });

            setState(true);
        }, (e) => {
            console.log(e);
            alert("채팅방에 접근할 권한이 없습니다.");
            setState(false);
        });
    }, [])

    const addMessage = (newMessage) => {
        setMessages(messages => [...messages, newMessage]);
    }

    const addMessages = (newMessages) => {
        setMessages(messages => [...newMessages, ...messages]);
        console.log([...newMessages, ...messages]);
    }

    if (!state) {
        window.close();
    }

    return (
        <div class="h-screen resize-none flex flex-col justify-between">
            {/* <div class="h"> */}
            <ChatList chatList={messages} myId={myId} />

            {/* </div> */}
            <div class="flex border rounded mx-2 px-2 mb-2">

                <div class="w-5/6">
                    <Input
                        fullWidth
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        variant="outlined"
                        value={message}
                        onKeyPress={sendIfEnter}
                    />
                </div>
                <div class="w-1/6">
                    <Button onClick={sendChat}>보내기</Button>
                </div>
            </div>
        </div>
    );
}

export default SimpleChat;