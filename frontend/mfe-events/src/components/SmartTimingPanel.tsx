import React from 'react';

interface SmartTimingPanelProps {
  eventCategory: string;
}

export default function SmartTimingPanel({ eventCategory }: SmartTimingPanelProps) {
  return (
    <div className="md:col-span-4 bg-surface-container-high p-8 rounded-xl relative overflow-hidden flex flex-col justify-between">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
          <span className="text-tertiary font-bold text-sm tracking-widest uppercase">Smart Timing AI</span>
        </div>
        <h3 className="font-headline text-3xl font-bold mb-4 leading-tight">Optimal Window Identified</h3>
        <p className="text-on-surface-variant mb-6">Based on local engagement data, your next {eventCategory.toLowerCase()} will perform best on:</p>
        <div className="bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/20">
          <p className="text-sm font-bold text-on-surface">Saturday, Oct 24th</p>
          <p className="text-2xl font-black text-primary">10:00 AM — 1:00 PM</p>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-on-surface/5">
        <button className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-all">
          Schedule for this time <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
      {/* Abstract Texture Decor */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
    </div>
  );
}
