import { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from './toggle.component';

const meta: Meta<ToggleComponent> = {
  title: 'Components/Toggler',
  component: ToggleComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ToggleComponent>;

export const Basic: Story = {
  args: {
    isChecked: false,
  },
};
