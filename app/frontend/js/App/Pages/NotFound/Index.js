import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { isClientSide } from '../../../common/utils.js';
// import MobileNav from '../../components/MobileNav/Index';
// import Nav from '../../components/Nav/Index';

import APP_STYLES from '../../../../css/app.css';
import STYLES from '../../../../css/not_found.css';

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  go() {
    window.location = '/';
  }

  render() {
    let { locale } = this.props.app;
    let LANG_MESSAGE = require('../../../../../locales/' + locale + '/message');
    let LANG_ACTION = require('../../../../../locales/' + locale + '/action');
    return (
      <div className={`${APP_STYLES['fullpage-grey-4a']} ${APP_STYLES['page-content']}`}>
        {/*<MobileNav isIndex={false} />*/}
        {/*<Nav isIndex={false} />*/}
        <div className={`${APP_STYLES['core-content']} ${APP_STYLES['no-padding']} ${APP_STYLES['no-margin']} ${APP_STYLES['height-100pc']}`}>
          <div className={`${APP_STYLES['page']} ${APP_STYLES['al-center']} ${APP_STYLES['dp-tbl']} ${APP_STYLES['width-100pc']}`}>
            <div className={`${APP_STYLES['page-404']} ${APP_STYLES['dp-tbl-cel']} ${APP_STYLES['middle']}`}>
              <span className={`${APP_STYLES['icon']} icon_sentiment_dissatisfied`} />
              <div className={`${APP_STYLES['text-404']}`}>404</div>
              <div className={`${APP_STYLES['fts-16']} ${APP_STYLES['mgt-40']} ${APP_STYLES['mgb-10']}`}>{LANG_MESSAGE['not-found-message']}</div>
              <div
                className={`${APP_STYLES['page-404__button']} ${APP_STYLES['my-button']} ${APP_STYLES['my-button--gray-border']}`}
                onClick={this.go.bind(this)}
              >
                {LANG_ACTION['go-back']}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ app }) {
  return {
    app
  };
}

function mapDispatchToProps() {
  return {};
}

NotFound.contextTypes = {
  router: PropTypes.object
};

NotFound.propTypes = {
  locale: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
