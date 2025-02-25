import { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { within } from '@storybook/test';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<CheckboxComponent>;

export const Basic: Story = {
  args: {
    checked: false,
    label: 'Checkbox',
  },
};
