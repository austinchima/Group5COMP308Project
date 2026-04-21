import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import heroBg from '../assets/hero-bg.png';

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
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
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
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
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
      
      <main className="relative">
        {/* Premium Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Image with sophisticated overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroBg} 
              alt="Community Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-surface/90 via-surface/40 to-surface"></div>
            <div className="absolute inset-0 bg-linear-to-r from-surface/80 via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 px-6 md:px-12 py-16 lg:py-24 max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-10"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-primary-container/20 border border-primary-container/30 text-on-primary-container rounded-full text-sm font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  WELCOME TO THE NEIGHBORHOOD
                </div>
                <h1 className="text-6xl md:text-9xl font-black tracking-tight leading-[0.85] text-on-surface font-headline">
                  The Heart of <br />
                  <span className="bg-linear-to-r from-primary to-primary-dim bg-clip-text text-transparent italic">
                    Your Community.
                  </span>
                </h1>
                <p className="text-2xl text-on-surface-variant/90 max-w-lg leading-relaxed font-medium">
                  A modern digital commons designed for vibrant participation. Connect, grow, and organize in one harmonious place.
                </p>
                <div className="flex flex-wrap gap-6 pt-4">
                  <Link to="/auth" className="px-10 py-5 bg-linear-to-r from-primary to-primary-dim text-on-primary font-black rounded-full shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all text-lg">
                    Join the Commons
                  </Link>
                  <button className="px-10 py-5 backdrop-blur-lg bg-surface/40 border border-on-surface/10 text-on-surface font-black rounded-full hover:bg-surface/60 transition-all text-lg shadow-xl">
                    Explore Map
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative hidden lg:block"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
                  <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-surface-container-lowest/50 backdrop-blur-3xl">
                    <img 
                      alt="Community gathering" 
                      className="aspect-square object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG7Npa7rmnzcPkNmFjfEbCWljivasSBAH6rNITeypFMmqeKZvPHevxqH6zSAnP5nywAss6NeTxgV4xBKZbPC4ZTcfIwPv9NOorzqUJvixTkUpx_7zXLHD2UqmT8GIfxDUeKZk5hrI6z6JwmeA_nH8C54mW11s9f3Gm-n5R8iP6Tgytkouk9VmV7xRxXuEWfj6yMtFi8mf2fO5WGKB1Uek6khIkseg_Od8O-vvJmXl1AbCpE0tcDp8ZNptBHnszvItHwVlg0Qnqxlw" 
                    />
                  </div>
                  
                  {/* Glassmorphic AI Card */}
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute -bottom-10 -left-16 backdrop-blur-2xl bg-surface/80 p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] max-w-sm -rotate-3 border border-white/50"
                  >
                    <div className="flex gap-3 items-center mb-4">
                      <div className="bg-tertiary/10 p-2 rounded-xl">
                        <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                      </div>
                      <span className="text-xs font-black text-tertiary uppercase tracking-[0.2em]">AI Insights</span>
                    </div>
                    <p className="text-lg text-on-surface font-bold leading-tight">
                      "94% of neighbors are excited about the upcoming organic market. High demand for locally grown produce."
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
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
                <div className="space-y-4 grow overflow-y-auto pr-2">
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
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} id="businesses">
              <div className="mb-10">
                <h2 className="text-sm font-bold text-secondary tracking-[0.2em] uppercase mb-4">For Local Businesses</h2>
                <h3 className="text-4xl font-extrabold text-on-surface tracking-tight font-headline">Main Street, Reimagined.</h3>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-surface-container-low rounded-3xl flex gap-6 items-center">
                  <div className="w-16 h-16 bg-surface-container-lowest rounded-2xl flex items-center justify-center text-secondary shadow-sm"><span className="material-symbols-outlined text-3xl">storefront</span></div>
                  <div><h4 className="font-bold text-lg font-headline">Smart Directory</h4><p className="text-sm text-on-surface-variant">Boost visibility with high-intent local search.</p></div>
                </div>
                <div className="p-6 bg-surface-container-low rounded-3xl flex gap-6 items-center">
                  <div className="w-16 h-16 bg-surface-container-lowest rounded-2xl flex items-center justify-center text-secondary shadow-sm"><span className="material-symbols-outlined text-3xl">local_offer</span></div>
                  <div><h4 className="font-bold text-lg font-headline">Hyper-Local Deals</h4><p className="text-sm text-on-surface-variant">Send offers directly to neighbors when they're nearby.</p></div>
                </div>
                <div className="p-6 bg-surface-container-low rounded-3xl flex gap-6 items-center">
                  <div className="w-16 h-16 bg-surface-container-lowest rounded-2xl flex items-center justify-center text-secondary shadow-sm"><span className="material-symbols-outlined text-3xl">analytics</span></div>
                  <div><h4 className="font-bold text-lg font-headline">AI Business Insights</h4><p className="text-sm text-on-surface-variant">Understand foot traffic trends and local demand shifts.</p></div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} id="organizers" className="bg-on-background text-surface p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
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
                    <div><p className="font-bold">Volunteer Matching</p><p className="text-xs text-surface/50 leading-relaxed">Our AI connects project needs with resident skills automatically.</p></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-surface-container-low/50">
          <div className="px-6 md:px-12 max-w-7xl mx-auto text-center">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-4xl font-extrabold text-on-surface mb-16 font-headline">
              Community in Three Steps
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { num: '01', title: 'Verify Identity', desc: 'We ensure real people from your actual neighborhood for a safe, trusted experience.' },
                { num: '02', title: 'Connect Roles', desc: 'Choose your lenses: Resident, Business Owner, or Organizer to tailor your experience.' },
                { num: '03', title: 'Cultivate Change', desc: 'Participate in discussions, support locals, and use AI insights to make better decisions.' },
              ].map((step, i) => (
                <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 * (i + 1) }} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-lg mb-6">
                    <span className="text-2xl font-black text-primary">{step.num}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4 font-headline">{step.title}</h4>
                  <p className="text-on-surface-variant">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="bg-linear-to-br from-primary to-primary-dim rounded-[3rem] p-12 md:p-24 text-center text-on-primary overflow-hidden relative shadow-2xl">
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
              <ul className="text-sm space-y-2"><li><a className="hover:text-primary" href="#">Residents</a></li><li><a className="hover:text-primary" href="#">Businesses</a></li><li><a className="hover:text-primary" href="#">Organizers</a></li></ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-on-surface">Company</h5>
              <ul className="text-sm space-y-2"><li><a className="hover:text-primary" href="#">About</a></li><li><a className="hover:text-primary" href="#">Privacy</a></li><li><a className="hover:text-primary" href="#">Ethics</a></li></ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-on-surface">Support</h5>
              <ul className="text-sm space-y-2"><li><a className="hover:text-primary" href="#">Help Center</a></li><li><a className="hover:text-primary" href="#">Contact</a></li></ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant/30 text-xs text-center md:text-left flex flex-col md:flex-row justify-between gap-4">
          <p>© 2024 The Commons. All rights reserved.</p>
          <div className="flex gap-6 justify-center"><a className="hover:text-primary" href="#">Twitter</a><a className="hover:text-primary" href="#">LinkedIn</a><a className="hover:text-primary" href="#">Instagram</a></div>
        </div>
      </footer>
    </div>
  );
}
