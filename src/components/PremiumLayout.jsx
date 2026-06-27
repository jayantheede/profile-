import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../ProfileContext';

export default function PremiumLayout() {
  const { profileData: data } = useProfile();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    {
      label: 'Professional Activities',
      items: [
        { label: 'Professional Memberships', path: '/activities/memberships' },
        { label: 'Certificates & Invitations', path: '/activities/certificates' },
        { label: 'Experience', path: '/activities/experience' }
      ]
    },
    {
      label: 'Industry Collaboration',
      items: [
        { label: 'Grants & Funding', path: '/industry/grants' }
      ]
    },
    {
      label: 'Research',
      items: [
        { label: 'Publications', path: '/research/publications' },
        { label: 'Patents & Awards', path: '/research/patents' }
      ]
    },
    {
      label: 'Life',
      items: [
        { label: 'Event Gallery', path: '/life/gallery' }
      ]
    }
  ];

  const isActive = (path) => location.pathname === path;
  const isDropdownActive = (items) => items?.some(item => location.pathname.startsWith(item.path));

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-purple-600 selection:text-white font-sans text-slate-800 flex flex-col relative overflow-hidden">
      
      {/* High-End Glass Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md border-b border-indigo-400/30">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white font-black shadow-inner group-hover:scale-105 transition-transform border border-white/30">
                Dr
              </div>
              <div className="font-black text-xl text-white tracking-tight">
                {data.personal.name}
              </div>
            </Link>
            
            <div className="hidden lg:flex space-x-2 h-full items-center">
              {navItems.map((item) => {
                const active = isActive(item.path) || isDropdownActive(item.items);
                return (
                  <div 
                    key={item.label}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.items ? (
                      <button className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1 ${active ? 'bg-white/20 text-white shadow-inner' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
                        {item.label}
                        <svg className={`w-4 h-4 ml-1 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                      </button>
                    ) : (
                      <Link 
                        to={item.path}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${active ? 'bg-white/20 text-white shadow-inner' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                      >
                        {item.label}
                      </Link>
                    )}

                    {item.items && (
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-[85%] left-0 w-64 bg-white/90 backdrop-blur-xl border border-white shadow-2xl rounded-2xl py-3 z-50 overflow-hidden"
                          >
                            {item.items.map(subItem => (
                              <Link
                                key={subItem.label}
                                to={subItem.path}
                                onClick={() => setOpenDropdown(null)}
                                className={`block w-full text-left px-6 py-2.5 text-sm font-bold transition-colors ${isActive(subItem.path) ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'}`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
              
              <Link to="/login" className="ml-4 px-6 py-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full font-bold text-sm transition-all shadow-md">
                Admin Area
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 overflow-hidden shadow-xl"
            >
              <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
                {navItems.map((item) => (
                  <div key={item.label} className="space-y-2">
                    {item.items ? (
                      <div className="font-bold text-slate-400 uppercase tracking-widest text-xs mt-4 mb-2">{item.label}</div>
                    ) : (
                      <Link 
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block font-bold ${isActive(item.path) ? 'text-blue-600' : 'text-slate-700'}`}
                      >
                        {item.label}
                      </Link>
                    )}
                    {item.items && item.items.map(subItem => (
                      <Link
                        key={subItem.label}
                        to={subItem.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block pl-4 py-2 text-sm font-bold ${isActive(subItem.path) ? 'text-blue-600 bg-blue-50 rounded-lg' : 'text-slate-600 hover:text-blue-600'}`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-100">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center w-full px-6 py-3 bg-slate-900 text-white rounded-xl font-bold"
                  >
                    Admin Area
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow z-10 w-full bg-[#F8FAFC]">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 py-16 z-10 mt-20">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Column 1: Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">{data.personal.name}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {data.personal.designation}<br/>
                {data.personal.institution}
              </p>
              <div className="space-y-2 pt-2">
                <a href="tel:+919421056408" className="flex items-center gap-2 text-sm text-blue-600 font-bold hover:underline">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  +91 9421056408
                </a>
                <a href={`mailto:${data.personal.email}`} className="flex items-center gap-2 text-sm text-blue-600 font-bold hover:underline">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  {data.personal.email}
                </a>
              </div>
            </div>

            {/* Column 2: Location Map */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">Location</h3>
              <div className="w-full h-40 bg-slate-100 rounded-xl overflow-hidden shadow-inner border border-slate-200">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight="0" 
                  marginWidth="0" 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(data.personal.institution)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  title="Institution Location"
                ></iframe>
              </div>
            </div>

            {/* Column 3: Connect */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">Connect With Me</h3>
              <div className="flex gap-4">
                {/* Social Icons Placeholder */}
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                  <span className="font-black text-sm">G</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium">Follow my academic journey and research contributions.</p>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-bold text-slate-700">
              © 2026 {data.personal.name}. All rights reserved.
            </p>
            <p className="text-sm font-medium text-slate-500">
              Designed and Developed by <span className="font-bold text-blue-600">Antigravity</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
