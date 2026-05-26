import React, { useState, useEffect } from "react";
import { Terminal, Play, RotateCcw, Sparkles, Loader2, BookOpen } from "lucide-react";
import Markdown from "react-markdown";

interface PlaygroundViewProps {
  initialCode: {
    html: string;
    css: string;
    js: string;
    templateName: string;
  };
  addXP: (pts: number) => void;
  triggerCoderAchievement: () => void;
}

export default function PlaygroundView({
  initialCode,
  addXP,
  triggerCoderAchievement,
}: PlaygroundViewProps) {
  const [html, setHtml] = useState(initialCode.html);
  const [css, setCss] = useState(initialCode.css);
  const [js, setJs] = useState(initialCode.js);
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [srcDoc, setSrcDoc] = useState("");
  const [analysis, setAnalysis] = useState<string>("");
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Synchronize component state if parent initialCode updates
  useEffect(() => {
    setHtml(initialCode.html);
    setCss(initialCode.css);
    setJs(initialCode.js);
    setAnalysis("");
  }, [initialCode]);

  // Set default live rendering on startup
  useEffect(() => {
    runCode();
  }, [html, css, js]);

  // Preset templates definitions
  const PRESET_TEMPLATES = [
    {
      name: "Profile Badge",
      html: `<div class="profile-card">
  <div class="user-avatar font-sans">💻</div>
  <h3>Muaz Zainuri</h3>
  <p>Full-Stack Engineer</p>
  <button class="follow-btn" onclick="toggleFollow()">Connect</button>
</div>`,
      css: `body {
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  color: #1e293b;
}

.profile-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  max-width: 250px;
}

.user-avatar {
  font-size: 40px;
  margin-bottom: 12px;
}

h3 {
  margin: 8px 0;
  font-weight: 800;
  color: #0f172a;
}

p {
  color: #64748b;
  font-size: 13px;
  margin-bottom: 16px;
}

.follow-btn {
  background: #dc2626;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: .2s;
}

.follow-btn:hover {
  transform: translateY(-2px);
  background: #b91c1c;
}`,
      js: `function toggleFollow() {
  const btn = document.querySelector('.follow-btn');
  if(btn.textContent === 'Connect') {
    btn.textContent = 'Connected ✔';
    btn.style.background = '#10b981';
  } else {
    btn.textContent = 'Connect';
    btn.style.background = '#dc2626';
  }
}`
    },
    {
      name: "Glassy Cards Hover",
      html: `<div class="center-box">
  <div class="glass-orb">
    <h4>Visual Neumorphic Box</h4>
    <p>Hover over this component to trigger modern CSS gradient overlays and fluid layout transitions!</p>
  </div>
</div>`,
      css: `body {
  background-color: #f1f5f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  margin: 0;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

.glass-orb {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 16px;
  padding: 30px;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-orb:hover {
  transform: scale(1.05) translateY(-5px);
  border-color: #dc2626;
  box-shadow: 0 10px 25px rgba(220, 38, 38, 0.1);
}

h4 {
  color: #dc2626;
  margin-top: 0;
  font-weight: 800;
}`,
      js: `console.log("Hover preset canvas rendering successfully!");`
    }
  ];

  const selectPreset = (p: typeof PRESET_TEMPLATES[0]) => {
    setHtml(p.html);
    setCss(p.css);
    setJs(p.js);
    setAnalysis("");
  };

  const runCode = () => {
    const integratedSandbox = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <style>
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>
            // Intercept errors and append text warnings inside layout
            window.onerror = function(message, source, lineno, colno, error) {
              const div = document.createElement('div');
              div.style.backgroundColor = '#fef2f2';
              div.style.color = '#991b1b';
              div.style.padding = '12px';
              div.style.margin = '16px';
              div.style.borderRadius = '8px';
              div.style.fontFamily = 'monospace';
              div.style.fontSize = '12px';
              div.style.border = '1px solid #fca5a5';
              div.innerHTML = '<strong>❌ Script Error:</strong> ' + message + ' (line ' + lineno + ')';
              document.body.prepend(div);
              return false;
            };
            try {
              ${js}
            } catch(e) {
              window.onerror(e.message, '', 0, 0, e);
            }
          </script>
        </body>
      </html>
    `;
    setSrcDoc(integratedSandbox);
    triggerCoderAchievement();
  };

  // Triggers backend AI analysis routing
  const analyzeWorkspaceCode = async () => {
    setLoadingAnalysis(true);
    try {
      const response = await fetch("/api/analyze-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html,
          css,
          js,
          activeTemplate: initialCode.templateName || "Web Sandbox freeform"
        })
      });
      const data = await response.json();
      setAnalysis(data.text);
      addXP(40); // Reward active inspection!
    } catch (err) {
      console.error(err);
      setAnalysis("Could not compile AI feedback. Check WebLearn server connections.");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* 1. Controller Headers */}
      <div className="bg-white border border-slate-200 p-4.5 rounded-xl flex flex-wrap items-center justify-between gap-4 shadow-xxs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-655 shadow-xxs">
            <Terminal className="h-4.5 w-4.5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-805 tracking-tight">
              Live Compiler Sandbox
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Workspace Source: <span className="font-mono text-red-600 font-bold">{initialCode.templateName || "Freeform Playground"}</span>
            </p>
          </div>
        </div>

        {/* Preset Selectors */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold uppercase">PRESETS:</span>
          {PRESET_TEMPLATES.map(p => (
            <button
              key={p.name}
              onClick={() => selectPreset(p)}
              className="px-3 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-650 transition"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Workspace Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[72vh]">
        
        {/* Left Side: Code Source Editors */}
        <div className="flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          
          {/* Tab switches */}
          <div className="flex items-center justify-between bg-slate-50 px-4 py-2.5 border-b border-slate-200">
            <div className="flex items-center gap-1.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {(["html", "css", "js"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                    activeTab === tab
                      ? "bg-white text-red-650 shadow-xxs border border-slate-200/50"
                      : "text-slate-550 hover:text-slate-900"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setHtml("");
                  setCss("");
                  setJs("");
                  setAnalysis("");
                }}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-650 transition"
                title="Clear Workspace"
              >
                <RotateCcw className="h-3.5 w-3.5 animate-spin-reverse hover:rotate-180 duration-300" />
              </button>

              <button
                onClick={runCode}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs font-mono rounded-lg transition shadow-xs"
              >
                <Play className="h-3 w-3 fill-white" />
                EXECUTE
              </button>
            </div>
          </div>

          {/* Textarea compiler canvas */}
          <div className="flex-1 relative overflow-hidden bg-slate-50 p-2 select-text">
            
            {activeTab === "html" && (
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="<!-- Write HTML templates here -->"
                className="w-full h-full bg-transparent text-slate-800 font-mono text-xs p-4 outline-none focus:ring-0 resize-none select-text selection:bg-red-200/50 whitespace-pre"
                spellCheck={false}
              />
            )}

            {activeTab === "css" && (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                placeholder="/* Standard CSS sheets */"
                className="w-full h-full bg-transparent text-slate-800 font-mono text-xs p-4 outline-none focus:ring-0 resize-none select-text selection:bg-red-200/50 whitespace-pre"
                spellCheck={false}
              />
            )}

            {activeTab === "js" && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                placeholder="// Interactive scripts"
                className="w-full h-full bg-transparent text-slate-800 font-mono text-xs p-4 outline-none focus:ring-0 resize-none select-text selection:bg-red-200/50 whitespace-pre"
                spellCheck={false}
              />
            )}
          </div>

          <div className="bg-slate-100 px-4 py-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
            <span>READY TO COMPILE</span>
            <span>UTF-8 ENCODED WORKSPACE</span>
          </div>
        </div>

        {/* Right Side: Split Previews & AI Inspector panels */}
        <div className="flex flex-col gap-4">
          
          {/* Top Frame Preview */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm relative">
            
            {/* Embedded browser path header */}
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
              <div className="flex gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 block" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200 block" />
              </div>

              <div className="flex-1 bg-white hover:bg-slate-50 rounded-md border border-slate-200 px-3 py-0.5 text-[11px] text-slate-500 font-mono truncate select-all">
                academy-dev-sandbox://weblearn.edu
              </div>
            </div>

            {/* Simulated frame rendering */}
            <div className="flex-1 bg-white relative">
              <iframe
                title="Interactive Workspace Viewer"
                srcDoc={srcDoc}
                sandbox="allow-scripts allow-modals"
                className="w-full h-full border-none bg-white"
                id="sandbox-output-iframe"
              />
            </div>
          </div>

          {/* AI Analysis trigger row */}
          <div className="shrink-0 bg-white border border-slate-200 p-4.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xxs">
            <div className="space-y-1">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase font-sans tracking-wide">
                <Sparkles className="h-4 w-4 text-red-500" />
                Gemini Compiler Assistant
              </span>
              <p className="text-xs text-slate-500">
                Audit layout selectors, trace script logic, and request design suggestions instantly!
              </p>
            </div>

            <button
              onClick={analyzeWorkspaceCode}
              disabled={loadingAnalysis}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-350 text-white font-bold text-xs font-mono rounded-lg transition shrink-0 active:scale-98"
              id="playground-ai-analyze-btn"
            >
              {loadingAnalysis ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ANALYZING CODE...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  AI CODE AUDIT
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sliding AI Feedback panel underneath if analysis exists */}
      {analysis && (
        <div className="bg-white border border-red-200 rounded-2xl p-6 space-y-4 animate-in slide-in-from-bottom duration-300 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-red-600 flex items-center gap-2 uppercase tracking-wider font-mono">
              <Sparkles className="h-5 w-5 text-red-500" />
              Interactive Code review feedback
            </h3>

            <button
              onClick={() => setAnalysis("")}
              className="text-xs text-slate-400 hover:text-slate-800 font-bold"
            >
              Dismiss
            </button>
          </div>

          <div className="prose text-slate-700 text-sm leading-relaxed max-w-none space-y-4">
            <Markdown>{analysis}</Markdown>
          </div>
        </div>
      )}

    </div>
  );
}
