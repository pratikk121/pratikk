# Pratik Kadole — Portfolio

Personal developer portfolio and project showcase for Pratik Kadole, software engineer based in India. Built with Next.js App Router, React 19, TypeScript, and Tailwind CSS.

Live site: [pratikk.site](https://pratikk.site)  
Source repository: [github.com/pratikk121/pratikk](https://github.com/pratikk121/pratikk)

---

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server-Side Static Generation)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Remix Icon](https://remixicon.com/)
- **Command Menu:** [cmdk](https://cmdk.paco.me/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🏛 Architecture & Core Principles

- **Evidence-First Content:** All featured projects link to public repositories on GitHub with transparent explanations of architectural choices, constraints, and limitations.
- **Editorial & Restrained Design:** Clean dark palette (Void Black `#000000`, 1px graphite hairlines `#292d30`, Inter typography, and subtle violet accents).
- **Fast Static Generation:** All case study pages are pre-rendered at build time via `generateStaticParams` with zero runtime client-side fetching waterfalls.
- **Accessible & Responsive:** Mobile-first layout, full keyboard navigation support, visible focus rings, and strict `prefers-reduced-motion` compliance.

---

## 📁 Project Structure

```
├── app/
│   ├── about/             # About page route
│   ├── api/contact/       # Contact form submission endpoint
│   ├── contact/           # Dedicated contact route
│   ├── work/              # Projects index
│   │   └── [slug]/        # Static case study pages (SSG)
│   ├── globals.css        # Tailwind v4 configuration & tokens
│   ├── layout.tsx         # Root layout with metadata and navigation
│   └── page.tsx           # Homepage (Hero, Selected Works, About, Contact)
├── components/            # Reusable UI components
│   ├── About.tsx          # Engineering philosophy & tools breakdown
│   ├── CommandPalette.tsx # Global ⌘K quick switcher
│   ├── Contact.tsx        # Contact form & communication channels
│   ├── Footer.tsx         # Minimalist footer
│   ├── Hero.tsx           # Editorial hero with direct evidence links
│   ├── Navbar.tsx         # Navigation header
│   └── SelectedWorks.tsx  # Project evidence cards with category filters
├── data/
│   └── projects.ts        # Structured data model for all public projects
└── public/                # Static assets, favicon, open graph image
```

---

## 🚀 Local Development

### Prerequisites

- Node.js 18.17+ or Node.js 20+
- npm or pnpm

### Getting Started

```bash
# Clone the repository
git clone https://github.com/pratikk121/pratikk.git
cd pratikk

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Turbopack |
| `npm run build` | Compiles the production build with static generation |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint checks across the codebase |

---

## 📄 Managing Content

All project metadata, problem statements, technical decisions, and case study notes are maintained in [`data/projects.ts`](./data/projects.ts). Adding or updating a project automatically generates its static case study route (`/work/[slug]`) and populates the project grid and command palette.

---

## 🔒 Security & Privacy

- No third-party tracking scripts, advertising trackers, or external analytics cookies.
- Static generation minimizes server attack surface.
- Form submissions sanitize payload fields before processing.

---

## 📝 License

Open source under the [MIT License](./LICENSE). Feel free to use the structure for your own portfolio.
