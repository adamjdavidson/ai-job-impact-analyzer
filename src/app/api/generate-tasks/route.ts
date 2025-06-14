import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { JobContext } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, context } = await request.json();

    if (!jobTitle || !context) {
      return NextResponse.json(
        { error: 'Missing required fields: jobTitle and context' },
        { status: 400 }
      );
    }

    const prompt = createTaskGenerationPrompt(jobTitle, context);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in job analysis and organizational design. You generate comprehensive, realistic task lists for specific job roles based on organizational context."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500,
    });

    const tasksText = completion.choices[0]?.message?.content;
    if (!tasksText) {
      throw new Error('No tasks returned from OpenAI');
    }

    // Parse the JSON response
    const tasksData = JSON.parse(tasksText);
    
    return NextResponse.json(tasksData);
  } catch (error) {
    console.error('Task generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate tasks' },
      { status: 500 }
    );
  }
}

function createTaskGenerationPrompt(jobTitle: string, context: JobContext): string {
  return `
Generate a comprehensive list of typical tasks for a "${jobTitle}" role in the following organizational context:

**Company Size**: ${context.companySize}
**Department Size**: ${context.departmentSize}
**Industry**: ${context.industry}
**Analysis Perspective**: ${context.perspective}

## Requirements:
1. Generate 8-12 realistic, specific tasks that this role typically performs
2. Consider the organizational context - larger companies have more specialized roles, smaller departments require more generalist skills
3. Include a mix of:
   - Strategic/planning tasks
   - Operational/execution tasks
   - Communication/collaboration tasks
   - Analysis/decision-making tasks
4. Make tasks specific enough to be meaningful but broad enough to be widely applicable
5. Consider industry-specific nuances

## Output Format:
Return ONLY valid JSON in this format:

{
  "tasks": [
    "Specific task description 1",
    "Specific task description 2",
    "Specific task description 3",
    ...
  ]
}

## Examples of Good Task Descriptions:
- "Develop quarterly marketing campaigns and measure their effectiveness"
- "Analyze customer data to identify trends and opportunities"
- "Coordinate with cross-functional teams to launch new products"
- "Prepare and present monthly performance reports to senior leadership"

## Context Considerations:
- **${context.companySize}**: ${context.companySize === 'Fortune 50' ? 'Highly specialized roles with deep expertise in specific areas' : context.companySize === 'Fortune 100' ? 'Specialized roles but with some cross-functional responsibilities' : 'More generalist roles covering broader scope'}
- **${context.departmentSize}**: ${context.departmentSize.includes('Large') ? 'Focused on specific specializations within the role' : context.departmentSize.includes('Medium') ? 'Balance of specialized and general responsibilities' : 'Broad responsibilities across multiple areas'}
- **${context.industry} Industry**: Consider industry-specific regulations, practices, and challenges
- **${context.perspective} Perspective**: ${context.perspective === 'organizational' ? 'Focus on tasks that impact organizational strategy and efficiency' : 'Focus on tasks that relate to individual career development and skills'}

Generate realistic, actionable tasks that accurately reflect this role in this organizational context.
`;
}

export async function GET() {
  return NextResponse.json({ message: 'Task Generation API' });
}