import React, { useState } from "react";
import { Layout, Palette, Cpu, Globe, GraduationCap, Menu, X, Sparkles, BookOpen, Terminal, Award } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  xp: number;
}

export default function Navigation({ activeTab, setActiveTab, xp }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: GraduationCap },
    { id: "lessons", label: "Lessons", icon: BookOpen },
    { id: "playground", label: "Live Sandbox", icon: Terminal },
    { id: "aitutor", label: "AI Mentor", icon: Sparkles },
    { id: "certificate", label: "Certificate", icon: Award },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setActiveTab("dashboard")}
            id="academy-logo"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 shadow-sm shadow-red-500/10">
              <GraduationCap className="h-5.5 w-5.5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-red-400/10 animate-pulse" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-lg tracking-tight text-slate-900">
                WebLearn
              </span>
              <span className="text-red-650 font-bold text-xs ml-1 bg-red-50 px-1.5 py-0.5 rounded-md border border-red-150 tracking-wide uppercase">
                Academy
              </span>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center gap-1.5">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                   key={item.id}
                   id={`nav-link-${item.id}`}
                   onClick={() => setActiveTab(item.id)}
                   className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                     isActive
                       ? "bg-red-50 text-red-600 border-red-200 shadow-xs shadow-red-500/5 select-none"
                       : "text-slate-650 hover:text-slate-900 hover:bg-slate-50 border-transparent"
                   }`}
                >
                  <IconComp className={`h-4 w-4 ${isActive ? "text-red-500" : "text-slate-450"}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile hamburger trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100"
              id="mobile-drawer-btn"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in fade-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all border ${
                    isActive
                      ? "bg-red-50 text-red-600 border-red-150"
                      : "text-slate-650 hover:text-slate-900 hover:bg-slate-50 border-transparent"
                  }`}
                >
                  <IconComp className={`h-5 w-5 ${isActive ? "text-red-500" : "text-slate-500"}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
