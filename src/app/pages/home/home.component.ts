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
    <app-particle-bg color1="#00D4FF" color2="#7B2FBE" />

    <div class="home-container">
      <!-- Header -->
      <header class="home-header">
        <div class="logo-section">
          <div class="logo-glow"></div>
          <h1 class="site-title">赛博纪念馆</h1>
          <p class="site-subtitle">Cyber Memorial Hall</p>
        </div>
        <p class="site-desc">在数字星空中，为挚爱的伙伴点亮一颗永恒的星</p>
      </header>

      <!-- Hero Banner -->
      <div class="hero-banner">
        <img src="images/hero-banner.png" alt="赛博纪念馆" class="hero-image" />
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <p class="hero-text">每一个生命都值得被铭记</p>
          <p class="hero-subtext">Every life deserves to be remembered</p>
        </div>
      </div>

      <!-- Pet Cards -->
      <section class="pets-section">
        <h2 class="section-heading">
          <span class="heading-line"></span>
          <span class="heading-text">纪念碑</span>
          <span class="heading-line"></span>
        </h2>

        <div class="pets-grid">
          @for (pet of pets; track pet.id; let i = $index) {
            <div class="pet-card" [style.animation-delay]="(i * 0.2) + 's'" (click)="navigateToPet(pet)">
              <div class="card-glow"
                [style.background]="getGradient(pet)">
              </div>
              <div class="card-content">
                <div class="card-avatar-wrapper">
                  <img [src]="pet.avatar" [alt]="pet.name" class="card-avatar" />
                  <div class="card-avatar-ring"
                    [style.background-image]="'linear-gradient(' + getThemeColor(pet).bg + ', ' + getThemeColor(pet).bg + '), linear-gradient(135deg, ' + getThemeColor(pet).c1 + ', ' + getThemeColor(pet).c2 + ')'">
                  </div>
                </div>
                <h3 class="card-name">{{ pet.name }}</h3>
                <p class="card-breed">{{ pet.species }} · {{ pet.breed }}</p>
                <p class="card-dates">{{ pet.birthDate }} — {{ pet.deathDate }}</p>
                <div class="card-divider"
                  [style.background]="'linear-gradient(90deg, transparent, ' + getThemeColor(pet).c1 + ', transparent)'">
                </div>
                <p class="card-bio">{{ pet.bio.substring(0, 60) }}...</p>
                <div class="card-enter">
                  <span>进入纪念馆</span>
                  <span class="arrow">→</span>
                </div>
              </div>
              <div class="card-theme-badge"
                [style.background]="'linear-gradient(135deg, ' + getThemeColor(pet).c1 + ', ' + getThemeColor(pet).c2 + ')'">
                {{ getThemeEmoji(pet) }}
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Footer -->
      <footer class="home-footer">
        <div class="footer-divider"></div>
        <p class="footer-text">赛博纪念馆 — 用科技铭记爱与陪伴</p>
        <p class="footer-copy">Cyber Memorial Hall © 2025</p>
      </footer>
    </div>
  `,
  styles: [`
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

    .logo-section {
      position: relative;
      display: inline-block;
      margin-bottom: var(--space-4);
    }

    .logo-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 60px;
      background: var(--theme-gradient);
      filter: blur(40px);
      opacity: 0.3;
    }

    .site-title {
      font-family: var(--font-display);
      font-size: var(--text-5xl);
      font-weight: 700;
      background: var(--theme-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      position: relative;
    }

    .site-subtitle {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      letter-spacing: 0.3em;
      text-transform: uppercase;
      margin-top: var(--space-1);
    }

    .site-desc {
      font-size: var(--text-lg);
      color: var(--text-secondary);
      font-family: var(--font-display);
    }

    /* Hero Banner */
    .hero-banner {
      position: relative;
      border-radius: var(--radius-2xl);
      overflow: hidden;
      margin-bottom: var(--space-16);
      animation: slideUp 0.8s ease-out;
      border: 1px solid var(--border-subtle);
    }

    .hero-image {
      width: 100%;
      height: 340px;
      object-fit: cover;
      display: block;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        transparent 30%,
        rgba(10, 10, 15, 0.7) 70%,
        rgba(10, 10, 15, 0.95) 100%
      );
    }

    .hero-content {
      position: absolute;
      bottom: var(--space-8);
      left: var(--space-8);
    }

    .hero-text {
      font-family: var(--font-display);
      font-size: var(--text-3xl);
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }

    .hero-subtext {
      font-size: var(--text-base);
      color: var(--text-tertiary);
      letter-spacing: 0.1em;
    }

    /* Pets Section */
    .pets-section {
      padding-bottom: var(--space-16);
    }

    .section-heading {
      display: flex;
      align-items: center;
      gap: var(--space-6);
      margin-bottom: var(--space-12);
      justify-content: center;
    }

    .heading-line {
      width: 60px;
      height: 1px;
      background: var(--border-medium);
    }

    .heading-text {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      color: var(--text-secondary);
      font-weight: 400;
      letter-spacing: 0.2em;
    }

    .pets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: var(--space-8);
    }

    .pet-card {
      position: relative;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-2xl);
      overflow: hidden;
      cursor: pointer;
      transition: var(--transition-smooth);
      animation: slideUp 0.6s ease-out both;
    }

    .pet-card:hover {
      transform: translateY(-6px);
      border-color: var(--border-medium);
    }

    .card-glow {
      position: absolute;
      top: -50%;
      left: -20%;
      width: 140%;
      height: 100%;
      opacity: 0;
      filter: blur(60px);
      transition: var(--transition-smooth);
    }

    .pet-card:hover .card-glow {
      opacity: 0.12;
    }

    .card-content {
      position: relative;
      padding: var(--space-8);
      text-align: center;
    }

    .card-avatar-wrapper {
      position: relative;
      width: 100px;
      height: 100px;
      margin: 0 auto var(--space-6);
    }

    .card-avatar {
      width: 100%;
      height: 100%;
      border-radius: var(--radius-full);
      object-fit: cover;
      position: relative;
      z-index: 2;
    }

    .card-avatar-ring {
      position: absolute;
      inset: -4px;
      border-radius: var(--radius-full);
      border: 2px solid transparent;
      background-origin: border-box;
      background-clip: padding-box, border-box;
      z-index: 1;
    }

    .card-name {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }

    .card-breed {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      margin-bottom: var(--space-1);
    }

    .card-dates {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      font-family: var(--font-display);
    }

    .card-divider {
      width: 60%;
      height: 1px;
      margin: var(--space-4) auto;
    }

    .card-bio {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: var(--space-6);
    }

    .card-enter {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      transition: var(--transition-smooth);
    }

    .pet-card:hover .card-enter {
      color: var(--theme-color-1);
    }

    .arrow {
      transition: var(--transition-smooth);
    }

    .pet-card:hover .arrow {
      transform: translateX(4px);
    }

    .card-theme-badge {
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      width: 32px;
      height: 32px;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }

    /* Footer */
    .home-footer {
      text-align: center;
      padding: var(--space-12) 0 var(--space-8);
    }

    .footer-divider {
      width: 60px;
      height: 1px;
      background: var(--border-subtle);
      margin: 0 auto var(--space-6);
    }

    .footer-text {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      margin-bottom: var(--space-2);
    }

    .footer-copy {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      opacity: 0.5;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
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
    this.themeService.setTheme('cyber-night');
  }

  navigateToPet(pet: PetProfile): void {
    this.router.navigate(['/memorial', pet.id]);
  }

  getThemeColor(pet: PetProfile): { c1: string; c2: string; bg: string } {
    const theme = this.themeService.getTheme(pet.theme);
    return {
      c1: theme?.color1 || '#00D4FF',
      c2: theme?.color2 || '#7B2FBE',
      bg: '#12121a'
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
