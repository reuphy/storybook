import {Injectable} from '@angular/core';

import {UtilsService} from '../common/services/utils/utils.service';
import {ITimeSelectConfig, ITimeSelectConfigInternal} from './time-select-config.model';
import {Dayjs} from 'dayjs';
import {dayjsRef} from '../common/dayjs/dayjs.ref';

export type TimeUnit = 'hour' | 'minute' | 'second';
export const FIRST_PM_HOUR = 12;

@Injectable({
  providedIn: 'root'
})
export class TimeSelectService {
  readonly DEFAULT_CONFIG: ITimeSelectConfigInternal = {
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: false,
    timeSeparator: ':',
  };

  constructor(private readonly utilsService: UtilsService) {
  }

  getConfig(config: ITimeSelectConfig): ITimeSelectConfigInternal {
    const timeConfigs = {
      maxTime: config?.maxTime ? this.utilsService?.onlyTime(config.maxTime) : undefined,
      minTime: config?.minTime ? this.utilsService?.onlyTime(config.minTime) : undefined
    };

    return <ITimeSelectConfigInternal>{
      ...this.DEFAULT_CONFIG,
      ...this.utilsService?.clearUndefined(config) ?? {},
      ...timeConfigs
    };
  }

  getTimeFormat(config: ITimeSelectConfigInternal): string {
    return (config?.showTwentyFourHours ? config?.hours24Format : config?.hours12Format)
      + (config?.timeSeparator ?? ':') + (config?.minutesFormat ?? 'mm')
      + (config?.showSeconds ? ((config?.timeSeparator ?? ':') + (config?.secondsFormat ?? 'ss')) : '')
      + (config?.showTwentyFourHours ? '' : ' ' + (config?.meridiemFormat ?? 'A'));
  }

  getHours(config: ITimeSelectConfigInternal, t: Dayjs | null): string {
  const time = t || dayjsRef();
  return time?.format(config?.showTwentyFourHours ? config?.hours24Format : config?.hours12Format) ?? '';
  }

  getMinutes(config: ITimeSelectConfigInternal, t: Dayjs | null): string {
  const time = t || dayjsRef();
  return time?.format(config?.minutesFormat ?? 'mm') ?? '';
  }

  getSeconds(config: ITimeSelectConfigInternal, t: Dayjs | null): string {
  const time = t || dayjsRef();
  return time?.format(config?.secondsFormat ?? 'ss') ?? '';
  }

  getMeridiem(config: ITimeSelectConfigInternal, time: Dayjs): string {
  return time?.format(config?.meridiemFormat ?? 'A') ?? '';
  }

  decrease(config: ITimeSelectConfigInternal, time: Dayjs, unit: TimeUnit): Dayjs {
    let amount: number = 1;
    switch (unit) {
      case 'minute':
        amount = config?.minutesInterval ?? 1;
        break;
      case 'second':
        amount = config?.secondsInterval ?? 1;
        break;
    }
    return time?.subtract(amount, unit) ?? time;
  }

  increase(config: ITimeSelectConfigInternal, time: Dayjs, unit: TimeUnit): Dayjs {
    let amount: number = 1;
    switch (unit) {
      case 'minute':
        amount = config?.minutesInterval ?? 1;
        break;
      case 'second':
        amount = config?.secondsInterval ?? 1;
        break;
    }
    return time?.add(amount, unit) ?? time;
  }

  toggleMeridiem(time: Dayjs): Dayjs {
    if (!time) return time;
    if (time.hour() < FIRST_PM_HOUR) {
      return time.add(12, 'hour');
    } else {
      return time.subtract(12, 'hour');
    }
  }

  shouldShowDecrease(config: ITimeSelectConfigInternal, time: Dayjs, unit: TimeUnit): boolean {
    if (!config?.min && !config?.minTime) {
      return true;
    }
    const newTime = this.decrease(config, time, unit);

    return (!config?.min || config?.min?.isSameOrBefore?.(newTime))
      && (!config?.minTime || config?.minTime?.isSameOrBefore?.(this.utilsService?.onlyTime(newTime)));
  }

  shouldShowIncrease(config: ITimeSelectConfigInternal, time: Dayjs, unit: TimeUnit): boolean {
    if (!config?.max && !config?.maxTime) {
      return true;
    }
    const newTime = this.increase(config, time, unit);

    return (!config?.max || config?.max?.isSameOrAfter?.(newTime))
      && (!config?.maxTime || config?.maxTime?.isSameOrAfter?.(this.utilsService?.onlyTime(newTime)));
  }

  shouldShowToggleMeridiem(config: ITimeSelectConfigInternal, time: Dayjs): boolean {
    if (!config?.min && !config?.max && !config?.minTime && !config?.maxTime) {
      return true;
    }
    const newTime = this.toggleMeridiem(time);
    return (!config?.max || config?.max?.isSameOrAfter?.(newTime))
      && (!config?.min || config?.min?.isSameOrBefore?.(newTime))
      && (!config?.maxTime || config?.maxTime?.isSameOrAfter?.(this.utilsService?.onlyTime(newTime)))
      && (!config?.minTime || config?.minTime?.isSameOrBefore?.(this.utilsService?.onlyTime(newTime)));
  }
}
