import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (formData.username && formData.password) {
        localStorage.setItem("quantum-user", JSON.stringify({ username: formData.username }));
        toast({
          title: "Welcome back! 💫",
          description: `Logged in as ${formData.username}`,
        });
        navigate("/chat");
      } else {
        toast({
          title: "Oops! 🌸",
          description: "Please fill in all fields",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
            Quantum Cutie Chat
          </h1>
          <p className="text-muted-foreground text-lg">Connect with your cosmic friends! ✨</p>
        </div>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="input-quantum border-0 bg-input/50"
                  placeholder="Enter your cosmic handle..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-quantum border-0 bg-input/50"
                  placeholder="Your secret quantum key..."
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full btn-quantum border-0"
                disabled={isLoading}
              >
                {isLoading ? "Connecting to the quantum realm..." : "Enter the Chat! 🚀"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                New to the quantum realm?{" "}
                <Link 
                  to="/signup" 
                  className="text-primary hover:underline font-medium transition-colors"
                >
                  Create your cosmic identity
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;