import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ThemeId } from '../../models/pet.model';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  template: `
    <div class="theme-selector" [class.collapsed]="collapsed()">
      <button class="theme-toggle" (click)="toggle()" [attr.aria-label]="collapsed() ? '展开主题色' : '收起主题色'">
        <span class="toggle-icon">🎨</span>
        <span class="toggle-arrow" [class.rotate]="!collapsed()">▸</span>
      </button>
      <div class="theme-panel">
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
    </div>
  `,
  styles: [`
    .theme-selector {
      position: fixed;
      top: var(--space-8);
      right: var(--space-8);
      z-index: 1000;
      display: flex;
      align-items: flex-start;
      gap: var(--space-2);
      flex-direction: row-reverse;
    }

    /* When placed inside a parent toolbar, remove own fixed positioning */
    :host-context(.top-right-toolbar) .theme-selector {
      position: static;
    }

    .theme-toggle {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-xl);
      border: 2px solid var(--border-subtle);
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      transition: var(--transition-smooth);
      box-shadow: var(--shadow-sm);
      flex-shrink: 0;
    }

    .theme-toggle:hover {
      background: var(--theme-gradient-soft);
      border-color: var(--theme-color-1);
      box-shadow: var(--shadow-glow-sm);
    }

    .toggle-icon {
      font-size: 14px;
    }

    .toggle-arrow {
      font-size: 10px;
      color: var(--text-tertiary);
      transition: transform 0.3s ease;
      display: inline-block;
    }

    .toggle-arrow.rotate {
      transform: rotate(90deg);
    }

    .theme-panel {
      overflow: hidden;
      max-width: 400px;
      opacity: 1;
      transform: translateX(0);
      transition: max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                  opacity 0.25s ease,
                  transform 0.3s ease;
    }

    .collapsed .theme-panel {
      max-width: 0;
      opacity: 0;
      transform: translateX(10px);
      pointer-events: none;
    }

    .theme-options {
      display: flex;
      gap: var(--space-2);
      padding: var(--space-2);
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 2px solid var(--border-subtle);
      border-radius: var(--radius-2xl);
      box-shadow: var(--shadow-sm);
      white-space: nowrap;
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
      background: var(--theme-gradient-soft);
    }

    .theme-option.active {
      background: var(--theme-gradient-soft);
    }

    .theme-preview {
      width: 28px;
      height: 28px;
      border-radius: var(--radius-lg);
      transition: var(--transition-smooth);
      border: 2px solid transparent;
      box-shadow: var(--shadow-sm);
    }

    .theme-option.active .theme-preview {
      border-color: var(--text-primary);
      box-shadow: 0 0 8px var(--theme-glow-1);
      transform: scale(1.15);
    }

    .theme-option:hover .theme-preview {
      transform: scale(1.1);
    }

    .theme-name {
      font-size: 10px;
      color: var(--text-tertiary);
      white-space: nowrap;
      transition: var(--transition-smooth);
      font-family: var(--font-body);
    }

    .theme-option.active .theme-name {
      color: var(--text-primary);
    }

    @media (max-width: 768px) {
      .theme-selector {
        top: var(--space-2);
        right: var(--space-2);
      }

      .theme-toggle {
        width: 36px;
        height: 36px;
      }

      .toggle-icon {
        font-size: 12px;
      }
    }
  `]
})
export class ThemeSelectorComponent {
  themeService = inject(ThemeService);
  collapsed = signal(true);

  toggle(): void {
    this.collapsed.update(v => !v);
  }

  selectTheme(id: ThemeId): void {
    this.themeService.setTheme(id);
  }
}
