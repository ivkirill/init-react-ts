import React, { PureComponent, ReactNode } from 'react';
import { inject, observer } from 'mobx-react';

import { RowProps } from 'components';

import { Product } from 'entities';
import { EntityStore } from 'stores';
import { ProductColType } from 'types';

type ProductRowType = Record<ProductColType, ReactNode>;

interface Props extends RowProps {
  ProductStore: EntityStore<Product>;
  cols: ProductColType[];
}

@inject('ProductStore')
@observer
class RowProduct<T> extends PureComponent<Props & T> {
  getRow = (): ProductRowType => {
    const { id, ProductStore } = this.props;

    const product = ProductStore.items[id];

    return {
      id: product.objectId,
      name: product.displayName,
      created: new Date(product.createdAt).toLocaleString(),
      updated: new Date(product.updatedAt).toLocaleString(),
    };
  }

  render() {
    const { className, cols } = this.props;
    const row = this.getRow();

    return (
      <div className={className}>
        {cols.map((name, i) => {
          const key = `order-cell-${i}`;

          return <span data-name={name} key={key}>{row[name]}</span>;
        })}
      </div>
    );
  }
}

export default RowProduct;
