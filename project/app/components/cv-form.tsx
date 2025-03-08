"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { CVData, Education, Skill } from "../types/cv";
import { Switch } from "@/components/ui/switch";

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
  onSubmit: (data: CVData) => void;
  isCircular: boolean;
  onImageShapeChange: (isCircular: boolean) => void;
}

export default function CVForm({ data, onChange, onSubmit, isCircular, onImageShapeChange }: CVFormProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange({ ...data, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (newData: CVData) => {
    onChange(newData);
  };

  const addEducation = () => {
    handleChange({
      ...data,
      education: [
        ...data.education,
        { institution: "", degree: "", startDate: "", endDate: "", description: "" },
      ],
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...data.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    handleChange({ ...data, education: newEducation });
  };

  const removeEducation = (index: number) => {
    handleChange({
      ...data,
      education: data.education.filter((_, i) => i !== index),
    });
  };

  const addSkill = () => {
    handleChange({
      ...data,
      skills: [...data.skills, { name: "", level: 50 }],
    });
  };

  const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
    const newSkills = [...data.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    handleChange({ ...data, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    handleChange({
      ...data,
      skills: data.skills.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Profilbilde</h2>
        <div className="flex items-center space-x-4">
          {data.profileImage && (
            <img
              src={data.profileImage}
              alt="Profil"
              className={`w-24 h-24 object-cover ${isCircular ? 'rounded-full' : 'rounded-md'}`}
            />
          )}
          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="max-w-xs"
            />
            <Label htmlFor="image-shape" className="cursor-pointer">
              Bytt bildeform
            </Label>
            <Switch
              checked={isCircular}
              onCheckedChange={onImageShapeChange}
              id="image-shape"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Grunnleggende informasjon</h2>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="title">Yrkestittel</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => handleChange({ ...data, title: e.target.value })}
              placeholder="f.eks., Senior Programvareutvikler"
            />
          </div>
          <div>
            <Label htmlFor="summary">Profesjonell sammendrag</Label>
            <Textarea
              id="summary"
              value={data.summary}
              onChange={(e) => handleChange({ ...data, summary: e.target.value })}
              placeholder="Kort oversikt over din profesjonelle bakgrunn"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Personlig informasjon</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Fullt navn</Label>
            <Input
              id="name"
              value={data.personalInfo.name}
              onChange={(e) =>
                handleChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, name: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              type="email"
              value={data.personalInfo.email}
              onChange={(e) =>
                handleChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, email: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={data.personalInfo.phone}
              onChange={(e) =>
                handleChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, phone: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="location">Sted</Label>
            <Input
              id="location"
              value={data.personalInfo.location}
              onChange={(e) =>
                handleChange({
                  ...data,
                  personalInfo: { ...data.personalInfo, location: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Utdanning</h2>
          <Button type="button" onClick={addEducation} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Legg til utdanning
          </Button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <Card key={index} className="p-4">
              <div className="grid gap-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Institusjon"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                />
                <Input
                  placeholder="Grad"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                  />
                  <Input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                  />
                </div>
                <Textarea
                  placeholder="Beskrivelse"
                  value={edu.description}
                  onChange={(e) => updateEducation(index, "description", e.target.value)}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Ferdigheter</h2>
          <Button type="button" onClick={addSkill} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Legg til ferdighet
          </Button>
        </div>
        <div className="space-y-4">
          {data.skills.map((skill, index) => (
            <Card key={index} className="p-4">
              <div className="grid gap-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeSkill(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Ferdighetsnavn"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, "name", e.target.value)}
                />
                <div className="space-y-2">
                  <Label>Ferdighetsnivå</Label>
                  <Slider
                    value={[skill.level]}
                    onValueChange={(value) => updateSkill(index, "level", value[0])}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full">Generer CV</Button>
    </form>
  );
}