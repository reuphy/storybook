import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
})
export class DatePickerComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.form && this.controlName) {
      this.form.addControl(
        this.controlName,
        this.fb.control('', Validators.required)
      );
    }
  }
}
