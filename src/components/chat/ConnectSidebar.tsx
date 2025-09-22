import { useState } from "react";
import { Search, Users, UserPlus, MessageCircle, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  username: string;
  email?: string;
}

interface Friend {
  id: string;
  username: string;
  status: "online" | "offline" | "away";
  avatar?: string;
}

interface FriendRequest {
  id: string;
  username: string;
  type: "sent" | "received";
}

interface ConnectSidebarProps {
  user: User;
  onChatSelect: (chatId: string) => void;
}

export const ConnectSidebar = ({ user, onChatSelect }: ConnectSidebarProps) => {
  const [activeTab, setActiveTab] = useState<"friends" | "requests" | "search">("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - in real app this would come from your backend
  const [friends] = useState<Friend[]>([
    { id: "1", username: "CosmicPanda", status: "online" },
    { id: "2", username: "QuantumKitten", status: "away" },
    { id: "3", username: "StarlightFox", status: "offline" },
  ]);

  const [friendRequests] = useState<FriendRequest[]>([
    { id: "1", username: "NewFriend123", type: "received" },
    { id: "2", username: "ChatLover", type: "sent" },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("quantum-user");
    navigate("/login");
    toast({
      title: "See you in the quantum realm! 👋",
      description: "You've been logged out successfully",
    });
  };

  const handleFriendRequest = (username: string, action: "accept" | "reject") => {
    toast({
      title: action === "accept" ? "Friend added! 🎉" : "Request declined",
      description: `${username} ${action === "accept" ? "is now your friend!" : "request has been declined"}`,
    });
  };

  const handleSendFriendRequest = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Friend request sent! 💫",
        description: `Sent request to ${searchQuery}`,
      });
      setSearchQuery("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-400";
      case "away": return "bg-yellow-400";
      default: return "bg-gray-400";
    }
  };

  return (
    <Sidebar className="w-80 border-r-0">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-sidebar-foreground">{user.username}</h2>
              <p className="text-sm text-sidebar-foreground/60">Online ✨</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex mt-4 space-x-1 p-1 bg-sidebar-accent rounded-lg">
          {[
            { key: "friends", icon: Users, label: "Friends" },
            { key: "requests", icon: UserPlus, label: "Requests" },
            { key: "search", icon: Search, label: "Search" },
          ].map(({ key, icon: Icon, label }) => (
            <Button
              key={key}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(key as any)}
              className={`flex-1 ${
                activeTab === key
                  ? "bg-sidebar text-sidebar-foreground shadow-sm"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="h-4 w-4 mr-1" />
              {label}
            </Button>
          ))}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {activeTab === "search" && (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Search username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-quantum border-sidebar-border bg-sidebar-accent/50"
              />
              <Button
                onClick={handleSendFriendRequest}
                size="sm"
                className="btn-quantum border-0 px-3"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-sidebar-foreground/60 text-center mt-8">
              Search for cosmic friends by their username! 🌟
            </p>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="space-y-3">
            {friendRequests.length === 0 ? (
              <p className="text-sm text-sidebar-foreground/60 text-center mt-8">
                No friend requests at the moment 🌸
              </p>
            ) : (
              friendRequests.map((request) => (
                <div key={request.id} className="glass-card p-3 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center text-accent-foreground font-semibold text-sm">
                        {request.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-sidebar-foreground">{request.username}</p>
                        <p className="text-xs text-sidebar-foreground/60">
                          {request.type === "received" ? "Wants to be friends" : "Request sent"}
                        </p>
                      </div>
                    </div>
                    {request.type === "received" && (
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          onClick={() => handleFriendRequest(request.username, "accept")}
                          className="btn-quantum border-0 h-8 px-3 text-xs"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFriendRequest(request.username, "reject")}
                          className="h-8 px-3 text-xs text-sidebar-foreground/60 hover:text-destructive"
                        >
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "friends" && (
          <div className="space-y-3">
            {friends.length === 0 ? (
              <p className="text-sm text-sidebar-foreground/60 text-center mt-8">
                No friends yet. Start connecting! ✨
              </p>
            ) : (
              friends.map((friend) => (
                <div
                  key={friend.id}
                  onClick={() => onChatSelect(friend.id)}
                  className="glass-card p-3 rounded-xl cursor-pointer hover:bg-sidebar-accent/50 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-accent-foreground font-semibold">
                        {friend.username.charAt(0).toUpperCase()}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-sidebar ${getStatusColor(friend.status)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sidebar-foreground">{friend.username}</p>
                        <MessageCircle className="h-4 w-4 text-sidebar-foreground/40" />
                      </div>
                      <p className="text-sm text-sidebar-foreground/60 capitalize">{friend.status}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};