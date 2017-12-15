// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import Validator from '../../../common/my_validator';
// let validator = new Validator();

// import { login, setModalContentName, changeCaptcha } from '../../actions/index';

// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//       captchaCode: ''
//     };
//   }

//   setUsername(e) {
//     this.removeErrorMessage(e.target.id);
//     let username = this.refs.username.value;
//     this.setState({ username });
//   }

//   setPassword(e) {
//     this.removeErrorMessage(e.target.id);
//     let password = this.refs.password.value;
//     this.setState({ password });
//   }

//   setModalContentName(val) {
//     this.props.setModalContentName(val);
//   }

//   setCaptchaCode(e) {
//     this.removeErrorMessage(e.target.id);
//     let captchaCode = this.refs.captchaCode.value;
//     this.setState({ captchaCode });
//   }

//   login(e) {
//     if (validator.isValidForm($('#login'))) {
//       let { username, password, captchaCode } = this.state;
//       this.props.login(username, password, captchaCode);
//     }
//     e.preventDefault();
//   }

//   createCaptcha() {
//     return { __html: this.props.captcha };
//   }

//   changeCaptcha() {
//     this.props.changeCaptcha();
//   }

//   removeErrorMessage(id) {
//     validator.removeValidate($('#' + id));
//   }

//   onBlur(e) {
//     validator.validate(
//       $('#' + e.target.id),
//       e.target.dataset.myValidatorName,
//       this.props.locale
//     );
//   }

//   render() {
//     let { locale, captcha } = this.props;
//     let {
//       username,
//       // password,
//       captchaCode
//     } = this.state;
//     let LANG_USER = require('../../../../../locales/' + locale + '/user');
//     let captchaHtml;
//     if (captcha != '') {
//       captchaHtml = (
//         <div className="row-wrapper">
//           <div className="input-group" style={{ width: '48%' }}>
//             <input
//               type="text"
//               id="captchaCode"
//               ref="captchaCode"
//               className="form-control input-sm"
//               value={captchaCode}
//               data-my-validator="true"
//               data-my-validator-required="true"
//               data-my-validator-name=""
//               data-my-validator-type="text"
//               style={{ float: 'none', display: 'inline-block' }}
//               onBlur={this.onBlur.bind(this)}
//               onChange={this.setCaptchaCode.bind(this)}
//             />
//           </div>
//           <div
//             className="fetch-captcha-code"
//             onClick={this.changeCaptcha.bind(this)}
//             dangerouslySetInnerHTML={this.createCaptcha()}
//           />
//         </div>
//       );
//     }
//     return (
//       <div className="modal-content">
//         <div className="modal-header">
//           <span className="modal-title" id="exampleModalLabel">
//             {LANG_USER.login}
//           </span>
//           <button
//             type="button"
//             className="close"
//             data-dismiss="modal"
//             aria-label="Close"
//           >
//             <span aria-hidden="true">&times;</span>
//           </button>
//         </div>
//         <div className="modal-body">
//           <form className="login" id="login" onSubmit={this.login.bind(this)}>
//             <div className="input-wapper">
//               <div className="row-wrapper">
//                 <div className="input-group width-100pc">
//                   <input
//                     type="text"
//                     id="username"
//                     ref="username"
//                     className="form-control input-sm"
//                     value={username}
//                     data-my-validator="true"
//                     data-my-validator-required="true"
//                     data-my-validator-name=""
//                     data-my-validator-type="text"
//                     placeholder={`${LANG_USER.username}/${LANG_USER.phone}/${LANG_USER.email}`}
//                     style={{ float: 'none', display: 'inline-block' }}
//                     onBlur={this.onBlur.bind(this)}
//                     onChange={this.setUsername.bind(this)}
//                   />
//                 </div>
//               </div>
//               <div className="row-wrapper">
//                 <div className="input-group width-100pc">
//                   <input
//                     type="password"
//                     id="password"
//                     ref="password"
//                     className="form-control input-sm"
//                     data-my-validator="true"
//                     data-my-validator-required="true"
//                     data-my-validator-name=""
//                     data-my-validator-min-length="6"
//                     data-my-validator-max-length="20"
//                     data-my-validator-type="password"
//                     placeholder={LANG_USER.password}
//                     style={{ float: 'none', display: 'inline-block' }}
//                     onBlur={this.onBlur.bind(this)}
//                     onChange={this.setPassword.bind(this)}
//                   />
//                 </div>
//               </div>
//               {captchaHtml}
//             </div>
//             <input type="submit" className="hidden" />
//           </form>
//         </div>
//         <div className="modal-footer">
//           <div
//             className="my-button my-button--blue width-100pc"
//             onClick={this.login.bind(this)}
//           >
//             {LANG_USER.login}
//           </div>
//           <div className="height-15" />
//           <div className="border-h" />
//           <div className="height-15" />
//           <div
//             className="my-button my-button--red width-100pc"
//             onClick={this.setModalContentName.bind(this, 'Signup')}
//           >
//             {LANG_USER.signup}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   let { locale, captcha } = state;
//   return {
//     locale,
//     captcha
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     login: (username, password, captchaCode) => {
//       dispatch(login(username, password, captchaCode));
//     },
//     setModalContentName: val => {
//       dispatch(setModalContentName(val));
//     },
//     changeCaptcha: () => {
//       dispatch(changeCaptcha());
//     }
//   };
// }

// Login.contextTypes = {
//   router: PropTypes.object
// };

// Login.propTypes = {
//   locale: PropTypes.string,
//   captcha: PropTypes.string,
//   login: PropTypes.func,
//   setModalContentName: PropTypes.func,
//   changeCaptcha: PropTypes.func
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
