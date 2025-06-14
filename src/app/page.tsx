'use client';

import { useState } from 'react';
import JobForm from '@/components/JobForm';
import TaskEditor from '@/components/TaskEditor';
import ResultsDisplay from '@/components/ResultsDisplay';
import { JobContext, AnalysisResult } from '@/types';

type AppState = 'form' | 'tasks' | 'results';

export default function Home() {
  const [state, setState] = useState<AppState>('form');
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [context, setContext] = useState<JobContext | null>(null);
  const [tasks, setTasks] = useState<string[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleJobSubmit = async (title: string, jobContext: JobContext) => {
    setLoading(true);
    setJobTitle(title);
    setContext(jobContext);
    
    try {
      const response = await fetch('/api/generate-tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle: title,
          context: jobContext,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate tasks');
      }

      const data = await response.json();
      setTasks(data.tasks);
      setState('tasks');
    } catch (error) {
      console.error('Error generating tasks:', error);
      alert('Failed to generate tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTasksSubmit = async () => {
    if (!context) return;
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle,
          context,
          tasks,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze job');
      }

      const data = await response.json();
      setResult(data);
      setState('results');
    } catch (error) {
      console.error('Error analyzing job:', error);
      alert('Failed to analyze job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setState('form');
    setJobTitle('');
    setContext(null);
    setTasks([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {state === 'form' && (
        <JobForm onSubmit={handleJobSubmit} loading={loading} />
      )}
      
      {state === 'tasks' && (
        <TaskEditor
          tasks={tasks}
          onTasksChange={setTasks}
          onProceed={handleTasksSubmit}
          loading={loading}
        />
      )}
      
      {state === 'results' && result && (
        <ResultsDisplay result={result} onReset={handleReset} />
      )}
    </div>
  );
}
