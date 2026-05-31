import React, { useState } from 'react';
import { FoundItem, Category } from '@/types';
import { ItemCard } from './ItemCard';
import { Input } from '@/components/ui/input';
import { Search, Filter, Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ItemGridProps {
  items: FoundItem[];
}

const CATEGORIES: (Category | 'All')[] = ['All', 'ID Card', 'Wallet', 'Personal Item', 'Other'];

export const ItemGrid = ({ items }: ItemGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="items-grid" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Browse Found Items</h2>
              <p className="text-muted-foreground">Recent reports from our community</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search location or item..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="All" className="w-full" onValueChange={(val) => setActiveCategory(val as Category | 'All')}>
            <TabsList className="bg-muted/50 p-1 w-full sm:w-auto overflow-x-auto justify-start">
              {CATEGORIES.map(cat => (
                <TabsTrigger key={cat} value={cat} className="flex-1 sm:flex-none">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed rounded-3xl bg-background">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">No items found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};