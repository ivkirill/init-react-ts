import React, { PureComponent, ReactNode } from 'react';
import { inject, observer } from 'mobx-react';

import { RowProps, Link } from 'components';

import { Product } from 'entities';
import { EntityStore } from 'stores';
import { ProductColType } from 'types';
import { routes } from 'routes';
import { routeNames } from 'consts';

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

    const { objectId, displayName, createdAt, updatedAt, stock } = ProductStore.items[id];
    const href = routes[routeNames.product].path;
    const params = { id: objectId };

    return {
      id: (
        <Link to={href} params={params}>
          {objectId}
        </Link>
      ),
      name: displayName,
      stock,
      created: new Date(createdAt).toLocaleString(),
      updated: new Date(updatedAt).toLocaleString(),
    };
  };

  render() {
    const { className, cols } = this.props;
    const row = this.getRow();

    return (
      <div className={className}>
        {cols.map((name, i) => {
          const key = `order-cell-${i}`;

          return (
            <span data-name={name} key={key}>
              {row[name]}
            </span>
          );
        })}
      </div>
    );
  }
}

export default RowProduct;
