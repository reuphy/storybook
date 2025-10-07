import {Injectable} from '@angular/core';
import dayjs, {Dayjs} from 'dayjs';
import {UtilsService} from '../common/services/utils/utils.service';
import {IYearCalendarConfig, IYearCalendarConfigInternal} from './year-calendar-config';
import { IGenCalendarParams } from './year-calendar.component';

export interface IDateCell {
  date: Dayjs;
  selected: boolean;
  current: boolean;
  disabled: boolean
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class YearCalendarService {
  readonly DEFAULT_CONFIG: IYearCalendarConfigInternal = {
    allowMultiSelect: false,
    yearFormat: 'YYYY',
    yearBtnFormat: 'YYYY',
    format: 'YYYY',
    numOfYearsPerPage: 24,
    numOfYearRows: 6,
    unSelectOnClick: true
  };

  constructor(private utilsService: UtilsService) {
  }

  getConfig(config: IYearCalendarConfig): IYearCalendarConfigInternal {
    const _config = <IYearCalendarConfigInternal>{
      ...this.DEFAULT_CONFIG,
      ...this.utilsService.clearUndefined(config)
    };

    this.validateConfig(_config);

  this.utilsService.convertPropsToDayjs(_config, _config.format ?? 'YYYY', ['min', 'max']);
  // If you use dayjs locale plugin, set locale here if needed

    return _config;
  }

    _generateCalendar<T>({
                        numOfRows,
                        numOfCells,
                        isDisabledCb,
                        getBtnTextCb,
                        selected,
                        config,
                        startDate,
                        granularity
                      }: IGenCalendarParams<T>): IDateCell[][] {
    const index = startDate.clone();

    return this.createArray(numOfRows).map(() => {
      return this.createArray(numOfCells / numOfRows).map(() => {
        const date = index.clone();
        const month = {
          date,
          selected: !!selected.find(s => index.isSame(s, granularity)),
          current: index.isSame(dayjs(), granularity),
          disabled: isDisabledCb(date, config),
          text: getBtnTextCb(config, date)
        };

        index.add(1, 'month');

        return month;
      });
    });
  }

  generateCalendar(config: IYearCalendarConfig, year: Dayjs, selected: Dayjs[] = []): IDateCell[][] {
    return this._generateCalendar<IYearCalendarConfig>({
      numOfRows: config.numOfYearRows ?? 0,
      numOfCells: config.numOfYearsPerPage ?? this.DEFAULT_CONFIG.numOfYearsPerPage,
      isDisabledCb: this.isYearDisabled,
      getBtnTextCb: this.getYearBtnText,
      selected,
      config,
      startDate: year.clone().startOf('year'),
      granularity: 'year'
    });
  }

  isYearDisabled(date: Dayjs, config: IYearCalendarConfig) {
    if (config.min && date.isBefore(config.min, 'year')) {
      return true;
    }
    return !!(config.max && date.isAfter(config.max, 'year'));
  }

  shouldShowLeft(min: Dayjs | undefined, currentMonthView: Dayjs): boolean {
    return min ? min.isBefore(currentMonthView, 'year') : true;
  }

  shouldShowRight(max: Dayjs | undefined, currentMonthView: Dayjs): boolean {
    return max ? max.isAfter(currentMonthView, 'year') : true;
  }

  getHeaderLabel(config: IYearCalendarConfig, year: Dayjs): string {
    if (config.yearFormatter) {
      return config.yearFormatter(year);
    }
    return year.format(config.yearFormat ?? 'YYYY');
  }

  getYearBtnText(config: IYearCalendarConfig, year: Dayjs): string {
    if (config.yearBtnFormatter) {
      return config.yearBtnFormatter(year);
    }
    return year.format(config.yearBtnFormat ?? 'YYYY');
  }

  getYearBtnCssClass(config: IYearCalendarConfig, year: Dayjs): string {
    if (config.yearBtnCssClassCallback) {
      return config.yearBtnCssClassCallback(year);
    }
    return '';
  }

  private validateConfig(config: IYearCalendarConfigInternal): void {
  }

  private createArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }
}
