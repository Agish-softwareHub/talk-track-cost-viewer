import { useState } from "react";
import { Search, BookOpen, Plus, Edit, Trash2, Eye, ThumbsUp, ThumbsDown, Tag, Filter, Star, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");

  const articles = [
    {
      id: 1,
      title: "How to Handle Billing Disputes",
      category: "Billing",
      content: "Step-by-step guide for resolving customer billing disputes effectively...",
      tags: ["billing", "disputes", "customer-service"],
      author: "Sarah Johnson",
      lastUpdated: "2024-01-15",
      views: 245,
      rating: 4.8,
      helpful: 42,
      notHelpful: 3,
      featured: true
    },
    {
      id: 2,
      title: "Technical Troubleshooting Checklist",
      category: "Technical",
      content: "Comprehensive checklist for diagnosing and fixing common technical issues...",
      tags: ["technical", "troubleshooting", "checklist"],
      author: "Mike Wilson",
      lastUpdated: "2024-01-12",
      views: 189,
      rating: 4.6,
      helpful: 35,
      notHelpful: 2,
      featured: false
    },
    {
      id: 3,
      title: "Product Features Guide",
      category: "Sales",
      content: "Complete overview of all product features and benefits for sales conversations...",
      tags: ["sales", "product", "features"],
      author: "Emily Davis",
      lastUpdated: "2024-01-10",
      views: 312,
      rating: 4.9,
      helpful: 58,
      notHelpful: 1,
      featured: true
    },
    {
      id: 4,
      title: "Customer Escalation Procedures",
      category: "Support",
      content: "When and how to escalate customer issues to management or specialists...",
      tags: ["escalation", "management", "procedures"],
      author: "John Smith",
      lastUpdated: "2024-01-08",
      views: 156,
      rating: 4.4,
      helpful: 28,
      notHelpful: 4,
      featured: false
    },
    {
      id: 5,
      title: "AI Agent Configuration Best Practices",
      category: "AI",
      content: "Optimal settings and configurations for AI agents in different scenarios...",
      tags: ["ai", "configuration", "best-practices"],
      author: "Lisa Brown",
      lastUpdated: "2024-01-14",
      views: 98,
      rating: 4.7,
      helpful: 19,
      notHelpful: 1,
      featured: false
    },
    {
      id: 6,
      title: "New Employee Onboarding Guide",
      category: "Training",
      content: "Complete onboarding process for new call center agents...",
      tags: ["onboarding", "training", "new-employee"],
      author: "David Lee",
      lastUpdated: "2024-01-13",
      views: 67,
      rating: 4.5,
      helpful: 12,
      notHelpful: 0,
      featured: false
    }
  ];

  const categories = ["all", "Billing", "Technical", "Sales", "Support", "AI", "Training"];
  const allTags = ["all", "billing", "technical", "sales", "support", "ai", "training", "troubleshooting", "customer-service", "escalation"];

  const faqItems = [
    {
      question: "How do I access call recordings?",
      answer: "Navigate to Call Reports > select the call > click 'Play Recording' button.",
      category: "General",
      helpful: 156
    },
    {
      question: "What's the maximum call duration?",
      answer: "Standard calls can last up to 60 minutes. Extended calls require supervisor approval.",
      category: "Technical",
      helpful: 89
    },
    {
      question: "How to transfer calls to specialists?",
      answer: "Use the transfer button, select department, wait for confirmation before disconnecting.",
      category: "Support",
      helpful: 234
    },
    {
      question: "Where can I find my performance metrics?",
      answer: "Go to Performance Dashboard or check your personal metrics in Settings > Performance.",
      category: "General",
      helpful: 178
    }
  ];

  const quickGuides = [
    {
      title: "5-Minute Setup: New Agent",
      steps: 8,
      estimatedTime: "5 min",
      difficulty: "Beginner",
      category: "Training"
    },
    {
      title: "Advanced Call Routing",
      steps: 12,
      estimatedTime: "15 min",
      difficulty: "Advanced",
      category: "Technical"
    },
    {
      title: "Customer Satisfaction Best Practices",
      steps: 6,
      estimatedTime: "8 min",
      difficulty: "Intermediate",
      category: "Support"
    },
    {
      title: "AI Agent Optimization",
      steps: 10,
      estimatedTime: "20 min",
      difficulty: "Advanced",
      category: "AI"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesTag = selectedTag === "all" || article.tags.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  const featuredArticles = articles.filter(article => article.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
            <p className="text-indigo-100">Comprehensive guides, FAQs, and best practices for agents</p>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
            <Plus size={16} className="mr-2" />
            Add Article
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search articles, guides, and FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                {allTags.map(tag => (
                  <SelectItem key={tag} value={tag}>
                    {tag === "all" ? "All Tags" : tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Quick Guides</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className="mb-2">{article.category}</Badge>
                    {article.featured && <Star className="text-yellow-500" size={16} />}
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-3">{article.content}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={12} />
                      {article.views}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} className="text-green-600" />
                        <span>{article.helpful}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500" />
                        <span>{article.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit size={14} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} />
                    Updated {article.lastUpdated}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <Badge variant="outline">{faq.category}</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">{faq.answer}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ThumbsUp size={14} className="text-green-600" />
                      <span>{faq.helpful} people found this helpful</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp size={14} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickGuides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                      <Badge variant="outline">{guide.category}</Badge>
                    </div>
                    <Badge variant={guide.difficulty === "Beginner" ? "secondary" : guide.difficulty === "Intermediate" ? "default" : "destructive"}>
                      {guide.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{guide.steps} steps</span>
                    <span>{guide.estimatedTime}</span>
                  </div>

                  <Button className="w-full">
                    Start Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow border-yellow-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="text-yellow-500" size={16} />
                    <Badge variant="outline" className="border-yellow-300">{article.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{article.content}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        {article.views} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500" />
                        {article.rating}
                      </div>
                    </div>
                    <Button>Read Article</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}