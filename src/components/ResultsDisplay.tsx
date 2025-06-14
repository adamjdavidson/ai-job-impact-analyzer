'use client';

import { AnalysisResult } from '@/types';
import { 
  TrendingUp, 
  Users, 
  Brain, 
  User, 
  Zap, 
  Clock, 
  Target, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle, 
  Calendar,
  Award,
  BarChart3,
  ArrowRight
} from 'lucide-react';

interface ResultsDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function ResultsDisplay({ result, onReset }: ResultsDisplayProps) {
  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'AI-led':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Human-AI':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Human-only':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'AI-led':
        return <Brain size={16} />;
      case 'Human-AI':
        return <Zap size={16} />;
      case 'Human-only':
        return <User size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Executive Summary Header */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-3" style={{ color: '#1F3A5C' }}>
              {result.job_title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">AI Impact Analysis & Strategic Recommendations</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <span className="flex items-center"><Users size={16} className="mr-1" />{result.context.companySize}</span>
              <span>•</span>
              <span>{result.context.departmentSize}</span>
              <span>•</span>
              <span>{result.context.industry}</span>
              <span>•</span>
              <span className="capitalize">{result.context.perspective} Perspective</span>
            </div>
          </div>
          <button
            onClick={onReset}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 font-medium"
          >
            New Analysis
          </button>
        </div>

        {/* Executive Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="text-green-600" size={28} />
              <div>
                <h3 className="text-lg font-bold text-green-800">Value Impact</h3>
                <div className="text-3xl font-bold text-green-600">
                  {result.insights.value_impact.change}
                </div>
              </div>
            </div>
            <p className="text-green-700 text-sm font-medium">
              {result.insights.value_impact.description}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="text-blue-600" size={28} />
              <div>
                <h3 className="text-lg font-bold text-blue-800">Demand Impact</h3>
                <div className="text-3xl font-bold text-blue-600">
                  {result.insights.demand_impact.change}
                </div>
              </div>
            </div>
            <p className="text-blue-700 text-sm font-medium">
              {result.insights.demand_impact.description}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
            <div className="flex items-center space-x-3 mb-3">
              <BarChart3 className="text-purple-600" size={28} />
              <div>
                <h3 className="text-lg font-bold text-purple-800">Tasks Analyzed</h3>
                <div className="text-3xl font-bold text-purple-600">
                  {result.tasks.length}
                </div>
              </div>
            </div>
            <p className="text-purple-700 text-sm font-medium">
              Comprehensive Analysis
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
            <div className="flex items-center space-x-3 mb-3">
              <Award className="text-amber-600" size={28} />
              <div>
                <h3 className="text-lg font-bold text-amber-800">AI Readiness</h3>
                <div className="text-3xl font-bold text-amber-600">
                  High
                </div>
              </div>
            </div>
            <p className="text-amber-700 text-sm font-medium">
              Strategic Transformation
            </p>
          </div>
        </div>
      </div>

      {/* Future Role Evolution */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#1F3A5C' }}>
          <Calendar className="inline mr-3" size={32} />
          Future Role Evolution
        </h2>
        <div className="bg-blue-50 border-l-4 p-6 rounded-r-lg mb-6" style={{ borderLeftColor: '#1F3A5C' }}>
          <p className="text-gray-700 leading-relaxed text-lg">{result.insights.future_role}</p>
        </div>
        
        {result.insights.timeline_analysis && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
              <h3 className="text-lg font-bold text-gray-800 mb-3">2024 - Current State</h3>
              <p className="text-gray-700">{result.insights.timeline_analysis['2024']}</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
              <h3 className="text-lg font-bold text-blue-800 mb-3">2025 - Near-term Changes</h3>
              <p className="text-gray-700">{result.insights.timeline_analysis['2025']}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
              <h3 className="text-lg font-bold text-green-800 mb-3">2027 - Transformation</h3>
              <p className="text-gray-700">{result.insights.timeline_analysis['2027']}</p>
            </div>
          </div>
        )}
      </div>

      {/* Skill Development Analysis */}
      {result.insights.skill_development && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#1F3A5C' }}>
            <Target className="inline mr-3" size={32} />
            Skill Development Strategy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <CheckCircle className="mr-2" size={20} />
                Critical Skills
              </h3>
              <ul className="space-y-2">
                {result.insights.skill_development.critical_skills.map((skill, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <Lightbulb className="mr-2" size={20} />
                New Skills Needed
              </h3>
              <ul className="space-y-2">
                {result.insights.skill_development.new_skills.map((skill, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                Declining Skills
              </h3>
              <ul className="space-y-2">
                {result.insights.skill_development.obsolete_skills.map((skill, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Competitive Advantage Analysis */}
      {result.insights.competitive_advantage && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#1F3A5C' }}>
            <Award className="inline mr-3" size={32} />
            Competitive Advantage Analysis
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1F3A5C' }}>Strategic Differentiation</h3>
            <p className="text-gray-700 leading-relaxed">{result.insights.competitive_advantage.differentiation}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <Lightbulb className="mr-2" size={20} />
                Opportunity Areas
              </h3>
              <ul className="space-y-2">
                {result.insights.competitive_advantage.opportunity_areas.map((opportunity, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    {opportunity}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                Risk Factors
              </h3>
              <ul className="space-y-2">
                {result.insights.competitive_advantage.risk_factors.map((risk, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Task Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#1F3A5C' }}>
          <BarChart3 className="inline mr-3" size={32} />
          Detailed Task Analysis
        </h2>
        <div className="space-y-6">
          {result.tasks.map((task, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{task.name}</h3>
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {task.category}
                  </span>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold border ${getClassificationColor(task.classification)}`}>
                    {getClassificationIcon(task.classification)}
                    <span>{task.classification}</span>
                  </span>
                  <span className="text-sm font-medium" style={{ color: '#EFA14C' }}>
                    {task.confidence} Confidence
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{task.scores.technical}</div>
                  <div className="text-sm font-medium text-blue-800">Technical Feasibility</div>
                  <div className="text-xs text-blue-600 mt-1">/10</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-1">{task.scores.economic}</div>
                  <div className="text-sm font-medium text-green-800">Economic Efficiency</div>
                  <div className="text-xs text-green-600 mt-1">/10</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center border border-purple-200">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{task.scores.strategic}</div>
                  <div className="text-sm font-medium text-purple-800">Strategic Human Value</div>
                  <div className="text-xs text-purple-600 mt-1">/10</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderLeftColor: '#1F3A5C' }}>
                <h4 className="font-semibold text-gray-800 mb-2">Analysis Reasoning</h4>
                <p className="text-gray-700 leading-relaxed">{task.reasoning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Category Breakdown */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#1F3A5C' }}>
          <Target className="inline mr-3" size={32} />
          Task Impact Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              <TrendingUp className="mr-2" size={24} />
              High-Value Tasks
            </h3>
            <p className="text-sm text-green-700 mb-4">Tasks that become MORE valuable with AI integration</p>
            <ul className="space-y-3">
              {result.insights.high_value_tasks.map((task, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="text-green-500 mr-2 mt-1 font-bold">↗</span>
                  <span className="text-sm">{task}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
              <Brain className="mr-2" size={24} />
              AI-Handled Tasks
            </h3>
            <p className="text-sm text-red-700 mb-4">Tasks that AI will primarily manage</p>
            <ul className="space-y-3">
              {result.insights.ai_handled_tasks.map((task, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="text-red-500 mr-2 mt-1 font-bold">⚡</span>
                  <span className="text-sm">{task}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
              <Zap className="mr-2" size={24} />
              Collaboration Tasks
            </h3>
            <p className="text-sm text-amber-700 mb-4">Optimal human-AI partnership opportunities</p>
            <ul className="space-y-3">
              {result.insights.collaboration_tasks.map((task, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="mr-2 mt-1 font-bold" style={{ color: '#EFA14C' }}>🤝</span>
                  <span className="text-sm">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Strategy */}
      {result.insights.implementation_strategy && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#1F3A5C' }}>
            <Clock className="inline mr-3" size={32} />
            Implementation Roadmap
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <ArrowRight className="mr-2" size={20} />
                Next 90 Days
              </h3>
              <ul className="space-y-3">
                {result.insights.implementation_strategy.immediate_actions.map((action, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <Calendar className="mr-2" size={20} />
                6-12 Months
              </h3>
              <ul className="space-y-3">
                {result.insights.implementation_strategy.medium_term_plan.map((action, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                <BarChart3 className="mr-2" size={20} />
                Success Metrics
              </h3>
              <ul className="space-y-3">
                {result.insights.implementation_strategy.success_metrics.map((metric, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5 font-bold">
                      📊
                    </span>
                    <span className="text-sm">{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Strategic Recommendations */}
      <div className="bg-gradient-to-r text-white rounded-lg shadow-lg p-8" style={{ background: 'linear-gradient(135deg, #1F3A5C 0%, #2C5282 100%)' }}>
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Lightbulb className="mr-3" size={32} />
          Executive Action Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Strategic Recommendations</h3>
            <ul className="space-y-4">
              {result.insights.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span 
                    className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-4 mt-0.5 font-bold"
                    style={{ backgroundColor: '#EFA14C' }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-blue-100 leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-blue-800 bg-opacity-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Key Insights</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <TrendingUp className="mr-3 mt-1" size={20} style={{ color: '#EFA14C' }} />
                <div>
                  <p className="font-semibold">Value Creation</p>
                  <p className="text-blue-200 text-sm">{result.insights.value_impact.explanation}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="mr-3 mt-1" size={20} style={{ color: '#EFA14C' }} />
                <div>
                  <p className="font-semibold">Workforce Impact</p>
                  <p className="text-blue-200 text-sm">{result.insights.demand_impact.explanation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}