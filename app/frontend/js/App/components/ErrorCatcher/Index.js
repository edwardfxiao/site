import React, { Component } from 'react';
import PropTypes from 'prop-types';

const sendToErrorReporting = (err, info) => {
  return { err, info };
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
    this.goToHome = this.goToHome.bind(this);
  }
  go(path) {
    this.props.history.push(path);
  }
  goToHome() {
    this.go('/');
    this.setState(state => ({ ...state, hasError: false }));
  }
  componentDidCatch(err, info) {
    this.setState(state => ({ ...state, hasError: true }));
    sendToErrorReporting(err, info);
  }
  render() {
    let { locale } = this.props;
    let LANG_MESSAGE = require('../../../../../locales/' + locale + '/message');
    let LANG_ACTION = require('../../../../../locales/' + locale + '/action');
    if (this.state.hasError) {
      return (
        <div>
          <div>{LANG_MESSAGE['crash']}</div>
          <div onClick={this.goToHome}>{LANG_ACTION['go-back']}</div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

Index.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

export default Index;
