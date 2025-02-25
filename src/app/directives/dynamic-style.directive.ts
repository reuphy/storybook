import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appDynamicStyle]',
})
export class DynamicStyleDirective implements OnChanges {
  @Input('appDynamicStyle') styleConfig: { [key: string]: string } = {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['styleConfig']) {
      this.setStyle();
    }
  }

  private setStyle() {
    for (const [key, value] of Object.entries(this.styleConfig)) {
      this.renderer.setStyle(
        this.el.nativeElement,
        this.toKebabCase(key),
        value
      );
    }
  }

  private toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}
