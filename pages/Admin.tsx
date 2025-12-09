import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Service, Project, Testimonial, Plan, ContactSubmission } from '../types';
import { Trash2, Plus, Save, X, LogOut, MessageSquare, Layout, Package, Star, DollarSign, Edit } from 'lucide-react';

export const Admin: React.FC = () => {
  const { 
    data, isAdmin, logoutAdmin, 
    addService, deleteService, 
    addProject, deleteProject, updateProject,
    addTestimonial, deleteTestimonial,
    updatePlan, resetData
  } = useStore();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'portfolio' | 'pricing' | 'testimonials' | 'inquiries'>('overview');

  // Simple state for forms
  const [newService, setNewService] = useState<Partial<Service>>({ title: '', description: '', icon: 'Box' });
  
  // Project form state - including raw string for images input
  const [newProject, setNewProject] = useState<Partial<Project>>({ 
    title: '', 
    description: '', 
    imageUrl: 'https://picsum.photos/400/300', 
    images: [],
    shopifyTheme: '',
    featured: false
  });
  const [imagesInput, setImagesInput] = useState('');
  
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({ clientName: '', businessName: '', content: '', rating: 5 });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null; // Or a loading spinner
  }

  const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all ${
        activeTab === id 
        ? 'bg-brand-light text-brand-dark font-bold shadow-lg shadow-brand-light/20 translate-x-1' 
        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
      }`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  // Helper to start editing a project
  const handleEditProject = (project: Project) => {
    setNewProject(project);
    // Populate images input from array
    setImagesInput(project.images ? project.images.join('\n') : project.imageUrl);
    setEditingProjectId(project.id);
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProject = () => {
    if(!newProject.title) return;

    // Parse images from text area
    const imageList = imagesInput.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    const mainImage = imageList.length > 0 ? imageList[0] : 'https://picsum.photos/400/300';

    const projectData = {
        ...newProject,
        imageUrl: mainImage,
        images: imageList,
        featured: newProject.featured || false
    };

    if (editingProjectId) {
      updateProject({ ...projectData, id: editingProjectId } as Project);
      setEditingProjectId(null);
    } else {
      addProject({ 
        ...projectData, 
        id: Date.now().toString()
      } as Project);
    }
    // Reset form
    setNewProject({ title: '', description: '', imageUrl: 'https://picsum.photos/400/300', shopifyTheme: '', featured: false, images: [] });
    setImagesInput('');
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setNewProject({ title: '', description: '', imageUrl: 'https://picsum.photos/400/300', shopifyTheme: '', featured: false, images: [] });
    setImagesInput('');
  };

  const toggleFeatured = (project: Project) => {
    updateProject({ ...project, featured: !project.featured });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-brand-dark">
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sticky top-24 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8 px-2">
              <span className="font-display font-bold text-xl text-white">Dashboard</span>
              <button 
                onClick={() => { logoutAdmin(); navigate('/login'); }} 
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-2 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
            <div className="space-y-2">
              <TabButton id="overview" label="Overview" icon={Layout} />
              <TabButton id="inquiries" label="Inquiries" icon={MessageSquare} />
              <TabButton id="services" label="Services" icon={Package} />
              <TabButton id="portfolio" label="Portfolio" icon={Layout} />
              <TabButton id="pricing" label="Pricing" icon={DollarSign} />
              <TabButton id="testimonials" label="Testimonials" icon={Star} />
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 px-2">
                 <button onClick={resetData} className="text-xs text-red-500 hover:text-red-400 hover:underline w-full text-left transition-colors">
                    Reset Database to Default
                 </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-white/5 rounded-3xl border border-white/10 p-6 sm:p-10 backdrop-blur-sm min-h-[600px]">
          
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-display font-bold mb-8 text-white">Welcome back, Admin</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-brand-surface/30 p-8 rounded-2xl border border-white/10 hover:border-brand-light/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-brand-light/20 rounded-lg text-brand-light"><MessageSquare size={24} /></div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{data.inquiries.length}</div>
                  <div className="text-gray-400 text-sm">Total Inquiries</div>
                </div>
                <div className="bg-brand-surface/30 p-8 rounded-2xl border border-white/10 hover:border-brand-light/50 transition-colors">
                   <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-brand-light/20 rounded-lg text-brand-light"><Layout size={24} /></div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{data.projects.length}</div>
                  <div className="text-gray-400 text-sm">Active Projects</div>
                </div>
                <div className="bg-brand-surface/30 p-8 rounded-2xl border border-white/10 hover:border-brand-light/50 transition-colors">
                   <div className="flex justify-between items-start mb-4">
                     <div className="p-3 bg-brand-light/20 rounded-lg text-brand-light"><Package size={24} /></div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{data.services.length}</div>
                  <div className="text-gray-400 text-sm">Services Offered</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="animate-fade-in">
               <h2 className="text-3xl font-display font-bold mb-8 text-white">Contact Submissions</h2>
               <div className="space-y-4">
                 {data.inquiries.length === 0 ? 
                  <div className="text-center py-20 text-gray-500">
                      <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                      No inquiries yet.
                  </div> 
                  : 
                  data.inquiries.map((inq) => (
                    <div key={inq.id} className="p-6 rounded-2xl bg-black/20 border border-white/10 hover:border-brand-light/30 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-light/10 text-brand-light flex items-center justify-center font-bold">
                                {inq.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-white">{inq.name}</div>
                                <div className="text-xs text-gray-400">{inq.email}</div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">{new Date(inq.date).toLocaleDateString()}</span>
                      </div>
                      <div className="ml-13 pl-13">
                        <div className="inline-block px-3 py-1 rounded text-xs uppercase font-bold tracking-wider bg-brand-accent/20 text-brand-accent mb-3">
                            Theme: {inq.theme}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed p-4 bg-black/20 rounded-xl border border-white/5">"{inq.message}"</p>
                      </div>
                    </div>
                  ))
                 }
               </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-display font-bold text-white">Manage Services</h2>
              </div>
              
              {/* Add Form */}
              <div className="mb-8 p-6 bg-brand-surface/10 rounded-2xl border border-brand-light/20">
                <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-brand-light flex items-center gap-2">
                    <Plus size={16} /> Add New Service
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    <input type="text" placeholder="Title" className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-brand-light outline-none" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} />
                    <input type="text" placeholder="Description" className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-brand-light outline-none" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} />
                    <button 
                        onClick={() => { if(newService.title) { addService({ id: Date.now().toString(), title: newService.title!, description: newService.description || '', icon: 'Box' }); setNewService({ title: '', description: '' }); }}}
                        className="bg-brand-light text-brand-dark font-bold py-3 rounded-xl hover:bg-white transition-colors"
                    >
                        Add Service
                    </button>
                </div>
              </div>

              <div className="grid gap-4">
                {data.services.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-6 bg-black/20 rounded-2xl border border-white/10">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
                            <Package size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-white text-lg">{s.title}</div>
                            <div className="text-sm text-gray-400">{s.description}</div>
                        </div>
                    </div>
                    <button onClick={() => deleteService(s.id)} className="text-gray-500 hover:text-red-400 hover:bg-red-400/10 p-3 rounded-xl transition-all"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-display font-bold mb-8 text-white">Manage Portfolio & Selected Works</h2>
               
               {/* Add/Edit Form */}
               <div className={`mb-8 p-6 rounded-2xl border transition-colors ${editingProjectId ? 'bg-brand-light/10 border-brand-light' : 'bg-brand-surface/10 border-brand-light/20'}`}>
                <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-brand-light flex items-center gap-2">
                    {editingProjectId ? <Edit size={16} /> : <Plus size={16} />} 
                    {editingProjectId ? 'Edit Project' : 'Add New Project'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Project Title" className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-brand-light outline-none" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
                    <input type="text" placeholder="Shopify Theme (e.g. Impact)" className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-brand-light outline-none" value={newProject.shopifyTheme} onChange={e => setNewProject({...newProject, shopifyTheme: e.target.value})} />
                    
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Image URLs (One per line or comma separated)</label>
                        <textarea 
                             placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" 
                             className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-brand-light outline-none"
                             rows={3}
                             value={imagesInput} 
                             onChange={e => setImagesInput(e.target.value)} 
                        />
                         <p className="text-xs text-gray-500 mt-1">The first image will be used as the main thumbnail.</p>
                    </div>

                    <textarea placeholder="Description" className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-brand-light outline-none md:col-span-2" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
                    
                    <div className="md:col-span-2 flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5">
                        <input 
                            type="checkbox" 
                            id="featured"
                            checked={newProject.featured || false}
                            onChange={e => setNewProject({...newProject, featured: e.target.checked})}
                            className="w-5 h-5 rounded border-gray-300 text-brand-light focus:ring-brand-light"
                        />
                        <label htmlFor="featured" className="text-sm text-gray-300 select-none cursor-pointer">
                            Show in "Selected Works" on Home Page
                        </label>
                    </div>

                    <div className="md:col-span-2 flex gap-3">
                        <button 
                            onClick={handleSaveProject}
                            className="flex-1 bg-brand-light text-brand-dark font-bold py-3 rounded-xl hover:bg-white transition-colors"
                        >
                            {editingProjectId ? 'Update Project' : 'Add Project'}
                        </button>
                        {editingProjectId && (
                             <button 
                                onClick={handleCancelEdit}
                                className="px-6 bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.projects.map(p => (
                      <div key={p.id} className={`relative group rounded-2xl overflow-hidden aspect-video border ${p.featured ? 'border-brand-light shadow-lg shadow-brand-light/20' : 'border-white/10'}`}>
                          <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                          
                          {/* Featured Badge */}
                          <div className="absolute top-2 right-2 flex gap-2">
                             {p.images && p.images.length > 1 && (
                                <span className="bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-md flex items-center">
                                    {p.images.length} Images
                                </span>
                             )}
                             <button 
                                onClick={() => toggleFeatured(p)}
                                className={`p-2 rounded-full backdrop-blur-md shadow-lg transition-all ${p.featured ? 'bg-brand-light text-brand-dark' : 'bg-black/50 text-gray-400 hover:text-white'}`}
                                title="Toggle Featured in 'Selected Works'"
                             >
                                 <Star size={18} fill={p.featured ? 'currentColor' : 'none'} />
                             </button>
                          </div>

                          <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm gap-3">
                               <button 
                                onClick={() => handleEditProject(p)} 
                                className="bg-white text-brand-dark px-4 py-2 rounded-lg font-bold flex items-center gap-2 transform hover:scale-105 transition-all"
                               >
                                   <Edit size={16} /> Edit
                               </button>
                              <button 
                                onClick={() => deleteProject(p.id)} 
                                className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transform hover:scale-105 transition-all"
                              >
                                  <Trash2 size={16} /> Delete
                              </button>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                              <div className="text-white font-bold text-lg">{p.title}</div>
                              <div className="text-xs text-brand-light uppercase tracking-wider font-bold">{p.shopifyTheme} Theme</div>
                          </div>
                      </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="animate-fade-in">
               <h2 className="text-3xl font-display font-bold mb-8 text-white">Edit Pricing Plans</h2>
               <div className="grid grid-cols-1 gap-6">
                 {data.plans.map(plan => (
                   <div key={plan.id} className="p-6 rounded-2xl border border-white/10 bg-black/20">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl text-white">{plan.name}</h3>
                        {plan.recommended && <span className="bg-brand-light text-brand-dark text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>}
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Price Display</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3 text-gray-500"><DollarSign size={16} /></span>
                                <input 
                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-brand-light outline-none"
                                    value={plan.price}
                                    onChange={(e) => updatePlan({...plan, price: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Status</label>
                             <button 
                                onClick={() => updatePlan({...plan, recommended: !plan.recommended})}
                                className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-colors ${plan.recommended ? 'bg-brand-light text-brand-dark' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                             >
                                 {plan.recommended ? 'Marked as Recommended' : 'Set as Recommended'}
                             </button>
                        </div>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Features (comma separated)</label>
                        <textarea 
                             className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-light outline-none leading-relaxed"
                             rows={4}
                             value={plan.features.join(', ')}
                             onChange={(e) => updatePlan({...plan, features: e.target.value.split(',').map(s => s.trim())})}
                        />
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}
          
          {activeTab === 'testimonials' && (
              <div className="animate-fade-in">
                  <h2 className="text-3xl font-display font-bold mb-8 text-white">Manage Testimonials</h2>
                  {/* Add Testimonial Form */}
                  <div className="mb-8 p-6 bg-brand-surface/10 rounded-2xl border border-brand-light/20">
                    <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-brand-light flex items-center gap-2">
                        <Plus size={16} /> Add New Testimonial
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Client Name" className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-brand-light outline-none" value={newTestimonial.clientName} onChange={e => setNewTestimonial({...newTestimonial, clientName: e.target.value})} />
                            <input type="text" placeholder="Business Name" className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-brand-light outline-none" value={newTestimonial.businessName} onChange={e => setNewTestimonial({...newTestimonial, businessName: e.target.value})} />
                        </div>
                        <textarea placeholder="Testimonial Content" className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:border-brand-light outline-none" value={newTestimonial.content} onChange={e => setNewTestimonial({...newTestimonial, content: e.target.value})} />
                        <button 
                            onClick={() => { if(newTestimonial.clientName) { addTestimonial({ id: Date.now().toString(), clientName: newTestimonial.clientName!, businessName: newTestimonial.businessName!, content: newTestimonial.content!, rating: 5 }); setNewTestimonial({ clientName: '', businessName: '', content: '' }); }}}
                            className="bg-brand-light text-brand-dark font-bold py-3 rounded-xl hover:bg-white transition-colors"
                        >
                            Add Testimonial
                        </button>
                    </div>
                  </div>
                  <div className="grid gap-4">
                      {data.testimonials.map(t => (
                          <div key={t.id} className="p-6 bg-black/20 rounded-2xl border border-white/10 relative hover:border-brand-light/30 transition-all">
                              <button onClick={() => deleteTestimonial(t.id)} className="absolute top-6 right-6 text-gray-500 hover:text-red-400"><Trash2 size={20} /></button>
                              <div className="flex gap-1 text-brand-light mb-3">
                                  {[...Array(5)].map((_,i) => <Star key={i} size={14} fill="currentColor" />)}
                              </div>
                              <p className="italic text-gray-300 mb-4 text-lg">"{t.content}"</p>
                              <div>
                                <div className="font-bold text-white">{t.clientName}</div>
                                <div className="text-xs text-brand-accent uppercase tracking-wider font-bold">{t.businessName}</div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}

        </div>
      </div>
    </div>
  );
};