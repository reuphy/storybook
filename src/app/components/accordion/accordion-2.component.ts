import { Component, Input, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter, Directive, HostListener } from '@angular/core';

import { CommonModule } from '@angular/common';

@Directive({selector: 'button[stopAccordionToggle]', standalone: true})
export class StopAccordionToggleDirective {
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();
  }
}

@Component({
  selector: 'app-accordion-2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngStyle]="{ 'margin-left': getMargin(level) }">
      <div class="accordion-2-header" (click)="toggle()">
        <span class="accordion-2-chevron" [style.transform]="expanded ? 'rotate(90deg)' : 'rotate(0deg)'" style="display:inline-flex;align-items:center;margin-right:0.5rem;transition:transform 0.2s;">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <ng-content select="[accordion-2-title]"></ng-content>
      </div>
      <div class="accordion-2-content" *ngIf="expanded">
        <div
          class="accordion-2-child-content"
          [class.accordion-2-child-active]="childActive"
        >
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./accordion-2.component.css']
})
export class Accordion2Component implements AfterContentInit {
  @Input() level = 1;
  expanded = false;

  @ContentChildren(Accordion2Component) children!: QueryList<Accordion2Component>;

  ngAfterContentInit() {
    this.children.forEach(child => child.level = this.level + 1);
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  getMargin(level: number): string {
    if (level === 1) return '1rem';
    if (level === 2) return '1.5rem';
    return '2rem';
  }
}
