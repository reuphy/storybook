import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  template: `
    <ul class="custom-list">
      <ng-content></ng-content>
    </ul>
  `,
  styleUrls: ['./list.component.css']
})
export class ListComponent {}

@Component({
  selector: 'app-list-item',
  standalone: true,
  template: `
    <li class="custom-list-item" [class.active]="active" (click)="handleClick($event)" (focus)="onFocus()" (blur)="onBlur()" tabindex="0">
      <ng-content></ng-content>
    </li>
  `,
  styleUrls: ['./list.component.css']
})
export class ListItemComponent {
  @Output() itemClick = new EventEmitter<Event>();
  active = false;

  handleClick(event: Event) {
    this.active = true;
    this.itemClick.emit(event);
  }

  onFocus() {
    this.active = true;
  }

  onBlur() {
    this.active = false;
  }
}
