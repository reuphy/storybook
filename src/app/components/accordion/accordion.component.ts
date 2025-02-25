import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { AccordionItem } from './models/accordion.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  imports: [CommonModule],
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];

  onToggle = output<AccordionItem>();

  toggle(item: AccordionItem) {
    item.isOpen = !item.isOpen;
    this.onToggle.emit(item);
  }
}
