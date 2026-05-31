import { useState, useEffect } from 'react';
import { FoundItem } from '../types';

const STORAGE_KEY = 'found_it_items';

const MOCK_ITEMS: FoundItem[] = [
  {
    id: '1',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d97afebb-3fd1-4ce6-906c-de4123f158bf/lost-wallet-example-83ad0cd8-1780241820711.webp',
    title: 'Brown Leather Wallet',
    category: 'Wallet',
    location: 'Central Park near the fountain',
    dateFound: '2024-05-20',
    description: 'Found a brown leather wallet with some cash and a subway card inside. No ID found.',
    finderName: 'John Doe',
    finderContact: 'john.doe@example.com',
    status: 'available',
    rewardOffered: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d97afebb-3fd1-4ce6-906c-de4123f158bf/lost-id-example-8ebd6062-1780241820561.webp',
    title: 'Student ID Card',
    category: 'ID Card',
    location: 'University Library Entrance',
    dateFound: '2024-05-21',
    description: 'Found a student ID card for Sarah Miller. Left it at the front desk or contact me.',
    finderName: 'Alice Smith',
    finderContact: 'alice.s@example.com',
    status: 'available',
    rewardOffered: true,
    createdAt: new Date().toISOString(),
  }
];

export function useItems() {
  const [items, setItems] = useState<FoundItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        setItems(MOCK_ITEMS);
      }
    } else {
      setItems(MOCK_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_ITEMS));
    }
  }, []);

  const addItem = (item: FoundItem) => {
    const updated = [item, ...items];
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const updateItemStatus = (id: string, status: 'available' | 'returned') => {
    const updated = items.map(item => item.id === id ? { ...item, status } : item);
    setItems(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { items, addItem, updateItemStatus };
}