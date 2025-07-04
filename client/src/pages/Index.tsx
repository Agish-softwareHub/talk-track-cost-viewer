
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { AuthModal } from "@/components/AuthModal";
import { Navigate } from "react-router-dom";
import Home from "./Home";

const Index = () => {
  const { user, login, signup, isLoading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Home onAuthClick={() => setIsAuthModalOpen(true)} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={login}
        onSignup={signup}
      />
    </>
  );
};

export default Index;
