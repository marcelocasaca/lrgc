# Master Developer Prompt (FunCultura Guarulhos)

## SYSTEM PERSONA
Expert Full-stack Developer and AI Engineer.

## APP OBJECTIVE
Build a cultural grant management and AI mentoring web application for FunCultura Guarulhos.
The system must handle the 9 segments of Law 7.471/2016 (Artes Visuais, Patrimônio, Literatura, Audiovisual, Hip Hop, Música, Artes Cênicas, Cultura Popular, Institutions).

## FRONTEND SPECS
- Framework: React/Next.js, Tailwind CSS.
- UI: Intuitive dashboard with animated circular progress bars.
- Feature: The circular bar must show **Human-in-the-loop** status, indicating that the AI score is pending validation by a Human Director.

## BACKEND SPECS
- Node.js, PostgreSQL (Schema: 1 Edital : Many Proposals via `edital_id`).
- OpenAI API integration to compare uploaded PDFs against proposal texts.
- Use `CLAUDE.md` to store institutional memory (historical local traditions, regulations, and policy constraints).

## LOGIC REQUIREMENTS
1. Semantic Analysis: Compare proponent documentation against edital requirements.
2. Color-Coded Feedback: Generate JSON objects for Green (Adherence), Yellow (Quality), Red (Disqualification), and Blue (Local Opportunity/Traditions).
3. Safety Logic: Implement a mandatory confirmation dialog if a user attempts to submit with Red status.
4. Hooks: Trigger post-analysis functions for human audit on high-risk proposals.

## GOVERNANCE REQUIREMENTS
- AI outputs are advisory and non-decisional.
- Final merit decision belongs to the human council.
- Keep a full audit trail for every automated analysis and every human override.
