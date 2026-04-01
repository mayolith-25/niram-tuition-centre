# Niram Tuition Centre — Full Website Redesign Prompt
## Optimised for Claude Opus 4.6

---

## ROLE & MISSION

You are a senior frontend engineer and UI/UX designer specialising in education brand websites for South Indian markets. Your task is to rebuild the **Niram Tuition Centre** homepage (`index.html`) as a single, self-contained HTML file — production-grade, visually stunning, and culturally resonant.

You must fix every visual flaw from the previous version while preserving the brand's content and unique identity.

---

## BRAND IDENTITY TO PRESERVE

- **Name:** Niram Tuition Centre (NTC)
- **Tagline:** "Path.. to Endeavour"
- **Philosophy:** "Teaching is Inspiring and Learning is Understanding"
- **Location:** Tamil Nadu, India
- **Audience:** Parents and students (Classes 6–12) across CBSE, ICSE, Matriculation, and NIOS boards
- **Unique identity:** Classrooms named after Indian national heroes — Dr. Radhakrishnan (Wisdom), Dr. Abdul Kalam (Innovation), MK Gandhi (Character)
- **Tone:** Warm, trustworthy, aspirational, rooted in Indian educational values

---

## AESTHETIC DIRECTION

**Theme:** "Warm Academic Excellence" — the feeling of a premium, caring institution. Think: aged parchment meets modern clarity. Inspired by the warmth of Indian academic culture — saffron, deep teal, cream.

**Do NOT** produce:
- Generic blue-and-white bootstrap-style edu templates
- Purple gradient "AI slop" aesthetics
- Cold, corporate SaaS vibes
- Anything that looks like a generic WordPress theme

**DO produce:**
- Rich, warm color palette with a saffron/amber accent
- Scholarly yet approachable typography
- Subtle geometric patterns inspired by Indian architectural motifs
- Sections that feel handcrafted, not templated

---

## TYPOGRAPHY SPECIFICATION

Load these from **Google Fonts** in the `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Apply as CSS variables:
```css
:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Nunito', sans-serif;
}
```

**Usage rules:**
- All `<h1>`, `<h2>`, section titles → `font-family: var(--font-display)`
- All body text, nav, cards, buttons → `font-family: var(--font-body)`
- Hero `<h1>` → `font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 700`
- Section headings → `font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 600`
- Body text → `font-size: 1rem; font-weight: 400; line-height: 1.75`
- Never use Arial, Roboto, Inter, or system fonts

---

## COLOR PALETTE

Define ALL colors as CSS custom properties on `:root`:

```css
:root {
  /* Core palette */
  --color-cream:       #FDF8F0;   /* page background */
  --color-cream-dark:  #F5EDD8;   /* alternate section bg */
  --color-parchment:   #EDE0C4;   /* borders, dividers */

  /* Brand colors */
  --color-saffron:     #E8891A;   /* primary accent — buttons, highlights, icons */
  --color-saffron-light: #FDF0DC; /* light accent backgrounds */
  --color-teal:        #0F6E56;   /* secondary — headers, strong text */
  --color-teal-dark:   #085041;   /* hover states */
  --color-teal-light:  #E1F5EE;   /* light teal backgrounds */

  /* Text */
  --color-text-primary:   #1A1A1A;
  --color-text-secondary: #4A4A4A;
  --color-text-muted:     #7A7A7A;
  --color-text-on-dark:   #FDF8F0;

  /* Functional */
  --color-white: #FFFFFF;
  --color-shadow: rgba(15, 110, 86, 0.1);
}
```

**Color usage rules:**
- Page background: `var(--color-cream)` — never plain white `#fff`
- Primary CTA buttons: `background: var(--color-saffron); color: #fff`
- Secondary/ghost buttons: `border: 2px solid var(--color-teal); color: var(--color-teal)`
- Section headings: `color: var(--color-teal)`
- Accent underlines, highlights: `var(--color-saffron)`
- Alternate sections: `background: var(--color-teal)` with `color: var(--color-text-on-dark)`

---

## LAYOUT & STRUCTURE

Build these sections in order inside a single `index.html`:

### 1. NAVIGATION
- Sticky nav, `background: rgba(253, 248, 240, 0.95); backdrop-filter: blur(8px)`
- Logo: "NTC" badge in saffron circle + "Niram Tuition Centre" in Playfair Display
- Nav links in Nunito, color `var(--color-text-secondary)`, hover color `var(--color-saffron)`
- "Enquire Now" button: saffron filled, rounded pill shape
- Mobile hamburger menu with smooth slide-down

### 2. HERO SECTION
- Full-viewport height (`min-height: 100vh`)
- Background: `var(--color-cream)` with a **subtle geometric SVG pattern overlay** — use an SVG `<pattern>` of small dots or a diagonal grid in `var(--color-parchment)` at 15% opacity. This adds texture without imagery.
- Left side: text content (60% width on desktop)
- Right side (40%): a decorative SVG illustration of an open book with geometric shapes, or a circular badge with the NTC monogram surrounded by academic motifs — do NOT use a photo placeholder
- Tagline: small all-caps label "SHARING KNOWLEDGE" in saffron above the h1
- h1: "Niram Tuition Centre" in Playfair Display
- Subtext: the philosophy quote in italic Playfair
- Two CTA buttons side by side: filled saffron + ghost teal
- Staggered fade-in animation on load using `@keyframes` with `animation-delay`

### 3. STATS COUNTER SECTION
- 4 stats: Students Taught (500+), Boards Covered (4), Named Classrooms (3), Years of Commitment (10+)
- Light teal background `var(--color-teal-light)` with a thin top and bottom border in `var(--color-parchment)`
- Each stat: large number in Playfair Display saffron, label in Nunito below
- **CRITICAL: Implement a working count-up animation using IntersectionObserver.** When the section enters the viewport, numbers count up from 0 to their target value over 2 seconds using `requestAnimationFrame`. Numbers with "+" suffix should show "500+" at end. Use `data-target="500"` and `data-suffix="+"` attributes on the number elements.

```javascript
// Counter animation — MUST implement this exactly:
const counters = document.querySelectorAll('.stat-number');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const target = parseInt(entry.target.dataset.target);
      const suffix = entry.target.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        entry.target.textContent = Math.round(target * ease) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }
  });
}, { threshold: 0.3 });
counters.forEach(c => observer.observe(c));
```

### 4. WHY CHOOSE NTC — FEATURE CARDS
- 6 cards in a 3×2 grid (desktop), 2×3 (tablet), 1×6 (mobile)
- Each card: white background, subtle shadow, left border in saffron (4px), rounded corners
- Replace ALL emoji with inline SVG icons. Use these specific icons for each:
  - Experienced Faculty → graduation cap SVG
  - Individual Attention → person with circle SVG
  - Detailed Explanations → speech bubble SVG
  - Weekly Tests → checkmark clipboard SVG
  - On-Time Completion → clock SVG
  - Board Exam Prep → certificate/medal SVG
- Icons: 40×40px, color `var(--color-saffron)`, inside a `var(--color-saffron-light)` circle
- Card hover: `transform: translateY(-4px); box-shadow: 0 12px 32px var(--color-shadow)`
- Transition: `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### 5. ICONIC CLASSROOMS SECTION
- Dark teal background `var(--color-teal)`, light text
- Section heading in Playfair Display, white
- 3 cards side by side (stacked on mobile)
- Each card: semi-transparent white border (`rgba(255,255,255,0.15)`), `background: rgba(255,255,255,0.08)`, rounded corners
- Replace emojis with inline SVG icons:
  - Dr. Radhakrishnan → owl or open book SVG (wisdom)
  - Dr. Abdul Kalam → rocket SVG (innovation)
  - MK Gandhi → lotus/spinning wheel SVG (character)
- Icon: 48px, white
- Card hover: `background: rgba(255,255,255,0.14); border-color: var(--color-saffron)`
- Each card should have: icon + name + subtitle + 3 bullet points

### 6. BOARDS WE COVER
- Cream background `var(--color-cream-dark)`
- 4 boards in a 4-column grid
- Each board: proper illustrated badge, NOT plain letter abbreviations
  - Design each badge as a styled shield/badge shape using inline SVG
  - CBSE: Navy blue shield
  - ICSE: Deep green shield
  - Matriculation: Saffron/orange shield
  - NIOS: Purple shield
  - Each shield contains the abbreviation in bold Playfair Display, full name below in Nunito
- Cards have a subtle hover lift effect

### 7. TESTIMONIALS SECTION (ADD THIS — currently missing)
- Light teal background
- 3 testimonial cards, each with:
  - Opening quote mark (large, saffron)
  - Quote text in italic Playfair
  - Student/parent name in bold Nunito
  - Star rating (5 stars) using filled star SVGs in saffron
- Use placeholder names: "Priya R., Parent of Class 10 student", "Karthik S., Class 12 student", "Mrs. Meenakshi, Parent"
- Placeholder testimonial text that sounds authentic to a Tamil Nadu tuition centre

### 8. CTA BANNER
- Bold teal background
- Large heading in white Playfair Display
- Subtext in light teal
- Two buttons: filled white (text in teal) + ghost white-border

### 9. MOTIVATIONAL QUOTE BANNER
- Near-black background `#1A1A1A` (not pure black)
- The quote: "DON'T STOP WHEN YOU ARE TIRED. STOP WHEN YOU ARE DONE."
- Styled with mixed weights: normal words in `font-weight: 300`, emphasized words ("DON'T STOP", "STOP", "DONE") in `font-weight: 700; color: var(--color-saffron)`
- Large font size: `clamp(1.2rem, 2.5vw, 1.8rem)`
- Decorative horizontal line in saffron above and below

### 10. FOOTER
- Dark teal background `var(--color-teal-dark)`
- 3-column grid: Brand column | Quick Links | Contact
- **CONTACT COLUMN must include real placeholder data (not "Contact us for details"):**
  - 📍 address: "123 Education Street, Coimbatore - 641001, Tamil Nadu" (placeholder)
  - 📞 phone: "+91 98765 43210" (clearly labeled as placeholder in a code comment)
  - ✉️ email: "info@niramtc.com" (placeholder)
  - Use inline SVG icons (location pin, phone, email), NOT emoji
- Footer links in `rgba(255,255,255,0.75)`, hover: `var(--color-saffron)`
- Bottom bar: copyright + "Crafted with ❤️ for Education"
- Social icons (optional): simple SVG circles for WhatsApp, Instagram

---

## WHATSAPP INTEGRATION

- Replace ALL instances of `91XXXXXXXXXX` with `919876543210` as a working placeholder
- The floating WhatsApp button (bottom-right, fixed):
  - Green circle (`#25D366`) with WhatsApp SVG icon (white)
  - Pulse animation: `@keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5) } 50% { box-shadow: 0 0 0 12px rgba(37,211,102,0) } }`
  - Tooltip on hover: "Chat with us!"
  - `z-index: 1000`

---

## ANIMATIONS & INTERACTIONS

All animations must be CSS-only or vanilla JS — no external animation libraries.

**Required animations:**

```css
/* Fade up on load — apply to hero elements with staggered delays */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Floating for hero illustration */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

/* WhatsApp pulse */
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
  50%       { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
}

/* Scroll reveal — add class 'reveal' to sections, trigger via IntersectionObserver */
.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

**Scroll reveal implementation:**
```javascript
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));
```

---

## HERO GEOMETRIC BACKGROUND PATTERN

Use this inline SVG pattern in the hero. Insert as a `<div class="hero-pattern">` positioned absolutely behind the content:

```html
<div class="hero-pattern" aria-hidden="true">
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#C8B89A" opacity="0.4"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)"/>
  </svg>
</div>
```

```css
.hero-pattern {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
```

---

## MOBILE RESPONSIVENESS

All sections must be fully responsive. Use these breakpoints:

```css
/* Mobile first */
@media (min-width: 640px)  { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
```

Key responsive rules:
- Nav collapses to hamburger on mobile
- Hero becomes single column (text on top, illustration hidden or shrunk)
- Cards grids collapse: 3-col → 2-col → 1-col
- Stats: 4-col → 2-col → 2-col
- Font sizes use `clamp()` throughout — no fixed px sizes for headings
- Touch targets minimum 44×44px

---

## COMPLETE SITE STRUCTURE

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Niram Tuition Centre — Path to Endeavour. Best coaching in Tamil Nadu for CBSE, ICSE, Matriculation and NIOS boards.">
  <title>Niram Tuition Centre — Path to Endeavour</title>
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* ALL CSS HERE — full implementation */
  </style>
</head>
<body>
  <!-- 1. Navbar -->
  <!-- 2. Hero Section -->
  <!-- 3. Stats Counter -->
  <!-- 4. Why Choose NTC -->
  <!-- 5. Iconic Classrooms -->
  <!-- 6. Boards We Cover -->
  <!-- 7. Testimonials -->
  <!-- 8. CTA Banner -->
  <!-- 9. Motivational Quote -->
  <!-- 10. Footer -->
  <!-- Floating WhatsApp Button -->
  <script>
    /* ALL JS HERE — counter, scroll reveal, mobile nav */
  </script>
</body>
</html>
```

---

## QUALITY CHECKLIST — VERIFY BEFORE FINISHING

Before you return the code, verify every item:

- [ ] Google Fonts loaded and applied correctly
- [ ] All 10 color CSS variables defined and used consistently
- [ ] Hero has geometric dot-pattern background
- [ ] Stats section: counter animation works via IntersectionObserver
- [ ] Zero emoji anywhere in the page — all replaced with inline SVG
- [ ] All 6 feature cards have SVG icons in saffron circles
- [ ] All 3 classroom cards have SVG icons (no emoji)
- [ ] Board badges are styled shield SVGs, NOT plain letter circles
- [ ] Testimonials section exists with 3 cards
- [ ] Footer has real placeholder address, phone, and email
- [ ] WhatsApp links use `919876543210` (not XXXXXXXXXX)
- [ ] Floating WhatsApp button has pulse animation
- [ ] Scroll reveal works on all major sections
- [ ] All card hover effects working (`transform + box-shadow`)
- [ ] Mobile hamburger nav implemented and functional
- [ ] All text is responsive using `clamp()`
- [ ] No inline `style=""` with hardcoded colors — all using CSS variables
- [ ] Page is a single complete `.html` file with all CSS and JS embedded

---

## OUTPUT FORMAT

Return a **single, complete, copy-paste-ready `index.html` file**. Do not truncate. Do not use placeholder comments like `<!-- more content here -->`. The file must be 100% complete and runnable by opening in a browser with no external dependencies except the Google Fonts CDN link.

The file will be approximately 600–900 lines. Write every line.
