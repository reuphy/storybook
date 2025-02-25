import type { Meta, StoryObj } from '@storybook/angular';

import { fn } from '@storybook/test';
import AlertComponent from './alert.component';

export const ActionsData = {
  onClick: fn(),
};

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  args: {
    ...ActionsData,
  },
  argTypes: {
    type: {
      control: 'select',
    },
    icon: {
      control: 'select',
    },
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Default: Story = {
  args: {
    title: 'hello world',
  },
};

export const WithIcon: Story = {
  args: {
    title: 'hello world',
    icon: 'bi-cake2-fill',
  },
};
export const Type: Story = {
  args: {
    title: 'i m a different color',
    type: 'danger',
  },
};
