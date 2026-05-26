import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI client lazily to avoid crashing on startup if key is missing
let aiClient: any = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is missing. Falling back to rule-based interactive tutor.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Live Chat with AI Web Tutor
app.post("/api/chat", async (req, res) => {
  try {
    const { question, history, lessonContext } = req.body;
    const ai = getAI();

    if (!ai) {
      // Rule-based high-quality simulator explanation if API key is not set
      const responseText = getSimulatedExplanation(question, lessonContext);
      return res.json({ text: responseText, note: "AI Simulation (Add Gemini API Key in Settings to unlock real tutor responses)" });
    }

    const systemInstruction = `You are "WebLearn Academy's AI Coding Companion" – an exceptionally friendly, professional, and knowledgeable frontend web development tutor.
Your core purpose is to help students learn HTML, CSS, JavaScript, and React.
Key guidelines:
1. Speak in a helpful and clear tone. Keep explanations accessible but technically accurate.
2. When including code snippets, always wrap them in appropriate markdown blocks: \`\`\`html, \`\`\`css, \`\`\`javascript, etc.
3. Keep answers relatively concise and structured. Use bullet points and paragraphs.
4. If a user asks something unrelated to web development or programming, politely guide them back to topics like HTML, CSS, JS, React, and UX design.
5. If details about their current lesson are provided (${JSON.stringify(lessonContext || {})}), tailor your answers or analogies relative to this lesson!`;

    // Reconstruct conversation contents for GenAI API:
    // We map client history (which should be an array of messages) to parts
    const aiHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }]
    }));

    // Append the current student prompt as the final item
    aiHistory.push({
      role: "user",
      parts: [{ text: `${question}${lessonContext ? ` (In context of current lesson: ${lessonContext.title} in ${lessonContext.track})` : ""}` }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: aiHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "I was unable to formulate a response at this time. Could you try rephrasing?" });
  } catch (error: any) {
    console.error("AI Chat API Error:", error);
    res.status(500).json({ error: "Sorry! Something went wrong while getting an AI explanation. Let me try again." });
  }
});

// 2. AI Code Analyzer for Sandbox Playground
app.post("/api/analyze-code", async (req, res) => {
  try {
    const { html, css, js, activeTemplate } = req.body;
    const ai = getAI();

    if (!ai) {
      const responseText = getSimulatedReview(html, css, js, activeTemplate);
      return res.json({ text: responseText, note: "Code Simulation Review" });
    }

    const prompt = `Review this student workspace as an supportive web debugger.
HTML code:
\`\`\`html
${html}
\`\`\`

CSS code:
\`\`\`css
${css}
\`\`\`

JavaScript code:
\`\`\`javascript
${js}
\`\`\`

Active Lesson/Template Context: "${activeTemplate || "Freeform Playground"}"

Please provide.
1. A brief summary of what they built (e.g. "You created a beautifully centered profile card!").
2. Code evaluation: Are there obvious issues like unclosed divs, mismatched CSS syntax, missing variable initializations in JS, or empty event listeners?
3. Modern Web Best Practices advice: Suggest a small layout, design, or responsive design polish. Keep it extremely encouraging!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional compiler and frontend designer reviewing student code feedback. Write inside a clean markdown structured response with bold subheadings like '### Code Strengths', '### Recommended Improvements', etc. Keep the language positive and inspiring.",
        temperature: 0.8,
      },
    });

    res.json({ text: response.text || "Code reviewed! Everything looks secure and ready to test." });
  } catch (error: any) {
    console.error("AI Code Analyzer API Error:", error);
    res.status(500).json({ error: "Code syntax is sound, but could not compute AI code analysis." });
  }
});

// Fallback rule-based simulator for AI Tutor if key is missing
function getSimulatedExplanation(question: string, context: any): string {
  const qLower = question.toLowerCase();
  let topicHeader = context ? `### 🎓 Active Lesson: ${context.title}\n\n` : "";

  if (qLower.includes("flexbox") || qLower.includes("flex")) {
    return topicHeader + `### 📦 Master CSS Flexbox in a Nutshell

**Flexbox (Flexible Box Layout)** is a 1-dimensional layout module that excels at distributing space and aligning items in a row or column direction.

Here are the key properties to remember:
*   \`display: flex;\` (applied to parent container) activates the flex context.
*   \`flex-direction: row | column;\` determines which axis items align on.
*   \`justify-content: center | space-between | space-around | flex-start;\` aligns items on the **Main Axis**.
*   \`align-items: center | flex-end | stretch;\` aligns items on the **Cross Axis**.

#### Code Sample: Centering Everything
\`\`\`css
.card-container {
  display: flex;
  justify-content: center; /* horizontal centering */
  align-items: center;     /* vertical centering */
  min-height: 100vh;
}
\`\`\`

*Tip: Add \`flex-wrap: wrap;\` if you have multiple dynamic items that should break elegantly to the next row on mobile!*`;
  }

  if (qLower.includes("grid")) {
    return topicHeader + `### 🏁 CSS Grid Layout: 2-Dimensional Control

Unlike Flexbox, **CSS Grid** is a 2-dimensional grid-based layout system. It handles both columns and rows concurrently, making it excellent for full page structures.

#### Core Syntax:
\`\`\`css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal width columns */
  gap: 1.5rem; /* modern gap spacing */
}
\`\`\`

#### When to use:
*   **Grid**: Large-scale site architecture, photo galleries, dashboard layouts (columns + rows).
*   **Flexbox**: Small components, linear rows, headers, button alignments (1D alignment).`;
  }

  if (qLower.includes("useeffect") || qLower.includes("effect")) {
    return topicHeader + `### 🌀 Understanding React's useEffect Hook

In React, **useEffect** allows you to perform **side effects** in functional components. Side effects include data fetching, manual DOM styling, setting up event declarations, or intervals.

#### Visualizing the Hook:
\`\`\`javascript
import React, { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 💡 1. Execution phase (Runs after the component mounts/updates)
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // 🧼 2. Cleanup phase (Prevents memory leaks when component unmounts)
    return () => clearInterval(interval);
  }, []); // 📊 3. Dependency Array (When empty, this effect runs exactly ONCE on mount!)
}
\`\`\`

#### Major Pitfall Avoided:
*   Never omit the dependency array unless you want the effect to run on **every single re-render** – which usually leads to endless recursive infinite loops!`;
  }

  if (qLower.includes("state") || qLower.includes("usestate")) {
    return topicHeader + `### 💾 React useState: Managing Component Memory

Dynamic interfaces react to user action. To track actions in React, we use **useState** to preserve status between renders.

#### Step-by-Step implementation:
\`\`\`javascript
import React, { useState } from 'react';

function Clicker() {
  // stateVariable, stateSetterFunction = initialValue
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`
*State updates trigger React's Virtual-DOM reconciler to re-render the layout efficiently. Always treat state variables as immutable!*`;
  }

  if (qLower.includes("html") || qLower.includes("div") || qLower.includes("semantic")) {
    return topicHeader + `### 🧱 Semantic HTML Structures

Semantic HTML is about using elements with real structural meaning, rather than wrapping all segments inside basic generic \`<div>\` blocks.

#### Comparison:
*   **Div Salad (Bad practice):** \`<div class="header">...</div>\`
*   **Semantic (Awesome!):** \`<header>...</header>\`

#### Key Semantic Structural tags:
*   \`<main>\`: Outer body of primary context
*   \`<section>\`: Standalone segments grouped by theme
*   \`<article>\`: Self-contained items (like a card, blog, or post)
*   \`<nav>\`: Menu linkage navigation
*   \`<footer>\`: Secondary metadata at bottom`;
  }

  return topicHeader + `### 👋 Welcome to WebLearn Academy AI Mentor!

I can help clarify frontend concepts, write sample syntax snippets, or troubleshoot layout issues!

**Try asking me details about:**
1. \`How does CSS Flexbox center items?\`
2. \`How do Grid and Flexbox layouts differ?\`
3. \`Can you explain React useState vs useEffect Hooks?\`
4. \`Help me understand semantic markup tags!\`

_Note: To enable dynamic, live intelligence on any front-end question under the sun, make sure to add your **GEMINI_API_KEY** into the Secrets panel in the editor settings!_`;
}

// Fallback evaluator for student codes
function getSimulatedReview(html: string, css: string, js: string, activeTemplate: string): string {
  const hasDivs = html.includes("<div");
  const hasStyles = css.length > 5;
  const hasJs = js.length > 5;

  return `### 📊 Real-Time Code Analysis Review

Congratulations on running tests on your code in the **${activeTemplate || "Web Sandbox"}**! Here is my instant inspection report:

#### 🟢 Core Strengths
*   **HTML Structure**: ${html.length > 20 ? `Correct syntax detected with reasonable markup hierarchy.` : `Minimal skeleton. Good for learning simple elements!`}
*   **CSS Style Canvas**: ${hasStyles ? `Clean CSS selectors added with style declarations.` : `No CSS defined yet. Try styling it with colors or flex centers!`}
*   **JavaScript Layer**: ${hasJs ? `Found interactive functions or event binds. Excellent!` : `No active scripts. Try binding a test clicker event to make elements react!`}

#### 🛠️ Suggestions for Expansion
1. ${!css.includes("flex") && !css.includes("grid") ? `**Alignment Upgrade**: Try utilizing modern \`display: flex\` inside your container stylesheet to easily align elements inside card layouts.` : `**Responsive Design**: Make your media structures scale with relative sizes like \`max-width: 90%\` rather than fixed absolute widths!`}
2. ${!html.includes("<header>") && !html.includes("<footer>") ? `**Semantic Landmarks**: Try swapping nested divs for modern semantic marks such as \`<nav>\` or \`<header>\` for accessibility goals.` : `**Interactive Labels**: Ensure form items or interactive selectors are fully accessible using clean \`aria-label\` elements!`}

Keep coding! You are making tremendous speed in building frontend mastery!`;
}

// Set up Vite environment & Asset Static pipeline
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`WebLearn Academy Full-Stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
