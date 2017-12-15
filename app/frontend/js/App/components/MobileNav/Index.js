import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _ from 'lodash';
import {
  setShowMobileMenu,
  setModalContentName,
  logout
} from './../../../actions/app.js';
import APP_STYLES from '../../../../css/app.css';

class MobileNav extends Component {
  constructor(props) {
    super(props);
    this.pageClick = this.pageClick.bind(this);
  }

  pageClick(e) {
    if (this.wrapper.contains(e.target) || e.target.id == 'menu-icon') {
      return;
    }
    this.props.setShowMobileMenu(false);
  }

  componentDidMount() {
    if (document.addEventListener) {
      window.addEventListener('mousedown', this.pageClick, false);
    } else {
      document.attachEvent('onmousedown', this.pageClick);
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      window.removeEventListener('mousedown', this.pageClick, false);
    } else {
      document.detachEvent('onmousedown', this.pageClick);
    }
  }

  setModalContentName(val) {
    this.props.setModalContentName(val);
  }

  logout() {
    this.props.logout();
  }

  render() {
    const { app, isIndex, activeTab } = this.props;
    const { locale, currentUser, showMobileMenu } = app;
    let userHtml;
    let LANG_NAV = require('../../../../../locales/' + locale + '/nav');
    let LANG_USER = require('../../../../../locales/' + locale + '/user');
    const mobileMenuClass = cx(
      APP_STYLES['mo-navbar__nav-mobile'],
      APP_STYLES['mo-nav-mobile'],
      showMobileMenu && APP_STYLES['visible']
    );
    if (_.isNull(currentUser)) {
      userHtml = (
        <div className={`${APP_STYLES['mo-nav-column__item']}`}>
          <div
            className={`${APP_STYLES['mo-nav-column__item']} ${APP_STYLES[
              'user-nav'
            ]}`}
          >
            <span
              className={`${APP_STYLES['user-nav__item']} ${APP_STYLES[
                'cursor-pointer'
              ]}`}
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.setModalContentName.bind(this, 'Login')}
            >
              {LANG_USER.login}
            </span>
            <span className={`${APP_STYLES['user-nav__item']}`}>
              &nbsp;/&nbsp;
            </span>
            <span
              className={`${APP_STYLES['user-nav__item']} ${APP_STYLES[
                'cursor-pointer'
              ]}`}
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.setModalContentName.bind(this, 'Signup')}
            >
              {LANG_USER.signup}
            </span>
          </div>
        </div>
      );
    } else {
      userHtml = (
        <div className={`${APP_STYLES['mo-nav-column__item']}`}>
          <div
            className={`${APP_STYLES['mo-nav-column__item']} ${APP_STYLES[
              'user-nav'
            ]}`}
          >
            <span
              className={`${APP_STYLES['user-nav__item']} ${APP_STYLES[
                'cursor-pointer'
              ]}`}
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.setModalContentName.bind(this, 'MyAccount')}
            >
              {currentUser.nickname}
            </span>
            <span className={`${APP_STYLES['user-nav__item']}`}>
              &nbsp;/&nbsp;
            </span>
            <span
              className={`${APP_STYLES['user-nav__item']} ${APP_STYLES[
                'cursor-pointer'
              ]}`}
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.logout.bind(this, false)}
            >
              {LANG_USER.logout}
            </span>
          </div>
        </div>
      );
    }
    return (
      <div className={mobileMenuClass}>
        <div className={`${APP_STYLES['mo-nav-mobile__mask']}`} />
        <div
          className={`${APP_STYLES['nav__left']} ${APP_STYLES['menu']}`}
          ref={ref => (this.wrapper = ref)}
        >
          <div className={`${APP_STYLES['mo-nav-mobile__content']}`}>
            <div className={`${APP_STYLES['mo-nav-mobile__menu-wrapper']}`}>
              <a className={`${APP_STYLES['mo-nav-column__item']}`} href="/">
                <div className={`${APP_STYLES['logo']}`}>
                  <br />
                  <br />
                  <span
                    className={`${APP_STYLES['icon']} icon-edwardxiao2`}
                    style={{ fontSize: '60px' }}
                  />
                </div>
              </a>
              {userHtml}
              <a
                className={
                  !isIndex && activeTab == 'intros'
                    ? `${APP_STYLES['mo-nav-column__item']} ${APP_STYLES[
                        'active'
                      ]}`
                    : `${APP_STYLES['mo-nav-column__item']}`
                }
                href={isIndex ? `#intros` : `/`}
                data-menuanchor="intros"
              >
                <div className={`${APP_STYLES['nav-item-wrapper']}`}>
                  <div className={`${APP_STYLES['mgt-10']}`}>
                    {LANG_NAV.home}
                  </div>
                </div>
              </a>
              <a
                className={
                  !isIndex && activeTab == 'designs'
                    ? `${APP_STYLES['mo-nav-column__item']} ${APP_STYLES[
                        'active'
                      ]}`
                    : `${APP_STYLES['mo-nav-column__item']}`
                }
                href={isIndex ? `#designs` : `/#designs`}
                data-menuanchor="designs"
              >
                <div className={`${APP_STYLES['nav-item-wrapper']}`}>
                  <div className={`${APP_STYLES['mgt-10']}`}>
                    {LANG_NAV.portfolio}
                  </div>
                </div>
              </a>
              <a
                className={
                  !isIndex && activeTab == 'articles'
                    ? `${APP_STYLES['mo-nav-column__item']} ${APP_STYLES[
                        'active'
                      ]}`
                    : `${APP_STYLES['mo-nav-column__item']}`
                }
                href={isIndex ? `#articles` : `/articles`}
                data-menuanchor="articles"
              >
                <div className={`${APP_STYLES['nav-item-wrapper']}`}>
                  <div className={`${APP_STYLES['mgt-10']}`}>
                    {LANG_NAV.article}
                  </div>
                </div>
              </a>
              <a
                className={
                  !isIndex && activeTab == 'contacts'
                    ? `${APP_STYLES['mo-nav-column__item']} ${APP_STYLES[
                        'active'
                      ]}`
                    : `${APP_STYLES['mo-nav-column__item']}`
                }
                href={isIndex ? `#contacts` : `/#contacts`}
                data-menuanchor="contacts"
              >
                <div className={`${APP_STYLES['nav-item-wrapper']}`}>
                  <div className={`${APP_STYLES['mgt-10']}`}>
                    {LANG_NAV.contact}
                  </div>
                </div>
              </a>
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
function mapDispatchToProps(dispatch) {
  return {
    setModalContentName: val => {
      dispatch(setModalContentName(val));
    },
    setShowMobileMenu: val => {
      dispatch(setShowMobileMenu(val));
    },
    logout: val => {
      dispatch(logout(val));
    }
  };
}

MobileNav.contextTypes = {
  router: PropTypes.object
};

MobileNav.propTypes = {
  app: PropTypes.object,
  activeTab: PropTypes.string,
  isIndex: PropTypes.bool,
  setModalContentName: PropTypes.func,
  setShowMobileMenu: PropTypes.func,
  logout: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileNav);
