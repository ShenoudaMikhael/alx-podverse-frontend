"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import io from "socket.io-client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import SocketClient from "@/api/socketClient";

// const socket = SocketClient.socket
// console.log('chat component socket.id ',socket);
const LiveChat = ({ socket, room, uname }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(uname);

  useEffect(() => {
    socket.on("chat message", (message) => {
      setMessages((prev) => [...prev, `${username}: ${message}`]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit("chat message", { message, room },);
      setMessage("");
    }
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <ScrollArea className="flex-grow h-[calc(100vh-30rem)] p-4">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <p key={index} className="break-words">
              {message}
            </p>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your text message..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="w-4 h-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default LiveChat;
