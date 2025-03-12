import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NG2DatePickerComponent } from './date-picker.component';
import dayjs from 'dayjs';

describe('DatePickerComponent', () => {
  let component: NG2DatePickerComponent;
  let fixture: ComponentFixture<NG2DatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NG2DatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NG2DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const today = dayjs();

  function openDatePickerAndGetOverlayContainer(): HTMLElement | null {
    const datePickerElement: HTMLElement = fixture.nativeElement.querySelector(
      '[data-test-id="date-picker"]'
    );
    datePickerElement.click();
    fixture.detectChanges();
    return document.querySelector('.cdk-overlay-container');
  }

  function setInputValue(value: string): void {
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('.dp-picker-input');
    inputElement.value = value;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have a dot under the element that contains today's date", () => {
    const overlayContainerElement = openDatePickerAndGetOverlayContainer();

    const formattedToday = today.format('DD/MM/YYYY');
    const currentDay = overlayContainerElement?.querySelector(
      `[data-date="${formattedToday}"]`
    );
    expect(currentDay?.className).toContain('date-picker-dot');
  });

  it("should not have a dot if element does not contains today's date", () => {
    let notToday =
      today.date() === 1 ? today.add(1, 'day') : today.subtract(1, 'day');

    const overlayContainerElement = openDatePickerAndGetOverlayContainer();
    const formattedNotToday = notToday.format('DD/MM/YYYY');
    const notTodayElement = overlayContainerElement?.querySelector(
      `[data-date="${formattedNotToday}"]`
    );

    expect(notTodayElement?.className).not.toContain('date-picker-dot');
  });

  it('should cross the element if it is disabled', () => {
    component.extraDisabledDates = [dayjs(new Date(2024, 2, 25))];
    setInputValue('01/03/2024');

    const overlayContainerElement = openDatePickerAndGetOverlayContainer();

    const dateElement = overlayContainerElement?.querySelector(
      '[data-date="25/03/2024"]'
    );

    expect(dateElement?.className).toContain('strikethrough-diagonal');
  });

  it('should not cross the element if it is not disabled', () => {
    component.extraDisabledDates = [dayjs(new Date(2024, 2, 25))];
    setInputValue('01/03/2024');

    const overlayContainerElement = openDatePickerAndGetOverlayContainer();

    const dateElement = overlayContainerElement?.querySelector(
      '[data-date="01/03/2024"]'
    );

    expect(dateElement?.className).not.toContain('strikethrough-diagonal');
  });
});
