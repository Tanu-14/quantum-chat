import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Oops! 🌸",
        description: "Passwords don't match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate signup process
    setTimeout(() => {
      if (formData.username && formData.email && formData.password) {
        localStorage.setItem("quantum-user", JSON.stringify({ username: formData.username, email: formData.email }));
        toast({
          title: "Welcome to the quantum realm! 🌟",
          description: `Account created for ${formData.username}`,
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
          <p className="text-muted-foreground text-lg">Join the cosmic conversation! ✨</p>
        </div>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Create Your Cosmic Identity</CardTitle>
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
                  placeholder="Choose your cosmic handle..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-quantum border-0 bg-input/50"
                  placeholder="your@cosmic.email"
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
                  placeholder="Create your quantum key..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="input-quantum border-0 bg-input/50"
                  placeholder="Confirm your quantum key..."
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full btn-quantum border-0"
                disabled={isLoading}
              >
                {isLoading ? "Creating your cosmic identity..." : "Join the Quantum Realm! 🌟"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have a cosmic identity?{" "}
                <Link 
                  to="/login" 
                  className="text-primary hover:underline font-medium transition-colors"
                >
                  Enter the quantum realm
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;