# HYPush website

Marketing site for HYPush (music marketing, PR, distribution and promotion), built
with Next.js 16 (Pages Router), React 19 and styled-components 6. It builds and runs
with no network access: fonts, images and scripts are all self-hosted.

## Running it

```bash
npm install          # once; the only step that needs the network
npm run dev          # http://127.0.0.1:3000, hot reload
npm run build && npm start
npm test             # form logic and rate-limiter unit tests
npm run typecheck
```

To prove a command runs offline on macOS, wrap it with
`sandbox-exec -f scripts/offline.sb`, which blocks all outbound network except
localhost.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, what we do, how we work |
| `/services` | The 11 services in three disciplines |
| `/faq` | Questions grouped by topic |
| `/start-a-project` | Multi-step project request form |
| `/privacy`, `/terms` | Privacy Policy and Terms of Service |
| `/api/project-requests` | Receives form submissions |

## Where things live

| What | File |
| --- | --- |
| Colors and spacing (light and dark) | [theme/tokens.json](theme/tokens.json) |
| Service catalogue | [data/services.ts](data/services.ts) |
| FAQ questions and answers | [data/faq.json](data/faq.json) |
| Form questions, options and per-service follow-ups | [lib/projectRequest/options.ts](lib/projectRequest/options.ts) |
| Form validation (shared by browser and server) | [lib/projectRequest/validate.ts](lib/projectRequest/validate.ts) |
| Site title, descriptions, social image | [constants/metadata.ts](constants/metadata.ts) |
| "Start a project" link and brand name | [constants/brand.ts](constants/brand.ts) |
| Logo | [components/logo/HyPushLogoSvg.tsx](components/logo/HyPushLogoSvg.tsx) |
| Home page sections | [components/OrbitingListener.tsx](components/OrbitingListener.tsx) (hero), [components/home/WhatWeDo.tsx](components/home/WhatWeDo.tsx) (bento grid), [components/home/HowWeWork.tsx](components/home/HowWeWork.tsx) (connected steps) |

## Form submissions

`/start-a-project` posts to `/api/project-requests`, which validates every answer
again on the server, rejects requests from other origins, rate-limits each visitor
(5 per 10 minutes) and silently drops bots caught by a honeypot field. Accepted
requests are appended to `.data/project-requests.jsonl` (git-ignored). After a
successful save, Resend sends a confirmation to the submitter (from
`RESEND_FROM_EMAIL`, defaulting to `hello@hypush.co`) and a notify copy to
`hello@hypush.co`. Set `RESEND_API_KEY` in `.env.local` (see `.env.example`).
Email failures are logged and never block the form response.

## Security headers

`next.config.ts` sends a strict Content Security Policy with no third-party
origins. The one inline script, which applies the color mode before first paint,
is allowed by its SHA-256 hash; [theme/colorModeScript.js](theme/colorModeScript.js)
builds it for both the header and `pages/_document.tsx`, so editing the tokens
updates the hash automatically.

## Before publishing

- Review the draft copy (services, FAQ, form questions, page text).
- Replace the privacy policy and terms placeholders with reviewed legal text.
- Verify `hypush.co` in Resend (DKIM/SPF records) so `hello@hypush.co` can send.
- Confirm `RESEND_API_KEY` is set in production.
