export type Category = 'ID Card' | 'Wallet' | 'Personal Item' | 'Other';

export interface FoundItem {
  id: string;
  image: string;
  title: string;
  category: Category;
  location: string;
  dateFound: string;
  description: string;
  finderName: string;
  finderContact: string;
  status: 'available' | 'returned';
  rewardOffered: boolean;
  createdAt: string;
}