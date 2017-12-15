import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isArray } from 'lodash';
import { injectReducers } from '../actions/registry.js';

const moduleDefaultExport = module => module.default || module;

function esModule(module, forceArray) {
  if (isArray(module)) {
    return module.map(moduleDefaultExport);
  }

  const defualted = moduleDefaultExport(module);
  return forceArray ? [defualted] : defualted;
}

export default function asyncRoute(getComponent, reducerList) {
  return class AsyncRoute extends Component {
    static contextTypes = {
      store: PropTypes.shape({
        dispatch: PropTypes.func.isRequired
      })
    };

    static Component = null;

    state = {
      Component: AsyncRoute.Component
    };

    componentWillMount() {
      const Component = (AsyncRoute.Component = getComponent);
      if (reducerList.length) {
        reducerList.map(i => {
          this.context.store.dispatch(
            injectReducers(esModule(i, true))
          );
        });
      }
      this.setState({ Component });
    }

    componentWillUnmount() {
      if (
        this._componentWillUnmountSubject &&
        !this._componentWillUnmountSubject.closed
      ) {
        this._componentWillUnmountSubject.next();
        this._componentWillUnmountSubject.unsubscribe();
      }
    }

    render() {
      const { Component } = this.state;
      return Component ? <Component {...this.props} /> : null;
    }
  };
}
