import { Injectable, signal } from '@angular/core';
import { ThemeId, ThemeTemplate } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly themes: ThemeTemplate[] = [
    {
      id: 'warm-sunset',
      name: '暖阳落日',
      nameEn: 'Warm Sunset',
      color1: '#FF6B35',
      color2: '#FFD700',
      icon: '🌅'
    },
    {
      id: 'cyber-night',
      name: '赛博暮夜',
      nameEn: 'Cyber Night',
      color1: '#00D4FF',
      color2: '#7B2FBE',
      icon: '🌌'
    },
    {
      id: 'gentle-love',
      name: '温柔挚爱',
      nameEn: 'Gentle Love',
      color1: '#FF4D6D',
      color2: '#FFB3C1',
      icon: '🌸'
    },
    {
      id: 'eternal-garden',
      name: '永恒花园',
      nameEn: 'Eternal Garden',
      color1: '#2ECC71',
      color2: '#00BFA5',
      icon: '🌿'
    },
    {
      id: 'deep-ocean',
      name: '深海星辰',
      nameEn: 'Deep Ocean',
      color1: '#4361EE',
      color2: '#3A0CA3',
      icon: '🌊'
    }
  ];

  currentTheme = signal<ThemeId>('cyber-night');

  setTheme(themeId: ThemeId): void {
    this.currentTheme.set(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  }

  getTheme(themeId: ThemeId): ThemeTemplate | undefined {
    return this.themes.find(t => t.id === themeId);
  }
}
