import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    <div class="alert alert-{{ type }}" role="alert">
      @if (icon) {
      <i class="bi {{ icon }}"></i>
      } {{ title }}
    </div>
  `,
})
export default class AlertComponent {
  /**
   * input title
   */
  @Input() title: string = 'title input';

  @Input() icon!:
    | 'bi-airplane-fill'
    | 'bi-arrow-left'
    | 'bi-brightness-high'
    | 'bi-cake2-fill';

  @Input() type: 'primary' | 'secondary' | 'success' | 'danger' = 'primary';

  @Output()
  onClick = new EventEmitter<Event>();
}
