import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Landing() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['residents', 'businesses', 'how-it-works'];
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is above the middle of the viewport
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'residents', label: 'Residents' },
    { id: 'businesses', label: 'Business/Organizers' },
    { id: 'how-it-works', label: 'How It Works' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Approximate height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container font-body min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#eaffea]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(14,58,32,0.06)]">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-extrabold text-[#0e3a20] font-headline tracking-tight">The Commons</span>
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a 
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative py-1 transition-colors ${isActive ? 'text-[#1c6d25] font-bold' : 'text-[#0e3a20]/70 hover:text-[#1c6d25]'}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#1c6d25]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth" className="px-6 py-2 bg-primary text-on-primary font-bold rounded-full hover:bg-primary-dim transition-colors">
            Sign In
          </Link>
        </div>
      </header>
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="px-6 md:px-12 py-16 lg:py-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container/30 text-on-primary-container rounded-full text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                Welcome to the neighborhood
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-tight text-on-surface font-headline">
                The Heart of <br /><span className="bg-gradient-to-r from-primary to-primary-dim bg-clip-text text-transparent">Your Community.</span>
              </h1>
              <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
                A modern digital commons designed for vibrant participation. Connect with neighbors, grow local businesses, and organize meaningful change in one harmonious place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/auth" className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dim text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  Join the Commons
                </Link>
                <button className="px-8 py-4 bg-secondary-container text-on-secondary-container font-bold rounded-full hover:bg-secondary-container/80 transition-all">
                  Explore Map
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="rounded-[2rem] overflow-hidden shadow-2xl rotate-2">
                <img alt="Community gathering" className="aspect-video object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG7Npa7rmnzcPkNmFjfEbCWljivasSBAH6rNITeypFMmqeKZvPHevxqH6zSAnP5nywAss6NeTxgV4xBKZbPC4ZTcfIwPv9NOorzqUJvixTkUpx_7zXLHD2UqmT8GIfxDUeKZk5hrI6z6JwmeA_nH8C54mW11s9f3Gm-n5R8iP6Tgytkouk9VmV7xRxXuEWfj6yMtFi8mf2fO5WGKB1Uek6khIkseg_Od8O-vvJmXl1AbCpE0tcDp8ZNptBHnszvItHwVlg0Qnqxlw" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-surface-container-lowest p-6 rounded-2xl shadow-xl max-w-xs -rotate-3">
                <div className="flex gap-2 items-center mb-2">
                  <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <span className="text-sm font-bold text-tertiary uppercase tracking-widest">AI Summary</span>
                </div>
                <p className="text-sm text-on-surface leading-snug">"The local farmer's market proposal received 94% positive sentiment. Main excitement: organic produce access."</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Residents Section */}
        <section id="residents" className="bg-surface-container-low py-24">
          <div className="px-6 md:px-12 max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">Resident Portal</h2>
              <h3 className="text-4xl font-extrabold text-on-surface tracking-tight font-headline">Living Better, Together.</h3>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]"
            >
              {/* News Card */}
              <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full text-xs font-bold">LATEST NEWS</span>
                    <h4 className="text-3xl font-bold mt-4 leading-tight group-hover:text-primary transition-colors font-headline">New Greenway Opening this Saturday</h4>
                  </div>
                  <span className="material-symbols-outlined text-4xl text-primary/30">newspaper</span>
                </div>
                <div className="mt-8 flex gap-4">
                  <img alt="Park" className="w-32 h-32 rounded-2xl object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi-4KrllyrKr_-eglI1LSXBzNP4E7bguC9CbojfML3fJD_Ffe8Od-Mjn14RZWQR3T6Ixra-v28-1_5mD4-WC3Of-qPDtfJOG1xRHP1qMbQ1AhwzcvEHSoBQ4vvlm84e-EQTI-HLTi2BBh1qGTjFae6BetCO4eJSu2QEFhJl254PKmnEjitzwy2oZ05ZIlEvzI9gGsgxRCG3ls5pOFigI2RiZuV_Yz66qlYVDv-Ex5Cm3LfH1LVhZSKxEEO34n2Rd5H6xXuuH1DSxA" />
                  <p className="text-on-surface-variant line-clamp-4">Join Mayor Chen for a ribbon-cutting ceremony. The new path connects the library directly to the community gardens, featuring low-impact lighting and native flora...</p>
                </div>
              </div>
              {/* Help Board */}
              <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-secondary">handshake</span>
                  <h4 className="text-xl font-bold font-headline">Help Board</h4>
                </div>
                <div className="space-y-4 flex-grow overflow-y-auto pr-2">
                  <div className="p-4 bg-surface rounded-2xl border-l-4 border-tertiary">
                    <p className="text-sm font-bold">Tool Lending</p>
                    <p className="text-xs text-on-surface-variant">Looking for a pressure washer for Sunday.</p>
                  </div>
                  <div className="p-4 bg-surface rounded-2xl border-l-4 border-primary">
                    <p className="text-sm font-bold">Lost & Found</p>
                    <p className="text-xs text-on-surface-variant">Found: Set of keys near the duck pond.</p>
                  </div>
                  <div className="p-4 bg-surface rounded-2xl border-l-4 border-secondary">
                    <p className="text-sm font-bold">Skill Share</p>
                    <p className="text-xs text-on-surface-variant">I can help with beginner French tutoring.</p>
                  </div>
                </div>
              </div>
              {/* Alerts Card */}
              <div className="bg-primary text-on-primary p-8 rounded-3xl flex items-center gap-6 md:col-span-1">
                <div className="bg-primary-container text-on-primary-container p-4 rounded-2xl">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl font-headline">Active Alerts</h4>
                  <p className="text-on-primary/80 text-sm">Road construction on Oak St. Expect minor delays through 4 PM.</p>
                </div>
              </div>
              {/* Local Activity */}
              <div className="md:col-span-2 bg-secondary-container p-8 rounded-3xl flex items-center justify-between overflow-hidden relative">
                <div className="z-10">
                  <h4 className="text-2xl font-bold text-on-secondary-container font-headline">Community Sentiment</h4>
                  <p className="text-on-secondary-container/80 mt-2">Overall mood is <span className="font-bold">Highly Positive (88%)</span> this week.</p>
                </div>
                <div className="flex gap-1 items-end h-24">
                  <div className="w-4 bg-on-secondary-container/20 rounded-t-full h-12"></div>
                  <div className="w-4 bg-on-secondary-container/20 rounded-t-full h-16"></div>
                  <div className="w-4 bg-on-secondary-container/40 rounded-t-full h-20"></div>
                  <div className="w-4 bg-on-secondary-container/60 rounded-t-full h-24"></div>
                  <div className="w-4 bg-on-secondary-container/40 rounded-t-full h-18"></div>
                  <div className="w-4 bg-on-secondary-container/80 rounded-t-full h-24"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Business & Organizers */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Business Insights */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id="businesses"
            >
              <div className="mb-10">
                <h2 className="text-sm font-bold text-secondary tracking-[0.2em] uppercase mb-4">For Local Businesses</h2>
                <h3 className="text-4xl font-extrabold text-on-surface tracking-tight font-headline">Main Street, Reimagined.</h3>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-surface-container-low rounded-3xl flex gap-6 items-center">
                  <div className="w-16 h-16 bg-surface-container-lowest rounded-2xl flex items-center justify-center text-secondary shadow-sm">
                    <span className="material-symbols-outlined text-3xl">storefront</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-headline">Smart Directory</h4>
                    <p className="text-sm text-on-surface-variant">Boost visibility with high-intent local search.</p>
                  </div>
                </div>
                <div className="p-6 bg-surface-container-low rounded-3xl flex gap-6 items-center">
                  <div className="w-16 h-16 bg-surface-container-lowest rounded-2xl flex items-center justify-center text-secondary shadow-sm">
                    <span className="material-symbols-outlined text-3xl">local_offer</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-headline">Hyper-Local Deals</h4>
                    <p className="text-sm text-on-surface-variant">Send offers directly to neighbors when they're nearby.</p>
                  </div>
                </div>
                <div className="p-6 bg-surface-container-low rounded-3xl flex gap-6 items-center">
                  <div className="w-16 h-16 bg-surface-container-lowest rounded-2xl flex items-center justify-center text-secondary shadow-sm">
                    <span className="material-symbols-outlined text-3xl">analytics</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg font-headline">AI Business Insights</h4>
                    <p className="text-sm text-on-surface-variant">Understand foot traffic trends and local demand shifts.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Organizers & Events */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              id="organizers" 
              className="bg-on-background text-surface p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px]"></div>
              <div className="relative z-10">
                <h2 className="text-sm font-bold text-primary-fixed tracking-[0.2em] uppercase mb-4">For Organizers</h2>
                <h3 className="text-4xl font-extrabold text-surface tracking-tight mb-8 font-headline">Fuel Local Change.</h3>
                <div className="space-y-8">
                  <div className="group border-b border-surface/10 pb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold font-headline">Village Art Festival</h4>
                      <span className="px-3 py-1 bg-tertiary/20 text-tertiary rounded-full text-xs">84% Capacity</span>
                    </div>
                    <p className="text-surface/60 text-sm">Organized by Civic Arts Council. Needs 4 more volunteers.</p>
                    <button className="mt-4 text-primary-fixed font-bold text-sm flex items-center gap-2">Manage Event <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                  </div>
                  <div className="group border-b border-surface/10 pb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold font-headline">Neighborhood Cleanup</h4>
                      <span className="px-3 py-1 bg-primary/20 text-primary-fixed rounded-full text-xs">New Project</span>
                    </div>
                    <p className="text-surface/60 text-sm">Smart matching active: 12 potential volunteers found.</p>
                    <button className="mt-4 text-primary-fixed font-bold text-sm flex items-center gap-2">Review Matches <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                  </div>
                  <div className="bg-surface-container/10 p-6 rounded-2xl flex items-center gap-4">
                    <span className="material-symbols-outlined text-tertiary-fixed text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
                    <div>
                      <p className="font-bold">Volunteer Matching</p>
                      <p className="text-xs text-surface/50 leading-relaxed">Our AI connects project needs with resident skills automatically.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-surface-container-low/50">
          <div className="px-6 md:px-12 max-w-7xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold text-on-surface mb-16 font-headline"
            >
              Community in Three Steps
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-lg mb-6">
                  <span className="text-2xl font-black text-primary">01</span>
                </div>
                <h4 className="text-xl font-bold mb-4 font-headline">Verify Identity</h4>
                <p className="text-on-surface-variant">We ensure real people from your actual neighborhood for a safe, trusted experience.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-lg mb-6">
                  <span className="text-2xl font-black text-primary">02</span>
                </div>
                <h4 className="text-xl font-bold mb-4 font-headline">Connect Roles</h4>
                <p className="text-on-surface-variant">Choose your lenses: Resident, Business Owner, or Organizer to tailor your experience.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-lg mb-6">
                  <span className="text-2xl font-black text-primary">03</span>
                </div>
                <h4 className="text-xl font-bold mb-4 font-headline">Cultivate Change</h4>
                <p className="text-on-surface-variant">Participate in discussions, support locals, and use AI insights to make better decisions.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary to-primary-dim rounded-[3rem] p-12 md:p-24 text-center text-on-primary overflow-hidden relative shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 font-headline">Ready to join your Commons?</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto mb-12">Be part of the digital renaissance. Build a stronger, more connected neighborhood today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth" className="px-12 py-5 bg-surface text-primary font-bold rounded-full text-lg hover:scale-105 active:scale-95 transition-all">Create Free Account</Link>
                <Link to="/auth" className="px-12 py-5 border-2 border-surface/30 text-surface font-bold rounded-full text-lg hover:bg-surface/10 transition-all">Claim Business Profile</Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container text-on-surface-variant py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <span className="text-xl font-extrabold text-on-surface tracking-tight font-headline">The Commons</span>
            <p className="max-w-xs text-sm">Restoring the social fabric of our neighborhoods through thoughtful digital collaboration.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h5 className="font-bold text-on-surface">Platform</h5>
              <ul className="text-sm space-y-2">
                <li><a className="hover:text-primary" href="#">Residents</a></li>
                <li><a className="hover:text-primary" href="#">Businesses</a></li>
                <li><a className="hover:text-primary" href="#">Organizers</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-on-surface">Company</h5>
              <ul className="text-sm space-y-2">
                <li><a className="hover:text-primary" href="#">About</a></li>
                <li><a className="hover:text-primary" href="#">Privacy</a></li>
                <li><a className="hover:text-primary" href="#">Ethics</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-on-surface">Support</h5>
              <ul className="text-sm space-y-2">
                <li><a className="hover:text-primary" href="#">Help Center</a></li>
                <li><a className="hover:text-primary" href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/30 text-xs text-center md:text-left flex flex-col md:flex-row justify-between gap-4">
          <p>© 2024 The Commons. All rights reserved.</p>
          <div className="flex gap-6 justify-center">
            <a className="hover:text-primary" href="#">Twitter</a>
            <a className="hover:text-primary" href="#">LinkedIn</a>
            <a className="hover:text-primary" href="#">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
