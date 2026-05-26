import React, { useState } from "react";
import { Award, ShieldCheck, Download, PenTool, Check, Lock, AlertCircle } from "lucide-react";

interface CertificateViewProps {
  xp: number;
  userName: string;
  setUserName: (val: string) => void;
  completedLessons: string[];
  completedQuizzes: string[];
}

export default function CertificateView({
  xp,
  userName,
  setUserName,
  completedLessons,
  completedQuizzes,
}: CertificateViewProps) {
  const [editingName, setEditingName] = useState(false);
  const [valName, setValName] = useState(userName);

  // Cert unlocks once the user has completed at least 1 lesson
  const isUnlocked = completedLessons.length >= 1;

  const handleSaveName = () => {
    if (valName.trim()) {
      setUserName(valName.trim());
      setEditingName(false);
    }
  };

  const certId = "WLA-" + (userName.substring(0, 3).toUpperCase() || "STU") + "-" + Math.floor(100000 + Math.random() * 900000);
  const issueDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Locked screen status metrics */}
      {!isUnlocked ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 max-w-2xl mx-auto text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mx-auto animate-pulse">
            <Lock className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Front-End Academy Certificate Locked
            </h2>
            <p className="text-sm text-slate-505 leading-relaxed max-w-sm mx-auto">
              Unlock your official credentials by completing at least 1 module lesson from any learning track curriculum!
            </p>
          </div>

          {/* Progress Section */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 max-w-sm mx-auto space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-550 uppercase">REQUIREMENT TASK:</span>
              <span className="text-red-600 font-bold">{completedLessons.length} / 1 Completed</span>
            </div>

            <div className="w-full bg-slate-150 h-2 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, completedLessons.length * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-red-500 font-mono font-bold uppercase">
              ⚠️ Read any lesson unit to instantly activate credentials!
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-left max-w-md mx-auto">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block font-mono">LESSONS READ</span>
              <span className="text-xs font-bold font-mono text-slate-800">{completedLessons.length} Modules</span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block font-mono">SOLVED QUIZZES</span>
              <span className="text-xs font-bold font-mono text-slate-800">{completedQuizzes.length} Challenges</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left panel: configurations control */}
          <div className="lg:col-span-1 space-y-6 self-start">
            <div className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">
                Academic Credential
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                You have earned your credential of Front-End Web Development Mastery! Choose your final certificate formatting options below.
              </p>
            </div>

            {/* Editing Name widget */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-3 shadow-xxs">
              <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold">NAME ON CREDENTIAL</span>
              
              {editingName ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={valName}
                    onChange={(e) => setValName(e.target.value)}
                    className="w-full bg-white border border-red-400 text-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 font-sans"
                    placeholder="Enter full legal name"
                    maxLength={30}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveName}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] rounded-md transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingName(false)}
                      className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-[10px] rounded-md transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs md:text-sm font-bold text-slate-800 truncate">{userName}</span>
                  <button
                    onClick={() => {
                      setValName(userName);
                      setEditingName(true);
                    }}
                    className="text-xs text-red-600 hover:underline flex items-center gap-1 font-mono shrink-0 font-bold"
                  >
                    <PenTool className="h-3 w-3" />
                    Modify
                  </button>
                </div>
              )}
            </div>

            {/* Verify stats credentials block */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-3 shadow-xxs">
              <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold">VALIDATION HASH</span>
              <p className="text-xs font-mono font-bold text-red-650 break-all">{certId}</p>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Digitally signed via WebLearn Academy compilers</span>
              </div>
            </div>

            {/* Simulated Print action triggers */}
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold rounded-lg border border-slate-200 transition"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              PRINT / DOWNLOAD PDF
            </button>
          </div>

          {/* Right panel: Gorgeous Visual Vector Certificate Document */}
          <div className="lg:col-span-3">
            <div className="bg-white border-4 border-double border-red-600 p-8 md:p-12 rounded-2xl relative overflow-hidden flex flex-col items-center text-center space-y-8 select-none shadow-sm max-w-3xl mx-auto print:border-slate-300 print:text-black print:bg-white print:p-6 print:border-2">
              
              {/* Decorative borders vectors */}
              <div className="absolute inset-2 border border-red-200 rounded-lg pointer-events-none" />
              <div className="absolute top-0 right-0 w-44 h-44 bg-red-100/30 rounded-full filter blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-slate-100 rounded-full filter blur-2xl" />

              {/* Logo metadata header */}
              <div className="space-y-2 relative">
                <div className="w-12 h-12 rounded-full border border-red-600/40 bg-red-50 flex items-center justify-center text-red-600 mx-auto">
                  <Award className="h-7 w-7" />
                </div>
                <h3 className="text-sm font-black text-red-600 tracking-widest uppercase font-mono">
                  WEBLEARN ACADEMY CERTIFICATION
                </h3>
              </div>

              {/* Declaration statement */}
              <div className="space-y-4">
                <span className="text-xs text-slate-500 block uppercase font-sans tracking-widest italic pr-1">
                  This official academic credential verifies that
                </span>

                <h2 className="text-2xl md:text-4xl font-black text-slate-900 print:text-black italic font-serif tracking-tight px-4 leading-snug">
                  {userName}
                </h2>

                <p className="text-sm text-slate-600 print:text-slate-650 max-w-lg leading-relaxed mx-auto">
                  has completed visual curriculum trails, active playground exercises, interactive challenge evaluations, and server-side model validations to satisfy compiler benchmarks:
                </p>

                <h4 className="text-base font-extrabold text-red-600 print:text-red-600 font-sans tracking-wide">
                  Front-End Web Development Mastery Program
                </h4>
              </div>

              {/* Validations & sign-offs row */}
              <div className="w-full pt-8 border-t border-slate-200 max-w-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">DATE OF ISSUANCE</span>
                  <span className="text-xs font-bold text-slate-700">{issueDate}</span>
                </div>

                {/* Validation badge */}
                <div className="flex flex-col items-center">
                  <ShieldCheck className="h-7 w-7 text-red-600 shrink-0 mb-1" />
                  <span className="text-[9px] text-slate-400 font-mono">ACADEMY SEAL OF VERIFICATION</span>
                  <span className="text-[10px] font-mono font-bold text-red-650">{certId}</span>
                </div>

                <div className="text-center sm:text-right space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">DIRECTOR SIGNATURE</span>
                  <span className="text-xs font-bold text-red-600 italic font-mono pr-1">Gemini AI Tutor</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}
