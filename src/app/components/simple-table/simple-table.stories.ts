import { Meta, StoryObj } from '@storybook/angular';
import { SimpleTableComponent } from './simple-table.component';

const meta: Meta<SimpleTableComponent> = {
  title: 'Components/SimpleTable',
  component: SimpleTableComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<SimpleTableComponent>;
const simpletableData: {
  Name: string;
  Age: number;
  Occupation: string;
  lastName: string;
  link: string;
  className?: string;
}[] = [
  {
    Name: 'John',
    Age: 30,
    Occupation: 'Developer',
    lastName: 'Doe',
    link: 'https://www.google.com',
    className: 'text-success',
  },
  {
    Name: 'Jane',
    Age: 25,
    Occupation: 'Designer',
    lastName: 'Bishop',
    link: 'https://www.google.com',
    className: 'text-danger',
  },
  {
    Name: 'Jim',
    Age: 35,
    Occupation: 'Product Manager',
    lastName: 'Doe',
    link: 'https://amazone.com',
    className: 'text-warning',
  },
];
export const Basic: Story = {
  args: {
    tableData: simpletableData,
  },
};
