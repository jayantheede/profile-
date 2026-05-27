import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Building2, MapPin, Mail, Phone, ExternalLink, 
  BookOpen, Users, Trophy, BookMarked, BrainCircuit,
  Link as LinkIcon, GraduationCap, Award, FileText, Image as ImageIcon,
  ChevronRight, ArrowRight, Code, Hash, Globe, Shield, ArrowLeft
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useProfile } from '../ProfileContext';

// --- Premium Dark/Glass Components ---

const DarkMeshBackground = () => (
  <div className="fixed inset-0 z-[-1] bg-slate-950 overflow-hidden">
    {/* Glowing Ambient Orbs */}
    <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] opacity-[0.25] bg-gradient-to-br from-blue-600 to-indigo-600 blur-[150px] rounded-full pointer-events-none" />
    <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] opacity-[0.2] bg-gradient-to-br from-violet-600 to-fuchsia-600 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] opacity-[0.15] bg-gradient-to-br from-cyan-500 to-blue-500 blur-[100px] rounded-full pointer-events-none" />
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
  </div>
);

const PremiumDarkBadge = ({ label, value, color, icon: Icon, href }) => {
  const content = (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      className={`flex flex-col bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden min-w-[140px] transition-all hover:shadow-2xl hover:shadow-primary/20 group ${href ? 'cursor-pointer' : ''}`}
    >
      <div className={`text-[10px] font-black px-4 py-2 border-b border-white/5 flex items-center justify-between ${color} text-white/90`}>
        {label}
        {Icon && <Icon className="w-3 h-3 opacity-70" />}
        {href && <ExternalLink className="w-3 h-3 opacity-70 ml-2" />}
      </div>
      <div className="px-4 py-3 text-sm font-bold text-slate-200 truncate">
        {value}
      </div>
    </motion.div>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="block">{content}</a>;
  }
  return content;
};

const GlowProgressBar = ({ percent }) => (
  <div className="relative w-full h-2.5 bg-slate-900/80 rounded-full overflow-hidden mt-3 border border-white/5 shadow-inner">
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: `${percent}%` }}
      transition={{ duration: 2, ease: "circOut" }}
      viewport={{ once: true }}
      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]"
    />
  </div>
);

const PremiumPanel = ({ id, icon: Icon, title, badge, children }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="scroll-mt-32 bg-slate-900/40 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.1)] transition-all duration-500"
  >
    <div className="p-8 pb-0">
      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-3 inline-block">
        {badge || "Section"}
      </span>
      <h2 className="text-3xl font-black flex items-center gap-4 text-white">
        <div className="p-3 bg-slate-800/80 border border-white/10 rounded-2xl text-blue-400 shadow-lg shadow-blue-500/5">
          <Icon className="w-6 h-6" />
        </div>
        {title}
      </h2>
    </div>
    <div className="p-8 pt-8">
      {children}
    </div>
  </motion.section>
);

const getViewerUrl = (url) => {
  if (url.match(/\.(pdf|txt|png|jpg|jpeg)$/i)) return url;
  if (typeof window !== 'undefined') {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    let absoluteUrl;
    if (isLocal) {
      absoluteUrl = `https://raw.githubusercontent.com/jayantheede/profile-/profile/public${url}`;
    } else {
      absoluteUrl = new URL(url, window.location.origin).href;
    }
    return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(absoluteUrl)}`;
  }
  return url;
};

const PremiumDocumentsList = ({ documents, title = "Related Documents" }) => {
  if (!documents || documents.length === 0) return null;
  const grouped = documents.reduce((acc, doc) => {
    const year = doc.year || 'Other';
    if (!acc[year]) acc[year] = [];
    acc[year].push(doc);
    return acc;
  }, {});
  
  const sortedYears = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="mt-8 pt-8 border-t border-white/5">
      <h4 className="text-xl font-black text-slate-200 mb-6 flex items-center gap-3">
        <FileText className="w-6 h-6 text-blue-400" />
        {title}
      </h4>
      <div className="space-y-8">
        {sortedYears.map(year => (
          <div key={year}>
            {year !== 'Other' && <h5 className="text-lg font-black text-blue-400/70 mb-4 flex items-center gap-2"><span className="w-4 h-1 bg-blue-500/20 rounded-full"></span>{year}</h5>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[year].map((doc, idx) => (
                <motion.a
                  key={idx}
                  href={getViewerUrl(doc.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="flex items-center gap-4 p-4 bg-slate-950/60 border border-white/5 rounded-2xl shadow-lg hover:shadow-blue-500/5 hover:border-blue-500/30 transition-all group"
                >
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-blue-400 transition-colors line-clamp-2" title={doc.title}>
                    {doc.title}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function PremiumProfile() {
  const navigate = useNavigate();
  const { profileData } = useProfile();
  const data = profileData;
  const [activeTab, setActiveTab] = useState('Personal Information');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const tabs = [
    { id: 'personal_information_panel', label: 'Personal Information', badge: 'Biodata' },
    { id: 'expertise_information_panel', label: 'Expertise Information', badge: 'Skills' },
    { id: 'experience_information_panel', label: 'Experience', badge: 'History' },
    { id: 'education_information_panel', label: 'Education', badge: 'Academic' },
    { id: 'metrics_information_panel', label: 'Metrics Overview', badge: 'Analytics' },
    { id: 'other_information_panel', label: 'Publications', badge: 'Papers' },
    { id: 'achievements_information_panel', label: 'Patents & Awards', badge: 'Accomplishments' },
    { id: 'memberships_panel', label: 'Professional Memberships', badge: 'Affiliations' },
    { id: 'reviewer_certificates_panel', label: 'Reviewer Certificates', badge: 'Reviewer' },
    { id: 'gallery_panel', label: 'Event Gallery', badge: 'Photos' }
  ];

  const scrollToSection = (id, label) => {
    setActiveTab(label);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 120;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  useEffect(() => {
    const observers = tabs.map(tab => {
      const el = document.getElementById(tab.id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveTab(tab.label);
        },
        { rootMargin: '-120px 0px -70% 0px' }
      );
      observer.observe(el);
      return { el, observer };
    });
    return () => observers.forEach(obs => obs?.observer.unobserve(obs.el));
  }, [profileData]);

  return (
    <div className="min-h-screen relative text-slate-100 selection:bg-blue-600 selection:text-white overflow-x-hidden font-sans">
      <DarkMeshBackground />

      {/* Reading Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 z-[100] origin-left shadow-[0_0_20px_rgba(99,102,241,0.8)]"
        style={{ scaleX }}
      />
      
      {/* Floating Widescreen Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[55vh] w-full flex items-center justify-center pt-16 border-b border-white/5 bg-slate-950/60 backdrop-blur-md overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-slate-950 pointer-events-none" />
        <div className="relative text-center z-10 space-y-6 px-4 max-w-4xl mx-auto">
          {/* Back to Standard Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-bold text-slate-300 tracking-wider uppercase transition-all mb-4"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            Standard View
          </motion.button>
          
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full block w-max mx-auto shadow-inner">
            Faculty Premium Portfolio
          </span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tight bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent"
          >
            {data.personal.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-blue-300 text-lg md:text-2xl font-bold tracking-widest uppercase opacity-80"
          >
            {data.personal.designation}
          </motion.p>
        </div>
      </motion.header>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 -mt-24 relative z-20 flex flex-col lg:flex-row gap-12 pb-32">
        
        {/* Profile Sidebar */}
        <aside className="w-full lg:w-[380px] flex-shrink-0">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="sticky top-12 space-y-8"
          >
            {/* Identity Card */}
            <div className="bg-slate-900/50 backdrop-blur-2xl rounded-3xl p-8 flex flex-col items-center text-center border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-slate-950/40 border-b border-white/5"></div>
              <div className="relative group mb-8 mt-4">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="relative z-10"
                >
                  <img 
                    src={data.personal.image} 
                    alt={data.personal.name}
                    className="w-48 h-48 rounded-full border-[8px] border-slate-900 shadow-2xl shadow-blue-500/10 object-cover object-top bg-slate-800"
                  />
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 border-4 border-slate-900 rounded-full shadow-md flex items-center justify-center" title="Available">
                  </div>
                </motion.div>
              </div>
              
              <div className="space-y-6 w-full text-left">
                <div className="space-y-4">
                  {[
                    { icon: Building2, text: data.personal.department },
                    { icon: MapPin, text: data.personal.institution },
                    { icon: Mail, text: data.personal.email, link: `mailto:${data.personal.email}` },
                    { icon: Phone, text: data.personal.phone }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (i*0.1) }}
                      className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="p-2.5 bg-slate-900 border border-white/10 shadow-sm rounded-xl text-blue-400">
                        <item.icon className="w-5 h-5" />
                      </div>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-300 hover:text-blue-400 transition-colors text-left break-words w-full">{item.text}</a>
                      ) : (
                        <span className="text-sm font-semibold text-slate-300 leading-tight text-left break-words w-full">{item.text}</span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 space-y-4 border-t border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/80 bg-blue-500/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                    Academic Identity
                  </span>
                  <div className="flex flex-wrap gap-3">
                    <PremiumDarkBadge 
                      label="ORCID" 
                      value={data.personal.ids.orcid} 
                      color="bg-[#A6CE39]/80" 
                      href={`https://orcid.org/${data.personal.ids.orcid}`}
                    />
                    <PremiumDarkBadge 
                      label="Scopus" 
                      value={data.personal.ids.scopus} 
                      color="bg-[#E75112]/80" 
                      href={`https://www.scopus.com/authid/detail.uri?authorId=${data.personal.ids.scopus}`}
                    />
                    <PremiumDarkBadge 
                      label="Scholar" 
                      value={data.personal.ids.googleScholar} 
                      color="bg-[#4285F4]/80" 
                      href={`https://scholar.google.com/citations?user=${data.personal.ids.googleScholar}`}
                    />
                  </div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-6"
                >
                  <a href="/login" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-2xl text-sm shadow-xl shadow-blue-500/10 transition-all duration-300 border border-blue-500/20">
                    Faculty Admin Access
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Sticky Floating Nav */}
            <div className="hidden lg:block bg-slate-900/50 backdrop-blur-2xl rounded-[2.5rem] p-4 border border-white/10 sticky top-12">
              <nav className="flex flex-col gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id, tab.label)}
                    className={`group px-6 py-4 rounded-2xl flex items-center justify-between text-sm font-bold transition-all duration-500 ${
                      activeTab === tab.label 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/20 scale-105 border border-blue-500/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <ChevronRight className={`w-4 h-4 transition-all duration-500 ${activeTab === tab.label ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow min-w-0 space-y-12">
          
          {/* Mobile Navigation Tabs */}
          <div className="lg:hidden sticky top-4 z-50 p-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-x-auto scrollbar-hide flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id, tab.label)}
                className={`flex-shrink-0 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === tab.label ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 min-w-0 pb-32">
            
            <div className={activeTab === 'Event Gallery' ? 'hidden' : 'space-y-12'}>
              
              {/* Biography */}
              <PremiumPanel id="personal_information_panel" icon={Users} title="Professional Profile" badge="Biography">
                <div className="text-xl text-slate-300 leading-relaxed font-medium">
                  <p>
                    <strong className="text-blue-400 text-2xl font-black">{data.personal.name}</strong> is an esteemed <strong>{data.personal.designation}</strong> in the {data.personal.department} at {data.personal.institution}. With a career dedicated to excellence in teaching and research, Dr. Kumar has pioneered significant advancements in his field.
                  </p>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="mt-8 relative group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-slate-950/60 border border-white/10 p-8 rounded-3xl backdrop-blur-xl flex items-center justify-between group">
                      <div className="space-y-1">
                        <p className="text-sm font-black uppercase text-blue-400 tracking-widest">Contact Inquiries</p>
                        <p className="text-xl md:text-2xl font-black text-slate-200">{data.personal.email}</p>
                      </div>
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:rotate-12 transition-transform">
                        <Mail className="w-8 h-8" />
                      </div>
                    </div>
                  </motion.div>
                </div>
                <PremiumDocumentsList documents={data.documents?.personal} title="Personal & Professional Documents" />
              </PremiumPanel>

              {/* Expertise Grid */}
              <PremiumPanel id="expertise_information_panel" icon={BrainCircuit} title="Technical Expertise" badge="Capability">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.expertise.map((skill, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ y: -5, rotateX: 5, rotateY: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-6 bg-slate-900/60 border border-white/5 rounded-[2rem] shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30 group cursor-default"
                    >
                      <div className="w-12 h-12 bg-slate-850 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all mb-4 border border-white/5">
                        {index % 3 === 0 ? <BrainCircuit className="w-6 h-6" /> : index % 3 === 1 ? <BookMarked className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-black text-slate-200 leading-tight">{skill}</h3>
                    </motion.div>
                  ))}
                </div>
              </PremiumPanel>

              {/* Experience Timeline */}
              <PremiumPanel id="experience_information_panel" icon={Building2} title="Career Journey" badge="History">
                <div className="space-y-8 relative before:absolute before:inset-0 before:left-[21px] before:w-1 before:bg-gradient-to-b before:from-blue-500/40 before:to-transparent before:rounded-full">
                  {data.experience.map((exp, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ x: 10 }} 
                      className="flex gap-10 group relative"
                    >
                      <div className="w-11 h-11 bg-slate-950 border-4 border-slate-800 flex-shrink-0 rounded-2xl flex items-center justify-center text-blue-400 shadow-xl z-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 scale-110 group-hover:rotate-12 border-white/5">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <div className="bg-slate-900/30 p-6 rounded-[2rem] border border-white/5 group-hover:border-blue-500/20 group-hover:bg-slate-900/70 transition-all duration-500 flex-grow shadow-lg">
                        <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2 px-3 py-1 bg-blue-500/10 rounded-full inline-block border border-blue-500/20">
                          {exp.duration}
                        </div>
                        <h3 className="text-2xl font-black text-white">{exp.role}</h3>
                        <p className="text-lg font-bold text-slate-400 mt-1">{exp.institution}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <PremiumDocumentsList documents={data.documents?.experience} title="Experience Documents" />
              </PremiumPanel>
              
              {/* Education Modern Cards */}
              <PremiumPanel id="education_information_panel" icon={GraduationCap} title="Academic Foundations" badge="Education">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {data.education.map((edu, idx) => (
                     <motion.div 
                       key={idx}
                       whileHover={{ y: -10, rotate: idx % 2 === 0 ? -0.5 : 0.5 }} 
                       className="p-8 border border-white/5 rounded-[3rem] bg-slate-900/30 shadow-xl relative overflow-hidden group backdrop-blur-3xl"
                     >
                       <div className={`absolute top-0 left-0 w-2 h-full ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-indigo-500' : 'bg-slate-600'}`}></div>
                       <div className="flex items-start justify-between mb-6">
                          <div className="p-4 bg-slate-950 border border-white/5 rounded-2xl text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all">
                            <GraduationCap className="w-8 h-8" />
                          </div>
                          <div className="text-3xl font-black text-slate-800 group-hover:text-blue-500/10 transition-colors uppercase italic font-mono">{edu.year}</div>
                       </div>
                       <h3 className="font-black text-2xl text-white group-hover:text-blue-400 transition-colors leading-tight">
                         {edu.degree}
                       </h3>
                       {edu.specialization && (
                          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">{edu.specialization}</p>
                       )}
                       <p className="text-lg font-bold text-slate-300 mt-6">{edu.institution}</p>
                     </motion.div>
                   ))}
                </div>
                <PremiumDocumentsList documents={data.documents?.education} title="Education Certificates" />
              </PremiumPanel>

              {/* Metrics Dashboard */}
              <PremiumPanel id="metrics_information_panel" icon={BarChart} title="Research Analytics" badge="Impact">
                <div className="space-y-12">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {[
                      { label: "Total Citations", value: data.metrics.totalCitations, icon: BookMarked, color: "from-blue-500 to-indigo-500", bg: "bg-blue-500/10" },
                      { label: "H-Index", value: data.metrics.hIndex, icon: Trophy, color: "from-emerald-400 to-green-500", bg: "bg-emerald-500/10" },
                      { label: "i10-Index", value: data.metrics.i10Index, icon: Award, color: "from-violet-500 to-purple-500", bg: "bg-violet-500/10" }
                    ].map((stat, i) => ( stat &&
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -10, scale: 1.02 }} 
                        className={`p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/10 flex flex-col items-center justify-center text-center shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500 overflow-hidden relative group`}
                      >
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700`}></div>
                        <div className={`w-20 h-20 ${stat.bg} border border-white/5 rounded-3xl flex items-center justify-center mb-6 shadow-xl relative z-10`}>
                          <stat.icon className={`w-10 h-10 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                        </div>
                        <h3 className={`text-6xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-1 relative z-10`}>{stat.value}</h3>
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 relative z-10">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-slate-900/60 border border-white/10 p-10 rounded-[3rem] relative shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                      <div className="space-y-2">
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full mb-3 inline-block">
                           Ranking Detail
                         </span>
                         <h4 className="text-2xl font-black text-white flex items-center gap-3">
                          <Users className="w-7 h-7 text-blue-400" />
                          Departmental Standing
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-3xl border border-white/10 shadow-2xl shadow-blue-500/5">
                        <span className="text-lg font-black italic text-slate-400">TOP</span>
                        <span className="text-4xl font-black text-blue-400">#{data.metrics.relativePosition.rank}</span>
                      </div>
                    </div>
                    <div className="relative pt-6">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                        <span>Performance Index</span>
                        <span className="text-blue-400 font-bold">{data.metrics.relativePosition.percentile}% Achieved</span>
                      </div>
                      <GlowProgressBar percent={data.metrics.relativePosition.percentile} />
                      <p className="mt-8 text-slate-400 font-medium italic opacity-80 text-center">
                        Top {100 - data.metrics.relativePosition.percentile}% Elite Performance across institutional faculty metrics.
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 bg-slate-905/30 p-10 rounded-[3rem] border border-white/5 shadow-inner">
                    <h4 className="text-lg font-black mb-10 text-slate-200 flex items-center gap-3 uppercase tracking-widest">
                      <BarChart className="w-6 h-6 text-blue-400" />
                      Publication Velocity
                    </h4>
                    <div className="h-80 w-full px-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.publicationsChart} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                          <defs>
                            <linearGradient id="premiumBarGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.2}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#334155" />
                          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 800 }} dy={15} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 800 }} />
                          <RechartsTooltip 
                            cursor={{ fill: 'rgba(59, 130, 246, 0.05)', radius: 10 }}
                            contentStyle={{ borderRadius: '24px', backgroundColor: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', padding: '16px 24px' }}
                            itemStyle={{ color: '#fff', fontWeight: '900', fontSize: '1.2rem' }}
                            labelStyle={{ fontWeight: '800', color: '#94a3b8', marginBottom: '4px' }}
                          />
                          <Bar dataKey="count" fill="url(#premiumBarGradient)" radius={[12, 12, 12, 12]} barSize={28} animationDuration={2000}>
                            {data.publicationsChart.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === data.publicationsChart.length - 1 ? '#60a5fa' : 'url(#premiumBarGradient)'} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </PremiumPanel>

              {/* Publication Stream */}
              <PremiumPanel id="other_information_panel" icon={FileText} title="Recent Research" badge="Portfolio">
                <div className="space-y-6">
                  {data.publicationsInfo.map((pub, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-8 bg-slate-900/40 hover:bg-slate-900/80 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 shadow-xl transition-all duration-500 group flex flex-col md:flex-row md:items-center justify-between gap-8"
                    >
                      <div className="flex-grow space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-black text-blue-500/30 italic font-mono">{pub.year}</span>
                          <div className="h-px bg-white/5 flex-grow"></div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight">{pub.title}</h3>
                          <p className="text-lg font-bold text-slate-400 italic flex items-center gap-2">
                            <BookOpen className="w-5 h-5 opacity-50 text-blue-400" />
                            {pub.journal}
                          </p>
                        </div>
                      </div>
                      {pub.doi && (
                        <motion.a 
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-shrink-0 flex items-center gap-3 bg-slate-800 hover:bg-blue-600 text-white px-8 py-5 rounded-3xl font-black transition-all shadow-md group-hover:shadow-blue-500/20 border border-white/10"
                        >
                          ACCESS PAPER
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                    </motion.div>
                  ))}
                </div>
                <PremiumDocumentsList documents={data.documents?.publications} title="Publication Proofs & Journals" />
              </PremiumPanel>

              {/* Accomplishments */}
              <PremiumPanel id="achievements_information_panel" icon={Trophy} title="Patents & Awards" badge="Accomplishments">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  
                  {/* Patents Modern */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                        <BookMarked className="w-6 h-6" />
                      </div>
                      <h3 className="text-3xl font-black text-white">Patents</h3>
                    </div>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:left-[1.5rem] before:w-px before:bg-white/5">
                      {data.patents.map((patent, idx) => (
                        <motion.div 
                          key={idx} 
                          whileHover={{ y: -5 }}
                          className="ml-10 p-8 bg-slate-900/40 border border-white/5 rounded-[2.5rem] shadow-xl relative group overflow-hidden"
                        >
                          <div className="absolute right-[-10px] top-[-10px] p-8 opacity-5 text-amber-500 group-hover:scale-150 transition-transform">
                            <BookMarked className="w-24 h-24" />
                          </div>
                          <span className="text-[10px] font-black uppercase text-amber-400 tracking-[0.3em] bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-3 inline-block font-mono">ID: {patent.number}</span>
                          <h4 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors leading-snug">{patent.title}</h4>
                          <div className="mt-4 text-sm font-black text-slate-400 italic">Registered • {patent.year}</div>
                          {patent.url && (
                            <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                              <a 
                                href={getViewerUrl(patent.url)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-black text-amber-400 hover:text-white transition-colors"
                              >
                                VIEW PATENT
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    <PremiumDocumentsList documents={data.documents?.patents} title="Patent Documents" />
                  </div>

                  {/* Awards Modern */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-400 border border-violet-500/20">
                        <Award className="w-6 h-6" />
                      </div>
                      <h3 className="text-3xl font-black text-white">Awards</h3>
                    </div>
                    <div className="space-y-6">
                      {data.awards.map((award, idx) => (
                        <motion.div 
                          key={idx} 
                          whileHover={{ scale: 1.02 }}
                          className="p-8 bg-gradient-to-br from-blue-900/30 to-indigo-950/50 border border-white/10 rounded-[2.5rem] shadow-2xl relative group overflow-hidden"
                        >
                          <Award className="absolute right-4 top-4 w-12 h-12 text-blue-400 opacity-20 group-hover:rotate-12 transition-transform" />
                          <h4 className="text-2xl font-black text-white pr-10 leading-snug">{award.title}</h4>
                          <p className="text-blue-300 font-bold mt-4 uppercase text-[10px] tracking-[0.2em]">{award.organization}</p>
                          {award.year && <div className="absolute top-4 left-4 bg-white/10 px-3 py-1 rounded-full text-xs font-black text-white backdrop-blur-md border border-white/20">{award.year}</div>}
                        </motion.div>
                      ))}
                    </div>
                    <PremiumDocumentsList documents={data.documents?.awards} title="Award Certificates" />
                  </div>

                  {/* Research Funds */}
                  <div className="md:col-span-2 space-y-8 pt-12 border-t border-white/5 mt-12">
                     <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 border border-green-500/20">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-3xl font-black text-white">Research Grants</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {data.grants.map((grant, idx) => (
                        <motion.div 
                          key={idx} 
                          whileHover={{ y: -5 }}
                          className="flex flex-col justify-between p-10 bg-slate-900/40 border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden group"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-[100%] opacity-50 group-hover:scale-110 transition-transform"></div>
                          <div className="relative z-10">
                            <span className="text-[10px] font-black uppercase text-green-400 tracking-[0.3em] bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">{grant.role}</span>
                            {grant.year && <span className="ml-3 text-[10px] font-black text-green-400 tracking-[0.3em] bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">{grant.year}</span>}
                            <h4 className="text-2xl font-black text-white mt-4 mb-8 leading-tight">{grant.title}</h4>
                          </div>
                          <div className="text-5xl font-black text-green-400 drop-shadow-sm flex items-end gap-2">
                            {grant.amount}
                            <span className="text-xs text-slate-500 mb-2">INR</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                </div>
              </PremiumPanel>

              {/* Professional Memberships */}
              <PremiumPanel id="memberships_panel" icon={Shield} title="Professional Memberships" badge="Affiliations">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.memberships && data.memberships.map((membership, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5, scale: 1.01 }} 
                      className="p-6 bg-slate-900/40 border border-white/5 rounded-[2rem] shadow-xl hover:shadow-[0_0_25px_rgba(59,130,246,0.1)] hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                    >
                      <div className="space-y-3 flex-grow">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                            {membership.title}
                          </span>
                          {membership.year && (
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300 bg-blue-500/20 border border-blue-500/30 px-2.5 py-1 rounded-full">
                              {membership.year}
                            </span>
                          )}
                          {membership.id && (
                            <span className="text-[10px] font-black text-slate-500 font-mono">
                              ID: {membership.id}
                            </span>
                          )}
                        </div>
                        <h4 className="text-xl font-black text-white leading-snug group-hover:text-blue-400 transition-colors">
                          {membership.organization}
                        </h4>
                        {membership.description && (
                          <p className="text-sm font-medium text-slate-400 leading-relaxed italic">
                            {membership.description}
                          </p>
                        )}
                      </div>
                      {membership.url && (
                        <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                          <a 
                            href={getViewerUrl(membership.url)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-black text-blue-400 hover:text-white transition-colors"
                          >
                            VIEW MEMBERSHIP
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <PremiumDocumentsList documents={data.documents?.memberships} title="Membership Certificates & Proofs" />
              </PremiumPanel>

              {/* Reviewer Certificates */}
              <PremiumPanel id="reviewer_certificates_panel" icon={Award} title="Certificates & Invitations" badge="Certificates">
              <div className="space-y-10">
                {(() => {
                  if (!data.reviewerCertificates) return null;
                  const grouped = data.reviewerCertificates.reduce((acc, cert) => {
                    const y = cert.year || 'Other';
                    if (!acc[y]) acc[y] = [];
                    acc[y].push(cert);
                    return acc;
                  }, {});
                  return Object.keys(grouped).sort((a, b) => b.localeCompare(a)).map(year => (
                    <div key={year} className="space-y-6">
                      {year !== 'Other' && <h4 className="text-xl font-black text-white flex items-center gap-4"><div className="h-px bg-white/10 flex-grow"></div>{year}</h4>}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {grouped[year].map((cert, idx) => (
                          <motion.div 
                            key={idx}
                            whileHover={{ y: -5, scale: 1.01 }} 
                            className="p-6 bg-slate-900/40 border border-white/5 rounded-[2rem] shadow-xl hover:shadow-[0_0_25px_rgba(59,130,246,0.1)] hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                          >
                            <div className="space-y-3 flex-grow">
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                                  {cert.title}
                                </span>
                                {cert.id && (
                                  <span className="text-[10px] font-black text-slate-500 font-mono">
                                    ID: {cert.id}
                                  </span>
                                )}
                              </div>
                              <h4 className="text-xl font-black text-white leading-snug group-hover:text-blue-400 transition-colors">
                                {cert.organization}
                              </h4>
                              {cert.description && (
                                <p className="text-sm font-medium text-slate-400 leading-relaxed italic">
                                  {cert.description}
                                </p>
                              )}
                            </div>
                            {cert.url && (
                              <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                                <a 
                                  href={getViewerUrl(cert.url)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-xs font-black text-blue-400 hover:text-white transition-colors"
                                >
                                  VIEW CERTIFICATE
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
                <PremiumDocumentsList documents={data.documents?.reviewerCertificates} title="Certificates & Reviewer Invitations" />
              </PremiumPanel>

            </div>

            {/* Gallery Panel */}
            {activeTab === 'Event Gallery' && data.gallery && data.gallery.length > 0 && (
              <PremiumPanel id="gallery_panel" icon={ImageIcon} title="Event Gallery" badge="Moments">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.gallery.map((image, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="group relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-slate-900"
                      >
                        <div className="aspect-w-4 aspect-h-3 w-full h-64 overflow-hidden">
                          <img 
                            src={image.url} 
                            alt={image.caption} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <p className="text-white font-bold text-sm leading-snug drop-shadow-md">
                            {image.caption}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </PremiumPanel>
            )}

          </div>
        </main>
      </div>

      {/* Footer Branding */}
      <footer className="bg-slate-950 py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-8 relative z-10 text-center space-y-12">
           <div className="flex items-center justify-center gap-6">
              {[Code, Hash, Globe].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  whileHover={{ y: -5, scale: 1.1 }}
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500/20 transition-all shadow-2xl"
                >
                  <Icon className="w-7 h-7" />
                </motion.a>
              ))}
           </div>
           <div className="space-y-4">
              <h2 className="text-4xl font-black bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent italic">
                {data.personal.name}
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-xs">
                © 2026 Academic Research Portal. All Rights Reserved.
              </p>
           </div>
        </div>
      </footer>
    </div>
  );
}
