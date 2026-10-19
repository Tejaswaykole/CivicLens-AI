export interface FeatureContribution {
  feature: string;
  contribution: number; // e.g. +0.42 or -0.15
  direction: 'positive' | 'negative';
  description: string;
}

export interface ComplaintRecord {
  id: string;
  title: string;
  description: string;
  category: 'Roads & Infrastructure' | 'Water Supply' | 'Electrical & Lighting' | 'Sanitation & Drainage' | 'Solid Waste Management' | 'Public Health';
  predictedPriority: 'High' | 'Medium' | 'Low';
  recommendedDepartment: 'Public Works Department (PWD)' | 'Municipal Water Board' | 'Power Distribution & Lighting' | 'Drainage & Sewerage Authority' | 'Municipal Solid Waste Management' | 'Urban Health Department';
  confidenceScore: number; // 0 - 100 illustrative confidence
  reviewStatus: 'Pending Review' | 'Accepted' | 'Priority Modified' | 'Further Review Requested';
  reviewerPriority?: 'High' | 'Medium' | 'Low';
  reviewerNotes?: string;
  dateReported: string;
  location: string;
  coordinates: { x: number; y: number }; // percentage on map
  features: FeatureContribution[];
  severityAssessment: string;
}

export interface MetricSummary {
  totalAnalyzed: number;
  highPriorityCount: number;
  categoriesCount: number;
  modelStatus: string;
  avgResponseTarget: string;
}

export interface PipelineStage {
  id: string;
  stepNumber: number;
  name: string;
  description: string;
  techStack: string;
  details: string[];
}
