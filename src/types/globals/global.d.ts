
import { Dictionary } from 'interfaces';

declare global {
  export interface Window {
    DEV: Dictionary;
  }

  export const __DEV__: string;
}
