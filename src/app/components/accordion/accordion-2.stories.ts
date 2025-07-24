import { Meta, moduleMetadata } from '@storybook/angular';
import { Accordion2Component, StopAccordionToggleDirective } from './accordion-2.component';
import { ListComponent, ListItemComponent } from '../list/list.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'Components/Accordion',
  component: Accordion2Component,
  decorators: [
    moduleMetadata({
      imports: [Accordion2Component, CommonModule, StopAccordionToggleDirective, ListComponent, ListItemComponent],
    }),
  ],
} as Meta;

export const SimpleNestedAccordion = () => ({
  props: {
      data: [
    {
      label: '1',
      content: '11',
      children: [
        {
          label: '2',
          children: [
            {
              label: '3',
              content: '33'
            }
          ],
          content: '22'
        }
      ],
    },
    {
      label: '2',
      content: '22',
    }
  ],
  },
  template: `
    <app-accordion-2 *ngFor="let lvl1 of data">
      <div accordion-2-title>{{ lvl1.label }}</div>
        <app-list>
          <app-list-item>
            <div>{{ lvl1.content }}</div>
          </app-list-item>
        </app-list>
        <app-accordion-2 *ngFor="let lvl2 of lvl1.children">
          <div accordion-2-title>{{ lvl2.label }}</div>
          <app-list>
            <app-list-item>
              <div>{{ lvl2.content }}</div>
            </app-list-item>
        </app-list>
          <app-accordion-2 *ngFor="let lvl3 of lvl2.children">
            <div accordion-2-title>{{ lvl3.label }}</div>
            <app-list>
              <app-list-item>
                <div>{{ lvl3.content }}</div>
              </app-list-item>
            </app-list>
          </app-accordion-2>
        </app-accordion-2>
    </app-accordion-2>
  `
});


export const NestedAccordion = () => ({
  props: {
    onParentAlert: () => alert('Alert parent !'),
    onChildAlert: () => alert('Alert enfant !'),
    onBtn1Alert: () => alert('Alert bouton 1 !'),
    onBtn2Alert: () => alert('Alert bouton 2 !'),
    onChildAlert2: () => alert('Alert enfant niveau 2 !'),
    onChildAlert3: () => alert('Alert enfant niveau 3 !'),
  },
  template: `
    <app-accordion-2>
      <div accordion-2-title>niveau 1</div>
      <app-list>
        <app-list-item (itemClick)="onParentAlert()">
          <div style="display: flex; align-items: center; width: 100%; border-radius: 4px; padding: 0.5rem;">
            <span style="flex: 1; cursor:pointer;">Item 1</span>
            <button style="margin-left: 0.5rem;" (click)="$event.stopPropagation(); onBtn1Alert()">Bouton 1</button>
            <button style="margin-left: 0.5rem;" (click)="$event.stopPropagation(); onBtn2Alert()">Bouton 2</button>
          </div>
        </app-list-item>
        <app-list-item (itemClick)="onParentAlert()">
          <div style="display: flex; align-items: center; width: 100%; border-radius: 4px; padding: 0.5rem;">
            <span style="flex: 1; cursor:pointer;">Item 2</span>
            <button style="margin-left: 0.5rem;" (click)="$event.stopPropagation(); onBtn1Alert()">Bouton 1</button>
          </div>
        </app-list-item>
        <app-list-item (itemClick)="onParentAlert()">
          <div style="display: flex; align-items: center; width: 100%; border-radius: 4px; padding: 0.5rem;">
            <span style="flex: 1; cursor:pointer;">Item 3</span>
          </div>
        </app-list-item>
      </app-list>
      <app-accordion-2 (childClick)="onChildAlert2()">
        <div accordion-2-title>niveau 2</div>
        <app-list>
          <app-list-item (itemClick)="onChildAlert()">
            <div style="display: flex; align-items: center; width: 100%; border-radius: 4px; padding: 0.5rem;">
              <span style="flex: 1; cursor:pointer;">Sous-item 1</span>
              <button style="margin-left: 0.5rem;" (click)="$event.stopPropagation(); onBtn1Alert()">Bouton 1</button>
            </div>
          </app-list-item>
        </app-list>
        <app-accordion-2 (childClick)="onChildAlert3()">
          <div accordion-2-title>niveau 3</div>
          <app-list>
            <app-list-item (itemClick)="onChildAlert()">
              <div style="display: flex; align-items: center; width: 100%; border-radius: 4px; padding: 0.5rem;">
                <span style="flex: 1; cursor:pointer;">Niveau 3 - item 1</span>
              </div>
            </app-list-item>
          </app-list>
        </app-accordion-2>
      </app-accordion-2>
    </app-accordion-2>
  `
});