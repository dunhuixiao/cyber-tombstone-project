import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
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
import { PixelPetRunnerComponent } from '../../components/pixel-pet-runner/pixel-pet-runner.component';

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
    PixelPetRunnerComponent,
  ],
  template: `
    @if (pet) {
      <app-particle-bg [color1]="themeColor1" [color2]="themeColor2" />

      <!-- Top-right toolbar: share + theme selector -->
      <div class="top-right-toolbar">
        <button class="toolbar-btn share-btn" (click)="shareLink()" [attr.aria-label]="shareText()">
          <span class="toolbar-btn-icon">{{ shareText() === '分享' ? '🔗' : '✓' }}</span>
        </button>
        <app-theme-selector />
      </div>

      <app-music-player [musicSrc]="pet.backgroundMusic || ''" />

      <!-- Pixel Pet Runner (fixed, outside flow) -->
      @if (pet.pixelRunning) {
        <app-pixel-pet-runner [runningUrl]="pet.pixelRunning" />
      }

      <div class="memorial-container">
        <!-- Top Back Button -->
        <div class="action-bar">
          <button class="action-btn back-btn" (click)="goBack()">
            <span class="back-arrow">←</span>
            <span>返回首页</span>
          </button>
        </div>

        <!-- Memorial Header Decoration -->
        <div class="memorial-header-deco">
          <span class="deco-flower">❀</span>
          <div class="deco-line"></div>
          <span class="deco-flower">🪦</span>
          <div class="deco-line"></div>
          <span class="deco-flower">❀</span>
        </div>

        <!-- Mobile Swipe Container -->
        <div class="mobile-cards-container">
          <!-- Pet Profile Card -->
          <div class="mobile-card">
            <app-pet-profile [pet]="pet" />
          </div>

          <!-- Photo Gallery (only if has photos) -->
          @if (pet.photos && pet.photos.length > 0) {
            <div class="section-divider">
              <div class="divider-line"></div>
              <div class="divider-icon">✿</div>
              <div class="divider-line"></div>
            </div>
            <div class="mobile-card">
              <app-photo-gallery [photos]="pet.photos" />
            </div>
          }

          <!-- Video Section (only if has videos) -->
          @if (pet.videos && pet.videos.length > 0) {
            <div class="section-divider">
              <div class="divider-line"></div>
              <div class="divider-icon">♫</div>
              <div class="divider-line"></div>
            </div>
            <div class="mobile-card">
              <app-video-section [videos]="pet.videos" />
            </div>
          }
        </div>

        <!-- Memorial Footer -->
        <footer class="memorial-footer">
          <div class="footer-decoration">
            <span class="footer-star">🌟</span>
          </div>
          <p class="footer-epitaph">永远被爱，永远被记住</p>
          <p class="footer-epitaph-en">Forever loved, forever remembered</p>
          <div class="footer-dates-badge">
            <span>🌸</span>
            {{ pet.birthDate }} — {{ pet.deathDate }}
            <span>🌸</span>
          </div>
        </footer>
      </div>
    } @else {
      <div class="not-found">
        <p>未找到该宠物的纪念档案</p>
        <button class="back-btn-inline" (click)="goBack()">
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

    /* Action Bar (fixed top-left only) */
    .action-bar {
      position: fixed;
      top: var(--space-4);
      left: var(--space-4);
      z-index: 1000;
      pointer-events: none;
    }

    .action-btn {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-4);
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      font-size: var(--text-sm);
      font-family: var(--font-display);
      cursor: pointer;
      transition: var(--transition-smooth);
      box-shadow: var(--shadow-sm);
    }

    .action-btn:hover {
      background: var(--bg-card);
      color: var(--theme-text);
      border-color: var(--theme-color-1);
      box-shadow: var(--shadow-glow-sm);
    }

    .back-arrow {
      font-size: var(--text-lg);
      transition: var(--transition-smooth);
    }

    .action-btn:hover .back-arrow {
      transform: translateX(-3px);
    }

    /* Top-right toolbar: share + theme selector side by side */
    .top-right-toolbar {
      position: fixed;
      top: var(--space-8);
      right: var(--space-8);
      z-index: 1000;
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      flex-direction: row-reverse;
    }

    .toolbar-btn {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-xl);
      border: 2px solid var(--border-subtle);
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
      box-shadow: var(--shadow-sm);
      flex-shrink: 0;
    }

    .toolbar-btn:hover {
      background: var(--theme-gradient-soft);
      border-color: var(--theme-color-1);
      box-shadow: var(--shadow-glow-sm);
    }

    .toolbar-btn:active {
      transform: scale(0.95);
    }

    .toolbar-btn-icon {
      font-size: 14px;
    }

    /* Header Decoration */
    .memorial-header-deco {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
      padding-top: var(--space-16);
    }

    .deco-line {
      width: 60px;
      height: 3px;
      background: var(--theme-gradient);
      border-radius: 3px;
      opacity: 0.4;
    }

    .deco-flower {
      color: var(--theme-color-1);
      font-size: var(--text-xl);
      animation: bounce-soft 2.5s ease-in-out infinite;
    }
    .deco-flower:nth-child(3) {
      animation-delay: 0.3s;
    }
    .deco-flower:nth-child(5) {
      animation-delay: 0.6s;
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
      width: 80px;
      height: 2px;
      background: var(--theme-gradient);
      border-radius: 2px;
      opacity: 0.3;
    }

    .divider-icon {
      color: var(--theme-color-1);
      font-size: var(--text-lg);
      opacity: 0.7;
      animation: breathe 3s ease-in-out infinite;
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
      animation: float 3s ease-in-out infinite;
    }

    .footer-epitaph {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }

    .footer-epitaph-en {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      letter-spacing: 0.1em;
      margin-bottom: var(--space-6);
    }

    .footer-dates-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      font-size: var(--text-sm);
      color: var(--text-secondary);
      font-family: var(--font-display);
      padding: var(--space-2) var(--space-6);
      background: var(--theme-gradient-soft);
      border-radius: var(--radius-full);
      border: 1.5px solid var(--border-subtle);
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
      font-family: var(--font-display);
    }

    .back-btn-inline {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-4);
      background: var(--bg-card);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      font-size: var(--text-sm);
      font-family: var(--font-display);
      cursor: pointer;
      transition: var(--transition-smooth);
    }

    /* ---- Mobile Responsive ---- */
    @media (max-width: 768px) {
      .memorial-container {
        padding: 0 var(--space-4) var(--space-12);
      }

      .action-bar {
        top: var(--space-2);
        left: var(--space-2);
      }

      .action-btn {
        padding: var(--space-1) var(--space-3);
        font-size: var(--text-xs);
      }

      .top-right-toolbar {
        top: var(--space-2);
        right: var(--space-2);
      }

      .toolbar-btn {
        width: 36px;
        height: 36px;
      }

      .toolbar-btn-icon {
        font-size: 12px;
      }

      .memorial-header-deco {
        padding-top: var(--space-12);
      }

      .mobile-card {
        background: var(--bg-card);
        border-radius: var(--radius-2xl);
        border: 2px solid var(--border-subtle);
        padding: var(--space-4);
        margin-bottom: var(--space-4);
        box-shadow: var(--shadow-pixel), var(--shadow-sm);
      }

      .section-divider {
        padding: var(--space-2) 0;
      }

      .footer-epitaph {
        font-size: var(--text-xl);
      }

      .memorial-footer {
        padding: var(--space-12) 0 var(--space-6);
      }
    }

    @keyframes breathe {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    @keyframes bounce-soft {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
  `]
})
export class MemorialComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private petDataService = inject(PetDataService);
  private themeService = inject(ThemeService);

  pet: PetProfile | null = null;
  themeColor1 = '#FF6B35';
  themeColor2 = '#FFD700';

  shareText = signal('分享');

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
    this.themeService.setTheme('warm-sunset');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  async shareLink(): Promise<void> {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      this.shareText.set('已复制 ✓');
      setTimeout(() => this.shareText.set('分享'), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.shareText.set('已复制 ✓');
      setTimeout(() => this.shareText.set('分享'), 2000);
    }
  }
}
