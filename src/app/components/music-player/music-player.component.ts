import { Component, signal, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="music-player" [ngClass]="{ 'is-playing': isPlaying() }">
      <button class="music-btn" (click)="togglePlay()" [attr.aria-label]="isPlaying() ? '暂停音乐' : '播放音乐'">
        <div class="music-visualizer">
          <span class="bar" [ngClass]="{ 'animate': isPlaying() }"></span>
          <span class="bar" [ngClass]="{ 'animate': isPlaying() }" style="animation-delay: 0.2s"></span>
          <span class="bar" [ngClass]="{ 'animate': isPlaying() }" style="animation-delay: 0.4s"></span>
          <span class="bar" [ngClass]="{ 'animate': isPlaying() }" style="animation-delay: 0.1s"></span>
        </div>
      </button>
      <div class="music-info" [ngClass]="{ 'show': showInfo() }">
        <span class="music-title">{{ musicTitle() }}</span>
        <span class="music-status">{{ isPlaying() ? '正在播放' : '已暂停' }}</span>
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
      border-radius: var(--radius-full);
      border: 1px solid var(--glass-border);
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
      box-shadow: var(--shadow-md);
    }

    .music-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      box-shadow: var(--shadow-glow-sm);
      transform: scale(1.05);
    }

    .music-visualizer {
      display: flex;
      align-items: flex-end;
      gap: 3px;
      height: 18px;
    }

    .bar {
      width: 3px;
      height: 6px;
      background: var(--theme-color-1);
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
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      padding: var(--space-2) var(--space-4);
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateX(10px);
      transition: var(--transition-smooth);
      pointer-events: none;
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
  isPlaying = signal(false);
  showInfo = signal(false);
  musicTitle = signal('纪念曲');

  private audio: HTMLAudioElement | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  togglePlay(): void {
    if (!this.audio) {
      // Use a royalty-free ambient music URL or create a silent placeholder
      this.audio = new Audio();
      // Generate a soft ambient tone using AudioContext as placeholder
      this.createAmbientTone();
    }

    if (this.isPlaying()) {
      this.audio?.pause();
      this.isPlaying.set(false);
    } else {
      this.audioCtx?.resume();
      this.isPlaying.set(true);
    }

    this.showInfo.set(true);
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => this.showInfo.set(false), 3000);
  }

  private audioCtx: AudioContext | null = null;
  private gainNode: GainNode | null = null;

  private createAmbientTone(): void {
    this.audioCtx = new AudioContext();
    const ctx = this.audioCtx;

    // Create a peaceful ambient chord
    const frequencies = [261.63, 329.63, 392.00, 523.25]; // C major chord
    this.gainNode = ctx.createGain();
    this.gainNode.gain.value = 0.03; // Very quiet
    this.gainNode.connect(ctx.destination);

    for (const freq of frequencies) {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.25;

      // Add slow tremolo
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.2 + Math.random() * 0.3;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.1;
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      lfo.start();

      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
    }
  }

  ngOnDestroy(): void {
    this.audio?.pause();
    this.audioCtx?.close();
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
  }
}
