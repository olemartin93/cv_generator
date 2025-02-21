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

interface CVFormProps {
  onSubmit: (data: CVData) => void;
}

export default function CVForm({ onSubmit }: CVFormProps) {
  const [profileImage, setProfileImage] = useState<string>("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { institution: "", degree: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", level: 50 }]);
  };

  const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setSkills(newSkills);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      profileImage,
      title,
      summary,
      personalInfo: { name, email, phone, location },
      education,
      skills,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Profile Image</h2>
        <div className="flex items-center space-x-4">
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Basic Information</h2>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
            />
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief overview of your professional background"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Education</h2>
          <Button type="button" onClick={addEducation} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add Education
          </Button>
        </div>
        <div className="space-y-4">
          {education.map((edu, index) => (
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
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                />
                <Input
                  placeholder="Degree"
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
                  placeholder="Description"
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
          <h2 className="text-2xl font-bold">Skills</h2>
          <Button type="button" onClick={addSkill} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add Skill
          </Button>
        </div>
        <div className="space-y-4">
          {skills.map((skill, index) => (
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
                  placeholder="Skill name"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, "name", e.target.value)}
                />
                <div className="space-y-2">
                  <Label>Proficiency Level</Label>
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

      <Button type="submit" className="w-full">Generate CV</Button>
    </form>
  );
}