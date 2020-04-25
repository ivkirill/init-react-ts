import React, { Component, Dispatch, SetStateAction } from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { Location } from 'history';
import { AppRoute, AppRouteMapped } from 'routes';
import { matchRoute, isEqualObjects } from 'utils';

interface Props extends RouteComponentProps {
  routesMap: AppRouteMapped[];
  setProgress: Dispatch<SetStateAction<boolean>>;
}

interface State {
  location: Location;
  nextLocation: Location | null;
  needPrefetch: boolean;
  route: AppRoute;
}

class Prefetcher extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { route } = matchRoute(this.props.routesMap, this.props.location);

    this.state = {
      route,
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

    return nextState;
  }

  componentDidMount() {
    const { location } = this.state;

    this.fetchRoute(location);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { needPrefetch, nextLocation } = nextState;

    if (needPrefetch && nextLocation) {
      this.fetchRoute(nextLocation);

      return false;
    }

    if (isEqualObjects(this.props, nextProps) && isEqualObjects(this.state, nextState)) {
      return false;
    }

    return true;
  }

  fetchRoute(nextLocation: Location) {
    const { setProgress, routesMap } = this.props;
    const { route, match } = matchRoute(routesMap, nextLocation);

    setProgress(true);

    const promises = [
      route.module(),
    ];

    if (route.fetch) {
      promises.push(...route.fetch(match));
    }

    Promise
      .all(promises)
      .then((resolve) => {
        const [module] = resolve;

        route.component = module.default;

        this.setState({
          route,
          location: nextLocation,
          nextLocation: null,
          needPrefetch: false,
        });

        setProgress(false);
      })
      .catch((e: Error) => {
        throw e;
      });
  }

  render() {
    const { route, location } = this.state;

    return (
      <Switch location={location}>
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      </Switch>
    );
  }
}

export default withRouter(Prefetcher);
