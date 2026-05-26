import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import ProfileView from "./components/ProfileView";
import CourseView from "./components/CourseView";
import PlaygroundView from "./components/PlaygroundView";
import AITutor from "./components/AITutor";
import CertificateView from "./components/CertificateView";

import { COURSES_DATA, ACHIEVEMENTS_DATA } from "./data/courses";
import { ChatMessage } from "./types";
import { Sparkles, MessageSquare, Award } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [selectedTrack, setSelectedTrack] = useState<"html" | "css" | "javascript">("html");

  // Core Hydrated States
  const [userName, setUserName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("weblearn_username") || "Muaz Zainuri";
    }
    return "Muaz Zainuri";
  });

  const [xp, setXp] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("weblearn_xp");
      return saved ? parseInt(saved) : 100; // Let's give them 100 XP initial point so they have a boost towards the 200 XP certificate!
    }
    return 100;
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("weblearn_lessons");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("weblearn_quizzes");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [streak, setStreak] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("weblearn_streak");
      return saved ? parseInt(saved) : 1;
    }
    return 1;
  });

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("weblearn_chathistory");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Default playground templates
  const [playgroundCode, setPlaygroundCode] = useState(() => {
    return {
      html: `<div class="welcome-box">
  <span class="badge">🚀 LIVE TERMINAL</span>
  <h1>Hello, World!</h1>
  <p>Welcome to WebLearn Academy. Tweak styles or run click handlers inside the script panel!</p>
  <button class="test-btn" onclick="sayHello()">Interactive Action</button>
</div>`,
      css: `body {
  background-color: #f8fafc;
  color: #1e293b;
  font-family: 'Inter', system-ui, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  margin: 0;
}

.welcome-box {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  max-width: 380px;
}

.badge {
  background: #fee2e2;
  color: #dc2626;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.05em;
}

h1 {
  color: #0f172a;
  margin: 16px 0 8px 0;
  font-weight: 800;
}

p {
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

.test-btn {
  background: #dc2626;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.test-btn:hover {
  transform: translateY(-2px);
  background: #b91c1c;
}`,
      js: `function sayHello() {
  alert("Awesome code! You've activated a dynamic JS event inside the compiler preview framework!");
}`,
      templateName: "Freeform Canvas"
    };
  });

  // Local Storage Save Effects
  useEffect(() => {
    localStorage.setItem("weblearn_username", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("weblearn_xp", xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("weblearn_lessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem("weblearn_quizzes", JSON.stringify(completedQuizzes));
  }, [completedQuizzes]);

  useEffect(() => {
    localStorage.setItem("weblearn_chathistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const addXP = (pts: number) => {
    setXp((prev) => prev + pts);
  };

  const completeLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
  };

  const completeQuiz = (quizId: string) => {
    if (!completedQuizzes.includes(quizId)) {
      setCompletedQuizzes((prev) => [...prev, quizId]);
    }
  };

  const loadSandboxCode = (html: string, css: string, js: string, templateName: string) => {
    setPlaygroundCode({ html, css, js, templateName });
  };

  const resetProgress = () => {
    setXp(100);
    setCompletedLessons([]);
    setCompletedQuizzes([]);
    setChatHistory([]);
    setStreak(1);
    localStorage.clear();
  };

  // Automated achievements checking
  const triggerCoderAchievement = () => {
    if (!completedLessons.includes("sandbox-run")) {
      completeLesson("sandbox-run");
      addXP(50);
    }
  };

  const triggerTutorAchievement = () => {
    if (!completedLessons.includes("chat-tutor")) {
      completeLesson("chat-tutor");
      addXP(50);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans selection:bg-red-500/10 selection:text-red-600">
      
      {/* Dynamic Header */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} xp={xp} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {activeTab === "dashboard" && (
          <ProfileView
            xp={xp}
            completedLessons={completedLessons}
            completedQuizzes={completedQuizzes}
            streak={streak}
            userName={userName}
            setUserName={setUserName}
            courses={COURSES_DATA}
            achievements={ACHIEVEMENTS_DATA}
            setActiveTab={setActiveTab}
            setSelectedTrack={setSelectedTrack}
            resetProgress={resetProgress}
          />
        )}

        {activeTab === "lessons" && (
          <CourseView
            courses={COURSES_DATA}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
            completedLessons={completedLessons}
            completedQuizzes={completedQuizzes}
            addXP={addXP}
            completeLesson={completeLesson}
            completeQuiz={completeQuiz}
            loadSandboxCode={loadSandboxCode}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "playground" && (
          <PlaygroundView
            initialCode={playgroundCode}
            addXP={addXP}
            triggerCoderAchievement={triggerCoderAchievement}
          />
        )}

        {activeTab === "aitutor" && (
          <AITutor
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            addXP={addXP}
            triggerTutorAchievement={triggerTutorAchievement}
          />
        )}

        {activeTab === "certificate" && (
          <CertificateView
            xp={xp}
            userName={userName}
            setUserName={setUserName}
            completedLessons={completedLessons}
            completedQuizzes={completedQuizzes}
          />
        )}
      </main>

      {/* Footer Details */}
      <footer className="border-t border-slate-250 bg-slate-100 mt-20 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 WebLearn Academy. Built with modern TypeScript, Express, and Google Gemini AI.</p>
          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">System Component Status: Live</p>
        </div>
      </footer>
    </div>
  );
}
