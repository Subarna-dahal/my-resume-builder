/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useDeferredValue } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { ResumeData, initialResumeData } from './types';
import { Download, Sparkles, RefreshCw } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { cn } from './utils';
import { AdUnit } from './components/AdUnit';

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const deferredResumeData = useDeferredValue(resumeData);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = () => {
    if (!previewRef.current) return;

    const element = previewRef.current;
    const opt = {
      margin: 0,
      filename: `${resumeData.personalInfo.fullName || 'Resume'}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4' as const, orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  const resetForm = () => {
    if (confirm('Are you sure you want to reset the form? All current data will be lost.')) {
      setResumeData(initialResumeData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Resume Building</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Professional Builder</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetForm}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              title="Reset Form"
            >
              <RefreshCw size={20} />
            </button>
            
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium text-sm shadow-md shadow-indigo-100"
            >
              <Download size={18} />
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main 
        className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden"
      >
        {/* Left Panel: Form */}
        <div className={cn(
          "overflow-y-auto pr-2 custom-scrollbar transition-all duration-300 rounded-2xl"
        )}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Build Your Resume</h2>
            <p className="text-slate-500">Fill in your details below to get started.</p>
          </div>

          <ResumeForm data={resumeData} onChange={setResumeData} />

          {/* Ad Unit at the bottom of the form */}
          <AdUnit slot="1234567890" className="mt-12" />
        </div>

        {/* Right Panel: Preview */}
        <div className="hidden lg:block bg-slate-200/50 rounded-2xl p-8 overflow-y-auto custom-scrollbar border border-slate-200 shadow-inner relative">
          <div className="sticky top-0 mb-4 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Preview</span>
            <span className="text-xs text-slate-400 italic">A4 Format</span>
          </div>
          <div className="flex justify-center">
            <ResumePreview 
              data={deferredResumeData} 
              onUpdate={setResumeData}
              ref={previewRef} 
            />
          </div>
        </div>
      </main>

      {/* Footer Ad Unit */}
      <footer className="bg-white border-t border-slate-200 p-4">
        <div className="max-w-7xl mx-auto">
          <AdUnit slot="0987654321" format="rectangle" />
          <p className="text-center text-slate-400 text-xs mt-4">© 2026 Resume Building. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Preview Button (Floating) */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <button 
          onClick={() => {
            const preview = document.getElementById('resume-preview');
            preview?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-xl"
        >
          <Download size={24} />
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
