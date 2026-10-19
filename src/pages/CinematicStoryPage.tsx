import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Eye, 
  Subtitles, 
  Sparkles, 
  Building2, 
  AlertTriangle, 
  SlidersHorizontal, 
  Layers, 
  Clock, 
  ArrowLeftRight, 
  BarChart3, 
  CheckCircle2, 
  FileSpreadsheet,
  ChevronRight
} from 'lucide-react';
import { SAMPLE_COMPLAINTS, GLOBAL_FEATURE_IMPORTANCE } from '../data/complaintsData';
import { LocalExplanationChart } from '../components/explainability/LocalExplanationChart';

interface StoryScene {
  id: number;
  name: string;
  badge: string;
  startSec: number;
  endSec: number;
  durationSec: number;
  voiceover: string;
  headline: string;
  subheadline: string;
}

export const CinematicStoryPage: React.FC = () => {
  const navigate = useNavigate();

  // Exact 60-second 7-scene timeline specified in the prompt
  const SCENES: StoryScene[] = [
    {
      id: 1,
      name: "The Hook",
      badge: "Scene 1 (0–7s)",
      startSec: 0,
      endSec: 7,
      durationSec: 7,
      voiceover: "Every complaint matters. But when many problems demand attention, which one should come first?",
      headline: "Every Complaint Matters. Which One Comes First?",
      subheadline: "An explainable public grievance intelligence concept balancing urgent human hazards against municipal dispatch capacities."
    },
    {
      id: 2,
      name: "The Problem",
      badge: "Scene 2 (7–15s)",
      startSec: 7,
      endSec: 15,
      durationSec: 8,
      voiceover: "From damaged roads to overflowing drains, public complaints compete for limited attention.",
      headline: "Public Complaints Compete for Finite Municipal Resources",
      subheadline: "Potholes, choked drainage lines, severed power poles, and garbage accumulation flood civic queues simultaneously."
    },
    {
      id: 3,
      name: "Meet CivicLens AI",
      badge: "Scene 3 (15–23s)",
      startSec: 15,
      endSec: 23,
      durationSec: 8,
      voiceover: "Meet CivicLens AI, an explainable AI concept designed to classify complaints, predict priorities, and recommend departments.",
      headline: "Meet CivicLens AI: Explainable Grievance Intelligence",
      subheadline: "Transforming unstructured civic text into calibrated priority ratings, functional taxonomy, and automated departmental routing."
    },
    {
      id: 4,
      name: "AI Analysis",
      badge: "Scene 4 (23–32s)",
      startSec: 23,
      endSec: 32,
      durationSec: 9,
      voiceover: "A complaint enters the system. Its predicted category, priority, and recommended department appear.",
      headline: "Sequential Intake & Deterministic Urgency Triage",
      subheadline: "Evaluating critical spatial tokens like school zones and moving traffic before assigning municipal SLA tiers."
    },
    {
      id: 5,
      name: "Explainable AI",
      badge: "Scene 5 (32–42s)",
      startSec: 32,
      endSec: 42,
      durationSec: 10,
      voiceover: "But prediction alone isn't enough. CivicLens AI explores why a model makes its decisions through explainable AI.",
      headline: "A Prediction is Useful. Understanding Why is Essential.",
      subheadline: "Local LIME and SHAP token attributions reveal the exact linguistic and risk multipliers driving algorithmic decisions."
    },
    {
      id: 6,
      name: "Explore the Application",
      badge: "Scene 6 (42–52s)",
      startSec: 42,
      endSec: 52,
      durationSec: 10,
      voiceover: "Explore the analysis, inspect the explanations, and discover how transparent AI-assisted decisions could work.",
      headline: "Interactive Operational Suite: Auditable Governance",
      subheadline: "Test live text with the Complaint Analyzer, run What-If Sensitivity comparisons, and audit full registry records."
    },
    {
      id: 7,
      name: "Closing",
      badge: "Scene 7 (52–60s)",
      startSec: 52,
      endSec: 60,
      durationSec: 8,
      voiceover: "CivicLens AI. Better insights. Clearer decisions. More transparent public services.",
      headline: "Better Insights. Clearer Decisions. Transparent Services.",
      subheadline: "CivicLens AI empowers public authorities with ethical, explainable artificial intelligence designed for civic trust."
    }
  ];

  // Exact time tracker (0.00 to 60.00 seconds)
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [voiceSynthesizing, setVoiceSynthesizing] = useState(false);
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Check Web Speech API availability on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechAvailable(true);
    }
  }, []);

  // Determine current active scene based on exact elapsed seconds
  const currentSceneIndex = Math.min(
    SCENES.length - 1,
    SCENES.findIndex((s) => elapsedSeconds >= s.startSec && elapsedSeconds < s.endSec) === -1
      ? (elapsedSeconds >= 60 ? 6 : 0)
      : SCENES.findIndex((s) => elapsedSeconds >= s.startSec && elapsedSeconds < s.endSec)
  );

  const activeScene = SCENES[currentSceneIndex];

  // Speech narration helper for real browser voiceover without fake audio claims
  const speakCurrentScene = (sceneIdx: number) => {
    if (isAudioMuted || !speechAvailable || typeof window === 'undefined') return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(SCENES[sceneIdx].voiceover);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setVoiceSynthesizing(true);
      utterance.onend = () => setVoiceSynthesizing(false);
      utterance.onerror = () => setVoiceSynthesizing(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setVoiceSynthesizing(false);
    }
  };

  // High precision timer loop (100ms intervals)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = Math.round((prev + 0.1) * 10) / 10;
          if (next >= 60) {
            setIsPlaying(false);
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
            setVoiceSynthesizing(false);
            // Automatically transition to dashboard at the end (60s)
            navigate('/app');
            return 60;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, navigate]);

  // Trigger voice narration when crossing scene boundaries during playback
  const prevSceneRef = useRef(currentSceneIndex);
  useEffect(() => {
    if (isPlaying && prevSceneRef.current !== currentSceneIndex) {
      speakCurrentScene(currentSceneIndex);
    }
    prevSceneRef.current = currentSceneIndex;
  }, [currentSceneIndex, isPlaying]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      if (elapsedSeconds >= 60) {
        setElapsedSeconds(0);
      }
      setIsPlaying(true);
      speakCurrentScene(currentSceneIndex);
    } else {
      setIsPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setVoiceSynthesizing(false);
    }
  };

  const handleReplay = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setElapsedSeconds(0);
    setIsPlaying(true);
    speakCurrentScene(0);
  };

  const handleJumpToScene = (targetSceneIndex: number) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setElapsedSeconds(SCENES[targetSceneIndex].startSec);
    if (isPlaying) {
      speakCurrentScene(targetSceneIndex);
    }
  };

  const handleToggleMute = () => {
    if (!isAudioMuted) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setVoiceSynthesizing(false);
      setIsAudioMuted(true);
    } else {
      setIsAudioMuted(false);
      if (isPlaying) {
        speakCurrentScene(currentSceneIndex);
      }
    }
  };

  const potholeComplaint = SAMPLE_COMPLAINTS[0];

  return (
    <div className="min-h-screen bg-indigo-midnight text-cream-vanilla selection:bg-plum selection:text-cream-vanilla flex flex-col font-sans relative overflow-x-hidden">
      {/* Top Narration Bar & Controls */}
      <nav className="sticky top-0 z-50 glass-panel-dark px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-indigo-light/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-cream-vanilla to-amber-200 flex items-center justify-center text-indigo-midnight font-serif font-bold text-base sm:text-lg shadow-md">
            CL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base sm:text-lg text-cream-vanilla tracking-tight">CivicLens AI</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-plum text-cream-vanilla">
                60s Story
              </span>
            </div>
            <p className="text-[11px] text-cream-vanilla/60 hidden md:block">
              Challenge 04 — Explain Which Public Complaint Needs Priority
            </p>
          </div>
        </div>

        {/* Media Controls for Walkthrough */}
        <div className="flex items-center gap-2 sm:gap-3 bg-indigo-dark/80 px-3 py-1.5 rounded-full border border-indigo-light/30 shadow-inner">
          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            className="p-1.5 rounded-full bg-cream-vanilla text-indigo-midnight hover:bg-amber-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300"
            title={isPlaying ? "Pause Narration (Space)" : "Play 60s Story Walkthrough"}
            aria-label={isPlaying ? "Pause Story" : "Play Story"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Replay */}
          <button
            onClick={handleReplay}
            className="p-1.5 rounded-full hover:bg-indigo-light/40 text-cream-vanilla/80 hover:text-cream-vanilla transition-colors"
            title="Replay from 0:00"
            aria-label="Replay 60s Story"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Captions Toggle */}
          <button
            onClick={() => setShowCaptions(!showCaptions)}
            className={`p-1.5 rounded-full transition-colors ${showCaptions ? 'text-amber-300 bg-indigo-light/40' : 'text-cream-vanilla/50 hover:text-cream-vanilla'}`}
            title="Toggle Narration Captions"
            aria-label="Toggle Subtitles"
          >
            <Subtitles className="w-4 h-4" />
          </button>

          {/* Voiceover status / mute toggle */}
          <button
            onClick={handleToggleMute}
            className={`p-1.5 rounded-full transition-colors hidden sm:flex items-center gap-1 ${
              voiceSynthesizing 
                ? 'text-emerald-400 bg-emerald-950/40' 
                : (isAudioMuted ? 'text-cream-vanilla/40 hover:text-cream-vanilla' : 'text-cream-vanilla/80 hover:text-cream-vanilla')
            }`}
            title={isAudioMuted ? "Voiceover Muted — Click to enable" : (voiceSynthesizing ? "AI Voice Narrating" : "Voiceover Ready")}
            aria-label="Toggle Voiceover"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            {voiceSynthesizing && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
          </button>

          {/* Exact Timeline Counter */}
          <div className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-midnight border border-indigo-light/30 text-amber-200">
            {elapsedSeconds.toFixed(1)}s / 60.0s
          </div>

          <div className="h-4 w-px bg-indigo-light/40 hidden sm:block" />

          {/* Visible Skip Introduction Button */}
          <button
            onClick={() => navigate('/app')}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-plum hover:bg-plum-light text-cream-vanilla transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.02]"
            title="Skip directly to the interactive application"
          >
            <span>Skip to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Progress Bar (0 to 60s) */}
      <div className="w-full bg-indigo-dark h-1.5 relative overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 transition-all duration-100 ease-linear"
          style={{ width: `${(elapsedSeconds / 60) * 100}%` }}
        />
        {/* Scene Boundary Marks */}
        {SCENES.map((s, idx) => (
          <div 
            key={s.id}
            onClick={() => handleJumpToScene(idx)}
            style={{ left: `${(s.startSec / 60) * 100}%` }}
            className="absolute top-0 bottom-0 w-0.5 bg-cream-vanilla/30 cursor-pointer hover:bg-amber-300 hover:w-1 transition-all z-10"
            title={`${s.name} (${s.startSec}s)`}
          />
        ))}
      </div>

      {/* Main Interactive Stage */}
      <div className="relative flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-8 sm:py-10 max-w-7xl mx-auto w-full">
        {/* 7-Scene Interactive Selector Strip */}
        <div className="w-full grid grid-cols-7 gap-1.5 sm:gap-2 mb-6">
          {SCENES.map((scene, idx) => {
            const isActive = currentSceneIndex === idx;
            const isPassed = elapsedSeconds >= scene.endSec;
            return (
              <button
                key={scene.id}
                onClick={() => handleJumpToScene(idx)}
                className={`py-2 px-1 rounded-xl text-center transition-all border ${
                  isActive
                    ? 'bg-amber-300 text-indigo-midnight border-amber-300 shadow-glow-indigo font-bold'
                    : isPassed
                    ? 'bg-indigo-light/30 text-cream-vanilla/80 border-indigo-light/30'
                    : 'bg-indigo-dark/50 text-cream-vanilla/50 border-indigo-light/20 hover:border-indigo-light/40'
                }`}
                title={`Scene ${scene.id}: ${scene.name} (${scene.startSec}–${scene.endSec}s)`}
              >
                <div className="text-[10px] font-mono leading-none hidden sm:block">
                  {scene.startSec}–{scene.endSec}s
                </div>
                <div className="text-xs truncate font-semibold mt-0.5">
                  {scene.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Scene Content Container */}
        <div className="w-full space-y-6">
          {/* Headline & Subhead for the active scene */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-light/30 border border-indigo-light/40 text-[11px] text-amber-200 uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{activeScene.badge} — {activeScene.name}</span>
            </div>

            <h1 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-cream-vanilla leading-tight">
              {activeScene.headline}
            </h1>

            <p className="text-cream-vanilla/75 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto">
              {activeScene.subheadline}
            </p>
          </div>

          {/* SCENE VISUALS (1 to 7) */}
          <div className="w-full rounded-3xl bg-indigo-dark/85 border border-indigo-light/20 p-5 sm:p-7 relative overflow-hidden shadow-2xl backdrop-blur-md min-h-[390px] flex flex-col justify-center">
            {/* Background Aesthetic Gradients */}
            <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
            <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-plum/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            {/* SCENE 1: THE HOOK (0–7s) */}
            {currentSceneIndex === 0 && (
              <div className="relative z-10 text-center space-y-6 max-w-2xl mx-auto">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-cream-vanilla via-cream-warm to-amber-200 flex items-center justify-center text-indigo-midnight font-serif font-black text-3xl shadow-xl shadow-black/40 border border-cream-vanilla">
                  CL
                </div>
                <div className="space-y-2">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-cream-vanilla">
                    CivicLens AI
                  </h3>
                  <p className="text-amber-200 text-xs font-mono uppercase tracking-widest">
                    Explainable Public Grievance Intelligence
                  </p>
                </div>
                <p className="text-cream-vanilla/75 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
                  Municipalities receive thousands of simultaneous complaints. How do we explain and justify which issue receives immediate dispatch?
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handlePlayPause}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cream-vanilla to-amber-200 text-indigo-midnight font-bold text-xs hover:scale-105 transition-all shadow-md flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlaying ? "Pause Story" : "Start 60s Walkthrough"}</span>
                  </button>
                  <button
                    onClick={() => navigate('/app')}
                    className="px-5 py-2.5 rounded-xl bg-plum hover:bg-plum-light text-cream-vanilla font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Direct to Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* SCENE 2: THE PROBLEM (7–15s) */}
            {currentSceneIndex === 1 && (
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between text-xs text-cream-vanilla/70 border-b border-indigo-light/20 pb-2">
                  <span className="font-mono text-amber-300">COMPLAINTS COMPETING FOR ATTENTION</span>
                  <span className="text-[11px]">4 Illustrative Grievance Types</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  {[
                    { title: "Large Pothole near School", cat: "Roads & Infra", icon: AlertTriangle, color: "border-rose-500/50 bg-rose-950/30", hazard: "Vehicular swerving hazard in pedestrian school zone" },
                    { title: "Overflowing Monsoonal Drain", cat: "Sanitation", icon: Layers, color: "border-amber-500/50 bg-amber-950/30", hazard: "Foul wastewater backflow into commercial market" },
                    { title: "Garbage Corner Accumulation", cat: "Solid Waste", icon: Clock, color: "border-emerald-500/50 bg-emerald-950/30", hazard: "Stray animal scavenging and route pickup miss" },
                    { title: "Streetlight Pole #14 Failure", cat: "Electrical", icon: Building2, color: "border-blue-500/50 bg-blue-950/30", hazard: "Dim alleyway with partial porch light mitigation" }
                  ].map((card, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${card.color} space-y-2 backdrop-blur-sm transition-transform hover:-translate-y-1`}>
                      <div className="flex items-center justify-between">
                        <card.icon className="w-4 h-4 text-amber-300" />
                        <span className="text-[10px] font-mono text-cream-vanilla/60">{card.cat}</span>
                      </div>
                      <h4 className="font-bold text-xs text-cream-vanilla leading-snug">{card.title}</h4>
                      <p className="text-[11px] text-cream-vanilla/70 leading-relaxed">{card.hazard}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCENE 3: MEET CIVICLENS AI (15–23s) */}
            {currentSceneIndex === 2 && (
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-1 p-5 rounded-2xl bg-cream-warm text-indigo-midnight space-y-3 shadow-xl">
                  <div className="w-8 h-8 rounded-lg bg-plum text-cream-vanilla flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="font-editorial text-lg font-bold">The CivicLens Vision</h4>
                  <p className="text-xs text-indigo-midnight/80 leading-relaxed">
                    Designed to bridge citizen grievances and municipal action using explainable machine learning rather than opaque black-box scoring.
                  </p>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-indigo-midnight border border-indigo-light/30 space-y-1.5">
                    <span className="text-[10px] font-mono text-amber-300 uppercase">Core Capability 1</span>
                    <h5 className="font-bold text-xs text-cream-vanilla">Automated Categorization</h5>
                    <p className="text-[11px] text-cream-vanilla/70">Routes grievances to PWD, Water Board, Drainage, or Power Distribution.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-midnight border border-indigo-light/30 space-y-1.5">
                    <span className="text-[10px] font-mono text-rose-300 uppercase">Core Capability 2</span>
                    <h5 className="font-bold text-xs text-cream-vanilla">Calibrated Priority Triage</h5>
                    <p className="text-[11px] text-cream-vanilla/70">Identifies true High-urgency threats with an asymmetric recall penalty.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-midnight border border-indigo-light/30 space-y-1.5">
                    <span className="text-[10px] font-mono text-emerald-300 uppercase">Core Capability 3</span>
                    <h5 className="font-bold text-xs text-cream-vanilla">Explainability Layer</h5>
                    <p className="text-[11px] text-cream-vanilla/70">Reveals exact token attributions so officials understand why an issue escalated.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-midnight border border-indigo-light/30 space-y-1.5">
                    <span className="text-[10px] font-mono text-blue-300 uppercase">Core Capability 4</span>
                    <h5 className="font-bold text-xs text-cream-vanilla">Human-in-the-Loop</h5>
                    <p className="text-[11px] text-cream-vanilla/70">Public officers verify, modify, or escalate dispatch with full oversight.</p>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 4: AI ANALYSIS (23–32s) */}
            {currentSceneIndex === 3 && (
              <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
                <div className="p-4 rounded-xl bg-cream-vanilla/15 border border-indigo-light/30 text-xs text-cream-vanilla space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-amber-300">
                    <span>SAMPLE INTAKE: CIV-2024-0891</span>
                    <span>DEMONSTRATION OUTPUT</span>
                  </div>
                  <p className="italic text-xs font-serif leading-relaxed">
                    "{potholeComplaint.description}"
                  </p>
                </div>

                {/* Sequential Field Reveals */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-indigo-midnight border border-indigo-light/30 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-cream-vanilla/60">1. Predicted Category</span>
                    <p className="text-sm font-bold text-cream-vanilla">{potholeComplaint.category}</p>
                    <span className="text-[10px] text-emerald-400 font-mono">PWD Domain</span>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-midnight border border-rose-500/40 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-rose-300">2. Predicted Priority</span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold text-xs">High Urgency</span>
                      <span className="text-xs font-mono text-cream-vanilla/70">(92% conf)</span>
                    </div>
                    <span className="text-[10px] text-rose-300/80 font-mono">Immediate SLA Trigger</span>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-midnight border border-indigo-light/30 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-cream-vanilla/60">3. Recommended Dept</span>
                    <p className="text-sm font-bold text-cream-vanilla truncate">{potholeComplaint.recommendedDepartment}</p>
                    <span className="text-[10px] text-amber-300 font-mono">Auto Routing Queue</span>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 5: EXPLAINABLE AI (32–42s) */}
            {currentSceneIndex === 4 && (
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
                    Decision Attribution Audit
                  </span>
                  <h4 className="font-editorial text-xl font-bold text-cream-vanilla leading-snug">
                    "Why was this pothole prioritized above standard road repairs?"
                  </h4>
                  <p className="text-xs text-cream-vanilla/75 leading-relaxed">
                    Rather than a black-box probability, CivicLens AI isolates decisive feature weights: <strong className="text-rose-400">"school entrance" (+0.46)</strong> and <strong className="text-rose-400">"swerving vehicles" (+0.28)</strong> drove the model from standard routine maintenance to urgent life hazard status.
                  </p>
                  <div className="p-2.5 rounded-lg bg-indigo-midnight/80 border border-indigo-light/20 text-[11px] text-amber-200/90 italic">
                    * Illustrative SHAP/LIME-style weights demonstrating explainability for public accountability.
                  </div>
                </div>

                {/* Compact Token Contribution Bars */}
                <div className="p-4 rounded-2xl bg-indigo-midnight border border-indigo-light/30 space-y-2.5">
                  <span className="text-[10px] font-mono text-amber-200 font-bold uppercase">
                    Token Attribution Breakdown
                  </span>
                  {potholeComplaint.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-mono text-cream-vanilla">"{f.feature}"</span>
                        <span className="font-mono font-bold text-rose-400">+{f.contribution}</span>
                      </div>
                      <div className="w-full h-1.5 bg-indigo-dark rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-rose-500 rounded-full" 
                          style={{ width: `${Math.round(f.contribution * 160)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCENE 6: EXPLORE THE APPLICATION (42–52s) */}
            {currentSceneIndex === 5 && (
              <div className="relative z-10 space-y-4">
                <div className="text-center max-w-lg mx-auto">
                  <span className="text-xs font-mono text-amber-300 uppercase font-semibold">Live Interactive Prototype</span>
                  <h4 className="font-editorial text-lg font-bold text-cream-vanilla">Explore the Full Operational Suite</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div 
                    onClick={() => navigate('/app/analyze')}
                    className="p-4 rounded-xl bg-cream-warm text-indigo-midnight space-y-2 cursor-pointer hover:scale-[1.02] transition-transform shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <SlidersHorizontal className="w-4 h-4 text-plum" />
                      <span className="text-[10px] uppercase font-bold text-plum">Analyzer</span>
                    </div>
                    <h5 className="font-bold text-xs">Complaint Analyzer</h5>
                    <p className="text-[11px] text-indigo-midnight/70 leading-tight">Type custom text & run instant local keyword heuristics.</p>
                  </div>

                  <div 
                    onClick={() => navigate('/app/explainability')}
                    className="p-4 rounded-xl bg-indigo-midnight border border-indigo-light/40 space-y-2 cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-center justify-between">
                      <Eye className="w-4 h-4 text-amber-300" />
                      <span className="text-[10px] uppercase font-bold text-amber-300">Simulator</span>
                    </div>
                    <h5 className="font-bold text-xs text-cream-vanilla">What-If Sensitivity</h5>
                    <p className="text-[11px] text-cream-vanilla/70 leading-tight">Modify context tokens side-by-side to test priority shifts.</p>
                  </div>

                  <div 
                    onClick={() => navigate('/app/analytics')}
                    className="p-4 rounded-xl bg-indigo-midnight border border-indigo-light/40 space-y-2 cursor-pointer hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-center justify-between">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] uppercase font-bold text-emerald-400">Benchmarking</span>
                    </div>
                    <h5 className="font-bold text-xs text-cream-vanilla">Model Evaluation</h5>
                    <p className="text-[11px] text-cream-vanilla/70 leading-tight">Examine Precision, Recall, and Multiclass Confusion Matrices.</p>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 7: CLOSING (52–60s) */}
            {currentSceneIndex === 6 && (
              <div className="relative z-10 text-center space-y-5 max-w-xl mx-auto">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cream-vanilla to-amber-200 flex items-center justify-center text-indigo-midnight font-serif font-black text-2xl shadow-xl border border-cream-vanilla">
                  CL
                </div>

                <div className="space-y-1">
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-cream-vanilla">
                    CivicLens AI
                  </h3>
                  <p className="text-amber-200 text-sm font-semibold">
                    Better insights. Clearer decisions. More transparent public services.
                  </p>
                </div>

                {/* CivicLens Predict Coming Soon Teaser */}
                <div className="p-3 rounded-xl bg-indigo-midnight/90 border border-amber-300/30 text-xs space-y-1 text-cream-vanilla/80">
                  <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-amber-400 text-indigo-midnight">
                    ROADMAP PREVIEW
                  </span>
                  <p className="font-medium text-cream-vanilla">
                    CivicLens Predict — Anticipating recurring civic crises through spatio-temporal trends.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => navigate('/app')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cream-vanilla via-cream-warm to-amber-200 text-indigo-midnight font-bold text-sm hover:scale-105 transition-all shadow-xl flex items-center gap-2 mx-auto"
                  >
                    <span>Explore the Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Transcript / Subtitle Box synchronized with Voiceover */}
          {showCaptions && (
            <div className="p-4 rounded-2xl glass-panel-dark border border-indigo-light/30 max-w-3xl mx-auto shadow-lg space-y-1">
              <div className="flex items-center justify-between text-[11px] text-amber-300 font-mono">
                <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
                  <Subtitles className="w-3.5 h-3.5" />
                  Voiceover Transcript — {activeScene.name} ({activeScene.startSec}–{activeScene.endSec}s)
                </span>
                <span className="text-cream-vanilla/50">Scene {activeScene.id} of 7</span>
              </div>
              <p className="text-xs sm:text-sm text-cream-vanilla/95 leading-relaxed font-sans font-medium">
                "{activeScene.voiceover}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cinematic Footer */}
      <footer className="border-t border-indigo-light/20 py-4 px-6 text-center text-xs text-cream-vanilla/60 bg-indigo-dark/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            CivicLens AI — 60-Second Challenge 04 Explainer Video Demonstration
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/app')} className="hover:text-cream-vanilla underline transition-colors">
              Enter Operational App
            </button>
            <button onClick={() => navigate('/app/model')} className="hover:text-cream-vanilla underline transition-colors">
              Model Specs
            </button>
            <button onClick={() => navigate('/app/responsible-ai')} className="hover:text-cream-vanilla underline transition-colors">
              Responsible AI
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
