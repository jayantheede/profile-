const fs = require('fs');

let content = fs.readFileSync('/Users/evp/Desktop/profile /src/pages/Profile.jsx', 'utf-8');

// 1. Add Navbar component right before `function Profile() {`
const navbarCode = `
const TopNavbar = ({ activeTab, setActiveTab }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { label: 'Home', id: 'personal_information_panel' },
    { 
      label: 'Professional Activities', 
      items: [
        { label: 'Professional Memberships', id: 'memberships_panel' },
        { label: 'Certificates & Invitations', id: 'reviewer_certificates_panel' },
        { label: 'Experience', id: 'experience_information_panel' },
        { label: 'Education', id: 'education_information_panel' }
      ]
    },
    { 
      label: 'Research & Industry', 
      items: [
        { label: 'Technical Expertise', id: 'expertise_information_panel' },
        { label: 'Recent Research', id: 'other_information_panel' },
        { label: 'Research Analytics', id: 'metrics_information_panel' },
        { label: 'Patents & Awards', id: 'achievements_information_panel' }
      ]
    },
    { 
      label: 'Life', 
      items: [
        { label: 'Event Gallery', id: 'gallery_panel' }
      ]
    }
  ];

  const scrollToSection = (id, label) => {
    setActiveTab(label);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 120;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        window.scrollTo({
          top: elementRect - bodyRect - offset,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[110] bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 font-black text-2xl text-slate-900 tracking-tight flex items-center gap-2">
             <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black">Dr</div>
             Profile
          </div>
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.items ? (
                  <button className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors flex items-center gap-1 rounded-full hover:bg-slate-100">
                    {item.label}
                  </button>
                ) : (
                  <button 
                    onClick={() => scrollToSection(item.id, item.label)}
                    className={\`px-4 py-2 text-sm font-bold transition-colors rounded-full hover:bg-slate-100 \${activeTab === item.label ? 'text-primary bg-primary/10' : 'text-slate-600 hover:text-primary'}\`}
                  >
                    {item.label}
                  </button>
                )}

                {item.items && (
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-64 bg-white border border-slate-100 shadow-xl rounded-2xl py-2 mt-2 z-50 overflow-hidden"
                      >
                        {item.items.map(subItem => (
                          <button
                            key={subItem.label}
                            onClick={() => {
                              setOpenDropdown(null);
                              scrollToSection(subItem.id, subItem.label);
                            }}
                            className="w-full text-left px-6 py-3 text-sm font-bold text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors"
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
            <a href="/login" className="ml-4 px-6 py-2 bg-slate-900 hover:bg-primary text-white font-bold rounded-full transition-colors flex items-center gap-2 text-sm shadow-lg">
              Admin <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Main Component ---`;
content = content.replace('// --- Main Component ---', navbarCode);

// 2. Insert TopNavbar into the component render
content = content.replace(
  '<MeshBackground />',
  '<MeshBackground />\n      <TopNavbar activeTab={activeTab} setActiveTab={setActiveTab} />'
);

// 3. Update the header to be a standard hero section since we now have a navbar
const headerCode = `<motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="h-[45vh] bg-slate-900 w-full shadow-xl relative overflow-hidden flex items-center justify-center pt-24"
      >`;
content = content.replace(
  '<motion.header \n        initial={{ y: -100 }}\n        animate={{ y: 0 }}\n        className="h-[45vh] bg-slate-900 w-full shadow-xl relative overflow-hidden flex items-center justify-center pt-10"\n      >',
  headerCode
);

// 4. Remove the Sidebar entirely
const sidebarStartRegex = /<aside className="w-full lg:w-\[380px\] flex-shrink-0">[\s\S]*?<\/aside>/;
const replacementIdentityCard = `
<div className="w-full lg:w-1/3 flex-shrink-0">
  <motion.div 
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="sticky top-28 space-y-8"
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
            className="w-48 h-48 rounded-full border-[8px] border-white shadow-lg object-cover object-top bg-slate-100"
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
            { icon: Mail, text: data.personal.email, link: \`mailto:\${data.personal.email}\` },
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
            <PremiumBadge 
              label="ORCID" 
              value={data.personal.ids.orcid} 
              color="bg-[#A6CE39]" 
              href={\`https://orcid.org/\${data.personal.ids.orcid}\`}
            />
            <PremiumBadge 
              label="Scopus" 
              value={data.personal.ids.scopus} 
              color="bg-[#E75112]" 
              href={\`https://www.scopus.com/authid/detail.uri?authorId=\${data.personal.ids.scopus}\`}
            />
            <PremiumBadge 
              label="Scholar" 
              value={data.personal.ids.googleScholar} 
              color="bg-[#4285F4]" 
              href={data.personal.ids.googleScholarLink || \`https://scholar.google.com/citations?user=\${data.personal.ids.googleScholar}\`}
            />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
</div>
`;

content = content.replace(sidebarStartRegex, replacementIdentityCard);

// 5. Update main tag class to take 2/3 space
content = content.replace('<main className="flex-grow min-w-0 space-y-12">', '<main className="w-full lg:w-2/3 flex-grow min-w-0 space-y-12 pt-4">');

// 6. Remove the mobile tabs bar since we use top navbar now for mobile as well (we can just hide mobile tabs for simplicity, or keep them)
const mobileTabsRegex = /<div className="lg:hidden sticky top-4 z-50 p-2 glass-card rounded-3xl bg-white\/90 overflow-x-auto scrollbar-hide flex gap-2">[\s\S]*?<\/div>/;
content = content.replace(mobileTabsRegex, '');

fs.writeFileSync('/Users/evp/Desktop/profile /src/pages/Profile.jsx', content);
console.log('Profile updated successfully');
