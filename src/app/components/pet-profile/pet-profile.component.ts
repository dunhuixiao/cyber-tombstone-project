import { Component, Input } from '@angular/core';
import { PetProfile } from '../../models/pet.model';

@Component({
  selector: 'app-pet-profile',
  standalone: true,
  template: `
    @if (pet) {
      <section class="profile-section">
        <!-- Hero Area -->
        <div class="profile-hero">
          <div class="avatar-container">
            <div class="avatar-glow"></div>
            <img [src]="pet.avatar" [alt]="pet.name" class="avatar-image" />
            <div class="avatar-ring"></div>
          </div>

          <div class="hero-info">
            <div class="pet-species-badge">{{ pet.species }} · {{ pet.breed }}</div>
            <h1 class="pet-name">{{ pet.name }}</h1>
            <div class="pet-dates">
              <span class="date-birth">★ {{ pet.birthDate }}</span>
              <span class="date-separator">—</span>
              <span class="date-death">✦ {{ pet.deathDate }}</span>
            </div>
            <div class="pet-gender">
              <span class="gender-icon">{{ pet.gender === '男' ? '♂' : '♀' }}</span>
              <span>{{ pet.gender === '男' ? '男孩' : '女孩' }}</span>
            </div>
          </div>
        </div>

        <!-- Bio Section -->
        <div class="bio-section">
          <div class="bio-card">
            <div class="bio-decoration"></div>
            <p class="bio-text">{{ pet.bio }}</p>
          </div>
        </div>

        <!-- Tags Section -->
        <div class="tags-row">
          <div class="tag-group">
            <h3 class="tag-group-title">性格特征</h3>
            <div class="tags">
              @for (trait of pet.personality; track trait) {
                <span class="tag">{{ trait }}</span>
              }
            </div>
          </div>
          <div class="tag-group">
            <h3 class="tag-group-title">最爱的事</h3>
            <div class="tags">
              @for (thing of pet.favoriteThings; track thing) {
                <span class="tag tag-favorite">{{ thing }}</span>
              }
            </div>
          </div>
        </div>

        <!-- Owner Message -->
        <div class="message-section">
          <div class="message-card">
            <div class="message-header">
              <span class="message-icon">💌</span>
              <span class="message-title">主人的话</span>
            </div>
            <p class="message-text">{{ pet.ownerMessage }}</p>
          </div>
        </div>
      </section>
    }
  `,
  styles: [`
    .profile-section {
      padding: var(--space-8) 0;
    }

    /* Hero */
    .profile-hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: var(--space-16) 0 var(--space-12);
      animation: fadeIn 0.8s ease-out;
    }

    .avatar-container {
      position: relative;
      width: 180px;
      height: 180px;
      margin-bottom: var(--space-8);
    }

    .avatar-glow {
      position: absolute;
      inset: -15px;
      border-radius: var(--radius-full);
      background: var(--theme-gradient);
      opacity: 0.3;
      filter: blur(20px);
      animation: breathe 3s ease-in-out infinite;
    }

    .avatar-image {
      width: 100%;
      height: 100%;
      border-radius: var(--radius-full);
      object-fit: cover;
      position: relative;
      z-index: 2;
      border: 3px solid var(--border-subtle);
    }

    .avatar-ring {
      position: absolute;
      inset: -5px;
      border-radius: var(--radius-full);
      border: 2px solid transparent;
      background-image: linear-gradient(var(--bg-deep), var(--bg-deep)), var(--theme-gradient);
      background-origin: border-box;
      background-clip: padding-box, border-box;
      z-index: 1;
    }

    .hero-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
    }

    .pet-species-badge {
      font-size: var(--text-sm);
      color: var(--theme-color-1);
      background: rgba(255, 255, 255, 0.05);
      padding: var(--space-1) var(--space-4);
      border-radius: var(--radius-full);
      border: 1px solid var(--border-subtle);
      letter-spacing: 0.05em;
    }

    .pet-name {
      font-family: var(--font-display);
      font-size: var(--text-5xl);
      font-weight: 700;
      background: var(--theme-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.2;
    }

    .pet-dates {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      font-size: var(--text-base);
      color: var(--text-secondary);
      font-family: var(--font-display);
    }

    .date-separator {
      color: var(--text-tertiary);
    }

    .pet-gender {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      font-size: var(--text-sm);
      color: var(--text-tertiary);
    }

    .gender-icon {
      font-size: var(--text-lg);
      color: var(--theme-color-1);
    }

    /* Bio */
    .bio-section {
      padding: var(--space-8) 0;
      max-width: 700px;
      margin: 0 auto;
    }

    .bio-card {
      position: relative;
      padding: var(--space-8);
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-xl);
    }

    .bio-decoration {
      position: absolute;
      top: -1px;
      left: var(--space-8);
      right: var(--space-8);
      height: 2px;
      background: var(--theme-gradient);
      border-radius: 2px;
    }

    .bio-text {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: 2;
      text-indent: 2em;
    }

    /* Tags */
    .tags-row {
      display: flex;
      justify-content: center;
      gap: var(--space-12);
      padding: var(--space-8) 0;
      flex-wrap: wrap;
    }

    .tag-group {
      text-align: center;
    }

    .tag-group-title {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
      margin-bottom: var(--space-3);
      font-weight: 400;
      letter-spacing: 0.1em;
    }

    .tags {
      display: flex;
      gap: var(--space-2);
      flex-wrap: wrap;
      justify-content: center;
    }

    .tag {
      font-size: var(--text-sm);
      padding: var(--space-1) var(--space-4);
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      transition: var(--transition-smooth);
    }

    .tag:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--theme-color-1);
      color: var(--theme-color-1);
    }

    .tag-favorite {
      border-color: var(--theme-glow-2);
    }

    /* Message */
    .message-section {
      padding: var(--space-8) 0;
      max-width: 650px;
      margin: 0 auto;
    }

    .message-card {
      padding: var(--space-8);
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-xl);
      position: relative;
    }

    .message-header {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-4);
    }

    .message-icon {
      font-size: var(--text-2xl);
    }

    .message-title {
      font-family: var(--font-display);
      font-size: var(--text-lg);
      color: var(--theme-color-1);
      font-weight: 600;
    }

    .message-text {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: 2;
      font-style: italic;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes breathe {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.5; }
    }
  `]
})
export class PetProfileComponent {
  @Input() pet: PetProfile | null = null;
}
