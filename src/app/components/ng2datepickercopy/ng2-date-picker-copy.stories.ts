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
		displayDate: null,
		config: {
			firstDayOfWeek: 'su',
			monthFormat: 'DD-MM-YYYY',
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
			format: 'DD-MM-YYYY',
		},
		updateDisplayDate: function(date: any) {
			if (date && date !== 'Invalid date' && date.length >= 10) {
				this.displayDate = date;
				console.log('Display date updated:', this.displayDate);
			}
		},
	},
	template: `
		<input
			#dateDirective
			[dpDayPicker]="config"
			[displayDate]="displayDate"
			theme="dp-material dp-main"
			id="picker"
			(ngModelChange)="updateDisplayDate($event)"
			[(ngModel)]="selectedDayTime"
		/>
		<p>Date sélectionnée : {{ selectedDayTime }}</p>
	`,
});

export const WithTimePicker = () => ({
	props: {
		selectedDayTime: null,
		displayDate: null,
		config: {
			firstDayOfWeek: 'su',
			monthFormat: 'DD-MM-YYYY',
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
			showSeconds: true,
			showTwentyFourHours: true,
			timeSeparator: ':',
			multipleYearsNavigateBy: 10,
			showMultipleYearsNavigation: false,
			hideInputContainer: false,
			returnedValueType: 'string',
			unSelectOnClick: true,
			hideOnOutsideClick: true,
			numOfMonthRows: 3,
			format: 'DD-MM-YYYY HH:mm:ss',

		},
		updateDisplayDate: function(date: any) {
			if (date && date !== 'Invalid date' && date.length >= 10) {
				this.displayDate = date;
				console.log('Display date updated:', this.displayDate);
			}
		},
	},
	template: `
		<input
			#dateDirective
			[mode]="'daytime'"
			[dpDayPicker]="config"
			[displayDate]="displayDate"
			theme="dp-material dp-main"
			id="picker"
			(ngModelChange)="updateDisplayDate($event)"
			[(ngModel)]="selectedDayTime"
		/>
		<p>Date et heure sélectionnées : {{ selectedDayTime }}</p>
	`,
});

