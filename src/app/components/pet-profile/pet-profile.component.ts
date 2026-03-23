import { Component, Input } from '@angular/core';
import { PetProfile } from '../../models/pet.model';
import { PixelPetBorderComponent } from '../pixel-pet-border/pixel-pet-border.component';

@Component({
  selector: 'app-pet-profile',
  standalone: true,
  imports: [PixelPetBorderComponent],
  template: `
    @if (pet) {
      <section class="profile-section">
        <!-- Hero Area -->
        <div class="profile-hero">
          <div class="avatar-container">
            <div class="avatar-frame">
              <img [src]="pet.avatar" [alt]="pet.name" class="avatar-image" />
            </div>
            <!-- Pixel pet sprite border (desktop pet style) -->
            @if (pet.pixelSprite) {
              <app-pixel-pet-border
                [spriteUrl]="pet.pixelSprite"
                [species]="pet.species"
              />
            }
            <div class="avatar-deco-left">\u273F</div>
            <div class="avatar-deco-right">\u273F</div>
          </div>

          <div class="hero-info">
            <div class="pet-species-badge">{{ pet.species }} \u00B7 {{ pet.breed }}</div>
            <h1 class="pet-name">{{ pet.name }}</h1>
            <div class="pet-dates">
              <span class="date-birth">\uD83C\uDF38 {{ pet.birthDate }}</span>
              <span class="date-separator">\u2014</span>
              <span class="date-death">\uD83C\uDF1F {{ pet.deathDate }}</span>
            </div>
            <div class="pet-gender">
              <span class="gender-icon">{{ pet.gender === '\u7537' ? '\u2642' : '\u2640' }}</span>
              <span>{{ pet.gender === '\u7537' ? '\u7537\u5B69' : '\u5973\u5B69' }}</span>
            </div>
          </div>
        </div>

        <!-- Bio Section -->
        <div class="bio-section">
          <div class="bio-card">
            <div class="bio-header">
              <span class="bio-icon">\uD83D\uDCD6</span>
              <span class="bio-title">TA \u7684\u6545\u4E8B</span>
            </div>
            <div class="bio-decoration"></div>
            <p class="bio-text">{{ pet.bio }}</p>
          </div>
        </div>

        <!-- Tags Section -->
        <div class="tags-row">
          <div class="tag-group">
            <h3 class="tag-group-title">\uD83C\uDFAD \u6027\u683C\u7279\u5F81</h3>
            <div class="tags">
              @for (trait of pet.personality; track trait) {
                <span class="tag">{{ trait }}</span>
              }
            </div>
          </div>
          <div class="tag-group">
            <h3 class="tag-group-title">\uD83D\uDC95 \u6700\u7231\u7684\u4E8B</h3>
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
              <span class="message-icon">\uD83D\uDC8C</span>
              <span class="message-title">\u4E3B\u4EBA\u7684\u8BDD</span>
            </div>
            <p class="message-text">{{ pet.ownerMessage }}</p>
          </div>
        </div>

        <!-- \u5E99\u53F7 & \u8C25\u53F7 Module (only shown if title data exists) -->
        @if (pet.title && pet.title.templeName && pet.title.posthumousName) {
          <div class="title-section">
            <div class="title-card">
              <!-- \u5377\u8F74\u5934\u90E8\u88C5\u9970 -->
              <div class="scroll-top">
                <div class="scroll-rod"></div>
                <div class="scroll-rod-end left"></div>
                <div class="scroll-rod-end right"></div>
              </div>

              <div class="title-card-inner">
                <div class="title-header">
                  <span class="title-seal">\uD83D\uDCDC</span>
                  <span class="title-heading">\u8FFD\u5C01\u8BCF\u4E66</span>
                  <span class="title-seal">\uD83D\uDCDC</span>
                </div>

                <div class="title-full-name">
                  {{ pet.title.fullTitle }}
                </div>

                <div class="title-divider">
                  <span class="divider-deco">~ \u2756 ~</span>
                </div>

                <div class="title-details">
                  <div class="title-item">
                    <div class="title-item-label">
                      <span class="label-deco">\u3010</span>\u5E99\u53F7<span class="label-deco">\u3011</span>
                    </div>
                    <div class="title-item-value">{{ pet.title.templeName }}</div>
                    <div class="title-item-note">{{ pet.title.templeNameNote }}</div>
                  </div>

                  <div class="title-item">
                    <div class="title-item-label">
                      <span class="label-deco">\u3010</span>\u8C25\u53F7<span class="label-deco">\u3011</span>
                    </div>
                    <div class="title-item-value posthumous">{{ pet.title.posthumousName }}</div>
                    <div class="title-item-note">{{ pet.title.posthumousNameNote }}</div>
                  </div>
                </div>

                <div class="title-footer-text">
                  \u5949\u5929\u627F\u8FD0\uFF0C\u94F2\u5C4E\u5B98\u8BCF\u66F0\uFF1A\u7279\u8FFD\u5C01\u4EE5\u4E0A\u5C0A\u53F7\uFF0C\u4EE5\u5F70\u5176\u4E00\u751F\u4E4B\u4F1F\u5927\u529F\u5FB7\u3002\u94A6\u6B64\u3002
                </div>
              </div>

              <!-- \u5377\u8F74\u5E95\u90E8\u88C5\u9970 -->
              <div class="scroll-bottom">
                <div class="scroll-rod"></div>
                <div class="scroll-rod-end left"></div>
                <div class="scroll-rod-end right"></div>
              </div>
            </div>
          </div>
        }
      </section>
    }
  `,
  styles: [`
    .pixel-art {
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }

    .profile-section {
      padding: var(--space-8) 0;
    }

    /* Hero */
    .profile-hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: var(--space-12) 0 var(--space-10);
      animation: fadeIn 0.8s ease-out;
    }

    .avatar-container {
      position: relative;
      width: 180px;
      height: 180px;
      margin-bottom: var(--space-8);
    }

    .avatar-frame {
      width: 100%;
      height: 100%;
      border-radius: var(--radius-2xl);
      overflow: hidden;
      border: 5px solid var(--theme-color-1);
      box-shadow: var(--shadow-pixel), 0 0 20px var(--theme-glow-1);
      background: var(--bg-elevated);
    }

    .avatar-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-deco-left,
    .avatar-deco-right {
      position: absolute;
      top: -8px;
      color: var(--theme-color-1);
      font-size: var(--text-xl);
      animation: bounce-soft 2s ease-in-out infinite;
    }
    .avatar-deco-left { left: -16px; }
    .avatar-deco-right { right: -16px; animation-delay: 0.5s; }

    .hero-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-3);
    }

    .pet-species-badge {
      font-size: var(--text-sm);
      color: var(--theme-text);
      background: var(--theme-gradient-soft);
      padding: var(--space-1) var(--space-4);
      border-radius: var(--radius-full);
      border: 1.5px solid var(--border-subtle);
      letter-spacing: 0.05em;
      font-family: var(--font-display);
    }

    .pet-name {
      font-family: var(--font-display);
      font-size: var(--text-5xl);
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
      font-family: var(--font-body);
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
      padding: var(--space-6) 0;
      max-width: 700px;
      margin: 0 auto;
    }

    .bio-card {
      position: relative;
      padding: var(--space-8);
      background: var(--bg-card);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-pixel), var(--shadow-sm);
    }

    .bio-header {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
    }

    .bio-icon { font-size: var(--text-xl); }

    .bio-title {
      font-family: var(--font-display);
      font-size: var(--text-lg);
      color: var(--theme-text);
    }

    .bio-decoration {
      width: 100%;
      height: 3px;
      background: var(--theme-gradient);
      border-radius: 3px;
      margin-bottom: var(--space-4);
      opacity: 0.4;
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
      color: var(--text-secondary);
      margin-bottom: var(--space-3);
      font-weight: 400;
      font-family: var(--font-display);
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
      background: var(--theme-gradient-soft);
      border: 1.5px solid var(--border-subtle);
      color: var(--text-secondary);
      transition: var(--transition-smooth);
      font-family: var(--font-body);
    }

    .tag:hover {
      background: var(--theme-gradient-medium);
      border-color: var(--theme-color-1);
      color: var(--theme-text);
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }

    .tag-favorite {
      border-color: var(--theme-glow-2);
    }

    /* Message */
    .message-section {
      padding: var(--space-6) 0;
      max-width: 650px;
      margin: 0 auto;
    }

    .message-card {
      padding: var(--space-8);
      background: var(--bg-card);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-2xl);
      position: relative;
      box-shadow: var(--shadow-pixel), var(--shadow-sm);
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
      color: var(--theme-text);
    }

    .message-text {
      font-size: var(--text-base);
      color: var(--text-secondary);
      line-height: 2;
      font-style: italic;
    }

    /* ===== \u5E99\u53F7 & \u8C25\u53F7 \u5377\u8F74\u6A21\u5757 ===== */
    .title-section {
      padding: var(--space-8) 0;
      max-width: 680px;
      margin: 0 auto;
    }

    .title-card {
      position: relative;
      animation: fadeIn 0.8s ease-out;
    }

    .scroll-top, .scroll-bottom {
      position: relative;
      z-index: 2;
      height: 20px;
    }

    .scroll-rod {
      position: absolute;
      left: 12px;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      height: 10px;
      background: linear-gradient(180deg, #D4A574, #C4956A, #B8845A, #C4956A, #D4A574);
      border-radius: 5px;
      box-shadow: 0 2px 6px rgba(150, 100, 50, 0.3);
    }

    .scroll-rod-end {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 20px;
      background: linear-gradient(180deg, #E8C49A, #D4A574, #C4956A);
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(150, 100, 50, 0.3);
    }
    .scroll-rod-end.left { left: 0; }
    .scroll-rod-end.right { right: 0; }

    .title-card-inner {
      position: relative;
      z-index: 1;
      background: linear-gradient(
        180deg,
        #FFF8E8 0%,
        #FFF5E0 10%,
        #FFFCF2 50%,
        #FFF5E0 90%,
        #FFF8E8 100%
      );
      border-left: 3px solid #D4A574;
      border-right: 3px solid #D4A574;
      padding: var(--space-10) var(--space-8);
      text-align: center;
      box-shadow: inset 0 0 40px rgba(200, 160, 100, 0.08);
    }

    .title-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-3);
      margin-bottom: var(--space-6);
    }

    .title-seal {
      font-size: var(--text-2xl);
    }

    .title-heading {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      color: #8B4513;
      letter-spacing: 0.2em;
    }

    .title-full-name {
      font-family: var(--font-display);
      font-size: var(--text-xl);
      color: #6B3410;
      line-height: 1.8;
      padding: var(--space-4) var(--space-6);
      background: rgba(212, 165, 116, 0.1);
      border-radius: var(--radius-xl);
      border: 1.5px dashed rgba(180, 130, 80, 0.3);
      margin-bottom: var(--space-6);
      letter-spacing: 0.1em;
    }

    .title-divider {
      margin-bottom: var(--space-6);
    }

    .divider-deco {
      font-size: var(--text-sm);
      color: #C4956A;
      letter-spacing: 0.3em;
    }

    .title-details {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
      text-align: left;
      margin-bottom: var(--space-8);
    }

    .title-item {
      padding: var(--space-4) var(--space-6);
      background: rgba(255, 255, 255, 0.5);
      border-radius: var(--radius-xl);
      border: 1px solid rgba(212, 165, 116, 0.2);
    }

    .title-item-label {
      font-family: var(--font-display);
      font-size: var(--text-sm);
      color: #A0764E;
      margin-bottom: var(--space-2);
    }

    .label-deco {
      color: #C4956A;
    }

    .title-item-value {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      color: #6B3410;
      margin-bottom: var(--space-2);
      letter-spacing: 0.15em;
    }

    .title-item-value.posthumous {
      font-size: var(--text-lg);
      line-height: 1.8;
      letter-spacing: 0.08em;
    }

    .title-item-note {
      font-size: var(--text-sm);
      color: #8B6B4A;
      line-height: 1.9;
      font-family: var(--font-body);
    }

    .title-footer-text {
      font-family: var(--font-display);
      font-size: var(--text-sm);
      color: #A0764E;
      line-height: 1.8;
      padding-top: var(--space-4);
      border-top: 1px dashed rgba(180, 130, 80, 0.25);
    }

    /* ---- Mobile Responsive ---- */
    @media (max-width: 768px) {
      .profile-hero {
        padding: var(--space-8) 0 var(--space-6);
      }

      .avatar-container {
        width: 140px;
        height: 140px;
      }

      .pet-name {
        font-size: var(--text-3xl);
      }

      .pet-dates {
        font-size: var(--text-sm);
        gap: var(--space-2);
      }

      .bio-section,
      .message-section {
        padding: var(--space-4) 0;
      }

      .bio-card,
      .message-card {
        padding: var(--space-6);
      }

      .tags-row {
        gap: var(--space-6);
        padding: var(--space-4) 0;
      }

      .title-section {
        padding: var(--space-4) 0;
      }

      .title-card-inner {
        padding: var(--space-6) var(--space-4);
      }

      .title-full-name {
        font-size: var(--text-base);
        padding: var(--space-3) var(--space-4);
      }

      .title-heading {
        font-size: var(--text-lg);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes bounce-soft {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
  `]
})
export class PetProfileComponent {
  @Input() pet: PetProfile | null = null;
}
