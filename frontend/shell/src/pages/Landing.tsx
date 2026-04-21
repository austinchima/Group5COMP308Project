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
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 z-10"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md bg-primary-container/20 border border-primary-container/30 text-on-primary-container rounded-full text-xs font-bold tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  WELCOME TO THE NEIGHBORHOOD
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-on-surface font-headline max-w-xl">
                  The Heart of <br />
                  <span className="bg-linear-to-r from-primary to-primary-dim bg-clip-text text-transparent italic">
                    Your Community.
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-on-surface-variant/90 max-w-md leading-relaxed font-medium">
                  A modern digital commons designed for vibrant participation. Connect, grow, and organize in one harmonious place.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/auth" className="px-8 py-4 bg-linear-to-r from-primary to-primary-dim text-on-primary font-black rounded-full shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all text-lg">
                    Join the Commons
                  </Link>
                  <button className="px-8 py-4 backdrop-blur-lg bg-surface/40 border border-on-surface/10 text-on-surface font-black rounded-full hover:bg-surface/60 transition-all text-lg shadow-xl">
                    Explore Map
                  </button>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative hidden lg:block z-0"
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

        {/* Premium Residents Section */}
        <section id="residents" className="bg-[#f0f9f1] py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-surface to-transparent"></div>
          <div className="px-6 md:px-12 max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-20 text-center md:text-left"
            >
              <h2 className="text-sm font-black text-primary tracking-[0.4em] uppercase mb-4">Resident Hub</h2>
              <h3 className="text-5xl md:text-6xl font-black text-on-surface tracking-tight font-headline italic">Living Better. Together.</h3>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Premium News Card */}
              <div className="lg:col-span-2 backdrop-blur-xl bg-white/60 p-10 rounded-[3rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col justify-between group hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500">
                <div className="flex justify-between items-start gap-6">
                  <div className="space-y-4">
                    <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">Latest News</span>
                    <h4 className="text-4xl font-black leading-tight group-hover:text-primary transition-colors font-headline">New City Greenway Opening this Saturday</h4>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-2xl text-primary/40 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500">
                    <span className="material-symbols-outlined text-4xl">newspaper</span>
                  </div>
                </div>
                <div className="mt-12 flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-full md:w-48 h-48 rounded-4xl overflow-hidden shadow-xl shrink-0">
                    <img alt="Park" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi-4KrllyrKr_-eglI1LSXBzNP4E7bguC9CbojfML3fJD_Ffe8Od-Mjn14RZWQR3T6Ixra-v28-1_5mD4-WC3Of-qPDtfJOG1xRHP1qMbQ1AhwzcvEHSoBQ4vvlm84e-EQTI-HLTi2BBh1qGTjFae6BetCO4eJSu2QEFhJl254PKmnEjitzwy2oZ05ZIlEvzI9gGsgxRCG3ls5pOFigI2RiZuV_Yz66qlYVDv-Ex5Cm3LfH1LVhZSKxEEO34n2Rd5H6xXuuH1DSxA" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-lg text-on-surface-variant font-medium leading-relaxed">Join Mayor Chen for a ribbon-cutting ceremony. The new path connects the library directly to the community gardens, featuring low-impact lighting and native flora.</p>
                    <button className="text-primary font-black flex items-center gap-2 group/btn">Read Full Article <span className="material-symbols-outlined translate-x-0 group-hover/btn:translate-x-2 transition-transform">arrow_forward</span></button>
                  </div>
                </div>
              </div>

              {/* Glass Help Board */}
              <div className="backdrop-blur-xl bg-white/40 p-10 rounded-[3rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
                </div>
                <h4 className="text-2xl font-black font-headline mb-8">Mutual Help Hub</h4>
                <div className="space-y-4 w-full">
                  <div className="p-5 bg-white/60 rounded-3xl border-l-[6px] border-tertiary shadow-sm text-left">
                    <p className="text-xs font-black text-tertiary uppercase tracking-widest mb-1">Skill Share</p>
                    <p className="text-sm font-bold text-on-surface">French Tutoring offered by Resident</p>
                  </div>
                  <div className="p-5 bg-white/60 rounded-3xl border-l-[6px] border-primary shadow-sm text-left">
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Lending</p>
                    <p className="text-sm font-bold text-on-surface">Pressure washer needed for Sunday</p>
                  </div>
                  <div className="p-5 bg-white/60 rounded-3xl border-l-[6px] border-secondary shadow-sm text-left">
                    <p className="text-xs font-black text-secondary uppercase tracking-widest mb-1">Alert</p>
                    <p className="text-sm font-bold text-on-surface">Found pet collar near Oak St.</p>
                  </div>
                </div>
                <button className="mt-10 py-3 px-8 bg-on-surface text-surface rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Go to Boards</button>
              </div>

              {/* Premium Alerts Card */}
              <div className="backdrop-blur-xl bg-primary text-on-primary p-10 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center gap-8 group">
                <div className="bg-primary-container/20 p-6 rounded-4xl text-on-primary shadow-inner">
                  <span className="material-symbols-outlined text-5xl animate-pulse">campaign</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-black text-2xl font-headline italic tracking-tight mb-2">Live Alerts</h4>
                  <p className="text-on-primary/70 text-lg font-medium">Road maintenance on Oak St. Minor delays expected until sunset.</p>
                </div>
                <div className="p-4 bg-white/10 rounded-full group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-3xl">notifications_active</span>
                </div>
              </div>

              {/* Data Insights Card */}
              <div className="lg:col-span-2 backdrop-blur-xl bg-on-background text-surface p-10 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center justify-between overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] z-0"></div>
                <div className="relative z-10 space-y-2 text-center md:text-left">
                  <div className="flex items-center gap-2 mb-2 text-primary-fixed font-black tracking-widest uppercase text-xs">
                    <span className="material-symbols-outlined text-sm">analytics</span> Live Insights
                  </div>
                  <h4 className="text-3xl lg:text-4xl font-black font-headline tracking-tighter">Community Pulse.</h4>
                  <p className="text-surface/60 text-lg font-medium">Overall neighborhood sentiment is <span className="text-primary-fixed font-black">Highly Positive (88%)</span></p>
                </div>
                <div className="flex gap-2 items-end h-32 relative z-10 pt-10 md:pt-0">
                  <div className="w-5 bg-primary/20 rounded-t-full h-[40%] group-hover:h-[60%] transition-all duration-700"></div>
                  <div className="w-5 bg-primary/30 rounded-t-full h-[60%] group-hover:h-[80%] transition-all duration-700 delay-100"></div>
                  <div className="w-5 bg-primary/40 rounded-t-full h-[80%] group-hover:h-full transition-all duration-700 delay-200"></div>
                  <div className="w-5 bg-primary/60 rounded-t-full h-[90%] group-hover:h-[70%] transition-all duration-700 delay-300"></div>
                  <div className="w-5 bg-primary-fixed rounded-t-full h-full group-hover:h-[90%] transition-all duration-700 delay-400"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Premium Business & Organizers Section */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} id="businesses">
              <div className="mb-12">
                <h2 className="text-sm font-black text-secondary tracking-[0.4em] uppercase mb-4">Local Economy</h2>
                <h3 className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter leading-tight font-headline italic">Main Street. <br />Reimagined.</h3>
              </div>
              <div className="space-y-6">
                {[
                  { icon: 'storefront', title: 'Smart Directory', desc: 'Boost visibility with high-intent local search engines.' },
                  { icon: 'local_offer', title: 'Hyper-Local Deals', desc: 'Push precision offers to neighbors based on proximity and interest.' },
                  { icon: 'analytics', title: 'AI Growth Insights', desc: 'Understand foot traffic trends and local demand shifts instantly.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-8 backdrop-blur-xl bg-white/30 border border-on-surface/5 rounded-[2.5rem] flex gap-8 items-center hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                    <div className="w-16 h-16 bg-surface-container-lowest rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                      <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-black text-xl font-headline tracking-tight">{item.title}</h4>
                      <p className="text-on-surface-variant font-medium text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} id="organizers" className="bg-on-background text-surface p-12 md:p-16 rounded-[4rem] shadow-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] transition-all duration-1000 group-hover:bg-primary/30"></div>
              <div className="relative z-10">
                <h2 className="text-sm font-black text-primary-fixed tracking-[0.4em] uppercase mb-4 font-headline">For Strategic Leaders</h2>
                <h3 className="text-5xl font-black text-surface tracking-tighter mb-12 font-headline italic">Fuel Local Change.</h3>
                
                <div className="space-y-10">
                  <div className="group/item border-b border-surface/10 pb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-2xl font-black font-headline group-hover/item:text-primary-fixed transition-colors">Art Festival 2024</h4>
                      <span className="px-4 py-1.5 bg-tertiary/20 text-tertiary rounded-full text-xs font-black tracking-widest uppercase">84% Recruited</span>
                    </div>
                    <p className="text-surface/50 text-base leading-relaxed">System identified 4 specific skill-matches for the mural project yesterday.</p>
                    <button className="mt-6 text-primary-fixed font-black text-sm flex items-center gap-2 group-hover/item:gap-4 transition-all">Launch Dashboard <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-primary-fixed/20 text-primary-fixed rounded-2xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
                    </div>
                    <div>
                      <p className="font-black text-lg">AI Smart Matching</p>
                      <p className="text-sm text-surface/50 leading-relaxed font-medium">Instantly connect project needs with verified resident skillsets.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cinematic Three Steps */}
        <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
          <div className="px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-24"
            >
              <h2 className="text-sm font-black text-primary tracking-[0.5em] uppercase mb-6">Process</h2>
              <h3 className="text-5xl lg:text-6xl font-black text-on-surface font-headline italic tracking-tighter">Community in Three Steps</h3>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-16">
              {[
                { num: '01', title: 'Verify Identity', desc: 'Secure neighbor validation ensures a trusted environment for real people.' },
                { num: '02', title: 'Define Role', desc: 'Tailor your dashboard as a Resident, Business Owner, or Lead Organizer.' },
                { num: '03', title: 'Start Impact', desc: 'Collaborative discussion leads to verified local collective action.' },
              ].map((step, i) => (
                <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 * (i + 1) }} className="relative">
                  <div className="w-24 h-24 backdrop-blur-xl bg-surface-container-lowest border-2 border-primary/10 rounded-full flex items-center justify-center shadow-2xl mb-8 mx-auto group">
                    <span className="text-3xl font-black text-primary group-hover:scale-125 transition-transform">{step.num}</span>
                  </div>
                  <h4 className="text-2xl font-black mb-4 font-headline tracking-tight">{step.title}</h4>
                  <p className="text-on-surface-variant font-medium leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cinematic CTA */}
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
            className="bg-on-background rounded-[4rem] p-16 md:p-32 text-center text-surface overflow-hidden relative shadow-[0_40px_100px_rgba(0,0,0,0.3)] group"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-primary/10 opacity-50"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full group-hover:bg-primary/20 transition-all duration-1000"></div>
            
            <div className="relative z-10 space-y-10">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none font-headline italic">
                Ready to join <br /> <span className="text-primary-fixed">Your Commons?</span>
              </h2>
              <p className="text-xl md:text-2xl text-surface/60 max-w-2xl mx-auto font-medium leading-relaxed">
                Be part of the digital renaissance. Build a stronger, more connected neighborhood today with AI-driven collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Link to="/auth" className="px-14 py-6 bg-primary text-on-primary font-black rounded-full text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20">
                  Start Your Journey
                </Link>
                <Link to="/auth" className="px-14 py-6 bg-white/5 backdrop-blur-md border border-white/10 text-surface font-black rounded-full text-xl hover:bg-white/10 transition-all">
                  Claim Business Hub
                </Link>
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
