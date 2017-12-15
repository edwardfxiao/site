// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import _ from 'lodash';
// import {
//   changeLocale,
//   setModalContentName,
//   logout
// } from './../../actions/index';

// class Footer extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     if (typeof window !== 'undefined') {
//       require('bootstrap-sass/assets/javascripts/bootstrap/modal.js');
//       require('bootstrap-sass/assets/javascripts/bootstrap/transition.js');
//     }
//   }

//   changeLocale() {
//     let val = this.refs.locale.value;
//     this.props.changeLocale(val);
//   }

//   setModalContentName(val) {
//     this.props.setModalContentName(val);
//   }

//   logout() {
//     this.props.logout();
//   }

//   handleImageLoaded() {}

//   render() {
//     let {
//       // locale,
//       // currentUser,
//       className
//     } = this.props;
//     if (_.isUndefined(className)) {
//       className = '';
//     }
//     // let LANG_GENERAL = require('../../../../../locales/' + locale + '/general');
//     // let LANG_NAV = require('../../../../../locales/' + locale + '/nav');
//     // let LANG_USER = require('../../../../../locales/' + locale + '/user');
//     return (
//       <div className={`footer ${className}`}>
//         <div className="footer-content">
//           <div className="copyright al-center">Copyright © Edward Xiao</div>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   let { locale, currentUser } = state;
//   return {
//     locale,
//     currentUser
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     changeLocale: val => {
//       dispatch(changeLocale(val));
//     },
//     setModalContentName: val => {
//       dispatch(setModalContentName(val));
//     },
//     logout: () => {
//       dispatch(logout());
//     }
//   };
// }

// Footer.contextTypes = {
//   router: PropTypes.object
// };

// Footer.propTypes = {
//   locale: PropTypes.string,
//   className: PropTypes.string,
//   currentUser: PropTypes.object,
//   changeLocale: PropTypes.func,
//   setModalContentName: PropTypes.func,
//   logout: PropTypes.func
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Footer);
