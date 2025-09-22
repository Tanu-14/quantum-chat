import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ConnectSidebar } from "@/components/chat/ConnectSidebar";
import { ChatInterface } from "@/components/chat/ChatInterface";

const Chat = () => {
  const [user, setUser] = useState<any>(null);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("quantum-user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-bounce-soft text-2xl">🌟 Loading quantum realm...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <ConnectSidebar user={user} onChatSelect={setActiveChat} />
        <ChatInterface user={user} activeChat={activeChat} />
      </div>
    </SidebarProvider>
  );
};

export default Chat;