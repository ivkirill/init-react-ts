import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Table, RowProduct } from 'components';

import { EntityStore } from 'stores';
import { Product } from 'entities';
import { PRODUCT_TABLE_COLS_MAP } from 'consts';

import s from './ProductsPage.scss';

interface Props {
  ProductStore: EntityStore<Product>;
}

const headers = PRODUCT_TABLE_COLS_MAP.map((name: string) => ({
  name,
  value: name,
}));

@inject('ProductStore')
@observer
class ProductsPage extends PureComponent<Props> {
  render() {
    const { ProductStore } = this.props;
    const ids = ProductStore.lists['all'];

    return (
      <Layout className={s.root}>
        <h1>Products</h1>

        <Table
          data={ids}
          headers={headers}
          cols={PRODUCT_TABLE_COLS_MAP}
          className={s.productsTable}
          classNameRow={s.row}
          componentRow={RowProduct}
        />
      </Layout>
    );
  }
}

export default ProductsPage;
