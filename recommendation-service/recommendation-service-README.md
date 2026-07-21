# Weather Decision Assistant — Recommendation Service

Standalone Node.js service responsible for personalized briefing generation, AI chat, and alert rules. Decoupled from the Next.js app so LLM keys, weather API keys, and scaling are handled independently.

## Stack

- Node.js
- Express (or Fastify)
- LangChain.js
- TypeScript

## Structure

```
src/
  ai/              LangChain chains, prompts, memory, output parsers — single export via ai/index.ts
  routes/          HTTP routes (briefing, chat)
  jobs/            Scheduled batch briefing generation
  services/        Profile store, behavior tracking, weather client, rule-based alerts
  controllers/     Thin HTTP layer, no business logic
  models/          Data models (user profile, briefing, alert rule)
  config/          Database and environment config
  middleware/       Auth, rate limiting
```

Dependency direction is one-way: `controllers → services → ai`. Nothing outside `ai/` imports LangChain directly — the LLM provider or prompt strategy can change without touching the rest of the service.

## Getting started

```bash
npm install
npm run dev
```

Service runs at `http://localhost:4000` by default.

## Scripts

```bash
npm run dev              # start in dev mode
npm test                 # run tests
node src/jobs/generate-briefings.ts   # manually trigger batch briefing generation
```

## Environment variables

```
DATABASE_URL=
OPENAI_API_KEY=
WEATHER_API_KEY=
PORT=4000
```

## Data flow

**Briefing (batch, scheduled):**
Scheduled job → fetch profile + weather + recent behavior → `ai/index.ts` → LangChain chain builds prompt and calls LLM → structured output parsed and stored → Next.js reads the stored result.

**Chat (synchronous):**
User message → controller → chat service → LangChain chat chain (with memory) → LLM response → returned to client in real time.

## Notes

- Alerts are rule-based (threshold checks), not LLM-generated — cheaper and more predictable.
- Briefings are pre-generated in batches grouped by user briefing time-slot to control LLM cost and keep page loads fast.

## Related

- `nextjs-app` — the frontend that consumes this service's API.
