export interface PetPhoto {
  id: string;
  url: string;
  caption?: string;
  annotation?: string;
  annotationPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface PetVideo {
  id: string;
  url: string;
  poster?: string;
  title: string;
  description?: string;
  annotation?: string;
  annotationPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export type ThemeId = 'warm-sunset' | 'cyber-night' | 'gentle-love' | 'eternal-garden' | 'deep-ocean';

export interface ThemeTemplate {
  id: ThemeId;
  name: string;
  nameEn: string;
  color1: string;
  color2: string;
  icon: string;
}

export interface PetProfile {
  id: string;
  name: string;
  species: string;
  breed: string;
  gender: '男' | '女';
  birthDate: string;
  deathDate: string;
  avatar: string;
  photos: PetPhoto[];
  videos: PetVideo[];
  bio: string;
  personality: string[];
  favoriteThings: string[];
  ownerMessage: string;
  theme: ThemeId;
  backgroundMusic?: string;
}
