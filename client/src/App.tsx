
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import CallDetails from "./pages/CallDetails";
import Transcripts from "./pages/Transcripts";
import Credits from "./pages/Credits";
import Settings from "./pages/Settings";
import AIConfiguration from "./pages/AIConfiguration";
import GoogleIntegration from "./pages/GoogleIntegration";
import WhatsAppIntegration from "./pages/WhatsAppIntegration";
import Analytics from "./pages/Analytics";
import CallQueue from "./pages/CallQueue";
import TeamManagement from "./pages/TeamManagement";
import Scheduler from "./pages/Scheduler";
import CallScoring from "./pages/CallScoring";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import Performance from "./pages/Performance";
import Security from "./pages/Security";
import NotFound from "./pages/NotFound";
import AIAgents from "./pages/AIAgents";
import Billing from "./pages/Billing";
import Developer from "./pages/Developer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/queue" element={<CallQueue />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/scoring" element={<CallScoring />} />
            <Route path="/sentiment" element={<SentimentAnalysis />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/security" element={<Security />} />
            <Route path="/transcripts" element={<Transcripts />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ai-agents" element={<AIAgents />} />
            <Route path="/developer" element={<Developer />} />
            <Route path="/google-integration" element={<GoogleIntegration />} />
            <Route path="/whatsapp-integration" element={<WhatsAppIntegration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
