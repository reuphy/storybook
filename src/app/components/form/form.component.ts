import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldComponent,
    AddressFormComponent,
    DatePickerComponent,
  ],
})
export class FormComponent implements OnInit {
  formConfig = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      value: '',
      validators: [Validators.required],
      classConfig: 'form-control mt-2',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      value: '',
      validators: [Validators.required, Validators.email],
      classConfig: 'form-control mt-2',
    },
  ];
  @Output() formSubmit = new EventEmitter<any>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.formConfig.forEach((control) => {
      this.form.addControl(
        control.name,
        this.fb.control(control.value, control.validators)
      );
    });
  }

  submit() {
    this.formSubmit.emit(this.form.value);
  }
}
