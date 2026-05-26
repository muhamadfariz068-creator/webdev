import React from "react";
import { Award, ChevronRight, RefreshCw, BookOpen, Layers, Trophy } from "lucide-react";
import { TrackConfig, Achievement } from "../types";

interface ProfileViewProps {
  xp: number;
  completedLessons: string[];
  completedQuizzes: string[];
  streak: number;
  userName: string;
  setUserName: (name: string) => void;
  courses: TrackConfig[];
  achievements: Achievement[];
  setActiveTab: (tab: string) => void;
  setSelectedTrack: (trackId: any) => void;
  resetProgress: () => void;
}

export default function ProfileView({
  xp,
  completedLessons,
  completedQuizzes,
  streak,
  userName,
  setUserName,
  courses,
  achievements,
  setActiveTab,
  setSelectedTrack,
  resetProgress,
}: ProfileViewProps) {

  // Helper to calculate specific course progress (percentage)
  const getTrackProgress = (track: TrackConfig) => {
    const totalItems = track.lessons.length + track.quizzes.length;
    if (totalItems === 0) return 0;
    
    let completedCount = 0;
    track.lessons.forEach(l => {
      if (completedLessons.includes(l.id)) completedCount++;
    });
    track.quizzes.forEach(q => {
      if (completedQuizzes.includes(q.id)) completedCount++;
    });

    return Math.min(100, Math.round((completedCount / totalItems) * 100));
  };

  // Helper to check achievement unlock status
  const isAchievementUnlocked = (achId: string) => {
    if (achId === "ach-welcome") return completedLessons.length >= 0; // True always once loaded
    if (achId === "ach-coder") return completedLessons.length > 0;
    if (achId === "ach-tutor") return completedLessons.includes("chat-tutor") || xp >= 120;
    if (achId === "ach-grad") return completedQuizzes.length >= 2;
    return false;
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Short high-end clean greeting intro header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-red-600" />
          WebLearn Academy Portal
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Master front-end engineering principles with curriculum trails, sandbox validation runtimes, and instant compiler support.
        </p>
      </div>

      {/* Main Grid: Learning Tracks & Achievements side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2/3rds Column: Course Tracks list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
              <Layers className="h-4.5 w-4.5 text-red-500" />
              Learning Tracks
            </h3>
            <span className="text-xs text-slate-500 font-medium">Self-paced developer roadmaps</span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {courses.map((track) => {
              const progressPct = getTrackProgress(track);
              return (
                <div 
                  key={track.id} 
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-sm transition group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-md font-mono font-bold bg-slate-100 border border-slate-250 text-slate-700 uppercase">
                          {track.id}
                        </span>
                        <h4 className="text-base font-black text-slate-900 group-hover:text-red-600 transition">
                          {track.title}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                        {track.description}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedTrack(track.id);
                        setActiveTab("lessons");
                      }}
                      className="flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-650 text-xs font-bold transition border border-red-100/60 shadow-xxs shrink-0"
                    >
                      Enter Trail
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Clean gray and red Progress Tracker */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-slate-500 font-mono mb-1.5">
                        <span className="font-semibold text-slate-450 uppercase">TRAIL COMPLETION</span>
                        <span className="font-bold text-slate-750">{progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                        <div 
                          className="bg-gradient-to-r from-red-600 to-red-500 h-full rounded-full transition-all duration-350"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1/3rd Column: Achievements List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-1.5">
              <Trophy className="h-4.5 w-4.5 text-red-500" />
              Achievements
            </h3>
            <span className="text-xs text-slate-500 font-medium">Badges</span>
          </div>

          <div className="bg-white border border-slate-250 rounded-xl p-5 divide-y divide-slate-100 shadow-xxs">
            {achievements.map((ach) => {
              const completed = isAchievementUnlocked(ach.id);
              return (
                <div key={ach.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 block group">
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 transition ${
                    completed 
                      ? "bg-red-50 border-red-200 text-red-600 shadow-xxs" 
                      : "bg-slate-50 border-slate-150 text-slate-400"
                  }`}>
                    <Award className="h-5 w-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs font-bold ${completed ? "text-slate-900" : "text-slate-400"}`}>
                        {ach.title}
                      </span>
                      {completed && (
                        <span className="text-[9px] bg-red-100 border border-red-200 text-red-600 px-1.5 py-0.1 rounded uppercase font-mono tracking-wide font-bold">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className={`text-xs leading-relaxed ${completed ? "text-slate-500 font-medium" : "text-slate-400"}`}>
                      {ach.description}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono italic">
                      Goal: {ach.conditionDescription}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clean low-key Reset utility line */}
          <div className="pt-4 border-t border-slate-200 text-center">
            <button
              onClick={() => {
                if (window.confirm("This will reset all your quiz completions and local progress metrics! Proceed?")) {
                  resetProgress();
                }
              }}
              className="text-slate-400 hover:text-red-600 text-[11px] font-mono font-bold transition inline-flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="h-3 w-3" />
              RESET ACADEMY PROGRESS
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
