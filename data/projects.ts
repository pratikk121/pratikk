export type ProjectCategory = "Systems & OS" | "Web Applications" | "Developer Tools & SaaS";
export type ProjectStatus = "Experimental" | "Commercial" | "Prototype" | "Active Project";

export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: ProjectCategory;
    status: ProjectStatus;
    role: string;
    year: string;
    tags: string[];
    image: string; // Icon or preview identifier
    demoLink?: string;
    repoLink: string;
    problem: string;
    approach: string;
    interestingDecision: string;
    tradeoffs: string;
    result: string;
    content: string; // HTML/Markdown formatted deep-dive for case study
}

export const projects: Project[] = [
    {
        id: "1",
        slug: "aether-os",
        title: "AetherOS",
        description: "An experimental in-browser desktop environment featuring draggable window management, custom WebGL glass shaders, and local state persistence.",
        category: "Systems & OS",
        status: "Experimental",
        role: "Solo Creator",
        year: "2026",
        tags: ["TypeScript", "React", "WebGL / GLSL", "Tailwind CSS", "IndexedDB"],
        image: "ri-computer-line",
        demoLink: "/sandbox/pratikOS/index.html",
        repoLink: "https://github.com/pratikk121/Ather_os",
        problem: "Modern web applications run in isolated browser tabs with standard DOM containers. Exploring how desktop-like window management, compositor layer ordering, and real-time graphics shaders behave directly in client-side TypeScript.",
        approach: "Built a modular window manager supporting drag, resize, minimize, maximize, and focus depth tracking. Integrated custom GLSL shaders via a WebGL overlay for optical refraction, and used IndexedDB to persist window layouts across sessions.",
        interestingDecision: "Rather than relying solely on heavyweight CSS backdrop-filter effects that cause rendering hitches during fast window moves on low-powered machines, implemented a canvas-based WebGL shader pipeline that passes window coordinates to uniform buffers.",
        tradeoffs: "The WebGL shader layer adds GPU overhead on mobile devices, so desktop layout mode is the primary target. Managing nested z-index stacking in purely client-side React requires careful state isolation to prevent unnecessary re-renders of inactive windows.",
        result: "Working interactive prototype with multiple virtual windows (text editor, media player, terminal preview) running smoothly in modern desktop browsers.",
        content: `
      <h2>Project Motivation</h2>
      <p>AetherOS began as an experiment to explore how far a browser environment could go toward recreating the feel of a desktop operating system. Rather than just making a styled dashboard, the goal was to implement real window management mechanics: dragging, resizing, focus layers, boundary detection, and session state persistence.</p>

      <h2>Architecture &amp; Implementation</h2>
      <p>The system is structured in three core layers:</p>
      <ul>
        <li><strong>Window Manager:</strong> A state machine tracking window coordinates, dimensions, minimized/maximized states, and active focus stack ordering.</li>
        <li><strong>Compositor &amp; Shader Overlay:</strong> Custom WebGL fragment shaders applying real-time glass refraction and caustics, passing window bounding boxes as uniform vectors.</li>
        <li><strong>Storage Layer:</strong> Uses IndexedDB and localStorage to serialize open windows, desktop icons, and user settings across browser refreshes.</li>
      </ul>

      <h2>Key Technical Decisions</h2>
      <h3>Z-Index Normalization</h3>
      <p>Continuously incrementing z-index on window focus eventually causes state drift and unpredictable layering bugs with modals. Implemented an LRU-ordered focus stack that normalizes active window depths to a tight bounded array, ensuring deterministic layering regardless of how many times windows are clicked.</p>

      <h3>CSS Backdrop vs WebGL Shaders</h3>
      <p>Standard CSS <code>backdrop-filter</code> creates continuous CPU/GPU repaint cycles when windows are rapidly moved on high-DPI displays. Offloading refraction optics to a lightweight WebGL canvas overlay helped decouple interface dragging from the browser's DOM paint pipeline.</p>

      <h2>Tradeoffs &amp; Limitations</h2>
      <ul>
        <li><strong>Mobile Usability:</strong> Multi-window floating interfaces make little sense on small touchscreens; mobile requires a full-screen drawer fallback.</li>
        <li><strong>Memory Footprint:</strong> Multiple concurrent WebGL contexts can be memory-heavy on low-tier laptops, requiring single-canvas sharing across windows.</li>
      </ul>

      <h2>Current Status</h2>
      <p>Active open-source experiment available on GitHub with an interactive sandbox demonstration.</p>
    `
    },
    {
        id: "2",
        slug: "devlogic-systems",
        title: "Devlogic Systems",
        description: "Official agency web platform featuring an interactive project scoping tool that calculates development estimates based on architectural choices.",
        category: "Web Applications",
        status: "Commercial",
        role: "Lead Engineer",
        year: "2026",
        tags: ["React 19", "Vite 6", "Tailwind CSS v4", "TypeScript"],
        image: "ri-building-line",
        demoLink: "https://devlogicsystems.in",
        repoLink: "https://github.com/pratikk121/Devlogic-New",
        problem: "Software consultancies often lose potential clients during early discovery due to opaque pricing and slow estimation turnarounds. Clients need a transparent, immediate way to model requirements and understand timeline tradeoffs.",
        approach: "Designed and built an interactive Scoping Engine inside the production website. Prospective clients select features, compliance needs, and architectural preferences, immediately seeing calculated engineering effort and projected delivery schedules.",
        interestingDecision: "Structured feature dependencies as a directed graph: selecting an advanced feature (such as real-time messaging) automatically highlights and requires necessary infrastructure modules (e.g. WebSocket backend), preventing unrealistic client estimates.",
        tradeoffs: "Mathematical estimates are heuristic baselines rather than binding contracts. The UI clearly presents them as architectural planning models to set proper client expectations before discovery calls.",
        result: "Deployed to production at devlogicsystems.in. Delivers instant estimates to prospective clients and streamlines inbound discovery conversations.",
        content: `
      <h2>Project Motivation</h2>
      <p>Devlogic Systems is the public web platform for software consulting and development services. The core engineering focus was creating an interactive, transparent project scoping tool that helps prospects visualize architectural tradeoffs before booking an introductory technical call.</p>

      <h2>Architecture &amp; Scoping Engine</h2>
      <p>The site is built with modern React 19, Vite 6, and Tailwind CSS v4 for rapid static loading and clean responsive typography.</p>
      <ul>
        <li><strong>Interactive Estimator:</strong> Allows clients to toggle project modules (Auth, Payments, API Integrations, Real-Time Data) and dynamically computes estimated delivery timelines.</li>
        <li><strong>Dependency Mapping:</strong> Enforces architectural prerequisites so clients understand that certain features require supporting backend services.</li>
        <li><strong>Lead Capture:</strong> Packages the client's configured scope into a structured summary submitted directly via the inquiry form.</li>
      </ul>

      <h2>Engineering Decisions</h2>
      <p>Kept the application purely client-side for estimation calculations, ensuring zero latency as users toggle options. Deployed as a statically generated site on an edge CDN for fast global load times.</p>

      <h2>Current Status</h2>
      <p>Live in production at <a href="https://devlogicsystems.in" target="_blank" rel="noopener noreferrer">devlogicsystems.in</a>.</p>
    `
    },
    {
        id: "3",
        slug: "finance-tracker",
        title: "FinanceTracker",
        description: "A full-stack personal finance application with a FastAPI backend and React frontend for tracking expenses, recurring budgets, and cash flow trends.",
        category: "Web Applications",
        status: "Active Project",
        role: "Solo Creator",
        year: "2026",
        tags: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "React", "Tailwind CSS"],
        image: "ri-line-chart-line",
        demoLink: "https://github.com/pratikk121/fianace_tracker",
        repoLink: "https://github.com/pratikk121/fianace_tracker",
        problem: "Generic budgeting apps often feel bloated with third-party advertising or lock data behind proprietary export formats. Needed a clean, private, self-hostable expense tracker with custom category rollups.",
        approach: "Built a decoupled architecture: an asynchronous Python backend using FastAPI and SQLAlchemy 2.0 connected to PostgreSQL, paired with a lightweight React dashboard for expense entry, filtering, and monthly visualizations.",
        interestingDecision: "Used Pydantic v2 schemas for strict data validation at the API boundary, guaranteeing that financial amounts, dates, and category IDs are sanitized before hitting the database.",
        tradeoffs: "Building bank statement ingestion requires accounting for wildly inconsistent CSV and OFX formats from different institutions; currently relies on structured CSV parsing and manual rule mapping rather than automated bank API integrations.",
        result: "Fully functional local full-stack application with category filtering, monthly budget tracking, and clean transaction history.",
        content: `
      <h2>Project Motivation</h2>
      <p>FinanceTracker was built out of a personal need for a straightforward, private financial tracking application that doesn't sell user data or require complex third-party banking aggregators. The priority was fast expense logging, clear monthly summaries, and data ownership.</p>

      <h2>Architecture &amp; Data Flow</h2>
      <ul>
        <li><strong>Backend:</strong> FastAPI with asynchronous route handlers and SQLAlchemy 2.0 ORM with PostgreSQL.</li>
        <li><strong>Frontend:</strong> React SPA with Tailwind CSS, built with Vite for fast local iteration.</li>
        <li><strong>Data Model:</strong> Relational schema covering Users, Accounts, Transactions, Categories, and Budget Limits with foreign key constraints.</li>
      </ul>

      <h2>Engineering Challenges</h2>
      <h3>Data Consistency</h3>
      <p>Financial records must maintain strict consistency. All updates and deletions operate within explicit database transactions to prevent orphaned splits or negative account balances.</p>

      <h2>Tradeoffs &amp; Current Limitations</h2>
      <p>Without third-party Plaid or Yodlee integrations, bank statements must be imported via CSV or logged manually. However, this keeps the codebase completely self-contained and free of external subscription dependencies.</p>
    `
    },
    {
        id: "4",
        slug: "precision-crm",
        title: "Precision CRM",
        description: "A sales pipeline and customer relationship management application built with Next.js 16 App Router, Prisma ORM, and PostgreSQL.",
        category: "Web Applications",
        status: "Prototype",
        role: "Solo Creator",
        year: "2026",
        tags: ["Next.js 16", "PostgreSQL", "Prisma ORM", "Auth.js", "Server Actions", "Tailwind CSS"],
        image: "ri-user-settings-line",
        demoLink: "https://crm-omega-ten-31.vercel.app",
        repoLink: "https://github.com/pratikk121/CRM",
        problem: "Sales teams and freelancers frequently struggle with clunky, slow CRM interfaces that take seconds to update a single lead stage. Needed a fast, responsive pipeline management tool.",
        approach: "Exploited Next.js 16 Server Components and Server Actions to query PostgreSQL directly while maintaining type safety across the entire stack using Prisma ORM.",
        interestingDecision: "Used optimistic UI updates on the client so dragging a lead between stages feels instantaneous, with server-side rollback if the network request fails.",
        tradeoffs: "Server Actions streamline data mutations, but handling optimistic rollbacks across multi-column drag-and-drop requires careful client state synchronization.",
        result: "Deployed prototype on Vercel connected to a serverless PostgreSQL database, allowing users to manage leads across customizable stages.",
        content: `
      <h2>Project Motivation</h2>
      <p>Precision CRM was built to evaluate the ergonomics and speed of building full-stack data applications using Next.js App Router, React Server Components, and Prisma. The objective was a fast, clean lead-tracking board without client-side data fetching bloat.</p>

      <h2>Technical Architecture</h2>
      <ul>
        <li><strong>Server Components:</strong> Deal lists and contact views are fetched on the server with zero client bundle overhead for read queries.</li>
        <li><strong>Server Actions:</strong> Form submissions and stage transitions execute via type-safe server functions directly modifying the PostgreSQL database.</li>
        <li><strong>Prisma Schema:</strong> Models Deals, Contacts, Companies, and Pipeline Stages with relational integrity.</li>
      </ul>

      <h2>Tradeoffs &amp; Lessons Learned</h2>
      <p>While Server Actions simplify backend code by removing separate REST endpoints, optimistic updates on complex drag-and-drop lists require maintaining parallel local state on the client.</p>

      <h2>Current Status</h2>
      <p>Live demo accessible at <a href="https://crm-omega-ten-31.vercel.app" target="_blank" rel="noopener noreferrer">crm-omega-ten-31.vercel.app</a>.</p>
    `
    },
    {
        id: "5",
        slug: "seed-monitoring-pwa",
        title: "Seed Monitoring PWA",
        description: "A mobile-first progressive web application for tracking seed germination rates, batch planting logs, and greenhouse environmental conditions.",
        category: "Developer Tools & SaaS",
        status: "Prototype",
        role: "Solo Creator",
        year: "2026",
        tags: ["React", "TypeScript", "Vite", "PWA", "Tailwind CSS"],
        image: "ri-plant-line",
        demoLink: "https://seed-monitoring-pwa.vercel.app",
        repoLink: "https://github.com/pratikk121/seed-monitoring-pwa",
        problem: "Agricultural and nursery operators often record seed batches, germination rates, and watering schedules on paper logs that are easily lost or tedious to analyze.",
        approach: "Built an offline-capable Progressive Web Application (PWA) with a mobile-first interface optimized for one-thumb field entry and quick batch status logging.",
        interestingDecision: "Configured service worker caching and local storage fallbacks so nursery workers can log germination data in greenhouses without reliable cellular connectivity.",
        tradeoffs: "Offline data sync requires conflict resolution when multiple entries occur offline; currently uses a last-write-wins timestamp strategy suitable for single-user field logging.",
        result: "Working PWA prototype deployed on Vercel, installable directly on mobile devices as a standalone application.",
        content: `
      <h2>Project Motivation</h2>
      <p>Agricultural workflows frequently happen in greenhouses, sheds, and outdoor plots where cellular reception is spotty. This PWA was designed to replace paper logs with a reliable, offline-first digital notebook for batch germination tracking.</p>

      <h2>Technical Implementation</h2>
      <ul>
        <li><strong>Mobile-First UI:</strong> Large touch targets and high-contrast labels designed for quick entry in bright sunlight.</li>
        <li><strong>Progressive Web App:</strong> Service worker caching allows the app to open instantly even when disconnected from the internet.</li>
        <li><strong>Local Storage Cache:</strong> Batch records and watering logs are cached locally before background synchronization.</li>
      </ul>

      <h2>Current Status</h2>
      <p>Open-source prototype live at <a href="https://seed-monitoring-pwa.vercel.app" target="_blank" rel="noopener noreferrer">seed-monitoring-pwa.vercel.app</a>.</p>
    `
    },
    {
        id: "6",
        slug: "invenqrise",
        title: "InvenQrise",
        description: "A lightweight inventory and stock tracking application designed for small retailers and workshop inventories.",
        category: "Web Applications",
        status: "Prototype",
        role: "Solo Creator",
        year: "2025",
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        image: "ri-archive-line",
        demoLink: "https://inven-qrise.vercel.app",
        repoLink: "https://github.com/pratikk121/InvenQrise",
        problem: "Enterprise ERPs and inventory platforms are overwhelming and expensive for small inventory management. A fast, uncluttered tool was needed for tracking SKU counts, restocking thresholds, and item locations.",
        approach: "Developed a clean inventory management application focusing on fast search, instant stock increment/decrement, and visual alerts when items drop below reorder thresholds.",
        interestingDecision: "Prioritized keyboard shortcuts and instant filtering so stock managers can update counts without navigating through multiple modal screens.",
        tradeoffs: "Lacks multi-warehouse routing and barcode scanner hardware SDKs; focused purely on web-based desktop and tablet inventory tracking.",
        result: "Clean inventory prototype live on Vercel for tracking items, categories, and stock reorder alerts.",
        content: `
      <h2>Project Motivation</h2>
      <p>InvenQrise was designed to strip away the complexity of enterprise inventory software and provide small businesses and workshops with an intuitive, fast stock management interface.</p>

      <h2>Core Capabilities</h2>
      <ul>
        <li><strong>Real-Time SKU Search:</strong> Filter inventory by item name, SKU, or category with instant keyboard navigation.</li>
        <li><strong>Stock Threshold Alerts:</strong> Automatic visual indicators when inventory counts drop below minimum reorder levels.</li>
        <li><strong>Clean Responsive Layout:</strong> Accessible on desktop and tablet browsers for warehouse or counter use.</li>
      </ul>

      <h2>Current Status</h2>
      <p>Deployed prototype live on Vercel at <a href="https://inven-qrise.vercel.app" target="_blank" rel="noopener noreferrer">inven-qrise.vercel.app</a>.</p>
    `
    }
];
