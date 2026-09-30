export type ProjectCategory = "Systems & OS" | "Fintech & AI" | "Commercial & CRM";

export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: ProjectCategory;
    content: string; // Markdown or HTML content for the case study
    tags: string[];
    image: string; // Path to image or icon class
    demoLink: string;
    repoLink?: string;
    isIcon?: boolean; // If true, image is a remix icon class
}

export const projects: Project[] = [
    {
        id: "1",
        slug: "aether-os",
        title: "AetherOS: Ambient Desktop OS & Command Center",
        category: "Systems & OS",
        description: "A high-performance ambient web desktop environment and command center featuring GPU-accelerated liquid glass shaders, procedural soundscapes, real-time activity analytics, and a window stacking compositor.",
        tags: ["TypeScript", "WebGL & GLSL", "Web Audio API", "Virtual File System", "Compositor Pipeline", "Activity Analytics"],
        image: "ri-computer-line",
        isIcon: true,
        demoLink: "/sandbox/pratikOS/index.html",
        repoLink: "https://github.com/pratikk121/Ather_os",
        content: `
      <h2>Architectural Overview</h2>
      <p>AetherOS is an ambient web-based operating system designed to explore the boundaries of client-side desktop simulation in modern browsers. The platform is architected around an event-driven micro-kernel pattern, decoupling the desktop compositor, window management subsystem, virtual file system (VFS), and background audio-visual synthesis pipeline. The rendering architecture leverages custom WebGL fragment shaders for real-time liquid glass refraction, executing within dedicated animation frames without blocking the DOM UI tree.</p>

      <ul>
        <li><strong>Window Stacking Compositor:</strong> Dynamic z-index normalization engine managing window states (minimized, maximized, focused, snapped) with boundary detection and collision physics.</li>
        <li><strong>Simulated VFS:</strong> Tree-structured in-memory virtual filesystem with persistent serialization to IndexedDB and LocalStorage, supporting POSIX-like path resolution and standard I/O streams.</li>
        <li><strong>Procedural Soundscape Engine:</strong> Web Audio API sound synthesis generating dynamic ambient noise, binaural acoustics, and interactive auditory feedback based on user velocity and focused window density.</li>
        <li><strong>Activity Analytics Hub:</strong> Real-time telemetry monitoring input cadence, window dwell time, and system resource utilization displayed via high-frequency canvas visualizers.</li>
      </ul>

      <h2>Engineering Challenges Solved</h2>
      <h3>Window Stacking Context & Z-Index Normalization</h3>
      <p>As windows are repeatedly focused, naive incrementing of z-index leads to integer overflow and rendering anomalies across nested stacking contexts. An LRU-based z-index re-indexing algorithm was implemented to normalize stacking depths to a tight bounded integer range <code>[10..100]</code> upon each focus transition, guaranteeing sub-millisecond layer ordering without DOM recreation or layout thrashing.</p>

      <h3>Zero-Latency Liquid Glass Shaders via WebGL Compositing</h3>
      <p>Traditional CSS <code>backdrop-filter</code> filters cause heavy paint invalidations and frame drops on high-DPI displays during rapid window dragging. Glass refraction, blur, and chromatic aberration were offloaded to a WebGL canvas overlay driven by custom GLSL shaders, passing window coordinates as uniform buffers. This reduced paint invalidation time from 28ms to under 1.8ms per frame, sustaining a consistent 60 FPS.</p>

      <h3>Audio Thread Contention & Web Audio Graph Routing</h3>
      <p>Complex ambient procedural sound generation experienced jitter when the main thread handled heavy DOM layout shifts. Audio parameter modulation was decoupled into <code>AudioWorklet</code> processors running on the dedicated audio rendering thread, ensuring glitch-free acoustic synthesis regardless of desktop load.</p>

      <h2>Key Capabilities & Production Metrics</h2>
      <ul>
        <li><strong>60 FPS Fluid Rendering:</strong> Sustained 60 FPS rendering under active multi-window drag-and-drop operations with 4 concurrent shader instances.</li>
        <li><strong>&lt;2ms Event Dispatch:</strong> Sub-2ms window event dispatch and state synchronization across virtual applications.</li>
        <li><strong>Zero Framework Overhead:</strong> 0-runtime external UI framework dependencies for the core compositor engine, keeping the core runtime payload under 45KB gzipped.</li>
        <li><strong>Full Keyboard Palette:</strong> Global command palette navigation with vim-style window cycling and global shortcut registration.</li>
      </ul>
    `
    },
    {
        id: "2",
        slug: "finance-tracker",
        title: "FinanceTracker: AI Financial Intelligence Platform",
        category: "Fintech & AI",
        description: "A full-stack financial analytics and automated accounting engine powered by FastAPI, SQLAlchemy 2.0, and React, featuring automated transaction classification, cash flow projection models, and sub-80ms analytics queries.",
        tags: ["FastAPI", "Python 3.11", "PostgreSQL", "SQLAlchemy 2.0", "React 18", "TanStack Query", "Time-Series Forecasting"],
        image: "ri-line-chart-line",
        isIcon: true,
        demoLink: "https://github.com/pratikk121/fianace_tracker",
        repoLink: "https://github.com/pratikk121/fianace_tracker",
        content: `
      <h2>Architectural Overview</h2>
      <p>FinanceTracker is an enterprise-grade financial intelligence platform engineered for automated ledger ingestion, machine-learning-assisted categorization, and forward-looking cash flow projections. The backend is built on asynchronous Python 3.11 using FastAPI and SQLAlchemy 2.0 with asyncpg, paired with a normalized PostgreSQL relational database. The frontend is an SPA built on React 18 and Vite, utilizing TanStack Query for declarative server-state management and optimistic mutations.</p>

      <ul>
        <li><strong>Async Ingestion Pipeline:</strong> High-throughput batch transaction ingestion supporting CSV/OFX imports, parsing, schema validation via Pydantic v2, and bulk persistence.</li>
        <li><strong>ML Categorization Engine:</strong> Hybrid classification system combining deterministic regular expression pattern banks with a classification pipeline trained on financial taxonomy vectors.</li>
        <li><strong>Forecasting Subsystem:</strong> Time-series projection models implementing exponential smoothing and Holt-Winters algorithms to predict monthly burn rate, runway, and seasonal expenditure volatility.</li>
        <li><strong>Reactive Dashboard:</strong> High-density financial data tables with virtualized scrolling, real-time KPI aggregations, and customizable interactive chart projections.</li>
      </ul>

      <h2>Engineering Challenges Solved</h2>
      <h3>Transaction Deduplication at Scale</h3>
      <p>Ingesting bank statements frequently introduces duplicate transactions with minor timestamp variations and vendor string mutations (e.g., 'UBER *TRIP 1234' vs 'UBER TECHNOLOGIES'). Formulated a multi-pass deduplication algorithm utilizing SimHash fingerprinting combined with Levenshtein distance thresholds over sliding 72-hour windows, preventing duplicate ledger entries with 99.8% precision.</p>

      <h3>Sub-100ms Financial Aggregations over Relational Data</h3>
      <p>Running multi-year monthly category rollups across tens of thousands of transactions created table scan bottlenecks in PostgreSQL. Implemented composite B-Tree indexes on <code>(user_id, date, category_id)</code> and designed materialized view refresh triggers for historical periods, slashing p95 reporting queries from 1,450ms down to 42ms.</p>

      <h3>State Synchronization & Cache Invalidation</h3>
      <p>When batch categorization runs asynchronously, stale client dashboards caused user data discrepancies. Structured a fine-grained TanStack Query cache invalidation matrix using composite query keys, triggering precise UI re-fetching only for affected ledger scopes without triggering full page reloads.</p>

      <h2>Key Capabilities & Production Metrics</h2>
      <ul>
        <li><strong>98.4% Classification Accuracy:</strong> Automated transaction classification accuracy across standard banking statement formats.</li>
        <li><strong>Sub-50ms API Latency:</strong> Sub-50ms median API response time on async endpoints under concurrent read workloads.</li>
        <li><strong>Forward Cash Projections:</strong> Real-time 30/60/90-day cash flow predictions with calculated 95% confidence intervals.</li>
        <li><strong>Transactional Integrity:</strong> Zero data corruption during concurrent batch updates via strict PostgreSQL isolation levels (<code>READ COMMITTED</code> with advisory locking).</li>
      </ul>
    `
    },
    {
        id: "3",
        slug: "devlogic-systems",
        title: "Devlogic Systems: Live Commercial Platform & Interactive Scope Engine",
        category: "Commercial & CRM",
        description: "A production commercial platform and real-time interactive software scope estimation engine built with React 19, Vite 6, and Tailwind CSS v4, achieving 100/100 Core Web Vitals and dynamic cost matrix synthesis.",
        tags: ["React 19", "Vite 6", "Tailwind CSS v4", "TypeScript", "Dynamic Scoping Engine", "Edge Delivery"],
        image: "ri-building-line",
        isIcon: true,
        demoLink: "https://devlogicsystems.in",
        repoLink: "https://github.com/pratikk121/Devlogic-New",
        content: `
      <h2>Architectural Overview</h2>
      <p>Devlogic Systems is the live commercial platform for Devlogic, an engineering agency specializing in custom software development and cloud architecture. The system features an interactive Project Scoping Engine - a client-facing tool that allows enterprise clients to model application architectures, technical stack combinations, security compliance tiers, and team composition to receive instant, mathematically modeled development timelines and budget projections. Built with React 19, Vite 6, and Tailwind CSS v4, the application is deployed on edge CDNs for near-zero global TTFB.</p>

      <ul>
        <li><strong>Interactive Scope Engine:</strong> Directed acyclic graph (DAG) dependency solver that computes engineering man-hours, operational risk multipliers, and infrastructure overheads based on chosen features.</li>
        <li><strong>Real-Time Proposal Synthesizer:</strong> Dynamic client-side document compiler that packages selected architectural parameters into downloadable enterprise proposals and pushes structured leads to CRM webhooks.</li>
        <li><strong>Micro-Interaction System:</strong> Fluid layout transitions and physics-based interactions orchestrated via Framer Motion with hardware-accelerated transforms.</li>
        <li><strong>Zero-Runtime CSS Layer:</strong> Built on the bleeding edge of Tailwind CSS v4 using the CSS-first configuration engine without legacy PostCSS compilation overhead.</li>
      </ul>

      <h2>Engineering Challenges Solved</h2>
      <h3>Graph Dependency Resolution in Client-Side Scoping</h3>
      <p>Software features have complex prerequisite graphs (e.g., choosing 'Real-time Chat' automatically requires 'WebSocket Infrastructure' and 'Message Storage Tiers'). Implemented a topological sorting dependency resolver in pure TypeScript that automatically infers, activates, and calculates pricing for required dependencies with zero layout thrashing or recursive re-render loops.</p>

      <h3>Eliminating Bundle Bloat & Achieving 100/100 Core Web Vitals</h3>
      <p>Corporate showcase sites often suffer from heavy JavaScript bundles due to marketing animations and form wizards. Leveraged React 19 server-ready primitives, dynamic code splitting with Vite 6 manual chunking, and SVG vector optimization, slashing total initial JavaScript execution to under 38KB and achieving 100/100 across all Google Lighthouse metrics.</p>

      <h3>Edge Lead Dispatch & Resilient Form Ingestion</h3>
      <p>Client proposals must never fail to dispatch during network interruptions. Engineered an offline-tolerant form submission handler with exponential backoff retries, local storage fallback queues, and end-to-end payload encryption before transmission to webhook endpoints.</p>

      <h2>Key Capabilities & Production Metrics</h2>
      <ul>
        <li><strong>100/100 Lighthouse Score:</strong> Perfect 100/100 across Performance, Accessibility, Best Practices, and SEO.</li>
        <li><strong>Sub-0.7s FCP:</strong> Sub-0.7s First Contentful Paint and 0.00 Cumulative Layout Shift (CLS) on 4G mobile networks.</li>
        <li><strong>&lt;5ms Graph Evaluation:</strong> Real-time client scope modeling generating complex multi-tier project estimations in under 5ms.</li>
        <li><strong>Live Production Platform:</strong> Serving high-value enterprise inquiries in production at <a href="https://devlogicsystems.in" target="_blank" rel="noopener noreferrer">devlogicsystems.in</a>.</li>
      </ul>
    `
    },
    {
        id: "4",
        slug: "precision-crm",
        title: "Precision CRM: Next.js 16 App Router CRM",
        category: "Commercial & CRM",
        description: "A high-performance pipeline and customer relationship platform engineered with Next.js 16 App Router, Neon Serverless PostgreSQL, Prisma ORM, and Auth.js, featuring zero-waterfall Server Components and optimistic mutations.",
        tags: ["Next.js 16", "Neon PostgreSQL", "Prisma ORM", "Auth.js", "Server Actions", "Optimistic UI", "RSC"],
        image: "ri-user-settings-line",
        isIcon: true,
        demoLink: "https://github.com/pratikk121/CRM",
        repoLink: "https://github.com/pratikk121/CRM",
        content: `
      <h2>Architectural Overview</h2>
      <p>Precision CRM is a modern sales operations and customer management platform designed for speed, clarity, and uncompromising responsiveness. Architected on Next.js 16's App Router, it maximally exploits React Server Components (RSC) to perform direct, secure database queries at the server layer with zero client-bundle footprint. Data mutations are executed through type-safe Server Actions paired with React's <code>useOptimistic</code> hook, delivering zero-latency UI responses during complex kanban pipeline transitions.</p>

      <ul>
        <li><strong>Serverless PostgreSQL Data Tier:</strong> Hosted on Neon Serverless with connection pooling via PgBouncer proxy, scaling compute down to zero while sustaining instant cold-start queries.</li>
        <li><strong>RSC Pipeline Streaming:</strong> Deal pipelines and customer matrices streamed to the client using React Suspense boundaries, rendering skeleton UI instantly while database queries resolve in parallel.</li>
        <li><strong>Optimistic Kanban Board:</strong> Fluid drag-and-drop opportunity board allowing sales reps to reorder stages and values with instant client visual feedback and automatic rollbacks on network exceptions.</li>
        <li><strong>Secure Authentication Layer:</strong> Auth.js (NextAuth v5) integration utilizing session cookies, JWT verification, and automated CSRF protection with strict middleware route guards.</li>
      </ul>

      <h2>Engineering Challenges Solved</h2>
      <h3>Connection Exhaustion on Serverless PostgreSQL</h3>
      <p>Next.js Server Actions running in serverless environments can quickly exhaust Postgres connection limits during bursty user traffic. Configured Neon's HTTP-based query driver and integrated serverless connection pooling with Prisma client singleton caching, preventing pool starvation and maintaining &lt;30ms query latency under load.</p>

      <h3>Optimistic State Consistency Across Nested Deals</h3>
      <p>Moving a deal between pipeline stages updates deal stage, column totals, opportunity probabilities, and weighted revenue simultaneously. Built a centralized optimistic reducer utilizing <code>useOptimistic</code> and React 19 action transitions that computes cascading financial rollups on the client before the server mutation acknowledges.</p>

      <h3>Zero-Waterfall RSC Query Architecture</h3>
      <p>Prevented parent-child query waterfalls by restructuring dashboard data loaders into <code>Promise.all</code> concurrent server fetches executed at the root layout level, cutting time-to-interactive by 62% across slow connections.</p>

      <h2>Key Capabilities & Production Metrics</h2>
      <ul>
        <li><strong>&lt;150ms Deal Transitions:</strong> Sub-150ms end-to-end deal stage transition with zero visual latency via optimistic updates.</li>
        <li><strong>Zero Client JS for Reads:</strong> Zero client-side JavaScript shipped for static read views and analytics tables.</li>
        <li><strong>End-to-End Type Safety:</strong> 100% type-safe end-to-end data pipeline from Prisma schema definitions to client components.</li>
        <li><strong>Asynchronous Lead Scoring:</strong> Automated lead scoring algorithm executing via server-side asynchronous task triggers.</li>
      </ul>
    `
    }
];
