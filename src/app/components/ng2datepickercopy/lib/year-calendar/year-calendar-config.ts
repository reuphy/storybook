import {Dayjs} from 'dayjs';
import {ICalendar, ICalendarInternal} from '../common/models/calendar.model';
import { ECalendarValue } from '../public-api';

export interface IConfig {
  isYearDisabledCallback?: (date: Dayjs) => boolean;
  isNavHeaderBtnClickable?: boolean;
  allowMultiSelect?: boolean;
  yearFormat?: string;
  yearFormatter?: (year: Dayjs) => string;
  format?: string;
  numOfYearsPerPage: number;
  numOfYearRows?: number;
  yearBtnCssClassCallback?: (year: Dayjs) => string;
  yearBtnFormatter?: (year: Dayjs) => string;
  yearBtnFormat?: string;
  returnedValueType?: ECalendarValue;
  showGoToCurrent?: boolean;
  unSelectOnClick?: boolean;
}

export interface IYearCalendarConfig extends IConfig,
                                             ICalendar {
}

export interface IYearCalendarConfigInternal extends IConfig,
                                                     ICalendarInternal {
}
