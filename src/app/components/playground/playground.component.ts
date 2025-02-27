import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from '../toggle/toggle.component';
import { CardComponent } from '../card/card.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { PlTitleComponent } from './components/plg-title/plg-title.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { HistogramComponent } from '../histogram/histogram.component';
import AlertComponent from '../alert/alert.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { SimpleTableComponent } from '../simple-table/simple-table.component';
import { FormComponent } from '../form/form.component';
import { Validators } from '@angular/forms';
import { CustomInputStyleDirective } from 'src/app/directives/text-input-style.directives';
import { style } from 'd3-selection';
import { DynamicClassDirective } from 'src/app/directives/dynamic-class.directive';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { FetchDataComponent } from '../fetch-data/fetch-data.component';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PlTitleComponent,
    ToggleComponent,
    CardComponent,
    CheckboxComponent,
    AccordionComponent,
    HistogramComponent,
    AlertComponent,
    ProgressBarComponent,
    SimpleTableComponent,
    FormComponent,
    DynamicClassDirective,
    DatePickerComponent,
    FetchDataComponent,
  ],
})
export class PlaygroundComponent {
  toggleState = false;
  checkboxState = true;
  progress = 0;

  onToggleChange(state: boolean): void {
    this.toggleState = state;
  }
  onCheckboxChange(state: boolean): void {
    this.checkboxState = state;
  }

  // accordion
  items = [
    { title: 'Item 1', content: 'Content 1', isOpen: false },
    { title: 'Item 2', content: 'Content 2', isOpen: false },
    { title: 'Item 3', content: 'Content 3', isOpen: false },
  ];
  // histogram
  histogramData = [
    { name: 'A', value: 100 },
    { name: 'B', value: 200 },
    { name: 'C', value: 300 },
  ];

  simpletableData: {
    Name: string;
    Age: number;
    Occupation: string;
    lastName: string;
    link: string;
    className?: string;
  }[] = [
    {
      Name: 'John',
      Age: 30,
      Occupation: 'Developer',
      lastName: 'Doe',
      link: 'https://www.google.com',
      className: 'text-success',
    },
    {
      Name: 'Jane',
      Age: 25,
      Occupation: 'Designer',
      lastName: 'Bishop',
      link: 'https://www.google.com',
      className: 'text-danger',
    },
    {
      Name: 'Jim',
      Age: 35,
      Occupation: 'Product Manager',
      lastName: 'Doe',
      link: 'https://amazone.com',
      className: 'text-warning',
    },
  ];

  onFormSubmit(formData: any): void {
    console.log('Form Data:', formData);
  }
}
