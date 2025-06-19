import {
  Directive,
  HostListener,
  Input,
  ElementRef,
  AfterViewInit,
} from "@angular/core";

@Directive({
  selector: "[autoGrow]",
})
export class AutoGrowDirective implements AfterViewInit {
  @Input() autoGrow = false;

  constructor(private el: ElementRef<HTMLTextAreaElement>) {}

  ngAfterViewInit(): void {
    if (this.autoGrow) {
      this.adjust();
    }
  }

  @HostListener("input", ["$event"])
  onInput(): void {
    if (!this.autoGrow) {
      return;
    }
    this.adjust();
  }

  private adjust(): void {
    const target = this.el.nativeElement;
    target.style.height = "auto";
    target.style.overflow = "hidden";
    target.style.height = `${target.scrollHeight}px`;
  }
}
