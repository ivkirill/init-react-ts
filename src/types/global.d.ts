import { Heap } from 'stores';

declare global {
  export interface Window {
    DEV: {
      heap: Heap
    };
  }

  export const __DEV__: string;
}
