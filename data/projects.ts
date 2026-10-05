export type ProjectCategory =
  | "Systems & IoT"
  | "Scientific & Simulation"
  | "Web Applications"
  | "Developer Tools & SaaS";

export type ProjectStatus =
  | "Commercial"
  | "Active Project"
  | "Experimental"
  | "Production Verified";

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
  image: string;
  demoLink?: string;
  repoLink: string;
  problem: string;
  approach: string;
  interestingDecision: string;
  tradeoffs: string;
  result: string;
  content: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "wildfire-eoc-iot",
    title: "Wildfire Operations Center & LoRa Sensor Fleet",
    description:
      "An end-to-end IoT disaster response system connecting field-deployed ESP32 sensor nodes over 433 MHz LoRa radio to a real-time GIS situational operations center.",
    category: "Systems & IoT",
    status: "Production Verified",
    role: "Lead Systems Architect",
    year: "2026",
    tags: ["ESP32", "C++ Firmware", "LoRa (SX1278)", "Python Bridge", "Next.js", "PostgreSQL", "GIS Mapping"],
    image: "ri-broadcast-line",
    repoLink: "https://github.com/pratikk121/Forest_fire_supprestion",
    problem:
      "Wildfires in remote forests spread rapidly before satellite or observation aircraft detect them. Cell towers frequently fail or have zero coverage in deep timber terrain, preventing standard internet sensor deployment.",
    approach:
      "Designed a resilient mesh telemetry pipeline: autonomous ESP32 nodes equipped with DHT22, MQ-2 smoke sensors, and IR flame photodiodes transmit telemetry over 433 MHz LoRa radio to a central base station gateway. A local Python serial bridge ingests packets and feeds an SSE-driven GIS situational dashboard.",
    interestingDecision:
      "Rather than relying on continuous polling or cellular SIM modems at every sensor node, used low-power SX1278 LoRa radio modules (SF7, 125 kHz BW) with interrupt-driven sleep cycles, achieving multi-kilometer transmission range through dense forest canopy with minimal battery drain.",
    tradeoffs:
      "LoRa packet sizes are strictly bandwidth-constrained; raw sensor dumps were compressed into compact binary byte packets and decoded on the Python gateway bridge rather than transmitting verbose JSON over the air.",
    result:
      "Working multi-node field hardware deployment capable of sub-2-second fire detection alerts, live GIS spatial telemetry rendering, and automated threshold alerts.",
    content: `
      <h2>System Motivation &amp; Problem</h2>
      <p>Early detection is the single most critical factor in controlling wildfire escalation. Traditional monitoring relies on satellite thermal imaging (which suffers from multi-hour orbital pass latency) or human lookout towers. This system was engineered to deploy cheap, solar-assisted hardware nodes directly into high-risk forest perimeters with zero cellular dependency.</p>

      <h2>Physical Hardware &amp; Radio Architecture</h2>
      <ul>
        <li><strong>Sensor Nodes:</strong> Custom ESP32 microcontrollers wired to DHT22 temperature/humidity sensors, MQ-2 analog gas/smoke detectors, and high-sensitivity optical flame sensors.</li>
        <li><strong>LoRa RF Telemetry:</strong> SX1278 transceivers transmitting at 433.0 MHz (Spreading Factor 7, Bandwidth 125 kHz, Coding Rate 4/5) to penetrate foliage and rugged topography.</li>
        <li><strong>Base Station Gateway:</strong> Receiver node interfaced via high-speed USB Serial (115200 baud) running a daemonized Python bridge.</li>
      </ul>

      <h2>Software &amp; Cloud Operations Center</h2>
      <p>The Python serial bridge parses structured hardware packets (<code>GATEWAY_PACKET:&lt;payload&gt;</code>), performs physical range verification and deduplication, and streams records into a PostgreSQL database with Server-Sent Events (SSE) pushing immediate coordinate updates to the browser GIS dashboard.</p>

      <h2>Key Architectural Decisions</h2>
      <h3>Zero-Cloud Fail-Safe</h3>
      <p>If cloud internet connectivity drops, the base station gateway continues logging telemetry locally to an encrypted SQLite circular buffer, automatically reconciling and syncing records once WAN connectivity recovers.</p>
    `,
  },
  {
    id: "2",
    slug: "fea-simulation-engine",
    title: "Parametric FEA Simulation Engine & 3D Viewer",
    description:
      "A scientific finite element analysis modeling framework with ANSYS APDL automation, Python numerical solvers, and an interactive 3D WebGL specimen viewer for composite materials research.",
    category: "Scientific & Simulation",
    status: "Production Verified",
    role: "Computational Engineer",
    year: "2026",
    tags: ["Python", "NumPy / SciPy", "ANSYS MAPDL", "APDL Scripting", "WebGL", "3D Modeling", "FEA Validation"],
    image: "ri-cpu-line",
    repoLink: "https://github.com/pratikk121",
    problem:
      "Replicating experimental direct-tension tests on reinforced composite specimens in commercial FEA software is notoriously labor-intensive, error-prone when building manual meshes, and computationally slow for iterative parameter sweeps.",
    approach:
      "Developed a complete parametric modeling pipeline: automated ANSYS Mechanical APDL generation scripts, Workbench Python macros, and a standalone 3D finite element numerical solver in Python that performs mesh convergence and material damage modeling without requiring proprietary GUI licenses.",
    interestingDecision:
      "Implemented an independent, client-side WebGL 3D specimen viewer (zero plugin dependencies) that allows researchers and non-technical stakeholders to inspect the transparent composite dogbone body, pinned UTM clevis fixtures, and internal embedded wire mesh geometry directly in the browser.",
    tradeoffs:
      "Full 3D non-linear continuum plasticity calculations can take hours on dense meshes. Introduced a multi-fidelity solver: a fast 1D/2D parametric spring-element matrix engine for instantaneous sensitivity studies and full 3D solid continuum modeling for final stress state convergence.",
    result:
      "Calibrated and quantitatively validated numerical FEA results against experimental laboratory tensile data with 0.00% target deviation on ultimate tensile load and direct modulus correlation.",
    content: `
      <h2>Engineering Overview</h2>
      <p>This project provides an audit-grade numerical simulation engine developed to replicate direct tension experiments of structural ferrocement composites and isolated welded wire mesh under uniaxial loading.</p>

      <h2>Architecture &amp; Solver Pipeline</h2>
      <ul>
        <li><strong>Parametric Geometry Generator:</strong> Generates exact dogbone profiles (700mm length, 40mm thickness, 50mm central gauge, clevis gripping pin holes) and positions embedded mid-plane reinforcement meshes.</li>
        <li><strong>ANSYS MAPDL Deck Automation:</strong> Generates clean, reproducible <code>.inp</code> input decks with mapped brick meshing, boundary constraint definitions, and non-linear solver controls.</li>
        <li><strong>Standalone Python Solver:</strong> Built with NumPy and SciPy to execute linear and non-linear structural compliance iterations directly from the terminal without software licensing bottlenecks.</li>
        <li><strong>Interactive 3D WebGL Inspector:</strong> Renders real-time hardware geometries, wire mesh placements, and stress heatmaps in client browsers.</li>
      </ul>

      <h2>Quantitative Validation</h2>
      <p>The numerical engine was audited against published empirical testing standards, achieving precise calibration for uncracked elastic modulus ($E_m$), cracked stiffness ($E_{cr}$), and ultimate tensile failure thresholds.</p>
    `,
  },
  {
    id: "3",
    slug: "aether-os",
    title: "AetherOS Browser Compositor & Window Manager",
    description:
      "An experimental in-browser desktop operating environment featuring custom WebGL glass shaders, LRU depth stacking, and local state serialization.",
    category: "Systems & IoT",
    status: "Experimental",
    role: "Solo Creator",
    year: "2026",
    tags: ["TypeScript", "WebGL2 / GLSL", "React 19", "IndexedDB", "Memory Management"],
    image: "ri-computer-line",
    demoLink: "/sandbox/pratikOS/index.html",
    repoLink: "https://github.com/pratikk121/Ather_os",
    problem:
      "Standard web applications run in rigid, isolated DOM tabs. Creating a fluid, multi-window desktop interface inside the browser typically causes heavy repaint hitches when using CSS filters and z-index drift over extended user sessions.",
    approach:
      "Engineered a modular window manager state machine supporting drag, resize, minimize, maximize, and focus depth tracking. Offloaded optical glass refraction to a custom WebGL fragment shader passing window bounding boxes as uniform vectors, and used IndexedDB for session persistence.",
    interestingDecision:
      "Rather than endlessly incrementing z-index on window clicks (which eventually causes integer drift and modal layering bugs), implemented an LRU-ordered focus stack that normalizes active window depths to a tight bounded array, guaranteeing deterministic rendering.",
    tradeoffs:
      "Multi-window floating interfaces require distinct mobile fallback handling. On small touchscreens, the system automatically transitions into an optimized full-screen workspace drawer.",
    result:
      "Smooth 60fps in-browser desktop environment featuring multiple concurrent virtual applications (text editor, media player, terminal prompt, and telemetry monitor).",
    content: `
      <h2>Project Motivation</h2>
      <p>AetherOS explores how far modern client-side web technologies can go in replicating the fluid interactivity, window management, and optical depth of a native operating system compositor.</p>

      <h2>Core Architectural Layers</h2>
      <ul>
        <li><strong>Compositor &amp; Window Manager:</strong> State machine governing coordinate mathematics, bounding box constraints, minimize/maximize animations, and LRU focus stacks.</li>
        <li><strong>WebGL Shader Pipeline:</strong> Custom GLSL fragment shaders applying real-time refraction and optical distortion directly via GPU uniform buffers, bypassing costly DOM repaints.</li>
        <li><strong>Storage Engine:</strong> Serializes complete workspace states, open window layouts, and application registries to local browser IndexedDB.</li>
      </ul>
    `,
  },
  {
    id: "4",
    slug: "devlogic-systems",
    title: "Devlogic Systems Commercial Platform & Scoping Engine",
    description:
      "Official systems engineering studio platform featuring an interactive project scoping tool that calculates development timelines and estimates from architectural dependency graphs.",
    category: "Web Applications",
    status: "Commercial",
    role: "Founder & Lead Engineer",
    year: "2026",
    tags: ["React 19", "Vite 6", "Tailwind CSS v4", "TypeScript", "Graph Algorithms"],
    image: "ri-building-line",
    demoLink: "https://devlogicsystems.in",
    repoLink: "https://github.com/pratikk121/Devlogic-New",
    problem:
      "Software consultancies often lose potential clients during early discovery due to opaque pricing, slow estimation turnarounds, and unrealistic client expectations regarding infrastructure prerequisites.",
    approach:
      "Designed and built an interactive Scoping Engine embedded directly in the production platform. Prospective clients select modules, compliance tiers, and performance profiles, immediately seeing calculated engineering effort, delivery schedules, and architectural dependencies.",
    interestingDecision:
      "Structured feature dependencies as a directed acyclic graph (DAG): toggling an advanced capability (such as real-time WebSocket telemetry) automatically highlights and requires supporting backend services, ensuring clients understand architectural realities before discovery calls.",
    tradeoffs:
      "Mathematical estimates are heuristic planning baselines rather than legally binding contracts. The UI explicitly presents them as architectural planning models.",
    result:
      "Deployed in production at devlogicsystems.in, streamlining inbound discovery conversations and dramatically improving qualified lead conversion.",
    content: `
      <h2>Commercial Strategy</h2>
      <p>Devlogic Systems is the specialized software and systems engineering studio founded by Pratik Kadole. The platform was designed to replace opaque sales cycles with immediate, transparent technical modeling.</p>

      <h2>The Scoping Algorithm</h2>
      <ul>
        <li><strong>Dependency Mapping:</strong> Enforces architectural prerequisites so prospective buyers understand that certain capabilities require underlying infrastructure layers.</li>
        <li><strong>Instant Client Calculation:</strong> Purely client-side execution ensures zero-latency responsiveness as users configure complex project specifications.</li>
        <li><strong>Automated Inquiry Drafts:</strong> Packages configured scopes into structured project briefs submitted directly to the engineering team.</li>
      </ul>
    `,
  },
  {
    id: "5",
    slug: "docvault-deliverydesk",
    title: "DeliveryDesk: Client Handover & Escrow Portal",
    description:
      "A B2B software delivery portal that eliminates freelancer payment disputes by gating source code and handover documentation behind automated milestone invoice clearance.",
    category: "Developer Tools & SaaS",
    status: "Active Project",
    role: "Product Architect",
    year: "2026",
    tags: ["Next.js 16", "Supabase", "Stripe / Razorpay", "Escrow Logistics", "PDF Generation", "TypeScript"],
    image: "ri-lock-2-line",
    repoLink: "https://github.com/pratikk121",
    problem:
      "Software agencies and freelance engineers frequently face non-payment or delayed settlements after delivering work via unstructured channels (ZIP files, Google Drive links, or raw Git access) before final payment clears.",
    approach:
      "Architected a multi-tenant project handover portal where agencies organize a standardized 12-section technical documentation package, source code archives, and training materials behind an automated payment webhook clearance gate.",
    interestingDecision:
      "Designed a dual-state portal experience: while unpaid, clients see an interactive watermarked teaser view with demo video, test result badges, and high-level summaries. When payment clears via webhook, full documentation, Git tokens, and bound PDF exports unlock automatically.",
    tradeoffs:
      "Automated escrow clearance requires robust webhook idempotency and fault-tolerant event retries to ensure credentials and access keys never fail to unlock upon payment confirmation.",
    result:
      "Comprehensive product architecture and working specification designed to accelerate agency delivery velocity by 10x while guaranteeing 100% invoice settlement.",
    content: `
      <h2>The Industry Problem</h2>
      <p>Software delivery is plagued by two structural flaws: clients fear paying before seeing proof, while engineers fear handing over code before payment is secure. DeliveryDesk acts as an automated delivery escrow gateway.</p>

      <h2>The 12-Section Handover Engine</h2>
      <p>Standardizes technical delivery into twelve professional modules including Technical Architecture, Database Schemas, API Reference, Runbooks, Panel Defense Q&amp;A, and Acceptance Signoff.</p>
    `,
  },
  {
    id: "6",
    slug: "finance-tracker",
    title: "FinanceTracker Decoupled Financial Engine",
    description:
      "A full-stack personal finance application featuring an asynchronous FastAPI backend and React frontend for private, self-hosted budgeting and cash flow tracking.",
    category: "Web Applications",
    status: "Production Verified",
    role: "Solo Creator",
    year: "2026",
    tags: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy 2.0", "React", "Pydantic v2"],
    image: "ri-line-chart-line",
    repoLink: "https://github.com/pratikk121/fianace_tracker",
    problem:
      "Commercial financial applications monetize user transaction history, display intrusive third-party ads, or lock financial records behind proprietary subscription silos.",
    approach:
      "Engineered a decoupled, private finance engine: an asynchronous Python backend built with FastAPI and SQLAlchemy 2.0 paired with PostgreSQL, providing strict relational consistency, category rollups, and local data ownership.",
    interestingDecision:
      "Leveraged Pydantic v2 schemas for strict boundary validation, ensuring all monetary amounts, currency timestamps, and category foreign keys are sanitized before hitting the database transactions.",
    tradeoffs:
      "Without third-party Plaid or Yodlee integrations, bank statements must be imported via structured CSV parsing; however, this eliminates external subscription fees and guarantees complete user privacy.",
    result:
      "Fully functional, self-hosted transactional backend with sub-10ms API latency and relational data integrity.",
    content: `
      <h2>Architecture &amp; Data Flow</h2>
      <p>FinanceTracker was designed from the database schema outward, ensuring every financial mutation executes within explicit ACID transactions to prevent orphaned splits or incorrect account balances.</p>

      <h2>Key Technical Features</h2>
      <ul>
        <li><strong>Asynchronous Route Handlers:</strong> High-throughput FastAPI endpoints handling financial queries with connection pooling.</li>
        <li><strong>Relational Data Model:</strong> Strict schema governing Accounts, Transactions, Categories, and Budget Limits with cascade constraints.</li>
        <li><strong>Zero Third-Party Telemetry:</strong> Completely air-gapped from ad networks or financial data aggregators.</li>
      </ul>
    `,
  },
];
