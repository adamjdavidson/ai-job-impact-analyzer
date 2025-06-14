'use client';

import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

interface TaskEditorProps {
  tasks: string[];
  onTasksChange: (tasks: string[]) => void;
  onProceed: () => void;
  loading: boolean;
}

export default function TaskEditor({ tasks, onTasksChange, onProceed, loading }: TaskEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [newTask, setNewTask] = useState('');

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(tasks[index]);
  };

  const handleSave = () => {
    if (editingIndex !== null && editValue.trim()) {
      const newTasks = [...tasks];
      newTasks[editingIndex] = editValue.trim();
      onTasksChange(newTasks);
      setEditingIndex(null);
      setEditValue('');
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const handleDelete = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    onTasksChange(newTasks);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      onTasksChange([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#1F3A5C' }}>
          Task Customization
        </h1>
        <div className="bg-blue-50 border-l-4 p-6 rounded-r-lg mb-6" style={{ borderLeftColor: '#1F3A5C' }}>
          <h2 className="text-xl font-semibold mb-3" style={{ color: '#1F3A5C' }}>
            Review and Customize Role-Specific Tasks
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We&apos;ve generated typical tasks for this role based on industry standards and organizational context. 
            Review each task carefully and customize them to match your specific organizational needs:
          </p>
          <ul className="text-gray-700 space-y-2 list-disc list-inside">
            <li><strong>Edit tasks</strong> to reflect your organization&apos;s specific responsibilities</li>
            <li><strong>Add tasks</strong> that are unique to your company or department</li>
            <li><strong>Remove tasks</strong> that don&apos;t apply to your context</li>
            <li><strong>Be specific</strong> - detailed task descriptions lead to more accurate AI impact analysis</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {tasks.map((task, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            {editingIndex === index ? (
              <div className="space-y-3">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                    style={{ backgroundColor: '#1F3A5C' }}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <p className="text-gray-800 flex-1">{task}</p>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 text-gray-500 rounded hover:bg-gray-100"
                    style={{ color: '#1F3A5C' }}
                    title="Edit task"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="p-2 text-gray-500 hover:text-red-500 rounded hover:bg-red-50"
                    title="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#1F3A5C' }}>Add Custom Task</h3>
        <div className="flex items-center space-x-4">
          <Plus size={20} style={{ color: '#EFA14C' }} />
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task specific to your organization..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button
            onClick={handleAddTask}
            className="px-6 py-3 text-white rounded-lg hover:opacity-90 font-medium"
            style={{ backgroundColor: '#EFA14C' }}
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 p-4 rounded-r-lg mb-8" style={{ borderLeftColor: '#EFA14C' }}>
        <h3 className="font-semibold mb-2" style={{ color: '#1F3A5C' }}>Ready for AI Analysis</h3>
        <p className="text-gray-700">
          Once you&apos;re satisfied with the task list, proceed to the comprehensive AI analysis. 
          The system will evaluate each task across technical feasibility, economic efficiency, and strategic human value.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={onProceed}
          disabled={loading || tasks.length === 0}
          className="px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          style={{ backgroundColor: '#1F3A5C' }}
        >
          {loading ? 'Analyzing Tasks...' : `Analyze ${tasks.length} Tasks →`}
        </button>
      </div>
    </div>
  );
}