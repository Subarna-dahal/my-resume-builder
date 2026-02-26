import React, { forwardRef, memo } from 'react';
import { ResumeData, TemplateId } from '../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Sparkles, Camera } from 'lucide-react';
import { cn } from '../utils';

interface ResumePreviewProps {
  data: ResumeData;
  onUpdate?: (data: ResumeData) => void;
}

export const ResumePreview = memo(forwardRef<HTMLDivElement, ResumePreviewProps>(({ data, onUpdate }, ref) => {
  const renderTemplate = () => {
    switch (data.templateId) {
      case 'modern':
        return <ModernTemplate data={data} onUpdate={onUpdate} />;
      case 'bold':
        return <BoldTemplate data={data} onUpdate={onUpdate} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} onUpdate={onUpdate} />;
      case 'creative':
        return <CreativeTemplate data={data} onUpdate={onUpdate} />;
      case 'professional':
        return <ProfessionalTemplate data={data} onUpdate={onUpdate} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} onUpdate={onUpdate} />;
    }
  };

  return (
    <div 
      ref={ref}
      className="bg-white w-full max-w-[800px] mx-auto shadow-2xl min-h-[1100px] text-slate-800"
      id="resume-preview"
    >
      {renderTemplate()}
    </div>
  );
}));

/* --- Helper Components --- */
const PhotoPlaceholder: React.FC<{ 
  photo?: string; 
  onUpdate?: (photo: string) => void;
  className?: string;
  shape?: 'circle' | 'square';
  style?: React.CSSProperties;
}> = ({ photo, onUpdate, className, shape = 'square', style }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdate) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!onUpdate && !photo) return null;

  return (
    <div 
      className={cn(
        "relative group cursor-pointer overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-200 hover:border-indigo-400 transition-all",
        shape === 'circle' ? "rounded-full" : "rounded-lg",
        className
      )}
      style={style}
      onClick={() => onUpdate && fileInputRef.current?.click()}
    >
      {photo ? (
        <img src={photo} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <div className="text-slate-400 flex flex-col items-center p-2">
          <Camera size={24} />
          <span className="text-[10px] uppercase font-bold mt-1">Add Photo</span>
        </div>
      )}
      {onUpdate && (
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleUpload} 
        />
      )}
      {onUpdate && photo && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera size={20} className="text-white" />
        </div>
      )}
    </div>
  );
};

/* --- Classic Template (Samantha Williams Style) --- */
const ClassicTemplate: React.FC<{ data: ResumeData; onUpdate?: (data: ResumeData) => void }> = ({ data, onUpdate }) => {
  const { 
    personalInfo, 
    summary, 
    workExperience, 
    education, 
    skills, 
    languages, 
    settings = { fontSize: 14, sectionSpacing: 24 } 
  } = data;
  
  return (
    <div className="p-12 font-serif" style={{ fontSize: `clamp(10px, ${settings.fontSize}px, 2vw)` }}>
      <header className="text-center border-b-2 border-slate-900 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 uppercase tracking-wider">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-y-1 gap-x-4 text-sm text-slate-600 font-sans">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 mb-3 pb-1">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
            {summary}
          </p>
        </section>
      )}

      {workExperience.length > 0 && (
        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 mb-4 pb-1">
            Experience
          </h2>
          <div className="space-y-6">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{exp.position} | <span className="font-normal text-slate-600">{exp.company}</span></h3>
                  <span className="text-[0.8em] font-sans text-slate-500 uppercase">
                    {exp.startDate} — {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 mb-4 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{edu.school}</h3>
                  <span className="text-[0.8em] font-sans text-slate-500 uppercase">
                    {edu.startDate} — {edu.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-sm text-slate-700 italic">{edu.degree}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8">
        {skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 mb-3 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-[0.85em] text-slate-700 font-medium">{skill}</span>
                  {index < skills.length - 1 && <div className="w-1 h-1 bg-slate-300 rounded-full" />}
                </div>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 mb-3 pb-1">
              Languages
            </h2>
            <div className="space-y-1">
              {languages.map((lang) => (
                <div key={lang.id} className="text-[0.9em] text-slate-700 flex justify-between">
                  <span>{lang.name}</span>
                  <span className="text-slate-400 italic text-[0.8em]">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

/* --- Modern Template (Jessie Smith Style) --- */
const ModernTemplate: React.FC<{ data: ResumeData; onUpdate?: (data: ResumeData) => void }> = ({ data, onUpdate }) => {
  const { 
    personalInfo, 
    summary, 
    workExperience, 
    education, 
    skills, 
    languages, 
    settings = { fontSize: 14, sectionSpacing: 24 } 
  } = data;

  const handlePhotoUpdate = (photo: string) => {
    onUpdate?.({
      ...data,
      personalInfo: { ...personalInfo, photo }
    });
  };

  const photoSize = personalInfo.photoSize || 120;

  return (
    <div className="flex min-h-[1100px] font-sans bg-white" style={{ fontSize: `clamp(10px, ${settings.fontSize}px, 2vw)` }}>
      {/* Left Sidebar */}
      <div className="w-72 bg-[#D9E8F5] p-8 flex flex-col">
        <div className="flex justify-center mb-8">
          <PhotoPlaceholder 
            photo={personalInfo.photo} 
            onUpdate={onUpdate ? handlePhotoUpdate : undefined}
            className="shadow-md border-none"
            shape="circle"
            style={{ width: `${photoSize}px`, height: `${photoSize}px` }}
          />
        </div>
        
        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-[0.8em] font-black text-slate-900 uppercase mb-4 tracking-widest border-b border-slate-300 pb-1">Details</h2>
          <div className="space-y-4 text-[0.9em]">
            {personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail size={14} className="shrink-0 mt-0.5" />
                <span className="text-slate-700 break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-start gap-2">
                <Phone size={14} className="shrink-0 mt-0.5" />
                <span className="text-slate-700">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin size={14} className="shrink-0 mt-0.5" />
                <span className="text-slate-700">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-start gap-2">
                <Globe size={14} className="shrink-0 mt-0.5" />
                <span className="text-slate-700 break-all">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-start gap-2">
                <Linkedin size={14} className="shrink-0 mt-0.5" />
                <span className="text-slate-700 break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-start gap-2">
                <Github size={14} className="shrink-0 mt-0.5" />
                <span className="text-slate-700 break-all">{personalInfo.github}</span>
              </div>
            )}
          </div>
        </section>

        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-[0.8em] font-black text-slate-900 uppercase mb-4 tracking-widest border-b border-slate-300 pb-1">Skills</h2>
          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                <span className="text-[0.75em] text-slate-700 font-bold uppercase tracking-tight leading-tight">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </section>

        {languages.length > 0 && (
          <section>
            <h2 className="text-[0.8em] font-black text-slate-900 uppercase mb-4 tracking-widest border-b border-slate-300 pb-1">Languages</h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="text-[0.9em]">
                  <p className="font-bold text-slate-800">{lang.name}</p>
                  <p className="text-[0.8em] text-slate-500 italic">{lang.level}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        <header className="mb-10">
          <h1 className="text-5xl font-black text-[#1A4B84] uppercase leading-tight mb-2">
            {personalInfo.fullName || 'James Miller'}
          </h1>
          <p className="text-xl font-bold text-slate-600 uppercase tracking-widest">
            {workExperience[0]?.position || 'Financial Analyst'}
          </p>
        </header>

        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-[0.9em] font-black text-slate-900 uppercase mb-4 tracking-[0.2em]">Summary</h2>
          <p className="text-[0.9em] text-slate-600 leading-relaxed whitespace-pre-wrap">{summary}</p>
        </section>

        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-[0.9em] font-black text-slate-900 uppercase mb-6 tracking-[0.2em]">Experience</h2>
          <div className="space-y-8">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900 text-base">{exp.position}, {exp.company}</h3>
                </div>
                <p className="text-[0.7em] font-bold text-slate-400 uppercase mb-2">
                  {exp.startDate} — {exp.endDate || 'Present'}
                </p>
                <p className="text-[0.9em] text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[0.9em] font-black text-slate-900 uppercase mb-4 tracking-[0.2em]">Education</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold text-slate-900 text-[0.9em]">{edu.degree}</h3>
                <p className="text-[0.9em] text-slate-600 mb-1">{edu.school}</p>
                <p className="text-[0.7em] font-bold text-slate-400 uppercase">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

/* --- Bold Template (Sebastian Wilder Style) --- */
const BoldTemplate: React.FC<{ data: ResumeData; onUpdate?: (data: ResumeData) => void }> = ({ data, onUpdate }) => {
  const { 
    personalInfo, 
    summary, 
    workExperience, 
    education, 
    skills, 
    languages, 
    settings = { fontSize: 14, sectionSpacing: 24 } 
  } = data;

  return (
    <div className="font-sans min-h-[1100px] bg-white" style={{ fontSize: `clamp(10px, ${settings.fontSize}px, 2vw)` }}>
      <header className="bg-[#0A1A2F] p-12 flex items-center gap-8 relative">
        <div className="flex-1">
          <h1 className="text-5xl font-black text-white uppercase leading-none mb-2">
            {personalInfo.fullName || 'James Miller'}
          </h1>
          <p className="text-xl font-bold text-slate-300 uppercase tracking-widest">
            {workExperience[0]?.position || 'Financial Analyst'}
          </p>
        </div>
      </header>

      <div className="flex">
        <aside className="w-72 p-12 bg-white border-r border-slate-100">
          <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
            <h2 className="text-[0.8em] font-black text-slate-900 uppercase tracking-[0.2em] mb-4 border-b border-slate-200 pb-1">Details</h2>
            <div className="space-y-4 text-[0.9em] text-slate-600">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="shrink-0" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe size={14} className="shrink-0" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin size={14} className="shrink-0" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github size={14} className="shrink-0" />
                  <span className="break-all">{personalInfo.github}</span>
                </div>
              )}
            </div>
          </section>

          <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
            <h2 className="text-[0.8em] font-black text-slate-900 uppercase tracking-[0.2em] mb-4 border-b border-slate-200 pb-1">Skills</h2>
            <div className="grid grid-cols-1 gap-y-2">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#0A1A2F] rounded-full shrink-0" />
                  <span className="text-[0.75em] text-slate-700 font-bold uppercase tracking-wider leading-tight">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {languages.length > 0 && (
            <section>
              <h2 className="text-[0.8em] font-black text-slate-900 uppercase tracking-[0.2em] mb-4 border-b border-slate-200 pb-1">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="text-[0.9em]">
                    <span className="font-bold text-slate-900">{lang.name}</span>
                    <span className="text-slate-400 text-[0.8em] ml-2 italic">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        <main className="flex-1 p-12 bg-white">
          <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
            <h2 className="text-[0.8em] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Summary</h2>
            <p className="text-[0.9em] text-slate-600 leading-relaxed whitespace-pre-wrap">{summary}</p>
          </section>

          <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
            <h2 className="text-[0.8em] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Experience</h2>
            <div className="space-y-8">
              {workExperience.map(exp => (
                <div key={exp.id}>
                  <h3 className="font-bold text-slate-900 mb-1">{exp.position}, {exp.company}</h3>
                  <p className="text-[0.7em] font-black text-slate-400 uppercase mb-3 tracking-widest">
                    {exp.startDate} — {exp.endDate || 'Present'}
                  </p>
                  <p className="text-[0.9em] text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[0.8em] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Education</h2>
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.id}>
                  <p className="font-bold text-slate-900 text-[0.9em]">{edu.degree}</p>
                  <p className="text-[0.8em] text-slate-500 mb-1">{edu.school}</p>
                  <p className="text-[0.7em] font-bold text-slate-400 uppercase">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

/* --- Minimalist Template (Daniel Gallego Style) --- */
const MinimalistTemplate: React.FC<{ data: ResumeData; onUpdate?: (data: ResumeData) => void }> = ({ data, onUpdate }) => {
  const { 
    personalInfo, 
    summary, 
    workExperience, 
    education, 
    skills, 
    languages, 
    settings = { fontSize: 14, sectionSpacing: 24 } 
  } = data;

  return (
    <div className="p-16 bg-[#F0F7E6] min-h-[1100px] font-sans text-slate-900" style={{ fontSize: `clamp(10px, ${settings.fontSize}px, 2vw)` }}>
      <header className="flex justify-between items-start mb-16">
        <div>
          <h1 className="text-6xl font-black leading-none mb-4">
            {personalInfo.fullName?.split(' ')[0]}<br />
            {personalInfo.fullName?.split(' ').slice(1).join(' ')}
          </h1>
          <div className="flex items-center gap-2 text-slate-600">
             <div className="w-6 h-6 border border-slate-900 rounded-full flex items-center justify-center">
                <span className="text-[10px]">↘</span>
             </div>
             <span className="text-[0.9em] font-medium uppercase tracking-widest">{workExperience[0]?.position || 'Professional'}</span>
          </div>
        </div>
        <div className="text-right space-y-4">
           <h2 className="text-[0.8em] font-bold uppercase tracking-widest border-b border-slate-900 pb-1">Details</h2>
           <div className="text-[0.9em] space-y-1">
              <p><span className="font-bold">Phone</span> {personalInfo.phone}</p>
              <p><span className="font-bold">Email</span> {personalInfo.email}</p>
              <p><span className="font-bold">Location</span> {personalInfo.location}</p>
              {personalInfo.website && <p><span className="font-bold">Website</span> {personalInfo.website}</p>}
              {personalInfo.linkedin && <p><span className="font-bold">LinkedIn</span> {personalInfo.linkedin}</p>}
              {personalInfo.github && <p><span className="font-bold">GitHub</span> {personalInfo.github}</p>}
           </div>
        </div>
      </header>

      <div className="space-y-12">
        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-4">
            <h2 className="text-xl font-black uppercase tracking-tighter">Summary</h2>
            <div className="flex gap-1">
               {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-slate-900 rounded-full" />)}
            </div>
          </div>
          <p className="text-[0.9em] leading-relaxed max-w-2xl">{summary}</p>
        </section>

        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-6">
            <h2 className="text-xl font-black uppercase tracking-tighter">Experience</h2>
            <div className="flex gap-1">
               {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-slate-900 rounded-full" />)}
            </div>
          </div>
          <div className="space-y-8">
            {workExperience.map(exp => (
              <div key={exp.id}>
                <p className="text-[0.7em] font-bold text-slate-500 mb-1">{exp.startDate} - {exp.endDate || 'Present'}</p>
                <h3 className="text-lg font-bold mb-1">{exp.company}</h3>
                <p className="text-[0.9em] font-medium text-slate-600 mb-2 italic">{exp.position}</p>
                <p className="text-[0.9em] leading-relaxed max-w-2xl">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-12">
          <section>
            <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-6">
              <h2 className="text-xl font-black uppercase tracking-tighter">Education</h2>
              <div className="flex gap-1">
                 {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-slate-900 rounded-full" />)}
              </div>
            </div>
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.id}>
                  <p className="text-[0.7em] font-bold text-slate-500 mb-1">{edu.startDate} - {edu.endDate}</p>
                  <h3 className="text-lg font-bold">{edu.school}</h3>
                  <p className="text-[0.9em] text-slate-600">{edu.degree}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-4">
              <h2 className="text-xl font-black uppercase tracking-tighter">Skills</h2>
              <div className="flex gap-1">
                 {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-slate-900 rounded-full" />)}
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                   <span className="text-[0.8em] font-black uppercase tracking-widest text-slate-900 leading-none">
                    {skill}
                  </span>
                  {i < skills.length - 1 && <div className="w-1 h-1 bg-slate-900 rounded-full" />}
                </div>
              ))}
            </div>
          </section>
        </div>

        {languages.length > 0 && (
          <section>
            <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-4">
              <h2 className="text-xl font-black uppercase tracking-tighter">Languages</h2>
              <div className="flex gap-1">
                 {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-slate-900 rounded-full" />)}
              </div>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex flex-col">
                  <span className="text-[0.9em] font-black uppercase">{lang.name}</span>
                  <span className="text-[0.8em] text-slate-500 italic">{lang.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

/* --- Creative Template (Olivia Wilson Style) --- */
const CreativeTemplate: React.FC<{ data: ResumeData; onUpdate?: (data: ResumeData) => void }> = ({ data, onUpdate }) => {
  const { 
    personalInfo, 
    summary, 
    workExperience, 
    education, 
    skills, 
    languages, 
    settings = { fontSize: 14, sectionSpacing: 24 } 
  } = data;

  return (
    <div className="flex min-h-[1100px] font-sans bg-[#FFF5F5]" style={{ fontSize: `clamp(10px, ${settings.fontSize}px, 2vw)` }}>
      {/* Left Sidebar */}
      <aside className="w-80 p-12 border-r border-pink-100 bg-white">
        <div className="mb-12">
          <h1 className="text-5xl font-serif text-pink-900 leading-tight mb-2">
            {personalInfo.fullName?.split(' ')[0]}<br />
            {personalInfo.fullName?.split(' ').slice(1).join(' ')}
          </h1>
          <p className="text-[0.9em] font-bold text-pink-400 uppercase tracking-[0.2em]">
            {workExperience[0]?.position || 'Creative'}
          </p>
        </div>

        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-[0.8em] font-black text-pink-200 uppercase tracking-[0.3em] mb-6 border-b border-pink-50 pb-2">Experience</h2>
          <div className="space-y-8">
            {workExperience.map(exp => (
              <div key={exp.id}>
                <p className="text-[0.7em] font-bold text-pink-300 uppercase mb-1">{exp.startDate} - {exp.endDate || 'Current'}</p>
                <h3 className="font-bold text-slate-800 text-[0.9em]">{exp.position}</h3>
                <p className="text-[0.8em] text-slate-500">{exp.company}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-[0.8em] font-black text-pink-200 uppercase tracking-[0.3em] mb-6 border-b border-pink-50 pb-2">Education</h2>
          <div className="space-y-6">
            {education.map(edu => (
              <div key={edu.id}>
                <p className="text-[0.7em] font-bold text-pink-300 uppercase mb-1">{edu.startDate} - {edu.endDate}</p>
                <h3 className="font-bold text-slate-800 text-[0.9em]">{edu.degree}</h3>
                <p className="text-[0.8em] text-slate-500">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>

        {languages.length > 0 && (
          <section>
            <h2 className="text-[0.8em] font-black text-pink-200 uppercase tracking-[0.3em] mb-6 border-b border-pink-50 pb-2">Languages</h2>
            <div className="space-y-4">
              {languages.map((lang) => (
                <div key={lang.id}>
                  <p className="text-[0.9em] font-bold text-pink-900">{lang.name}</p>
                  <p className="text-[0.7em] font-bold text-pink-300 uppercase">{lang.level}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-12 border border-pink-50">
           <div className="flex flex-col gap-3 text-[0.9em]">
              <div className="flex items-center gap-4">
                <span className="text-[0.7em] font-black text-pink-200 uppercase tracking-widest w-16">Email</span>
                <span className="text-slate-800 font-medium break-all flex-1">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[0.7em] font-black text-pink-200 uppercase tracking-widest w-16">Phone</span>
                <span className="text-slate-800 font-medium flex-1">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[0.7em] font-black text-pink-200 uppercase tracking-widest w-16">Location</span>
                <span className="text-slate-800 font-medium flex-1">{personalInfo.location}</span>
              </div>
              {personalInfo.website && (
                <div className="flex items-center gap-4">
                  <span className="text-[0.7em] font-black text-pink-200 uppercase tracking-widest w-16">Website</span>
                  <span className="text-slate-800 font-medium break-all flex-1">{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-4">
                  <span className="text-[0.7em] font-black text-pink-200 uppercase tracking-widest w-16">LinkedIn</span>
                  <span className="text-slate-800 font-medium break-all flex-1">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-4">
                  <span className="text-[0.7em] font-black text-pink-200 uppercase tracking-widest w-16">GitHub</span>
                  <span className="text-slate-800 font-medium break-all flex-1">{personalInfo.github}</span>
                </div>
              )}
           </div>
        </div>

        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <div className="flex items-center gap-4 mb-6">
             <h2 className="text-xl font-serif text-pink-900">Summary</h2>
             <div className="flex-1 h-px bg-pink-100" />
             <Sparkles size={16} className="text-pink-300" />
          </div>
          <p className="text-[0.9em] text-slate-600 leading-relaxed italic">{summary}</p>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
             <h2 className="text-xl font-serif text-pink-900">Skills</h2>
             <div className="flex-1 h-px bg-pink-100" />
             <Sparkles size={16} className="text-pink-300" />
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[0.8em] px-2 py-0.5 bg-pink-50 text-pink-600 rounded-md font-bold border border-pink-100 leading-none">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

/* --- Professional Template (Gray Sidebar, Circular Photo) --- */
const ProfessionalTemplate: React.FC<{ data: ResumeData; onUpdate?: (data: ResumeData) => void }> = ({ data, onUpdate }) => {
  const { 
    personalInfo, 
    summary, 
    workExperience, 
    education, 
    skills, 
    languages, 
    settings = { fontSize: 14, sectionSpacing: 24 } 
  } = data;

  return (
    <div className="flex min-h-[1100px] font-sans bg-white" style={{ fontSize: `clamp(10px, ${settings.fontSize}px, 2vw)` }}>
      {/* Left Sidebar */}
      <div className="w-72 bg-[#E5E7EB] p-8 flex flex-col">
        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-[0.8em] font-black text-slate-900 uppercase mb-4 tracking-widest border-b border-slate-300 pb-1">Skills</h2>
          <div className="grid grid-cols-1 gap-y-2.5">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <div className="w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                <span className="text-[0.75em] text-slate-700 font-bold uppercase tracking-tight leading-tight">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </section>

        {languages.length > 0 && (
          <section>
            <h2 className="text-[0.8em] font-black text-slate-900 uppercase mb-4 tracking-widest border-b border-slate-300 pb-1">Languages</h2>
            <div className="space-y-2 text-[0.9em]">
              {languages.map((lang) => (
                <div key={lang.id}>
                  <p className="font-bold text-slate-800">{lang.name}</p>
                  <p className="text-[0.8em] text-slate-500 italic">{lang.level}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        <header className="mb-10">
          <h1 className="text-5xl font-black text-slate-900 uppercase leading-tight mb-2">
            {personalInfo.fullName || 'James Miller'}
          </h1>
          <p className="text-xl font-bold text-slate-500 uppercase tracking-widest mb-6">
            {workExperience[0]?.position || 'Financial Analyst'}
          </p>
          <div className="flex flex-col gap-2 text-[0.9em] text-slate-600">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe size={14} />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={14} />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github size={14} />
                <span className="break-all">{personalInfo.github}</span>
              </div>
            )}
          </div>
        </header>

        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-[0.9em] font-black text-slate-900 uppercase mb-4 tracking-[0.2em] border-b border-slate-100 pb-2">Summary</h2>
          <p className="text-[0.9em] text-slate-600 leading-relaxed whitespace-pre-wrap">{summary}</p>
        </section>

        <section style={{ marginBottom: `${settings.sectionSpacing}px` }}>
          <h2 className="text-[0.9em] font-black text-slate-900 uppercase mb-6 tracking-[0.2em] border-b border-slate-100 pb-2">Experience</h2>
          <div className="space-y-8">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <h3 className="font-bold text-slate-900 text-base">{exp.position}, {exp.company}</h3>
                <p className="text-[0.7em] font-bold text-slate-400 uppercase mb-2">
                  {exp.startDate} — {exp.endDate || 'Present'}
                </p>
                <p className="text-[0.9em] text-slate-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[0.9em] font-black text-slate-900 uppercase mb-4 tracking-[0.2em] border-b border-slate-100 pb-2">Education</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold text-slate-900 text-[0.9em]">{edu.degree}</h3>
                <p className="text-[0.9em] text-slate-600 mb-1">{edu.school}</p>
                <p className="text-[0.7em] font-bold text-slate-400 uppercase">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

ResumePreview.displayName = 'ResumePreview';
