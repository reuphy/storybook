import { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar.component';

const meta: Meta<ProgressBarComponent> = {
  title: 'Components/ProgressBar',
  component: ProgressBarComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ProgressBarComponent>;

export const Basic: Story = {
  args: {
    progress: 50,
  },
};


