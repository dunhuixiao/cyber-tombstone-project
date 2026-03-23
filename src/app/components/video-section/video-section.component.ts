import { Component, Input, signal } from '@angular/core';
import { PetVideo } from '../../models/pet.model';
import { AnnotationNoteComponent } from '../annotation-note/annotation-note.component';

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [AnnotationNoteComponent],
  template: `
    <section class="video-section">
      <div class="video-header">
        <span class="video-icon">🎬</span>
        <h2 class="video-title-text">动态回忆</h2>
        <div class="video-line"></div>
      </div>

      <div class="video-list">
        @for (video of videos; track video.id; let i = $index) {
          <div class="video-card" [style.animation-delay]="(i * 0.2) + 's'">
            <div class="video-wrapper">
              <video
                [src]="video.url"
                [poster]="video.poster"
                controls
                preload="metadata"
                (play)="onVideoPlay($event)"
              >
                您的浏览器不支持视频播放
              </video>
            </div>
            <div class="video-info">
              <h3 class="video-title">{{ video.title }}</h3>
              @if (video.description) {
                <p class="video-desc">{{ video.description }}</p>
              }
            </div>
            @if (video.annotation) {
              <app-annotation-note
                [text]="video.annotation"
                [position]="video.annotationPosition || 'top-right'"
              />
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .video-section {
      padding: var(--space-12) 0;
    }

    .video-header {
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

    .video-icon {
      font-size: var(--text-2xl);
    }

    .video-title-text {
      font-family: var(--font-display);
      font-size: var(--text-xl);
      color: var(--text-primary);
    }

    .video-line {
      flex: 1;
      height: 2px;
      background: var(--theme-gradient);
      border-radius: 2px;
      opacity: 0.3;
    }

    .video-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: var(--space-8);
    }

    .video-card {
      position: relative;
      animation: slideUp 0.6s ease-out both;
      border-radius: var(--radius-2xl);
      overflow: hidden;
      border: 3px solid var(--border-subtle);
      background: var(--bg-card);
      transition: var(--transition-smooth);
      box-shadow: var(--shadow-pixel), var(--shadow-sm);
    }

    .video-card:hover {
      border-color: var(--theme-color-1);
      box-shadow: var(--shadow-pixel), var(--shadow-glow-sm);
    }

    .video-wrapper {
      position: relative;
    }

    .video-wrapper video {
      width: 100%;
      display: block;
      aspect-ratio: 16/9;
      object-fit: cover;
      background: var(--bg-elevated);
    }

    .video-info {
      padding: var(--space-4) var(--space-6);
    }

    .video-title {
      font-family: var(--font-display);
      font-size: var(--text-lg);
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }

    .video-desc {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.7;
    }

    /* ---- Mobile Responsive ---- */
    @media (max-width: 768px) {
      .video-section {
        padding: var(--space-6) 0;
      }

      .video-header {
        margin-bottom: var(--space-6);
        padding: var(--space-2) var(--space-4);
      }

      .video-title-text {
        font-size: var(--text-lg);
      }

      .video-list {
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      .video-info {
        padding: var(--space-3) var(--space-4);
      }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class VideoSectionComponent {
  @Input() videos: PetVideo[] = [];

  private activeVideo: HTMLVideoElement | null = null;

  onVideoPlay(event: Event): void {
    const video = event.target as HTMLVideoElement;
    if (this.activeVideo && this.activeVideo !== video) {
      this.activeVideo.pause();
    }
    this.activeVideo = video;
  }
}
