import type { Meta, StoryObj } from '@storybook/angular';
import { NG2DatePickerComponent } from './date-picker.component';
import dayjs from 'dayjs';
import { expect, userEvent, within } from '@storybook/test';

const meta: Meta<NG2DatePickerComponent> = {
  title: 'Components/Ng2DatePicker',
  component: NG2DatePickerComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<NG2DatePickerComponent>;

export const Basic: Story = {
  args: {
    selectedDate: new Date(),
    extraDisabledDates: [dayjs(new Date(2025, 2, 25))],
    disabledWeekDays: [0, 6],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should open the date picker', async () => {
      const datePickerInput = canvas.getByRole('textbox');
      await userEvent.click(datePickerInput);
    });

    await step(
      "should have a dot under the element that contains today's date",
      async () => {
        const today = dayjs().format('DD/MM/YYYY');

        const overlayContainer: Element | null = document.querySelector(
          '.cdk-overlay-container'
        );
        const todayElement: Element | null | undefined =
          overlayContainer?.querySelector(`[data-date="${today}"]`);

        await expect(todayElement?.classList).toContain('date-picker-dot');
      }
    );

    await step(
      "should not have a dot if element does not contains today's date",
      async () => {
        const today = dayjs();
        let notToday =
          today.date() === 1 ? today.add(1, 'day') : today.subtract(1, 'day');
        const notTodayFormatted = notToday.format('DD/MM/YYYY');

        const overlayContainer: Element | null = document.querySelector(
          '.cdk-overlay-container'
        );
        const notTodayElement: Element | null | undefined =
          overlayContainer?.querySelector(`[data-date="${notTodayFormatted}"]`);

        if (notTodayElement) {
          await expect(notTodayElement.getAttribute('data-date')).not.toBe(
            today.format('DD/MM/YYYY')
          );
          await expect(notTodayElement.classList).not.toContain(
            'date-picker-dot'
          );
        } else {
          console.log(
            `Element with data-date="${notTodayFormatted}" not found.`
          );
        }
      }
    );
  },
};
