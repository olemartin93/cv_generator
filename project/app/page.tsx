"use client";

import { useState } from "react";
import CVForm from "./components/cv-form";
import CVPreview from "./components/cv-preview";
import { CVData } from "./types/cv";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [cvData, setCVData] = useState<CVData | null>(null);
  const [activeTab, setActiveTab] = useState("form");

  const handleSubmit = (data: CVData) => {
    setCVData(data);
    setActiveTab("preview");
  };

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">CV Builder</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Edit</TabsTrigger>
          <TabsTrigger value="preview" disabled={!cvData}>Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="mt-6">
          <CVForm onSubmit={handleSubmit} />
        </TabsContent>
        <TabsContent value="preview" className="mt-6">
          {cvData && <CVPreview data={cvData} />}
        </TabsContent>
      </Tabs>
    </main>
  );
}