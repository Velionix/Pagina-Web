import { motion } from 'framer-motion';
import {
  Database,
  Globe,
  Webhook,
  Workflow,
  Boxes,
  Sparkles,
  Mail,
  Search,
  Map,
  Github,
  Code2,
  UserCheck,
  Send,
  Clock,
  Cpu,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading, Reveal, staggerParent, staggerChild } from '../Reveal';
import FlowDiagram, { type FlowStep } from '../FlowDiagram';

interface ProjectCase {
  tag: string;
  title: string;
  summary: string;
  stack: { icon: LucideIcon; label: string }[];
  flow: FlowStep[];
  metric: string;
}

const cases: ProjectCase[] = [
  {
    tag: 'Discovery Engine',
    title: 'AI Business Discovery Engine',
    summary:
      'An intelligent data collection system that automatically discovers businesses, extracts relevant information, filters opportunities and sends qualified leads into automation workflows.',
    metric: '188 businesses discovered',
    stack: [
      { icon: Code2, label: 'Python' },
      { icon: Boxes, label: 'FastAPI' },
      { icon: Github, label: 'Playwright' },
      { icon: Github, label: 'Docker' },
      { icon: Globe, label: 'APIs' },
      { icon: Map, label: 'OpenStreetMap' },
      { icon: Workflow, label: 'n8n' },
    ],
    flow: [
      { icon: Database, label: 'Data Sources', sub: 'OpenStreetMap · APIs' },
      { icon: Search, label: 'Python Scraper', sub: 'Geospatial crawl' },
      { icon: Cpu, label: 'Data Processing', sub: 'Filter & enrich' },
      { icon: Webhook, label: 'Webhook', sub: 'Event relay' },
      { icon: Workflow, label: 'Automation System', sub: 'n8n orchestration' },
    ],
  },
  {
    tag: 'Sales Automation',
    title: 'AI Sales Automation Platform',
    summary:
      'An intelligent workflow that receives leads, analyzes companies with AI, generates personalized communication and automates outreach.',
    metric: '164 qualified opportunities',
    stack: [
      { icon: Workflow, label: 'n8n' },
      { icon: Sparkles, label: 'Gemini AI' },
      { icon: Mail, label: 'Gmail API' },
      { icon: Webhook, label: 'Webhooks' },
      { icon: Database, label: 'Database Systems' },
    ],
    flow: [
      { icon: UserCheck, label: 'Lead Received', sub: 'From discovery engine' },
      { icon: Sparkles, label: 'AI Analysis', sub: 'Gemini reasoning' },
      { icon: Search, label: 'Company Research', sub: 'Enrichment' },
      { icon: Mail, label: 'Personalized Message', sub: 'Drafted by AI' },
      { icon: Send, label: 'Email Delivery', sub: 'Gmail dispatch' },
      { icon: Clock, label: 'Follow Up', sub: 'Automated sequence' },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-28 sm:py-36">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gold-400/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Featured Projects"
          title={<>Technology we&apos;ve <span className="text-gradient-gold">shipped</span></>}
          description="Not projects — products. Real autonomous pipelines running in production, each one a fully automated loop from raw data to customer outreach."
        />

        <div className="mt-16 space-y-6">
          {cases.map((c, idx) => (
            <ProjectCard key={c.title} project={c} index={idx} />
          ))}
        </div>

        <Reveal className="mt-10 flex items-center justify-center">
          <p className="text-sm text-white/35">
            Every system is containerized, observable, and handed over with full source.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectCase; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <motion.article
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="group relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 transition-all duration-500 hover:border-gold-400/25 sm:p-10"
    >
      {/* corner accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_70%)]" />

      <div className={`relative grid gap-10 lg:grid-cols-2 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        {/* Left: details */}
        <div>
          <motion.div variants={staggerChild} className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full bg-glass-gold px-3 py-1 text-xs font-500 uppercase tracking-[0.18em] text-gold-300">
              {project.tag}
            </span>
            <span className="font-display text-5xl font-700 leading-none text-white/5">
              0{index + 1}
            </span>
          </motion.div>

          <motion.h3 variants={staggerChild} className="mt-6 font-display text-2xl font-600 tracking-tight text-white sm:text-3xl">
            {project.title}
          </motion.h3>

          <motion.p variants={staggerChild} className="mt-4 text-sm leading-[1.6] text-white/55">
            {project.summary}
          </motion.p>

          {/* Stack chips */}
          <motion.div variants={staggerChild} className="mt-7">
            <div className="mb-3 text-xs font-500 uppercase tracking-[0.18em] text-white/30">
              Technology stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech.label}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-500 text-white/75 transition-colors hover:border-gold-400/30 hover:text-white"
                >
                  <tech.icon size={14} className="text-gold-300" />
                  {tech.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Metric bar */}
          <motion.div variants={staggerChild} className="mt-8 flex items-center justify-between border-t border-white/8 pt-6">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/30">Outcome</div>
              <div className="mt-1 font-display text-lg font-600 text-gradient-gold">
                {project.metric}
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/20 bg-gold-400/5 text-gold-300 transition-all duration-300 group-hover:border-gold-400/50 group-hover:gold-glow">
              <Workflow size={18} />
            </div>
          </motion.div>
        </div>

        {/* Right: animated workflow diagram */}
        <motion.div variants={staggerChild} className="relative">
          <div className="mb-4 text-xs font-500 uppercase tracking-[0.18em] text-white/30">
            System architecture
          </div>
          <FlowDiagram steps={project.flow} orientation="vertical" />
        </motion.div>
      </div>
    </motion.article>
  );
}
