import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select } from 'react-inputs-validation';
import _ from 'lodash';
import {
  setLocale,
  setModalContentName,
  setShowMobileMenu,
  logout
} from './../../../actions/app.js';
import APP_STYLES from '../../../../css/app.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.setLocale = this.setLocale.bind(this);
    this.showMobileMenu = this.showMobileMenu.bind(this);
  }

  componentDidMount() {}

  setLocale(val) {
    this.props.setLocale(val);
  }

  showMobileMenu() {
    this.props.setShowMobileMenu(true);
  }

  setModalContentName(val) {
    this.props.setModalContentName(val);
  }

  logout() {
    this.props.logout();
  }

  handleImageLoaded() {}

  render() {
    const { app, isIndex, activeTab, className } = this.props;
    const { locale, currentUser } = app;
    let LANG_GENERAL = require('../../../../../locales/' + locale + '/general');
    let LANG_NAV = require('../../../../../locales/' + locale + '/nav');
    let LANG_USER = require('../../../../../locales/' + locale + '/user');
    let userHtml;
    if (_.isNull(currentUser)) {
      userHtml = (
        <div className={`${APP_STYLES['user-nav__item']}`}>
          <div
            className={`${APP_STYLES['user-nav__item']} ${APP_STYLES[
              'no-mobile-990'
            ]} ${APP_STYLES['cursor-pointer']}`}
            data-toggle="modal"
            data-target="#myModal"
            onClick={this.setModalContentName.bind(this, 'Login')}
          >
            {LANG_USER.login}
          </div>
          <div
            className={`${APP_STYLES['user-nav__item']} ${APP_STYLES[
              'no-mobile-990'
            ]}`}
          >
            &nbsp;/&nbsp;
          </div>
          <div
            className={`${APP_STYLES['user-nav__item']} ${APP_STYLES[
              'no-mobile-990'
            ]} ${APP_STYLES['cursor-pointer']}`}
            data-toggle="modal"
            data-target="#myModal"
            onClick={this.setModalContentName.bind(this, 'Signup')}
          >
            {LANG_USER.signup}
          </div>
        </div>
      );
    } else {
      let avatarImageHtml;
      if (currentUser.avatar != '') {
        avatarImageHtml = (
          <div
            className={`${APP_STYLES['avatar-container']} ${APP_STYLES[
              'dp-tbl-cel'
            ]} ${APP_STYLES['middle']}`}
          >
            <div className={`${APP_STYLES['avatar-holder']}`}>
              <img
                className=""
                src={`${currentUser.avatar}?imageView/1/w/${100}/h/${100}`}
                style={{ width: '100%' }}
                onLoad={this.handleImageLoaded.bind(this)}
              />
            </div>
          </div>
        );
      }
      userHtml = (
        <div
          className={`${APP_STYLES['user-nav__item']} ${APP_STYLES[
            'mo-dropdown'
          ]} ${APP_STYLES['no-mobile-990']}`}
        >
          <div className={`${APP_STYLES['dp-tbl']}`}>
            {avatarImageHtml}
            <div
              className={`${APP_STYLES['dp-tbl-cel']} ${APP_STYLES['middle']}`}
            >
              &nbsp;
            </div>
            <div
              className={`${APP_STYLES['dp-tbl-cel']} ${APP_STYLES['middle']}`}
            >
              {currentUser.nickname}
            </div>
          </div>
          <div className={`${APP_STYLES['mo-dropdown__menu']}`}>
            <div className={`${APP_STYLES['mo-dropdown__container']}`}>
              <div
                className={`${APP_STYLES['mo-dropdown__item']}`}
                data-toggle="modal"
                data-target="#myModal"
                onClick={this.setModalContentName.bind(this, 'MyAccount')}
              >
                {LANG_USER['my-account']}
              </div>
              <div
                className={`${APP_STYLES['mo-dropdown__item']}`}
                onClick={this.logout.bind(this)}
              >
                {LANG_USER.logout}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className={
          className
            ? `${APP_STYLES['nav']} ${className}`
            : `${APP_STYLES['nav']}`
        }
      >
        <div className={`${APP_STYLES['nav__left']} ${APP_STYLES['menu']}`}>
          <span
            id="menu-icon"
            className={`${APP_STYLES[
              'mobile-menu-icon'
            ]} icon_menu ${APP_STYLES['grey-4a']}`}
            aria-hidden="true"
            onClick={this.showMobileMenu}
          />
          <a className={`${APP_STYLES['no-mobile-990']}`} href="/">
            <div className={`${APP_STYLES['logo']}`}>
              <span
                className={`${APP_STYLES['icon']} icon_edwardxiao2`}
                style={{ fontSize: '50px' }}
              />
              <span
                className={`${APP_STYLES['icon']} icon_ac_unit`}
                style={{ fontSize: '50px' }}
              />
              <span
                className={`${APP_STYLES['icon']} icon_firefox`}
                style={{ fontSize: '50px' }}
              />
            </div>
            <div className={`${APP_STYLES['site-name']}`}>
              <span>
                {LANG_GENERAL.name}
              </span>
            </div>
          </a>
          <a
            href={isIndex ? `#intros` : `/`}
            className={
              !isIndex && activeTab == 'intros'
                ? `${APP_STYLES['menu__item']} ${APP_STYLES[
                    'no-mobile-990'
                  ]} ${APP_STYLES['active']}`
                : `${APP_STYLES['menu__item']} ${APP_STYLES['no-mobile-990']}`
            }
            data-menuanchor="intros"
          >
            <div>
              {LANG_NAV.home}
            </div>
          </a>
          <a
            href={isIndex ? `#designs` : `/#designs`}
            className={
              !isIndex && activeTab == 'designs'
                ? `${APP_STYLES['menu__item']} ${APP_STYLES[
                    'no-mobile-990'
                  ]} ${APP_STYLES['active']}`
                : `${APP_STYLES['menu__item']} ${APP_STYLES['no-mobile-990']}`
            }
            data-menuanchor="designs"
          >
            <div>
              {LANG_NAV.portfolio}
            </div>
          </a>
          <a
            href={isIndex ? `#articles` : `/articles`}
            className={
              !isIndex && activeTab == 'articles'
                ? `${APP_STYLES['menu__item']} ${APP_STYLES[
                    'no-mobile-990'
                  ]} ${APP_STYLES['active']}`
                : `${APP_STYLES['menu__item']} ${APP_STYLES['no-mobile-990']}`
            }
            data-menuanchor="articles"
          >
            <div>
              {LANG_NAV.article}
            </div>
          </a>
          <a
            href={isIndex ? `#contacts` : `/#contacts`}
            className={
              !isIndex && activeTab == 'contacts'
                ? `${APP_STYLES['menu__item']} ${APP_STYLES[
                    'no-mobile-990'
                  ]} ${APP_STYLES['active']}`
                : `${APP_STYLES['menu__item']} ${APP_STYLES['no-mobile-990']}`
            }
            data-menuanchor="contacts"
          >
            <div>
              {LANG_NAV.contact}
            </div>
          </a>
        </div>
        <div
          className={`${APP_STYLES['nav__center']} ${APP_STYLES[
            'show-mobile-tbl-cel-990'
          ]}`}
        >
          <a href="/">
            <div className={`${APP_STYLES['site-name']}`}>
              <span>
                {LANG_GENERAL.name}
              </span>
            </div>
          </a>
        </div>
        <div
          className={`${APP_STYLES['nav__right']} ${APP_STYLES['user-nav']}`}
        >
          {userHtml}
          <div
            className={`${APP_STYLES['user-nav__item']} ${APP_STYLES[
              'no-mobile-990'
            ]}`}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div
            className={`${APP_STYLES['user-nav__item']} ${APP_STYLES[
              'input-group'
            ]}`}
            style={{ position: 'relative' }}
          >
            <Select
              value={locale}
              onChange={this.setLocale}
              customStyleSelect={{
                textAlign: 'left',
                fontSize: '14px',
                padding: '4px'
              }}
              customStyleOptionListItem={{ textAlign: 'left', padding: '6px' }}
              optionList={[
                { id: 'zh-CN', name: '简体中文' },
                { id: 'zh-HK', name: '繁體中文' },
                { id: 'en-US', name: 'English' }
              ]}
            />
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
    setLocale: val => {
      dispatch(setLocale(val));
    },
    setModalContentName: val => {
      dispatch(setModalContentName(val));
    },
    setShowMobileMenu: val => {
      dispatch(setShowMobileMenu(val));
    },
    logout: () => {
      dispatch(logout());
    }
  };
}

Nav.contextTypes = {
  router: PropTypes.object
};

Nav.propTypes = {
  app: PropTypes.object,
  activeTab: PropTypes.string,
  className: PropTypes.string,
  isIndex: PropTypes.bool,
  currentUser: PropTypes.object,
  setLocale: PropTypes.func,
  setModalContentName: PropTypes.func,
  setShowMobileMenu: PropTypes.func,
  logout: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
