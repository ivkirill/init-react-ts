import React, { Component } from 'react';
import { Layout } from 'components';

import s from './HomePage.scss';

class HomePage extends Component {
  render() {
    return (
      <Layout className={s.root}>
        HomePage
      </Layout>
    );
  }
}

export default HomePage;