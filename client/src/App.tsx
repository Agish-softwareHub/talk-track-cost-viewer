
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
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
import IntegrationHub from "./pages/IntegrationHub";
import LiveMonitoring from "./pages/LiveMonitoring";
import KnowledgeBase from "./pages/KnowledgeBase";
import CallRecordings from "./pages/CallRecordings";
import CustomerCRM from "./pages/CustomerCRM";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/queue" element={<Layout><CallQueue /></Layout>} />
          <Route path="/scheduler" element={<Layout><Scheduler /></Layout>} />
          <Route path="/scoring" element={<Layout><CallScoring /></Layout>} />
          <Route path="/sentiment" element={<Layout><SentimentAnalysis /></Layout>} />
          <Route path="/performance" element={<Layout><Performance /></Layout>} />
          <Route path="/security" element={<Layout><Security /></Layout>} />
          <Route path="/transcripts" element={<Layout><Transcripts /></Layout>} />
          <Route path="/credits" element={<Layout><Credits /></Layout>} />
          <Route path="/billing" element={<Layout><Billing /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/ai-agents" element={<Layout><AIAgents /></Layout>} />
          <Route path="/developer" element={<Layout><Developer /></Layout>} />
          <Route path="/integration-hub" element={<Layout><IntegrationHub /></Layout>} />
          <Route path="/live-monitoring" element={<Layout><LiveMonitoring /></Layout>} />
          <Route path="/knowledge-base" element={<Layout><KnowledgeBase /></Layout>} />
          <Route path="/call-recordings" element={<Layout><CallRecordings /></Layout>} />
          <Route path="/customer-crm" element={<Layout><CustomerCRM /></Layout>} />
          <Route path="/google-integration" element={<Layout><GoogleIntegration /></Layout>} />
          <Route path="/whatsapp-integration" element={<Layout><WhatsAppIntegration /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
