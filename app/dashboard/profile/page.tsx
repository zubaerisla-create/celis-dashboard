// app/dashboard/settings/profile/page.tsx
'use client';

import { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Save,
  Eye,
  EyeOff,
  Check,
  X,
  Shield,
  Bell,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Key,
  Upload,
  Loader2
} from 'lucide-react';
import Image from 'next/image';

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'password' >('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form states
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: '@johndoe',
    bio: 'Music producer & songwriter with 5+ years of experience. Passionate about creating unique sounds and collaborating with talented artists.',
    location: 'Los Angeles, CA',
    website: 'https://johndoe.com',
    profileImage: 'https://i.pravatar.cc/300?u=john',
    role: 'Admin',
    memberSince: 'Jan 2024',
    lastActive: '2 hours ago'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });



  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (passwordErrors[name as keyof typeof passwordErrors]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload this to your server
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePassword = () => {
    let isValid = true;
    const errors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
      isValid = false;
    }

    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
      isValid = false;
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setPasswordErrors(errors);
    return isValid;
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handlePasswordSave = () => {
    if (validatePassword()) {
      handleSave();
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'password', label: 'Password & Security', icon: Lock },
  ];

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const index = Math.floor(strength / 25);
    
    return { strength, label: labels[index] };
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-black mb-2">
            <span className="bg-gradient-to-r from-[#E54FA9] to-[#831CDF] bg-clip-text text-transparent">
              Profile Settings
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sticky top-24">
              <div className="text-center">
                {/* Profile Image */}
                <div 
                  className="relative w-32 h-32 mx-auto mb-4 group cursor-pointer"
                  onMouseEnter={() => setImageHover(true)}
                  onMouseLeave={() => setImageHover(false)}
                  onClick={handleImageClick}
                >
                  <Image
                    src={profileData.profileImage}
                    alt={profileData.name}
                    width={128}
                    height={128}
                    className="rounded-2xl border-4 border-gray-800 group-hover:border-[#E54FA9] transition-all duration-300"
                  />
                  
                  {/* Overlay on hover */}
                  {imageHover && (
                    <div className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center transition-all duration-300">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  )}
                  
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <h2 className="text-xl font-bold text-white mb-1">{profileData.name}</h2>
                <p className="text-sm text-gray-400 mb-2">{profileData.role}</p>
                
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                  <span>Member since {profileData.memberSince}</span>
                  <span>•</span>
                  <span>Last active {profileData.lastActive}</span>
                </div>

           
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
              <div className="flex border-b border-gray-800">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[#E54FA9]/20 to-[#831CDF]/20 text-white border-b-2 border-[#E54FA9]'
                          : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-6">
                {/* Success Message */}
                {saveSuccess && (
                  <div className="mb-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Changes saved successfully!</h3>
                      <p className="text-sm text-gray-400">Your profile has been updated.</p>
                    </div>
                  </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all"
                        />
                      </div>

                      {/* Username */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={profileData.username}
                          onChange={handleProfileChange}
                          className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all"
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleProfileChange}
                          className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all"
                        />
                      </div>

                      {/* Website */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={profileData.website}
                          onChange={handleProfileChange}
                          className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all"
                        />
                      </div>

                      {/* Bio */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={profileData.bio}
                          onChange={handleProfileChange}
                          rows={4}
                          className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#E54FA9] focus:ring-1 focus:ring-[#E54FA9] transition-all resize-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {profileData.bio.length}/200 characters
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Password Tab */}
                {activeTab === 'password' && (
                  <div className="space-y-6">
                    <div className="max-w-md mx-auto space-y-5">
                      {/* Current Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className={`w-full bg-gray-950 border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${
                              passwordErrors.currentPassword
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-800 focus:border-[#E54FA9] focus:ring-[#E54FA9]'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                          >
                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {passwordErrors.currentPassword && (
                          <p className="text-xs text-red-500 mt-1">{passwordErrors.currentPassword}</p>
                        )}
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className={`w-full bg-gray-950 border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${
                              passwordErrors.newPassword
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-800 focus:border-[#E54FA9] focus:ring-[#E54FA9]'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                          >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {passwordErrors.newPassword && (
                          <p className="text-xs text-red-500 mt-1">{passwordErrors.newPassword}</p>
                        )}
                        
                        {/* Password Strength Meter */}
                        {passwordData.newPassword && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">Password strength</span>
                              <span className={`text-xs font-medium ${
                                passwordStrength.strength >= 75 ? 'text-green-500' :
                                passwordStrength.strength >= 50 ? 'text-yellow-500' :
                                'text-red-500'
                              }`}>
                                {passwordStrength.label}
                              </span>
                            </div>
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#E54FA9] to-[#831CDF] transition-all duration-300"
                                style={{ width: `${passwordStrength.strength}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className={`w-full bg-gray-950 border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all ${
                              passwordErrors.confirmPassword
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-800 focus:border-[#E54FA9] focus:ring-[#E54FA9]'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        {passwordErrors.confirmPassword && (
                          <p className="text-xs text-red-500 mt-1">{passwordErrors.confirmPassword}</p>
                        )}
                      </div>

                      {/* Password Requirements */}
                      <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mt-4">
                        <h4 className="text-sm font-medium text-white mb-3">Password Requirements:</h4>
                        <ul className="space-y-2 text-xs">
                          <li className="flex items-center gap-2 text-gray-400">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              passwordData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-600'
                            }`} />
                            At least 8 characters
                          </li>
                          <li className="flex items-center gap-2 text-gray-400">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              /[A-Z]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-600'
                            }`} />
                            At least one uppercase letter
                          </li>
                          <li className="flex items-center gap-2 text-gray-400">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              /[0-9]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-600'
                            }`} />
                            At least one number
                          </li>
                          <li className="flex items-center gap-2 text-gray-400">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              /[^A-Za-z0-9]/.test(passwordData.newPassword) ? 'bg-green-500' : 'bg-gray-600'
                            }`} />
                            At least one special character
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

             

                {/* Save Button */}
                <div className="flex justify-end pt-6 border-t border-gray-800 mt-6">
                  <button
                    onClick={activeTab === 'password' ? handlePasswordSave : handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E54FA9] to-[#831CDF] hover:from-[#D63F99] hover:to-[#730CCF] text-white font-medium rounded-lg transition-all shadow-lg shadow-[#831CDF]/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}