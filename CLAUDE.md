# SheepLoop Codebase Architecture

## Project Overview
**SheepLoop** is a Next.js AI-powered application designed to help early-stage creators and founders generate community-driven go-to-market strategies and viral short-form content scripts. It uses the **Mastra framework** for AI agent orchestration and integrates with Claude AI (Anthropic) for intelligent content generation.

**Core Purpose**: Transform raw product/project ideas into structured community marketing plans with personas, storylines, and TikTok-ready scripts.

---

## Tech Stack

### Framework & Runtime
- **Next.js 16.0.1** - Full-stack React framework with App Router
- **React 19.2.0** - UI framework
- **TypeScript** - Type-safe development
- **Zod** - Schema validation and type inference

### AI & Agent Orchestration
- **@mastra/core@0.23.1** - Core Mastra framework for agent definition and lifecycle
- **@mastra/loggers@0.10.18** - Structured logging (Pino-based)
- **@mastra/memory@0.15.9** - Agent state/memory management
- **@mastra/deployer-vercel@0.12.14** - Vercel deployment integration
- **Claude Haiku 4.5 (anthropic/claude-haiku-4-5)** - Primary LLM for agent reasoning

### Database & ORM
- **@libsql/client@0.15.15** - Turso SQLite client
- **drizzle-orm@0.44.7** - SQL query builder and ORM
- **drizzle-kit@0.31.6** - Schema migrations and tooling
- **Turso** - SQLite-compatible database hosting

### UI & Styling
- **@radix-ui/*@latest** - Headless, accessible component primitives
- **tailwindcss@4** - Utility-first CSS framework
- **lucide-react** - Icon library
- **class-variance-authority** - Component variant management
- **cmdk** - Command palette component

### Utilities
- **react-hook-form@7.65.0** + **@hookform/resolvers** - Form state management
- **date-fns@4.1.0** - Date utilities
- **recharts@2.15.4** - Data visualization
- **gsap@3.13.0** - Animation library
- **sonner@2.0.7** - Toast notifications
- **next-themes** - Theme management (light/dark mode)

---

## Project Structure

```
sheeploop/
├── app/                          # Next.js App Router
│   ├── generate/                 # Community fit storyline generation page
│   │   ├── page.tsx             # Main page component
│   │   ├── form.tsx             # Client-side form with input fields
│   │   └── action.ts            # Server action calling Mastra agent
│   ├── download/                # Asset download page (placeholder)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page (landing)
│   └── globals.css              # Global styles
│
├── mastra/                       # Mastra framework configuration & agents
│   ├── index.ts                 # Mastra instance initialization (singleton)
│   ├── agents/                  # AI agents
│   │   └── community-fit-storyline.agent.ts  # Main agent (5-persona generator)
│   └── tools/                   # Tool definitions
│       └── weather-tool.ts      # Example external API tool
│
├── components/                  # Reusable React components
│   ├── ui/                      # Radix-based UI primitives
│   │   ├── button.tsx, input.tsx, etc.
│   │   └── [20+ radix-wrapped components]
│   ├── home/                    # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── PainPoints.tsx
│   │   ├── ValueProps.tsx
│   │   ├── Credibility.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Footer.tsx
│   └── user-acquisition/        # Growth/marketing components
│
├── lib/                         # Utilities & helpers
│   ├── print-helpers.ts         # Colored console logging (green, yellow, red)
│   └── utils.ts                 # General utilities
│
├── drizzle/                     # Database schema & migrations
│   ├── index.ts                 # Drizzle client initialization
│   ├── schema/                  # Table definitions
│   │   ├── users.ts            # User profiles (id, name, email)
│   │   ├── go-to-market-plans.ts # GTM plans (linked to users)
│   │   └── shorts.ts           # Short-form content metadata
│   └── migrations/              # Auto-generated SQL migrations
│
├── public/                      # Static assets (favicon, etc.)
├── env.ts                       # Environment variable validation (Zod)
├── next.config.ts               # Next.js config (Mastra as external package)
├── drizzle.config.ts            # Drizzle migration config
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts

```

---

## Architecture Patterns & Key Design Decisions

### 1. Mastra Agent Architecture
**Location**: `/mastra/index.ts` and `/mastra/agents/`

- **Singleton Pattern**: Mastra instance is globally cached to avoid re-initialization during development (HMR).
  ```typescript
  globalThis.__mastra__ ?? createMastra()
  ```
- **Single Primary Agent**: `communityFitStorylineAgent` - orchestrates the entire content generation flow
- **No Tool Integration (Yet)**: Tools object is empty `{}`, but designed to extend with weather tool, trend miner, etc.
- **PinoLogger**: Structured logging with 'info' level for observability

**Key Agent Configuration**:
- Model: Claude Haiku 4.5 (cost-optimized, fast reasoning)
- Telemetry: Enabled for performance monitoring
- Observability: Default enabled

### 2. Community Fit Storyline Agent (Core Business Logic)
**Location**: `/mastra/agents/community-fit-storyline.agent.ts` (~800 lines)

**Input Schema**: 
- idea, vision, target_platforms, duration, tone, core_audience_guess
- constraints, inspirations_or_competitors, primary_growth_goal

**Output Schema** (Zod-validated):
```
{
  community_market_fit: {
    score: { alignment, virality, engagement, differentiation } (0-10 each),
    summary: 3-5 bullet points
  },
  ifc_profile: {
    demographics, psychographics, pain_points, triggers, community_behaviors
  },
  personas: [5 distinct personas] {
    name, segment, description, key_motivation, core_pain_point, platform_behavior, preferred_tone_style,
    storyline: { title, theme, arc { hook, transformation, outcome }, emotional_driver, core_message },
    growth_strategy: { objective, posting_frequency, content_pillars, engagement_tactics, kpis },
    scripts: [3-5 TikTok scripts] { title, duration, script, cta }
  }
}
```

**Processing Flow**:
1. **Input Validation**: Zod schema validation
2. **Agent Generation**: Claude Haiku reasons through spec and generates JSON
3. **JSON Extraction**: Three-pass extraction (fenced code block → direct parse → brace slice)
4. **Coercion/Repair**: 
   - Normalizes types (strings, arrays, integers 0-10)
   - Enforces exactly 5 personas
   - Ensures 3-5 scripts per persona
   - Self-repairs via second agent call if first validation fails
5. **Final Schema Validation**: Zod parse with descriptive error throwing

**Key Design Patterns**:
- **Robust JSON Parsing**: Handles model hallucinations and format drift
- **Schema-Driven Repair**: Uses validation errors to inform repair prompt
- **Deterministic Output**: Coercion ensures consistent shape even with model variance

### 3. Next.js App Router Integration
**Location**: `/app/generate/`

- **Server Action** (`action.ts`): `getCommunityFitStoryline()` - Bridge between client form and Mastra agent
  - Extracts FormData → constructs input object → calls agent
  - Returns stringified JSON to client
- **Client Component** (`form.tsx`): Form with pre-filled test data, submits to server action
- **Page Component** (`page.tsx`): Simple layout wrapper

**Data Flow**:
```
User Form Input 
  → FormData (client)
  → Server Action
  → Mastra Agent
  → Claude AI (Anthropic)
  → JSON output
  → Coercion & Validation
  → JSON string to client
  → Display in <pre> tag
```

### 4. Database Schema (Drizzle/Turso)
**Location**: `/drizzle/schema/`

**Tables**:
1. **users**: User profiles
   - id (UUID, primary key)
   - first_name, last_name, email (unique)
   - created_at (auto-timestamp)

2. **go_to_market_plans**: GTM strategy records
   - id (primary key)
   - user_id (foreign key → users.id)
   - name, idea, description, audience, platforms
   - content_strategy, content_format, content_length, content_frequency, content_type
   - created_at, updated_at (auto-timestamps)

3. **shorts**: Short-form video metadata (schema defined but not yet shown in detail)

**Future Integration**: Currently unused in generation flow; designed for persisting GTM plans & tracking short videos.

### 5. Environment Validation (Zod)
**Location**: `/env.ts`

```typescript
const envSchema = z.object({
  ANTHROPIC_API_KEY: z.string(),
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  OPENAI_API_KEY: z.string(), // fallback
})
```

- **Strict Validation**: Throws on missing keys at app startup
- **Helpful Error Messages**: Lists each missing variable
- **Centralized Access**: `Env.get(key)` interface

---

## Key Architectural Insights

### Strengths
1. **Clean Separation of Concerns**: Agents, components, database schemas are modular
2. **Type Safety**: End-to-end TypeScript + Zod schemas prevent runtime errors
3. **Schema-Driven Design**: Output shape is enforced before reaching client
4. **Resilient JSON Handling**: Multi-pass parsing + repair strategy handles model quirks
5. **Server Actions Pattern**: Secure client-server boundary for AI calls
6. **Extensible Agent Architecture**: Tools object allows future tool integrations

### Unique Patterns
1. **Exact 5-Persona Requirement**: Enforced via coercion; if model returns >5, slices; <5, pads
2. **Emotional Storyline Backbone**: Each persona has 3-act arc (hook → transformation → outcome)
3. **Platform-Native Scripts**: TikTok script specs include duration, hard hook timing (~2s), and persona-specific CTAs
4. **IFC Profile Separation**: Single "Ideal Follower Profile" defines primary archetype; personas define sub-markets

### Scale Considerations
- **Agent Reasoning Time**: Haiku ~10-30s per complete generation (cost-optimized vs Sonnet)
- **LLM Cost**: Haiku cheaper than Sonnet 4.5, suitable for cost-sensitive founder tools
- **Database**: Turso (SQLite) scales horizontally; Drizzle queries are efficient
- **Next.js Streaming**: Not yet utilized but available for long-running agent calls

---

## File-to-Purpose Reference

| File | Purpose |
|------|---------|
| `/mastra/index.ts` | Mastra singleton, logger setup |
| `/mastra/agents/community-fit-storyline.agent.ts` | Core agent, I/O schemas, system prompt, repair logic |
| `/app/generate/action.ts` | Server-side entry point for agent calls |
| `/app/generate/form.tsx` | Client UI for inputting campaign parameters |
| `/drizzle/index.ts` | Database connection (Turso/SQLite) |
| `/drizzle/schema/*.ts` | Table definitions (users, GTM plans, shorts) |
| `/env.ts` | Environment variable validation |
| `/lib/print-helpers.ts` | Colored console logging |
| `/components/ui/*` | Radix UI wrappers (buttons, inputs, dialogs, etc.) |
| `/components/home/*.tsx` | Landing page sections |

---

## Future Extension Points

1. **Tools Integration**: `/mastra/tools/` can add:
   - Trend miner (TikTok/Instagram trends)
   - Competitor analyzer
   - Audio/video generation endpoints

2. **Multi-Agent Workflows**: Chain agents for:
   - Content calendar generation
   - Thumbnail design reasoning
   - Engagement funnel builder

3. **Persistence Layer**: 
   - Save GTM plans to `go_to_market_plans` table
   - Track generated shorts in `shorts` table
   - User auth & plan history

4. **Streaming**: Utilize Next.js streaming for real-time persona-by-persona output

5. **Persona Refinement**: Allow users to tweak personas, re-run with different inputs, A/B test scripts

---

## Running the App

**Development**:
```bash
npm run dev
```
Opens `http://localhost:3000` with landing page; `/generate` for agent form.

**Build & Deployment**:
```bash
npm run build
npm run start
```
Vercel integration via `@mastra/deployer-vercel` allows one-click deployment.

---

## Dependencies Summary

- **Mastra Ecosystem**: Core, loggers, memory, Vercel deployer
- **LLM & APIs**: Anthropic Claude (Haiku), Open Meteo weather API (tools example)
- **Frontend**: React, Next.js, Radix UI, Tailwind
- **Backend**: Drizzle ORM, Turso (SQLite)
- **Validation**: Zod
- **Forms**: React Hook Form

**Total Size**: ~563 node_modules packages
**Deployment Target**: Vercel (configured via `next.config.ts` external packages)

