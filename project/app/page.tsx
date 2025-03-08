"use client";

import { useState } from "react";
import CVForm from "./components/cv-form";
import CVPreview from "./components/cv-preview";
import { CVData } from "./types/cv";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const emptyCV: CVData = {
  profileImage: "",
  title: "",
  summary: "",
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
  },
  education: [],
  skills: [],
};

export default function Home() {
  const [cvData, setCVData] = useState<CVData>(emptyCV);
  const [activeTab, setActiveTab] = useState("form");
  const [isCircular, setIsCircular] = useState(true);

  const handleSubmit = (data: CVData) => {
    setCVData(data);
    setActiveTab("preview");
  };

  const handleFormChange = (data: CVData) => {
    setCVData(data);
  };

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">CV-bygger</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Rediger</TabsTrigger>
          <TabsTrigger value="preview">Forhåndsvisning</TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="mt-6">
          <CVForm 
            data={cvData} 
            onChange={handleFormChange} 
            onSubmit={handleSubmit}
            isCircular={isCircular}
            onImageShapeChange={setIsCircular}
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-6">
          <CVPreview data={cvData} isCircular={isCircular} />
        </TabsContent>
      </Tabs>
    </main>
  );
}