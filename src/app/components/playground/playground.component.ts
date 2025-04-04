import { Component } from '@angular/core';
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
import { DynamicClassDirective } from 'src/app/directives/dynamic-class.directive';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { FetchDataComponent } from '../fetch-data/fetch-data.component';
import {
  CsDatePickerComponent,
  DateOptions,
} from '../cs-date-picker/cs-date-picker.component';
import { NG2DatePickerComponent } from '../ng2-date-picker/date-picker.component';
import dayjs from 'dayjs';

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
    CsDatePickerComponent,
    FetchDataComponent,
    NG2DatePickerComponent,
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

  // date picker
  dateOptions: DateOptions[] = [
    {
      disabledWeekends: true,
      isStepperYearShown: true,
      disableRangePciker: false,
    },
    // {
    //   selectedEndDate: new Date(),
    //   selectedStartDate: new Date(),
    //   disabledWeekends: false,
    // },
    // {
    //   dateFormat: 'dd MM yyyy',
    //   disableRangePciker: true,
    // },
    // {
    //   selectedEndDate: new Date(),
    //   selectedStartDate: new Date(),
    //   disabledWeekends: false,
    //   isStepperYearShown: false,
    // },
  ];
  startDate = '';
  todate = '';
  date: Object[] = [{}, {}, {}, {}];
  dateObject(e: any, index: number) {
    console.log('date', index, e);

    this.date[index] = e;
  }
  //////////////////////////
  // ng2 date picker
  selectedDate: Date | null = null;

  extraDisabledDates: dayjs.Dayjs[] = [
    this.toDayjs(2025, 2, 25),
    this.toDayjs(2025, 2, 27),
  ];

  disabledWeekDays: number[] = [0, 6]; // 0 = Sunday, 6 = Saturday

  toDayjs(year: number, month: number, day: number): dayjs.Dayjs {
    return dayjs(new Date(year, month, day));
  }

  onSelectedDateChange(date: Date | null): void {
    this.selectedDate = date;
  }
}
