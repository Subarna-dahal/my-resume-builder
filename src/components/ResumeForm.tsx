import React, { useState } from 'react';
import { ResumeData, WorkExperience, Education, TemplateId, Language } from '../types';
import { Plus, Trash2, Layout, Languages, User, Camera, Briefcase, GraduationCap, AlignLeft, Settings2, X } from 'lucide-react';
import { cn } from '../utils';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const templates: { id: TemplateId; name: string; description: string }[] = [
  { id: 'classic', name: 'Classic', description: 'Traditional and professional' },
  { id: 'modern', name: 'Modern', description: 'Clean with emerald accents & Photo' },
  { id: 'bold', name: 'Bold', description: 'High impact with yellow header' },
  { id: 'minimalist', name: 'Minimalist', description: 'Artistic and spacious' },
  { id: 'creative', name: 'Creative', description: 'Playful with pink accents' },
  { id: 'professional', name: 'Professional', description: 'Clean with gray sidebar' },
];

// As per user request: "photo type only one not other should uses"
const TEMPLATES_WITH_PHOTO: TemplateId[] = ['modern'];

type Section = 'template' | 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'languages' | 'layout';

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<Section>('template');

  const updateTemplate = (id: TemplateId) => {
    onChange({ ...data, templateId: id });
  };

  const updateSettings = (field: keyof ResumeData['settings'], value: number) => {
    const currentSettings = data.settings || { fontSize: 14, sectionSpacing: 24 };
    onChange({
      ...data,
      settings: { ...currentSettings, [field]: value },
    });
  };

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string | number) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updatePersonalInfo('photo', '');
  };

  const updateSummary = (value: string) => {
    onChange({ ...data, summary: value });
  };

  const addWorkExperience = () => {
    const newWork: WorkExperience = {
      id: Math.random().toString(36).substr(2, 9),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange({ ...data, workExperience: [...data.workExperience, newWork] });
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string) => {
    onChange({
      ...data,
      workExperience: data.workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeWorkExperience = (id: string) => {
    onChange({
      ...data,
      workExperience: data.workExperience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Math.random().toString(36).substr(2, 9),
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const addLanguage = () => {
    const newLang: Language = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      level: '',
    };
    onChange({ ...data, languages: [...data.languages, newLang] });
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id),
    });
  };

  const updateSkills = (value: string) => {
    onChange({ ...data, skills: value.split(',').map((s) => s.trim()) });
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({ ...data, skills: data.skills.filter(s => s !== skillToRemove) });
  };

  const navItems = [
    { id: 'template', label: 'Template', icon: Layout },
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'summary', label: 'Summary', icon: AlignLeft },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Settings2 },
    { id: 'languages', label: 'Languages', icon: Languages },
    { id: 'layout', label: 'Layout', icon: Settings2 },
  ] as const;

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      {/* Sidebar Navigation */}
      <div className="w-16 md:w-48 bg-slate-50 border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 hidden md:block">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Editor</h2>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 transition-all relative group",
                activeSection === item.id 
                  ? "text-indigo-600 bg-indigo-50/50" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <item.icon size={20} className={cn(activeSection === item.id ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
              <span className="text-sm font-bold hidden md:block">{item.label}</span>
              {activeSection === item.id && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-l-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {activeSection === 'template' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Choose Template</h2>
              <p className="text-slate-500 text-sm">Select a style that fits your professional brand.</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => updateTemplate(template.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all group relative overflow-hidden",
                    data.templateId === template.id
                      ? "border-indigo-600 bg-indigo-50/30"
                      : "border-slate-100 hover:border-slate-300 bg-white"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className={cn(
                      "font-black text-base",
                      data.templateId === template.id ? "text-indigo-700" : "text-slate-900"
                    )}>
                      {template.name}
                    </p>
                    {data.templateId === template.id && (
                      <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{template.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'personal' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Personal Details</h2>
              <p className="text-slate-500 text-sm">How can recruiters reach you?</p>
            </header>
            
            <div className="flex flex-col lg:flex-row gap-10">
              {TEMPLATES_WITH_PHOTO.includes(data.templateId) && (
                <div className="space-y-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Profile Photo</label>
                  <div className="relative group w-48">
                    <div className={cn(
                      "w-48 h-48 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden bg-slate-50 transition-all hover:border-indigo-300",
                      data.personalInfo.photo && "border-solid border-indigo-100"
                    )}>
                      {data.personalInfo.photo ? (
                        <img 
                          src={data.personalInfo.photo} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-slate-300 flex flex-col items-center">
                          <Camera size={32} />
                          <span className="text-xs font-bold mt-2">Upload Photo</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    {data.personalInfo.photo && (
                      <button
                        onClick={removePhoto}
                        className="absolute -top-3 -right-3 bg-white text-red-500 p-2 rounded-xl shadow-xl border border-slate-100 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Photo Size</label>
                      <span className="text-xs font-bold text-indigo-600">{data.personalInfo.photoSize}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="80" 
                      max="240" 
                      step="10"
                      value={data.personalInfo.photoSize || 120}
                      onChange={(e) => updatePersonalInfo('photoSize', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              )}
              
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="e.g. John Doe"
                  value={data.personalInfo.fullName}
                  onChange={(v) => updatePersonalInfo('fullName', v)}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  value={data.personalInfo.email}
                  onChange={(v) => updatePersonalInfo('email', v)}
                />
                <Input
                  label="Phone"
                  placeholder="+1 234 567 890"
                  value={data.personalInfo.phone}
                  onChange={(v) => updatePersonalInfo('phone', v)}
                />
                <Input
                  label="Location"
                  placeholder="New York, NY"
                  value={data.personalInfo.location}
                  onChange={(v) => updatePersonalInfo('location', v)}
                />
                <Input
                  label="Website"
                  placeholder="portfolio.com"
                  value={data.personalInfo.website}
                  onChange={(v) => updatePersonalInfo('website', v)}
                />
                <Input
                  label="LinkedIn"
                  placeholder="linkedin.com/in/johndoe"
                  value={data.personalInfo.linkedin}
                  onChange={(v) => updatePersonalInfo('linkedin', v)}
                />
                <Input
                  label="GitHub"
                  placeholder="github.com/johndoe"
                  value={data.personalInfo.github}
                  onChange={(v) => updatePersonalInfo('github', v)}
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'summary' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Professional Summary</h2>
              <p className="text-slate-500 text-sm">A short pitch about your career goals and expertise.</p>
            </header>
            <textarea
              className="w-full p-4 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none min-h-[240px] text-slate-700 leading-relaxed transition-all"
              placeholder="Briefly describe your professional background and key achievements..."
              value={data.summary}
              onChange={(e) => updateSummary(e.target.value)}
            />
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">Work Experience</h2>
                <p className="text-slate-500 text-sm">List your relevant professional history.</p>
              </div>
              <button
                onClick={addWorkExperience}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 text-sm font-bold"
              >
                <Plus size={18} /> Add
              </button>
            </header>
            <div className="space-y-6">
              {data.workExperience.map((exp) => (
                <div key={exp.id} className="p-6 border-2 border-slate-50 rounded-2xl bg-slate-50/30 relative group hover:border-indigo-100 transition-all">
                  <button
                    onClick={() => removeWorkExperience(exp.id)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Company"
                      value={exp.company}
                      onChange={(v) => updateWorkExperience(exp.id, 'company', v)}
                    />
                    <Input
                      label="Position"
                      value={exp.position}
                      onChange={(v) => updateWorkExperience(exp.id, 'position', v)}
                    />
                    <Input
                      label="Location"
                      value={exp.location}
                      onChange={(v) => updateWorkExperience(exp.id, 'location', v)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Start Date"
                        value={exp.startDate}
                        onChange={(v) => updateWorkExperience(exp.id, 'startDate', v)}
                      />
                      <Input
                        label="End Date"
                        value={exp.endDate}
                        onChange={(v) => updateWorkExperience(exp.id, 'endDate', v)}
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Description</label>
                      <textarea
                        className="w-full p-4 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none min-h-[120px] text-sm text-slate-600 leading-relaxed transition-all"
                        value={exp.description}
                        onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'education' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">Education</h2>
                <p className="text-slate-500 text-sm">Your academic background.</p>
              </div>
              <button
                onClick={addEducation}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 text-sm font-bold"
              >
                <Plus size={18} /> Add
              </button>
            </header>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-6 border-2 border-slate-50 rounded-2xl bg-slate-50/30 relative group hover:border-indigo-100 transition-all">
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="School"
                      value={edu.school}
                      onChange={(v) => updateEducation(edu.id, 'school', v)}
                    />
                    <Input
                      label="Degree"
                      value={edu.degree}
                      onChange={(v) => updateEducation(edu.id, 'degree', v)}
                    />
                    <Input
                      label="Location"
                      value={edu.location}
                      onChange={(v) => updateEducation(edu.id, 'location', v)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Start Date"
                        value={edu.startDate}
                        onChange={(v) => updateEducation(edu.id, 'startDate', v)}
                      />
                      <Input
                        label="End Date"
                        value={edu.endDate}
                        onChange={(v) => updateEducation(edu.id, 'endDate', v)}
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Description</label>
                      <textarea
                        className="w-full h-32 p-4 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm text-slate-700 font-medium placeholder:text-slate-300 resize-none"
                        placeholder="Describe your studies, honors, or relevant coursework..."
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Skills</h2>
              <p className="text-slate-500 text-sm">Key competencies and technical abilities.</p>
            </header>
            <div className="bg-slate-50/50 p-6 rounded-2xl border-2 border-slate-100 space-y-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Add New Skill</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full pl-4 pr-12 py-3 bg-white border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm text-slate-700 font-medium transition-all"
                    placeholder="Type skill and press Enter..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val && !data.skills.includes(val)) {
                          onChange({ ...data, skills: [...data.skills, val] });
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300 uppercase tracking-tighter pointer-events-none">
                    Enter ↵
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {data.skills.filter(s => s).map((skill, i) => (
                  <button 
                    key={i} 
                    onClick={() => removeSkill(skill)}
                    className="group px-2.5 py-1 bg-white text-slate-600 rounded-lg text-[11px] font-bold border border-slate-200 flex items-center gap-1.5 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
                  >
                    {skill}
                    <X size={10} className="text-slate-300 group-hover:text-red-400 transition-colors" />
                  </button>
                ))}
                {data.skills.length === 0 && (
                  <div className="w-full py-8 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-300">
                    <Settings2 size={24} className="mb-2 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-widest">No skills added yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'languages' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">Languages</h2>
                <p className="text-slate-500 text-sm">Communication skills.</p>
              </div>
              <button
                onClick={addLanguage}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 text-sm font-bold"
              >
                <Plus size={18} /> Add
              </button>
            </header>
            <div className="space-y-4">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex flex-col sm:flex-row gap-4 items-end bg-slate-50/30 p-6 rounded-2xl border-2 border-slate-50 relative group hover:border-indigo-100 transition-all">
                  <button
                    onClick={() => removeLanguage(lang.id)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="flex-1 w-full">
                    <Input
                      label="Language"
                      value={lang.name}
                      onChange={(v) => updateLanguage(lang.id, 'name', v)}
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Level</label>
                    <select
                      className="w-full p-3 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none bg-white text-sm font-medium text-slate-700 transition-all"
                      value={lang.level}
                      onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
                    >
                      <option value="">Select Level</option>
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Professional">Professional</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Elementary">Elementary</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'layout' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <header>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Layout Settings</h2>
              <p className="text-slate-500 text-sm">Fine-tune the appearance of your resume.</p>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Base Font Size</label>
                  <span className="text-xs font-bold text-indigo-600">{(data.settings?.fontSize || 14)}px</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="20" 
                  step="1"
                  value={data.settings?.fontSize || 14}
                  onChange={(e) => updateSettings('fontSize', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Section Spacing</label>
                  <span className="text-xs font-bold text-indigo-600">{(data.settings?.sectionSpacing || 24)}px</span>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max="64" 
                  step="4"
                  value={data.settings?.sectionSpacing || 24}
                  onChange={(e) => updateSettings('sectionSpacing', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, type = 'text', placeholder }) => (
  <div className="space-y-2">
    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 border-2 border-slate-100 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm text-slate-700 font-medium placeholder:text-slate-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
