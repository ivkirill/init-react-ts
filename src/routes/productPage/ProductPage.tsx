import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Layout} from 'components';

import { EntityStore } from 'stores';
import { Product } from 'entities';

import s from './ProductPage.scss';

interface Props {
  ProductStore: EntityStore<Product>;
}

@inject('ProductStore')
@observer
class ProductsPage extends PureComponent<Props> {
  render() {
    const { ProductStore } = this.props;

    const { objectId, displayName, createdAt, updatedAt } = ProductStore.item;

    const dateCreate = new Date(createdAt).toLocaleString();
    const dateUpdate = new Date(updatedAt).toLocaleString();

    return (
      <Layout className={s.root}>
        <h1>{`Products ${displayName}`}</h1>

        <h2>{objectId}</h2>

        <p><b>{`create: ${dateCreate}`}</b></p>
        <p><b>{`update: ${dateUpdate}`}</b></p>
      </Layout>
    );
  }
}

export default ProductsPage;
