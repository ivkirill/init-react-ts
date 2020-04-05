import React, { PureComponent, FunctionComponent } from 'react';

interface Props {
  resolve: () => Promise<any>;
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

  // after the initial render, wait for module to load
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
    const { module } = this.state;

    if (module != null) {
      const ComponentRender = module;

      return <ComponentRender />;
    }

    return <div>Loading</div>
  }
};
