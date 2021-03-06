import * as React from 'react';
import ViewStore from '../stores/ViewStore';
import { login } from '../utils/firebase';
import { observer } from 'mobx-react';

interface LoginProps {
  viewStore: ViewStore;
  history: any;
}

@observer
class Login extends React.Component<LoginProps, any> {
  email: HTMLInputElement;
  pw: HTMLInputElement;

  handleSubmit = (e) => {
    e.preventDefault();
    const { viewStore } = this.props;

    login(this.email.value, this.pw.value)
      .then(() => {
        this.props.history.push('/all');
        viewStore.firebaseCheckAuth();
      })
      .catch((error) => {
        viewStore.logError(error.message);
      });
  };

  render() {
    const { errorMessage } = this.props.viewStore;

    return (
      <div id="login-form" className="panel panel-info">
        <div className="panel-heading">
          <div className="panel-title">Sign In</div>
        </div>

        <div className="panel-body">
          <form id="loginform" className="form" role="form" onSubmit={this.handleSubmit}>
            {errorMessage !== '' && (
              <div className="col-sm-12">
                <div className="row form-group">
                  <div id="login-alert" className="alert alert-danger">
                    {errorMessage}
                  </div>
                </div>
              </div>
            )}

            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  ref={(input) => {
                    this.email = input;
                  }}
                />
              </div>
            </div>

            <div className="col-sm-12">
              <div className="form-group">
                <label htmlFor="pw">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="pw"
                  placeholder="Password"
                  ref={(input) => {
                    this.pw = input;
                  }}
                />
              </div>
            </div>

            <div className="col-sm-12">
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
