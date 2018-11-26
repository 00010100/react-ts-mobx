import * as React from 'react';

import { All, NavBar, Home, Login, Loader } from './components';

import Admin from './components/admin/Admin';
import DevTools from 'mobx-react-devtools';

import ViewStore from './stores/ViewStore';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';

interface AppProps {
  viewStore: ViewStore;
}

interface AppState {}

@observer
class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const { viewStore } = this.props;

    viewStore.firebaseCheckAuth();
  }

  render() {
    const { viewStore } = this.props;
    const { isLoading } = viewStore;

    return (
      <div className={`${isLoading && 'is-loading'}`}>
        {<DevTools />}
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <NavBar viewStore={viewStore} />

            <div className="container-fluid">
              <div className="row">
                <div className="container main-content">
                  <div className="row">
                    {/* Main content - start */}
                    <div className={`col-sm-12`}>
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/all" component={All} />
                        <Route
                          path="/login"
                          render={(routeProps) => <Login {...routeProps} viewStore={viewStore} />}
                        />
                        <Route path="/admin" component={Admin} />
                      </Switch>
                    </div>
                    {/* Main content - end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
