import { Meta, StoryObj } from '@storybook/angular';
import { FormComponent } from './form.component';
import { moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export default {
  title: 'Components/Form',
  component: FormComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
\`\`\`html
<form [formGroup]="form" (ngSubmit)="submit()">
  <app-form-field [inputOneConfig]="formConfig[0]"></app-form-field>
  <app-form-field [inputOneConfig]="formConfig[1]"></app-form-field>
  <app-address-form [form]="form"></app-address-form>
  <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
    Submit
  </button>
</form>
\`\`\`

\`\`\`typescript
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
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
\`\`\`
        `,
      },
    },
  },
} as Meta;

type Story = StoryObj<FormComponent>;

export const Default: Story = {
  args: {
    formConfig: [
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
    ],
  },
};
