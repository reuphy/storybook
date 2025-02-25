import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

interface StyleConfig {
  borderColor?: string;
  focusBorderColor?: string;
  padding?: string;
  borderRadius?: string;
}

@Directive({
  selector: '[appCustomInputStyle]',
})
export class CustomInputStyleDirective implements OnChanges {
  @Input('appCustomInputStyle') styleConfig: StyleConfig = {
    borderColor: '#ccc',
    focusBorderColor: '#007bff',
    padding: '10px',
    borderRadius: '4px',
  };

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setStyle();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.setStyle();
    }
  }

  private setStyle() {
    const { borderColor, padding, borderRadius } = this.styleConfig;
    this.renderer.setStyle(
      this.el.nativeElement,
      'border',
      `1px solid ${borderColor}`
    );
    this.renderer.setStyle(this.el.nativeElement, 'padding', padding);
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', borderRadius);
    this.renderer.setStyle(this.el.nativeElement, 'outline', 'none');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'border-color 0.3s'
    );
  }

  @HostListener('focus') onFocus() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'borderColor',
      this.styleConfig.focusBorderColor
    );
  }

  @HostListener('blur') onBlur() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'borderColor',
      this.styleConfig.borderColor
    );
  }
}
