import { Component, Input, signal, ViewEncapsulation } from '@angular/core';
import { PetPhoto } from '../../models/pet.model';
import { AnnotationNoteComponent } from '../annotation-note/annotation-note.component';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [AnnotationNoteComponent],
  template: `
    <section class="gallery-section">
      <div class="gallery-header">
        <span class="gallery-icon">📸</span>
        <h2 class="gallery-title">珍贵瞬间</h2>
        <div class="gallery-line"></div>
      </div>

      <div class="gallery-grid">
        @for (photo of photos; track photo.id; let i = $index) {
          <div class="gallery-item" [style.animation-delay]="(i * 0.15) + 's'"
               (click)="openLightbox(i)">
            <div class="photo-wrapper">
              <img [src]="photo.url" [alt]="photo.caption || '宠物照片'" loading="lazy" />
              <div class="photo-overlay">
                <span class="zoom-icon">🔍</span>
              </div>
            </div>
            @if (photo.caption) {
              <div class="photo-caption">{{ photo.caption }}</div>
            }
            @if (photo.annotation) {
              <app-annotation-note
                [text]="photo.annotation"
                [position]="photo.annotationPosition || 'top-right'"
              />
            }
          </div>
        }
      </div>
    </section>

    <!-- Lightbox -->
    @if (lightboxOpen()) {
      <div class="lightbox-overlay" (click)="closeLightbox()">
        <div class="lightbox-content" (click)="$event.stopPropagation()">
          <button class="lightbox-close" (click)="closeLightbox()">✕</button>
          <button class="lightbox-nav lightbox-prev" (click)="prevPhoto()">‹</button>
          <div class="lightbox-image-wrapper">
            <img [src]="photos[currentIndex()].url" [alt]="photos[currentIndex()].caption || ''" />
            @if (photos[currentIndex()].caption) {
              <div class="lightbox-caption">{{ photos[currentIndex()].caption }}</div>
            }
          </div>
          <button class="lightbox-nav lightbox-next" (click)="nextPhoto()">›</button>
          <div class="lightbox-dots">
            @for (photo of photos; track photo.id; let i = $index) {
              <span class="dot" [class.active]="i === currentIndex()" (click)="goToPhoto(i)"></span>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .pixel-art {
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }

    .gallery-section {
      padding: var(--space-12) 0;
    }

    .gallery-header {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-10);
      padding: var(--space-3) var(--space-6);
      background: var(--bg-card);
      border-radius: var(--radius-2xl);
      border: 2px solid var(--border-subtle);
      box-shadow: var(--shadow-sm);
    }

    .gallery-icon {
      font-size: var(--text-2xl);
    }

    .gallery-title {
      font-family: var(--font-display);
      font-size: var(--text-xl);
      color: var(--text-primary);
    }

    .gallery-line {
      flex: 1;
      height: 2px;
      background: var(--theme-gradient);
      border-radius: 2px;
      opacity: 0.3;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--space-6);
    }

    .gallery-item {
      position: relative;
      animation: slideUp 0.6s ease-out both;
    }

    .photo-wrapper {
      position: relative;
      border-radius: var(--radius-2xl);
      overflow: hidden;
      cursor: pointer;
      border: 3px solid var(--border-subtle);
      transition: var(--transition-smooth);
      box-shadow: var(--shadow-pixel), var(--shadow-sm);
      background: var(--bg-elevated);
    }

    .photo-wrapper:hover {
      border-color: var(--theme-color-1);
      box-shadow: var(--shadow-pixel), var(--shadow-glow-sm);
      transform: translateY(-4px);
    }

    .photo-wrapper img {
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      display: block;
      transition: var(--transition-slow);
    }

    .photo-wrapper:hover img {
      transform: scale(1.05);
    }

    .photo-overlay {
      position: absolute;
      inset: 0;
      background: rgba(255, 248, 240, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: var(--transition-smooth);
    }

    .photo-wrapper:hover .photo-overlay {
      opacity: 1;
    }

    .zoom-icon {
      font-size: var(--text-3xl);
      filter: drop-shadow(0 2px 4px rgba(180, 140, 100, 0.3));
    }

    .photo-caption {
      padding: var(--space-3) 0;
      font-size: var(--text-sm);
      color: var(--text-secondary);
      text-align: center;
      font-family: var(--font-display);
    }

    /* Lightbox */
    .lightbox-overlay {
      position: fixed;
      inset: 0;
      background: rgba(255, 248, 240, 0.92);
      backdrop-filter: blur(10px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease-out;
    }

    .lightbox-content {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }

    .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      background: var(--bg-card);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-full);
      color: var(--text-secondary);
      font-size: var(--text-xl);
      cursor: pointer;
      padding: var(--space-2);
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-fast);
      z-index: 10;
    }

    .lightbox-close:hover {
      color: var(--theme-text);
      border-color: var(--theme-color-1);
    }

    .lightbox-nav {
      background: var(--bg-card);
      border: 2px solid var(--border-subtle);
      color: var(--text-primary);
      font-size: var(--text-3xl);
      padding: var(--space-3) var(--space-3);
      cursor: pointer;
      border-radius: var(--radius-xl);
      transition: var(--transition-smooth);
      flex-shrink: 0;
      box-shadow: var(--shadow-sm);
    }

    .lightbox-nav:hover {
      background: var(--theme-gradient-soft);
      border-color: var(--theme-color-1);
      box-shadow: var(--shadow-glow-sm);
    }

    .lightbox-image-wrapper {
      text-align: center;
    }

    .lightbox-image-wrapper img {
      max-width: 70vw;
      max-height: 75vh;
      object-fit: contain;
      border-radius: var(--radius-2xl);
      border: 4px solid var(--border-medium);
      box-shadow: var(--shadow-pixel), var(--shadow-lg);
    }

    .lightbox-caption {
      margin-top: var(--space-4);
      font-size: var(--text-base);
      color: var(--text-secondary);
      font-family: var(--font-display);
    }

    .lightbox-dots {
      position: absolute;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: var(--space-2);
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: var(--radius-sm);
      background: var(--border-medium);
      cursor: pointer;
      transition: var(--transition-fast);
    }

    .dot.active {
      background: var(--theme-gradient);
      box-shadow: 0 0 8px var(--theme-glow-1);
      transform: scale(1.3);
    }

    /* ---- Mobile Responsive ---- */
    @media (max-width: 768px) {
      .gallery-section {
        padding: var(--space-6) 0;
      }

      .gallery-header {
        margin-bottom: var(--space-6);
        padding: var(--space-2) var(--space-4);
      }

      .gallery-title {
        font-size: var(--text-lg);
      }

      .gallery-grid {
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      .lightbox-content {
        max-width: 95vw;
        gap: var(--space-2);
      }

      .lightbox-image-wrapper img {
        max-width: 85vw;
        max-height: 70vh;
      }

      .lightbox-nav {
        font-size: var(--text-xl);
        padding: var(--space-2);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class PhotoGalleryComponent {
  @Input() photos: PetPhoto[] = [];

  lightboxOpen = signal(false);
  currentIndex = signal(0);

  openLightbox(index: number): void {
    this.currentIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  prevPhoto(): void {
    const newIndex = this.currentIndex() <= 0 ? this.photos.length - 1 : this.currentIndex() - 1;
    this.currentIndex.set(newIndex);
  }

  nextPhoto(): void {
    const newIndex = this.currentIndex() >= this.photos.length - 1 ? 0 : this.currentIndex() + 1;
    this.currentIndex.set(newIndex);
  }

  goToPhoto(index: number): void {
    this.currentIndex.set(index);
  }
}
