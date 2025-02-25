import type { Meta, StoryObj } from '@storybook/angular';

import { AccordionComponent } from './accordion.component';
import { userEvent, within, expect } from '@storybook/test';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,

  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Basic: Story = {
  args: {
    items: [
      {
        title: 'Accordion Item 1',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        isOpen: false,
      },
      {
        title: 'Accordion Item 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        isOpen: false,
      },
      {
        title: 'Accordion Item 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        isOpen: false,
      },
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const accordionItem = canvas.getAllByTestId('accordion-header');
    const icon = canvas.getAllByTestId('icon');

    await step('inital setup', async () => {
      await expect(accordionItem[0].innerText).toContain('Accordion Item 1');
      await expect(icon[0].className).toBe('rotate-up');
      await expect(accordionItem.length).toBe(3);
    });

    await step('should open the first tab', async () => {
      await userEvent.click(accordionItem[0]);
      await expect(icon[0].className).toBe('rotate-down');
    });

    await step('should open and close the last tab', async () => {
      await userEvent.click(accordionItem[2]);
      await userEvent.click(accordionItem[2]);
      await expect(icon[0].className).toBe('rotate-down');
    });
  },
};

export const AllOpen: Story = {
  args: {
    items: [
      {
        title: 'Accordion Item 1',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        isOpen: true,
      },
      {
        title: 'Accordion Item 2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        isOpen: true,
      },
      {
        title: 'Accordion Item 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        isOpen: true,
      },
    ],
  },
};
