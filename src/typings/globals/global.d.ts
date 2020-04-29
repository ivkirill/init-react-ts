
import { Dictionary } from '@interfaces';

declare global {
  export interface Window {
    DEV: Dictionary;
  }

  export const DEV: string;
}
