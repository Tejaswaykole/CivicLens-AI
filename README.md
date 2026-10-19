# CivicLens AI — Explainable Public Grievance Intelligence

> **Hackathon Challenge 04:** *Explain Which Public Complaint Needs Priority*  
> **Repository:** [https://github.com/Tejaswaykole/CivicLens-AI](https://github.com/Tejaswaykole/CivicLens-AI)

---

## 🌟 Executive Summary

When municipal authorities receive hundreds of citizen grievances daily, finite engineering crews and emergency funds cannot resolve everything at once. Traditional FIFO (first-in, first-out) queues frequently prioritize cosmetic issues over severe physical safety hazards, while opaque "black-box" machine learning models alienate public officials who cannot justify why a case was escalated.

**CivicLens AI** bridges this critical gap. It is an explainable decision-intelligence platform that:
1. **Classifies** unstructured citizen grievances into municipal categories (PWD, Drainage, Water Board, Electrical, Solid Waste).
2. **Predicts urgency priority** (High, Medium, Low) calibrated to penalize false-negative safety risks.
3. **Explains every decision** using local and global feature attribution (LIME and SHAP concepts) so officials see the exact linguistic tokens driving the prediction.
4. **Preserves human authority** through a dedicated Human-in-the-Loop review and override interface.

---

## 🎬 60-Second Cinematic Story Experience (`/`)

The application opens with a synchronized 60-second, 7-scene narrative built specifically for video recordings and hackathon jury demonstrations:

- **Scene 1 (0–7s) — The Hook:** *"Every complaint matters. But when many problems demand attention, which one should come first?"*
- **Scene 2 (7–15s) — The Problem:** Demonstrates conflicting citizen reports (potholes near schools vs. broken streetlights vs. choked drainage).
- **Scene 3 (15–23s) — Meet CivicLens AI:** Introduction of the platform and the editorial cream-and-indigo aesthetic.
- **Scene 4 (23–32s) — AI Analysis:** Sequential intake and algorithmic triage of a critical road defect.
- **Scene 5 (32–42s) — Explainable AI:** Local SHAP/LIME token weight breakdown (e.g., `+0.46` for *"school entrance"*).
- **Scene 6 (42–52s) — Explore the App:** Rapid interactive preview of the Complaint Analyzer, Simulator, and Benchmarking suite.
- **Scene 7 (52–60s) — Closing & CTA:** Final brand vision and smooth transition into the live Dashboard.

*Controls include Play/Pause, Replay, Subtitle transcripts, Native Speech Synthesis (no fake audio), and a persistent "Skip to Dashboard" button.*

---

## 🧭 Application Modules & Route Architecture

| Route | View | Description & Capabilities |
| :--- | :--- | :--- |
| **`/`** | **Cinematic Story** | 60-second video walkthrough with live scene scrubbing, transcripts, and voiceover. |
| **`/app`** | **Operational Dashboard** | 4 key performance metrics, Recharts category and priority breakdowns, recent intake table, and the *CivicLens Predict* teaser. |
| **`/app/analyze`** | **Complaint Analyzer** | Live interactive text input, character counter, quick-load municipal scenarios, instant heuristic analysis, and embedded explanation chart. |
| **`/app/explainability`**| **Explainable AI Suite** | 4-tab auditing suite: (1) Local LIME/SHAP attribution bar charts, (2) Global feature importance, (3) What-If Simulator, (4) Interpretability methodology & scientific limits. |
| **`/app/complaints`** | **Grievance Registry** | Master-detail inspection of historical complaints with live search and multi-factor filters (Category, Priority, Department). |
| **`/app/analytics`** | **Analytics & Benchmarks**| Weekly volume trends, departmental turnaround times, and benchmark evaluation metrics (Precision 86.1%, Recall 85.8%, F1 85.9%, High-Priority Recall 93.2%, and 3x3 confusion matrix). |
| **`/app/model`** | **Model Architecture** | Technical blueprint of the 5-stage NLP pipeline (Tokenization &rarr; TF-IDF &rarr; Calibrated Linear Classifier &rarr; LIME/SHAP &rarr; Human Review). |
| **`/app/responsible-ai`**| **Responsible AI** | 6 civic governance principles: PII sanitization, demographic equity, false-low risk prevention, right to explanation, and human accountability. |
| **`/app/predict`** | **CivicLens Predict** | Conceptual roadmap detailing Recurring Issue Intelligence, Emerging Trend Detection, and Geographic Pattern Analysis. |

---

## 🔬 Core Innovations

### 1. What-If Priority Simulator (`/app/explainability`)
Allows officials and judges to test sensitivity by comparing an original grievance with an editable modified version side-by-side (e.g., comparing *"school entrance + swerving vehicles"* with *"quiet residential dead-end"*) to observe real-time priority and feature attribution shifts.

### 2. Human-in-the-Loop Review Panel (`/app/analyze`)
Enforces that AI never acts on unchallengeable autopilot. Municipal officers can:
- Accept AI priority designations.
- Override urgency from High &rarr; Medium &rarr; Low with custom operational rationale.
- Escalate complaints for physical field audit.

### 3. Asymmetric Error Philosophy
In public safety, a **False High** incurs an unnecessary inspection fee, but a **False Low** (ignoring an unshielded live wire because of gentle citizen phrasing) can cause loss of life. CivicLens AI's classification architecture is intentionally weighted to maximize High-Priority Recall (93.2%).

---

## 🎨 Design System

Carefully tailored to look editorial, trustworthy, and cinematic:
- **Midnight Indigo (`#282B4A`)**: Primary cinematic tone, navigation headers, and authority accents.
- **Warm Cream (`#FFF3E6`)**: Dominant application canvas, eliminating cold generic white for an inviting, warm civic tone.
- **Vanilla (`#EEEBDA`)**: Soft border accents and transcript pills.
- **Plum (`#381932`)**: Primary interactive button accents and selected state highlights.
- **Typography**: Paired Google Fonts — **Lora** (editorial serif headings) and **Plus Jakarta Sans** (clean, accessible UI body).

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **Routing:** React Router v7
- **Charts:** Recharts
- **Icons:** Lucide React
- **Voiceover:** Native Browser Web Speech Synthesis API

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/Tejaswaykole/CivicLens-AI.git

# 2. Enter project folder
cd CivicLens-AI

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
```

---

## ⚖️ Demonstration Scope & Disclaimer

> **INTERACTIVE PROTOTYPE — DEMONSTRATION RESULTS, NOT LIVE MODEL PREDICTIONS**  
> This frontend is developed as a hackathon submission for **Challenge 04: Explain Which Public Complaint Needs Priority**. All classifications, priority predictions, SHAP attribution weights, and evaluation metrics are illustrative demonstration outputs powered by local deterministic heuristics. No backend server, live database, authentication layer, or proprietary weights are connected.
