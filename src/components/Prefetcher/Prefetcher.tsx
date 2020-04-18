import React, { Component, Dispatch, SetStateAction } from 'react';
import { Route, Switch, withRouter, RouteComponentProps, matchPath } from 'react-router-dom';
import { Routes } from 'routes';
import { Location } from 'history';
import { routeNames } from 'consts';

interface Props extends RouteComponentProps {
  routes: Routes;
  startNavigate: Dispatch<SetStateAction<boolean>>;
}

interface State {
  location: Location;
  nextLocation: Location | null;
  needPrefetch: boolean;
}

class Prefetcher extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      location: this.props.location,
      nextLocation: this.props.location,
      needPrefetch: false,
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const navigated = nextProps.location.key !== prevState.location.key;
    const nextState = { ...prevState };

    if (navigated) {
      nextState.nextLocation = nextProps.location;
      nextState.needPrefetch = true;
    }

    console.log('getDerivedStateFromProps', {
      navigated,
      nextState,
    });

    return nextState;
  }

  componentDidMount() {
    const { location } = this.state;

    console.log('componentDidMount');

    this.fetchRoute(location);
  }

  shouldComponentUpdate({}, { needPrefetch, nextLocation }: State) {
    if (needPrefetch && nextLocation) {
      this.fetchRoute(nextLocation);

      return false;
    }
    else {
      return true;
    }
  }

  fetchRoute(nextLocation: Location) {
    const { routes, startNavigate } = this.props;

    Object.keys(routes).find((name) => {
      const route = routes[name as routeNames];
      const match = matchPath(nextLocation.pathname, {
        path: route.path,
        exact: route.exact,
      });

      if (match && route.module && route.fetch) {
        console.log('fetchRoute', {
          match,
        });

        startNavigate(true);

        const promises = [
          route.module(),
          ...route.fetch(),
        ];

        Promise.all(promises).then((resolve) => {
          const [module] = resolve;

          console.log(`resolve promises for ${name}`, {
            route,
            resolve,
          });

          route.component = module.default;

          this.setState({
            location: nextLocation,
            nextLocation: null,
            needPrefetch: false,
          });

          startNavigate(false);
        }).catch((e: Error) => {
          throw e;
        });
      }

      return false;
    });
  }

  render() {
    const { routes } = this.props;

    return (
      <Switch location={this.state.location}>
        {Object.keys(routes).map((name, i) => {
          const route = routes[name as routeNames];

          console.log(route);

          return (
            <Route
              key={`route--${i}`}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          );
        })}
      </Switch>
    );
  }
}

export default withRouter(Prefetcher);
