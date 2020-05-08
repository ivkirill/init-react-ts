import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Table } from '@components';;

import { EntityStore } from '@stores';
import { Product } from '@entities';
import { GetRowDataProps, ModelId } from '@interfaces';
import { PRODUCT_TABLE_COLS_MAP, PRODUCT_TABLE_COLS } from '@constants';

type ColsType = keyof typeof PRODUCT_TABLE_COLS;

import s from './ProductsPage.scss';

interface Props {
  ProductStore: EntityStore<Product>;
}

const getProductHeaders = (name: string) => ({
  name,
  value: name,
});

@inject('ProductStore')
@observer
class ProductsPage extends PureComponent<Props> {

  getProductRowData = ({ id }: GetRowDataProps) => {
    const { ProductStore } = this.props;
    const data = ProductStore.items[id];
    const { displayName, stock, createdAt, updatedAt } = data;

    return {
      id,
      name: displayName,
      stock,
      created: createdAt,
      updated: updatedAt,
    };
  };

  render() {
    const { ProductStore } = this.props;
    const ids: ModelId[] = ProductStore.lists.all;

    return (
      <Layout className={s.root}>
        <h1>Products</h1>

        <Table<ColsType>
          ids={ids}
          cols={PRODUCT_TABLE_COLS_MAP}
          getHeader={getProductHeaders}
          getRowData={this.getProductRowData}
          className={s.productsTable}
          classNameRow={s.row}
        />
      </Layout>
    );
  }
}

export default ProductsPage;
