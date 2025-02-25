import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddressFormComponent implements OnInit {
  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.addControl('address', this.fb.control('', Validators.required));
    this.form.addControl('state', this.fb.control('', Validators.required));
  }
}
