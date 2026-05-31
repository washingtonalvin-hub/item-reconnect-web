import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useItems } from '@/hooks/use-items';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Tag, User, MessageCircle, ShieldCheck, ArrowLeft, Send, CheckCircle2, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, updateItemStatus } = useItems();
  const [isClaiming, setIsClaiming] = useState(false);
  const [message, setMessage] = useState('');

  const item = items.find(i => i.id === id);

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Item not found</h2>
        <Button onClick={() => navigate('/')}>Back to Browse</Button>
      </div>
    );
  }

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please include a message to the finder.');
      return;
    }
    
    toast.success('Message sent to the finder!', {
      description: 'The finder will be notified of your request.',
    });
    setIsClaiming(false);
    setMessage('');
  };

  const handleMarkReturned = () => {
    updateItemStatus(item.id, 'returned');
    toast.success('Item marked as returned!', {
      description: 'Thank you for helping this item find its home.',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <Button 
        variant="ghost" 
        className="mb-6 gap-2" 
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Browse
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
            {item.status === 'returned' && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                <Badge variant="outline" className="text-3xl py-3 px-8 border-4 border-primary text-primary font-bold bg-background shadow-2xl">
                  RETURNED
                </Badge>
              </div>
            )}
          </div>
          
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h3 className="font-bold flex items-center gap-2 mb-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Safe Handover Tips
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
              <li>Meet in a public, well-lit place during daylight hours.</li>
              <li>Bring a friend with you if possible.</li>
              <li>Verify the item belongs to the person claiming it (ask for specific details).</li>
              <li>Report any suspicious behavior to the authorities.</li>
            </ul>
          </div>
        </motion.div>

        {/* Right Column: Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">{item.category}</Badge>
              {item.rewardOffered && (
                <Badge className="bg-yellow-500/90 text-yellow-950 border-none flex items-center gap-1">
                  <Gift className="h-3 w-3" />
                  Reward Offered
                </Badge>
              )}
              {item.status === 'available' && (
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Available</Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight">{item.title}</h1>
            
            <div className="flex flex-wrap gap-y-4 gap-x-8 pt-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">{item.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Found on {format(new Date(item.dateFound), 'MMMM dd, yyyy')}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.description || "The finder didn't provide any additional details, but you can reach out to them for more information."}
            </p>
          </div>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Reported by {item.finderName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isClaiming ? (
                <form onSubmit={handleClaim} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Message to Finder</Label>
                    <Textarea 
                      id="message"
                      placeholder="e.g. Hi! I think this is my wallet. I lost it near the fountain yesterday..."
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="min-h-[120px] bg-background"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setIsClaiming(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {item.status === 'available' ? (
                    <>
                      <p className="text-sm text-muted-foreground">
                        If you believe this item belongs to you, reach out to {item.finderName} to arrange a safe handover.
                      </p>
                      <div className="flex gap-3">
                        <Button className="flex-1 gap-2" onClick={() => setIsClaiming(true)}>
                          <MessageCircle className="h-4 w-4" />
                          This is Mine
                        </Button>
                        <Button variant="outline" className="flex-1 gap-2" onClick={handleMarkReturned}>
                          <CheckCircle2 className="h-4 w-4" />
                          Mark as Returned
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center py-4 space-y-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                      <p className="font-medium">Item successfully returned to its owner!</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};