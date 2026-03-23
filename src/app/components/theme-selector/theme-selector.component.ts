import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ThemeId } from '../../models/pet.model';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  template: `
    <div class="theme-selector">
      <div class="theme-label">主题色</div>
      <div class="theme-options">
        @for (theme of themeService.themes; track theme.id) {
          <button
            class="theme-option"
            [class.active]="themeService.currentTheme() === theme.id"
            (click)="selectTheme(theme.id)"
            [attr.aria-label]="theme.name"
            [title]="theme.name + ' (' + theme.nameEn + ')'"
          >
            <div class="theme-preview"
              [style.background]="'linear-gradient(135deg, ' + theme.color1 + ', ' + theme.color2 + ')'">
            </div>
            <span class="theme-name">{{ theme.icon }} {{ theme.name }}</span>
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .theme-selector {
      position: fixed;
      top: var(--space-8);
      right: var(--space-8);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--space-2);
    }

    .theme-label {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .theme-options {
      display: flex;
      gap: var(--space-2);
      padding: var(--space-2);
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-2xl);
    }

    .theme-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-1);
      padding: var(--space-2);
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: var(--radius-lg);
      transition: var(--transition-smooth);
    }

    .theme-option:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    .theme-option.active {
      background: rgba(255, 255, 255, 0.12);
    }

    .theme-preview {
      width: 28px;
      height: 28px;
      border-radius: var(--radius-full);
      transition: var(--transition-smooth);
      border: 2px solid transparent;
    }

    .theme-option.active .theme-preview {
      border-color: var(--text-primary);
      box-shadow: 0 0 12px var(--theme-glow-1);
      transform: scale(1.1);
    }

    .theme-option:hover .theme-preview {
      transform: scale(1.1);
    }

    .theme-name {
      font-size: 10px;
      color: var(--text-tertiary);
      white-space: nowrap;
      transition: var(--transition-smooth);
    }

    .theme-option.active .theme-name {
      color: var(--text-primary);
    }
  `]
})
export class ThemeSelectorComponent {
  themeService = inject(ThemeService);

  selectTheme(id: ThemeId): void {
    this.themeService.setTheme(id);
  }
}
