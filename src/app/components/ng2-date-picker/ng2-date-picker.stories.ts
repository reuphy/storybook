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

        // Log the content of the cdk-overlay-container
        const overlayContainer = document.querySelector(
          '.cdk-overlay-container'
        );

        const todayElement = overlayContainer?.querySelector(
          `[data-date="${today}"]`
        );

        await expect(todayElement?.classList).toContain('date-picker-dot');
      }
    );
  },
};
