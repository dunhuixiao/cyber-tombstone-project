import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetDataService } from '../../services/pet-data.service';
import { ThemeService } from '../../services/theme.service';
import { PetProfile } from '../../models/pet.model';
import { ParticleBgComponent } from '../../components/particle-bg/particle-bg.component';
import { PetProfileComponent } from '../../components/pet-profile/pet-profile.component';
import { PhotoGalleryComponent } from '../../components/photo-gallery/photo-gallery.component';
import { VideoSectionComponent } from '../../components/video-section/video-section.component';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';
import { ThemeSelectorComponent } from '../../components/theme-selector/theme-selector.component';

@Component({
  selector: 'app-memorial',
  standalone: true,
  imports: [
    ParticleBgComponent,
    PetProfileComponent,
    PhotoGalleryComponent,
    VideoSectionComponent,
    MusicPlayerComponent,
    ThemeSelectorComponent,
  ],
  template: `
    @if (pet) {
      <app-particle-bg [color1]="themeColor1" [color2]="themeColor2" />
      <app-theme-selector />
      <app-music-player />

      <div class="memorial-container">
        <!-- Back Button -->
        <button class="back-btn" (click)="goBack()">
          <span class="back-arrow">←</span>
          <span>返回纪念馆</span>
        </button>

        <!-- Memorial Header Decoration -->
        <div class="memorial-header-deco">
          <div class="deco-line"></div>
          <div class="deco-star">✦</div>
          <div class="deco-line"></div>
        </div>

        <!-- Pet Profile -->
        <app-pet-profile [pet]="pet" />

        <!-- Divider -->
        <div class="section-divider">
          <div class="divider-line"></div>
          <div class="divider-icon">✿</div>
          <div class="divider-line"></div>
        </div>

        <!-- Photo Gallery -->
        <app-photo-gallery [photos]="pet.photos" />

        <!-- Divider -->
        <div class="section-divider">
          <div class="divider-line"></div>
          <div class="divider-icon">❋</div>
          <div class="divider-line"></div>
        </div>

        <!-- Video Section -->
        <app-video-section [videos]="pet.videos" />

        <!-- Memorial Footer -->
        <footer class="memorial-footer">
          <div class="footer-decoration">
            <div class="footer-star">★</div>
          </div>
          <p class="footer-epitaph">永远被爱，永远被记住</p>
          <p class="footer-epitaph-en">Forever loved, forever remembered</p>
          <div class="footer-dates">
            {{ pet.birthDate }} — {{ pet.deathDate }}
          </div>
        </footer>
      </div>
    } @else {
      <div class="not-found">
        <p>未找到该宠物的纪念档案</p>
        <button class="back-btn" (click)="goBack()">
          <span class="back-arrow">←</span>
          <span>返回首页</span>
        </button>
      </div>
    }
  `,
  styles: [`
    .memorial-container {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
      padding: 0 var(--space-8) var(--space-16);
      min-height: 100vh;
    }

    .back-btn {
      position: fixed;
      top: var(--space-8);
      left: var(--space-8);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-4);
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      font-size: var(--text-sm);
      font-family: var(--font-body);
      cursor: pointer;
      transition: var(--transition-smooth);
    }

    .back-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-primary);
      box-shadow: var(--shadow-glow-sm);
    }

    .back-arrow {
      font-size: var(--text-lg);
      transition: var(--transition-smooth);
    }

    .back-btn:hover .back-arrow {
      transform: translateX(-3px);
    }

    /* Header Decoration */
    .memorial-header-deco {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
      padding-top: var(--space-12);
    }

    .deco-line {
      width: 80px;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border-medium), transparent);
    }

    .deco-star {
      color: var(--theme-color-1);
      font-size: var(--text-xl);
      animation: breathe 3s ease-in-out infinite;
    }

    /* Section Divider */
    .section-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-6);
      padding: var(--space-4) 0;
    }

    .divider-line {
      width: 100px;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border-subtle), transparent);
    }

    .divider-icon {
      color: var(--theme-color-1);
      font-size: var(--text-lg);
      opacity: 0.5;
    }

    /* Footer */
    .memorial-footer {
      text-align: center;
      padding: var(--space-20) 0 var(--space-8);
    }

    .footer-decoration {
      margin-bottom: var(--space-6);
    }

    .footer-star {
      font-size: var(--text-3xl);
      color: var(--theme-color-1);
      animation: float 3s ease-in-out infinite;
    }

    .footer-epitaph {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }

    .footer-epitaph-en {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      letter-spacing: 0.1em;
      margin-bottom: var(--space-6);
    }

    .footer-dates {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      font-family: var(--font-display);
    }

    /* Not Found */
    .not-found {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: var(--space-6);
      color: var(--text-secondary);
      font-size: var(--text-xl);
    }

    @keyframes breathe {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
  `]
})
export class MemorialComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private petDataService = inject(PetDataService);
  private themeService = inject(ThemeService);

  pet: PetProfile | null = null;
  themeColor1 = '#00D4FF';
  themeColor2 = '#7B2FBE';

  ngOnInit(): void {
    const petId = this.route.snapshot.paramMap.get('id');
    if (petId) {
      const pet = this.petDataService.getPetById(petId);
      if (pet) {
        this.pet = pet;
        this.themeService.setTheme(pet.theme);
        const theme = this.themeService.getTheme(pet.theme);
        if (theme) {
          this.themeColor1 = theme.color1;
          this.themeColor2 = theme.color2;
        }
      }
    }
  }

  ngOnDestroy(): void {
    // Reset theme when leaving
    this.themeService.setTheme('cyber-night');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
