import type { Meta, StoryObj } from '@storybook/angular';

import { CardComponent } from './card.component';
import { userEvent, within, expect } from '@storybook/test';
const bootstrapBorders = [
  'border border-primary',
  'border border-secondary',
  'border border-success',
  'border border-danger',
  'border border-warning',
  'border border-info',
  'border border-light',
  'border border-dark',
  'border border-white',
  'shadow-lg',
];
const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <app-card [classNames]="classNames">
          <p>FOO</p>
      </app-card>
    `,
  }),
  argTypes: {
    classNames: {
      options: bootstrapBorders,
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: {
    classNames: 'border border-primary',
  },
  // play: async ({ canvasElement, step }) => {
  //   const canvas = within(canvasElement);
  //   const card = canvas.getByTestId('card');

  //   await step('should have a blue border color', async () => {
  //     await expect(card.className).toBe('border border-primary card');
  //     const borderColor = getComputedStyle(card).borderColor;
  //     await expect(borderColor).toBe('rgb(0, 123, 255)');
  //   });
  // },
};
