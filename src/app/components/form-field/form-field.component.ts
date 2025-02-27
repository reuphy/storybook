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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePickerComponent } from '../date-picker/date-picker.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicClassDirective,
    DatePickerComponent,
  ],
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
      if (this.inputOneConfig.type === 'daterange') {
        this.form.addControl(
          this.inputOneConfig.name,
          this.fb.group({
            start: [
              this.inputOneConfig.value.start,
              this.inputOneConfig.validators,
            ],
            end: [
              this.inputOneConfig.value.end,
              this.inputOneConfig.validators,
            ],
          })
        );
      } else {
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
}
