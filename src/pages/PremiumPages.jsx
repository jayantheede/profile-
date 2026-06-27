import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../ProfileContext';

// High-End Wrapper for sub-pages (Light Theme)
const PageWrapper = ({ title, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="space-y-12 pb-12 px-4 md:px-8 max-w-[1300px] mx-auto pt-32 lg:pt-40"
  >
    <div className="text-center space-y-4">
      <h1 className="text-4xl md:text-5xl font-black text-blue-500 tracking-tight inline-block relative mt-8">
        {title}
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-indigo-300 rounded-full"></div>
      </h1>
    </div>
    
    <div className="grid gap-6">
      {children}
    </div>
  </motion.div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow ${className}`}>
    {children}
  </div>
);

export const SolidHeaderCard = ({ title, icon, children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    className={`bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden ${className}`}
  >
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 px-6 py-4 flex items-center gap-3">
      {icon}
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </motion.div>
);

export const Memberships = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Professional Memberships">
      
      <div className="grid gap-8">
        <SolidHeaderCard 
          title="Professional Society Memberships" 
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>}
        >
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.memberships?.map((membership, index) => (
              <li key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                <svg className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <div>
                  <strong className="block text-slate-900 font-bold">{membership.title}</strong>
                  <span className="block text-slate-600 text-sm mt-1">{membership.organization}</span>
                  <span className="block text-indigo-500 text-xs font-bold mt-2 tracking-widest uppercase">{membership.id || membership.year}</span>
                </div>
              </li>
            ))}
          </ul>
        </SolidHeaderCard>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 text-center mt-12 mb-8 space-y-8">
        <h3 className="text-2xl font-medium text-slate-800">Professional Recognition</h3>
        <p className="text-slate-600 max-w-4xl mx-auto">
          {data.personal.name}'s extensive professional memberships demonstrate his commitment to advancing engineering education and fostering collaboration within the academic and professional community.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-6 border-t border-slate-100">
          <div>
            <div className="text-4xl font-bold text-blue-500 mb-2">{data.memberships?.length || 0}</div>
            <div className="text-sm text-slate-600 font-medium">Professional Memberships</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-500 mb-2">{data.awards?.length || 0}</div>
            <div className="text-sm text-slate-600 font-medium">Awards & Honors</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-500 mb-2">{data.patents?.length || 0}</div>
            <div className="text-sm text-slate-600 font-medium">Filed Patents</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-emerald-500 mb-2">{data.publicationsInfo?.length || 0}</div>
            <div className="text-sm text-slate-600 font-medium">Publications</div>
          </div>
        </div>
      </div>

    </PageWrapper>
  );
};

export const Certificates = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Certificates & Invitations">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.reviewerCertificates?.map((item, i) => (
          <SolidHeaderCard 
            key={i}
            title={item.title}
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>}
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-indigo-600 font-bold text-lg">{item.organization}</p>
              {item.year && <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-black tracking-widest">{item.year}</span>}
            </div>
            {item.description && <p className="text-slate-600 leading-relaxed font-medium text-sm">{item.description}</p>}
          </SolidHeaderCard>
        ))}
      </div>
    </PageWrapper>
  );
};

export const Experience = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Experience">
      <div className="relative before:absolute before:top-4 before:bottom-4 before:left-5 before:w-1 before:bg-indigo-100 before:rounded-full space-y-8 pl-0 py-4 max-w-4xl mx-auto">
        {data.experience.map((exp, i) => (
          <div key={i} className="relative flex items-start gap-8 group">
            <div className="w-10 h-10 mt-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 z-10 group-hover:scale-125 transition-all duration-300 shadow-lg border-4 border-white">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="flex-grow bg-white rounded-2xl shadow-lg border border-slate-100 p-8 group-hover:border-indigo-300 transition-colors">
              <span className="inline-block px-4 py-1 bg-indigo-50 text-indigo-600 font-black text-xs uppercase tracking-widest rounded-full mb-4">{exp.duration}</span>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{exp.role}</h3>
              <p className="text-lg text-slate-600 font-medium flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                {exp.institution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export const Publications = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Publications">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.publicationsInfo.map((pub, i) => (
          <SolidHeaderCard 
            key={i}
            title={pub.year.toString()}
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>}
          >
            <div className="flex flex-col h-full justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-800 leading-snug">{pub.title}</h3>
                <p className="text-slate-600 font-medium mt-3 text-sm flex items-start gap-2">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {pub.journal}
                </p>
              </div>
              {pub.doi && (
                <div className="pt-4 border-t border-slate-100">
                  <a 
                    href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-50 text-indigo-600 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    View Paper
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                </div>
              )}
            </div>
          </SolidHeaderCard>
        ))}
      </div>
    </PageWrapper>
  );
};

export const PatentsAwards = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Patents & Awards">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <SolidHeaderCard 
            title="Patents" 
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>}
            className="h-full"
          >
            <ul className="space-y-6">
              {data.patents.map((patent, i) => (
                <li key={i} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                  <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-widest rounded-full mb-2">
                    ID: {patent.number}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 leading-snug">{patent.title}</h3>
                  <p className="text-indigo-400 font-bold mt-2 text-sm">{patent.year}</p>
                </li>
              ))}
            </ul>
          </SolidHeaderCard>
        </div>
        <div className="space-y-6">
          <SolidHeaderCard 
            title="Awards" 
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>}
            className="h-full"
          >
            <ul className="space-y-6">
              {data.awards.map((award, i) => (
                <li key={i} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                  <h3 className="text-base font-bold text-slate-800 leading-snug">{award.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    <p className="text-purple-600 font-bold text-sm">{award.organization}</p>
                  </div>
                  <p className="text-slate-400 font-bold mt-1 text-sm pl-6">{award.year}</p>
                </li>
              ))}
            </ul>
          </SolidHeaderCard>
        </div>
      </div>
    </PageWrapper>
  );
};

export const Grants = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Grants & Funding">
      <div className="grid sm:grid-cols-2 gap-8">
        {data.grants.map((grant, i) => (
          <SolidHeaderCard 
            key={i}
            title={grant.title}
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
          >
            <div className="flex flex-col h-full justify-between items-center text-center py-4">
              <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 font-black text-xs uppercase tracking-widest rounded-full mb-6 border border-emerald-100">
                Role: {grant.role}
              </span>
              <div className="flex items-end justify-center gap-2 text-5xl font-black text-emerald-500 mb-2">
                {grant.amount}
                <span className="text-base font-bold text-emerald-600/50 mb-2">INR</span>
              </div>
              {grant.year && <p className="text-slate-400 font-bold mt-6 tracking-widest text-sm">YEAR: {grant.year}</p>}
            </div>
          </SolidHeaderCard>
        ))}
      </div>
    </PageWrapper>
  );
};

export const Gallery = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Event Gallery">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {data.gallery?.map((image, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-3xl overflow-hidden shadow-lg bg-white border border-slate-100 aspect-square"
          >
            <img 
              src={image.url} 
              alt={image.caption}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white font-bold text-sm leading-snug drop-shadow-md">{image.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
};

// NEW PAGES (Conferences, Talks, Reports)

export const Conferences = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Conferences & Publications">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.publicationsInfo.map((pub, i) => (
          <SolidHeaderCard 
            key={i}
            title={pub.year.toString()} 
            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>}
          >
            <h4 className="text-lg font-black text-slate-800 mb-2 leading-snug">{pub.title}</h4>
            <p className="text-sm font-medium text-slate-600 mb-4">{pub.journal}</p>
            {pub.doi && (
              <a 
                href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                target="_blank" rel="noreferrer"
                className="inline-block px-6 py-2 bg-indigo-50 text-indigo-600 font-bold rounded-full hover:bg-indigo-600 hover:text-white transition-colors shadow-sm text-xs uppercase tracking-wider"
              >
                View Paper
              </a>
            )}
          </SolidHeaderCard>
        ))}
      </div>
    </PageWrapper>
  );
};

export const Talks = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Invited Talks & Lectures">
      <div className="grid gap-8">
        <SolidHeaderCard 
          title="Guest Lectures & Keynotes" 
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>}
        >
          <ul className="space-y-4 text-sm font-medium text-slate-700">
            {data.reviewerCertificates?.filter(c => c.organization.includes('Seminar') || c.organization.includes('Lecture')).map((talk, i) => (
              <li key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <svg className="w-6 h-6 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <div>
                  <strong className="text-slate-900 block text-base mb-1">{talk.title}</strong>
                  <span className="text-indigo-600 block mb-1">{talk.organization}</span>
                  {talk.description}
                </div>
              </li>
            ))}
          </ul>
        </SolidHeaderCard>
      </div>
    </PageWrapper>
  );
};

export const Reports = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Reports & Administration">
      <div className="grid md:grid-cols-2 gap-8">
        <SolidHeaderCard 
          title="Administrative Reports" 
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>}
        >
          <ul className="space-y-4 text-sm font-medium text-slate-700">
            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Annual Quality Assurance Reports (AQAR)</li>
            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> NBA & NAAC Accreditation Documentation</li>
            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Strategic Institutional Planning Reports</li>
          </ul>
        </SolidHeaderCard>

        <SolidHeaderCard 
          title="Board of Studies" 
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>}
        >
          <ul className="space-y-4 text-sm font-medium text-slate-700">
            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg> Curriculum Development Reports</li>
            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg> Syllabus Revision Guidelines</li>
            <li className="flex items-center gap-3"><svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg> Industry Advisory Board Minutes</li>
          </ul>
        </SolidHeaderCard>
      </div>
    </PageWrapper>
  );
};
