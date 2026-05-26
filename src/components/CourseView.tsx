import React, { useState } from "react";
import Markdown from "react-markdown";
import { BookOpen, HelpCircle, CheckCircle, ArrowLeft, ArrowRight, Play, Check, AlertCircle, Sparkles, ChevronRight } from "lucide-react";
import { TrackConfig, Lesson, QuizQuestion } from "../types";

interface CourseViewProps {
  courses: TrackConfig[];
  selectedTrack: string;
  setSelectedTrack: (trackId: any) => void;
  completedLessons: string[];
  completedQuizzes: string[];
  addXP: (pts: number) => void;
  completeLesson: (lessonId: string) => void;
  completeQuiz: (quizId: string) => void;
  loadSandboxCode: (html: string, css: string, js: string, templateName: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function CourseView({
  courses,
  selectedTrack,
  setSelectedTrack,
  completedLessons,
  completedQuizzes,
  addXP,
  completeLesson,
  completeQuiz,
  loadSandboxCode,
  setActiveTab,
}: CourseViewProps) {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { correct: boolean; message: string }>>({});

  const track = courses.find((c) => c.id === selectedTrack) || courses[0];

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
    // Mark completed lessons to reward initial reading engagement
    if (!completedLessons.includes(lesson.id)) {
      completeLesson(lesson.id);
      addXP(lesson.xpCost);
    }
  };

  const handleLoadCodeToSandbox = () => {
    if (activeLesson) {
      loadSandboxCode(
        activeLesson.interactiveCodeTemplate.html,
        activeLesson.interactiveCodeTemplate.css,
        activeLesson.interactiveCodeTemplate.js,
        activeLesson.title
      );
      setActiveTab("playground");
    }
  };

  const validateQuiz = (quiz: QuizQuestion) => {
    const chosen = selectedAnswers[quiz.id];
    if (!chosen) {
      setFeedback(prev => ({
        ...prev,
        [quiz.id]: { correct: false, message: "Please select an answer option first." }
      }));
      return;
    }

    const isMatch = chosen === quiz.correctAnswer;
    if (isMatch) {
      setFeedback(prev => ({
        ...prev,
        [quiz.id]: { correct: true, message: `Correct! ${quiz.explanation}` }
      }));
      if (!completedQuizzes.includes(quiz.id)) {
        completeQuiz(quiz.id);
        addXP(60); // reward quiz challenge completion
      }
    } else {
      setFeedback(prev => ({
        ...prev,
        [quiz.id]: { correct: false, message: `Incorrect. Tip: Try re-reading the corresponding lesson material above!` }
      }));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Active Lesson Modal / Focus View */}
      {activeLesson ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-8 shadow-sm">
          
          {/* Back to track navigations */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <button
              onClick={() => {
                setActiveLesson(null);
                setFeedback({});
              }}
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-650 font-bold transition group self-start"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition text-red-500" />
              Back to Track Directory
            </button>

            <span className="text-[11px] font-mono text-slate-450 uppercase font-semibold">
              TRACK: {track.title} • DIFFICULTY: {activeLesson.difficulty}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col (Col Span 2): Markdown content */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl md:text-3xl font-black tracking-tight text-slate-900 border-b border-slate-50 pb-2">
                {activeLesson.title}
              </h2>

              {/* Rich Lesson Content wrapper using Tailwind typography */}
              <div className="prose max-w-none text-slate-700 leading-relaxed space-y-4">
                <Markdown>{activeLesson.markdownContent}</Markdown>
              </div>
            </div>

            {/* Right Col: Interactive tools panel */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-6 self-start">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                  Sandbox Playground
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ready to test what you read? Transfer this lesson's starter workspace directly in our full interactive sandbox.
                </p>
              </div>

              <button
                onClick={handleLoadCodeToSandbox}
                className="w-full flex items-center justify-center gap-2.5 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition shadow-sm shadow-red-500/10 active:scale-98"
              >
                <Play className="h-4 w-4 fill-white text-white" />
                LAUNCH IN SPLIT SANDBOX
              </button>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-wider">LESSON STATUS</span>
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg text-emerald-700">
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-xs font-bold font-mono">Completed Unit Successfully</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Quiz Section for active lesson */}
          {track.quizzes.some(q => q.id.startsWith(track.id)) && (
            <div className="pt-8 border-t border-slate-200 space-y-5">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="text-red-600 h-5 w-5" />
                Lesson Mastery Challenge
              </h3>

              <div className="space-y-6">
                {track.quizzes
                  .filter(q => q.id.startsWith(track.id))
                  .slice(0, 1) // Provide related quiz
                  .map((quiz) => {
                    const ansFeedback = feedback[quiz.id];
                    const isCompleted = completedQuizzes.includes(quiz.id);
                    return (
                      <div key={quiz.id} className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-5 max-w-3xl">
                        <span className="text-[10px] text-red-600 font-mono tracking-wider font-extrabold block uppercase">CONCEPT EVALUATION CHALLENGE</span>
                        <p className="text-sm font-bold text-slate-800">
                          {quiz.question}
                        </p>

                        <div className="space-y-2.5">
                          {quiz.options?.map((opt) => {
                            const selected = selectedAnswers[quiz.id] === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => {
                                  if (!isCompleted) {
                                    setSelectedAnswers(prev => ({ ...prev, [quiz.id]: opt }));
                                  }
                                }}
                                disabled={isCompleted}
                                className={`w-full text-left px-4 py-3.5 rounded-lg text-sm font-semibold transition flex items-center justify-between border ${
                                  isCompleted && quiz.correctAnswer === opt
                                    ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-bold"
                                    : selected
                                    ? "bg-red-50 border-red-500 text-red-600"
                                    : "bg-white border-slate-200 hover:border-slate-350 text-slate-700"
                                }`}
                              >
                                <span>{opt}</span>
                                {isCompleted && quiz.correctAnswer === opt && (
                                  <Check className="h-4 w-4 bg-emerald-600 text-white rounded-full p-0.5" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Actions block */}
                        {!isCompleted && (
                          <button
                            onClick={() => validateQuiz(quiz)}
                            className="px-5 py-2.5 hover:translate-y-[-1px] rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs font-mono transition inline-flex items-center gap-1.5 active:translate-y-0"
                          >
                            VALIDATE SOLUTION
                          </button>
                        )}

                        {/* Feedback messages */}
                        {ansFeedback && (
                          <div className={`flex gap-2 p-3.5 rounded-lg border text-xs leading-relaxed ${
                            ansFeedback.correct 
                              ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                              : "bg-red-50 border-red-200 text-red-800"
                          }`}>
                            {ansFeedback.correct ? (
                              <CheckCircle className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                            ) : (
                              <AlertCircle className="h-4.5 w-4.5 text-red-600 shrink-0" />
                            )}
                            <div>
                              <span>{ansFeedback.message}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="space-y-6">
          {/* 1. Track Track Swapper Links */}
          <div className="flex border-b border-slate-200 overflow-x-auto pb-px">
            {courses.map((c) => {
              const active = c.id === selectedTrack;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedTrack(c.id)}
                  className={`px-5 py-3 text-sm font-bold tracking-tight border-b-2 shrink-0 transition-all ${
                    active 
                      ? "border-red-600 text-red-650 bg-red-50/40 font-extrabold select-none" 
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {c.title}
                </button>
              );
            })}
          </div>

          {/* 2. Focused Track Details Area */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xxs">
            <div className="space-y-2 relative">
              <span className="text-[9px] px-2 py-0.5 rounded-md font-mono font-bold bg-slate-100 border border-slate-200 text-slate-600 uppercase">
                CURRENT TRAIL • {track.id}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                {track.title} Curriculum
              </h2>
              <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                {track.description}
              </p>
            </div>

            <div className="flex items-center gap-6 shrink-0 bg-slate-50 px-5 py-3.5 rounded-xl border border-slate-200">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">LESSONS</span>
                <span className="text-base font-bold font-mono text-slate-800">{track.lessons.length}</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <span className="text-[10px] text-slate-400 uppercase block font-mono">CHALLENGES</span>
                <span className="text-base font-bold font-mono text-slate-800">{track.quizzes.length}</span>
              </div>
            </div>
          </div>

          {/* 3. Filtered Lessons list */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-700 font-mono text-xs uppercase tracking-wider">Modules Breakdown</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {track.lessons.map((lesson, idx) => {
                const completed = completedLessons.includes(lesson.id);
                return (
                  <div 
                    key={lesson.id}
                    className="bg-white border border-slate-200 hover:border-slate-350 hover:shadow-xs rounded-xl p-5 flex flex-col justify-between group cursor-pointer transition"
                    onClick={() => handleLessonSelect(lesson)}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-mono font-bold">UNIT 0{idx + 1}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold font-mono bg-slate-100 border border-slate-200 text-slate-700">
                          {lesson.difficulty}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 group-hover:text-red-650 transition-all">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {lesson.shortDesc}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-150 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono font-medium block">Interactive Trail Core</span>
                      
                      {completed ? (
                        <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-sans font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-150">
                          <Check className="h-3.5 w-3.5" />
                          COMPLETED
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 font-bold group-hover:text-red-750 transition flex items-center gap-1.5">
                          READ LESSON
                          <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
