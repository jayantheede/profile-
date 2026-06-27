import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../ProfileContext';

const AcademicProfile = () => {
  const { profileData: data } = useProfile();
  const [activeTab, setActiveTab] = useState('Home');
  const [openDropdown, setOpenDropdown] = useState(null);

  // Exact structure from drvirendra-shete.in
  const navItems = [
    { label: 'Home', id: 'home' },
    {
      label: 'Professional Activities',
      items: [
        { label: 'Professional Memberships', id: 'memberships' },
        { label: 'Certificates & Invitations', id: 'certificates' },
        { label: 'Experience', id: 'experience' }
      ]
    },
    {
      label: 'Industry Collaboration',
      items: [
        { label: 'Grants & Funding', id: 'grants' }
      ]
    },
    {
      label: 'Research',
      items: [
        { label: 'Publications', id: 'publications' },
        { label: 'Patents & Awards', id: 'patents' }
      ]
    },
    {
      label: 'Life',
      items: [
        { label: 'Event Gallery', id: 'gallery' }
      ]
    },
    { label: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. SOLID BLUE NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-700 shadow-md">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-bold text-xl text-white tracking-wide">
              {data.personal.name}
            </div>
            
            <div className="hidden lg:flex space-x-1 h-full items-center">
              {navItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.items ? (
                    <button className="px-3 py-2 text-white/90 hover:text-white font-medium flex items-center gap-1">
                      {item.label}
                      <svg className="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                  ) : (
                    <button 
                      onClick={() => scrollToSection(item.id)}
                      className="px-3 py-2 text-white/90 hover:text-white font-medium"
                    >
                      {item.label}
                    </button>
                  )}

                  {item.items && (
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-16 left-0 w-56 bg-white border border-slate-200 shadow-lg py-2 z-50"
                        >
                          {item.items.map(subItem => (
                            <button
                              key={subItem.label}
                              onClick={() => {
                                setOpenDropdown(null);
                                scrollToSection(subItem.id);
                              }}
                              className="w-full text-left px-5 py-2.5 text-sm font-normal text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                            >
                              {subItem.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
              <a href="/login" className="ml-4 px-4 py-1.5 border border-white/30 text-white hover:bg-white/10 rounded font-medium text-sm transition-colors">
                Admin
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        
        {/* 2. HERO SECTION */}
        <section id="home" className="max-w-[1200px] mx-auto px-4 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-10 bg-white p-10 rounded shadow-sm border border-slate-100">
            <div className="flex-grow space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                {data.personal.name}
              </h1>
              <p className="text-xl text-slate-600 font-medium">
                {data.personal.designation}
              </p>
              <p className="text-lg text-slate-600">
                {data.personal.department}
                <br />
                {data.personal.institution}
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="bg-sky-100 text-sky-800 border border-sky-200 text-xs font-semibold px-2.5 py-1 rounded">
                  {data.education[0]?.degree}
                </span>
                <span className="bg-sky-100 text-sky-800 border border-sky-200 text-xs font-semibold px-2.5 py-1 rounded">
                  {data.education[1]?.degree}
                </span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded">
                  ORCID: {data.personal.ids.orcid}
                </span>
                <span className="bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-semibold px-2.5 py-1 rounded">
                  Scopus: {data.personal.ids.scopus}
                </span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <img 
                src={data.personal.image} 
                alt={data.personal.name}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-slate-100 shadow-md"
              />
            </div>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-4 space-y-12">

          {/* 3. PROFESSIONAL ACTIVITIES */}
          <section id="memberships" className="bg-white p-8 rounded shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b border-slate-200 pb-2">Professional Memberships</h2>
            <ul className="list-disc pl-5 space-y-3">
              {data.memberships.map((membership, idx) => (
                <li key={idx} className="text-slate-700">
                  <strong>{membership.title}</strong>, {membership.organization} 
                  {membership.id && <span className="text-slate-500 ml-1">(ID: {membership.id})</span>}
                </li>
              ))}
            </ul>
          </section>

          <section id="certificates" className="bg-white p-8 rounded shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b border-slate-200 pb-2">Certificates & Invitations</h2>
            <ul className="list-disc pl-5 space-y-3">
              {data.reviewerCertificates?.map((cert, idx) => (
                <li key={idx} className="text-slate-700">
                  <strong>{cert.title}</strong> - {cert.organization} ({cert.year})
                </li>
              ))}
            </ul>
          </section>

          <section id="experience" className="bg-white p-8 rounded shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b border-slate-200 pb-2">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="font-bold text-lg text-slate-800">{exp.role}</h3>
                  <p className="text-slate-600">{exp.institution}</p>
                  <p className="text-sm text-slate-500 font-medium">{exp.duration}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. RESEARCH */}
          <section id="publications" className="bg-white p-8 rounded shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b border-slate-200 pb-2">Publications</h2>
            <div className="space-y-4">
              {data.publicationsInfo.map((pub, idx) => (
                <div key={idx} className="pb-4 border-b border-slate-100 last:border-0">
                  <p className="text-slate-800 font-semibold">{pub.title}</p>
                  <p className="text-slate-600 text-sm">
                    {pub.journal} <span className="font-bold">({pub.year})</span>
                  </p>
                  {pub.doi && (
                    <a href={"https://doi.org/" + pub.doi} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm font-medium mt-1 inline-block">
                      DOI: {pub.doi}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section id="patents" className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-blue-700 mb-4 border-b border-slate-200 pb-2">Patents</h2>
              <ul className="list-disc pl-5 space-y-3">
                {data.patents.map((patent, idx) => (
                  <li key={idx} className="text-slate-700">
                    {patent.title} <br/>
                    <span className="text-sm text-slate-500 font-medium">ID: {patent.number} ({patent.year})</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-blue-700 mb-4 border-b border-slate-200 pb-2">Awards</h2>
              <ul className="list-disc pl-5 space-y-3">
                {data.awards.map((award, idx) => (
                  <li key={idx} className="text-slate-700">
                    <strong>{award.title}</strong> <br/>
                    <span className="text-sm text-slate-600">{award.organization} ({award.year})</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 5. GRANTS / INDUSTRY */}
          <section id="grants" className="bg-white p-8 rounded shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b border-slate-200 pb-2">Grants & Funding</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.grants.map((grant, idx) => (
                <div key={idx} className="bg-slate-50 p-5 rounded border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-2">{grant.title}</h3>
                  <p className="text-sm text-slate-600 mb-1">Role: {grant.role}</p>
                  <p className="font-bold text-blue-700">{grant.amount} INR</p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. LIFE / GALLERY */}
          {data.gallery && data.gallery.length > 0 && (
            <section id="gallery" className="bg-white p-8 rounded shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b border-slate-200 pb-2">Event Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.gallery.map((image, idx) => (
                  <div key={idx} className="group relative">
                    <img 
                      src={image.url} 
                      alt={image.caption} 
                      className="w-full h-40 object-cover rounded border border-slate-200"
                    />
                    <div className="mt-2 text-xs text-slate-500 font-medium text-center">{image.caption}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 7. CONTACT */}
          <section id="contact" className="bg-white p-8 rounded shadow-sm border border-slate-100 text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Contact Information</h2>
            <p className="text-lg text-slate-700 font-medium">{data.personal.email}</p>
            <p className="text-lg text-slate-700 font-medium">{data.personal.phone}</p>
            <p className="text-slate-500 mt-2">{data.personal.institution}</p>
          </section>

        </div>
      </main>

      <footer className="bg-blue-800 py-8 text-center text-white/80">
        <p className="text-sm">© 2026 {data.personal.name}. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AcademicProfile;
