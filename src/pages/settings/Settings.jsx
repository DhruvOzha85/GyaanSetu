import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Globe, 
  Bell, 
  Shield, 
  CreditCard, 
  Accessibility, 
  Camera,
  Check,
  Github,
  Linkedin,
  Trash2,
  Lock,
  Mail,
  ChevronRight,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Monitor,
  LogOut
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { Switch, Slider } from '@mui/material';
import { toast } from 'react-hot-toast';

// Actions
import { setFontSize, setReducedMotion, setHighContrast, setTheme } from '../../features/ui/uiSlice';
import { setLanguage } from '../../features/language/languageSlice';
import { setPreferences, setProfile, clearUser } from '../../features/user/userSlice';
import { logout } from '../../features/auth/authSlice';

// Services
import userService from '../../services/userService';

// Validation Schema for Profile
const ProfileSchema = Yup.object().shape({
  displayName: Yup.string().required('Required'),
  username: Yup.string().required('Required').matches(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers and underscores'),
  bio: Yup.string().max(200, 'Too long!'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, fontSize, reducedMotion, highContrast } = useSelector((state) => state.ui);
  const { profile, preferences } = useSelector((state) => state.user);
  const { current: currentLanguage } = useSelector((state) => state.language);

  const [activeSection, setActiveSection] = useState('account');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const sectionsRef = useRef({});

  const navItems = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    sectionsRef.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleProfileUpdate = async (values) => {
    try {
      // In a real app, we'd call the API:
      // await userService.updateProfile(values);
      dispatch(setProfile(values));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePreferenceChange = (key, value) => {
    const updatedPrefs = { ...preferences, [key]: value };
    dispatch(setPreferences(updatedPrefs));
    // userService.updatePreferences(updatedPrefs);
  };

  const handleNotificationToggle = (type, channel, value) => {
    const updatedNotifications = {
      ...preferences.notifications,
      [type]: {
        ...preferences.notifications[type],
        [channel]: value
      }
    };
    handlePreferenceChange('notifications', updatedNotifications);
  };

  const handleDeleteAccount = () => {
    toast.loading('Deleting account...');
    setTimeout(() => {
      dispatch(logout());
      dispatch(clearUser());
      localStorage.clear();
      sessionStorage.clear();
      toast.dismiss();
      toast.success('Account deleted successfully');
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20 animate-in fade-in duration-700">
      <Helmet>
        <title>Settings | GyaanSetu</title>
      </Helmet>

      {/* Left Sidebar Navigation */}
      <aside className="lg:w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-2">
          <div className="p-6 mb-6 bg-slate-50 dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
                   {profile?.displayName?.charAt(0) || 'U'}
                </div>
                <div>
                   <h3 className="text-sm font-black text-slate-900 dark:text-white leading-none">{profile?.displayName || 'User'}</h3>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Free Plan</p>
                </div>
             </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200",
                  activeSection === item.id 
                    ? "bg-primary/10 text-primary shadow-sm" 
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <item.icon size={18} className={cn(activeSection === item.id ? "text-primary" : "text-slate-400")} />
                {item.label}
                {activeSection === item.id && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Right Content Area */}
      <div className="flex-grow space-y-12">
        
        {/* ACCOUNT SECTION */}
        <section ref={el => sectionsRef.current['account'] = el} className="space-y-8 scroll-mt-24">
          <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <User size={20} />
             </div>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Account Settings</h2>
          </div>

          <Card className="p-8 rounded-[40px] border-slate-100 dark:border-slate-800">
             <Formik
               initialValues={{
                 displayName: profile?.displayName || 'Dhruv Ozha',
                 username: profile?.username || 'dhruvozha',
                 bio: profile?.bio || 'Aspiring Full Stack Developer passionate about clean code and immersive UI.',
                 email: profile?.email || 'dhruv@example.com',
                 college: profile?.college || 'Gujarat Technological University',
                 city: profile?.city || 'Ahmedabad',
                 github: profile?.github || 'https://github.com/dhruvozha',
                 linkedin: profile?.linkedin || 'https://linkedin.com/in/dhruvozha'
               }}
               validationSchema={ProfileSchema}
               onSubmit={handleProfileUpdate}
               enableReinitialize
             >
               {({ errors, touched, isSubmitting }) => (
                 <Form className="space-y-8">
                    <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-slate-50 dark:border-slate-800">
                       <div className="relative group">
                          <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl">
                             <img src={profile?.avatar || "https://i.pravatar.cc/150?u=dhruv"} alt="Avatar" className="w-full h-full object-cover" />
                          </div>
                          <button type="button" className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                             <Camera size={14} />
                          </button>
                       </div>
                       <div className="text-center md:text-left">
                          <h4 className="text-lg font-black text-slate-900 dark:text-white">Profile Photo</h4>
                          <p className="text-xs font-bold text-slate-400 mt-1">JPG, GIF or PNG. Max size of 800K</p>
                          <div className="flex gap-2 mt-4">
                             <Button size="sm" variant="outline" className="text-[10px] uppercase font-black tracking-widest h-8 px-4">Upload New</Button>
                             <Button size="sm" variant="ghost" className="text-[10px] uppercase font-black tracking-widest h-8 px-4 text-error">Remove</Button>
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Display Name</label>
                          <Field name="displayName" as={Input} placeholder="Your Name" />
                          {errors.displayName && touched.displayName && <div className="text-error text-[10px] font-bold ml-2">{errors.displayName}</div>}
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Username</label>
                          <div className="relative">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                             <Field name="username" as={Input} placeholder="username" className="pl-8" />
                          </div>
                          {errors.username && touched.username && <div className="text-error text-[10px] font-bold ml-2">{errors.username}</div>}
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Bio</label>
                       <Field name="bio" as="textarea" placeholder="Tell us about yourself..." className="w-full h-24 bg-slate-50 dark:bg-slate-900/50 border-transparent rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none" />
                       <div className="flex justify-end pr-2 text-[9px] font-bold text-slate-400">{(profile?.bio?.length || 0)} / 200</div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                       <div className="flex gap-4">
                          <Field name="email" as={Input} placeholder="email@example.com" disabled className="flex-grow opacity-60" />
                          <Badge variant="success" className="h-11 flex items-center px-4 rounded-xl gap-2 text-[10px] uppercase font-black tracking-widest">
                             <Check size={12} /> Verified
                          </Badge>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">GitHub Profile</label>
                          <div className="relative">
                             <Github size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                             <Field name="github" as={Input} className="pl-11" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">LinkedIn Profile</label>
                          <div className="relative">
                             <Linkedin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                             <Field name="linkedin" as={Input} className="pl-11" />
                          </div>
                       </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t border-slate-50 dark:border-slate-800">
                       <Button type="button" variant="ghost" className="px-8 font-black uppercase text-xs tracking-widest">Cancel</Button>
                       <Button type="submit" variant="primary" loading={isSubmitting} className="px-10 font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">Save Changes</Button>
                    </div>
                 </Form>
               )}
             </Formik>
          </Card>

          {/* Change Password Card */}
          <Card className="p-8 rounded-[40px] border-slate-100 dark:border-slate-800 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-8 text-slate-50 dark:text-slate-900 -mr-4 -mt-4">
                <Lock size={80} />
             </div>
             <div className="relative z-10">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Current Password</label>
                      <Input type="password" placeholder="••••••••" icon={Lock} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">New Password</label>
                      <Input type="password" placeholder="••••••••" icon={Lock} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Confirm New</label>
                      <Input type="password" placeholder="••••••••" icon={Lock} />
                   </div>
                </div>
                <div className="mt-8">
                   <Button variant="outline" className="px-8 font-black uppercase text-[10px] tracking-widest h-11">Update Password</Button>
                </div>
             </div>
          </Card>

          {/* Danger Zone */}
          <div className="p-8 bg-error/5 dark:bg-error/10 rounded-[40px] border-2 border-dashed border-error/20">
             <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                   <h3 className="text-xl font-black text-error uppercase tracking-tight mb-2">Danger Zone</h3>
                   <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Deleting your account is permanent and cannot be undone. All your progress will be lost.</p>
                </div>
                <Button 
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-error text-white hover:bg-red-600 px-8 font-black uppercase text-xs tracking-widest h-12 shadow-xl shadow-error/20"
                >
                  <Trash2 size={16} className="mr-2" /> Delete Account
                </Button>
             </div>
          </div>
        </section>

        {/* LANGUAGE SECTION */}
        <section ref={el => sectionsRef.current['language'] = el} className="space-y-8 scroll-mt-24 pt-8">
          <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Globe size={20} />
             </div>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Language Settings</h2>
          </div>

          <Card className="p-8 rounded-[40px] border-slate-100 dark:border-slate-800">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                   <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 px-2">Learning Language</h4>
                   <div className="space-y-3">
                      {[
                        { id: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
                        { id: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
                        { id: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' }
                      ].map((lang) => (
                        <button 
                          key={lang.id}
                          onClick={() => handlePreferenceChange('language', lang.id)}
                          className={cn(
                            "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300",
                            preferences?.language === lang.id ? "border-primary bg-primary/5" : "border-slate-50 dark:border-slate-900 hover:border-slate-200"
                          )}
                        >
                           <div className="flex items-center gap-4">
                              <span className="text-2xl">{lang.flag}</span>
                              <div className="text-left">
                                 <div className="text-sm font-black text-slate-900 dark:text-white">{lang.native}</div>
                                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lang.name}</div>
                              </div>
                           </div>
                           {preferences?.language === lang.id && <Check size={18} className="text-primary" />}
                        </button>
                      ))}
                   </div>
                   <Button variant="primary" className="w-full mt-8 py-4 uppercase font-black text-xs tracking-widest shadow-xl shadow-primary/20">Save Language</Button>
                </div>

                <div className="space-y-8">
                   <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 px-2">Interface Language</h4>
                      <div className="p-1 bg-slate-50 dark:bg-slate-900 rounded-2xl flex gap-1">
                         {['en', 'hi', 'gu'].map(l => (
                           <button 
                            key={l} 
                            onClick={() => dispatch(setLanguage(l))}
                            className={cn("flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", currentLanguage === l ? "bg-white dark:bg-slate-800 text-primary shadow-sm" : "text-slate-400 hover:text-slate-600")}
                           >
                              {l === 'en' ? 'English' : l === 'hi' ? 'Hindi' : 'Guj'}
                           </button>
                         ))}
                      </div>
                      <p className="mt-4 text-[10px] font-bold text-slate-400 italic px-2">* This changes the dashboard and menus to your preferred language.</p>
                   </div>
                </div>
             </div>
          </Card>
        </section>

        {/* NOTIFICATIONS SECTION */}
        <section ref={el => sectionsRef.current['notifications'] = el} className="space-y-8 scroll-mt-24 pt-8">
          <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Bell size={20} />
             </div>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Notifications</h2>
          </div>

          <Card className="p-0 rounded-[40px] border-slate-100 dark:border-slate-800 overflow-hidden">
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-slate-50 dark:bg-slate-900">
                      <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Notification Type</th>
                      <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Email</th>
                      <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Browser</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
                   {[
                     { id: 'courses', label: 'Course Updates', sub: 'New lessons and materials' },
                     { id: 'labs', label: 'New Labs Available', sub: 'Interactive coding environments' },
                     { id: 'achievements', label: 'Achievement Unlocked', sub: 'Badges and certificates' },
                     { id: 'leaderboard', label: 'Leaderboard Changes', sub: 'Weekly rank updates' },
                     { id: 'messages', label: 'Instructor Messages', sub: 'Direct feedback and tips' },
                     { id: 'announcements', label: 'Platform Announcements', sub: 'Major updates and news' },
                     { id: 'reports', label: 'Weekly Progress Report', sub: 'Summary of your learning' },
                   ].map((row) => (
                     <tr key={row.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                        <td className="py-5 px-8">
                           <div className="text-sm font-black text-slate-900 dark:text-white">{row.label}</div>
                           <div className="text-[10px] font-bold text-slate-400 mt-0.5">{row.sub}</div>
                        </td>
                        <td className="py-5 px-4 text-center">
                           <Switch 
                            checked={preferences?.notifications?.[row.id]?.email ?? true} 
                            onChange={(e) => handleNotificationToggle(row.id, 'email', e.target.checked)}
                            size="small" 
                            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#F97316' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#F97316' } }} 
                           />
                        </td>
                        <td className="py-5 px-4 text-center">
                           <Switch 
                            checked={preferences?.notifications?.[row.id]?.browser ?? true} 
                            onChange={(e) => handleNotificationToggle(row.id, 'browser', e.target.checked)}
                            size="small" 
                            sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#F97316' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#F97316' } }} 
                           />
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
             <div className="p-8 flex justify-end bg-slate-50/30 dark:bg-slate-900/20">
                <Button variant="outline" className="px-8 font-black uppercase text-[10px] tracking-widest h-11">Save Preferences</Button>
             </div>
          </Card>
        </section>

        {/* PRIVACY SECTION */}
        <section ref={el => sectionsRef.current['privacy'] = el} className="space-y-8 scroll-mt-24 pt-8">
          <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Shield size={20} />
             </div>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Privacy & Data</h2>
          </div>

          <Card className="p-8 rounded-[40px] border-slate-100 dark:border-slate-800 space-y-8">
             <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Visibility</h4>
                <div className="space-y-2">
                   {[
                     { id: 'showLeaderboard', label: 'Show profile on leaderboard', default: true },
                     { id: 'showProgress', label: 'Show my progress to instructors', default: true },
                     { id: 'publicProfile', label: 'Allow others to view my profile', default: true },
                     { id: 'showCollege', label: 'Show college/university on profile', default: false },
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                        <Switch 
                          checked={preferences?.privacy?.[item.id] ?? item.default} 
                          onChange={(e) => {
                            const updatedPrivacy = { ...preferences.privacy, [item.id]: e.target.checked };
                            handlePreferenceChange('privacy', updatedPrivacy);
                          }}
                          size="small" 
                          sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#0D9488' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#0D9488' } }} 
                        />
                     </div>
                   ))}
                </div>
             </div>

             <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 px-2 mb-6">Data Export</h4>
                <div className="flex flex-col md:flex-row gap-4">
                   <div className="flex-grow p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                            <Monitor size={20} />
                         </div>
                         <div>
                            <div className="text-sm font-black text-slate-900 dark:text-white">Download Your Data</div>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 leading-relaxed">Get a JSON file containing all your learning history, projects, and profile data.</p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => toast.promise(new Promise(res => setTimeout(res, 2000)), { loading: 'Preparing data...', success: 'Data ready for download!', error: 'Export failed' })}
                              className="mt-4 text-[9px] uppercase font-black tracking-[0.2em] h-8 px-6"
                            >
                              Request Download
                            </Button>
                         </div>
                      </div>
                   </div>
                   <div className="flex-grow p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-start gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                            <Trash2 size={20} />
                         </div>
                         <div>
                            <div className="text-sm font-black text-slate-900 dark:text-white">Clear History</div>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 leading-relaxed">Permanently delete your course progress history. This cannot be undone.</p>
                            <Button size="sm" variant="ghost" className="mt-4 text-[9px] uppercase font-black tracking-[0.2em] h-8 px-6 text-error">Clear History</Button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </Card>
        </section>

        {/* BILLING SECTION */}
        <section ref={el => sectionsRef.current['billing'] = el} className="space-y-8 scroll-mt-24 pt-8">
          <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <CreditCard size={20} />
             </div>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Billing & Subscription</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card className="p-8 md:col-span-2 rounded-[40px] border-primary/20 bg-gradient-to-br from-white to-orange-50 dark:from-slate-950 dark:to-orange-950/10 flex flex-col justify-between">
                <div>
                   <Badge variant="primary" className="mb-4 text-[10px] uppercase font-black tracking-widest px-4 py-1">Active Plan</Badge>
                   <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Pro Scholar <span className="text-lg text-primary">₹349/mo</span></h3>
                   <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 max-w-sm">Next billing date: <span className="text-slate-900 dark:text-white">May 24, 2026</span> via Visa ending in 4242.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                   <Button variant="primary" className="px-8 font-black uppercase text-xs tracking-widest h-12">Manage Subscription</Button>
                   <Button variant="outline" className="px-8 font-black uppercase text-xs tracking-widest h-12">Change Plan</Button>
                </div>
             </Card>

             <Card className="p-8 rounded-[40px] border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Payment Methods</h4>
                <div className="space-y-4 mb-8">
                   <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-black italic">VISA</div>
                         <div className="text-xs font-black text-slate-900 dark:text-white">•••• 4242</div>
                      </div>
                      <Badge variant="secondary" className="text-[8px] uppercase tracking-tighter">Default</Badge>
                   </div>
                </div>
                <Button variant="ghost" className="w-full text-[10px] uppercase font-black tracking-widest border border-dashed border-slate-200 dark:border-slate-800 h-12 rounded-2xl">
                   + Add Payment Method
                </Button>
             </Card>
          </div>

          <Card className="p-0 rounded-[40px] border-slate-100 dark:border-slate-800 overflow-hidden">
             <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Invoice History</h4>
                <Button size="sm" variant="ghost" className="text-[10px] uppercase font-black tracking-widest">Download All</Button>
             </div>
             <table className="w-full text-left">
                <thead>
                   <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                      <th className="py-4 px-8 text-[9px] font-black uppercase tracking-widest text-slate-400">Date</th>
                      <th className="py-4 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Plan</th>
                      <th className="py-4 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                      <th className="py-4 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Status</th>
                      <th className="py-4 px-8 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
                   {[
                     { date: 'Apr 24, 2026', plan: 'Pro Scholar (Annual)', amount: '₹4,188', status: 'Paid' },
                     { date: 'Mar 24, 2026', plan: 'Pro Scholar (Monthly)', amount: '₹499', status: 'Paid' },
                     { date: 'Feb 24, 2026', plan: 'Pro Scholar (Monthly)', amount: '₹499', status: 'Paid' },
                   ].map((inv, i) => (
                     <tr key={i} className="hover:bg-slate-50/30 dark:hover:bg-slate-900/20 transition-colors">
                        <td className="py-4 px-8 text-xs font-bold text-slate-700 dark:text-slate-300">{inv.date}</td>
                        <td className="py-4 px-4 text-xs font-black text-slate-900 dark:text-white">{inv.plan}</td>
                        <td className="py-4 px-4 text-xs font-bold text-slate-700 dark:text-slate-300">{inv.amount}</td>
                        <td className="py-4 px-4"><Badge variant="success" className="text-[8px] font-black">PAID</Badge></td>
                        <td className="py-4 px-8 text-right"><button className="text-[10px] font-black text-primary hover:underline">Download PDF</button></td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </Card>
        </section>

        {/* ACCESSIBILITY SECTION */}
        <section ref={el => sectionsRef.current['accessibility'] = el} className="space-y-8 scroll-mt-24 pt-8">
          <div className="flex items-center gap-4 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <Accessibility size={20} />
             </div>
             <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Accessibility & Theme</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <Card className="p-8 rounded-[40px] border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 px-2">Interface Theme</h4>
                <div className="grid grid-cols-3 gap-3">
                   {[
                     { id: 'light', label: 'Light', icon: Sun },
                     { id: 'dark', label: 'Dark', icon: Moon },
                     { id: 'system', label: 'System', icon: Monitor },
                   ].map((t) => (
                     <button 
                       key={t.id}
                       onClick={() => dispatch(setTheme(t.id))}
                       className={cn(
                         "flex flex-col items-center gap-4 p-5 rounded-3xl border-2 transition-all duration-300",
                         theme === t.id ? "border-primary bg-primary/5" : "border-slate-50 dark:border-slate-900"
                       )}
                     >
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors", theme === t.id ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400")}>
                           <t.icon size={24} />
                        </div>
                        <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === t.id ? "text-primary" : "text-slate-400")}>{t.label}</span>
                     </button>
                   ))}
                </div>
             </Card>

             <Card className="p-8 rounded-[40px] border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 px-2">Font Size</h4>
                <div className="px-6 py-4">
                   <Slider 
                     value={fontSize} 
                     onChange={(e, val) => dispatch(setFontSize(val))}
                     step={1} 
                     marks={[
                       { value: 1, label: 'Small' },
                       { value: 2, label: 'Normal' },
                       { value: 3, label: 'Large' },
                       { value: 4, label: 'XL' },
                     ]}
                     min={1} 
                     max={4}
                     sx={{ color: '#F97316' }}
                   />
                </div>
                <p className="mt-8 text-[10px] font-bold text-slate-400 italic text-center px-4">Adjust the platform's text size for better readability.</p>
             </Card>
          </div>

          <Card className="p-8 rounded-[40px] border-slate-100 dark:border-slate-800">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex items-center justify-between">
                   <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">Reduced Motion</h4>
                      <p className="text-[10px] font-bold text-slate-400">Disable animations and transitions for a faster, simpler feel.</p>
                   </div>
                   <Switch 
                    checked={reducedMotion}
                    onChange={(e) => dispatch(setReducedMotion(e.target.checked))}
                    size="small" 
                    sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#F97316' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#F97316' } }} 
                   />
                </div>
                <div className="flex items-center justify-between">
                   <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">High Contrast</h4>
                      <p className="text-[10px] font-bold text-slate-400">Increase color contrast ratios for easier legibility.</p>
                   </div>
                   <Switch 
                    checked={highContrast}
                    onChange={(e) => dispatch(setHighContrast(e.target.checked))}
                    size="small" 
                    sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#F97316' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#F97316' } }} 
                   />
                </div>
             </div>
          </Card>
        </section>

      </div>

      {/* Delete Account Modal */}
      <Modal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
        title="Delete Your Account?"
      >
        <div className="p-2 space-y-6">
           <div className="p-4 bg-error/5 rounded-2xl border border-error/10 text-center">
              <p className="text-sm font-bold text-error leading-relaxed">
                 Warning: This action is permanent. All your course progress, earned badges, and project submissions will be permanently deleted from GyaanSetu.
              </p>
           </div>
           
           <div className="space-y-4">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 text-center">
                 To confirm, please type <span className="text-slate-900 dark:text-white font-black">DELETE</span> below:
              </p>
              <Input 
                placeholder="Type DELETE" 
                className="text-center font-black uppercase tracking-widest border-error/30 focus:ring-error/20"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value.toUpperCase())}
              />
           </div>

           <div className="flex gap-3 pt-4">
              <Button variant="ghost" onClick={() => setShowDeleteModal(false)} className="flex-1 font-black uppercase text-xs tracking-widest">Keep My Account</Button>
              <Button 
                disabled={deleteConfirmText !== 'DELETE'}
                onClick={handleDeleteAccount}
                className={cn(
                  "flex-1 font-black uppercase text-xs tracking-widest h-12 shadow-xl",
                  deleteConfirmText === 'DELETE' ? "bg-error text-white shadow-error/20" : "bg-slate-100 text-slate-300"
                )}
              >
                Delete Forever
              </Button>
           </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
