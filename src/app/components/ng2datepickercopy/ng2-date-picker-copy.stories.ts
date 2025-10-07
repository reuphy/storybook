import { Meta, moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './lib/date-picker/date-picker.component';
import { DatePickerDirective } from './lib/date-picker/date-picker.directive';
import { YearCalendarComponent } from './lib/year-calendar/year-calendar.component';

export default {
	title: 'Components/DatePickerCopy',
	component: DatePickerComponent,
	decorators: [
		moduleMetadata({
			imports: [FormsModule, DatePickerComponent, DatePickerDirective, YearCalendarComponent],
		}),
	],
} as Meta;

export const Default = () => ({
	props: {
		selectedDayTime: null,
		config: {
			firstDayOfWeek: 'su',
			monthFormat: 'MMM, YYYY',
			disableKeypress: false,
			closeOnSelect: undefined,
			closeOnSelectDelay: 100,
			openOnFocus: true,
			openOnClick: true,
			onOpenDelay: 0,
			closeOnEnter: true,
			weekDayFormat: 'ddd',
			showNearMonthDays: true,
			showWeekNumbers: false,
			enableMonthSelector: true,
			yearFormat: 'YYYY',
			showGoToCurrent: true,
			dayBtnFormat: 'DD',
			monthBtnFormat: 'MMM',
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
			multipleYearsNavigateBy: 10,
			showMultipleYearsNavigation: false,
			hideInputContainer: false,
			returnedValueType: 'string', // ECalendarValue.String
			unSelectOnClick: true,
			hideOnOutsideClick: true,
			numOfMonthRows: 3,
			format: 'DD-MM-YYYY HH:mm:ss',
		},
	},
	template: `
		<input
			#dateDirective
			[dpDayPicker]="config"
			theme="ibz-datepicker"
			id="picker"
			[(ngModel)]="selectedDayTime"
		/>
		<p>Date sélectionnée : {{ selectedDayTime }}</p>
	`,
});

export const YearCalendar = () => ({
	props: {
		config: {
			yearFormat: 'YYYY',
			yearBtnFormat: 'YYYY',
			numOfYearsPerPage: 24,
			numOfYearRows: 6,
			format: 'YYYY',
			showGoToCurrent: true,
			allowMultiSelect: false,
			unSelectOnClick: true,
			isNavHeaderBtnClickable: true,
		},
		displayDate: undefined,
		minDate: undefined,
		maxDate: undefined,
		theme: 'ibz-datepicker',
		onSelect: (event: any) => {
			console.log('Year selected:', event);
		},
	},
	template: `
		<dp-year-calendar
			[config]="config"
			[displayDate]="displayDate"
			[minDate]="minDate"
			[maxDate]="maxDate"
			[theme]="theme"
			(onSelect)="onSelect($event)"
		></dp-year-calendar>
	`,
});


