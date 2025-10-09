import {ECalendarValue} from '../common/types/calendar-value-enum';
import {SingleCalendarValue} from '../common/types/single-calendar-value';
import {ECalendarMode} from '../common/types/calendar-mode-enum';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {DayCalendarService} from './day-calendar.service';

import dayjs, {Dayjs, ManipulateType} from 'dayjs';
import {IDayCalendarConfig, IDayCalendarConfigInternal} from './day-calendar-config.model';
import {IDay} from './day.model';
import {
  ControlValueAccessor,
  UntypedFormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  FormsModule
} from '@angular/forms';
import {CalendarValue} from '../common/types/calendar-value';
import {UtilsService} from '../common/services/utils/utils.service';
import {IMonthCalendarConfig} from '../month-calendar/month-calendar-config';
import {IYearCalendarConfig} from '../year-calendar/year-calendar-config';
import {IMonth} from '../month-calendar/month.model';
import {DateValidator} from '../common/types/validator.type';
import {INavEvent} from '../common/models/navigation-event.model';
import {dayjsRef} from '../common/dayjs/dayjs.ref';
import { MonthCalendarComponent } from '../month-calendar/month-calendar.component';
import { CommonModule } from '@angular/common';
import { CalendarNavComponent } from '../calendar-nav/calendar-nav.component';
import { YearCalendarComponent } from '../year-calendar/year-calendar.component';

@Component({
    selector: 'dp-day-calendar',
    templateUrl: 'day-calendar.component.html',
    styleUrls: ['day-calendar.component.less'],
    imports: [MonthCalendarComponent, CommonModule, FormsModule, CalendarNavComponent, YearCalendarComponent],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DayCalendarService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DayCalendarComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DayCalendarComponent),
            multi: true
        }
    ],
    standalone: true
})
export class DayCalendarComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  @Input() config!: IDayCalendarConfig;
  @Input() displayDate!: SingleCalendarValue;
  @Input() minDate!: Dayjs;
  @Input() maxDate!: Dayjs;
  @HostBinding('class') @Input() theme!: string;
  @Output() onSelect: EventEmitter<IDay> = new EventEmitter();
  @Output() onMonthSelect: EventEmitter<IMonth> = new EventEmitter();
  @Output() onNavHeaderBtnClick: EventEmitter<ECalendarMode> = new EventEmitter();
  @Output() onGoToCurrent: EventEmitter<void> = new EventEmitter();
  @Output() onLeftNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onRightNav: EventEmitter<INavEvent> = new EventEmitter();
  CalendarMode = ECalendarMode;
  isInited: boolean = false;
  componentConfig!: IDayCalendarConfigInternal;
  weeks!: IDay[][];
  weekdays!: Dayjs[];
  inputValue!: CalendarValue;
  inputValueType!: ECalendarValue;
  validateFn!: DateValidator;
  currentCalendarMode: ECalendarMode = ECalendarMode.Day;
  monthCalendarConfig!: IMonthCalendarConfig;
  yearCalendarConfig!: IYearCalendarConfig;
  _shouldShowCurrent: boolean = true;
  navLabel!: string;
  showLeftNav!: boolean;
  showRightNav!: boolean;
  api = {
    moveCalendarsBy: this.moveCalendarsBy.bind(this),
    moveCalendarTo: this.moveCalendarTo.bind(this),
    toggleCalendarMode: this.toggleCalendarMode.bind(this)
  };

  constructor(public readonly dayCalendarService: DayCalendarService,
              public readonly utilsService: UtilsService,
              public readonly cd: ChangeDetectorRef) {
  }

  _selected!: Dayjs[];

  get selected(): Dayjs[] {
    return this._selected;
  }

  set selected(selected: Dayjs[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  _currentDateView!: Dayjs | null;

  get currentDateView(): Dayjs {
    return this._currentDateView || dayjsRef();
  }

  set currentDateView(current: Dayjs) {
    this._currentDateView = dayjsRef(current.toDate());
    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this._currentDateView, this.selected);
    this.navLabel = this.dayCalendarService.getHeaderLabel(this.componentConfig, this._currentDateView);
    this.showLeftNav = this.dayCalendarService.shouldShowLeft(this.componentConfig.min , this.currentDateView);
    this.showRightNav = this.dayCalendarService.shouldShowRight(this.componentConfig.max , this.currentDateView);
  }

  ngOnInit() {
    this.isInited = true;
    this.init();
    this.initValidators();
  }

  init() {
    this.componentConfig = this.dayCalendarService.getConfig(this.config);
    this.selected = this.selected || [];
    this.currentDateView = this.displayDate
      ? this.utilsService.convertToDayjs(this.displayDate, this.componentConfig.format ?? '')
      : this.utilsService
        .getDefaultDisplayDate(
          this.currentDateView,
          this.selected,
          this.componentConfig.allowMultiSelect ?? false,
          this.componentConfig.min ?? dayjsRef()
        );
    this.weekdays = this.dayCalendarService
      .generateWeekdays(this.componentConfig.firstDayOfWeek ?? 'su');
    this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect ?? false);
    this.monthCalendarConfig = this.dayCalendarService.getMonthCalendarConfig(this.componentConfig);
    this.yearCalendarConfig = this.dayCalendarService.getYearCalendarConfig(this.componentConfig);
    this._shouldShowCurrent = this.shouldShowCurrent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInited) {
      const {minDate, maxDate, config} = changes;

      this.handleConfigChange(config);
      this.init();

      if (minDate || maxDate) {
        this.initValidators();
      }
    }
  }

  writeValue(value: CalendarValue): void {
    this.inputValue = value;

    if (value) {
      this.selected = this.utilsService
        .convertToDayjsArray(value, this.componentConfig);
      this.inputValueType = this.utilsService
        .getInputType(this.inputValue, this.componentConfig.allowMultiSelect ?? false);
    } else {
      this.selected = [];
    }

    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);

    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  onChangeCallback(_: any) {
  }

  registerOnTouched(fn: any): void {
  }

  validate(formControl: UntypedFormControl): ValidationErrors | any {
    if (this.minDate || this.maxDate) {
      return this.validateFn(formControl.value);
    } else {
      return () => null;
    }
  }

  processOnChangeCallback(value: Dayjs[]): CalendarValue {
    return this.utilsService.convertFromDayjsArray(
      this.componentConfig.format ?? '',
      value,
      this.componentConfig.returnedValueType || this.inputValueType
    );
  }

  initValidators() {
    this.validateFn = this.utilsService.createValidator(
      {minDate: this.minDate, maxDate: this.maxDate},
      this.componentConfig.format ?? '',
      'day'
    );

    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  dayClicked(day: IDay) {
    if (day.selected && !this.componentConfig.unSelectOnClick) {
      return;
    }

    this.selected = this.utilsService
      .updateSelected(this.componentConfig.allowMultiSelect ?? false, this.selected, day);
    this.weeks = this.dayCalendarService
      .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
    this.onSelect.emit(day);
  }

  getDayBtnText(day: IDay): string {
    return this.dayCalendarService.getDayBtnText(this.componentConfig, day.date);
  }

  getDayBtnCssClass(day: IDay): { [klass: string]: boolean } {
    const cssClasses: { [klass: string]: boolean } = {
      'dp-selected': day.selected,
      'dp-current-month': !!day.currentMonth,
      'dp-prev-month': !!day.prevMonth,
      'dp-next-month': !!day.nextMonth,
      'dp-current-day': !!day.currentDay
    };
    const customCssClass: string = this.dayCalendarService.getDayBtnCssClass(this.componentConfig, day.date);
    if (customCssClass) {
      cssClasses[customCssClass] = true;
    }

    return cssClasses;
  }

  onLeftNavClick() {
    const from = dayjsRef(this.currentDateView.toDate());
    this.moveCalendarsBy(this.currentDateView, -1, 'month');
    const to = dayjsRef(this.currentDateView.toDate());
    this.onLeftNav.emit({from, to});
  }

  onRightNavClick() {
    const from = dayjsRef(this.currentDateView.toDate());
    this.moveCalendarsBy(this.currentDateView, 1, 'month');
    const to = dayjsRef(this.currentDateView.toDate());
    this.onRightNav.emit({from, to});
  }

  onMonthCalendarLeftClick(change: INavEvent) {
    this.onLeftNav.emit(change);
  }

  onYearCalendarLeftClick(change: INavEvent) {
    this.onLeftNav.emit(change);
  }

  onMonthCalendarRightClick(change: INavEvent) {
    this.onRightNav.emit(change);
  }

  onYearCalendarRightClick (change: INavEvent) {
    this.onRightNav.emit(change);
  }

  onMonthCalendarSecondaryLeftClick(change: INavEvent) {
    this.onRightNav.emit(change);
  }

  onMonthCalendarSecondaryRightClick(change: INavEvent) {
    this.onLeftNav.emit(change);
  }

  getWeekdayName(weekday: Dayjs): string {
    if (this.componentConfig.weekDayFormatter) {
      return this.componentConfig.weekDayFormatter(weekday.day());
    }

    return weekday.format(this.componentConfig.weekDayFormat);
  }

  toggleCalendarMode(mode: ECalendarMode) {
    if (this.currentCalendarMode !== mode) {
      this.currentCalendarMode = mode;
      this.onNavHeaderBtnClick.emit(mode);
    }

    this.cd.markForCheck();
  }

  monthSelected(month: IMonth) {
    this.currentDateView = dayjsRef(month.date.toDate());
    this.currentCalendarMode = ECalendarMode.Day;
    this.onMonthSelect.emit(month);
  }

    yearSelected(year: { date: Dayjs }) {
    this.currentDateView = dayjsRef(year.date.toDate());
    this.currentCalendarMode = ECalendarMode.Month;
    this.cd.markForCheck();
  }

  moveCalendarsBy(current: Dayjs, amount: number, granularity: ManipulateType = 'month') {
    this.currentDateView = dayjsRef(current.toDate()).add(amount, granularity);
    this.cd.markForCheck();
  }

  moveCalendarTo(to: SingleCalendarValue) {
    if (to) {
      this.currentDateView = this.utilsService.convertToDayjs(to, this.componentConfig.format ?? '');
    }

    this.cd.markForCheck();
  }

  shouldShowCurrent(): boolean {
    return this.utilsService.shouldShowCurrent(
      this.componentConfig.showGoToCurrent ?? false,
      'day',
      this.componentConfig.min ?? dayjsRef(),
      this.componentConfig.max ?? dayjsRef()
    );
  }

  goToCurrent() {
    this.currentDateView = dayjsRef();
    this.onGoToCurrent.emit();
  }

  handleConfigChange(config: SimpleChange): void {
    if (config) {
      const prevConf: IDayCalendarConfigInternal = this.dayCalendarService.getConfig(config.previousValue);
      const currentConf: IDayCalendarConfigInternal = this.dayCalendarService.getConfig(config.currentValue);

      if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
        this._currentDateView = null;
      }
    }
  }

}
