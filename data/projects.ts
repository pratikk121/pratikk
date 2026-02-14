export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
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
        slug: "pratik-os",
        title: "PratikOS v1",
        description: "An interactive, web-based operating system featuring a simulated file system, window manager, and real-time apps.",
        content: `
      <h2>The Concept</h2>
      <p>PratikOS is a web-based operating system simulation built entirely with Vanilla JavaScript and CSS. It demonstrates the power of modern web technologies to recreate complex desktop environments in the browser.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li><strong>Window Manager:</strong> Draggable, resizable, and minimizable windows with active state management.</li>
        <li><strong>File System:</strong> A simulated file system structure allowing navigation through folders and files.</li>
        <li><strong>Taskbar:</strong> Fully functional taskbar with start menu, clock, and running application indicators.</li>
        <li><strong>Theme Engine:</strong> Dynamic theming support with glassmorphism effects.</li>
      </ul>

      <h2>Technical Challenges</h2>
      <p>One of the main challenges was managing the z-index stacking context for window management to ensure the active window is always on top. I implemented a custom state manager to handle window focus and layering logic.</p>
    `,
        tags: ["Vanilla JS", "CSS Grid", "Supabase"],
        image: "ri-macbook-line",
        isIcon: true,
        demoLink: "/sandbox/pratikOS/index.html",
        repoLink: "https://github.com/pratikk121/pratikk"
    }
];
