import React, { PureComponent, FunctionComponent, ReactElement } from 'react';

interface Props {
  resolve: () => Promise<any>;
  fallback?: ReactElement;
  fetch?: Promise<any>[];
}

interface State {
  component: FunctionComponent | null;
}

// Usage for simple AsyncRoute

// export default () => {
//   const fetch = [
//     ProductStore.fetchList(),
//   ];

//   return (
//     <AsyncRoute fallback={<Loader text="product" />} resolve={ProductsPage} fetch={fetch} />
//   );
// };

export default class AsyncRoute extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      component: null,
    };
  }

  // after the initial render, wait for module to load and also fetch for initial data if needed
  async getInitialProps() {
    const { resolve, fetch } = this.props;
    const { default: component } = await resolve();

    if (fetch) {
      await Promise.all(fetch);
    }

    this.setState({
      component,
    });
  }

  render() {
    const { fallback } = this.props;
    const { component } = this.state;

    if (component) {
      return React.createElement(component);
    }

    if (fallback) {
      return fallback;
    }

    return <div />;
  }
}
