export type Language = 'en' | 'st'; // 'st' for Sesotho

export interface MenuItem {
  id: string;
  name: string;
  nameSesotho?: string;
  description: string;
  descriptionSesotho?: string;
  price: number; // in LSL (Maloti M)
  category: 'breakfast' | 'mains' | 'coffee' | 'drinks' | 'desserts';
  isChefSpecial?: boolean;
  isPopular?: boolean;
  vegetarian?: boolean;
  imageUrl: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  relativeTime: string;
  comment: string;
  commentSesotho?: string;
  verified?: boolean;
  avatarText: string;
}

export interface ReservationFormData {
  fullName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'indoor' | 'terrace' | 'garden' | 'bar';
  specialRequests?: string;
}

export interface CafeInfo {
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  area: string;
  city: string;
  country: string;
  phone: string;
  phoneFormatted: string;
  whatsappLink: string;
  hoursDisplay: string;
  closingTime: string;
  mapsUrl: string;
}
