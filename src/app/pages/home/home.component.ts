import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetDataService } from '../../services/pet-data.service';
import { ThemeService } from '../../services/theme.service';
import { PetProfile } from '../../models/pet.model';
import { ParticleBgComponent } from '../../components/particle-bg/particle-bg.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ParticleBgComponent],
  template: `
    <app-particle-bg color1="#FFB87A" color2="#FFD4A8" />

    <div class="home-container">
      <!-- Header / Welcome Module -->
      <header class="home-header">
        <div class="header-decor-top">
          <span class="pixel-star">❃</span>
          <span class="pixel-star">❃</span>
          <span class="pixel-star">❃</span>
        </div>
        <div class="logo-section">
          <h1 class="site-title">赛博墓碑🪦</h1>
          <p class="site-subtitle">Pixel Memorial</p>
        </div>
        <p class="site-desc">在虚拟世界里，每一个小小的生命都值得被温柔地记住</p>
        <div class="header-decor-bottom">
          <div class="decor-dash"></div>
          <span class="decor-heart">♥</span>
          <div class="decor-dash"></div>
        </div>
      </header>

      <!-- Hero Banner (像素风) -->
      <div class="hero-banner">
        <div class="hero-frame">
          <img src="images/hero-banner-pixel.png" alt="赛博墓碑" class="hero-image pixel-art" />
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <p class="hero-text"></p>
            <p class="hero-subtext">Every life deserves to be remembered</p>
          </div>
        </div>
      </div>

      <!-- Pet Cards Section -->
      <section class="pets-section">
        <div class="section-header">
          <span class="section-icon">🐾</span>
          <h2 class="section-heading">我的小伙伴</h2>
          <div class="section-line"></div>
        </div>

        <div class="pets-grid">
          @for (pet of pets; track pet.id; let i = $index) {
            <div class="pet-card" [style.animation-delay]="(i * 0.2) + 's'" (click)="navigateToPet(pet)">
              <div class="card-gradient-bg"
                [style.background]="'linear-gradient(135deg, ' + getThemeColor(pet).c1 + '15, ' + getThemeColor(pet).c2 + '20)'">
              </div>
              <div class="card-content">
                <div class="card-avatar-wrapper">
                  <div class="avatar-frame"
                    [style.border-color]="getThemeColor(pet).c1">
                    <img [src]="pet.pixelAvatar" [alt]="pet.name" class="card-avatar pixel-art" />
                  </div>
                  <img [src]="'images/pets/' + pet.id + '/pixel/sprite.png'" alt="pixel sprite" class="pixel-sprite-frame" />
                  <div class="card-theme-badge"
                    [style.background]="'linear-gradient(135deg, ' + getThemeColor(pet).c1 + ', ' + getThemeColor(pet).c2 + ')'">
                    {{ getThemeEmoji(pet) }}
                  </div>
                </div>
                <h3 class="card-name">{{ pet.name }}</h3>
                <p class="card-breed">{{ pet.species }} · {{ pet.breed }}</p>
                <div class="card-date-badge"
                  [style.background]="'linear-gradient(90deg, ' + getThemeColor(pet).c1 + '18, ' + getThemeColor(pet).c2 + '18)'">
                  <span class="date-icon">🌟</span>
                  <span class="date-text">{{ pet.birthDate }} — {{ pet.deathDate }}</span>
                </div>
                <p class="card-bio">{{ pet.bio.substring(0, 60) }}...</p>
                <div class="card-tags">
                  @for (trait of pet.personality.slice(0, 3); track trait) {
                    <span class="card-tag"
                      [style.border-color]="getThemeColor(pet).c1 + '40'"
                      [style.color]="getThemeColor(pet).c1">
                      {{ trait }}
                    </span>
                  }
                </div>
                <div class="card-enter"
                  [style.background]="'linear-gradient(135deg, ' + getThemeColor(pet).c1 + ', ' + getThemeColor(pet).c2 + ')'">
                  <span>去看看 TA</span>
                  <span class="arrow">→</span>
                </div>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Footer -->
      <footer class="home-footer">
        <div class="footer-decor">
          <span class="pixel-flower">❀</span>
          <span class="pixel-flower">❀</span>
          <span class="pixel-flower">❀</span>
        </div>
        <p class="footer-text">赛博墓碑🪦 — 用温暖的像素铭记爱与陪伴</p>
        <p class="footer-copy">© 2026 - present Sora</p>
      </footer>
    </div>
  `,
  styles: [`
    .pixel-art {
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }

    .home-container {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      padding: 0 var(--space-8);
      max-width: 1100px;
      margin: 0 auto;
    }

    /* Header */
    .home-header {
      text-align: center;
      padding: var(--space-16) 0 var(--space-8);
      animation: slideDown 0.8s ease-out;
    }

    .header-decor-top {
      display: flex;
      justify-content: center;
      gap: var(--space-4);
      margin-bottom: var(--space-4);
    }

    .pixel-star {
      color: var(--theme-color-1);
      font-size: var(--text-lg);
      animation: bounce-soft 2s ease-in-out infinite;
    }
    .pixel-star:nth-child(2) {
      animation-delay: 0.3s;
      color: var(--theme-color-2);
    }
    .pixel-star:nth-child(3) {
      animation-delay: 0.6s;
    }

    .logo-section {
      position: relative;
      display: inline-block;
      margin-bottom: var(--space-4);
    }

    .site-title {
      font-family: var(--font-display);
      font-size: var(--text-5xl);
      font-weight: 400;
      background: var(--theme-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
      letter-spacing: 0.05em;
    }

    .site-subtitle {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      letter-spacing: 0.3em;
      text-transform: uppercase;
      margin-top: var(--space-1);
      font-family: var(--font-body);
    }

    .site-desc {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      font-family: var(--font-display);
      margin-bottom: var(--space-4);
    }

    .header-decor-bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-4);
    }

    .decor-dash {
      width: 60px;
      height: 3px;
      background: var(--theme-gradient);
      border-radius: 3px;
    }

    .decor-heart {
      color: var(--theme-color-1);
      font-size: var(--text-lg);
      animation: breathe 2s ease-in-out infinite;
    }

    /* Hero Banner */
    .hero-banner {
      margin-bottom: var(--space-12);
      animation: slideUp 0.8s ease-out;
    }

    .hero-frame {
      position: relative;
      border-radius: var(--radius-2xl);
      overflow: hidden;
      border: 4px solid var(--border-medium);
      box-shadow: var(--shadow-pixel), var(--shadow-md);
      background: var(--bg-card);
    }

    .hero-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      display: block;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        transparent 40%,
        rgba(255, 248, 240, 0.5) 70%,
        rgba(255, 248, 240, 0.9) 100%
      );
    }

    .hero-content {
      position: absolute;
      bottom: var(--space-6);
      left: var(--space-8);
    }

    .hero-text {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 400;
      color: var(--text-primary);
      margin-bottom: var(--space-1);
      text-shadow: 0 2px 8px rgba(255, 248, 240, 0.8);
    }

    .hero-subtext {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      letter-spacing: 0.1em;
    }

    /* Pets Section */
    .pets-section {
      padding-bottom: var(--space-16);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-10);
      padding: var(--space-4) var(--space-6);
      background: var(--bg-card);
      border-radius: var(--radius-2xl);
      border: 2px solid var(--border-subtle);
      box-shadow: var(--shadow-sm);
    }

    .section-icon {
      font-size: var(--text-2xl);
    }

    .section-heading {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      color: var(--text-primary);
      font-weight: 400;
    }

    .section-line {
      flex: 1;
      height: 2px;
      background: var(--theme-gradient);
      border-radius: 2px;
      opacity: 0.4;
    }

    .pets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: var(--space-8);
    }

    .pet-card {
      position: relative;
      background: var(--bg-card);
      border: 3px solid var(--border-subtle);
      border-radius: var(--radius-2xl);
      overflow: hidden;
      cursor: pointer;
      transition: var(--transition-smooth);
      animation: slideUp 0.6s ease-out both;
      box-shadow: var(--shadow-pixel), var(--shadow-sm);
      backdrop-filter: var(--glass-blur);
    }

    .pet-card:hover {
      transform: translateY(-6px);
      border-color: var(--theme-color-1);
      box-shadow: var(--shadow-pixel), var(--shadow-glow-sm), var(--shadow-md);
    }

    .card-gradient-bg {
      position: absolute;
      inset: 0;
      opacity: 1;
      transition: var(--transition-smooth);
    }

    .card-content {
      position: relative;
      padding: var(--space-8);
      text-align: center;
    }

    .card-avatar-wrapper {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto var(--space-6);
    }

    .avatar-frame {
      width: 100%;
      height: 100%;
      border-radius: var(--radius-2xl);
      border: 4px solid var(--theme-color-1);
      overflow: hidden;
      box-shadow: var(--shadow-pixel);
      background: var(--bg-elevated);
    }

    .card-avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .pixel-sprite-frame {
      position: absolute;
      top: -27px;
      right: -12px;
      width: 58px;
      height: 58px;
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
      z-index: 10;
      pointer-events: none;
      filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.15));
    }

    .card-theme-badge {
      position: absolute;
      bottom: -6px;
      right: -6px;
      width: 32px;
      height: 32px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      border: 3px solid var(--bg-card);
      box-shadow: var(--shadow-sm);
      z-index: 5;
    }

    .card-name {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      color: var(--text-primary);
      margin-bottom: var(--space-1);
    }

    .card-breed {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      margin-bottom: var(--space-3);
    }

    .card-date-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-1) var(--space-4);
      border-radius: var(--radius-full);
      margin-bottom: var(--space-4);
    }

    .date-icon { font-size: var(--text-sm); }

    .date-text {
      font-size: var(--text-xs);
      color: var(--text-secondary);
      font-family: var(--font-body);
    }

    .card-bio {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: var(--space-4);
    }

    .card-tags {
      display: flex;
      justify-content: center;
      gap: var(--space-2);
      flex-wrap: wrap;
      margin-bottom: var(--space-6);
    }

    .card-tag {
      font-size: var(--text-xs);
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-full);
      border: 1.5px solid;
      background: rgba(255, 255, 255, 0.5);
      font-family: var(--font-body);
    }

    .card-enter {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-sm);
      color: white;
      padding: var(--space-2) var(--space-6);
      border-radius: var(--radius-full);
      font-family: var(--font-display);
      transition: var(--transition-smooth);
      box-shadow: var(--shadow-sm);
    }

    .pet-card:hover .card-enter {
      box-shadow: var(--shadow-glow-sm);
    }

    .arrow {
      transition: var(--transition-smooth);
    }

    .pet-card:hover .arrow {
      transform: translateX(4px);
    }

    /* Footer */
    .home-footer {
      text-align: center;
      padding: var(--space-12) 0 var(--space-8);
    }

    .footer-decor {
      display: flex;
      justify-content: center;
      gap: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .pixel-flower {
      color: var(--theme-color-1);
      font-size: var(--text-lg);
      animation: breathe 2.5s ease-in-out infinite;
    }
    .pixel-flower:nth-child(2) {
      animation-delay: 0.4s;
      color: var(--theme-color-2);
    }
    .pixel-flower:nth-child(3) {
      animation-delay: 0.8s;
    }

    .footer-text {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      margin-bottom: var(--space-2);
      font-family: var(--font-display);
    }

    .footer-copy {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      opacity: 0.6;
    }

    /* ---- Mobile Responsive ---- */
    @media (max-width: 768px) {
      .home-container {
        padding: 0 var(--space-4);
      }

      .site-title {
        font-size: var(--text-3xl);
      }

      .site-desc {
        font-size: var(--text-base);
      }

      .hero-image {
        height: 200px;
      }

      .hero-text {
        font-size: var(--text-xl);
      }

      .hero-content {
        left: var(--space-4);
        bottom: var(--space-4);
      }

      .pets-grid {
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      .section-header {
        padding: var(--space-3) var(--space-4);
      }

      .section-heading {
        font-size: var(--text-lg);
      }
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes bounce-soft {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    @keyframes breathe {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
  `]
})
export class HomeComponent implements OnInit {
  private petDataService = inject(PetDataService);
  private themeService = inject(ThemeService);
  private router = inject(Router);

  pets: PetProfile[] = [];

  ngOnInit(): void {
    this.pets = this.petDataService.getAllPets();
    this.themeService.setTheme('warm-sunset');
  }

  navigateToPet(pet: PetProfile): void {
    this.router.navigate(['/memorial', pet.id]);
  }

  getThemeColor(pet: PetProfile): { c1: string; c2: string; bg: string } {
    const theme = this.themeService.getTheme(pet.theme);
    return {
      c1: theme?.color1 || '#FF6B35',
      c2: theme?.color2 || '#FFD700',
      bg: '#FFF3E6'
    };
  }

  getGradient(pet: PetProfile): string {
    const t = this.getThemeColor(pet);
    return `linear-gradient(135deg, ${t.c1}, ${t.c2})`;
  }

  getThemeEmoji(pet: PetProfile): string {
    const theme = this.themeService.getTheme(pet.theme);
    return theme?.icon || '✨';
  }
}
