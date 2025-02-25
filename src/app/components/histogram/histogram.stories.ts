import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { HistogramComponent } from './histogram.component';

const meta: Meta<HistogramComponent> = {
  title: 'Components/Histogram',
  component: HistogramComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    view: { control: 'select' },
    showXAxis: { control: 'boolean' },
    showYAxis: { control: 'boolean' },
    gradient: { control: 'boolean' },
    showLegend: { control: 'boolean' },
    showXAxisLabel: { control: 'boolean' },
    xAxisLabel: { control: 'text' },
    showYAxisLabel: { control: 'boolean' },
    yAxisLabel: { control: 'text' },
    colorScheme: { control: 'select' },
  },
};

export default meta;
type Story = StoryObj<HistogramComponent>;

export const Countries: Story = {
  args: {
    single: [
      { name: 'Foo', value: 8940000 },
      { name: 'USA', value: 5000000 },
      { name: 'France', value: 7200000 },
      { name: 'UK', value: 6200000 },
    ],
    view: [700, 400],
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: 'Country',
    showYAxisLabel: true,
    yAxisLabel: 'Population',
    colorScheme: {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    },
  },
};
