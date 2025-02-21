export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface CVData {
  profileImage?: string;
  title: string;
  summary: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  education: Education[];
  skills: Skill[];
}