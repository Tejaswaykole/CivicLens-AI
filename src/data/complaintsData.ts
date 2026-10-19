import { ComplaintRecord } from '../types';

export const SAMPLE_COMPLAINTS: ComplaintRecord[] = [
  {
    id: "CIV-2024-0891",
    title: "Large pothole near school entrance",
    description: "A large pothole has developed near a school entrance on 4th Main Road. Vehicles and school buses are swerving abruptly to avoid it, creating a severe safety risk during morning drop-off hours.",
    category: "Roads & Infrastructure",
    predictedPriority: "High",
    recommendedDepartment: "Public Works Department (PWD)",
    confidenceScore: 92,
    reviewStatus: "Pending Review",
    dateReported: "2026-10-18 08:30 AM",
    location: "4th Main Road, Sector 3 (Near St. Jude Academy)",
    coordinates: { x: 38, y: 44 },
    severityAssessment: "High physical hazard identified due to proximity to active pedestrian school zone and moving vehicular traffic.",
    features: [
      { feature: "school entrance", contribution: 0.46, direction: "positive", description: "Proximity to vulnerable pedestrian crowd significantly amplifies risk score" },
      { feature: "pothole", contribution: 0.32, direction: "positive", description: "Core structural road failure indicator" },
      { feature: "swerving / safety risk", contribution: 0.28, direction: "positive", description: "Immediate accident hazard keyword token match" },
      { feature: "vehicles / buses", contribution: 0.18, direction: "positive", description: "High-density vehicle volume interaction" },
      { feature: "morning drop-off", contribution: 0.12, direction: "positive", description: "Peak operational hours exposure factor" }
    ]
  },
  {
    id: "CIV-2024-0892",
    title: "Irregular and contaminated water supply",
    description: "Low water pressure and muddy water supply reported across block C since Thursday. Residents have no potable drinking water for the past 48 hours.",
    category: "Water Supply",
    predictedPriority: "High",
    recommendedDepartment: "Municipal Water Board",
    confidenceScore: 89,
    reviewStatus: "Accepted",
    reviewerPriority: "High",
    reviewerNotes: "Confirmed with ward engineer. Contamination risk requires urgent pipeline inspection.",
    dateReported: "2026-10-17 06:15 PM",
    location: "Sector 7, Block C Residential Complex",
    coordinates: { x: 62, y: 32 },
    severityAssessment: "Public health concern impacting essential human sustenance and disease prevention.",
    features: [
      { feature: "no potable drinking water", contribution: 0.44, direction: "positive", description: "Deprivation of essential public utility" },
      { feature: "muddy / contaminated", contribution: 0.38, direction: "positive", description: "Waterborne illness hazard trigger" },
      { feature: "48 hours duration", contribution: 0.25, direction: "positive", description: "Prolonged outage escalation factor" },
      { feature: "block C residents", contribution: 0.15, direction: "positive", description: "Multi-household community scale impact" }
    ]
  },
  {
    id: "CIV-2024-0893",
    title: "Streetlight not working on residential lane",
    description: "Streetlight pole #14 has been non-functional for 3 days. The lane is quite dim at night, though neighboring house porch lights provide partial visibility.",
    category: "Electrical & Lighting",
    predictedPriority: "Low",
    recommendedDepartment: "Power Distribution & Lighting",
    confidenceScore: 78,
    reviewStatus: "Pending Review",
    dateReported: "2026-10-18 10:45 AM",
    location: "12th Cross, Greenview Enclave",
    coordinates: { x: 25, y: 65 },
    severityAssessment: "Minor civic inconvenience with low immediate physical danger.",
    features: [
      { feature: "single pole (#14)", contribution: -0.32, direction: "negative", description: "Localized isolated failure rather than grid blackout" },
      { feature: "partial visibility", contribution: -0.28, direction: "negative", description: "Mitigating lighting context diminishes severity" },
      { feature: "non-functional 3 days", contribution: 0.18, direction: "positive", description: "SLA escalation indicator" },
      { feature: "dim at night", contribution: 0.14, direction: "positive", description: "Pedestrian comfort parameter" }
    ]
  },
  {
    id: "CIV-2024-0894",
    title: "Overflowing drainage causing backflow",
    description: "Monsoon drain is choked with silt and overflowing onto the main market pedestrian walkway. Foul odor and stagnant wastewater creating disease vector.",
    category: "Sanitation & Drainage",
    predictedPriority: "High",
    recommendedDepartment: "Drainage & Sewerage Authority",
    confidenceScore: 91,
    reviewStatus: "Pending Review",
    dateReported: "2026-10-18 01:20 PM",
    location: "Central Market Complex, North Gate",
    coordinates: { x: 52, y: 72 },
    severityAssessment: "High biological hazard with heavy foot traffic pedestrian exposure.",
    features: [
      { feature: "market walkway", contribution: 0.40, direction: "positive", description: "High pedestrian density exposure" },
      { feature: "wastewater / backflow", contribution: 0.35, direction: "positive", description: "Sanitary health risk indicator" },
      { feature: "disease vector / foul odor", contribution: 0.29, direction: "positive", description: "Pathogen risk keyword attribution" },
      { feature: "choked silt", contribution: 0.16, direction: "positive", description: "Structural blockage factor" }
    ]
  },
  {
    id: "CIV-2024-0895",
    title: "Garbage accumulation at street corner bin",
    description: "Secondary collection bin overflowing for 24 hours. Stray animals scattering plastic bags across the sidewalk. Regular morning truck missed its pickup.",
    category: "Solid Waste Management",
    predictedPriority: "Medium",
    recommendedDepartment: "Municipal Solid Waste Management",
    confidenceScore: 84,
    reviewStatus: "Pending Review",
    dateReported: "2026-10-18 03:00 PM",
    location: "Corner of 5th Ave and Oak St",
    coordinates: { x: 74, y: 58 },
    severityAssessment: "Moderate environmental sanitation concern manageable within routine 24h remediation schedule.",
    features: [
      { feature: "overflowing 24 hours", contribution: 0.28, direction: "positive", description: "Moderate SLA delay attribution" },
      { feature: "stray animals / plastic", contribution: 0.22, direction: "positive", description: "Secondary public hygiene impact" },
      { feature: "street corner bin", contribution: -0.15, direction: "negative", description: "Designated waste point, not illegal general dumping ground" },
      { feature: "missed truck pickup", contribution: 0.14, direction: "positive", description: "Route operational miss" }
    ]
  },
  {
    id: "CIV-2024-0896",
    title: "Fallen tree branch blocking bicycle lane",
    description: "Medium-sized tree branch broke off after overnight winds. Restricting dedicated bike track, cyclists having to dismount to pass.",
    category: "Roads & Infrastructure",
    predictedPriority: "Medium",
    recommendedDepartment: "Public Works Department (PWD)",
    confidenceScore: 82,
    reviewStatus: "Accepted",
    reviewerPriority: "Medium",
    dateReported: "2026-10-18 09:10 AM",
    location: "Lakeside Boulevard Bicycle Corridor",
    coordinates: { x: 20, y: 25 },
    severityAssessment: "Localized transit obstruction without severe road artery cutoff.",
    features: [
      { feature: "blocking bike lane", contribution: 0.31, direction: "positive", description: "Mobility obstruction signal" },
      { feature: "cyclists dismount", contribution: -0.21, direction: "negative", description: "Non-critical passability maintained at reduced speed" },
      { feature: "tree branch", contribution: 0.18, direction: "positive", description: "Debris clearance needed" }
    ]
  },
  {
    id: "CIV-2024-0897",
    title: "Loose electrical wiring near public park bench",
    description: "Exposed live wire hanging from outdoor junction box right next to children's play area bench. Exposed copper visible.",
    category: "Electrical & Lighting",
    predictedPriority: "High",
    recommendedDepartment: "Power Distribution & Lighting",
    confidenceScore: 95,
    reviewStatus: "Pending Review",
    dateReported: "2026-10-18 04:45 PM",
    location: "Peace Memorial Park (Children Playzone)",
    coordinates: { x: 45, y: 20 },
    severityAssessment: "Critical immediate electrocution hazard in immediate proximity to children.",
    features: [
      { feature: "children play area", contribution: 0.52, direction: "positive", description: "Extreme vulnerability multiplier" },
      { feature: "exposed live wire", contribution: 0.48, direction: "positive", description: "Direct fatal shock hazard keyword" },
      { feature: "loose wiring / copper", contribution: 0.31, direction: "positive", description: "Unshielded electrical defect confirmation" }
    ]
  },
  {
    id: "CIV-2024-0898",
    title: "Missing manhole cover on unlit side alley",
    description: "Cast iron storm drain cover missing, leaving 6-foot deep shaft completely open on dark pathway used by night workers.",
    category: "Sanitation & Drainage",
    predictedPriority: "High",
    recommendedDepartment: "Drainage & Sewerage Authority",
    confidenceScore: 96,
    reviewStatus: "Accepted",
    reviewerPriority: "High",
    reviewerNotes: "Urgent barricading dispatched immediately to prevent pedestrian fall.",
    dateReported: "2026-10-18 07:05 PM",
    location: "Industrial Sector Alleyway #3",
    coordinates: { x: 80, y: 28 },
    severityAssessment: "Extreme fall hazard with life-threatening depth in zero-light zone.",
    features: [
      { feature: "missing manhole cover", contribution: 0.55, direction: "positive", description: "Critical urban safety catastrophe trigger" },
      { feature: "6-foot deep open shaft", contribution: 0.42, direction: "positive", description: "Severe trauma injury potential" },
      { feature: "unlit side alley", contribution: 0.36, direction: "positive", description: "Zero visibility amplifies accident inevitability" }
    ]
  }
];

export const CATEGORY_DISTRIBUTION = [
  { name: 'Roads & Infrastructure', count: 48, percentage: 32, color: '#3A3E66' },
  { name: 'Sanitation & Drainage', count: 36, percentage: 24, color: '#381932' },
  { name: 'Water Supply', count: 28, percentage: 19, color: '#2563EB' },
  { name: 'Electrical & Lighting', count: 22, percentage: 15, color: '#D97706' },
  { name: 'Solid Waste Management', count: 16, percentage: 10, color: '#059669' }
];

export const PRIORITY_DISTRIBUTION = [
  { name: 'High Priority', count: 52, percentage: 35, color: '#DC2626' },
  { name: 'Medium Priority', count: 64, percentage: 43, color: '#D97706' },
  { name: 'Low Priority', count: 34, percentage: 22, color: '#2563EB' }
];

export const DEPARTMENT_DISTRIBUTION = [
  { department: 'Public Works Dept (PWD)', count: 46, avgResolutionTime: '2.4 days' },
  { department: 'Drainage & Sewerage', count: 38, avgResolutionTime: '1.8 days' },
  { department: 'Water Supply Board', count: 29, avgResolutionTime: '1.2 days' },
  { department: 'Power & Streetlights', count: 22, avgResolutionTime: '2.1 days' },
  { department: 'Solid Waste Management', count: 15, avgResolutionTime: '0.8 days' }
];

export const GLOBAL_FEATURE_IMPORTANCE = [
  { feature: 'school / hospital proximity', importance: 0.88, category: 'Context Multiplier' },
  { feature: 'exposed wire / electrocution', importance: 0.84, category: 'Direct Hazard' },
  { feature: 'open manhole / deep shaft', importance: 0.82, category: 'Direct Hazard' },
  { feature: 'drinking water contamination', importance: 0.79, category: 'Public Health' },
  { feature: 'swerving vehicles / main arterial', importance: 0.71, category: 'Transit Safety' },
  { feature: 'overflowing sewage / backflow', importance: 0.68, category: 'Sanitation Hazard' },
  { feature: 'prolonged outage (>48h)', importance: 0.58, category: 'SLA Escalation' },
  { feature: 'single bin / cosmetic litter', importance: -0.42, category: 'Low Urgency' },
  { feature: 'decorative park light', importance: -0.48, category: 'Low Urgency' },
  { feature: 'partial visibility maintained', importance: -0.52, category: 'Mitigating Factor' }
];

export const MODEL_EVALUATION_METRICS = {
  accuracy: "87.4%",
  macroPrecision: "86.1%",
  macroRecall: "85.8%",
  macroF1: "85.9%",
  highPriorityRecall: "93.2%", // Crucial so urgent cases are rarely missed
  highPriorityPrecision: "88.6%",
  confusionMatrix: [
    { actual: 'High', predHigh: 42, predMedium: 3, predLow: 1 },
    { actual: 'Medium', predHigh: 5, predMedium: 51, predLow: 4 },
    { actual: 'Low', predHigh: 1, predMedium: 5, predLow: 38 }
  ],
  falseHighCases: "5 cases (Over-triaged precautionary safety)",
  falseLowCases: "1 case (Mitigated context word misled classifier)"
};

export const PROPOSED_PIPELINE = [
  {
    step: 1,
    title: "1. Text Preprocessing",
    tool: "Regex, NLTK / spaCy tokenization",
    description: "Cleans complaint text, removes stop words while preserving negation ('not working'), handles multilingual transliteration and extracts core tokens."
  },
  {
    step: 2,
    title: "2. Feature Extraction",
    tool: "TF-IDF (1-3 N-grams) & Domain Embeddings",
    description: "Transforms text into sparse numerical vectors weighting critical municipal safety terms (e.g., 'school entrance', 'exposed wire', 'hospital route') higher."
  },
  {
    step: 3,
    title: "3. Classification Engine",
    tool: "Linear SVM / Calibrated Logistic Regression",
    description: "Evaluates token probabilities for dual classification: Category assignment (6 classes) and Urgency Priority level (High, Medium, Low)."
  },
  {
    step: 4,
    title: "4. Explainable AI Layer",
    tool: "LIME & SHAP Attribution",
    description: "Generates local token attribution scores showing the official exactly which words drove the priority score up or down."
  },
  {
    step: 5,
    title: "5. Department Routing & Human Loop",
    tool: "Routing Matrix & Review Interface",
    description: "Recommends responsible municipal department and queues the case with transparent rationale for human official sign-off."
  }
];

export const DEMO_PREDICT_HOTSPOTS = [
  {
    ward: "Ward 14 - Industrial Corridor",
    clusterIssue: "Recurring Drainage Choke on 8th Cross",
    predictiveSignal: "Heavy monsoon forecast + 4 pre-choke complaints in 10 days",
    proactiveAction: "Schedule pre-emptive suction desilting truck before weekend rain",
    confidence: "88% recurring risk"
  },
  {
    ward: "Ward 22 - Metro Sub-station",
    clusterIssue: "Transformer Low-Voltage Fluctuation",
    predictiveSignal: "Three commercial street power drops during 6-8 PM peak",
    proactiveAction: "Inspect phase balancing to avoid transformer burnout",
    confidence: "79% risk"
  },
  {
    ward: "Ward 09 - School District",
    clusterIssue: "Pavement Breakdown Post Utility Digging",
    predictiveSignal: "Multiple water pipeline excavations reported finished without top asphalt repaving",
    proactiveAction: "Issue joint notice to PWD road patching team before Monday school traffic",
    confidence: "91% risk"
  }
];
