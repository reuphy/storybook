import {UtilsService} from '../services/utils/utils.service';

export const DEFAULT_DEBOUNCE_MS = 500;

export default function debounce(ms: number = DEFAULT_DEBOUNCE_MS) {
  return function (_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function () {
        Object.defineProperty(this, propertyKey, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: UtilsService.debounce(descriptor.value, ms)
        });

        return (this as any)[propertyKey];
      }
    };
  };
}
