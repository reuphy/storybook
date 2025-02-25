import { Component, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ControlContainer,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicClassDirective } from 'src/app/directives/dynamic-class.directive';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicClassDirective],
  viewProviders: [{ provide: ControlContainer, useExisting: ControlContainer }],
})
export class FormFieldComponent implements OnInit {
  @Input() inputOneConfig: any;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Optional() @SkipSelf() private controlContainer: ControlContainer
  ) {}

  ngOnInit() {
    this.form = this.controlContainer?.control as FormGroup;
    if (this.inputOneConfig && this.form) {
      this.form.addControl(
        this.inputOneConfig.name,
        this.fb.control(
          this.inputOneConfig.value,
          this.inputOneConfig.validators
        )
      );
    }
  }
}
