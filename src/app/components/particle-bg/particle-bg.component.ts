import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-particle-bg',
  standalone: true,
  template: `<canvas #canvas class="particle-canvas"></canvas>`,
  styles: [`
    .particle-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }
  `]
})
export class ParticleBgComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() color1 = '#FFB87A';
  @Input() color2 = '#FFD4A8';

  private ctx!: CanvasRenderingContext2D;
  private particles: WarmParticle[] = [];
  private animationId = 0;
  private resizeHandler = () => this.resize();

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    this.createParticles();
    this.animate();
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resizeHandler);
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private createParticles(): void {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 25000);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      const type = Math.random();
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: Math.random() * -0.3 - 0.05,
        opacity: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? this.color1 : this.color2,
        pulse: Math.random() * Math.PI * 2,
        shape: type < 0.4 ? 'star' : type < 0.7 ? 'circle' : 'diamond',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01
      });
    }
  }

  private drawPixelStar(x: number, y: number, size: number, color: string, opacity: number): void {
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle = color;
    const s = Math.max(2, Math.floor(size));
    // Pixel star shape (cross pattern)
    this.ctx.fillRect(x - s / 2, y - 1, s, 2);
    this.ctx.fillRect(x - 1, y - s / 2, 2, s);
    // Corner dots
    const cs = Math.floor(s * 0.4);
    this.ctx.fillRect(x - cs, y - cs, 2, 2);
    this.ctx.fillRect(x + cs - 1, y - cs, 2, 2);
    this.ctx.fillRect(x - cs, y + cs - 1, 2, 2);
    this.ctx.fillRect(x + cs - 1, y + cs - 1, 2, 2);
  }

  private drawPixelDiamond(x: number, y: number, size: number, color: string, opacity: number): void {
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle = color;
    const s = Math.max(2, Math.floor(size));
    // Diamond shape with pixels
    this.ctx.fillRect(x - 1, y - s, 2, 2);
    this.ctx.fillRect(x - s / 2, y - s / 2, s, 2);
    this.ctx.fillRect(x - s * 0.7, y - 1, s * 1.4, 2);
    this.ctx.fillRect(x - s / 2, y + s / 2 - 1, s, 2);
    this.ctx.fillRect(x - 1, y + s - 1, 2, 2);
  }

  private drawPixelCircle(x: number, y: number, size: number, color: string, opacity: number): void {
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle = color;
    const s = Math.max(2, Math.floor(size));
    // Soft pixel circle
    this.ctx.beginPath();
    this.ctx.arc(x, y, s, 0, Math.PI * 2);
    this.ctx.fill();

    // Warm soft glow
    const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, s * 2.5);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');
    this.ctx.fillStyle = gradient;
    this.ctx.globalAlpha = opacity * 0.2;
    this.ctx.beginPath();
    this.ctx.arc(x, y, s * 2.5, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += 0.015;
      p.rotation += p.rotationSpeed;

      const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

      // Wrap around
      if (p.y < -20) {
        p.y = canvas.height + 20;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -20) p.x = canvas.width + 20;
      if (p.x > canvas.width + 20) p.x = -20;

      // Draw based on shape type
      switch (p.shape) {
        case 'star':
          this.drawPixelStar(p.x, p.y, p.size, p.color, currentOpacity);
          break;
        case 'diamond':
          this.drawPixelDiamond(p.x, p.y, p.size, p.color, currentOpacity);
          break;
        case 'circle':
          this.drawPixelCircle(p.x, p.y, p.size, p.color, currentOpacity);
          break;
      }
    }

    this.ctx.globalAlpha = 1;
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

interface WarmParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  pulse: number;
  shape: 'star' | 'circle' | 'diamond';
  rotation: number;
  rotationSpeed: number;
}
