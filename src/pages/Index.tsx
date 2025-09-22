import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem("quantum-user");
    if (userData) {
      navigate("/chat");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center animate-fade-in max-w-2xl">
        <div className="mb-8 relative">
          <div className="absolute inset-0 gradient-primary opacity-10 blur-3xl rounded-full"></div>
          <h1 className="relative text-6xl md:text-8xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Quantum Cutie Chat
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            Where cosmic conversations come alive ✨
          </p>
          <p className="text-lg text-muted-foreground/80">
            Connect with friends across the quantum realm in the cutest chat app in the universe!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            onClick={() => navigate("/login")}
            className="btn-quantum border-0 text-lg px-8 py-6"
          >
            Enter the Quantum Realm 🚀
          </Button>
          
          <Button
            onClick={() => navigate("/signup")}
            variant="outline"
            className="glass-card border-border/50 text-lg px-8 py-6 hover:bg-accent/10"
          >
            Create Cosmic Identity 🌟
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-4xl mb-4">💫</div>
            <h3 className="text-xl font-semibold mb-2">Quantum Messaging</h3>
            <p className="text-muted-foreground">
              Send messages that travel through the quantum realm at the speed of cuteness
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-4xl mb-4">🌸</div>
            <h3 className="text-xl font-semibold mb-2">Pastel Perfect</h3>
            <p className="text-muted-foreground">
              Beautiful gradients and smooth animations that make every chat a joy
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold mb-2">Cosmic Friends</h3>
            <p className="text-muted-foreground">
              Find and connect with friends across the universe with our friend system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
