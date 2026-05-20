import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  Building2, MapPin, Mail, Phone, ExternalLink, 
  BookOpen, Users, Trophy, BookMarked, BrainCircuit,
  Link as LinkIcon, GraduationCap, Award, FileText,
  ChevronRight, ArrowRight, Github, Twitter, Linkedin
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useProfile } from '../ProfileContext';

// --- Premium Components ---

const MeshBackground = () => (
  <div className="fixed inset-0 z-[-1] bg-slate-50">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] max-w-[1200px] h-[600px] opacity-[0.15] bg-gradient-to-b from-primary/30 via-primary/5 to-transparent blur-[100px] rounded-full mix-blend-multiply pointer-events-none" />
  </div>
);

const SectionBadge = ({ text }) => (
  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 bg-primary/5 px-2.5 py-1 rounded-full mb-3 inline-block">
    {text}
  </span>
);

const PremiumBadge = ({ label, value, color, icon: Icon }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="flex flex-col glass-card rounded-2xl overflow-hidden min-w-[140px] transition-all hover:shadow-2xl hover:shadow-primary/10 group bg-white/40 backdrop-blur-xl border-white/50"
  >
    <div className={`text-[10px] font-bold px-4 py-2 border-b border-black/5 flex items-center justify-between ${color} text-white/90`}>
      {label}
      {Icon && <Icon className="w-3 h-3 opacity-50" />}
    </div>
    <div className="px-4 py-3 text-sm font-bold text-slate-800 truncate">
      {value}
    </div>
  </motion.div>
);

const ProgressBar = ({ percent }) => (
  <div className="relative w-full h-[6px] bg-slate-100 rounded-full overflow-hidden mt-3 shadow-inner">
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: `${percent}%` }}
      transition={{ duration: 2, ease: "circOut" }}
      viewport={{ once: true }}
      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-blue-400 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"
    />
  </div>
);

const Panel = ({ id, icon: Icon, title, badge, children }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="scroll-mt-32 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
  >
    <div className="p-8 pb-0">
      <SectionBadge text={badge || "Section"} />
      <h2 className="text-3xl font-black flex items-center gap-4 text-slate-900 transition-colors">
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-primary">
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

const DocumentsList = ({ documents, title = "Related Documents" }) => {
  if (!documents || documents.length === 0) return null;
  return (
    <div className="mt-8 pt-8 border-t border-slate-200/50">
      <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
        <FileText className="w-6 h-6 text-primary" />
        {title}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, idx) => (
          <motion.a
            key={idx}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            className="flex items-center gap-4 p-4 bg-white/60 border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/20 transition-all group"
          >
            <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-primary transition-colors line-clamp-2" title={doc.title}>
              {doc.title}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---

function Profile() {
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
    { id: 'achievements_information_panel', label: 'Patents & Awards', badge: 'Accomplishments' }
  ];

  const scrollToSection = (id, label) => {
    setActiveTab(label);
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
    <div className="min-h-screen relative selection:bg-primary selection:text-white overflow-x-hidden">
      <MeshBackground />

      {/* Reading Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[100] origin-left shadow-[0_0_15px_rgba(37,99,235,0.6)]"
        style={{ scaleX }}
      />
      
      {/* Dynamic Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="h-[45vh] bg-slate-900 w-full shadow-xl relative overflow-hidden flex items-center justify-center pt-10"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative text-center z-10 space-y-6 px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight"
          >
            {data.personal.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-primary-100 text-lg md:text-2xl font-semibold tracking-widest text-slate-300 uppercase"
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
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center border border-slate-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 border-b border-slate-100"></div>
              <div className="relative group mb-8 mt-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative z-10"
                >
                  <img 
                    src={data.personal.image} 
                    alt={data.personal.name}
                    className="w-48 h-48 rounded-full border-[8px] border-white shadow-lg object-cover bg-slate-100"
                  />
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 border-4 border-white rounded-full shadow-md flex items-center justify-center" title="Available">
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
                      transition={{ delay: 0.8 + (i*0.1) }}
                      className="flex items-center gap-4 bg-slate-50/80 p-4 rounded-2xl border border-slate-100 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="p-2.5 bg-white shadow-sm rounded-xl text-primary">
                        <item.icon className="w-5 h-5" />
                      </div>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors text-left break-words w-full">{item.text}</a>
                      ) : (
                        <span className="text-sm font-semibold text-slate-700 leading-tight text-left break-words w-full">{item.text}</span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 space-y-4">
                  <SectionBadge text="Academic Identity" />
                  <div className="flex flex-wrap gap-3">
                    <PremiumBadge label="ORCID" value={data.personal.ids.orcid} color="bg-[#A6CE39]" />
                    <PremiumBadge label="Scopus" value={data.personal.ids.scopus} color="bg-[#E75112]" />
                    <PremiumBadge label="Scholar" value={data.personal.ids.googleScholar} color="bg-[#4285F4]" />
                  </div>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-6"
                >
                  <a href="/login" className="w-full flex items-center justify-center gap-2 bg-slate-900 border-none text-white font-bold py-4 rounded-2xl text-sm shadow-lg hover:bg-primary transition-all duration-300">
                    Faculty Admin Access
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Sticky Floating Nav */}
            <div className="hidden lg:block glass-card rounded-[2.5rem] p-4 bg-white/40 border-white/40 sticky top-12">
              <nav className="flex flex-col gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id, tab.label)}
                    className={`group px-6 py-4 rounded-2xl flex items-center justify-between text-sm font-bold transition-all duration-500 ${
                      activeTab === tab.label 
                        ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' 
                        : 'text-slate-500 hover:bg-white/80 hover:text-slate-900'
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
          <div className="lg:hidden sticky top-4 z-50 p-2 glass-card rounded-3xl bg-white/90 overflow-x-auto scrollbar-hide flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id, tab.label)}
                className={`flex-shrink-0 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === tab.label ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-16">
            
            {/* Biography */}
            <Panel id="personal_information_panel" icon={Users} title="Professional Profile" badge="Biography">
              <div className="text-xl text-slate-700 leading-relaxed font-medium">
                <p className="indent-8 first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:mr-3">
                  <strong>{data.personal.name}</strong> is an esteemed <strong>{data.personal.designation}</strong> in the {data.personal.department} at {data.personal.institution}. With a career dedicated to excellence in teaching and research, Dr. Kumar has pioneered significant advancements in his field.
                </p>
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="mt-8 relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative bg-white/40 border border-white p-8 rounded-3xl backdrop-blur-xl flex items-center justify-between group">
                    <div className="space-y-1">
                      <p className="text-sm font-black uppercase text-primary/60 tracking-widest">Contact Inquiries</p>
                      <p className="text-2xl font-black text-slate-900">{data.personal.email}</p>
                    </div>
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:rotate-12 transition-transform">
                      <Mail className="w-8 h-8" />
                    </div>
                  </div>
                </motion.div>
              </div>
              <DocumentsList documents={data.documents?.personal} title="Personal & Professional Documents" />
            </Panel>

            {/* Expertise Grid */}
            <Panel id="expertise_information_panel" icon={BrainCircuit} title="Technical Expertise" badge="Capability">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.expertise.map((skill, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -5, rotateX: 10, rotateY: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 group cursor-default"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all mb-4">
                      {index % 3 === 0 ? <BrainCircuit className="w-6 h-6" /> : index % 3 === 1 ? <BookMarked className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
                    </div>
                    <h3 className="text-lg font-black text-slate-800 leading-tight">{skill}</h3>
                  </motion.div>
                ))}
              </div>
            </Panel>

            {/* Experience Timeline */}
            <Panel id="experience_information_panel" icon={Building2} title="Career Journey" badge="History">
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-[21px] before:w-1 before:bg-gradient-to-b before:from-primary/20 before:to-transparent before:rounded-full">
                {data.experience.map((exp, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ x: 10 }} 
                    className="flex gap-10 group relative"
                  >
                    <div className="w-11 h-11 bg-white border-4 border-slate-50 flex-shrink-0 rounded-2xl flex items-center justify-center text-primary shadow-lg z-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 scale-110 group-hover:rotate-12">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <div className="bg-white/40 p-6 rounded-[2rem] border border-white group-hover:border-primary/20 group-hover:bg-white transition-all duration-500 flex-grow shadow-sm">
                      <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 px-3 py-1 bg-primary/5 rounded-full inline-block">
                        {exp.duration}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900">{exp.role}</h3>
                      <p className="text-lg font-bold text-slate-500 mt-1">{exp.institution}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <DocumentsList documents={data.documents?.experience} title="Experience Documents" />
            </Panel>
            
            {/* Education Modern Cards */}
            <Panel id="education_information_panel" icon={GraduationCap} title="Academic Foundations" badge="Education">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {data.education.map((edu, idx) => (
                   <motion.div 
                     key={idx}
                     whileHover={{ y: -10, rotate: idx % 2 === 0 ? -1 : 1 }} 
                     className="p-8 border border-white rounded-[3rem] bg-white/40 shadow-xl relative overflow-hidden group backdrop-blur-3xl"
                   >
                     <div className={`absolute top-0 left-0 w-2 h-full ${idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-indigo-500' : 'bg-slate-400'}`}></div>
                     <div className="flex items-start justify-between mb-6">
                        <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                          <GraduationCap className="w-8 h-8" />
                        </div>
                        <div className="text-3xl font-black text-slate-200 group-hover:text-primary/10 transition-colors uppercase italic">{edu.year}</div>
                     </div>
                     <h3 className="font-black text-2xl text-slate-900 group-hover:text-primary transition-colors leading-tight">
                       {edu.degree}
                     </h3>
                     {edu.specialization && (
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">{edu.specialization}</p>
                     )}
                     <p className="text-lg font-bold text-slate-600 mt-6">{edu.institution}</p>
                   </motion.div>
                 ))}
              </div>
              <DocumentsList documents={data.documents?.education} title="Education Certificates" />
            </Panel>

            {/* Metrics Dashboard */}
            <Panel id="metrics_information_panel" icon={BarChart} title="Research Analytics" badge="Impact">
              <div className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {[
                    { label: "Total Citations", value: data.metrics.totalCitations, icon: BookMarked, color: "from-blue-500 to-primary", bg: "bg-blue-50" },
                    { label: "H-Index", value: data.metrics.hIndex, icon: Trophy, color: "from-emerald-400 to-green-600", bg: "bg-green-50" },
                    { label: "i10-Index", value: data.metrics.i10Index, icon: Award, color: "from-violet-500 to-purple-700", bg: "bg-purple-50" }
                  ].map((stat, i) => ( stat &&
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10, scale: 1.02 }} 
                      className={`glass-card p-8 rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 border-white flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative group`}
                    >
                      <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700`}></div>
                      <div className={`w-20 h-20 ${stat.bg} rounded-3xl flex items-center justify-center mb-6 shadow-xl relative z-10`}>
                        <stat.icon className={`w-10 h-10 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                      </div>
                      <h3 className={`text-6xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-1 relative z-10`}>{stat.value}</h3>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400 relative z-10">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white/60 backdrop-blur-3xl border border-white p-10 rounded-[3rem] relative shadow-2xl">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div className="space-y-2">
                       <SectionBadge text="Ranking Detail" />
                       <h4 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <Users className="w-7 h-7 text-primary" />
                        Departmental Standing
                      </h4>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-3xl shadow-2xl shadow-slate-900/40">
                      <span className="text-lg font-black italic">TOP</span>
                      <span className="text-4xl font-black text-primary">#{data.metrics.relativePosition.rank}</span>
                    </div>
                  </div>
                  <div className="relative pt-6">
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                      <span>Performance Index</span>
                      <span>{data.metrics.relativePosition.percentile}% Achieved</span>
                    </div>
                    <ProgressBar percent={data.metrics.relativePosition.percentile} />
                    <p className="mt-8 text-slate-500 font-medium italic opacity-80 text-center">
                      Top {100 - data.metrics.relativePosition.percentile}% Elite Performance across institutional faculty metrics.
                    </p>
                  </div>
                </div>

                <div className="mt-12 bg-white/40 p-10 rounded-[3rem] border border-white shadow-inner">
                  <h4 className="text-lg font-black mb-10 text-slate-800 flex items-center gap-3 uppercase tracking-widest">
                    <BarChart className="w-6 h-6 text-primary" />
                    Publication Velocity
                  </h4>
                  <div className="h-80 w-full px-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.publicationsChart} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 800 }} dy={15} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 800 }} />
                        <RechartsTooltip 
                          cursor={{ fill: 'rgba(37, 99, 235, 0.05)', radius: 10 }}
                          contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px 24px' }}
                          itemStyle={{ color: '#0f172a', fontWeight: '900', fontSize: '1.2rem' }}
                          labelStyle={{ fontWeight: '800', color: '#64748b', marginBottom: '4px' }}
                        />
                        <Bar dataKey="count" fill="url(#barGradient)" radius={[12, 12, 12, 12]} barSize={28} animationDuration={2000}>
                          {data.publicationsChart.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === data.publicationsChart.length - 1 ? '#0f172a' : 'url(#barGradient)'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </Panel>

            {/* Publication Stream */}
            <Panel id="other_information_panel" icon={FileText} title="Recent Research" badge="Portfolio">
              <div className="space-y-6">
                {data.publicationsInfo.map((pub, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 bg-white/60 hover:bg-white rounded-[2.5rem] border border-white hover:border-primary/20 shadow-xl transition-all duration-500 group flex flex-col md:flex-row md:items-center justify-between gap-8"
                  >
                    <div className="flex-grow space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-black text-primary/20 italic">{pub.year}</span>
                        <div className="h-px bg-slate-100 flex-grow"></div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">{pub.title}</h3>
                        <p className="text-lg font-bold text-slate-400 italic flex items-center gap-2">
                          <BookOpen className="w-5 h-5 opacity-50" />
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
                        className="flex-shrink-0 flex items-center gap-3 bg-slate-100 hover:bg-primary text-slate-900 hover:text-white px-8 py-5 rounded-3xl font-black transition-all shadow-md group-hover:shadow-primary/20"
                      >
                        ACCESS PAPER
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </div>
              <DocumentsList documents={data.documents?.publications} title="Publication Proofs & Journals" />
            </Panel>

            {/* Accomplishments */}
            <Panel id="achievements_information_panel" icon={Trophy} title="Patents & Awards" badge="Accomplishments">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Patents Modern */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                      <BookMarked className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">Patents</h3>
                  </div>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:left-[1.5rem] before:w-px before:bg-amber-100">
                    {data.patents.map((patent, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ y: -5 }}
                        className="ml-10 p-8 bg-white/80 border border-white rounded-[2.5rem] shadow-xl relative group overflow-hidden"
                      >
                        <div className="absolute right-[-10px] top-[-10px] p-8 opacity-5 text-amber-600 group-hover:scale-150 transition-transform">
                          <BookMarked className="w-24 h-24" />
                        </div>
                        <span className="text-[10px] font-black uppercase text-amber-500 tracking-[0.3em] bg-amber-50 px-3 py-1 rounded-full mb-3 inline-block">ID: {patent.number}</span>
                        <h4 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">{patent.title}</h4>
                        <div className="mt-4 text-sm font-black text-slate-400 italic">Registered • {patent.year}</div>
                      </motion.div>
                    ))}
                  </div>
                  <DocumentsList documents={data.documents?.patents} title="Patent Documents" />
                </div>

                {/* Awards Modern */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">Awards</h3>
                  </div>
                  <div className="space-y-6">
                    {data.awards.map((award, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ scale: 1.02 }}
                        className="p-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[2.5rem] shadow-2xl relative group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                        <Award className="absolute right-4 top-4 w-12 h-12 text-white opacity-20 group-hover:rotate-12 transition-transform" />
                        <h4 className="text-2xl font-black text-white pr-10">{award.title}</h4>
                        <p className="text-purple-100 font-bold mt-4 uppercase text-[10px] tracking-[0.2em]">{award.organization}</p>
                      </motion.div>
                    ))}
                  </div>
                  <DocumentsList documents={data.documents?.awards} title="Award Certificates" />
                </div>

                {/* Research Funds */}
                <div className="md:col-span-2 space-y-8 pt-12 border-t border-slate-100 mt-12">
                   <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">Research Grants</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {data.grants.map((grant, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ y: -5 }}
                        className="flex flex-col justify-between p-10 bg-white/80 border border-white rounded-[3rem] shadow-2xl relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100%] opacity-50 group-hover:scale-110 transition-transform"></div>
                        <div className="relative z-10">
                          <span className="text-[10px] font-black uppercase text-green-500 tracking-[0.3em]">{grant.role}</span>
                          <h4 className="text-2xl font-black text-slate-900 mt-2 mb-8 leading-tight">{grant.title}</h4>
                        </div>
                        <div className="text-5xl font-black text-green-600 drop-shadow-sm flex items-end gap-2">
                          {grant.amount}
                          <span className="text-xs text-slate-400 mb-2">INR</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>
            </Panel>

          </div>
        </main>
      </div>

      {/* Footer Branding */}
      <footer className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[150px]"></div>
        <div className="max-w-[1400px] mx-auto px-8 relative z-10 text-center space-y-12">
           <div className="flex items-center justify-center gap-6">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  whileHover={{ y: -5, scale: 1.1 }}
                  href="#" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary transition-all shadow-2xl"
                >
                  <Icon className="w-7 h-7" />
                </motion.a>
              ))}
           </div>
           <div className="space-y-4">
              <h2 className="text-4xl font-black bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent italic">
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

export default Profile;
