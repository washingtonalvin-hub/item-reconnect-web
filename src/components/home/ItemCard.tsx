import React from 'react';
import { FoundItem } from '@/types';
import { MapPin, Calendar, Tag, ChevronRight, Gift } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface ItemCardProps {
  item: FoundItem;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Card className="group overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none">
            {item.category}
          </Badge>
          {item.rewardOffered && (
            <Badge className="bg-yellow-500/90 text-yellow-950 border-none flex items-center gap-1">
              <Gift className="h-3 w-3" />
              Reward
            </Badge>
          )}
        </div>
        {item.status === 'returned' && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
            <Badge variant="outline" className="text-lg py-1 px-4 border-2 border-primary text-primary font-bold bg-background">
              RETURNED
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="p-4 space-y-1">
        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1">{item.location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="flex items-center text-xs text-muted-foreground gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>Found on {format(new Date(item.dateFound), 'MMM dd, yyyy')}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 border-t bg-muted/20">
        <Link to={`/item/${item.id}`} className="w-full">
          <Button variant="ghost" className="w-full justify-between hover:bg-primary/10 hover:text-primary group/btn">
            View Details
            <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};