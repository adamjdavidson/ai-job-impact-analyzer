import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { JobContext, AnalysisResult } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, context, tasks } = await request.json();

    if (!jobTitle || !context || !tasks || !Array.isArray(tasks)) {
      return NextResponse.json(
        { error: 'Missing required fields: jobTitle, context, and tasks' },
        { status: 400 }
      );
    }

    const prompt = createAnalysisPrompt(jobTitle, context, tasks);
    
    const completion = await Promise.race([
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an AI job impact analyst. Provide concise, strategic analysis."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 2000,
      }),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('OpenAI request timeout')), 25000)
      )
    ]) as any;

    const analysisText = completion.choices[0]?.message?.content;
    if (!analysisText) {
      throw new Error('No analysis returned from OpenAI');
    }

    // Parse the JSON response
    const analysis: AnalysisResult = JSON.parse(analysisText);
    
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze job impact' },
      { status: 500 }
    );
  }
}

function createAnalysisPrompt(jobTitle: string, context: JobContext, tasks: string[]): string {
  return `
Analyze AI impact on "${jobTitle}" role for ${context.companySize} ${context.industry} company.

TASK: Score each task (0-10) for:
- Technical Feasibility (can AI do this?)
- Economic Efficiency (cost-effective vs human?)
- Strategic Human Value (human relationships important?)

Classify as: AI-led, Human-AI, or Human-only

Tasks:
${tasks.map((task, index) => `${index + 1}. ${task}`).join('\n')}

Return ONLY this JSON format:

{
  "job_title": "${jobTitle}",
  "context": ${JSON.stringify(context)},
  "tasks": [
    {
      "name": "Task name",
      "category": "Strategic Planning/Operations/Communication/etc",
      "classification": "AI-led|Human-AI|Human-only",
      "confidence": "High|Medium|Low",
      "scores": {
        "technical": 0-10,
        "economic": 0-10,
        "strategic": 0-10
      },
      "reasoning": "Brief explanation of classification based on academic frameworks"
    }
  ],
  "insights": {
    "value_impact": {
      "change": "+/-X%",
      "description": "More/Less Valuable",
      "explanation": "Why this role becomes more/less valuable"
    },
    "demand_impact": {
      "change": "+/-X%",
      "description": "More/Fewer Needed",
      "explanation": "Why demand increases/decreases"
    },
    "future_role": "2-3 sentence vision of how this role evolves by 2027",
    "high_value_tasks": ["List of 3-5 tasks that become MORE valuable"],
    "ai_handled_tasks": ["List of 3-5 tasks AI will fully handle"],
    "collaboration_tasks": ["List of 3-5 tasks optimal for human-AI partnership"],
    "recommendations": ["List of 3-4 specific strategic recommendations"],
    "timeline_analysis": {
      "2024": "Current state",
      "2025": "Near-term changes",
      "2027": "Future transformation"
    },
    "skill_development": {
      "critical_skills": ["3-4 most important skills"],
      "obsolete_skills": ["2-3 declining skills"],
      "new_skills": ["3-4 new skills needed"]
    },
    "competitive_advantage": {
      "differentiation": "Competitive advantage summary",
      "risk_factors": ["2-3 key risks"],
      "opportunity_areas": ["2-3 opportunities"]
    },
    "implementation_strategy": {
      "immediate_actions": ["2-3 immediate actions"],
      "medium_term_plan": ["2-3 medium-term actions"],
      "success_metrics": ["2-3 key metrics"]
    }
  }
}

## Guidelines
- Base all assessments on established academic research
- Consider the specific organizational context (company size, department size, industry)
- Focus on value creation, not just displacement
- Provide actionable, executive-level insights
- Be optimistic but realistic about AI's impact
- Ensure percentages are realistic (typically -30% to +50% range)
- Make recommendations specific and actionable
`;
}

export async function GET() {
  return NextResponse.json({ message: 'AI Job Impact Analyzer API' });
}