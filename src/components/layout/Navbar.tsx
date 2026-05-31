import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, Home, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Search className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">FOUND IT</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Browse
            </Link>
            <Link to="/report">
              <Button size="sm" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Report Found Item
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden border-b bg-background p-4 space-y-4 animate-in slide-in-from-top duration-300">
          <Link 
            to="/" 
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
            onClick={() => setIsOpen(false)}
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Browse Items</span>
          </Link>
          <Link 
            to="/report" 
            onClick={() => setIsOpen(false)}
          >
            <Button className="w-full gap-2 justify-start">
              <PlusCircle className="h-5 w-5" />
              Report Found Item
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};