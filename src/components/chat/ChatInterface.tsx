import { useState, useRef, useEffect } from "react";
import { Send, Smile, Paperclip, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  type: "sent" | "received";
}

interface ChatInterfaceProps {
  user: any;
  activeChat: string | null;
}

export const ChatInterface = ({ user, activeChat }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! Welcome to the quantum realm! ✨",
      sender: "CosmicPanda",
      timestamp: new Date(Date.now() - 300000),
      type: "received"
    },
    {
      id: "2",
      text: "Thanks! This looks amazing! 🌟",
      sender: user.username,
      timestamp: new Date(Date.now() - 240000),
      type: "sent"
    },
    {
      id: "3",
      text: "The quantum gradients are so pretty! How did you make this chat so cute? 🌸",
      sender: "CosmicPanda",
      timestamp: new Date(Date.now() - 180000),
      type: "received"
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() && activeChat) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: user.username,
        timestamp: new Date(),
        type: "sent"
      };
      
      setMessages([...messages, message]);
      setNewMessage("");
      
      // Simulate a response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: "That's awesome! The quantum realm is full of surprises! 🚀",
          sender: "CosmicPanda",
          timestamp: new Date(),
          type: "received"
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="border-b border-sidebar-border p-4 flex items-center">
          <SidebarTrigger className="mr-3" />
          <h1 className="text-xl font-semibold">Quantum Cutie Chat</h1>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-2xl font-semibold gradient-primary bg-clip-text text-transparent mb-2">
              Welcome to the Quantum Realm!
            </h2>
            <p className="text-muted-foreground max-w-md">
              Select a friend from the sidebar to start your cosmic conversation! 
              The quantum entanglement awaits... ✨
            </p>
          </div>
        </div>
      </div>
    );
  }

  const activeFriend = "CosmicPanda"; // In real app, get from activeChat ID

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="border-b border-sidebar-border p-4 flex items-center justify-between glass-card">
        <div className="flex items-center space-x-3">
          <SidebarTrigger className="md:hidden" />
          <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-accent-foreground font-semibold">
            {activeFriend.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold">{activeFriend}</h2>
            <p className="text-sm text-muted-foreground">Online • Last seen now</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div className="max-w-xs lg:max-w-md">
              <div
                className={`px-4 py-2 ${
                  message.type === "sent"
                    ? "chat-bubble-sent ml-auto"
                    : "chat-bubble-received"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <div className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"} mt-1`}>
                <span className="text-xs text-muted-foreground">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your quantum message... ✨"
              className="input-quantum border-0 bg-input/50 pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            onClick={handleSendMessage}
            className="btn-quantum border-0"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};