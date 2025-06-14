export interface JobContext {
  companySize: 'Fortune 50' | 'Fortune 100' | 'Fortune 500';
  departmentSize: 'Large (100+ people)' | 'Medium (20-99 people)' | 'Small (1-19 people)';
  industry: string;
  perspective: 'personal' | 'organizational';
}

export interface Task {
  name: string;
  category: string;
  classification: 'AI-led' | 'Human-AI' | 'Human-only';
  confidence: 'High' | 'Medium' | 'Low';
  scores: {
    technical: number;
    economic: number;
    strategic: number;
  };
  reasoning: string;
}

export interface Insights {
  value_impact: {
    change: string;
    description: string;
    explanation: string;
  };
  demand_impact: {
    change: string;
    description: string;
    explanation: string;
  };
  future_role: string;
  high_value_tasks: string[];
  ai_handled_tasks: string[];
  collaboration_tasks: string[];
  recommendations: string[];
  timeline_analysis: {
    '2024': string;
    '2025': string;
    '2027': string;
  };
  skill_development: {
    critical_skills: string[];
    obsolete_skills: string[];
    new_skills: string[];
  };
  competitive_advantage: {
    differentiation: string;
    risk_factors: string[];
    opportunity_areas: string[];
  };
  implementation_strategy: {
    immediate_actions: string[];
    medium_term_plan: string[];
    success_metrics: string[];
  };
}

export interface AnalysisResult {
  job_title: string;
  context: JobContext;
  tasks: Task[];
  insights: Insights;
}