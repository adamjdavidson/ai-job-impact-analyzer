# AI Job Impact Analyzer

A strategic tool for Fortune 100 executives to understand how AI will transform specific job roles within their organizations. Built with Next.js, TypeScript, and OpenAI's GPT-4.

## Features

- **Theoretically-Grounded Analysis**: Based on established academic research from economists like Daron Acemoglu, David Autor, and Erik Brynjolfsson
- **Task-Level Assessment**: Analyzes individual tasks within job roles across three dimensions:
  - Technical Feasibility (0-10)
  - Economic Efficiency (0-10) 
  - Strategic Human Value (0-10)
- **Executive-Level Insights**: Provides value impact, demand impact, and strategic recommendations
- **Interactive Task Editing**: Customize tasks to match your organizational context
- **Professional UI**: Clean, executive-friendly interface with brand colors

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
ONET_API_KEY=your_onet_api_key_here (optional)
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Usage

1. **Enter Job Details**: Provide the job title, company size, department size, industry, and analysis perspective
2. **Review Tasks**: The system generates typical tasks for the role, which you can edit, add, or remove
3. **Get Analysis**: The AI analyzes each task and provides comprehensive insights including:
   - Task classifications (AI-led, Human-AI collaboration, Human-only)
   - Value and demand impact projections
   - Future role evolution description
   - Strategic recommendations

## Theoretical Framework

The analysis is built on established academic frameworks:

- **Daron Acemoglu & Pascual Restrepo**: Task-based automation framework
- **David Autor**: Routine-biased technical change theory
- **Erik Brynjolfsson**: Complement vs. substitute framework for AI
- **Daniel Rock (Wharton)**: AI exposure analysis
- **Ethan Mollick (Wharton)**: Human-AI collaboration
- **Matt Beane (UCSB)**: Skill development in AI-augmented work

## API Endpoints

- `POST /api/generate-tasks`: Generates typical tasks for a job role
- `POST /api/analyze`: Analyzes tasks and provides strategic insights

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This app is optimized for deployment on Vercel. Add your environment variables in the Vercel dashboard.

## Brand Colors

- Primary: `#1F3A5C` (dark blue)
- Accent: `#EFA14C` (golden orange)
