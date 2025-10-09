export interface IGenCalendarParams<T> {
  startDate: Dayjs;
  numOfRows: number;
  numOfCells: number;
  isDisabledCb: (date: Dayjs, config: T) => boolean;
  getBtnTextCb: (config: T, date: Dayjs) => string;
  selected: Dayjs[];
  config: T;
  granularity: 'year' | 'month';
}

export interface IDateCell {
  date: Dayjs;
  selected: boolean;
  current: boolean;
  disabled: boolean
  text: string;
}

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
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import dayjs, {Dayjs} from 'dayjs';
import {INavEvent} from '../common/models/navigation-event.model';
import {DateValidator} from '../common/types/validator.type';
import {IYearCalendarConfig, IYearCalendarConfigInternal} from './year-calendar-config';
import {YearCalendarService} from './year-calendar.service';
import {UtilsService} from '../common/services/utils/utils.service';
import { CalendarValue, ECalendarValue, SingleCalendarValue } from '../public-api';
import { CalendarNavComponent } from '../calendar-nav/calendar-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dp-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.less'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CalendarNavComponent, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearCalendarComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => YearCalendarComponent),
      multi: true
    }
  ]
})
export class YearCalendarComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

  @Input() config!: IYearCalendarConfig;
  @Input() displayDate!: Dayjs;
  @Input() minDate!: Dayjs;
  @Input() maxDate!: Dayjs;
  @HostBinding('class') @Input() theme!: string;
  @Output() onSelect: EventEmitter<IDateCell> = new EventEmitter();
  @Output() onNavHeaderBtnClick: EventEmitter<null> = new EventEmitter();
  @Output() onGoToCurrent: EventEmitter<void> = new EventEmitter();
  @Output() onLeftNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onRightNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onLeftSecondaryNav: EventEmitter<INavEvent> = new EventEmitter();
  @Output() onRightSecondaryNav: EventEmitter<INavEvent> = new EventEmitter();
  isInited: boolean = false;
  componentConfig!: IYearCalendarConfigInternal;
  yearMonths!: IDateCell[][];
  startYear: number = 2016;
  inputValue!: CalendarValue;
  inputValueType!: ECalendarValue;
  validateFn!: DateValidator;
  _shouldShowCurrent: boolean = true;
  navLabel!: string;
  showLeftNav!: boolean;
  showRightNav!: boolean;
  api = {
    toggleCalendar: this.toggleCalendarMode.bind(this),
    moveCalendarTo: this.moveCalendarTo.bind(this)
  };

  _selected!: Dayjs[];
  _currentDateView!: Dayjs;

  get selected(): Dayjs[] {
    return this._selected;
  }

  set selected(selected: Dayjs[]) {
    this._selected = selected;
    this.onChangeCallback(this.processOnChangeCallback(selected));
  }

  get currentDateView(): Dayjs {
    return this._currentDateView;
  }

    convertToMoment(date: SingleCalendarValue, format: string): Dayjs | null {
    if (!date) {
      return null;
    } else if (typeof date === 'string') {
      return dayjs(date, format);
    } else {
      return date.clone();
    }
  }

  set currentDateView(current: Dayjs) {
    console.log(this)
    this._currentDateView = current.clone();
    // Initial range: 2016-2039
    this.startYear =  this.currentDateView.year();
    this.updateYearRange();
    this.showLeftNav = this.yearCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
    this.showRightNav = this.yearCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
  }

  updateYearRange() {
    // Set startYear based on currentDateView.year()
    this.startYear = this.currentDateView.year();
    const years: IDateCell[] = [];
    const currentYear = dayjs().year();
    for (let y = this.startYear; y < this.startYear + 24; y++) {
      const date = dayjs(`${y}-01-01`);
      const isDisabled = this.yearCalendarService.isYearDisabled(date, this.componentConfig);
      years.push({
        date,
        selected: false,
        current: date.year() === currentYear,
        disabled: isDisabled,
        text: date.format(this.componentConfig.yearBtnFormat ?? 'YYYY'),
      });
    }
    this.yearMonths = [];
    for (let i = 0; i < years.length; i += 6) {
      this.yearMonths.push(years.slice(i, i + 6));
    }
    this.navLabel = `${this.startYear} - ${this.startYear + 23}`;
  }

  constructor(private readonly cd: ChangeDetectorRef,
              private readonly yearCalendarService: YearCalendarService,
              private readonly utilsService: UtilsService) {
  }

  ngOnInit() {
    this.isInited = true;
    this.init();
    this.initValidators();
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

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  validate(formControl: FormControl): ValidationErrors | any {
    if (this.minDate || this.maxDate) {
      return this.validateFn(formControl.value);
    } else {
      return () => null;
    }
  }

  writeValue(value: CalendarValue): void {
    this.inputValue = value;
    if (value) {
      this.selected = this.utilsService.convertToDayjsArray(value, this.componentConfig);
      // Set currentDateView to first selected value or displayDate
      if (this.selected.length > 0) {
        this.currentDateView = this.selected[0].clone();
      } else if (this.displayDate) {
        this.currentDateView = this.displayDate.clone();
      }
      this.startYear = this.currentDateView.year();
    } else {
      this.selected = [];
      if (this.displayDate) {
        this.currentDateView = this.displayDate.clone();
        this.startYear = this.currentDateView.year();
      }
    }
    this.updateYearRange();
    this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect ?? false);
    this.cd.markForCheck();
  }

  onChangeCallback(_: any): void {
  }

  processOnChangeCallback(value: Dayjs[]): CalendarValue {
    return this.utilsService.convertFromDayjsArray(
      this.componentConfig.format ?? '',
      value,
      this.componentConfig.returnedValueType || this.inputValueType
    );
  }


  // todo:: add unit test
  convertFromMomentArray(format: string,
                         value: Dayjs[],
                         convertTo: ECalendarValue): CalendarValue {
    switch (convertTo) {
      case (ECalendarValue.String):
        return value[0] && value[0].format(format);
      case (ECalendarValue.StringArr):
        return value.filter(Boolean).map(v => v.format(format));
      case (ECalendarValue.Dayjs):
        return value[0] ? value[0].clone() : value[0];
      case (ECalendarValue.DayjsArr):
        return value ? value.map(v => v.clone()) : value;
      default:
        return value;
    }
  }

  goToCurrent(): void {
    this.currentDateView = dayjs();
    this.onGoToCurrent.emit();
  }

  onLeftNavClick() {
  const from = this.currentDateView.clone();
  // Move currentDateView 24 years back and update startYear accordingly
  this.currentDateView = this.currentDateView.subtract(24, 'year');
  this.startYear = this.currentDateView.year();
  this.updateYearRange();
  this.onLeftNav.emit({from, to: this.currentDateView.clone()});
  }

  onRightNavClick(): void {
  const from = this.currentDateView.clone();
  // Move currentDateView 24 years forward and update startYear accordingly
  this.currentDateView = this.currentDateView.add(24, 'year');
  this.startYear = this.currentDateView.year();
  this.updateYearRange();
  this.onRightNav.emit({from, to: this.currentDateView.clone()});
  }

  shouldShowCurrent(): boolean {
    return this.utilsService.shouldShowCurrent(
      this.componentConfig.showGoToCurrent ?? false,
      'month',
      this.componentConfig.min ?? dayjs(),
      this.componentConfig.max ?? dayjs()
    );
  }

  yearClicked(year: IDateCell): void {
    if (year.selected && !this.componentConfig.unSelectOnClick) {
      return;
    }

    this.selected = this.utilsService
      .updateSelected(this.componentConfig.allowMultiSelect ?? false, this.selected, year, 'year');
    this.yearMonths = this.yearCalendarService
      .generateCalendar(this.componentConfig, this.currentDateView, this.selected);
    this.onSelect.emit(year);
  }

  getYearBtnCssClass(year: IDateCell): {[klass: string]: boolean} {
    const cssClass: {[klass: string]: boolean} = {
      'dp-selected': year.selected,
      'dp-current-year': year.current
    };
    const customCssClass: string = this.yearCalendarService.getYearBtnCssClass(this.componentConfig, year.date);

    if (customCssClass) {
      cssClass[customCssClass] = true;
    }

    return cssClass;
  }

  private init(): void {
    this.componentConfig = this.yearCalendarService.getConfig(this.config);
    this.selected = this.selected || [];
    this.currentDateView = this.displayDate
      ? this.displayDate
      : this.utilsService
        .getDefaultDisplayDate(
          this.currentDateView,
          this.selected,
          this.componentConfig.allowMultiSelect ?? false,
          this.componentConfig.min ?? dayjs()
        );
    this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect ?? false);
    this._shouldShowCurrent = this.shouldShowCurrent();
  }

  private initValidators(): void {
    this.validateFn = this.utilsService.createValidator(
      {minDate: this.minDate, maxDate: this.maxDate},
      this.componentConfig.format ?? '',
      'year'
    );
    this.onChangeCallback(this.processOnChangeCallback(this.selected));
  }

  private toggleCalendarMode(): void {
    this.onNavHeaderBtnClick.emit();
  }

  private moveCalendarTo(to: SingleCalendarValue): void {
    if (to) {
      this.currentDateView = this.utilsService.convertToDayjs(to, this.componentConfig.format ?? '');
      this.cd.markForCheck();
    }
  }

  private handleConfigChange(config: SimpleChange): void {
    if (config) {
      const prevConf: IYearCalendarConfigInternal = this.yearCalendarService.getConfig(config.previousValue);
      const currentConf: IYearCalendarConfigInternal = this.yearCalendarService.getConfig(config.currentValue);

      if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
        this._currentDateView = dayjs();
      }

      // Use locale from the original config objects, not the internal config
      const prevLocale = config.previousValue?.locale;
      const currentLocale = config.currentValue?.locale;

      if (prevLocale !== currentLocale) {
        if (this.currentDateView && currentLocale) {
          this.currentDateView = this.currentDateView.locale(currentLocale);
        }

        if (currentLocale) {
          (this.selected || []).forEach((d) => d.locale(currentLocale));
        }
      }
    }
  }
}
