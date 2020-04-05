import React, { PureComponent, FunctionComponent, ComponentClass } from 'react';

interface Props {
  resolve: () => Promise<any>;
  fallback?: ComponentClass | FunctionComponent;
  fetch?: Promise<any>[];
}

interface State {
  module: FunctionComponent | null,
}

export default class AsyncRoute extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      module: null,
    }
  }

  // after the initial render, wait for module to load and also fetch for initial data if needed
  async componentDidMount() {
    const { resolve, fetch } = this.props;
    const { default: module } = await resolve();

    if (fetch) {
      await Promise.all(fetch);
    }

    this.setState({
      module,
    })
  }

  render() {
    const { fallback } = this.props;
    const { module } = this.state;

    if (module) {
      const ComponentRender = module;

      return <ComponentRender />;
    }

    if (fallback) {
      const ComponentFallback = fallback;

      return <ComponentFallback />;
    }

    return null;
  }
};
