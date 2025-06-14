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
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in AI impact analysis for jobs, grounded in academic research from economists like Daron Acemoglu, David Autor, Erik Brynjolfsson, and Daniel Rock. You provide strategic, executive-level insights about how AI will transform job roles."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 4000,
    });

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
Analyze the AI impact on the job role "${jobTitle}" in the context of a ${context.companySize} company with a ${context.departmentSize} ${jobTitle.includes('department') ? '' : context.industry} department, from an ${context.perspective} perspective.

## Theoretical Framework
Apply established academic frameworks:

### Task-Based Assessment (Acemoglu & Restrepo)
- Focus on task-level displacement vs. productivity effects
- Consider how AI complements vs. substitutes human capabilities

### Routine-Biased Technical Change (David Autor)
- Distinguish between routine and non-routine tasks
- Analyze cognitive vs. manual task components

### AI Exposure Analysis (Daniel Rock, Wharton)
- Evaluate technical feasibility of AI implementation
- Consider economic efficiency and strategic value

### Human-AI Collaboration (Ethan Mollick)
- Identify optimal human-AI partnership opportunities
- Focus on co-intelligence rather than replacement

## Assessment Criteria
For each task, provide scores (0-10) for:
1. **Technical Feasibility**: How capable is current/near-future AI at performing this task?
2. **Economic Efficiency**: What's the cost-benefit of AI vs. human implementation?
3. **Strategic Human Value**: How important is human involvement for strategic/relationship reasons?

## Classification System
Based on scores, classify each task as:
- **AI-led** (AI performs with minimal human oversight)
- **Human-AI** (Collaborative partnership, each contributing unique strengths)
- **Human-only** (Remains primarily human-performed)

## Tasks to Analyze
${tasks.map((task, index) => `${index + 1}. ${task}`).join('\n')}

## Required Output Format
Return ONLY valid JSON in this exact format:

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
    "recommendations": ["List of 4-6 specific strategic recommendations for workforce planning"],
    "timeline_analysis": {
      "2024": "Current state description",
      "2025": "Near-term changes (1 year)",
      "2027": "Medium-term transformation (3 years)"
    },
    "skill_development": {
      "critical_skills": ["List of 4-5 skills that become most important"],
      "obsolete_skills": ["List of 3-4 skills that become less relevant"],
      "new_skills": ["List of 4-5 new skills this role will need"]
    },
    "competitive_advantage": {
      "differentiation": "How this role creates competitive advantage",
      "risk_factors": ["List of 3-4 key risks if not adapted properly"],
      "opportunity_areas": ["List of 3-4 key opportunities for value creation"]
    },
    "implementation_strategy": {
      "immediate_actions": ["List of 3-4 actions to take in next 90 days"],
      "medium_term_plan": ["List of 3-4 actions for next 6-12 months"],
      "success_metrics": ["List of 3-4 KPIs to track transformation success"]
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