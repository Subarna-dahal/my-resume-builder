export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export type TemplateId = 'classic' | 'modern' | 'bold' | 'minimalist' | 'creative' | 'professional';

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface ResumeData {
  templateId: TemplateId;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    photo?: string;
    photoSize?: number;
  };
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  languages: Language[];
  settings: {
    fontSize: number;
    sectionSpacing: number;
  };
}

export const initialResumeData: ResumeData = {
  templateId: 'classic',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photo: '',
    photoSize: 120,
  },
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  languages: [],
  settings: {
    fontSize: 14,
    sectionSpacing: 24,
  },
};
