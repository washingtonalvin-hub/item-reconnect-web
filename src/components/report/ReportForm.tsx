import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItems } from '@/hooks/use-items';
import { Category, FoundItem } from '@/types';
import { motion } from 'framer-motion';
import { Camera, MapPin, Calendar, Info, User, Phone, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export const ReportForm = () => {
  const navigate = useNavigate();
  const { addItem } = useItems();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '' as Category,
    location: '',
    dateFound: new Date().toISOString().split('T')[0],
    description: '',
    finderName: '',
    finderContact: '',
    rewardOffered: false
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      toast.error('Please upload a clear picture of the item');
      return;
    }

    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    const newItem: FoundItem = {
      id: Math.random().toString(36).substr(2, 9),
      image,
      title: formData.title,
      category: formData.category,
      location: formData.location,
      dateFound: formData.dateFound,
      description: formData.description,
      finderName: formData.finderName,
      finderContact: formData.finderContact,
      status: 'available',
      rewardOffered: formData.rewardOffered,
      createdAt: new Date().toISOString(),
    };

    addItem(newItem);
    toast.success('Found item reported successfully!', {
      description: 'Owners can now find and reach out to you.',
    });
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Report a Found Item</h1>
          <p className="text-muted-foreground leading-relaxed">
            Snap a clear picture and share the details. Help someone find their way home.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Item Photo
              </CardTitle>
              <CardDescription>
                Make sure the item is clearly visible and in focus.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={`relative aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden ${image ? 'border-primary/50' : 'hover:bg-muted/50 border-muted-foreground/25'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {image ? (
                  <>
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="text-center space-y-2 p-6">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Click to upload or snap photo</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  capture="environment"
                  onChange={handleImageChange} 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Item Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">What did you find?</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Blue Nike Backpack" 
                    required 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(val) => setFormData({...formData, category: val as Category})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ID Card">ID Card</SelectItem>
                      <SelectItem value="Wallet">Wallet</SelectItem>
                      <SelectItem value="Personal Item">Personal Item</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    Where was it found?
                  </Label>
                  <Input 
                    id="location" 
                    placeholder="e.g. Near Starbuck on 5th Ave" 
                    required 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    When was it found?
                  </Label>
                  <Input 
                    id="date" 
                    type="date" 
                    required 
                    value={formData.dateFound}
                    onChange={e => setFormData({...formData, dateFound: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Details (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe any distinguishing marks or specific details that might help the owner identify it."
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                <div className="space-y-0.5">
                  <Label className="text-base">Reward Offered?</Label>
                  <p className="text-sm text-muted-foreground">Check this if the owner should offer a reward (optional)</p>
                </div>
                <Switch 
                  checked={formData.rewardOffered}
                  onCheckedChange={(val) => setFormData({...formData, rewardOffered: val})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Your Contact Information
              </CardTitle>
              <CardDescription>
                This will be shared with the owner so they can reach out to you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                    value={formData.finderName}
                    onChange={e => setFormData({...formData, finderName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Phone or Email</Label>
                  <Input 
                    id="contact" 
                    placeholder="john@example.com" 
                    required 
                    value={formData.finderContact}
                    onChange={e => setFormData({...formData, finderContact: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Submit Report
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};