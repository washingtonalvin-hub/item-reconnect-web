import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left space-y-8"
          >
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Secure & Trusted Lost & Found
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
              Every item deserves to <br />
              <span className="text-primary">find its way home.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto lg:mx-0 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Found an ID card, wallet, or personal item? Simply snap a clear picture and share it on FOUND IT. 
              The rightful owner can trace it back to you and reach out directly for safe handover.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link to="/report">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-lg px-8 py-6 h-auto">
                  <Camera className="h-5 w-5" />
                  Report a Found Item
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-lg px-8 py-6 h-auto" onClick={() => document.getElementById('items-grid')?.scrollIntoView({ behavior: 'smooth' })}>
                Browse Found Items
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Items Returned</div>
              </div>
              <div className="border-l h-8" />
              <div className="text-center">
                <div className="text-2xl font-bold">1.2k</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Active Users</div>
              </div>
              <div className="border-l h-8" />
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Secure Handover</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/d97afebb-3fd1-4ce6-906c-de4123f158bf/hero-found-it-b65709bf-1780241820427.webp" 
                alt="Community helping each other" 
                className="w-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            {/* Floating UI element */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-xl border border-border hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-bold">Identity Verified</div>
                  <div className="text-xs text-muted-foreground">Safe Handover Process</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 blur-3xl opacity-20 pointer-events-none">
        <div className="aspect-square h-[600px] rounded-full bg-primary" />
      </div>
    </div>
  );
};