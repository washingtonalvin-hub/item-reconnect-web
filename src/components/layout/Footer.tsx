import React from 'react';
import { Heart, Mail, Github, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">FOUND IT</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Connecting finders and owners to bring lost items back home. Simple, secure, and rewarding.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Safety Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community Rules</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-muted-foreground">
          <p>© 2024 FOUND IT. All rights reserved.</p>
          <p className="flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500 fill-red-500" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
};

import { Button } from '@/components/ui/button';