# ChaosRank Landing Page

## Strategic brief
- **Goal:** Convert curiosity into instant submissions by showcasing the live chaos, social proof, and shame-forward reward loops before the visitor leaves.
- **Audience:** Gen-Z meme addicts, Tech Twitter degenerates, Reddit lurkers, Slack clowns, and bored humans craving virality.
- **Value proposition:** ChaosRank is the anonymous, emotionally irresponsible stage where anything you post is ranked live, mutated by AI, and either crowned or roasted by the internet.

## Content blueprint
1. **Hero:** Benefit-focused headline, clarifying subheadline, “Start My Free Ride” CTA, and a live mock ranking visual.
2. **Social proof:** Logo strip + two short testimonials highlighting addictiveness and virality.
3. **Problem/Solution:** Pain points (stale social feeds) + ChaosRank’s live-response cure.
4. **Features:** Four cards that explain live board, anonymity, AI crowd mutations, badges/purges.
5. **How it works:** Three-step process (drop, crowd, share).
6. **Testimonials:** Two stories emphasizing shame + bragging.
7. **Pricing:** Free tier + Boosted Chaos plan + 30-day money-back guarantee line.
8. **FAQ:** Zero friction sign-up, WTF button tone, privacy assurance.
9. **Final CTA:** Hero-style reaffirmation + single CTA button.
10. **Footer:** Legal/links and tagline.

## Design system
- **Colors:** `#3b82f6` primary, `#22c55e` success, `#ef4444` error, dark surfaces (#05060a) with translucent panels.
- **Typography:** Space Grotesk (loaded with `font-display: swap`), base 16px / 1rem, `2.25rem` for 4xl style, responsive clamp for hero.
- **Spacing:** 8px grid (0.5rem increments) via consistent padding/margin in CSS; panels use 24px radius, 2rem sections.
- **Buttons:** CTA min-height 56px, padding 16px 32px, 18px font, 600 weight, translateY(-2px) hover + elevated shadow.
- **Patterns:** Glitch animation + subtle pulse for rank list to imitate live shuffle.

## SEO meta tags (match `index.html`)
- `title`: Live Viral Ranking | ChaosRank
- `description`: ChaosRank turns any confession, hot take or cursed idea into a live rankings spectacle with public badges, AI summaries, and total anonymity.
- `canonical`: `https://yourdomain.com` (replace with final domain before publish)
- `og:title`: ChaosRank | The internet decides. You live with it.
- `og:description`: Post anything. The internet reranks it in real time with crowd mutations, badges, and shame-forward storytelling.
- `og:image`: `og-image.png` (swap with final WebP asset)
- `og:type`: `website`

## Performance checklist
1. **Fonts:** Preconnect to Google Fonts + preload stylesheet; `font-display: swap` is enabled by the API query.
2. **Critical CSS:** Layout and hero styles are in external CSS but lightweight; the body background and hero blocks load fast thanks to minimal selectors.
3. **Images:** Use WebP for `og-image.png` (replace with actual WebP asset). Inline or lazy load any future visuals.
4. **JS:** `scripts.js` only manipulates the mock board; defer so rendering isn’t blocked.
5. **Metrics:** Deploy with Lighthouse budget targeting <2s load and <1s TTFB; monitor CLS via stable layout containers.

## A/B testing recommendations
1. **CTA copy:** Test “Start My Free Ride” vs. “Start My Free Chaos” while holding design constant; track CTR and scroll depth.
2. **Hero visual:** Swap the mock board for a looping short (glitch) animation vs. static card; measure time on page and funnel to submission.

## Link-up instructions for ChaosRank app
1. **Deployment:** Serve this folder from your preferred static host (Firebase Hosting, Vercel, etc.). Match the canonical + OG URLs to the real domain before deploying.
2. **Routing:** Update both hero/final CTA buttons to link to the live board route once it exists (e.g., `/live` or your React route). You can also wire the CTA to open a modal connected to the app’s submission flow.
3. **Live ranking data:** Replace the mock array in `scripts.js` with your live ranking stream:
   - Inject a config (via environment variable or meta tag) that points to your backend (for example, `window.__CHAOS_API_BASE__`).
   - Fetch the ranked list from the real-time endpoint (`/functions/liveRankings` or whichever API you expose). Use SSE/WebSocket to listen for updates and mutate DOM to match the current order + badges.
   - Keep the mutation logic to animate titles as shown, but now derive mutations from the API payload (crowd label, badge tier).
4. **Submission CTA:** When you’re ready to accept real submissions from the landing page, replace the CTA anchor with a form or redirect that posts to your submission API (e.g., `POST /posts`). Keep the button styling and ensure first-person text (“Start My Free Ride”) remains.
5. **SEO & analytics:** Add canonical + Open Graph meta updates to match production, hook analytics (GA4/Segment) to track CTA clicks, dwell time, and impressions.
6. **Monitoring:** Once connected, use the `functions` folder or your backend logs to monitor the ranking throughput, ensure sub-second updates, and confirm the WTF/Upvote/Downvote buttons map to the correct handlers.

