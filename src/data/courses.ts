import { TrackConfig, Achievement } from "../types";

export const COURSES_DATA: TrackConfig[] = [
  {
    id: "html",
    title: "HTML Architecture",
    description: "Learn to build semantic, accessible, and high-performance structural boundaries for modern web layouts.",
    colorClass: "from-orange-500 to-red-600 border-orange-500/30 text-orange-400",
    glowColor: "rgba(249, 115, 22, 0.45)",
    iconName: "Layout",
    lessons: [
      {
        id: "html-semantic",
        title: "Semantic Markup Structures",
        shortDesc: "Swap nested divs for rich landmarks like main, article, and section tag wrappers.",
        difficulty: "Beginner",
        xpCost: 100,
        markdownContent: `### 🧱 Semantic Landmarks: Web Accessibility & SEO

Modern HTML has migrated away from "div soup" (wrapping all page contents inside nested \`<div class="...">\` tags) towards **Semantic Elmement Tags**. Semantic tags tell both the browser and screen readers exactly what purpose their nested nodes fulfill.

#### Why use Semantic Tags?
1. **SEO Optimization**: Google crawler algorithms prioritize tags like \`<main>\`, \`<article>\`, and \`<header>\` over plain layouts.
2. **Accessibility (a11y)**: Blind or low-vision learners can easily skip directly between section boundaries on high-performance screen decoders.
3. **Clean Code**: Your scripts and stylesheets become much easier to read!

#### Comparison Checklist:
*   ❌ **Overuse of Div Blocks:**
    \`\`\`html
    <div class="top-nav">...</div>
    <div class="main-body">
      <div class="blog-entry">...</div>
    </div>
    \`\`\`
*   ✅ **Semantic Layout Standard:**
    \`\`\`html
    <nav>...</nav>
    <main>
      <article>...</article>
    </main>
    \`\`\`

#### Key Semantic elements of front-end layouts:
*   \`<header>\`: Top branding, headers, and quick-links.
*   \`<nav>\`: Dynamic menus, list-links, and indices.
*   \`<main>\`: The primary content block (only one per webpage!).
*   \`<section>\`: Group of themed content, should ideally include a header tag (\`<h2>\`).
*   \`<article>\`: Self-contained independent segments (like user reviews, news, etc.).
*   \`<footer>\`: Small copy text or contact links.`,
        interactiveCodeTemplate: {
          html: `<header class="header">
  <h2>WebLearn Academy Standard Banner</h2>
  <nav class="navigation">
    <a href="#" class="nav-link">Home</a>
    <a href="#" class="nav-link">Lessons</a>
    <a href="#" class="nav-link">Workspace</a>
  </nav>
</header>

<main class="main-box">
  <article class="info-card">
    <h3>Semantic HTML Challenge</h3>
    <p>We've loaded a semantic article inside your workspace! Customize this layout directly, or write a responsive section below.</p>
    <button class="cta-btn" onclick="alert('Congratulations! This button is highly responsive.')">Try Clicking Me</button>
  </article>
</main>

<footer class="footer">
  <p>© 2026 WebLearn Academy. Powered by Gemini Coder.</p>
</footer>`,
          css: `body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #0d1224;
  color: #f1f5f9;
  margin: 0;
  padding: 24px;
}

.header {
  border-bottom: 2px solid #1e293b;
  padding-bottom: 12px;
  margin-bottom: 24px;
}

.navigation a {
  color: #38bdf8;
  margin-right: 16px;
  text-decoration: none;
  font-weight: 500;
}

.navigation a:hover {
  text-decoration: underline;
}

.main-box {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.info-card h3 {
  color: #ec4899;
  margin-top: 0;
}

.cta-btn {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.footer {
  text-align: center;
  color: #64748b;
  padding-top: 24px;
  font-size: 14px;
}`,
          js: `// Interactive actions can go here!
console.log("Welcome to your Semantic HTML workspace!");`
        }
      },
      {
        id: "html-footer-image",
        title: "Building Footers & Adding Images",
        shortDesc: "Display modern visual media using responsive images and compose custom layout footer elements.",
        difficulty: "Beginner",
        xpCost: 110,
        markdownContent: `### 🖼️ Composing Footers and Displaying Responsively Aligned Images

Web layouts require clean visual media and persistent anchor sections. In this unit, we will dissect how to compose a semantic footer element and embed high-performance visual image elements onto your pages.

#### 1. Defining the Footer Block (\`<footer>\`)
A screen footer generally wraps branding, licensing info, legal links, copyright, and developer credit strings at the very bottom of your page.
\`\`\`html
<footer class="app-footer">
  <p>© 2026 Developer Portfolio. All Rights Reserved.</p>
</footer>
\`\`\`

#### 2. Displaying Media & Images (\`<img>\`)
The HTML \`<img>\` tag is an empty inline-element designed to render raster or vector images. Unlike structural container elements, it does not wrap other tags and has no closing bracket. It expects two critical parameters:
- **\`src\`**: The path or internet URL pointing to the image resource.
- **\`alt\`**: Alternative text that screens read aloud to blind visual users or display when network connections time out.

\`\`\`html
<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=450" alt="Sleek laptop exhibiting high-contrast lines of code" class="card-img" />
\`\`\`

#### Responsive Best Practices:
1. Always specify clean, descriptive \`alt\` text fields.
2. Pair your images with \`max-width: 100%\` and \`height: auto\` in CSS so they scale proportionately inside their parental wrappers!`,
        interactiveCodeTemplate: {
          html: `<main class="content-body">
  <h2>Aesthetic Modern Card</h2>
  <div class="card">
    <!-- Visual Image Element -->
    <img 
      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=450&auto=format&fit=crop" 
      alt="Developer workspace showing high-contrast code edits on a monitor" 
      class="card-img"
    />
    <div class="card-details">
      <h3>Visual Elements in HTML</h3>
      <p>This layout pairs a responsive image with custom content text wrappers inside an aesthetic component block.</p>
    </div>
  </div>
</main>

<!-- Standard Site Footer -->
<footer class="app-footer">
  <p>© 2026 WebLearn Academy Portal.</p>
  <div class="footer-meta">UTF-8 Compiler Verified</div>
</footer>`,
          css: `body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #f8fafc;
  color: #1e293b;
  margin: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}

.content-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  max-width: 320px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-details {
  padding: 16px;
}

.card-details h3 {
  margin: 0 0 8px 0;
  color: #0f172a;
  font-weight: 800;
}

.card-details p {
  color: #64748b;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}

.app-footer {
  text-align: center;
  border-top: 1px solid #e2e8f0;
  padding: 18px;
  margin-top: 24px;
}

.app-footer p {
  margin: 0;
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}

.footer-meta {
  font-size: 10px;
  font-family: monospace;
  color: #94a3b8;
  margin-top: 4px;
  text-transform: uppercase;
}`,
          js: `// Footer image interactive actions can go here
console.log("Footer and Image template initialized!");`
        }
      },
      {
        id: "html-forms",
        title: "Interactive Web Forms",
        shortDesc: "Create structured user registration forms with access labels and dynamic pattern validations.",
        difficulty: "Intermediate",
        xpCost: 150,
        markdownContent: `### 📨 Dynamic Web Forms & Safe Access Binds

User actions drive web application business value. Whether it is a chat input, user profile form, or login prompt, knowing how to implement accessible structures and inputs is a key front-end developer skillset.

#### Important Best Practices:
1. **Explicit Labeling**: Always link input tags to an explict \`<label>\` using the \`for\` and \`id\` matching attributes.
2. **Built-in HTML Validations**: Utilize \`required\`, \`minlength\`, and \`pattern\` input properties so browser compilers block submit events automatically when formats fail.
3. **Tab Indexes**: Never disrupt standard focus order. Screen users jump via TAB keys.

#### Code block representation:
\`\`\`html
<label for="student-email">Email Address</label>
<input type="email" id="student-email" required placeholder="name@domain.com">
\`\`\`

#### Essential Field Types:
*   \`type="text"\`: For standard textual elements.
*   \`type="email"\`: Validates email patterns.
*   \`type="password"\`: Safeguards display input on view screens.
*   \`type="number"\`: Restricts boundaries to numeric ranges.`,
        interactiveCodeTemplate: {
          html: `<div class="form-container">
  <h3>Enrollment Application</h3>
  <form id="enrollment-form" onsubmit="event.preventDefault(); submitForm();">
    <div class="form-group">
      <label for="student-name">Full Name *</label>
      <input type="text" id="student-name" required minlength="3" placeholder="Muaz Zainuri" />
    </div>

    <div class="form-group">
      <label for="student-level">Experience Level</label>
      <select id="student-level">
        <option value="none">Total Beginner</option>
        <option value="some">Some Background</option>
        <option value="advanced">Full-Stack Dev</option>
      </select>
    </div>

    <button type="submit" class="submit-btn font-sans">Submit Enrollment</button>
  </form>

  <div id="success-banner" class="hidden">
    🎉 Welcome aboard! Your enrollment registration was fully simulated.
  </div>
</div>`,
          css: `body {
  font-family: 'Inter', sans-serif;
  color: #fff;
  background-color: #090d16;
  padding: 24px;
}

.form-container {
  max-width: 450px;
  margin: 0 auto;
  background-color: #111827;
  border: 1px dashed #374151;
  border-radius: 8px;
  padding: 20px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #9ca3af;
}

input, select {
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #374151;
  background-color: #1f2937;
  color: white;
  box-sizing: border-box;
}

.submit-btn {
  background-color: #10b981;
  color: #fff;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.hidden {
  display: none;
}

#success-banner {
  margin-top: 16px;
  background-color: #064e3b;
  border: 1px solid #10b981;
  color: #34d399;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
}`,
          js: `function submitForm() {
  const name = document.getElementById('student-name').value;
  const level = document.getElementById('student-level').value;
  console.log("Submitted application for student", name, "with experience level", level);
  
  // Show success alert
  const banner = document.getElementById('success-banner');
  banner.style.display = 'block';
}`
        }
      }
    ],
    quizzes: [
      {
        id: "html-q1",
        trackId: "html",
        question: "Which HTML element is the most semantic choice for representing a self-contained layout widget, such as a blog snippet, review post, or chat frame?",
        type: "multichoice",
        options: ["<div>", "<section>", "<article>", "<span>"],
        correctAnswer: "<article>",
        explanation: "<article> is used for self-contained, independent thematic elements that could stand alone or be shared in an external feed."
      },
      {
        id: "html-q2",
        trackId: "html",
        question: "Which attribute correctly binds an HTML <label> tag element to its partner <input> tag element?",
        type: "multichoice",
        options: ["for", "id", "name", "target"],
        correctAnswer: "for",
        explanation: "The 'for' attribute of a label links it explicitly to the matching 'id' of an input element, enhancing accessibility and cursor trigger regions."
      }
    ]
  },
  {
    id: "css",
    title: "CSS Visual Styling",
    description: "Build eye-catching grids, beautiful flex alignments, and premium layout spaces using standard CSS variables.",
    colorClass: "from-blue-500 to-indigo-600 border-blue-500/30 text-blue-400",
    glowColor: "rgba(59, 130, 246, 0.45)",
    iconName: "Palette",
    lessons: [
      {
        id: "css-flexbox",
        title: "Harnessing CSS Flexbox",
        shortDesc: "Master spatial distributions and center elements dynamically along coordinate axes.",
        difficulty: "Beginner",
        xpCost: 120,
        markdownContent: `### 🧭 Master CSS Flexbox alignments

**CSS Flexbox (Flexible Box Layout)** handles layout alignments along a single direct coordinate axis (linear grids/columns). Flexbox takes code complexity out of vertical centering, margin overlays, and structural spacing.

#### The Magic Boilerplate:
To activate Flexbox, write this on the parent stylesheet:
\`\`\`css
.parent-container {
  display: flex;
}
\`\`\`

#### Controlling the Direction:
By default, children pack inside standard columns side-by-side. You can declare row styles or stack elements vertically using:
\`\`\`css
flex-direction: row;     /* Horizontal rows */
flex-direction: column;  /* Vertical stacks */
\`\`\`

#### Aligning things:
*   \`justify-content\`: controls alignment along the **Main Axis** (row horizontal layout).
    *   \`center\`: Centered in container middle.
    *   \`space-between\`: Pushes limits to far corners with inner margins.
    *   \`space-around\`: Adds margins with inner and outer offsets.
*   \`align-items\`: controls alignment along the **Cross Axis** (column vertical layout).
    *   \`center\`: Midpoint align.
    *   \`stretch\`: Expands items block limits to bounds.`,
        interactiveCodeTemplate: {
          html: `<div class="canvas-box">
  <h2>CSS Flexbox Playground</h2>
  <p>Toggle the dropdown styles below or tweak CSS variables live to witness real alignments!</p>

  <div class="row-controls">
    <button class="flex-ctrl" onclick="changeAlignment('flex-start')">Align Left</button>
    <button class="flex-ctrl" onclick="changeAlignment('center')">Center Align</button>
    <button class="flex-ctrl" onclick="changeAlignment('space-between')">Split Ends</button>
  </div>

  <div id="flex-parent" class="parent-sandbox">
    <div class="flex-child flex-blue">Panel 1</div>
    <div class="flex-child flex-pink">Panel 2</div>
    <div class="flex-child flex-yellow">Panel 3</div>
  </div>
</div>`,
          css: `body {
  font-family: 'Inter', sans-serif;
  color: #fff;
  background-color: #0b0f19;
  padding: 16px;
}

.canvas-box {
  background: #111a2e;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #1e293b;
}

.row-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
}

.flex-ctrl {
  background: #1e293b;
  color: #e2e8f0;
  border: 2px solid #334155;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.flex-ctrl:hover {
  background: #334155;
  color: #38bdf8;
}

.parent-sandbox {
  display: flex;
  justify-content: flex-start; /* Trigger modified dynamically */
  align-items: center;
  background-color: #070a13;
  min-height: 15vh;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #1e293b;
  transition: all 0.3s ease;
}

.flex-child {
  padding: 16px 24px;
  border-radius: 6px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  transition: transform 0.2s;
}

.flex-child:hover {
  transform: scale(1.05);
}

.flex-blue { background: #3b82f6; }
.flex-pink { background: #ec4899; }
.flex-yellow { background: #eab308; color: #000; }`,
          js: `function changeAlignment(justification) {
  const p = document.getElementById('flex-parent');
  p.style.justifyContent = justification;
  console.log("Updated flex parent justification to", justification);
}`
        }
      },
      {
        id: "css-hover",
        title: "Micro-Transitions & Hover States",
        shortDesc: "Implement beautiful cursor responses and smooth pseudo-class transition effects on interactive elements.",
        difficulty: "Beginner",
        xpCost: 110,
        markdownContent: `### 💫 Micro-Transitions & Interactive Hover States

Polished web applications are defined by responsive hover feedback. Active mouse hovers communicate interactivity, improve selection targets, and add sophisticated visual energy.

#### 1. The CSS \`:hover\` Pseudo-class
Pseudo-classes let you style elements dynamically based on user interaction states—such as positioning their pointer over any visual element:
\`\`\`css
.button-accent {
  background-color: #dc2626; /* Deep Red initial state */
}

.button-accent:hover {
  background-color: #b91c1c; /* Crimson color on hover state */
}
\`\`\`

#### 2. Smooth Micro-Animations via \`transition\`
Without transitions, pseudo-class values snap instantly and can feel jarring. Introducing the CSS \`transition\` property on the **base wrapper** (not on the \`:hover\` status) causes elements to ease fluidly:
\`\`\`css
.button-accent {
  background-color: #dc2626;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* Animate smoothly over 300ms */
}
\`\`\`

#### 3. Transforming Elements (\`transform\`)
You can lift, scale, or rotate layouts gently on hover to make elements feel responsive:
\`\`\`css
.hover-card:hover {
  transform: translateY(-6px) scale(1.02); /* Lifts standard cards up and scales slightly */
}
\`\`\``,
        interactiveCodeTemplate: {
          html: `<div class="container hover-playground">
  <h2>Interactive Hover Playground</h2>
  <p>Hover over the cards below to preview beautiful pseudo-class colors and transition mechanics in real-time!</p>

  <div class="card-grid">
    <!-- Lift Hover Card -->
    <div class="hover-card lift-card">
      <div class="emoji">🚀</div>
      <h3>Vertical Lift</h3>
      <p>This card utilizes translateY shift properties paired with soft CSS shadows.</p>
    </div>

    <!-- Color Glow Card -->
    <div class="hover-card glow-card">
      <div class="emoji">✨</div>
      <h3>Color & Glow</h3>
      <p>Position your cursor to scale visual border weights and cast custom red accents.</p>
    </div>
  </div>
</div>`,
          css: `body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #f1f5f9;
  color: #1e293b;
  padding: 24px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.container {
  max-width: 600px;
  text-align: center;
}

h2 {
  color: #0f172a;
  font-weight: 800;
  margin-bottom: 8px;
}

p {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 24px;
}

.card-grid {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.hover-card {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 24px;
  flex: 1;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.emoji {
  font-size: 32px;
  margin-bottom: 12px;
  transition: transform 0.3s ease;
}

.hover-card h3 {
  margin: 8px 0;
  color: #0f172a;
  font-weight: 800;
  font-size: 16px;
}

.hover-card p {
  color: #64748b;
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
}

/* Hover Mechanics definitions */
.lift-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.1);
}

.lift-card:hover .emoji {
  transform: rotate(15deg) scale(1.15);
}

.glow-card:hover {
  border-color: #dc2626;
  box-shadow: 0 10px 25px rgba(220, 38, 38, 0.12);
}

.glow-card:hover .emoji {
  transform: scale(1.25);
}`,
          js: `// Hover interaction sandbox active!
console.log("Hover interaction sandbox active!");`
        }
      },
      {
        id: "css-grid",
        title: "2D CSS Grid Layouts",
        shortDesc: "Set up columns, custom row tracks, and build adaptive bento box dashboards.",
        difficulty: "Intermediate",
        xpCost: 180,
        markdownContent: `### 🏁 Grid Engine: Multi-Dimensional Mastery

While CSS Flexbox controls items line-by-line, **CSS Grid** is a full 2-dimensional grid matrix. You command rows and columns simultaneously with incredible layout precision.

#### Defining standard matrices:
\`\`\`css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal sections */
  grid-template-rows: auto;
  gap: 1.5rem; /* modern margins replace border tables */
}
\`\`\`

#### Responsive Columns via \`auto-fit\`:
Stop utilizing standard fixed media query breakpoints. Grid can reflow column cards automatically!
\`\`\`css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
\`\`\`
*This statement builds as many 250px columns as fit in the container screen width, scaling leftover spaces dynamically!*

#### Grid Spanning:
You can instruct grid cards to stretch over multiple columns or row tracks:
\`\`\`css
.hero-card {
  grid-column: span 2; /* takes 2 columns width */
}
\`\`\``,
        interactiveCodeTemplate: {
          html: `<div class="grid-box">
  <h3>The Bento Box Dashboard Grid</h3>
  <p>Change cell layouts by altering stylesheet structures. The cells wrap responsive boundaries automatically.</p>

  <div class="bento-layout">
    <section class="item item-large">⭐ Banner Callout (Col Span 2)</section>
    <section class="item">📈 Stats Widget</section>
    <section class="item">🔔 Updates Feed</section>
    <section class="item item-wide">💬 User Feedback (Col Span 2)</section>
  </div>
</div>`,
          css: `body {
  font-family: 'Inter', sans-serif;
  color: #fff;
  background-color: #0f172a;
  padding: 20px;
}

h3 {
  color: #38bdf8;
  margin-top: 0;
}

.bento-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.item {
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  font-weight: 500;
}

.item-large {
  grid-column: span 2;
  background: linear-gradient(135deg, #1e1b4b, #311042);
  border-color: #ec4899;
}

.item-wide {
  grid-column: span 2;
  background-color: #0d1b2a;
  border-color: #10b981;
}`,
          js: `console.log("Welcome to Bento Box Matrix playground!");`
        }
      }
    ],
    quizzes: [
      {
        id: "css-q1",
        trackId: "css",
        question: "Which flexbox CSS property manages alignments along the primary main axis coordinate?",
        type: "multichoice",
        options: ["align-items", "justify-content", "flex-direction", "align-content"],
        correctAnswer: "justify-content",
        explanation: "justify-content is designed to allocate and align spatial intervals of flex children on the primary row/column direction axis."
      },
      {
        id: "css-q2",
        trackId: "css",
        question: "Which value tells CSS Grid to generate responsive, wrapping columns without relying on explicit CSS media break queries?",
        type: "multichoice",
        options: ["repeat(auto-fit, minmax(200px, 1fr))", "repeat(3, 1fr)", "grid-area", "display: flex"],
        correctAnswer: "repeat(auto-fit, minmax(200px, 1fr))",
        explanation: "Combining auto-fit and minmax causes the grid column templates to pack container bounds and wrap to lines safely as elements shrink."
      }
    ]
  },
  {
    id: "javascript",
    title: "JavaScript Logic",
    description: "Write clean variables, understand modern arrow functions, and react instantly to active mouse actions in the DOM.",
    colorClass: "from-yellow-500 to-amber-600 border-yellow-500/30 text-yellow-400",
    glowColor: "rgba(234, 179, 8, 0.45)",
    iconName: "Cpu",
    lessons: [
      {
        id: "js-events",
        title: "Event Binds & Custom DOMs",
        shortDesc: "Capture mouse gestures, key inputs, and handle data states cleanly without page refreshes.",
        difficulty: "Intermediate",
        xpCost: 150,
        markdownContent: `### ⚡ Capturing Dynamic User Events: Event Binds

Event listeners form the basis of all dynamic logic on the web. They intercept actions – clicks, scroll coordinates, form submits, key entries – and run JS code loops in response.

#### Modern Syntax: \`addEventListener\`
Never write old-school inline tags like \`onclick="..."\` if you can avoid it. Instead, decouple markup boundaries by using event bindings:
\`\`\`javascript
const registerBtn = document.querySelector('.cta-btn');

registerBtn.addEventListener('click', (event) => {
  console.log("User triggered button event:", event.target);
  // Execute interactive logic
});
\`\`\`

#### Preventing default browser events on Forms:
Standard HTML form tags enforce complete web page requests when clicked. Stop this inside SPA applications by specifying:
\`\`\`javascript
const authForm = document.getElementById('login-form');
authForm.addEventListener('submit', (element) => {
  element.preventDefault(); // Prevents reloading!
});
\`\`\`

#### Frequently Used DOM Events:
*   \`click\`: Primary click selectors.
*   \`keydown\` / \`keyup\`: Listens to key presses on keyboards.
*   \`change\`: Dispatches as form option values shift.`,
        interactiveCodeTemplate: {
          html: `<div class="box-wrap">
  <h3>Interactive Events Portal</h3>
  <p>Observe click and drag coordinates live inside this card logger!</p>

  <div class="interactive-pad" id="touch-pad">
    Move Hover Coordinates Here
  </div>

  <div class="status-tracker">
    <p>Last Activity: <span id="event-feed" class="highlight-mono">None</span></p>
    <p>Coordinate Matrix: <span id="coord-feed" class="highlight-mono">X: 0, Y: 0</span></p>
  </div>
</div>`,
          css: `body {
  font-family: 'Inter', sans-serif;
  color: #fff;
  background-color: #0c0f1d;
  padding: 16px;
}

.box-wrap {
  background: #111827;
  padding: 24px;
  border-radius: 12px;
  border: 2px dashed #374151;
}

.interactive-pad {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(236, 72, 153, 0.1));
  border: 1px solid #4b5563;
  color: #9cb3f7;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-weight: 600;
  cursor: crosshair;
  user-select: none;
}

.status-tracker {
  margin-top: 16px;
  padding: 12px;
  background-color: #030712;
  border-radius: 6px;
}

.highlight-mono {
  font-family: 'JetBrains Mono', monospace;
  color: #10b981;
}`,
          js: `const pad = document.getElementById('touch-pad');
const feed = document.getElementById('event-feed');
const coord = document.getElementById('coord-feed');

pad.addEventListener('mouseenter', () => {
  feed.textContent = "Cursor Entered Block";
});

pad.addEventListener('mouseleave', () => {
  feed.textContent = "Cursor Left Block";
  coord.textContent = "X: 0, Y: 0";
});

pad.addEventListener('mousemove', (e) => {
  // Get offset inside pad bounding box
  const rect = pad.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);
  
  feed.textContent = "Drifting Pointer";
  coord.textContent = "X: " + x + ", Y: " + y;
});`
        }
      },
      {
        id: "js-hover",
        title: "Dynamic Mouse Listeners",
        shortDesc: "Trigger dynamic layouts and coordinate metrics via explicit pointer and hover event bounds.",
        difficulty: "Beginner",
        xpCost: 110,
        markdownContent: `### ⚡ Interactive JavaScript Pointer Events & Hovers

While CSS \`:hover\` is standard for styling adjustments, **JavaScript mouse event parameters** let you orchestrate complex state shifts, trigger API tasks, record interaction metrics, or toggle DOM elements contextually.

#### 1. Listening to Hover Boundaries
JavaScript relies on two core event registrations to monitor pointer interactions:
- **\`mouseenter\`**: Fires immediately as the cursor coordinates step inside the element.
- **\`mouseleave\`**: Dispatched as the layout pointer steps outward.

\`\`\`javascript
const workspaceCard = document.querySelector('.card-element');

workspaceCard.addEventListener('mouseenter', () => {
  workspaceCard.classList.add('glow-effect'); // Enforce hover state
});

workspaceCard.addEventListener('mouseleave', () => {
  workspaceCard.classList.remove('glow-effect');
});
\`\`\`

#### 2. Tracking coordinates live
You can track the cursor spot relative to HTML tags using mouse event properties (\`clientX\`, \`clientY\`):
\`\`\`javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  // Calculate relative coordinates
});
\`\`\``,
        interactiveCodeTemplate: {
          html: `<div class="interactive-panel">
  <h3>JavaScript Mouse Interactions</h3>
  <p>Interact with the card below. Event listeners are active, modifying layout styles dynamically upon cursor movements!</p>

  <div class="interaction-card" id="target-js-card">
    <div class="visual-badge" id="state-badge">Inactive State</div>
    <h4>Hover Over This Workspace</h4>
    <p class="logs">Interactive Tracker coordinates: <span id="coordinate-tracker">X: 0, Y: 0</span></p>
  </div>
</div>`,
          css: `body {
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #f8fafc;
  color: #1e293b;
  padding: 24px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
}

.interactive-panel {
  max-width: 500px;
  text-align: center;
}

h3 {
  color: #0f172a;
  font-weight: 800;
  margin: 0 0 6px 0;
}

p {
  color: #64748b;
  font-size: 13px;
  margin-bottom: 24px;
}

.interaction-card {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 32px;
  cursor: pointer;
  position: relative;
  transition: all 0.4s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.visual-badge {
  display: inline-block;
  background: #64748b;
  color: white;
  font-size: 11px;
  font-family: monospace;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  text-transform: uppercase;
  transition: all 0.3s;
}

.interaction-card h4 {
  margin: 0 0 8px 0;
  color: #0f172a;
  font-weight: 800;
}

.logs {
  font-size: 12px !important;
  color: #64748b;
  margin: 0;
  font-family: monospace;
}

#coordinate-tracker {
  color: #dc2626;
  font-weight: bold;
}

/* JS-activated class overlays */
.card-hover-active {
  border-color: #dc2626;
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 24px rgba(220, 38, 38, 0.08);
}

.badge-hover-active {
  background: #dc2626;
}`,
          js: `const card = document.getElementById('target-js-card');
const badge = document.getElementById('state-badge');
const coords = document.getElementById('coordinate-tracker');

card.addEventListener('mouseenter', () => {
  card.classList.add('card-hover-active');
  badge.classList.add('badge-hover-active');
  badge.textContent = "Active Hover";
});

card.addEventListener('mouseleave', () => {
  card.classList.remove('card-hover-active');
  badge.classList.remove('badge-hover-active');
  badge.textContent = "Inactive State";
  coords.textContent = "X: 0, Y: 0";
});

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);
  coords.textContent = "X: " + x + ", Y: " + y;
});`
        }
      }
    ],
    quizzes: [
      {
        id: "js-q1",
        trackId: "javascript",
        question: "Which JavaScript function prevents the default browser reload action from stopping form submission scripts?",
        type: "multichoice",
        options: ["event.preventDefault()", "event.stopPropagation()", "event.haltAction()", "console.clear()"],
        correctAnswer: "event.preventDefault()",
        explanation: "event.preventDefault() blocks the default, built-in action of an event trigger, such as page reboots on submission of form fields."
      }
    ]
  }
];



export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "ach-welcome",
    title: "First Steps",
    description: "Welcome to WebLearn Academy. Explore lessons to activate your learning trail.",
    iconName: "Gift",
    conditionDescription: "Explore the academy workspace dashboard."
  },
  {
    id: "ach-coder",
    title: "Syntactic Sandbox",
    description: "Successfully run code in the real-time split-screen builder.",
    iconName: "Terminal",
    conditionDescription: "Trigger 'Run Code' inside the Playground."
  },
  {
    id: "ach-tutor",
    title: "AI Co-pilot Binds",
    description: "Start a chat layout conversation with the AI Code Tutor.",
    iconName: "Sparkles",
    conditionDescription: "Submit a question to the AI Coding Companion."
  },
  {
    id: "ach-grad",
    title: "Academy Laureate",
    description: "Score perfect marks across multiple quizzes and unlock your academy certificate.",
    iconName: "Award",
    conditionDescription: "Complete quizzes successfully to unlock your Certificate of Front-End Mastery."
  }
];
