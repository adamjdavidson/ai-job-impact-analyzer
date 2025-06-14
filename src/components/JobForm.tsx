'use client';

import { useState } from 'react';
import { JobContext } from '@/types';
import { commonJobs } from '@/data/jobs';
import { Search } from 'lucide-react';

interface JobFormProps {
  onSubmit: (jobTitle: string, context: JobContext) => void;
  loading: boolean;
}

export default function JobForm({ onSubmit, loading }: JobFormProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [customJob, setCustomJob] = useState('');
  const [useCustomJob, setUseCustomJob] = useState(false);
  const [context, setContext] = useState<JobContext>({
    companySize: 'Fortune 100',
    departmentSize: 'Medium (20-99 people)',
    industry: '',
    perspective: 'organizational'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedJob = useCustomJob ? customJob.trim() : jobTitle;
    if (selectedJob && context.industry.trim()) {
      onSubmit(selectedJob, context);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#1F3A5C' }}>
          AI Job Impact Analyzer
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Strategic Workforce Analysis for Fortune 100 Executives
        </p>
        <div className="bg-blue-50 border-l-4 p-4 rounded-r-lg" style={{ borderLeftColor: '#1F3A5C' }}>
          <p className="text-gray-700 leading-relaxed">
            This tool provides evidence-based analysis of how AI will transform specific job roles in your organization. 
            Based on academic research from leading economists, it evaluates tasks across three dimensions: technical feasibility, 
            economic efficiency, and strategic human value. You&apos;ll receive actionable insights for workforce planning and strategic decision-making.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1F3A5C' }}>
            Step 1: Select Job Role
          </h2>
          <p className="text-gray-600 mb-4">
            Choose the job role you want to analyze. Select from common Fortune 100 roles or specify a custom role.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-3 mb-3">
                <input
                  type="radio"
                  name="jobType"
                  checked={!useCustomJob}
                  onChange={() => setUseCustomJob(false)}
                  className="w-4 h-4"
                  style={{ accentColor: '#1F3A5C' }}
                />
                <span className="font-medium text-gray-700">Select from common roles</span>
              </label>
              {!useCustomJob && (
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <select
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-gray-700"
                    required={!useCustomJob}
                  >
                    <option value="">Select a job role...</option>
                    {commonJobs.map((job) => (
                      <option key={job} value={job}>{job}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-3 mb-3">
                <input
                  type="radio"
                  name="jobType"
                  checked={useCustomJob}
                  onChange={() => setUseCustomJob(true)}
                  className="w-4 h-4"
                  style={{ accentColor: '#1F3A5C' }}
                />
                <span className="font-medium text-gray-700">Enter custom job title</span>
              </label>
              {useCustomJob && (
                <input
                  type="text"
                  value={customJob}
                  onChange={(e) => setCustomJob(e.target.value)}
                  placeholder="e.g., Senior Director of Digital Transformation"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  required={useCustomJob}
                />
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1F3A5C' }}>
            Step 2: Organizational Context
          </h2>
          <p className="text-gray-600 mb-6">
            Provide context about your organization. This affects how AI will be deployed and the strategic considerations for the role.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <select
                id="companySize"
                value={context.companySize}
                onChange={(e) => setContext({...context, companySize: e.target.value as JobContext['companySize']})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500"
              >
                <option value="Fortune 50">Fortune 50 (Largest corporations)</option>
                <option value="Fortune 100">Fortune 100 (Major corporations)</option>
                <option value="Fortune 500">Fortune 500 (Large corporations)</option>
              </select>
            </div>

            <div>
              <label htmlFor="departmentSize" className="block text-sm font-medium text-gray-700 mb-2">
                Department Size
              </label>
              <select
                id="departmentSize"
                value={context.departmentSize}
                onChange={(e) => setContext({...context, departmentSize: e.target.value as JobContext['departmentSize']})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500"
              >
                <option value="Small (1-19 people)">Small (1-19 people)</option>
                <option value="Medium (20-99 people)">Medium (20-99 people)</option>
                <option value="Large (100+ people)">Large (100+ people)</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <input
              type="text"
              id="industry"
              value={context.industry}
              onChange={(e) => setContext({...context, industry: e.target.value})}
              placeholder="e.g., Technology, Healthcare, Financial Services, Manufacturing"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1F3A5C' }}>
            Step 3: Analysis Perspective
          </h2>
          <p className="text-gray-600 mb-4">
            Choose your analysis focus. This determines the type of insights and recommendations you&apos;ll receive.
          </p>
          
          <div className="space-y-3">
            <label className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-white transition-colors">
              <input
                type="radio"
                name="perspective"
                value="organizational"
                checked={context.perspective === 'organizational'}
                onChange={(e) => setContext({...context, perspective: e.target.value as JobContext['perspective']})}
                className="mt-1 w-4 h-4"
                style={{ accentColor: '#1F3A5C' }}
              />
              <div>
                <div className="font-medium text-gray-800">Organizational Strategy</div>
                <div className="text-sm text-gray-600">Focus on workforce planning, hiring decisions, and organizational transformation</div>
              </div>
            </label>
            <label className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-white transition-colors">
              <input
                type="radio"
                name="perspective"
                value="personal"
                checked={context.perspective === 'personal'}
                onChange={(e) => setContext({...context, perspective: e.target.value as JobContext['perspective']})}
                className="mt-1 w-4 h-4"
                style={{ accentColor: '#1F3A5C' }}
              />
              <div>
                <div className="font-medium text-gray-800">Personal Development</div>
                <div className="text-sm text-gray-600">Focus on individual skill development and career progression</div>
              </div>
            </label>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            style={{ backgroundColor: '#EFA14C' }}
          >
            {loading ? 'Generating Tasks...' : 'Generate Task Analysis →'}
          </button>
        </div>
      </form>
    </div>
  );
}