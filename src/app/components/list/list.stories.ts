import { Meta, moduleMetadata } from '@storybook/angular';
import { ListComponent, ListItemComponent } from './list.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'Components/List',
  component: ListComponent,
  decorators: [
    moduleMetadata({
      imports: [ListComponent, ListItemComponent, CommonModule],
    }),
  ],
} as Meta;

export const CustomList = () => ({
  props: {
    onParentAlert: () => alert('Alert parent !'),
    onBtn1Alert: () => alert('Alert bouton 1 !'),
    onBtn2Alert: () => alert('Alert bouton 2 !'),
  },
  template: `
    <app-list>
      <app-list-item (itemClick)="onParentAlert()">
        <div style="display: flex; align-items: center; width: 100%; border-radius: 4px; padding: 0.5rem;">
          <span style="flex: 1; cursor:pointer;">lorem ypsum</span>
          <button style="margin-left: 0.5rem;" (click)="$event.stopPropagation(); onBtn1Alert()">Bouton 1</button>
          <button style="margin-left: 0.5rem;" (click)="$event.stopPropagation(); onBtn2Alert()">Bouton 2</button>
        </div>
      </app-list-item>
      <app-list-item (itemClick)="onParentAlert()">
        <div style="display: flex; align-items: center; width: 100%; border-radius: 4px; padding: 0.5rem;">
          <span style="flex: 1; cursor:pointer;">item 2</span>
          <button style="margin-left: 0.5rem;" (click)="$event.stopPropagation(); onBtn1Alert()">Bouton 1</button>
        </div>
      </app-list-item>
      <app-list-item (itemClick)="onParentAlert()">
        <div style="display: flex; align-items: center; width: 100%; border-radius: 4px; padding: 0.5rem;">
          <span style="flex: 1; cursor:pointer;">item 3</span>
        </div>
      </app-list-item>
    </app-list>
  `,
});
