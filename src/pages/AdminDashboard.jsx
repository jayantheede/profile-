import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, LayoutDashboard, FileText, Settings, 
  Upload, Users, PlusCircle, Save, Image as ImageIcon
} from 'lucide-react';
import { useProfile } from '../ProfileContext';

function AdminDashboard() {
  const navigate = useNavigate();
  const { profileData, updateImage, addPublication, updatePersonalInfo } = useProfile();
  
  const [activeTab, setActiveTab] = useState('documents');
  
  // Publication Form Form State
  const [pubTitle, setPubTitle] = useState('');
  const [pubYear, setPubYear] = useState('');
  const [pubJournal, setPubJournal] = useState('');
  const [pubDoi, setPubDoi] = useState('');

  // Personal Info Form State
  const [photoUrl, setPhotoUrl] = useState('');
  const [name, setName] = useState(profileData.personal.name);
  const [designation, setDesignation] = useState(profileData.personal.designation);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'documents', label: 'Manage Documents', icon: FileText },
    { id: 'users', label: 'Faculty Profile Settings', icon: Users },
  ];

  const handleAddPublication = (e) => {
    e.preventDefault();
    if(!pubTitle || !pubYear) return;
    addPublication({
      title: pubTitle,
      year: parseInt(pubYear),
      journal: pubJournal,
      doi: pubDoi
    });
    setPubTitle(''); setPubYear(''); setPubJournal(''); setPubDoi('');
    alert("Publication Added Successfully!");
  };

  const handleUpdatePhoto = (e) => {
    e.preventDefault();
    if(photoUrl){
        updateImage(photoUrl);
        alert("Photo updated successfully!");
        setPhotoUrl('');
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updatePersonalInfo({ name, designation });
    alert("Profile info updated successfully!");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-border shrink-0 flex flex-col min-h-screen">
        <div className="h-16 flex items-center px-6 border-b border-border bg-gray-50">
          <h1 className="text-xl font-bold text-primary tracking-tight">Admin CMS</h1>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-primary' 
                    : 'text-textSecondary hover:bg-gray-50 hover:text-textPrimary'
                }`}
              >
                <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary' : 'text-gray-400'}`} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 mb-2"
          >
            <LayoutDashboard className="w-5 h-5" />
            View Live Profile
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-textPrimary">
            {navItems.find(i => i.id === activeTab)?.label || 'Administration'}
          </h2>
        </header>

        {activeTab === 'users' && (
          <div className="space-y-6 max-w-2xl">
            <form onSubmit={handleUpdatePhoto} className="glass-card p-6">
              <h3 className="text-lg font-bold border-b border-border pb-3 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Update Profile Photo Image URL
              </h3>
              <div className="flex gap-4 items-end">
                 <div className="flex-1 space-y-1">
                    <label className="font-medium text-sm text-textPrimary">Image URL (e.g. from Imgur or Web)</label>
                    <input 
                      type="url" required 
                      value={photoUrl} onChange={e => setPhotoUrl(e.target.value)}
                      className="w-full border border-border p-2.5 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary outline-none text-sm" 
                      placeholder="https://example.com/photo.jpg" 
                    />
                 </div>
                 <button type="submit" className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all text-sm shrink-0">
                    Update Photo
                 </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Current Image: {(profileData.personal.image).substring(0,60)}...</p>
            </form>

            <form onSubmit={handleUpdateProfile} className="glass-card p-6">
              <h3 className="text-lg font-bold border-b border-border pb-3 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Edit Profile Details
              </h3>
              <div className="space-y-4">
                 <div className="space-y-1">
                    <label className="font-medium text-sm text-textPrimary">Full Name</label>
                    <input 
                      type="text" required 
                      value={name} onChange={e => setName(e.target.value)}
                      className="w-full border border-border p-2.5 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary outline-none" 
                    />
                 </div>
                 <div className="space-y-1">
                    <label className="font-medium text-sm text-textPrimary">Designation</label>
                    <input 
                      type="text" required 
                      value={designation} onChange={e => setDesignation(e.target.value)}
                      className="w-full border border-border p-2.5 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary outline-none" 
                    />
                 </div>
                 <button type="submit" className="bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all text-sm w-full">
                    Save Profile Changes
                 </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6 max-w-4xl">
            <form onSubmit={handleAddPublication} className="glass-card p-6">
              <h3 className="text-lg font-bold border-b border-border pb-3 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Add Document / Publication Entry Manually
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
                <div className="space-y-1">
                  <label className="font-medium text-textPrimary">Document Title</label>
                  <input type="text" value={pubTitle} onChange={e=>setPubTitle(e.target.value)} required className="w-full border border-border p-2.5 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Enter title..." />
                </div>
                <div className="space-y-1">
                  <label className="font-medium text-textPrimary">Publication Year</label>
                  <input type="number" value={pubYear} onChange={e=>setPubYear(e.target.value)} required className="w-full border border-border p-2.5 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="2024" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="font-medium text-textPrimary">Journal or Conference Name</label>
                  <input type="text" value={pubJournal} onChange={e=>setPubJournal(e.target.value)} className="w-full border border-border p-2.5 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="IEEE Transactions..." />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="font-medium text-textPrimary">DOI Link (Optional)</label>
                  <input type="text" value={pubDoi} onChange={e=>setPubDoi(e.target.value)} className="w-full border border-border p-2.5 rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="10.1000/xyz123" />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2 active:scale-[0.98]">
                  <Save className="w-4 h-4" />
                  Save Entry to Live Profile
                </button>
              </div>
            </form>
            
            <div className="glass-card overflow-hidden">
              <div className="p-4 border-b border-border bg-gray-50">
                <h3 className="font-semibold text-textPrimary flex justify-between">
                   <span>Recently Added Publications (From Live State)</span>
                   <span className="text-secondary opacity-50 block">{profileData.publicationsInfo.length} Items</span>
                </h3>
              </div>
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1e293b] text-white">
                    <tr>
                      <th className="px-4 py-3 font-medium w-16">Year</th>
                      <th className="px-4 py-3 font-medium">Title</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {profileData.publicationsInfo.map((pub, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-bold text-primary">{pub.year}</td>
                        <td className="px-4 py-3 font-medium">{pub.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {(!['documents', 'users'].includes(activeTab)) && (
          <div className="glass-card p-12 text-center">
            <h3 className="text-xl font-medium text-textSecondary">
              {navItems.find(i => i.id === activeTab)?.label}
            </h3>
            <p className="text-sm text-gray-400 mt-2">More CMS Modules can be integrated here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
