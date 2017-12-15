import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import ErrorCatcher from './components/ErrorCatcher/Index.js';
import asyncRoute from './asyncRoute';
// import { isClientSide } from '../common/utils.js';
import APP_STYLES from '../../css/app.css';

import { setUser } from '../actions/app.js';
import {
  HOME,
  NOT_FOUND,
  toCamelCase
} from '../consts/index.js';

const getComponentFile = name => require(`./Pages/${toCamelCase(name)(true)}/Index.js`).default;

const getReducerFile = name => require(`../reducers/${toCamelCase(name)()}.js`).default;

const getComponent = (component, reducerList) => asyncRoute(component, reducerList);

const Home = getComponent(getComponentFile(HOME), [getReducerFile(HOME), getReducerFile(NOT_FOUND)]);
const NotFound = getComponent(getComponentFile(NOT_FOUND), [getReducerFile(NOT_FOUND)]);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { locale } = this.props.app;
    return (
      <div className={`${APP_STYLES['routes']}`}>
        <ErrorCatcher history={this.props.history} locale={locale}>
          <Switch>
            <Route exact path={`/`} component={Home} />
            <Route component={NotFound} />
          </Switch>
        </ErrorCatcher>
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return { app };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => {
      dispatch(fetchUser());
    },
    setUser: val => {
      dispatch(setUser(val));
    }
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
