import { mapEnum } from '@utils';

export enum PRODUCT_TABLE_COLS {
  id,
  name,
  stock,
  created,
  updated,
}

export const PRODUCT_TABLE_COLS_MAP = mapEnum(PRODUCT_TABLE_COLS);
