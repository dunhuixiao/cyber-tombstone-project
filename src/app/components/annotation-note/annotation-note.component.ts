import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-annotation-note',
  standalone: true,
  template: `
    <div class="annotation-note" [class]="positionClass" [style.transform]="noteRotation">
      <div class="note-tape"></div>
      <div class="note-content">{{ text }}</div>
    </div>
  `,
  styles: [`
    .annotation-note {
      position: absolute;
      z-index: 10;
      max-width: 200px;
      animation: fadeIn 0.5s ease-out;
    }

    .annotation-note.pos-top-left { top: -10px; left: -20px; }
    .annotation-note.pos-top-right { top: -10px; right: -20px; }
    .annotation-note.pos-bottom-left { bottom: -10px; left: -20px; }
    .annotation-note.pos-bottom-right { bottom: -10px; right: -20px; }

    .note-tape {
      width: 40px;
      height: 12px;
      background: rgba(255, 200, 100, 0.6);
      border-radius: 2px;
      margin: 0 auto var(--space-1);
    }

    .note-content {
      background: rgba(255, 248, 220, 0.92);
      color: #4a3728;
      padding: var(--space-3) var(--space-3);
      border-radius: var(--radius-sm);
      font-size: var(--text-sm);
      font-family: var(--font-body);
      line-height: 1.6;
      box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.25);
      transition: var(--transition-smooth);
    }

    .annotation-note:hover .note-content {
      transform: scale(1.03);
      box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.35);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AnnotationNoteComponent {
  @Input() text = '';
  @Input() position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';

  get positionClass(): string {
    return 'pos-' + this.position;
  }

  get noteRotation(): string {
    const rotations: Record<string, string> = {
      'top-left': 'rotate(-3deg)',
      'top-right': 'rotate(2deg)',
      'bottom-left': 'rotate(1deg)',
      'bottom-right': 'rotate(-2deg)'
    };
    return rotations[this.position] || 'rotate(0deg)';
  }
}
