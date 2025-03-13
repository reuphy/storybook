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

export const DotedSphereUnderTodaysDate: Story = {
  args: {},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "should have a dot under the element that contains today's date",
      async () => {
        const datePickerInput = canvas.getByRole('textbox');
        await userEvent.click(datePickerInput);

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
        const datePickerInput = canvas.getByRole('textbox');
        await userEvent.type(datePickerInput, '01/03/2024');
        await userEvent.click(datePickerInput);
        const overlayContainer: Element | null = document.querySelector(
          '.cdk-overlay-container'
        );
        const dateElement: Element | null | undefined =
          overlayContainer?.querySelector('[data-date="01/03/2024"]');

        await expect(dateElement?.classList).not.toContain('date-picker-dot');
      }
    );
  },
};

export const DisableWeekends: Story = {
  args: {
    disabledWeekDays: [0, 6], // 0 = Sunday, 6 = Saturday
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should cross the weekends elements as they are disabled',
      async () => {
        const datePickerInput = canvas.getByRole('textbox');
        await userEvent.click(datePickerInput);

        const overlayContainer: Element | null = document.querySelector(
          '.cdk-overlay-container'
        );

        const saturday = dayjs().day(6).format('DD/MM/YYYY');
        const sunday = dayjs().day(0).format('DD/MM/YYYY');

        const saturdayElement: Element | null | undefined =
          overlayContainer?.querySelector(`[data-date="${saturday}"]`);
        const sundayElement: Element | null | undefined =
          overlayContainer?.querySelector(`[data-date="${sunday}"]`);

        await expect(saturdayElement?.classList).toContain(
          'strikethrough-diagonal'
        );
        await expect(sundayElement?.classList).toContain(
          'strikethrough-diagonal'
        );
      }
    );
  },
};

export const CrossDisabledDates: Story = {
  args: {
    extraDisabledDates: [dayjs(new Date(2024, 2, 25))],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should cross "25/03/2024" as it is disabled', async () => {
      const datePickerInput = canvas.getByRole('textbox');
      await userEvent.type(datePickerInput, '01/03/2024');
      await userEvent.click(datePickerInput);

      const overlayContainer: Element | null = document.querySelector(
        '.cdk-overlay-container'
      );
      const dateElement: Element | null | undefined =
        overlayContainer?.querySelector('[data-date="25/03/2024"]');

      await expect(dateElement?.classList).toContain('strikethrough-diagonal');
    });

    await step('should not cross "14/03/2024" as it is not disabled', async () => {
      const overlayContainer: Element | null = document.querySelector(
        '.cdk-overlay-container'
      );
      const dateElement: Element | null | undefined =
        overlayContainer?.querySelector('[data-date="14/03/2024"]');

      await expect(dateElement?.classList).not.toContain('strikethrough-diagonal');
    });
  },
};
