import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Layout, Form, Select , Input } from 'components';

import { EntityStore } from 'stores';
import { Product } from 'entities';

import { Dictionary } from 'interfaces';
import s from './ProductPage.scss';


interface Props {
  ProductStore: EntityStore<Product>;
}

@inject('ProductStore')
@observer
class ProductsPage extends PureComponent<Props> {
  onSubmit = async (values: Dictionary) => {
    const { ProductStore } = this.props;
    const { objectId } = ProductStore.item;

    const updated = await ProductStore.update(objectId, { ...values });
    return updated;
  };

  render() {
    const { ProductStore } = this.props;

    const { objectId, displayName, stock, createdAt, updatedAt } = ProductStore.item;

    const dateCreate = new Date(createdAt).toLocaleString();
    const dateUpdate = new Date(updatedAt).toLocaleString();

    const values = {
      displayName,
      stock,
    };

    const options = [{ value: 'East' }, { value: 'West' }, { value: 'South', selected: true }, { value: 'North' }];

    return (
      <Layout className={s.root}>
        <h1>{`Products ${displayName}`}</h1>

        <p>{objectId}</p>

        <p>
          <b>{`create: ${dateCreate}`}</b>
        </p>
        <p>
          <b>{`update: ${dateUpdate}`}</b>
        </p>

        <h2>Edit</h2>

        <Form onSubmit={this.onSubmit} initialValues={values}>
          <Input name="displayName" type="text" required />
          <Select name="stock" options={options} />

          <button type="submit">Submit</button>
        </Form>
      </Layout>
    );
  }
}

export default ProductsPage;
