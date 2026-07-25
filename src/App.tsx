import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import CaseStudies from './components/sections/CaseStudies';
import Architecture from './components/sections/Architecture';
import Results from './components/sections/Results';
import TechStack from './components/sections/TechStack';
import Process from './components/sections/Process';
import Discovery from './components/sections/Discovery';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Ambient page-wide vignette */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(212,175,55,0.08),transparent_60%)]" />

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <CaseStudies />
        <Architecture />
        <Results />
        <TechStack />
        <Process />
        <Discovery />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
