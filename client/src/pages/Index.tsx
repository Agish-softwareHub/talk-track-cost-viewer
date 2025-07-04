
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Index = () => {
  const navigate = useNavigate();

  // Check if user is authenticated or should see dashboard
  useEffect(() => {
    // For demo purposes, we'll show the home page
    // In a real app, you'd check authentication status here
    const shouldShowDashboard = localStorage.getItem('showDashboard');
    if (shouldShowDashboard === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return <Home />;
};

export default Index;
