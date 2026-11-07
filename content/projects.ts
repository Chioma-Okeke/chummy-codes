// All projects live here. Order in this array = order on the Work page.
//
// - `featured: true`  → also shown in "Selected Projects" on the home page.
// - `caseStudy`       → gives the project its own page at /work/<slug>.
//                       Without it, the card links to `link.href` instead.
// - `icon`            → placeholder glyph shown until you add an `image`.

export type ProjectCategory = "engineering" | "security" | "experiments"

export type CaseStudy = {
  tagline?: string // handwritten note next to the title
  showcaseCaption?: string
  facts: { label: string; value: string }[]
  overview: { heading: string; pullQuote?: string; body: string[] }
  features?: { heading: string; items: { title: string; body: string }[] }
  // Screenshots shown after the features. width/height are the file's pixel size.
  gallery?: {
    heading: string
    // wide: spans both columns. natural: small image, centered at its own size (never stretched)
    items: {
      src: string
      alt: string
      caption: string
      width: number
      height: number
      wide?: boolean
      natural?: boolean
    }[]
  }
  techList?: string[] // full "Built with" list, shown after the features
  architecture?: {
    heading: string
    tags?: string[]
    diagram?: string // image path
    decisions: { title: string; body: string }[]
    code?: { label: string; note?: string; snippet: string }
  }
  challenge?: {
    label?: string // eyebrow text; defaults to "Challenges" (with impact) or "Outcome"
    heading: string
    body: string[]
    impact?: { label: string; value: string; caption: string; footnote?: string }
  }
  lessons?: { title: string; body: string }[]
}

export type Project = {
  slug: string
  title: string
  category: ProjectCategory
  label: string // small caps line, e.g. "Software Engineering"
  year?: string
  summary: string
  subtitle?: string // italic line under the title (home page)
  stack: string[]
  icon?: "shirt" | "file-check" | "handshake" | "cpu" | "leaf" | "fingerprint" | "code"
  image?: string
  // Which part of `image` stays visible when a card crops it (default "left-top")
  imagePosition?: "left-top" | "right-top" | "top"
  // The image's pixel size. When set, the case study shows it uncropped.
  imageSize?: { width: number; height: number }
  imageTone?: "light" | "blush" | "dark"
  featured?: boolean
  link?: { label: string; href: string } // used when there is no case study
  caseStudy?: CaseStudy
}

export const categories: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "engineering", label: "Software Engineering" },
  { value: "security", label: "Security & Research" },
  { value: "experiments", label: "Experiments" },
]

export const projects: Project[] = [
  {
    slug: "laundry-inventory",
    title: "Laundry Inventory Management System",
    category: "engineering",
    label: "Software Engineering",
    summary:
      "A full-stack inventory and operations platform centralizing customer, order, item-tracking, and business records across role-based workflows.",
    stack: ["Next.js", "TypeScript", "MongoDB"],
    icon: "shirt",
    image: "/LaundryInventory/admin-dashboard.png",
    imageSize: { width: 2878, height: 1460 },
    featured: true,
    caseStudy: {
      tagline: "Scale without the chaos.",
      showcaseCaption: "A full-stack workflow solution",
      facts: [
        { label: "Role", value: "Full-Stack Engineer" },
        { label: "Stack", value: "Next.js, TypeScript, MongoDB" },
        { label: "Security", value: "JWT, RBAC, Mongoose" },
        { label: "Efficiency", value: "+40% Staff Output" },
      ],
      overview: {
        heading: "The Problem of Manual Records.",
        pullQuote:
          "For a busy laundry, the gap between intake and delivery is a stack of handwritten records and a lot of guesswork.",
        body: [
          "Customer details, orders, item tracking, and business records were kept by hand, which made items hard to trace and slowed staff down at every step.",
          "The goal was a single, secure platform with RESTful services that centralized those records and gave staff and administrators the right tools for their role.",
        ],
      },
      gallery: {
        heading: "Inside the app",
        items: [
          {
            src: "/LaundryInventory/login.png",
            alt: "Internal Portal login screen asking for email and password",
            caption: "Staff and admins sign in to a single internal portal.",
            width: 2874,
            height: 1466,
          },
          {
            src: "/LaundryInventory/portal-selection.png",
            alt: "Choose Your Portal screen with Admin Portal and Staff Portal options",
            caption: "Admins choose which portal to enter; staff go straight to theirs.",
            width: 2870,
            height: 1468,
          },
          {
            src: "/LaundryInventory/staff-dashboard.png",
            alt: "Staff dashboard with Take new order and Print Receipts actions above a recent orders table",
            caption: "Staff see only what they need: take orders and print receipts and item tags.",
            width: 2874,
            height: 1460,
            wide: true,
          },
        ],
      },
      architecture: {
        heading: "Architecture & Core Decisions",
        tags: ["REST API", "JWT + RBAC"],
        decisions: [
          {
            title: "Authentication & Roles",
            body: "JWT-based authentication with role-based authorization separating Staff and Admin workflows, so each person sees exactly what their role needs.",
          },
          {
            title: "Automated Receipts & Tags",
            body: "Receipts and item tags are generated automatically from each order, replacing manual recordkeeping and keeping every item traceable.",
          },
        ],
        code: {
          label: "Example: role check in Next.js middleware",
          note: "Securing the perimeter",
          snippet: `// Example RBAC check in Next.js middleware
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const { role } = token;
  const path = req.nextUrl.pathname;

  if (path.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.rewrite(new URL('/403', req.url));
  }
}`,
        },
      },
      challenge: {
        heading: "From Paper to Platform.",
        body: [
          "Replacing a manual process means the new system has to be faster than the habit it replaces. Automating receipts and tags removed the most repetitive steps entirely.",
        ],
        impact: {
          label: "Measured impact",
          value: "40%",
          caption: "Improvement in staff efficiency.",
        },
      },
    },
  },
  {
    slug: "agenttrust",
    title: "AgentTrust",
    category: "security",
    label: "AI Security · PayPal AI Hackathon",
    subtitle: "Trust before a transaction.",
    summary:
      "An AI-agent security and governance platform in development for the PayPal AI Hackathon, focused on monitoring financial actions and enforcing spending and authorization policies before execution.",
    stack: ["AI Agents", "Spending Controls", "Authorization Policies"],
    icon: "fingerprint",
    imageTone: "blush",
    caseStudy: {
      facts: [
        { label: "Event", value: "PayPal AI Hackathon" },
        { label: "Focus", value: "AI-Agent Security & Governance" },
        { label: "Controls", value: "Spending & Authorization Policies" },
        { label: "Status", value: "In Development" },
      ],
      overview: {
        heading: "Trust before a transaction.",
        body: [
          "When an AI agent can initiate financial actions, its decisions need clear boundaries: what it is authorized to do, how much it can spend, and which actions must be blocked.",
          "I'm building AgentTrust for the PayPal AI Hackathon to bring those boundaries into the execution workflow. The platform is designed to monitor agent-driven financial actions, enforce spending and authorization policies, and block unauthorized transactions before they execute.",
        ],
      },
      features: {
        heading: "What I'm building",
        items: [
          {
            title: "Financial-action monitoring",
            body: "Make the financial actions an AI agent attempts visible, so they can be evaluated against the permissions it has been given.",
          },
          {
            title: "Spending & authorization policies",
            body: "Check proposed actions against spending constraints and authorization rules before allowing execution.",
          },
          {
            title: "Pre-execution enforcement",
            body: "Block unauthorized transactions before they happen, making policy enforcement part of the action workflow.",
          },
        ],
      },
      challenge: {
        label: "In Development",
        heading: "From agent decisions to authorized actions.",
        body: [
          "The current focus is building and validating the workflow between an agent's proposed financial action, the policies that govern it, and the decision to allow or block execution.",
          "AgentTrust is an active hackathon project. Implementation details and results will be added as the prototype develops.",
        ],
      },
    },
  },
  {
    slug: "bridgeup",
    title: "BridgeUp",
    category: "engineering",
    label: "Product Engineering",
    subtitle: "Peer support for first-generation college students.",
    summary:
      "A Chrome extension that puts peer accountability and campus resources inside Canvas, pairing first-gen students with a partner, live check-ins and chat, and AI that points to the one ASU resource they need.",
    stack: ["Next.js", "Supabase", "Claude Haiku", "Chrome MV3"],
    icon: "handshake",
    image: "/bridgeUp/onboarding-home.png",
    imagePosition: "right-top",
    imageSize: { width: 2846, height: 1626 },
    caseStudy: {
      tagline: "Nobody should have to figure it out alone.",
      facts: [
        { label: "Platform", value: "Chrome Extension + Web App" },
        { label: "Stack", value: "Next.js 16, React 19, TypeScript" },
        { label: "Data & Realtime", value: "Supabase (Postgres + Realtime)" },
        { label: "AI", value: "Claude Haiku 4.5" },
      ],
      overview: {
        heading: "First-gen students don't know what they don't know.",
        pullQuote:
          "Universities have lots of resources, but they're scattered and hard to discover, and students rarely seek them out.",
        body: [
          "Many first-generation students don't know what TRIO is, or that tutoring is free, and they often feel uncomfortable asking. Meanwhile, research on student retention keeps showing that peer connection and accountability help students stay in school.",
          "So I put both the peer connection and the resources inside Canvas, the place students already open every day.",
        ],
      },
      features: {
        heading: "What it does",
        items: [
          {
            title: "Onboarding inside Canvas",
            body: "When a student opens their Canvas dashboard, a BridgeUp panel appears. They pick a name and avatar, the course that makes them nervous, their goal, comfort level, whether they're first-gen, and a check-in day, then get paired with a partner.",
          },
          {
            title: "Course-aware widget",
            body: "On a course page, the widget reads the course ID from the URL, so it knows where the student is. It can flag when they're struggling and suggest booking help.",
          },
          {
            title: "Weekly check-ins",
            body: "A quick mood check each week. If either partner says they're struggling, the other gets alerted.",
          },
          {
            title: "Live 1:1 chat",
            body: "Messaging with your accountability partner that updates in real time.",
          },
          {
            title: "AI Help",
            body: "Describe what's wrong and get one specific ASU resource, such as tutoring, the Writing Center, counseling, or TRIO, with a link and a concrete next step.",
          },
          {
            title: "Milestones",
            body: "Semester guidance that tracks which resources a student has already used.",
          },
        ],
      },
      architecture: {
        heading: "Why these technologies",
        tags: ["Manifest V3", "Supabase Realtime"],
        decisions: [
          {
            title: "Chrome Extension (Manifest V3)",
            body: "I can't change Canvas itself, and schools wouldn't let me. An extension adds features on top of it without needing permission from the school. MV3 is Chrome's current standard as MV2 is phased out.",
          },
          {
            title: "Content script + iframe",
            body: "The content script detects the dashboard or a course page and extracts the course ID. The UI is a React app loaded in an iframe, so my styles and Canvas's never collide, and I ship UI updates by redeploying the web app, with no extension update needed.",
          },
          {
            title: "MutationObserver",
            body: "Canvas changes pages without a full reload, so the extension watches for URL changes and re-injects the right widget.",
          },
          {
            title: "Next.js API route for AI",
            body: "One framework for the widgets and the backend, deployed on Vercel. The Claude API key stays on the server; the browser never sees it.",
          },
          {
            title: "Supabase Realtime",
            body: "Postgres plus real-time updates out of the box. I subscribe to database inserts, so messages and check-ins appear instantly with no polling.",
          },
          {
            title: "Claude Haiku, constrained",
            body: "Fast and cheap, which is what short, focused answers need. A system prompt limits it to exactly one resource per answer, a peer-like tone, and counseling first whenever distress comes up.",
          },
        ],
        code: {
          label: "Simplified example: re-injecting on Canvas navigation",
          note: "Canvas never reloads",
          snippet: `// Content script - Canvas is a single-page app,
// so watch for URL changes and swap the widget.
let lastUrl = location.href;

new MutationObserver(() => {
  if (location.href === lastUrl) return;
  lastUrl = location.href;

  const courseId = location.pathname.match(/\\/courses\\/(\\d+)/)?.[1];
  injectWidget(courseId ? { view: "course", courseId } : { view: "dashboard" });
}).observe(document.body, { childList: true, subtree: true });`,
        },
      },
      challenge: {
        heading: "What success looks like.",
        body: [
          "For students: fewer “I didn't know that existed” moments, resources used earlier instead of after they're already failing, and less isolation because a peer notices when they're struggling.",
          "For schools: better retention and persistence among first-gen students, plus visibility into where students struggle. Success would show up as more students using resources, high check-in completion rates, and better term-to-term retention for students who used BridgeUp compared with those who didn't.",
        ],
      },
      gallery: {
        heading: "Inside Canvas",
        items: [
          {
            src: "/bridgeUp/Buddy-match-up.png",
            alt: "BridgeUp onboarding panel in Canvas asking which course the student is most nervous about and what they want to get better at",
            caption: "Three low-stakes questions help match each student with the right partner.",
            width: 2850,
            height: 1630,
            wide: true,
          },
        ],
      },
      techList: [
        "TypeScript",
        "React 19",
        "Next.js 16",
        "Tailwind CSS v4",
        "Supabase",
        "Anthropic SDK",
        "Claude Haiku 4.5",
        "react-markdown",
        "Chrome MV3",
        "Vercel",
      ],
    },
  },
  {
    slug: "ai-salesforce-code-review",
    title: "AI-Assisted Salesforce Code Review",
    category: "engineering",
    label: "Software Engineering · AI",
    summary:
      "A review workflow combining Salesforce Code Analyzer, custom deterministic checks, and AI analysis across seven quality, security, metadata, and release-readiness gates.",
    stack: ["Apex", "Salesforce Code Analyzer", "Bitbucket"],
    icon: "cpu",
    imageTone: "blush",
    caseStudy: {
      facts: [
        { label: "Where", value: "EdPlus, Arizona State University" },
        { label: "Role", value: "Software Development Assistant" },
        { label: "Gates", value: "7 Quality & Security Checks" },
        { label: "Status", value: "In Progress" },
      ],
      overview: {
        heading: "Catching risk before it ships.",
        body: [
          "Code review quality varies with who is reviewing and how busy they are. This workflow makes the baseline consistent, so reviewers can focus on what matters.",
          "It layers Salesforce Code Analyzer, custom deterministic checks, and AI analysis across seven gates covering code quality, security, metadata, and release readiness, integrated into Bitbucket pull requests for earlier risk identification and automated developer feedback.",
        ],
      },
    },
  },
  {
    slug: "carbonlint",
    title: "CarbonLint",
    category: "experiments",
    label: "Developer Tools",
    subtitle: "Faster code, smaller footprint.",
    summary:
      "A VS Code extension that finds inefficient Python, rewrites it to run faster, and shows how much time, memory, and CO₂ the change saves.",
    stack: ["Python", "TypeScript", "VS Code", "CodeCarbon"],
    icon: "leaf",
    image: "/carbonLint/demo.png",
    featured: true,
    caseStudy: {
      tagline: "Make the hidden cost visible.",
      showcaseCaption: "Underline, hover, report, apply",
      facts: [
        { label: "Interface", value: "VS Code Extension + MCP Server" },
        { label: "Engine", value: "Python AST, Radon, CodeCarbon" },
        { label: "Pipeline", value: "Five Stages, Four AST Rewrites" },
        { label: "Tests", value: "161 Python & TypeScript" },
      ],
      overview: {
        heading: "Slow code has a cost nobody sees.",
        pullQuote:
          "Slow code wastes energy, and developers almost never see its environmental cost.",
        body: [
          "I wanted to make that cost visible, and fix it right in the editor, where developers already work. Faster code also means lower cloud bills.",
          "You save a file, CarbonLint underlines the inefficient code, hovering shows you the fix, and the report shows the rewritten code with the time, memory, and CO₂ savings. You can apply it in one click.",
        ],
      },
      features: {
        heading: "What it does",
        items: [
          {
            title: "Inline diagnostics",
            body: "Saving a .py file underlines inefficient code like nested loops and repeated work. Hovering explains the problem and suggests a fix, for example, “use a set instead of a list for lookups.”",
          },
          {
            title: "Before-and-after report",
            body: "“Carbon Optimizer: Open Report” runs the original and optimized code, then shows time, memory, and CO₂ side by side with the rewritten code.",
          },
          {
            title: "One-click apply",
            body: "An Apply button replaces the code in your file with the optimized version. Ctrl+Z undoes it.",
          },
          {
            title: "Config scan",
            body: "On workspace open, it scans deployment configuration such as Dockerfiles, GitHub Actions, and Vercel.",
          },
          {
            title: "Struggle detector",
            body: "Rapid repeated edits to the same code trigger an “AI retry loop” warning, flagging when an AI assistant may be stuck, and suggest adding the Workspace Context MCP so it has more to work with.",
          },
          {
            title: "MCP server",
            body: "AI coding assistants such as Kiro can call the same analysis and optimization tools directly.",
          },
        ],
      },
      gallery: {
        heading: "In action",
        items: [
          {
            src: "/carbonLint/proble-description.png",
            alt: "CarbonLint hover tooltip in VS Code explaining a nested loop and suggesting a fix",
            caption: "Hover over an underline to see the problem and a suggested fix.",
            width: 1776,
            height: 856,
            wide: true,
          },
          {
            src: "/carbonLint/report-home.png",
            alt: "Carbon Optimizer report panel ready to analyze demo.py",
            caption: "One click profiles the file and generates an optimized version.",
            width: 1160,
            height: 1340,
          },
          {
            src: "/carbonLint/report-details.png",
            alt: "Carbon Optimizer report showing run time, memory, energy, and CO2, with the rewritten code",
            caption: "Measured time, memory, energy, and CO₂, plus the rewrite ready to apply.",
            width: 1152,
            height: 1518,
          },
          {
            src: "/carbonLint/simulated-ai-loop.png",
            alt: "Carbon Optimizer notification warning of repeated edits in the same code region and suggesting the Workspace Context MCP",
            caption: "The struggle detector spots repeated edits to the same code and suggests giving the AI more context.",
            width: 776,
            height: 204,
            natural: true,
          },
        ],
      },
      techList: [
        "Python",
        "TypeScript",
        "VS Code Extension API",
        "AST",
        "Radon",
        "CodeCarbon",
        "FastMCP",
        "scikit-learn",
        "pytest",
        "Hypothesis",
      ],
      architecture: {
        heading: "Why these tools",
        tags: ["Five-stage pipeline", "Sandboxed execution"],
        decisions: [
          {
            title: "Python AST",
            body: "Reads code as a structure rather than text, so it can find patterns like nested loops and rewrite them safely.",
          },
          {
            title: "Radon",
            body: "A standard way to score how complex a function is, instead of inventing my own metric.",
          },
          {
            title: "CodeCarbon",
            body: "Turns energy use into a trusted CO₂ estimate, so I didn't have to invent a formula.",
          },
          {
            title: "Custom sandboxed executor",
            body: "Runs code it has never seen before in a separate process using Python's multiprocessing, with safe imports only, a memory limit, and a 5-second timeout.",
          },
          {
            title: "VS Code extension in TypeScript",
            body: "Puts the tool where developers already work. It talks to the Python backend with newline-delimited JSON over stdin/stdout.",
          },
          {
            title: "FastMCP",
            body: "Exposes the same capabilities to AI coding assistants, so they can analyze and optimize code directly.",
          },
        ],
        code: {
          label: "How a save flows through CarbonLint",
          note: "From squiggle to savings",
          snippet: `Developer saves a .py file in VS Code
  │
  ├─ VS Code Extension (TypeScript)
  │     │  JSON over stdin/stdout
  │     ▼
  └─ Python backend
        1. ANALYZE           AST + Radon      → nested loops, repeated work
                             → squiggles in the editor, hover shows the fix

        User opens "Carbon Optimizer: Open Report"
        2. MEASURE original  Sandbox + CodeCarbon  → time, memory, CO₂
        3. OPTIMIZE          4 AST rewrites
        4. MEASURE optimized Sandbox + CodeCarbon
        5. COMPARE           → % improvement

        Report panel: before vs. after + optimized code
        [Apply] → replaces the code in the file (Ctrl+Z to undo)`,
        },
      },
      challenge: {
        heading: "What success looks like.",
        body: [
          "Developers ship code that is faster, uses less memory, and has a smaller carbon footprint, with before-and-after numbers to prove it.",
          "For a company, that means lower compute costs and measurable progress on sustainability goals.",
        ],
      },
    },
  },
  {
    slug: "llm-context-integrity",
    title: "LLM Context Integrity",
    category: "security",
    label: "Security & Research",
    subtitle: "Prompt-injection defense for LLM-enabled smart homes.",
    summary:
      "Co-led an eight-person research team building a three-layer defense against prompt injection in an LLM-controlled smart home; no attack succeeded across 50 test cases.",
    stack: ["Python", "FastAPI", "ML", "MQTT"],
    icon: "fingerprint",
    imageTone: "dark",
    featured: true,
    caseStudy: {
      tagline: "Data should never become a command.",
      showcaseCaption: "ShieldView - 3-layer prompt injection defense",
      facts: [
        { label: "Role", value: "Co-Lead (Deputy Team Lead)" },
        { label: "Course", value: "CSE 543 Information Assurance & Security, ASU" },
        { label: "Team", value: "8 Researchers" },
        { label: "Attack Success Rate", value: "0% across 39 Attacks" },
      ],
      overview: {
        heading: "When the context is the attack.",
        pullQuote:
          "An adversary manipulating an LLM orchestrator could unlock doors, disable alarms, or silently exfiltrate sensor data, all through nothing more than a carefully crafted text string.",
        body: [
          "Smart homes increasingly use LLMs to interpret commands and coordinate devices. But these models process trusted system instructions and untrusted inputs, such as sensor data, API responses, and retrieved content, in the same context. A malicious instruction hidden in that data can override intended behavior, and in a smart home, the model's output becomes a physical action.",
          "Our team set out to design, build, and evaluate a security framework for detecting and mitigating prompt injection in LLM-enabled smart homes, combining machine-learning detection with system-level safeguards. Every component traces back to a studied research paper.",
          "As co-lead, I helped steer the team's research and delivery, tracking weekly progress, reviewing teammates' work for technical accuracy, keeping our reporting consistent, and contributing an in-depth review of six papers on prompt injection attacks and defenses, including the Liu et al. USENIX Security benchmark that shaped our evaluation methodology.",
        ],
      },
      features: {
        heading: "The testbed",
        items: [
          {
            title: "A simulated smart home",
            body: "Two virtual IoT devices, a Smart Bed and a Washing Machine, controlled through a centralized LLM pipeline built with FastAPI and the OpenRouter API, each with bounded parameters and confirmation for high-risk actions.",
          },
          {
            title: "Seven attack categories",
            body: "Naive, escape-character, context-ignoring, fake-completion, and combined direct injections, indirect injection via hidden HTML comments, and policy violations, following the Liu et al. taxonomy.",
          },
          {
            title: "Defended vs. undefended",
            body: "Every attack ran against both a defended server and an undefended baseline, so the evaluation measured real risk reduction rather than simply whether attacks exist.",
          },
          {
            title: "ShieldView dashboard",
            body: "A Next.js dashboard that visualizes the defense pipeline, runs attack simulations, and shows live security metrics, with a compare mode for the baseline.",
          },
          {
            title: "Federated learning",
            body: "A Flower-based simulation that trains the classifier across distributed smart-home nodes without centralizing raw household data.",
          },
          {
            title: "Grounded in research",
            body: "Built on a review of more than 50 papers spanning prompt injection, tool-integrated agents, contextual integrity, and IoT security.",
          },
        ],
      },
      techList: [
        "Python",
        "FastAPI",
        "OpenRouter",
        "sentence-transformers",
        "all-MiniLM-L6-v2",
        "Random Forest",
        "Flower",
        "Next.js 16",
        "React 19",
        "Tailwind CSS 4",
        "Framer Motion",
      ],
      architecture: {
        heading: "A Layered Defense",
        tags: ["Defense in depth", "Paper-traceable"],
        decisions: [
          {
            title: "Layer 1 - ML classifier",
            body: "Inputs are embedded with all-MiniLM-L6-v2 and classified by a Random Forest that flags role markers, override attempts, and safety-bypass patterns. Malicious inputs are blocked before reaching the model.",
          },
          {
            title: "Layer 2 - Input prevention",
            body: "Normalizes text, strips markers, and wraps user content as clearly labeled untrusted data. It doesn't block on its own; it makes Layers 1 and 3 more effective.",
          },
          {
            title: "Layer 3 - Output validation",
            body: "Checks every response for leaks and jailbreaks, verifies a canary token, validates the schema, and allows only approved device actions within safe parameter bounds.",
          },
          {
            title: "Why not an LLM detector?",
            body: "Research shows LLM-based detectors can be adaptively bypassed because they share the target model's weakness. A classical classifier on embeddings doesn't fail for the same reason.",
          },
          {
            title: "Device-level safety",
            body: "Action allowlisting, parameter bounds, and confirmation for high-risk actions mean that even if a malicious input slips past detection, it can't directly trigger an unsafe action.",
          },
          {
            title: "Privacy by design",
            body: "A detector that centralizes every household's data trades one risk for another. Federated training keeps raw data local while still improving the shared model.",
          },
        ],
        code: {
          label: "The defense pipeline",
          note: "Intercept at every stage",
          snippet: `User input
  │
  ▼
L1  ML Classifier        MiniLM embeddings + Random Forest
  │                      malicious? ──▶ BLOCK REQUEST
  ▼
L2  Input Prevention     normalize, strip markers, wrap as untrusted user_data
  │
  ▼
LLM Processing           OpenRouter model + security prompt + canary
  │
  ▼
L3  Output Validation    leak/jailbreak detection, canary check,
  │                      schema validation, allowlist, risk checks
  │                      unsafe? ──▶ BLOCK RESPONSE
  ▼
Response / Device Action`,
        },
      },
      challenge: {
        label: "Results",
        heading: "Zero attacks got through.",
        body: [
          "We evaluated the framework on 50 curated cases, made up of 39 attacks across seven categories and 11 benign requests, following Liu et al.'s 11-step attack success judgment methodology. No attack succeeded, and no legitimate request was blocked.",
          "The layers shared the work: the ML classifier stopped 20 of the 39 attacks, and output validation caught the remaining 19. Structurally deceptive attacks like fake completion were the hardest for the classifier alone, which is exactly why the later layers exist.",
          "We were careful not to claim complete prevention. Attackers adapt, so the honest contribution is a verifiable reduction in attack success compared to an undefended baseline.",
        ],
        impact: {
          label: "Attack success rate",
          value: "0%",
          caption: "Across 39 attacks in 50 test cases.",
          footnote: "0% false positives · L1 blocked 20 · L3 blocked 19",
        },
      },
      lessons: [
        {
          title: "Prompt injection is structural",
          body: "It isn't a bug that disappears with careful string handling. It follows from instruction-following models reasoning over mixed-trust context, so systems should be designed assuming attacks will happen.",
        },
        {
          title: "Detection alone isn't enough",
          body: "ML screening is a strong first layer, but the safest design separates interpretation from action, so a missed detection still can't become an unsafe device command.",
        },
        {
          title: "Security and privacy must be co-designed",
          body: "Better detection shouldn't require centralizing intimate household data. Federated approaches point toward having both.",
        },
      ],
    },
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const caseStudies = projects.filter((p) => p.caseStudy)

export const featuredProjects = projects.filter((p) => p.featured)

export function projectHref(project: Project) {
  return project.caseStudy ? `/work/${project.slug}` : (project.link?.href ?? "/work")
}

export function projectCta(project: Project) {
  return project.caseStudy ? "Read Case Study" : (project.link?.label ?? "Learn more")
}

export function projectMeta(project: Project) {
  return [project.label, project.year].filter(Boolean).join(" · ")
}
