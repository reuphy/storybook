import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  SimpleChanges,
  booleanAttribute,
  signal,
} from '@angular/core';
import {
  IbzProgressStepComponent,
  IbzVerticalStepItemComponent,
} from '@craftzing/angular-ui-library/src/lib/components/atoms/ibz-progress-step';
import { IbzStepComponent } from '@craftzing/angular-ui-library/src/lib/internals/ibz-step';
import { IbzContentStepComponent } from '@craftzing/angular-ui-library/src/lib/components/atoms/ibz-content-step';

/** @deprecated since 9.0. Use `IbzStepsTypes` instead. */
export type IbzVerticalStepsTypes = {
  currentStep?: number;
  testId?: string;
};

/** @deprecated since 9.0. Use `IbzStepsComponent` instead. */
@Component({
  selector: 'ibz-vertical-steps',
  templateUrl: './ibz-vertical-steps.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IbzVerticalStepsComponent implements AfterViewInit {
  @ContentChildren(IbzVerticalStepItemComponent)
  protected _verticalStepItems: QueryList<IbzVerticalStepItemComponent>;

  @Input() public currentStep = 1;
  @Input() public testId?: string;

  @Output() public onStepChange = new EventEmitter<number>();

  public minStep = signal(1);
  public maxStep = signal(0);

  private _isInitialized = false;

  public ngAfterViewInit(): void {
    if (!this._verticalStepItems) {
      return;
    }

    this.maxStep.set(this._verticalStepItems.toArray().length);
    this._isInitialized = true;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (!this._isInitialized) {
      return;
    }

    const nextValue = changes['currentStep']?.currentValue;
    const prevValue = changes['currentStep']?.previousValue;

    if (nextValue !== prevValue) {
      if (nextValue > this.maxStep()) {
        console.error(`Error: step ${this.currentStep} exceeds maxStep.`);
        return;
      }

      if (nextValue < this.minStep()) {
        console.error(`Error: step ${this.currentStep} exceeds minStep.`);
        return;
      }

      this.onStepChange.emit(this.currentStep);
    }
  }

  public goToStep(stepNumber: number) {
    if (stepNumber > this.maxStep()) {
      console.error(`Error: step ${stepNumber} exceeds maxStep.`);
      return;
    }

    if (stepNumber < this.minStep()) {
      console.error(`Error: step ${stepNumber} exceeds minStep.`);
      return;
    }

    this.currentStep = stepNumber;
    this.onStepChange.emit(this.currentStep);
  }

  public nextStep() {
    if (this.maxStep && this.currentStep >= this.maxStep()) {
      console.error(`Error: step ${this.currentStep + 1} exceeds maxStep.`);
      return;
    }

    this.currentStep++;
    this.onStepChange.emit(this.currentStep);
  }

  public prevStep() {
    if (this.currentStep <= this.minStep()) {
      console.error(`Error: step ${this.currentStep - 1} exceeds minStep.`);
      return;
    }

    this.currentStep--;
    this.onStepChange.emit(this.currentStep);
  }
}

// --- ibz-steps ---
// Extend the functionality of the newly named component. Merge with the old one when deprecated component is removed.

export type IbzStepsTypes = {
  modGap: boolean;
} & IbzVerticalStepsTypes;

@Component({
  selector: 'ibz-steps',
  templateUrl: './ibz-steps.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IbzStepsComponent extends IbzVerticalStepsComponent {
  @ContentChildren(IbzStepComponent)
  public _steps?: QueryList<IbzContentStepComponent | IbzProgressStepComponent>;

  @Input({ transform: booleanAttribute }) public modGap = true;

  override ngAfterViewInit(): void {
    this._verticalStepItems = this
      ._steps as QueryList<IbzVerticalStepItemComponent>;

    super.ngAfterViewInit();
  }
}
