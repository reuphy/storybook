import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appDynamicClass]',
})
export class DynamicClassDirective implements OnChanges {
  @Input('appDynamicClass') classNames: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['classNames']) {
      this.setClass();
    }
  }

  private setClass() {
    const classList = this.classNames.split(' ');
    classList.forEach((className) => {
      this.renderer.addClass(this.el.nativeElement, className);
    });
  }
}
