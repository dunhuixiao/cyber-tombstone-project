import { Component, Input, signal } from '@angular/core';
import { PetVideo } from '../../models/pet.model';
import { AnnotationNoteComponent } from '../annotation-note/annotation-note.component';

@Component({
  selector: 'app-video-section',
  standalone: true,
  imports: [AnnotationNoteComponent],
  template: `
    <section class="video-section">
      <h2 class="section-title">
        <span class="title-icon">🎬</span>
        <span class="title-text">动态回忆</span>
        <span class="title-line"></span>
      </h2>

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
              <div class="video-gradient-overlay"></div>
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
      padding: var(--space-16) 0;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      margin-bottom: var(--space-12);
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      font-weight: 600;
      color: var(--text-primary);
    }

    .title-icon { font-size: var(--text-3xl); }

    .title-text {
      background: var(--theme-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .title-line {
      flex: 1;
      height: 1px;
      background: var(--border-subtle);
    }

    .video-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: var(--space-8);
    }

    .video-card {
      position: relative;
      animation: slideUp 0.6s ease-out both;
      border-radius: var(--radius-xl);
      overflow: hidden;
      border: 1px solid var(--border-subtle);
      background: var(--glass-bg);
      transition: var(--transition-smooth);
    }

    .video-card:hover {
      border-color: var(--theme-color-1);
      box-shadow: var(--shadow-glow-sm);
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

    .video-gradient-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
      pointer-events: none;
    }

    .video-info {
      padding: var(--space-4) var(--space-6);
    }

    .video-title {
      font-family: var(--font-display);
      font-size: var(--text-lg);
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: var(--space-2);
    }

    .video-desc {
      font-size: var(--text-sm);
      color: var(--text-secondary);
      line-height: 1.6;
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
    // Pause other videos when one starts playing
    if (this.activeVideo && this.activeVideo !== video) {
      this.activeVideo.pause();
    }
    this.activeVideo = video;
  }
}
