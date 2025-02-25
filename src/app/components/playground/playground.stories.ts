import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { PlaygroundComponent } from './playground.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<PlaygroundComponent> = {
  title: 'Playground',
  component: PlaygroundComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;

type Story = StoryObj<PlaygroundComponent>;
// how to hide controls and docs
export const Components: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true, expanded: false },
    docs: { hideNoControlsWarning: true },
  },
};
