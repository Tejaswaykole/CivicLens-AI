import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Users, 
  AlertTriangle, 
  Scale, 
  FileCheck, 
  EyeOff, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { DemoDataNotice } from '../components/common/DemoDataNotice';

export const ResponsibleAiPage: React.FC = () => {
  const principles = [
    {
      title: "Citizen Privacy & PII Scrubbing",
      icon: Lock,
      desc: "All citizen personal identifiable information (phone numbers, full names, Aadhaar/ID numbers, house numbers) must be sanitized and replaced with pseudonymous hash tokens in Stage 01 prior to vectorization."
    },
    {
      title: "Mitigating Socio-Demographic Bias",
      icon: Scale,
      desc: "Municipal priority models must never penalize informal settlements, slums, or specific zip codes. Word embedding projections and TF-IDF terms are regularly audited to ensure geographic equity across wards."
    },
    {
      title: "Addressing False-Negative Priority Hazards",
      icon: AlertTriangle,
      desc: "If an elderly citizen phrases an emergency grievance using gentle or non-standard regional vocabulary, a standard model might rank it 'Low'. CivicLens AI enforces high-recall loss functions to protect vulnerable groups."
    },
    {
      title: "Explainability as a Non-Negotiable Right",
      icon: EyeOff,
      desc: "Public governance demands transparency. A municipal authority cannot dismiss or expedite a complaint on the basis of 'the algorithm said so' without providing human-readable contributing factors."
    },
    {
      title: "Strict Human Accountability",
      icon: Users,
      desc: "CivicLens AI strictly acts as an assistive decision-support engine. Dispatching crews, approving budgets, and altering priority status remains 100% under the legal authority of human public officials."
    },
    {
      title: "Continuous Drift & Label Quality Auditing",
      icon: FileCheck,
      desc: "Seasonal civic changes (e.g. monsoon flooding vs summer water rationing) cause topic distribution drift. Routine ground truth validation by field engineers prevents algorithmic obsolescence."
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-indigo-midnight/10 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-midnight/10 text-indigo-midnight">
            Governance & Ethics
          </span>
          <span className="text-xs text-indigo-midnight/60">Constitutional & Algorithmic Guardrails</span>
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-indigo-midnight mt-1">
          Responsible AI & Public Trust Framework
        </h2>
        <p className="text-sm text-indigo-midnight/70 mt-1 max-w-3xl">
          Deploying machine learning in civic infrastructure requires rigorous adherence to fairness, privacy, explainability, and unbroken human accountability.
        </p>
      </div>

      <DemoDataNotice 
        variant="card"
        customText="Ethical Governance Guidelines: Outlines the design principles and risk mitigations proposed for civic deployment under Challenge 04."
      />

      {/* Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {principles.map((p, i) => (
          <div 
            key={i}
            className="p-6 rounded-2xl bg-cream-card border border-indigo-midnight/15 shadow-soft space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-midnight/10 text-indigo-midnight flex items-center justify-center">
                <p.icon className="w-5 h-5" />
              </div>
              <h4 className="font-editorial text-base font-bold text-indigo-midnight">
                {p.title}
              </h4>
              <p className="text-xs text-indigo-midnight/75 leading-relaxed">
                {p.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-indigo-midnight/10 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CivicLens Compliance Standard</span>
            </div>
          </div>
        ))}
      </div>

      {/* Human-in-the-Loop Statement Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-cream-vanilla border border-indigo-midnight/20 text-indigo-midnight space-y-3 shadow-soft">
        <h4 className="font-editorial text-xl font-bold">
          The CivicLens Human-in-the-Loop Pledge
        </h4>
        <p className="text-xs sm:text-sm text-indigo-midnight/80 leading-relaxed max-w-4xl">
          "Artificial intelligence in public administration must never become an unchallengeable authority. Our system provides structured intelligence, keyword transparent attributions, and routing recommendations. But the final decision to deploy municipal trucks and allocate emergency municipal funds will always rest with elected and appointed public servants."
        </p>
      </div>
    </div>
  );
};
