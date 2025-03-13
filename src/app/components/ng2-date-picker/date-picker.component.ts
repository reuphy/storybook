import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DpDatePickerModule, IDatePickerConfig } from 'ng2-date-picker';
import dayjs from 'dayjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ng2-date-picker',
  imports: [FormsModule, DpDatePickerModule, CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class NG2DatePickerComponent {
  @Input() selectedDate: Date | null = null;
  @Input() extraDisabledDates: dayjs.Dayjs[] = [];
  @Input() disabledWeekDays: number[] = [];
  @Output() selectedDateChange: EventEmitter<Date | null> =
    new EventEmitter<Date | null>();

  public datePickerConfig: Partial<IDatePickerConfig> = {
    format: 'DD/MM/YYYY',
    showNearMonthDays: true,
    disableKeypress: false,
    isDayDisabledCallback: (date: dayjs.Dayjs) => this.isDateDisabled(date),
    dayBtnCssClassCallback: (day: dayjs.Dayjs) => {
      if (this.isDateDisabled(day)) {
        return 'strikethrough-diagonal';
      }
      return day.isSame(dayjs(), 'day') ? 'date-picker-dot' : '';
    },
  };

  private isDateDisabled(date: dayjs.Dayjs): boolean {
    if (this.disabledWeekDays.includes(date.day())) {
      return true;
    }

    return this.extraDisabledDates.some((disabledDate) =>
      date.isSame(disabledDate, 'day')
    );
  }

  public addExtraDisabledDate(date: Date): void {
    this.extraDisabledDates.push(dayjs(date));
  }

  public onDateChange(date: Date | null): void {
    this.selectedDate = date;
    this.selectedDateChange.emit(this.selectedDate);
  }
}
