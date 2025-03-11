import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DateOptions {
  dateFormat?: string;
  selectedEndDate?: Date;
  selectedStartDate?: Date;
  disabledWeekends?: boolean;
  disableRangePciker?: boolean;
  isStepperYearShown?: boolean;
}

@Component({
  selector: 'cs-date-picker',
  standalone: true,
  templateUrl: './cs-date-picker.component.html',
  styleUrl: './cs-date-picker.component.scss',
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
})
export class CsDatePickerComponent {
  @Output() dateObject = new EventEmitter<Object>();
  isRightChervronEnable = false;

  @Input()
  set dateOptions(dateOptions: DateOptions) {
    if (dateOptions) {
      this.setDateOptions(dateOptions);
    }
  }

  disabledWeekends = true;
  disableRangePciker = false;
  @Input() isStepperYearShown = true;
  dateFormat = '';

  showDropdownWithEmptyContent = false;
  days: (Date | undefined)[] = [];
  years: number[] = [];
  months: Date[] = [];
  @Input() offsetYearsMenu = 5;
  @Input() isSelectionDayAfterCurrentDayEnable = true;
  isDayselected = false;
  isDatePickerClicked = false;
  radioButtonDate = new Date();
  dateTosubmit = '';
  tabBtnActive: number = -1;

  currentDate: Date = new Date();
  endDate: Date = new Date();

  selectedStartDate: Date | undefined;
  selectedStartDateTMP: Date | undefined;
  selectedEndDate: Date | undefined;

  dateDisplayed: string = '';
  today = new Date().toLocaleDateString();
  currentDay = new Date();
  toggleYearChoice = false;
  toggleMonthChoice = false;
  yearchose = 0;
  toggleDate = new Date();
  abbreviatedMonth: string[] = [];
  ngOnInit(): void {
    this.renderCalendar();
    this.setYearsMenuToChoose();
    this.getMonthAbreviated();
  }

  constructor(private datePipe: DatePipe) {}

  //to populate the calendar
  renderCalendar() {
    this.days = [];
    this.currentDate.setDate(1);
    this.currentDate.setHours(0, 0, 0, 0);

    this.endDate = new Date(this.currentDate);
    this.endDate.setMonth(this.endDate.getMonth() + 1);
    this.endDate.setDate(0);

    let dayFromNextMonthToDisplay = this.endDate.getDay()
      ? 7 - this.endDate.getDay()
      : 0;

    for (
      let indexDay = this.currentDate.getDate();
      indexDay <= this.endDate.getDate() + dayFromNextMonthToDisplay;
      indexDay++
    ) {
      let dateAtIndex: Date = new Date(this.currentDate);
      dateAtIndex.setDate(indexDay);

      if (indexDay === this.currentDate.getDate()) {
        let spliceNumberElement = this.currentDate.getDay() || 7;

        for (let i = 1; i < spliceNumberElement; i++) {
          this.days.splice(0, 0, undefined);
        }
      }
      this.days.push(dateAtIndex);
    }
  }

  setYearsMenuToChoose() {
    // offset number of years before current year
    // ex: this.offsetYearsMenu = 5

    //get current year - offset
    // ex: initialYearMenu = 2017

    let initialYearMenu = this.currentDate.getFullYear() - this.offsetYearsMenu;
    console.log(this.currentDate.getFullYear());

    // for loop initialYearMenu untill current year
    // initialYearMenu++
    for (
      let index = initialYearMenu;
      index <= this.currentDate.getFullYear();
      index++
    ) {
      this.years.push(index);
    }
  }

  getMonthAbreviated() {
    let locale = 'en-GB';
    let objDate = new Date();
    for (let index = 0; index <= 11; index++) {
      this.abbreviatedMonth.push(
        new Date(objDate.setMonth(index)).toLocaleString(locale, {
          month: 'short',
        })
      );
    }
  }

  setMonthMenuToChoose() {
    this.toggleMonthChoice = true;

    let res = [];
    let yearChosen = this.toggleDate.getFullYear();
    let monthChoice =
      yearChosen === new Date().getFullYear() ? new Date().getMonth() : 11;
    const endDate = new Date(yearChosen, monthChoice, 1);
    const startDate = new Date(endDate.setFullYear(endDate.getFullYear()));
    startDate.setDate(1);
    startDate.setMonth(0);
    for (let index = 0; index <= endDate.getMonth(); index++) {
      let tempDate = new Date(startDate.setMonth(index));
      res.push(tempDate);
    }
    this.months = res;
  }

  getSelectedMonth(month: Date): void {
    this.currentDate = new Date(month);
    this.toggleDate = this.currentDate;
    this.toggleMonthChoice = false;
    this.checkIsRightChervronEnable(0);
    this.renderCalendar();
  }

  checkIsRightChervronEnable(offset: number) {
    this.currentDate = new Date(
      this.currentDate.setMonth(this.currentDate.getMonth() + offset)
    );
    let monthOffset = new Date();
    monthOffset.setMonth(monthOffset.getMonth() - 1);
    this.isRightChervronEnable = this.currentDate < monthOffset;
  }

  moveToMonthOffset(event: any, offset: number) {
    event.stopPropagation();
    this.checkIsRightChervronEnable(offset);

    this.toggleDate = this.currentDate;
    this.renderCalendar();
  }

  moveToYearOffset(event: any, offset: number) {
    event.stopPropagation();
    const target = Number((event.target as HTMLElement)?.textContent);
    console.log(target);

    let calculateOffset = this.years.length - (offset + 1);
    this.toggleDate = new Date(
      this.toggleDate.setFullYear(target, this.toggleDate.getMonth())
    );
    this.currentDate = new Date(
      this.currentDate.setFullYear(new Date().getFullYear() - calculateOffset)
    );
    this.checkIsRightChervronEnable(0);
    this.setTabBtnActive(offset);
    this.renderCalendar();
    this.toggleYearChoice = false;
    this.setMonthMenuToChoose();
  }

  getSelectedDay(day: Date | undefined, e: any): void {
    if (day === undefined) return;

    if (e.type === 'click' || e.type === 'change') {
      e.stopPropagation();
      this.setTabBtnActive(-1);

      let weekendDay = new Date(day).getDay();
      if (this.disabledWeekends && (weekendDay === 6 || weekendDay === 0))
        return;

      // disable current day + 1 selection if needed
      this.currentDay = new Date();
      if (day > this.currentDay && !this.isSelectionDayAfterCurrentDayEnable)
        return;

      if (this.disableRangePciker) {
        this.selectedStartDate = new Date(day);
        this.selectedEndDate = new Date(day);
      } else {
        if (
          this.selectedStartDate === undefined ||
          day < this.selectedStartDate ||
          (day !== this.selectedStartDate && this.isDatePickerClicked === false)
        ) {
          this.selectedStartDate = new Date(day);
          this.isDatePickerClicked = true;
          // reseting endate to make sure it look like DD/MM/YYYY
          this.selectedEndDate = undefined;
        } else if (this.selectedStartDate && this.isDatePickerClicked) {
          this.selectedEndDate = new Date(day);
          this.isDatePickerClicked = false;
        } else {
          this.selectedStartDate = new Date(day);
          this.selectedEndDate = undefined;
          this.isDatePickerClicked = true;
        }
      }

      this.updateDateDisplay();
      if (
        (this.selectedStartDate !== undefined &&
          this.selectedEndDate !== undefined) ||
        this.disableRangePciker
      )
        this.emitDateToParent();
    }

    if (
      e.type === 'mouseenter' &&
      this.isDatePickerClicked &&
      !this.disableRangePciker
    ) {
      this.selectedEndDate = new Date(day);
    }
  }

  leavePicker() {
    if (this.isDatePickerClicked && this.selectedStartDate)
      this.selectedEndDate = new Date(this.selectedStartDate);
  }

  setSelectionDate(numberOfDays: number, activeBtnIndex: number) {
    let endDate = new Date();
    endDate.setHours(0, 0, 0, 0);
    this.selectedEndDate = new Date(endDate);
    let startDate = new Date(this.selectedEndDate);
    startDate.setDate(this.selectedEndDate.getDate() - numberOfDays);
    this.selectedStartDate = new Date(startDate);
    this.currentDate = new Date();
    this.setTabBtnActive(activeBtnIndex);
    this.updateDateDisplay();
    this.renderCalendar();
    this.emitDateToParent();
  }

  setDateOptions(dateOptions: DateOptions) {
    this.disabledWeekends =
      dateOptions.disabledWeekends !== undefined
        ? dateOptions.disabledWeekends
        : true;
    this.disableRangePciker =
      dateOptions.disableRangePciker !== undefined
        ? dateOptions.disableRangePciker
        : false;
    this.isStepperYearShown =
      dateOptions.isStepperYearShown !== undefined
        ? dateOptions.isStepperYearShown
        : true;

    this.dateFormat = dateOptions.dateFormat || 'dd/MM/yyyy';

    this.selectedEndDate = dateOptions.selectedEndDate
      ? new Date(dateOptions.selectedEndDate)
      : undefined;
    this.selectedStartDate = dateOptions.selectedStartDate
      ? new Date(dateOptions.selectedStartDate)
      : undefined;
    this.selectedStartDate = dateOptions.selectedStartDate
      ? new Date(dateOptions.selectedStartDate)
      : undefined;
    this.currentDate = new Date();

    if (this.selectedEndDate) {
      this.selectedEndDate.setHours(0, 0, 0, 0);
    }

    if (this.selectedStartDate) {
      this.selectedStartDate.setHours(0, 0, 0, 0);
    }

    this.updateDateDisplay();
    this.renderCalendar();
    this.emitDateToParent();
  }

  emitDateToParent() {
    this.dateObject.emit({
      startDate: this.selectedStartDate,
      todate: this.selectedEndDate,
    });
  }

  closeDropDown(e: any) {
    e.stopPropagation();
    if (e.relatedTarget === null && e.type === 'blur') {
      this.showDropdownWithEmptyContent = false;
    }
    if (e.relatedTarget === null && e.type === 'focusout') {
      this.showDropdownWithEmptyContent = false;
    }

    if (
      this.isDatePickerClicked &&
      !this.toggleYearChoice &&
      !this.toggleMonthChoice
    ) {
      this.selectedEndDate = this.selectedStartDate;
      // this.isDatePickerClicked = false;
      // console.log('ici');
    }
  }

  openDropDown() {
    this.showDropdownWithEmptyContent = !this.showDropdownWithEmptyContent;
  }

  setTabBtnActive(index: number) {
    this.tabBtnActive = index;
  }

  isSelectedStartOrEndDate(day: Date): boolean {
    return (
      (this.selectedStartDate !== undefined &&
        this.selectedStartDate.getTime() === day.getTime()) ||
      (this.selectedEndDate !== undefined &&
        this.selectedEndDate.getTime() === day.getTime())
    );
  }

  isSelectedStartDate(day: Date): boolean {
    return (
      this.selectedStartDate !== undefined &&
      this.selectedStartDate.getTime() === day.getTime()
    );
  }

  updateDateDisplay() {
    if (this.selectedStartDate) {
      this.dateDisplayed =
        this.datePipe.transform(this.selectedStartDate, this.dateFormat) || '';
      if (!this.disableRangePciker) {
        this.dateDisplayed += this.selectedEndDate
          ? ' - ' +
            this.datePipe.transform(this.selectedEndDate, this.dateFormat)
          : ' - ' + this.dateFormat.toUpperCase();
      }
    } else {
      this.dateDisplayed = '';
    }
  }

  getDaysOfWeekInAbreviateAndLocaleFormat() {
    const weekdayDateMap: any = {
      Mon: new Date('2020-01-06T00:00:00.000Z'),
      Tue: new Date('2020-01-07T00:00:00.000Z'),
      Wed: new Date('2020-01-08T00:00:00.000Z'),
      Thu: new Date('2020-01-09T00:00:00.000Z'),
      Fri: new Date('2020-01-10T00:00:00.000Z'),
      Sat: new Date('2020-01-11T00:00:00.000Z'),
      Sun: new Date('2020-01-12T00:00:00.000Z'),
    };
    const shortWeekdays = Object.keys(weekdayDateMap);

    const getDayOfWeek = (shortName: any, locale = 'en-US', length = 'short') =>
      new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(
        weekdayDateMap[shortName]
      );

    const getDaysOfWeek = (locale = 'en-US', length = 'short') =>
      shortWeekdays.map((shortName) => getDayOfWeek(shortName, locale, length));

    return getDaysOfWeek();
  }

  createDateObject(value: any) {
    const date = new Date(value.split('/').reverse().join('/'));
    return date.toString() == 'Invalid Date' ? null : date;
  }

  // TODO in the future
  dateDisplayedChange(event: any) {
    // add in the input
    // (change)="dateDisplayedChange($event.target.value)"
    let dateChangeArray = event.target.value.replace(/\s/g, '').split('-');
    console.log(event);

    let startDate = this.createDateObject(dateChangeArray[0]);

    let endDate = this.createDateObject(dateChangeArray[1]);

    if (startDate && endDate && startDate <= endDate) {
      this.getSelectedDay(startDate, event);
      this.getSelectedDay(endDate, event);
    }
  }
}
