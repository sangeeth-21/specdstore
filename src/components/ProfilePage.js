import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X,
  UserCircle,
  ShoppingBag,
  Calendar,
  LogOut
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : null;
const DEMO_MODE = !BACKEND_URL;

const ProfilePage = () => {
  const { user, loginUser, logoutUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userForm, setUserForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleFormChange = (field, value) => {
    setUserForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateProfile = async () => {
    if (!userForm.name.trim() || !userForm.email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    try {
      setLoading(true);
      
      if (DEMO_MODE) {
        // Demo mode - create mock user
        console.log('Demo mode: Creating mock user profile');
        const mockUser = {
          id: 'demo_user_' + Math.random().toString(36).substr(2, 9),
          name: userForm.name,
          email: userForm.email,
          phone: userForm.phone,
          address: userForm.address,
          created_at: new Date().toISOString()
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        loginUser(mockUser);
        toast.success('Profile created successfully!');
        setIsEditing(false);
        return;
      }
      
      const response = await axios.post(`${API}/users`, userForm);
      loginUser(response.data);
      toast.success('Profile created successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error('Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!userForm.name.trim() || !userForm.email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    try {
      setLoading(true);
      // In a real app, you'd have an update endpoint
      // For now, we'll just update the local user data
      const updatedUser = { ...user, ...userForm };
      loginUser(updatedUser);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setUserForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logoutUser();
      toast.success('Signed out successfully');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to SpecD Store</h1>
            <p className="text-muted-foreground">Create your profile to get started</p>
          </div>

          <Card className="ios-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="w-6 h-6" />
                Create Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={userForm.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={userForm.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="h-12"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={userForm.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={userForm.address}
                  onChange={(e) => handleFormChange('address', e.target.value)}
                  placeholder="Enter your address (optional)"
                  className="min-h-[100px] resize-none"
                />
              </div>

              <Button
                onClick={handleCreateProfile}
                disabled={loading}
                size="lg"
                className="w-full gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <User className="w-5 h-5" />
                )}
                {loading ? 'Creating Profile...' : 'Create Profile'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="space-y-6">
            <Card className="ios-card">
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {user.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {user.email}
                </p>
                <Badge variant="secondary" className="gap-1">
                  <Calendar className="w-3 h-3" />
                  Member since {new Date(user.created_at).toLocaleDateString()}
                </Badge>
              </CardContent>
            </Card>

            <Card className="ios-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total Orders</span>
                  </div>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Account Status</span>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="ios-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="gap-2"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="profile-name"
                        type="text"
                        value={userForm.name}
                        onChange={(e) => handleFormChange('name', e.target.value)}
                        className="h-12"
                      />
                    ) : (
                      <div className="h-12 px-3 py-2 border border-border rounded-lg bg-muted flex items-center">
                        {user.name}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profile-phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="profile-phone"
                        type="tel"
                        value={userForm.phone}
                        onChange={(e) => handleFormChange('phone', e.target.value)}
                        className="h-12"
                      />
                    ) : (
                      <div className="h-12 px-3 py-2 border border-border rounded-lg bg-muted flex items-center">
                        {user.phone || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="profile-email"
                      type="email"
                      value={userForm.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      className="h-12"
                    />
                  ) : (
                    <div className="h-12 px-3 py-2 border border-border rounded-lg bg-muted flex items-center">
                      {user.email}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile-address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="profile-address"
                      value={userForm.address}
                      onChange={(e) => handleFormChange('address', e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  ) : (
                    <div className="min-h-[100px] px-3 py-2 border border-border rounded-lg bg-muted">
                      {user.address || 'No address provided'}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card className="ios-card">
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium text-foreground">Sign Out</h4>
                      <p className="text-sm text-muted-foreground">
                        Sign out of your account on this device
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;