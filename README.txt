previews.js

import { setCompodocJson } from '@storybook/addon-docs/angular';
import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme';
import ibz from '!!style-loader?injectType=lazyStyleTag!css-loader!../public/ibz.css';
import custom from '!!style-loader?injectType=lazyStyleTag!css-loader!../public/custom.css';
import docJson from '../documentation.json';
import 'zone.js';
import { title } from 'process';
setCompodocJson(docJson);

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { story: { inline: true } },
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'About',
        'Structure',
        'Navigation',
        'Forms',
        'Components',
        'Utilities',
        'Blueprints',
      ],
    },
  },
  cssVariables: {
    files: {
      'Theme: IBZ': ibz,
      'Theme: Custom': custom,
    },
    defaultTheme: 'Theme: IBZ',
  },
};

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    return Story();
  },
  cssVariablesTheme,
];
export const tags = ['autodocs'];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      title: 'Color Scheme',
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      showName: true,
    },
  },
};
---------------------
import { Meta, StoryFn } from '@storybook/angular';

const colorsLight = [
  // Neutral
  { name: '$color-black', value: '#141414' },
  { name: '$color-white', value: '#ffffff' },

  // Grey
  { name: '$color-gray-50', value: '#f5f8f9' },
  { name: '$color-gray-100', value: '#edf1f5' },
  { name: '$color-gray-200', value: '#e1e5eb' },
  { name: '$color-gray-300', value: '#d2d7df' },
  { name: '$color-gray-400', value: '#a3a8b2' },
  { name: '$color-gray-500', value: '#868b95' },
  { name: '$color-gray-600', value: '#64666c' },
  // Add more colors...
];

const colorsDark = [
  // Neutral
  { name: '$dark-color-black', value: 'red' },
  { name: '$dark-color-white', value: '#ffffff' },

  // Grey
  { name: '$dark-color-gray-50', value: '#f5f8f9' },
  { name: '$dark-color-gray-100', value: '#edf1f5' },
  { name: '$dark-color-gray-200', value: '#e1e5eb' },
  { name: '$dark-color-gray-300', value: '#d2d7df' },
  { name: '$dark-color-gray-400', value: '#a3a8b2' },
  { name: '$dark-color-gray-500', value: '#868b95' },
  { name: '$dark-color-gray-600', value: '#64666c' },
  // Add more colors...
];

export default {
  title: 'About/Theme',
  tags: ['!autodocs'],
} as Meta;

const Template: StoryFn = (args, { globals }) => {
  // Détecte le thème actuel (light ou dark)
  const currentTheme = globals['theme'] || 'light';

  const colors = currentTheme === 'dark' ? colorsDark : colorsLight;

  return {
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: var(--background-color); color: var(--text-color);">
        <div style="width: 90%; max-width: 800px; overflow-x: auto; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <table style="width: 100%; border-collapse: collapse; text-align: center; font-family: Arial, sans-serif;">
            <thead style="background-color: #f4f4f4; border-bottom: 2px solid #ddd;">
              <tr>
                <th style="padding: 12px; font-weight: bold; border-right: 1px solid #ddd;">Property Name</th>
                <th style="padding: 12px; font-weight: bold; border-right: 1px solid #ddd;">Value</th>
                <th style="padding: 12px; font-weight: bold;">Preview</th>
              </tr>
            </thead>
            <tbody>
              ${colors
                .map(
                  (color) => `
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="padding: 12px; border-right: 1px solid #ddd;">${color.name}</td>
                  <td style="padding: 12px; border-right: 1px solid #ddd;">${color.value}</td>
                  <td style="padding: 12px;">
                    <div style="width: 24px; height: 24px; background-color: ${color.value}; border: 1px solid #ddd; margin: 0 auto; border-radius: 4px;"></div>
                  </td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `,
  };
};

export const Colors = Template.bind({});
