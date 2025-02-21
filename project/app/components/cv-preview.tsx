"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CVData } from "../types/cv";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CVPreviewProps {
  data: CVData;
}

export default function CVPreview({ data }: CVPreviewProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!targetRef.current) return;

    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for images
        logging: false,
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight
      );
      
      pdf.save('cv.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={generatePDF} className="w-full">
        Download PDF
      </Button>
      
      <Card className="p-8" ref={targetRef}>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center space-x-6">
            {data.profileImage && (
              <img
                src={data.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
                crossOrigin="anonymous"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
              <p className="text-xl text-muted-foreground">{data.title}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>{data.personalInfo.email}</div>
            <div>{data.personalInfo.phone}</div>
            <div>{data.personalInfo.location}</div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
            <p className="text-muted-foreground">{data.summary}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{edu.institution}</h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm text-muted-foreground">{skill.level}%</p>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}