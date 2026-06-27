import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useProfile } from '../ProfileContext';

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract numbers and non-numbers
  const numStr = value.replace(/[^0-9]/g, '');
  const suffix = value.replace(/[0-9]/g, '');
  const endValue = parseInt(numStr, 10);

  useEffect(() => {
    if (isInView && !isNaN(endValue)) {
      let startTimestamp = null;
      const duration = 2000; // 2 seconds

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * endValue));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(endValue);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, endValue]);

  if (isNaN(endValue)) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

export default function HighEndHome() {
  const { profileData: data } = useProfile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full pb-32"
    >
      {/* 
        HERO SECTION
        Matches reference: Purple/Blue gradient, massive watermark, overlapping bottom cards
      */}
      <section className="relative w-full min-h-[85vh] bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 flex flex-col justify-center pt-32 lg:pt-40">
        
        {/* Massive Watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 mix-blend-overlay overflow-hidden">
          <img 
            src={data.personal.image} 
            alt="Watermark" 
            className="w-full h-full object-cover filter blur-sm scale-110"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1300px] w-full mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 mb-40">
          
          {/* Left Side: Text and Actions */}
          <div className="flex-1 space-y-6 text-white max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              {data.personal.name}
            </h1>
            
            <div className="space-y-1">
              <p className="text-xl lg:text-2xl font-medium text-white/90">
                {data.personal.designation}
              </p>
              <p className="text-lg text-white/80 font-medium">
                {data.personal.institution}
              </p>
            </div>

            {/* Blue Pill Tags (Roles) */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-4 py-1.5 bg-blue-600/80 rounded-full text-xs font-bold shadow-sm">Principal & Professor (2021-Present)</span>
              <span className="px-4 py-1.5 bg-blue-600/80 rounded-full text-xs font-bold shadow-sm">Professor & Principal (2014-2021)</span>
              <span className="px-4 py-1.5 bg-blue-600/80 rounded-full text-xs font-bold shadow-sm">Chief Innovation Officer</span>
            </div>

            <p className="text-white/90 text-sm leading-relaxed max-w-2xl font-medium pt-2">
              Distinguished academician and visionary leader with over 14 years of exemplary service in Engineering education. Specializing in VLSI System Design, Speech Processing, and Deep Learning, {data.personal.name} is instrumental in shaping the future of technical education.
            </p>

            {/* Inline Icons */}
            <div className="flex flex-wrap gap-6 pt-2 pb-4 text-sm font-bold text-white/90">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                International Publications
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                Global Academic Leadership
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                International Collaborations
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl font-bold transition-colors">
                Research Portfolio
              </button>
              <button className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border border-white/50 rounded-xl font-bold transition-colors">
                International Journey
              </button>
            </div>
          </div>

          {/* Right Side: Profile Image */}
          <div className="hidden md:block w-72 lg:w-[340px] flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden border-[6px] border-white shadow-2xl">
              <img 
                src={data.personal.image} 
                alt={data.personal.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Overlapping Stat Cards */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 flex justify-center z-20 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1200px] w-full">
            {[
              { value: "14+", label: "Years Experience" },
              { value: data.metrics.hIndex.toString(), label: "h-Index" },
              { value: data.metrics.totalCitations.toString(), label: "Citations" },
              { value: data.metrics.i10Index.toString(), label: "i10-Index" }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-8 px-6 text-center border border-slate-100 flex flex-col justify-center items-center">
                <div className="text-4xl lg:text-5xl font-black text-blue-600 mb-2 tracking-tight">
                  <AnimatedNumber value={stat.value} />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* spacer to account for overlapping cards */}
      <div className="h-40"></div>

      {/* Main Content Sections */}
      <div className="max-w-[1300px] mx-auto px-6 lg:px-8 space-y-24">
        
        {/* About Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 inline-block">
              About <span className="text-indigo-500">{data.personal.name}</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-200 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4 flex items-center gap-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-9 5m9-5l9 5"></path></svg>
                <h3 className="text-xl font-bold text-white">Academic Excellence</h3>
              </div>
              <div className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed font-medium">
                <p>
                  {data.personal.name} holds a Ph.D in VLSI System Design (Speech Processing) from GITAM University. He also completed his M.Tech in VLSI System Design from JNTU Hyderabad. His academic journey reflects a commitment to continuous learning and innovation in engineering education.
                </p>
                <ul className="space-y-2 pt-2">
                  <li className="flex gap-2"><svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Ph.D in VLSI System Design</li>
                  <li className="flex gap-2"><svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>M.Tech in VLSI System Design</li>
                  <li className="flex gap-2"><svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>B.Tech in ECE</li>
                  <li className="flex gap-2"><svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Certified Chief Innovation Officer</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-4 flex items-center gap-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <h3 className="text-xl font-bold text-white">Research Contributions</h3>
              </div>
              <div className="p-6 space-y-4 text-sm text-slate-700 leading-relaxed font-medium">
                <p>
                  His research portfolio includes extensive publications in reputed international journals and conferences, {data.patents.length} patents, with {data.metrics.totalCitations} citations, h-index of {data.metrics.hIndex} and i10-index of {data.metrics.i10Index}. His work addresses real-world challenges through AI and Signal Processing.
                </p>
                <ul className="space-y-2 pt-2">
                  <li className="flex gap-2"><svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Speech & Signal Processing</li>
                  <li className="flex gap-2"><svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Bio-Medical Image Processing</li>
                  <li className="flex gap-2"><svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Machine Learning & Deep Learning</li>
                  <li className="flex gap-2"><svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>Internet of Things (IoT)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Vision */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 inline-block">
              Leadership & <span className="text-indigo-500">Vision</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-200 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 space-y-6">
            <p className="text-base text-slate-700 leading-relaxed font-medium">
              As {data.personal.designation} at {data.personal.institution}, {data.personal.name} has pioneered innovative academic programs, established state-of-the-art research facilities, fostered strong industry-academia partnerships, and secured significant grants including projects from the Ministry of Electronics and Information Technology.
            </p>
            
            <div className="space-y-4 pt-2">
              <h4 className="flex items-center gap-2 font-bold text-blue-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>Key Leadership Initiatives:</h4>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-3"><svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><strong className="text-slate-900">Administrative & Academic Excellence:</strong> Development of university administrative and academic structure, good practices in academics and research.</div></li>
                <li className="flex gap-3"><svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><strong className="text-slate-900">Quality Assurance & Standards:</strong> Establishment of Standard Operating Procedures for different university ranking and accreditations.</div></li>
                <li className="flex gap-3"><svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div><strong className="text-slate-900">Strategic Partnerships:</strong> Strengthen National and International Institutional Networking and industry-institute collaboration.</div></li>
              </ul>
            </div>
          </div>

          {/* 3 Columns under leadership */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg border-l-4 border-l-blue-400 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-700 mb-4"><svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>Professional Memberships</h3>
              <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                <li>Life Member SOLETE</li>
                <li>Life Member ISTE</li>
                <li>Member IETE & IE</li>
                <li>Member SCIEI & SDIWC</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-l-4 border-l-indigo-400 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-700 mb-4"><svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>Leadership Roles</h3>
              <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                <li>Principal & Professor</li>
                <li>Reviewer IJIST (Wiley)</li>
                <li>Reviewer ICIECE</li>
                <li>Resource Person PM-USHA</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-l-4 border-l-purple-400 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-700 mb-4"><svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>Research & Innovation</h3>
              <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                <li>5 Filed Patents</li>
                <li>1850+ Citations</li>
                <li>MeitY Grant Convener</li>
                <li>Best Teacher Award 2025</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
