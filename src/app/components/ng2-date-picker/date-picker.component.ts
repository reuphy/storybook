import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
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
  @Input() disabledWeekDays: number[] = [0, 6]; // 0 = Sunday, 6 = Saturday

  datePickerConfig = {
    format: 'DD/MM/YYYY',
    showNearMonthDays: true,
    showAdjacentMonths: true,
    disableKeypress: false,
    isDayDisabledCallback: (date: dayjs.Dayjs) => this.isDateDisabled(date),
    dayBtnCssClassCallback: (day: dayjs.Dayjs) => {
      if (this.isDateDisabled(day)) {
        return 'strikethrough-diagonal';
      }
      return day.isSame(dayjs(), 'day') ? 'date-picker-dot' : '';
    },
  };

  isDateDisabled(date: dayjs.Dayjs): boolean {
    if (this.disabledWeekDays.includes(date.day())) {
      return true;
    }

    return this.extraDisabledDates.some((disabledDate) =>
      date.isSame(disabledDate, 'day')
    );
  }

  addExtraDisabledDate(date: Date): void {
    this.extraDisabledDates.push(dayjs(date));
  }
}
