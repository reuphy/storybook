import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'dp-calendar-nav',
    templateUrl: './calendar-nav.component.html',
    styleUrls: ['./calendar-nav.component.less'],
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class CalendarNavComponent {
  constructor(private cd: ChangeDetectorRef) {}

  @Input() label!: string;
  @Input() yearLabel!: string;
  @Input() isLabelClickable: boolean = false;
  @Input() showLeftNav: boolean = true;
  @Input() showLeftSecondaryNav: boolean = false;
  @Input() showRightNav: boolean = true;
  @Input() showRightSecondaryNav: boolean = false;
  @Input() leftNavDisabled: boolean = false;
  @Input() leftSecondaryNavDisabled: boolean = false;
  @Input() rightNavDisabled: boolean = false;
  @Input() rightSecondaryNavDisabled: boolean = false;
  @Input() showGoToCurrent: boolean = true;
  @Input() showYearButton: boolean = true;
  @HostBinding('class') @Input() theme!: string;

  @Output() onLeftNav: EventEmitter<null> = new EventEmitter();
  @Output() onLeftSecondaryNav: EventEmitter<null> = new EventEmitter();
  @Output() onRightNav: EventEmitter<null> = new EventEmitter();
  @Output() onRightSecondaryNav: EventEmitter<null> = new EventEmitter();
  @Output() onLabelClick: EventEmitter<null> = new EventEmitter();
  @Output() onGoToCurrent: EventEmitter<null> = new EventEmitter();
  @Output() onChooseYearClick: EventEmitter<null> = new EventEmitter();

  leftNavClicked() {
    this.onLeftNav.emit();
  }

  leftSecondaryNavClicked() {
    this.onLeftSecondaryNav.emit();
  }

  rightNavClicked() {
    this.onRightNav.emit();
  }

  rightSecondaryNavClicked() {
    this.onRightSecondaryNav.emit();
  }

  labelClicked() {
    this.onLabelClick.emit();
    this.showYearButton = false;
    this.cd.markForCheck();
  }

  chooseYearClicked() {
    this.onChooseYearClick.emit();
  }

  getYearFromLabel(): string {
    if (!this.label) return '';
    
    try {
      // Essaie de parser le label comme une date
      const date = new Date(this.label);
      
      // Vérifie si c'est une date valide
      if (!isNaN(date.getTime())) {
        return date.getFullYear().toString();
      }
      
      // Si ce n'est pas une date, essaie d'extraire l'année avec une regex
      const yearMatch = this.label.match(/\b(19|20)\d{2}\b/);
      return yearMatch ? yearMatch[0] : '';
    } catch (error) {
      // En cas d'erreur, essaie d'extraire l'année avec une regex
      const yearMatch = this.label.match(/\b(19|20)\d{2}\b/);
      return yearMatch ? yearMatch[0] : '';
    }
  }
}
