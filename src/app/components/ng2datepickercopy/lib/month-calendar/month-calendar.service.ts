import {Injectable} from '@angular/core';

import {UtilsService} from '../common/services/utils/utils.service';
import {IMonth} from './month.model';
import {IMonthCalendarConfig, IMonthCalendarConfigInternal} from './month-calendar-config';
import {Dayjs} from 'dayjs';
import {dayjsRef} from '../common/dayjs/dayjs.ref';



@Injectable({
  providedIn: 'root'
})
export class MonthCalendarService {
  readonly DEFAULT_CONFIG: IMonthCalendarConfigInternal = {
    allowMultiSelect: false,
    yearFormat: 'YYYY',
    format: 'MM-YYYY',
    isNavHeaderBtnClickable: false,
    monthBtnFormat: 'MMM',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    unSelectOnClick: true,
    numOfMonthRows: 3
  };

  constructor(private utilsService: UtilsService) {
  }

  getConfig(config: IMonthCalendarConfig): IMonthCalendarConfigInternal {
    const _config = <IMonthCalendarConfigInternal>{
      ...this.DEFAULT_CONFIG,
      ...this.utilsService?.clearUndefined?.(config) ?? {}
    };

    MonthCalendarService.validateConfig(_config);
  this.utilsService?.convertPropsToDayjs?.(_config, _config.format ?? 'MM-YYYY', ['min', 'max']);

    return _config;
  }

  generateYear(config: IMonthCalendarConfig, year: Dayjs, selected?: Dayjs[]): IMonth[][] {
    let index = year?.startOf?.('year') ?? dayjsRef().startOf('year');

    return this.utilsService?.createArray?.(config?.numOfMonthRows ?? 1)?.map(() => {
      return this.utilsService?.createArray?.(12 / (config?.numOfMonthRows ?? 1))?.map(() => {
        const date = dayjsRef(index);
        const month = {
          date,
          selected: !!selected?.find?.(s => index?.isSame?.(s, 'month')),
          currentMonth: index?.isSame?.(dayjsRef(), 'month') ?? false,
          disabled: this.isMonthDisabled(date, config),
          text: this.getMonthBtnText(config, date)
        };

        index = index?.add?.(1, 'month') ?? index;

        return month;
      }) ?? [];
    }) ?? [];
  }

  isMonthDisabled(date: Dayjs, config: IMonthCalendarConfig) {
    if (config?.isMonthDisabledCallback) {
      return config.isMonthDisabledCallback(date);
    }

    if (config?.min && date?.isBefore?.(config.min, 'month')) {
      return true;
    }

    return !!(config?.max && date?.isAfter?.(config.max, 'month'));
  }

  shouldShowLeft(min: Dayjs, currentMonthView: Dayjs): boolean {
  return min?.isBefore?.(currentMonthView, 'year') ?? true;
  }

  shouldShowRight(max: Dayjs, currentMonthView: Dayjs): boolean {
  return max?.isAfter?.(currentMonthView, 'year') ?? true;
  }

  getHeaderLabel(config: IMonthCalendarConfig, year: Dayjs): string {
    if (config?.yearFormatter) {
      return config.yearFormatter(year);
    }

    return year?.format?.(config?.yearFormat ?? 'YYYY') ?? '';
  }

  getMonthBtnText(config: IMonthCalendarConfig, month: Dayjs): string {
    if (config?.monthBtnFormatter) {
      return config.monthBtnFormatter(month);
    }

    return month?.format?.(config?.monthBtnFormat ?? 'MMM') ?? '';
  }

  getMonthBtnCssClass(config: IMonthCalendarConfig, month: Dayjs): string {
    if (config?.monthBtnCssClassCallback) {
      return config.monthBtnCssClassCallback(month);
    }

    return '';
  }

  private static validateConfig(config: IMonthCalendarConfigInternal): void {
    if ((config?.numOfMonthRows ?? 0) < 1 || (config?.numOfMonthRows ?? 0) > 12 || !Number.isInteger(12 / (config?.numOfMonthRows ?? 1))) {
      throw new Error('numOfMonthRows has to be between 1 - 12 and divide 12 to integer');
    }
  }
}
