import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../ProfileContext';

// High-End Wrapper for sub-pages
const PageWrapper = ({ title, subtitle, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="space-y-10"
  >
    <div className="bg-white/60 backdrop-blur-2xl rounded-[3rem] p-10 border border-white shadow-xl flex flex-col justify-center min-h-[200px] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-transparent rounded-full opacity-50 blur-3xl pointer-events-none"></div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight z-10">{title}</h1>
      {subtitle && <p className="text-lg font-bold text-blue-600 mt-2 z-10">{subtitle}</p>}
    </div>
    
    <div className="grid gap-6">
      {children}
    </div>
  </motion.div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-shadow \${className}`}>
    {children}
  </div>
);

export const Memberships = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Professional Memberships" subtitle="Global Affiliations">
      {data.memberships.map((item, i) => (
        <Card key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-wider rounded-full mb-3">
              {item.title}
            </div>
            <h3 className="text-2xl font-black text-slate-800">{item.organization}</h3>
            {item.description && <p className="text-slate-500 mt-2 font-medium">{item.description}</p>}
          </div>
          {item.id && (
            <div className="text-right flex-shrink-0">
              <span className="text-xs font-black uppercase text-slate-400 block">Membership ID</span>
              <span className="text-lg font-bold text-slate-700 font-mono">{item.id}</span>
            </div>
          )}
        </Card>
      ))}
    </PageWrapper>
  );
};

export const Certificates = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Certificates & Invitations" subtitle="Academic Recognition">
      {data.reviewerCertificates?.map((item, i) => (
        <Card key={i}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
            {item.year && <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-bold">{item.year}</span>}
          </div>
          <p className="text-blue-600 font-bold mb-2">{item.organization}</p>
          {item.description && <p className="text-slate-600 leading-relaxed">{item.description}</p>}
        </Card>
      ))}
    </PageWrapper>
  );
};

export const Experience = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Experience" subtitle="Career Journey">
      <div className="relative before:absolute before:top-4 before:bottom-4 before:left-5 before:w-1 before:bg-blue-100 before:rounded-full space-y-8 pl-0 py-4">
        {data.experience.map((exp, i) => (
          <div key={i} className="relative flex items-start gap-8 group">
            <div className="w-10 h-10 mt-2 bg-white border-4 border-blue-100 rounded-full flex-shrink-0 z-10 group-hover:border-blue-500 group-hover:scale-125 transition-all duration-300 shadow-md"></div>
            <Card className="flex-grow group-hover:border-blue-200">
              <span className="text-sm font-black text-blue-500 uppercase tracking-widest block mb-2">{exp.duration}</span>
              <h3 className="text-2xl font-black text-slate-900">{exp.role}</h3>
              <p className="text-lg text-slate-600 font-medium mt-1">{exp.institution}</p>
            </Card>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export const Publications = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Publications" subtitle="Research Output">
      {data.publicationsInfo.map((pub, i) => (
        <Card key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-blue-200">
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">{pub.title}</h3>
            <p className="text-slate-600 font-medium mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              {pub.journal} ({pub.year})
            </p>
          </div>
          {pub.doi && (
            <a 
              href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/\${pub.doi}`}
              target="_blank" rel="noreferrer"
              className="flex-shrink-0 px-6 py-3 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-bold rounded-2xl transition-colors shadow-sm"
            >
              View Paper
            </a>
          )}
        </Card>
      ))}
    </PageWrapper>
  );
};

export const PatentsAwards = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Patents & Awards" subtitle="Innovation & Excellence">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 px-2">Patents</h2>
          {data.patents.map((patent, i) => (
            <Card key={i} className="bg-gradient-to-br from-white to-amber-50 border-amber-100">
              <span className="text-xs font-black uppercase tracking-widest text-amber-500 mb-2 block">ID: {patent.number}</span>
              <h3 className="text-lg font-bold text-slate-800 leading-snug">{patent.title}</h3>
              <p className="text-amber-600 font-bold mt-4">{patent.year}</p>
            </Card>
          ))}
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 px-2">Awards</h2>
          {data.awards.map((award, i) => (
            <Card key={i} className="bg-gradient-to-br from-white to-purple-50 border-purple-100">
              <h3 className="text-lg font-bold text-slate-800 leading-snug">{award.title}</h3>
              <p className="text-purple-600 font-bold mt-2">{award.organization}</p>
              <p className="text-slate-500 font-medium mt-2">{award.year}</p>
            </Card>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export const Grants = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Grants & Funding" subtitle="Industry Collaboration">
      <div className="grid sm:grid-cols-2 gap-6">
        {data.grants.map((grant, i) => (
          <Card key={i} className="relative overflow-hidden group hover:border-emerald-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full opacity-50 -z-10 group-hover:scale-110 transition-transform"></div>
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 font-bold text-xs uppercase tracking-wider rounded-full mb-4">
              {grant.role}
            </span>
            <h3 className="text-xl font-bold text-slate-800 mb-6">{grant.title}</h3>
            <div className="flex items-end gap-2 text-4xl font-black text-emerald-600">
              {grant.amount}
              <span className="text-sm font-bold text-slate-500 mb-1">INR</span>
            </div>
            {grant.year && <p className="text-slate-400 font-bold mt-4">{grant.year}</p>}
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
};

export const Gallery = () => {
  const { profileData: data } = useProfile();
  return (
    <PageWrapper title="Event Gallery" subtitle="Life & Memories">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {data.gallery?.map((image, i) => (
          <div key={i} className="group relative rounded-3xl overflow-hidden shadow-lg bg-white border border-white aspect-square">
            <img 
              src={image.url} 
              alt={image.caption}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white font-bold text-sm leading-snug drop-shadow-md">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};
