import type { Meta, StoryObj } from '@storybook/angular';

import { CsDatePickerComponent } from './cs-date-picker.component';
import { userEvent, within, expect } from '@storybook/test';

const meta: Meta<CsDatePickerComponent> = {
  title: 'Components/cs-date-picker',
  component: CsDatePickerComponent,

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CsDatePickerComponent>;

export const Basic: Story = {
  args: {},
};

// export const AllOpen: Story = {

// };
