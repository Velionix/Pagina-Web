import { Mail, MapPin, Phone, Twitter, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import Logo from '../Logo';

const cols = [
  {
    title: 'Services',
    links: ['AI Automation Systems', 'Lead Generation Engines', 'Custom AI Solutions', 'Architecture'],
  },
  {
    title: 'Work',
    links: ['Case Studies', 'Results', 'Technology Ecosystem'],
  },
  {
    title: 'Company',
    links: ['About', 'Process', 'Discovery', 'Book a call'],
  },
];

const socials = [
  { icon: Twitter, label: 'Twitter / X', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[600px] -translate-x-1/2 rounded-full bg-gold-400/[0.04] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-[1.6] text-white/45">
              AI Automation Systems. We design intelligent systems that help businesses find
              opportunities, save time and scale.
            </p>

            <div className="mt-6 space-y-2.5">
              <a
                href="mailto:hello@velionix.ai"
                className="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-white"
              >
                <Mail size={15} className="text-gold-300" />
                hello@velionix.ai
              </a>
              <a
                href="tel:+10000000000"
                className="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-white"
              >
                <Phone size={15} className="text-gold-300" />
                +1 (000) 000-0000
              </a>
              <div className="flex items-center gap-2.5 text-sm text-white/55">
                <MapPin size={15} className="text-gold-300" />
                Remote · Worldwide
              </div>
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-all duration-300 hover:border-gold-400/40 hover:bg-gold-400/5 hover:text-gold-200"
                >
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-500 uppercase tracking-[0.18em] text-white/30">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-6 sm:flex-row sm:px-8">
          <div>
            <div className="font-display text-lg font-600 text-white">
              Ready to automate your growth?
            </div>
            <div className="mt-1 text-sm text-white/50">
              Start your automation project in minutes.
            </div>
          </div>
          <a
            href="#discovery"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold-200 to-gold-400 px-6 py-3 text-sm font-600 text-black transition-transform hover:scale-[1.03] gold-glow"
          >
            Request Automation Strategy
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 pb-10 sm:flex-row">
          <div className="text-xs text-white/35">
            © {new Date().getFullYear()} Velionix. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-xs text-white/35">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <a href="#" className="transition-colors hover:text-white">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
