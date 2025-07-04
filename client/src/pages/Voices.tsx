
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Pause, Volume2, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Voice {
  id: string;
  name: string;
  gender: string;
  accent: string;
  description: string;
  language: string;
  provider: string;
  premium: boolean;
  preview_url?: string;
}

export default function Voices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const voices: Voice[] = [
    {
      id: "11labs-Adrian",
      name: "Adrian",
      gender: "Male",
      accent: "American",
      description: "Warm and professional male voice, perfect for customer service",
      language: "English (US)",
      provider: "ElevenLabs",
      premium: true
    },
    {
      id: "11labs-Bella",
      name: "Bella",
      gender: "Female",
      accent: "American",
      description: "Clear and professional female voice for business applications",
      language: "English (US)", 
      provider: "ElevenLabs",
      premium: true
    },
    {
      id: "11labs-Charlie",
      name: "Charlie",
      gender: "Male",
      accent: "British",
      description: "Friendly British male voice with natural intonation",
      language: "English (UK)",
      provider: "ElevenLabs",
      premium: true
    },
    {
      id: "11labs-Emily",
      name: "Emily",
      gender: "Female",
      accent: "American",
      description: "Clear and articulate female voice for professional use",
      language: "English (US)",
      provider: "ElevenLabs",
      premium: true
    },
    {
      id: "openai-alloy",
      name: "Alloy",
      gender: "Neutral",
      accent: "American",
      description: "Balanced neutral voice suitable for various applications",
      language: "English (US)",
      provider: "OpenAI",
      premium: false
    },
    {
      id: "openai-echo",
      name: "Echo",
      gender: "Male",
      accent: "American", 
      description: "Clear male voice with excellent pronunciation",
      language: "English (US)",
      provider: "OpenAI",
      premium: false
    },
    {
      id: "openai-fable",
      name: "Fable",
      gender: "Male",
      accent: "British",
      description: "Distinguished British male voice for professional content",
      language: "English (UK)",
      provider: "OpenAI",
      premium: false
    },
    {
      id: "openai-onyx",
      name: "Onyx",
      gender: "Male",
      accent: "American",
      description: "Deep and authoritative male voice",
      language: "English (US)",
      provider: "OpenAI",
      premium: false
    },
    {
      id: "openai-nova",
      name: "Nova",
      gender: "Female",
      accent: "American",
      description: "Youthful and energetic female voice",
      language: "English (US)",
      provider: "OpenAI",
      premium: false
    },
    {
      id: "openai-shimmer",
      name: "Shimmer",
      gender: "Female",
      accent: "American",
      description: "Soft and gentle female voice",
      language: "English (US)",
      provider: "OpenAI",
      premium: false
    }
  ];

  const filteredVoices = voices.filter(voice => {
    const matchesSearch = voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         voice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === "all" || voice.language.includes(selectedLanguage);
    const matchesGender = selectedGender === "all" || voice.gender.toLowerCase() === selectedGender;
    
    return matchesSearch && matchesLanguage && matchesGender;
  });

  const handlePlayVoice = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceId);
      // In a real implementation, this would play the voice sample
      console.log(`Playing voice: ${voiceId}`);
      // Auto-stop after 3 seconds for demo
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Voice Library</h1>
            <p className="text-purple-100 text-lg">Explore and preview AI voices for your agents</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{voices.length}</div>
            <div className="text-purple-100">Available Voices</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search voices by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-3">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="English (US)">English (US)</SelectItem>
              <SelectItem value="English (UK)">English (UK)</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedGender} onValueChange={setSelectedGender}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genders</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Voice Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVoices.map((voice) => (
          <Card key={voice.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Volume2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{voice.name}</CardTitle>
                    <p className="text-sm text-gray-500">{voice.provider}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {voice.premium && (
                    <Badge variant="default" className="bg-purple-600 hover:bg-purple-700">
                      Premium
                    </Badge>
                  )}
                  <Badge variant="outline">{voice.gender}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Language:</span>
                  <span className="font-medium">{voice.language}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Accent:</span>
                  <span className="font-medium">{voice.accent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Voice ID:</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {voice.id}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{voice.description}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handlePlayVoice(voice.id)}
                  className="flex-1"
                  variant={playingVoice === voice.id ? "destructive" : "default"}
                >
                  {playingVoice === voice.id ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Preview
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1">
                  Use Voice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVoices.length === 0 && (
        <div className="text-center py-12">
          <Volume2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Voices Found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
}
