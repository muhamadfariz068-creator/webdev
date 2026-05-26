import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, Brain, Terminal, MessageSquare, HelpCircle, Loader2 } from "lucide-react";
import Markdown from "react-markdown";
import { ChatMessage } from "../types";

interface AITutorProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  addXP: (pts: number) => void;
  triggerTutorAchievement: () => void;
}

export default function AITutor({
  chatHistory,
  setChatHistory,
  addXP,
  triggerTutorAchievement,
}: AITutorProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  const QUICK_PROMPTS = [
    {
      title: "Grid vs Flexbox",
      desc: "Explain layout alignment in simple terms.",
      query: "Can you explain when to use CSS Grid vs Flexbox using visual analogies and quick syntax samples?",
    },
    {
      title: "React useState Lifecycle",
      desc: "Deconstruct state triggers and hooks.",
      query: "Explain what React useState is, how standard variables differ from states, and provide a clean code sample.",
    },
    {
      title: "JS Callback Hell Resolution",
      desc: "Compare Promises and Async/Await.",
      query: "What exactly is 'Callback Hell' in JavaScript and how do ES6 Promises and Async/Await solve this pattern?",
    },
    {
      title: "Semantic HTML landmarks",
      desc: "Learn why they matter for SEO and accessibility.",
      query: "Give me a checklist on semantic HTML landmark elements (main, header, article, etc.) and why they improve SEO/accessibility.",
    }
  ];

  const submitQuery = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      role: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const mappedHistory = chatHistory.map(h => ({
        role: h.role,
        text: h.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: queryText,
          history: mappedHistory,
          lessonContext: null
        })
      });

      const data = await res.json();
      
      const modelMsg: ChatMessage = {
        id: "model-" + Date.now(),
        role: "model",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, modelMsg]);
      addXP(50); // reward chat exploration!
      triggerTutorAchievement();
    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: "err-" + Date.now(),
        role: "model",
        text: "My backend compiling networks are slightly delayed, but let me know if there's any immediate code snippet I can help review!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[78vh] animate-in fade-in duration-300">
      
      {/* Left Column: Quick-Prompts inquiries */}
      <div className="lg:col-span-1 space-y-4 flex flex-col justify-between h-full">
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <Brain className="h-4 w-4 text-red-600" />
              Quick Inquiries
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Launch instant frontend curriculum queries to evaluate structure mechanics:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
            {QUICK_PROMPTS.map((qp) => (
              <button
                key={qp.title}
                onClick={() => submitQuery(qp.query)}
                disabled={loading}
                className="w-full text-left p-3.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-350 rounded-xl transition text-slate-700 group disabled:opacity-50 hover:shadow-xxs"
              >
                <div className="flex items-center gap-1.5 mb-1 text-xs font-bold text-red-600">
                  <Terminal className="h-3 w-3 stroke-[2.5]" />
                  <span>{qp.title}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {qp.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Small security assurance badge */}
        <div className="bg-slate-100 border border-slate-200 px-4 py-3.5 rounded-xl flex items-center gap-2.5 text-[10px] text-slate-500 font-sans leading-relaxed">
          <HelpCircle className="h-4.5 w-4.5 text-slate-400 shrink-0" />
          <span>Ask anything. Coding references inside queries are processed securely on the backend server.</span>
        </div>
      </div>

      {/* Right Column: Chat Console Panel */}
      <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm h-full">
        
        {/* Top Status Indicators panel */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <Bot className="h-4.5 w-4.5" />
              </div>
              <span className="w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full absolute -bottom-0.5 -right-0.5 animate-pulse" />
            </div>

            <div>
              <span className="text-sm font-bold text-slate-800 block">AI Programming Mentor</span>
              <span className="text-[10px] text-red-650 font-mono font-bold flex items-center gap-1">
                ONLINE • COMPILER WORKSPACE SYNCED
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-mono">Feedback System</span>
            <span className="text-xs text-red-600 font-extrabold font-mono">Dynamic AI Response</span>
          </div>
        </div>

        {/* Middle: Chat Messages stream */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/20 scroll-smooth select-text"
        >
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-3.5 py-12">
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-600 animate-bounce">
                <MessageSquare className="h-5 w-5" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-755 uppercase tracking-wider font-mono">
                  Start Your Learning Conversation
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Ask questions about HTML semantic markers, CSS layouts, JS logic scopes, or React rendering states.
                </p>
              </div>
            </div>
          ) : (
            chatHistory.map((m) => {
              const matchesModel = m.role === "model";
              return (
                <div 
                  key={m.id}
                  className={`flex gap-3.5 max-w-[85%] select-text leading-relaxed ${
                    matchesModel ? "self-start" : "self-end flex-row-reverse ml-auto"
                  }`}
                >
                  {/* User/AI avatars */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    matchesModel 
                      ? "bg-slate-100 border-slate-200 text-slate-600" 
                      : "bg-red-50 border-red-200 text-red-600"
                  }`}>
                    {matchesModel ? <Bot className="h-4.5 w-4.5" /> : <User className="h-4.5 w-4.5" />}
                  </div>

                  {/* Message body */}
                  <div className="space-y-1 select-text">
                    <div className={`p-4 rounded-xl select-text border shadow-xxs ${
                      matchesModel 
                        ? "bg-white border-slate-205 text-slate-750 rounded-tl-none" 
                        : "bg-red-50/70 border border-red-100 text-slate-800 rounded-tr-none"
                    }`}>
                      <div className="prose text-slate-750 text-sm leading-relaxed space-y-2 select-text">
                        <Markdown>{m.text}</Markdown>
                      </div>
                    </div>
                    
                    <span className={`text-[9px] text-slate-400 font-mono block ${!matchesModel && "text-right"}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })
          )}

          {/* Prompt Processing loader */}
          {loading && (
            <div className="flex gap-3.5 max-w-[80%] self-start animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                <Bot className="h-4.5 w-4.5" />
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-xl rounded-tl-none shadow-xxs">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-550">
                  <Loader2 className="h-3 w-3 animate-spin text-red-600" />
                  <span>Synthesizing tutor response...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Panel: Prompt typing canvas */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              submitQuery(input);
            }}
            className="flex items-center gap-3 bg-white p-2 border border-slate-200 rounded-xl focus-within:border-red-500 transition"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Ask a question (e.g., 'How does CSS Grid center containers?')..."
              className="flex-1 bg-transparent border-none text-slate-800 placeholder-slate-400 p-2 text-xs md:text-sm outline-none focus:ring-0"
              id="ai-tutor-prompt-input"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4.5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-200 text-white font-bold text-[11px] font-mono transition inline-flex items-center gap-1.5 shrink-0"
            >
              <span>SEND</span>
              <Send className="h-3 w-3 fill-white text-white" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
