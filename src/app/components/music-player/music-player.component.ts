import { Component, Input, signal, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="music-player" [ngClass]="{ 'is-playing': isPlaying() }">
      <button class="music-btn" (click)="togglePlay()" [attr.aria-label]="isPlaying() ? '\u6682\u505C\u97F3\u4E50' : '\u64AD\u653E\u97F3\u4E50'">
        <div class="music-visualizer">
          <span class="bar" [ngClass]="{ 'animate': isPlaying() }"></span>
          <span class="bar" [ngClass]="{ 'animate': isPlaying() }" style="animation-delay: 0.2s"></span>
          <span class="bar" [ngClass]="{ 'animate': isPlaying() }" style="animation-delay: 0.4s"></span>
          <span class="bar" [ngClass]="{ 'animate': isPlaying() }" style="animation-delay: 0.1s"></span>
        </div>
      </button>
      <div class="music-info" [ngClass]="{ 'show': showInfo() }">
        <span class="music-title">\uD83C\uDFB5 {{ musicTitle() }}</span>
        <span class="music-status">{{ isPlaying() ? '\u6B63\u5728\u64AD\u653E' : '\u5DF2\u6682\u505C' }}</span>
      </div>
    </div>
  `,
  styles: [`
    .music-player {
      position: fixed;
      bottom: var(--space-8);
      right: var(--space-8);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: var(--space-3);
      flex-direction: row-reverse;
    }

    .music-btn {
      width: 48px;
      height: 48px;
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
      box-shadow: var(--shadow-pixel), var(--shadow-sm);
    }

    .music-btn:hover {
      background: var(--theme-gradient-soft);
      border-color: var(--theme-color-1);
      box-shadow: var(--shadow-pixel), var(--shadow-glow-sm);
      transform: scale(1.05);
    }

    .music-visualizer {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 18px;
    }

    .bar {
      width: 4px;
      height: 6px;
      background: var(--theme-gradient);
      border-radius: 2px;
      transition: height 0.2s ease;
    }

    .bar.animate {
      animation: musicBounce 0.8s ease-in-out infinite;
    }

    .music-info {
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-xl);
      padding: var(--space-2) var(--space-4);
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateX(10px);
      transition: var(--transition-smooth);
      pointer-events: none;
      box-shadow: var(--shadow-sm);
    }

    .music-info.show {
      opacity: 1;
      transform: translateX(0);
      pointer-events: auto;
    }

    .music-title {
      font-size: var(--text-sm);
      color: var(--text-primary);
      white-space: nowrap;
      font-family: var(--font-display);
    }

    .music-status {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
    }

    @keyframes musicBounce {
      0%, 100% { height: 4px; }
      50% { height: 18px; }
    }
  `]
})
export class MusicPlayerComponent implements OnDestroy {
  /** Path to the local audio file, e.g. 'images/pets/wangcai/bgm.wav' */
  @Input() musicSrc = '';

  isPlaying = signal(false);
  showInfo = signal(false);
  musicTitle = signal('\u7EAA\u5FF5\u66F2');

  private audio: HTMLAudioElement | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  togglePlay(): void {
    if (!this.audio) {
      this.audio = new Audio(this.musicSrc);
      this.audio.loop = true;
      this.audio.volume = 0.5;
    }

    if (this.isPlaying()) {
      this.audio.pause();
      this.isPlaying.set(false);
    } else {
      this.audio.play().catch(() => {
        // Autoplay blocked by browser, ignore silently
      });
      this.isPlaying.set(true);
    }

    this.showInfo.set(true);
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => this.showInfo.set(false), 3000);
  }

  ngOnDestroy(): void {
    this.audio?.pause();
    this.audio = null;
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
  }
}
