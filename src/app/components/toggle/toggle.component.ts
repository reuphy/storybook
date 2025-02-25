import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  standalone: true
})
export class ToggleComponent {
  @Input() isChecked = false;
  @Output() toggleChange = new EventEmitter<boolean>();

  onToggleChange(): void {
    this.isChecked = !this.isChecked;
    this.toggleChange.emit(this.isChecked);
  }
}