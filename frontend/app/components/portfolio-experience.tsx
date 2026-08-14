"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Code2,
  Database,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Terminal,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";

const Particles = dynamic(() => import("@tsparticles/react"), {
  ssr: false,
  loading: () => null,
});

type ThemeKey = "cyberpunk" | "volcanic" | "emerald";

const themes: Record<ThemeKey, { label: string; colors: [string, string] }> = {
  cyberpunk: { label: "Cyberpunk", colors: ["#22d3ee", "#3b82f6"] },
  volcanic: { label: "Volcanic", colors: ["#fb7185", "#f97316"] },
  emerald: { label: "Emerald", colors: ["#34d399", "#14b8a6"] },
};

const navItems = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const stats = [
  ["1.5+", "Years Experience"],
  ["1 mo", "Nexeagent Internship"],
  ["SEO", "Optimization"],
  ["Lazy", "Performance Loading"],
];

const skills = [
  { group: "Frontend", icon: Code2, items: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"] },
  { group: "Backend", icon: Server, items: ["Node.js", "Python", "FastAPI", "Django", "REST APIs"] },
  { group: "Mobile", icon: Smartphone, items: ["Flutter", "Responsive UI", "App Workflows"] },
  { group: "E-commerce", icon: ShoppingBag, items: ["Amazon FBA", "Shopify Setup", "Store Customization", "Daraz Seller Central"] },
  { group: "Agentic AI Engineering", icon: Bot, items: ["AI Agent Open SDK", "Spec-Driven AI", "AI Agent Workflows", "Automation", "Nexeagent Workflows"] },
  { group: "SEO & Performance", icon: Rocket, items: ["Technical SEO", "Metadata", "Structured Data", "Lazy Loading", "Responsive Performance"] },
  { group: "Tools", icon: Database, items: ["Git", "WordPress", "Agile/Scrum", "Microsoft Office"] },
];

const experiences = [
  {
    title: "Nexeagent Internship",
    period: "1 Month",
    points: [
      "Built practical experience with AI-assisted development workflows and modern web delivery.",
      "Worked on SEO optimization, lazy loading, UI toggle behavior, and performance-focused portfolio improvements.",
    ],
  },
  {
    title: "Amazon FBA Wholesale Virtual Assistant",
    period: "Nov 2023 - Present",
    points: [
      "Certified in product sourcing and wholesale inventory management for the US market.",
      "Built strong supplier relationships and conducted competitive pricing analysis.",
    ],
  },
  {
    title: "Shopify Store Setup Virtual Assistant",
    period: "Jan 2024 - Feb 2024",
    points: [
      "Developed and customized a fully functional Shopify e-commerce store for a US client.",
      "Handled theme customization, product integration, and store optimization.",
    ],
  },
  {
    title: "Daraz Seller Central Manager",
    period: "May 2023 - Present",
    points: [
      "Successfully running and scaling a personal Daraz store.",
      "Manage product listings, order fulfillment, customer service, and sales analytics.",
    ],
  },
];

const projects = [
  {
    name: "Developer Projects Dashboard",
    description: "Full-stack developer portfolio dashboard showcasing projects, skills, analytics, demos, and deployment links.",
    tagA: "Full Stack",
    tagB: "Dashboard",
    href: "https://6-tasks-dashboard.vercel.app/",
  },
  {
    name: "Nebula Analytics",
    description: "Next-generation SaaS analytics dashboard for modern teams.",
    tagA: "SaaS",
    tagB: "Analytics",
    href: "https://frontend-sigma-pied-91.vercel.app/",
  },
  {
    name: "Intermediate Blog Platform",
    description: "Modern, cyberpunk-inspired blog platform for publishing and exploring content.",
    tagA: "Blog",
    tagB: "Platform",
    href: "https://task3-intermediate-blog-plateform-f.vercel.app/",
  },
  {
    name: "Nebula Tasks",
    description: "Authentication-based cosmic task-management application.",
    tagA: "Tasks",
    tagB: "Auth",
    href: "https://frontend-fawn-sigma-90.vercel.app/",
  },
  {
    name: "Nexus Store",
    description: "Premium dark cosmic e-commerce platform for futuristic devices.",
    tagA: "E-commerce",
    tagB: "Storefront",
    href: "https://task4-intermediate-e-commerce-front.vercel.app/",
  },
  {
    name: "Nexe Blog Platform",
    description: "Modern, cyberpunk-inspired blog platform with a distinct Nexe deployment.",
    tagA: "Blog",
    tagB: "Nexe",
    href: "https://nexe-blog-frontend.vercel.app/",
  },
  {
    name: "Memory Game",
    description: "Interactive web game built with React and TypeScript.",
    tagA: "React",
    tagB: "TypeScript",
    href: "https://vercel.com/roxyross-projects",
  },
  {
    name: "Preparatory School Portal",
    description: "Full-stack school management system for academic operations.",
    tagA: "Next.js",
    tagB: "Backend",
    href: "https://vercel.com/roxyross-projects",
  },
  {
    name: "E-commerce Store",
    description: "Modern full-stack online store with product and order flows.",
    tagA: "Full Stack",
    tagB: "Commerce",
    href: "https://vercel.com/roxyross-projects",
  },
  {
    name: "Shopify Store",
    description: "Custom-built Shopify storefront with advanced features.",
    tagA: "Shopify",
    tagB: "UX",
    href: "https://vercel.com/roxyross-projects",
  },
  {
    name: "Vercel Dashboard Projects",
    description: "Workspace collection for current Vercel deployments and project updates.",
    tagA: "Vercel",
    tagB: "Deployments",
    href: "https://vercel.com/roxyross-projects",
  },
];

const education = [
  "Certificate in Entrepreneurship Development (CED) - IBA University (2024-2025)",
  "Advanced Studies - GIAIC (2022-Present): Next.js, TypeScript, Node.js, Python FastAPI, AI Agent Open SDK & Spec-Driven AI",
  "Full Stack Web & App Developer - Code Girls Bootcamp (Women in Tech)",
  "Amazon FBA Wholesale Certification (2023-2024)",
  "ACCA Part 1 Qualified - Tabani's School of Accountancy",
];

const terminalLines = [
  "booting portfolio-core.exe",
  "loading full-stack modules...",
  "syncing e-commerce intelligence...",
  "deploying AI agent workflows...",
  "status: ready to build luminous digital systems",
];

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.38em] text-[var(--accent)]">{eyebrow}</p>
        <h2 className="mt-4 font-display text-3xl font-black uppercase text-white sm:text-5xl">{title}</h2>
        <div className="mt-10">{children}</div>
      </motion.div>
    </section>
  );
}

export function PortfolioExperience() {
  const [theme, setTheme] = useState<ThemeKey>("cyberpunk");
  const [menuOpen, setMenuOpen] = useState(false);
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [particlesReady, setParticlesReady] = useState(false);
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (!effectsEnabled || particlesReady) return;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, [effectsEnabled, particlesReady]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const text = terminalLines.join("\n> ");
    let index = 0;
    const timer = window.setInterval(() => {
      setTyped(text.slice(0, index));
      index += 1;
      if (index > text.length) window.clearInterval(timer);
    }, 28);
    return () => window.clearInterval(timer);
  }, []);

  const particleOptions = useMemo<ISourceOptions>(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      fullScreen: { enable: false },
      interactivity: {
        events: { onHover: { enable: true, mode: "repulse" }, resize: { enable: true } },
        modes: { repulse: { distance: 110, duration: 0.6 } },
      },
      particles: {
        color: { value: themes[theme].colors },
        links: { color: themes[theme].colors[0], distance: 145, enable: true, opacity: 0.22, width: 1 },
        move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 0.55 },
        number: { density: { enable: true }, value: 92 },
        opacity: { value: { min: 0.18, max: 0.72 } },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    [theme],
  );

  async function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

    try {
      const response = await fetch(`${apiBase}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Contact request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-white">
      <div className="pointer-events-none fixed inset-0 cyber-grid opacity-35" />
      {effectsEnabled && particlesReady ? (
        <Particles id="space-particles" className="pointer-events-none fixed inset-0" options={particleOptions} />
      ) : null}

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-2xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#hero" className="font-display text-lg font-black tracking-[0.28em] text-white">
            RJ<span className="text-[var(--accent)]">.</span>
          </a>
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().split(" ")[0]}`} className="text-sm text-slate-300 transition hover:text-[var(--accent)]">
                {item}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => setEffectsEnabled((value) => !value)}
              aria-pressed={effectsEnabled}
              className="glass inline-flex h-10 items-center gap-2 rounded-lg px-3 text-xs font-bold uppercase tracking-wider text-slate-200 transition hover:border-[var(--accent)]"
            >
              {effectsEnabled ? <ToggleRight size={18} className="text-[var(--accent)]" /> : <ToggleLeft size={18} />}
              Effects
            </button>
            {(Object.keys(themes) as ThemeKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`h-10 rounded-full border px-4 text-xs font-bold uppercase tracking-wider transition ${
                  theme === key ? "border-[var(--accent)] bg-[var(--accent)] text-slate-950 shadow-[0_0_22px_var(--shadow)]" : "border-white/10 bg-white/5 text-slate-300 hover:border-[var(--accent)]"
                }`}
              >
                {themes[key].label}
              </button>
            ))}
          </div>
          <button className="glass grid size-11 place-items-center rounded-lg lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        {menuOpen ? (
          <div className="glass mx-5 mb-4 rounded-lg p-4 lg:hidden">
            <div className="grid gap-3">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase().split(" ")[0]}`} onClick={() => setMenuOpen(false)} className="text-sm text-slate-200">
                  {item}
                </a>
              ))}
              <button
                onClick={() => setEffectsEnabled((value) => !value)}
                aria-pressed={effectsEnabled}
                className="inline-flex items-center gap-2 text-left text-sm text-slate-200"
              >
                {effectsEnabled ? <ToggleRight size={18} className="text-[var(--accent)]" /> : <ToggleLeft size={18} />}
                Effects {effectsEnabled ? "on" : "off"}
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <section id="hero" className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="glass inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm text-slate-200">
            <Sparkles size={16} className="text-[var(--accent)]" />
            Karachi, Pakistan - Agentic AI Engineer
          </div>
          <h1 className="mt-7 max-w-4xl font-display text-5xl font-black uppercase leading-tight sm:text-7xl lg:text-8xl">
            Ramsha <span className="neon-text">Jawaid</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Agentic AI Engineer, full-stack web developer, and e-commerce specialist with 1.5+ years of hands-on experience, including a one-month
            Nexeagent internship focused on AI agent workflows, SEO optimization, lazy loading, UI toggles, and AI-assisted web delivery.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--accent)] px-6 font-bold text-slate-950 shadow-[0_0_30px_var(--shadow)] transition hover:scale-[1.02]">
              Initiate Contact <Send size={18} />
            </a>
            <a href="https://github.com/roxyross" target="_blank" rel="noreferrer" className="glass inline-flex h-12 items-center gap-2 rounded-lg px-6 font-bold text-white transition hover:border-[var(--accent)]">
              GitHub <Github size={18} />
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="glass rounded-lg p-4">
                <div className="font-display text-2xl font-black text-[var(--accent)]">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="relative" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
          <div className="absolute inset-0 m-auto size-72 rounded-full bg-[var(--accent)] opacity-20 blur-3xl sm:size-96" />
          <motion.div
            className="relative mx-auto grid aspect-square w-full max-w-[430px] place-items-center rounded-full border border-[var(--border)] bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.35),var(--accent)_0%,transparent_52%),radial-gradient(circle,var(--panel-strong),transparent_72%)] shadow-[0_0_80px_var(--shadow)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-10 rounded-full border border-dashed border-white/25" />
            <div className="absolute inset-20 rounded-full border border-[var(--accent)]/45 shadow-[inset_0_0_30px_var(--shadow)]" />
            <Terminal className="relative z-10 text-white drop-shadow-[0_0_18px_var(--accent)]" size={76} />
          </motion.div>
          <div className="glass relative -mt-16 rounded-lg p-5 font-mono text-sm leading-7 text-[var(--accent)]">
            <div className="mb-3 flex gap-2">
              <span className="size-3 rounded-full bg-rose-400" />
              <span className="size-3 rounded-full bg-amber-300" />
              <span className="size-3 rounded-full bg-emerald-400" />
            </div>
            <pre className="min-h-36 whitespace-pre-wrap text-wrap terminal-caret">{`> ${typed}`}</pre>
          </div>
        </motion.div>
      </section>

      <Section id="about" eyebrow="01 / Profile" title="About The Builder">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass rounded-lg p-6">
            <p className="text-lg leading-8 text-slate-300">
              Ramsha Jawaid is an Agentic AI Engineer who blends AI agent workflows, full-stack engineering, SEO optimization, and commerce
              operations into digital products that are fast, usable, discoverable, and commercially aware.
            </p>
            <div className="mt-8 grid gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-3"><MapPin className="text-[var(--accent)]" size={18} /> Karachi, Pakistan</span>
              <span className="flex items-center gap-3"><Phone className="text-[var(--accent)]" size={18} /> +92 313 2638263</span>
              <span className="flex items-center gap-3"><Mail className="text-[var(--accent)]" size={18} /> rijienterprise@gmail.com</span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Agentic AI workflows", "Modern web apps", "SEO-ready pages"].map((item, index) => (
              <motion.div key={item} className="glass rounded-lg p-6" whileHover={{ y: -8, boxShadow: "0 0 46px var(--shadow)" }}>
                <Rocket className="mb-8 text-[var(--accent)]" />
                <div className="font-display text-3xl font-black">0{index + 1}</div>
                <p className="mt-3 text-sm uppercase tracking-widest text-slate-300">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="skills" eyebrow="02 / Stack" title="Skills Matrix">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.article key={skill.group} className="glass rounded-lg p-6" whileHover={{ y: -8 }}>
                <Icon className="text-[var(--accent)]" size={30} />
                <h3 className="mt-5 font-display text-xl font-bold">{skill.group}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </Section>

      <Section id="experience" eyebrow="03 / Timeline" title="Experience">
        <div className="relative grid gap-6 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-[var(--accent)]/40">
          {experiences.map((item) => (
            <motion.article key={item.title} className="glass relative ml-10 rounded-lg p-6" whileHover={{ x: 8 }}>
              <span className="absolute -left-[2.85rem] top-6 size-4 rounded-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent)]" />
              <div className="flex flex-wrap items-start justify-between gap-4">
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <span className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-xs text-[var(--accent)]">{item.period}</span>
              </div>
              <ul className="mt-5 grid gap-3 text-slate-300">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3"><ShieldCheck className="mt-1 shrink-0 text-[var(--accent)]" size={16} /> {point}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="projects" eyebrow="04 / Builds" title="Projects">
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <motion.article key={project.name} className="group glass rounded-lg p-6" whileHover={{ y: -8 }}>
              <div className="flex items-center justify-between gap-4">
                <BriefcaseBusiness className="text-[var(--accent)]" />
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.name}`}
                  className="grid size-10 place-items-center rounded-lg border border-white/10 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
              <h3 className="mt-8 font-display text-2xl font-bold">{project.name}</h3>
              <p className="mt-3 text-slate-300">{project.description}</p>
              <div className="mt-6 flex gap-2">
                <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-slate-950">{project.tagA}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{project.tagB}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="education" eyebrow="05 / Signal" title="Education & Certifications">
        <div className="grid gap-4">
          {education.map((item) => (
            <div key={item} className="glass flex gap-4 rounded-lg p-5 text-slate-300">
              <GraduationCap className="shrink-0 text-[var(--accent)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="06 / Uplink" title="Contact">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass rounded-lg p-6">
            <h3 className="font-display text-2xl font-bold">Build the next launch.</h3>
            <p className="mt-4 leading-7 text-slate-300">
              Send a message for web apps, Shopify builds, Amazon FBA support, Daraz operations, or AI-powered workflows.
            </p>
            <div className="mt-8 grid gap-4 text-sm text-slate-300">
              <a className="flex items-center gap-3 hover:text-[var(--accent)]" href="mailto:rijienterprise@gmail.com"><Mail size={18} /> rijienterprise@gmail.com</a>
              <a className="flex items-center gap-3 hover:text-[var(--accent)]" href="tel:+923132638263"><Phone size={18} /> +92 313 2638263</a>
              <a className="flex items-center gap-3 hover:text-[var(--accent)]" href="https://github.com/roxyross" target="_blank" rel="noreferrer"><Github size={18} /> github.com/roxyross</a>
            </div>
          </div>
          <form onSubmit={handleContact} className="glass grid gap-4 rounded-lg p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" required minLength={2} placeholder="Your name" className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[var(--accent)]" />
              <input name="email" required type="email" placeholder="Email address" className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[var(--accent)]" />
            </div>
            <input name="subject" required minLength={3} placeholder="Subject" className="rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[var(--accent)]" />
            <textarea name="message" required minLength={10} rows={6} placeholder="Message" className="resize-none rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-[var(--accent)]" />
            <button disabled={status === "sending"} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 font-bold text-slate-950 transition hover:scale-[1.01] disabled:cursor-wait disabled:opacity-70">
              {status === "sending" ? "Transmitting..." : "Send Message"} <Send size={18} />
            </button>
            {status === "sent" ? <p className="text-sm text-emerald-300">Message saved successfully.</p> : null}
            {status === "error" ? <p className="text-sm text-rose-300">Unable to send right now. Check the API URL and backend status.</p> : null}
          </form>
        </div>
      </Section>
    </main>
  );
}
