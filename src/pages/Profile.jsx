import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, MapPin, Mail, Phone, ExternalLink, 
  BookOpen, Users, Trophy, BookMarked, BrainCircuit,
  Link as LinkIcon, GraduationCap, Award, FileText
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useProfile } from '../ProfileContext';

const Badge = ({ label, value, color }) => (
  <motion.div 
    whileHover={{ y: -3, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
    className="flex flex-col border border-border rounded-lg overflow-hidden shrink-0 min-w-[120px] transition-shadow shadow-sm bg-white"
  >
    <div className={`text-xs font-semibold px-3 py-1.5 text-white ${color}`}>
      {label}
    </div>
    <div className="px-3 py-2 text-sm font-medium text-textPrimary truncate">
      {value}
    </div>
  </motion.div>
);

const ProgressBar = ({ percent }) => {
  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2 border border-gray-300">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
      />
    </div>
  );
};

// Reusable Panel Component
const Panel = ({ id, icon: Icon, title, children }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    className="scroll-mt-28 glass-card overflow-hidden group hover:shadow-xl transition-all duration-300"
  >
    <div className="bg-gradient-to-r from-gray-50 to-white border-b border-border p-5">
      <h2 className="text-xl font-bold flex items-center gap-3 text-primary">
        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <Icon className="w-5 h-5 flex-shrink-0" />
        </div>
        {title}
      </h2>
    </div>
    <div className="p-6">
      {children}
    </div>
  </motion.section>
);

function Profile() {
  const { profileData } = useProfile();
  const data = profileData;
  const [activeTab, setActiveTab] = useState('Personal Information');

  // Exact sections from IRINS URL
  const tabs = [
    { id: 'personal_information_panel', label: 'Personal Information' },
    { id: 'expertise_information_panel', label: 'Expertise Information' },
    { id: 'experience_information_panel', label: 'Experience' },
    { id: 'education_information_panel', label: 'Education Qualification' },
    { id: 'metrics_information_panel', label: 'Metrics Overview' },
    { id: 'other_information_panel', label: 'Publications' },
    { id: 'achievements_information_panel', label: 'Patents & Awards' }
  ];

  const scrollToSection = (id, label) => {
    setActiveTab(label);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Setup observer for scrolling
  useEffect(() => {
    const observers = tabs.map(tab => {
      const el = document.getElementById(tab.id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveTab(tab.label);
          }
        },
        { rootMargin: '-120px 0px -60% 0px' }
      );
      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [profileData]);

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* High-End Header Banner with animations */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-44 bg-gradient-to-r from-[#0f172a] via-[#1e40af] to-[#0f172a] w-full shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* Left Pane: Sticky Profile Card */}
        <aside className="w-full lg:w-[22rem] flex-shrink-0">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="glass-card shadow-2xl p-6 flex flex-col items-center text-center sticky top-28 bg-white/95 backdrop-blur-md rounded-2xl"
          >
            <div className="relative group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={data.personal.image} 
                alt={data.personal.name}
                className="w-40 h-40 rounded-full border-[6px] border-white shadow-xl object-cover bg-white cursor-pointer"
              />
              <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 border-4 border-white rounded-full shadow-md tooltip-trigger" title="Active Core Member" />
            </div>
            
            <h1 className="mt-5 text-2xl font-bold text-textPrimary tracking-tight">
              {data.personal.name}
            </h1>
            <p className="text-[#1e40af] font-bold mt-1 text-sm uppercase tracking-wide">
              {data.personal.designation}
            </p>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-5" />
            
            <div className="flex flex-col gap-4 text-sm text-textSecondary w-full text-left">
              <div className="flex items-start gap-3 group">
                <div className="p-1.5 bg-blue-50 rounded text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Building2 className="w-4 h-4 shrink-0" />
                </div>
                <span className="mt-1 leading-snug">{data.personal.department}</span>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="p-1.5 bg-blue-50 rounded text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 shrink-0" />
                </div>
                <span className="mt-1 leading-snug">{data.personal.institution}</span>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="p-1.5 bg-blue-50 rounded text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4 shrink-0" />
                </div>
                <a href={`mailto:${data.personal.email}`} className="mt-1 text-primary hover:underline transition-all">
                  {data.personal.email}
                </a>
              </div>
            </div>

            {/* Academic Identity Badges */}
            <div className="w-full mt-8 space-y-4">
              <h3 className="text-xs font-bold text-left text-gray-400 uppercase tracking-widest px-1">Academic Identity</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                <div className="snap-start"><Badge label="ORCID Identifier" value={data.personal.ids.orcid} color="bg-[#A6CE39]" /></div>
                <div className="snap-start"><Badge label="Scopus ID" value={data.personal.ids.scopus} color="bg-[#E75112]" /></div>
                <div className="snap-start"><Badge label="ResearcherID" value={data.personal.ids.researcherId} color="bg-[#5C2D91]" /></div>
              </div>
            </div>
            
            {/* Nav Link to CMS */}
            <a href="/login" className="mt-8 w-full block bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium py-2 rounded-lg text-sm transition-colors shadow-inner">
              Nodal Officer / Faculty Login
            </a>
          </motion.div>
        </aside>

        {/* Center Pane: Main Content */}
        <main className="flex-grow min-w-0 flex flex-col gap-8 relative">
          
          {/* Sticky Tabbed Navbar */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="sticky top-4 z-50 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-lg shadow-gray-200/50 p-2 overflow-x-auto scrollbar-hide"
          >
            <nav className="flex space-x-1 w-max lg:w-full lg:flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id, tab.label)}
                  className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 relative ${
                    activeTab === tab.label 
                      ? 'text-white' 
                      : 'text-textSecondary hover:bg-gray-100/80 hover:text-textPrimary'
                  }`}
                >
                  {activeTab === tab.label && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-primary rounded-xl z-0 shadow-md shadow-blue-900/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Panels */}
          <div className="space-y-10">
            
            {/* Personal Information */}
            <Panel id="personal_information_panel" icon={Users} title="Personal Information">
              <div className="text-gray-700 leading-relaxed font-medium space-y-4">
                <p>
                  <strong>{data.personal.name}</strong> is currently serving as <strong>{data.personal.designation}</strong> in the {data.personal.department} at {data.personal.institution}.
                </p>
                <div className="bg-blue-50 border-l-4 border-primary p-4 rounded-r-lg text-sm">
                  Find out more on the official portal or contact via <a href={`mailto:${data.personal.email}`} className="text-primary hover:underline">{data.personal.email}</a>.
                </div>
              </div>
            </Panel>

            {/* Expertise Information */}
            <Panel id="expertise_information_panel" icon={BrainCircuit} title="Expertise Information">
              <div className="flex flex-wrap gap-3">
                <AnimatePresence>
                  {data.expertise.map((skill, index) => (
                    <motion.span 
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
                      whileHover={{ scale: 1.05, backgroundColor: "#1e40af", color: "#ffffff" }}
                      className="px-5 py-2.5 bg-blue-50/50 text-blue-900 border border-blue-200 rounded-full text-sm font-medium transition-colors cursor-default shadow-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </Panel>

            {/* Experience */}
            <Panel id="experience_information_panel" icon={Building2} title="Experience">
              <div className="space-y-6">
                {data.experience.map((exp, idx) => (
                  <motion.div key={idx} whileHover={{ x: 10 }} className="flex gap-4 border-l-2 border-gray-200 pl-4 relative group">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 shadow-[0_0_0_4px_white] transition-transform group-hover:scale-150" />
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wide bg-gray-100 inline-block px-2 py-1 rounded">
                        {exp.duration}
                      </div>
                      <h3 className="text-lg font-bold text-textPrimary mt-2">{exp.role}</h3>
                      <p className="text-sm text-textSecondary">{exp.institution}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Panel>
            
            {/* Education Qualification */}
            <Panel id="education_information_panel" icon={GraduationCap} title="Education Qualification">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {data.education.map((edu, idx) => (
                   <motion.div 
                     key={idx}
                     whileHover={{ y: -5 }} 
                     className="p-4 border border-border rounded-xl bg-gray-50/50 relative overflow-hidden"
                   >
                     <div className={`absolute top-0 left-0 w-1 h-full ${idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-indigo-500' : 'bg-slate-400'}`}></div>
                     <h3 className="font-bold text-lg">{edu.degree} {edu.specialization ? `in ${edu.specialization}` : ''}</h3>
                     <p className="text-sm text-gray-600 mt-1">{edu.institution}</p>
                     <p className="text-xs font-bold text-gray-400 mt-3 pt-3 border-t border-gray-200">{edu.year}</p>
                   </motion.div>
                 ))}
              </div>
            </Panel>

            {/* Metrics Overview ID */}
            <Panel id="metrics_information_panel" icon={BarChart} title="Metrics & Visualizations">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-6 bg-gradient-to-br from-white to-blue-50 border-blue-100 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-blue-900/10">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-primary mb-4 transform rotate-3">
                    <BookMarked className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-extrabold text-blue-900 mb-1">{data.metrics.totalCitations}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Total Citations</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-6 bg-gradient-to-br from-white to-green-50 border-green-100 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-green-900/10">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 mb-4 transform -rotate-3">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-extrabold text-green-900 mb-1">{data.metrics.hIndex}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-green-600">H-Index</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-6 bg-gradient-to-br from-white to-purple-50 border-purple-100 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-purple-900/10">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700 mb-4 transform rotate-12">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-extrabold text-purple-900 mb-1">{data.metrics.i10Index}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-600">i10-Index</p>
                </motion.div>
              </div>

              {/* Relative Position */}
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl relative overflow-hidden mb-8">
                <div className="absolute right-0 top-0 w-32 h-32 bg-primary opacity-5 rounded-full filter blur-[20px] translate-x-1/2 -translate-y-1/2"></div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Relative Position in Department
                  </h4>
                  <span className="text-sm font-bold text-white bg-gray-800 px-4 py-1.5 rounded-full shadow-md">
                    Rank {data.metrics.relativePosition.rank} / {data.metrics.relativePosition.totalFaculty}
                  </span>
                </div>
                <div className="group relative pt-2 pb-4">
                  <ProgressBar percent={data.metrics.relativePosition.percentile} />
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg py-2 px-3 absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap shadow-xl z-10 transition-all duration-300">
                    Highest Performance: Top {100 - data.metrics.relativePosition.percentile}% Achieved
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1.5 border-4 border-transparent border-b-gray-900/90"></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h4 className="text-md font-bold mb-6 text-gray-600 flex items-center gap-2">Publication Timeline</h4>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.publicationsChart} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13 }} />
                      <RechartsTooltip 
                        cursor={{ fill: 'rgba(30, 64, 175, 0.05)' }}
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="count" fill="#1e40af" radius={[6, 6, 0, 0]} animationDuration={1500} animationEasing="ease-out">
                        {data.publicationsChart.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === data.publicationsChart.length - 1 ? '#3b82f6' : '#1e293b'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Panel>

            {/* Publications Table */}
            <Panel id="other_information_panel" icon={FileText} title={`Publications (${data.publicationsInfo.length})`}>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mt-2">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1e293b] text-white uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-4 w-24">Year</th>
                      <th className="px-6 py-4">Title / Source Details</th>
                      <th className="px-6 py-4 w-32 text-right">Links</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <AnimatePresence>
                      {data.publicationsInfo.map((pub, idx) => (
                        <motion.tr 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          key={idx} 
                          className="hover:bg-blue-50/50 transition-colors group cursor-default"
                        >
                          <td className="px-6 py-5 text-[#1e40af] font-black text-lg align-top">{pub.year}</td>
                          <td className="px-6 py-5">
                            <p className="font-bold text-gray-900 text-base leading-tight group-hover:text-[#1e40af] transition-colors">{pub.title}</p>
                            <p className="text-gray-500 mt-2 text-sm italic border-l-2 border-gray-300 pl-3">{pub.journal}</p>
                          </td>
                          <td className="px-6 py-5 align-top text-right">
                            {pub.doi ? (
                              <motion.a 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-white bg-[#1e40af] shadow-md shadow-blue-900/20 hover:bg-blue-800 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap"
                              >
                                <LinkIcon className="w-3.5 h-3.5" />
                                DOI Link
                              </motion.a>
                            ) : (
                               <span className="text-gray-400 text-xs font-medium bg-gray-100 px-3 py-1 rounded">No Digital URL</span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </Panel>

            {/* Patents & Awards */}
            <Panel id="achievements_information_panel" icon={Trophy} title="Patents, Awards & Grants">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Patents */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
                    <FileText className="w-5 h-5 text-amber-500" />
                    Patents
                  </h3>
                  <div className="space-y-3">
                    {data.patents.map((patent, idx) => (
                      <motion.div key={idx} className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                          <BookMarked className="w-12 h-12" />
                        </div>
                        <h4 className="font-bold text-amber-900">{patent.title}</h4>
                        <p className="text-xs text-amber-700 mt-1">Number: {patent.number} • {patent.year}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700">
                    <Award className="w-5 h-5 text-purple-500" />
                    Major Awards
                  </h3>
                  <div className="space-y-3">
                    {data.awards.map((award, idx) => (
                      <motion.div key={idx} className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl">
                        <h4 className="font-bold text-purple-900">{award.title}</h4>
                        <p className="text-xs text-purple-700 mt-1">{award.organization}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Research Grants */}
                <div className="lg:col-span-2 space-y-4">
                   <h3 className="text-lg font-bold flex items-center gap-2 text-slate-700 border-t pt-6">
                    <Building2 className="w-5 h-5 text-green-500" />
                    Research & Consultancy Grants
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.grants.map((grant, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 bg-green-50/50 border border-green-100 rounded-xl">
                        <div>
                          <h4 className="font-bold text-green-900">{grant.title}</h4>
                          <p className="text-xs text-green-700">Role: {grant.role}</p>
                        </div>
                        <div className="text-lg font-black text-green-600">
                          {grant.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Panel>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
