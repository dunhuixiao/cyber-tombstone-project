import { Component, Input } from '@angular/core';

/**
 * Pixel pet sprite that clings to / drapes over a pet's avatar photo,
 * like a desktop-pet companion.  
 * The sprite is positioned around the avatar frame and may cover up to ~30 % 
 * of the avatar edges while keeping the face visible.
 *
 * Usage:
 * ```html
 * <div class="avatar-wrapper" style="position:relative">
 *   <img [src]="pet.avatar" class="avatar" />
 *   <app-pixel-pet-border [spriteUrl]="pet.pixelSprite" [species]="pet.species" />
 * </div>
 * ```
 */
@Component({
  selector: 'app-pixel-pet-border',
  standalone: true,
  template: `
    <div class="pixel-pet-border" [class]="'species-' + speciesClass">
      <img
        [src]="spriteUrl"
        alt="pixel pet sprite"
        class="sprite-image pixel-art"
      />
    </div>
  `,
  styles: [`
    .pixel-art {
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }

    .pixel-pet-border {
      position: absolute;
      z-index: 10;
      pointer-events: none;
      filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.12));
      animation: pet-idle 3s ease-in-out infinite;
    }

    .sprite-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* Dog: climbing on the left side, paws gripping top-left edge */
    .species-dog {
      width: 72px;
      height: 72px;
      top: -18px;
      right: -20px;
      transform: rotate(-8deg);
    }

    /* Cat: draped lazily over the top, lounging */
    .species-cat {
      width: 72px;
      height: 72px;
      top: -24px;
      left: -16px;
      transform: rotate(6deg) scaleX(-1);
    }

    @keyframes pet-idle {
      0%, 100% { transform: rotate(-8deg) translateY(0); }
      50% { transform: rotate(-8deg) translateY(-3px); }
    }

    .species-cat {
      animation-name: pet-idle-cat;
    }

    @keyframes pet-idle-cat {
      0%, 100% { transform: rotate(6deg) scaleX(-1) translateY(0); }
      50% { transform: rotate(6deg) scaleX(-1) translateY(-3px); }
    }
  `]
})
export class PixelPetBorderComponent {
  @Input() spriteUrl = '';
  @Input() species = '';

  get speciesClass(): string {
    if (this.species.includes('\u72AC') || this.species.toLowerCase().includes('dog')) return 'dog';
    if (this.species.includes('\u732B') || this.species.toLowerCase().includes('cat')) return 'cat';
    return 'dog'; // default
  }
}
