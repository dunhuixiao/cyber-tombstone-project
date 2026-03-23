import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';

/**
 * Animated pixel pet that runs across the detail page.
 * Uses `position: fixed` so it doesn't affect document flow or create extra whitespace.
 * On mobile (<768px) the pet is hidden to avoid UI clutter.
 */
@Component({
  selector: 'app-pixel-pet-runner',
  standalone: true,
  template: `
    <div
      class="pixel-runner pixel-art"
      [class.flipped]="movingLeft"
      [style.left.px]="posX"
      [style.top.px]="posY"
    >
      <img [src]="runningUrl" alt="pixel pet running" />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 50;
        overflow: hidden;
      }

      .pixel-art {
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
      }

      .pixel-runner {
        position: absolute;
        width: 64px;
        height: 64px;
        pointer-events: none;
        animation: runner-bounce 0.5s ease-in-out infinite;
      }

      .pixel-runner img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .pixel-runner.flipped {
        transform: scaleX(-1);
      }

      @keyframes runner-bounce {
        0%,
        100% {
          margin-top: 0;
        }
        50% {
          margin-top: -6px;
        }
      }

      /* Hide on mobile to avoid clutter */
      @media (max-width: 768px) {
        :host {
          display: none;
        }
      }
    `,
  ],
})
export class PixelPetRunnerComponent implements OnInit, OnDestroy {
  @Input() runningUrl = '';

  posX = 50;
  posY = 300;
  movingLeft = false;

  private animFrameId = 0;
  private speed = 1.2;
  private viewW = 800;
  private viewH = 600;

  ngOnInit(): void {
    this.viewW = window.innerWidth;
    this.viewH = window.innerHeight;
    this.posY = 200 + Math.random() * (this.viewH - 300);
    this.startAnimation();
  }

  ngOnDestroy(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewW = window.innerWidth;
    this.viewH = window.innerHeight;
  }

  private startAnimation(): void {
    const step = () => {
      const maxX = Math.max(this.viewW - 80, 100);
      const maxY = this.viewH - 80;

      if (this.movingLeft) {
        this.posX -= this.speed;
        if (this.posX <= 10) {
          this.movingLeft = false;
          this.posY += (Math.random() - 0.5) * 100;
          this.posY = Math.max(80, Math.min(this.posY, maxY));
        }
      } else {
        this.posX += this.speed;
        if (this.posX >= maxX) {
          this.movingLeft = true;
          this.posY += (Math.random() - 0.5) * 100;
          this.posY = Math.max(80, Math.min(this.posY, maxY));
        }
      }
      this.animFrameId = requestAnimationFrame(step);
    };
    this.animFrameId = requestAnimationFrame(step);
  }
}
