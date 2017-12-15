// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import Utils from '../../../common/utils';
// import Validator from '../../../common/my_validator';
// let validator = new Validator();

// import {
//   signup,
//   setModalContentName,
//   fetchVerifyCode,
//   changeCaptcha
// } from '../../actions/index';

// class Signup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       counter: 60,
//       nickname: '',
//       role: '',
//       phone: '',
//       email: '',
//       verifyCode: '',
//       password: '',
//       repassword: '',
//       isPhone: true,
//       isSendVerifyCode: false,
//       avatar: '',
//       captchaCode: ''
//       // isUploading: false,
//     };
//   }

//   // componentDidMount(){
//   //   this.initQiniu();
//   // }

//   componentDidUpdate(prevProps) {
//     if (prevProps.isSendVerifyCode && !this.props.isSendVerifyCode) {
//       this.clearTime();
//     }
//   }

//   // initQiniu(){
//   //   var uploader = Qiniu.uploader({
//   //       runtimes: 'html5,flash,html4',      // 上传模式,依次退化
//   //       browse_button: 'pickfiles',         // 上传选择的点选按钮，**必需**
//   //       uptoken_url: '/api/settings/uptoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
//   //       get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
//   //       unique_names: true,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
//   //       domain: __PRELOADED_STATE__.qiniuDomain,     // bucket 域名，下载资源时用到，**必需**
//   //       container: 'container',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
//   //       max_file_size: '100mb',             // 最大文件体积限制
//   //       flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入 flash,相对路径
//   //       max_retries: 3,                     // 上传失败最大重试次数
//   //       dragdrop: true,                     // 开启可拖曳上传
//   //       drop_element: 'container',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
//   //       chunk_size: '4mb',                  // 分块上传时，每块的体积
//   //       auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
//   //       init: {
//   //           // 'FilesAdded': (up, files) => {
//   //           //     plupload.each(files, function(file) {
//   //           //         // 文件添加进队列后,处理相关的事情
//   //           //     });
//   //           // },
//   //           // 'BeforeUpload': (up, file) => {
//   //           //   // 每个文件上传前,处理相关的事情
//   //           // },
//   //           'UploadProgress': (up, file) => {
//   //             // 每个文件上传时,处理相关的事情
//   //             Utils.initSpin('avatar-spin-loader', {
//   //               lines: 9,
//   //               length: 12,
//   //               width: 10,
//   //               radius: 14,
//   //               scale: 0.3,
//   //             });
//   //             // this.setState({
//   //             //   isUploading: true,
//   //             // });
//   //           },
//   //           'FileUploaded': (up, file, info) => {
//   //             // 每个文件上传成功后,处理相关的事情
//   //             // 其中 info 是文件上传成功后，服务端返回的json，形式如
//   //             // {
//   //             //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
//   //             //    "key": "gogopher.jpg"
//   //             //  }
//   //             // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
//   //             var domain = `http://${__PRELOADED_STATE__.qiniuDomain}/`;
//   //             var res = JSON.parse(info);
//   //             var sourceLink = domain + res.key; //获取上传成功后的文件的Url
//   //             // this.setState({
//   //             //   avatar: `${sourceLink}`,
//   //             //   isUploading: false
//   //             // });
//   //           },
//   //           // 'Error': (up, err, errTip) => {
//   //           //        //上传出错时,处理相关的事情
//   //           // },
//   //           // 'UploadComplete': () => {
//   //           //        //队列文件处理完毕后,处理相关的事情
//   //           // },
//   //       }
//   //   });
//   // }

//   createCaptcha() {
//     return { __html: this.props.captcha };
//   }

//   changeCaptcha() {
//     this.props.changeCaptcha();
//   }

//   setCaptchaCode(e) {
//     this.removeErrorMessage(e.target.id);
//     let captchaCode = this.refs.captchaCode.value;
//     this.setState({ captchaCode });
//   }

//   setAvatar() {
//     let avatar = this.refs.avatar.value;
//     this.setState({ avatar });
//   }

//   setVerifyCode() {
//     let verifyCode = this.refs.verifyCode.value;
//     this.setState({ verifyCode });
//   }

//   setIsSendVerifyCode(val) {
//     this.setState({ isSendVerifyCode: val });
//   }

//   setNickname(e) {
//     this.removeErrorMessage(e.target.id);
//     let nickname = this.refs.nickname.value;
//     this.setState({ nickname });
//   }

//   setPhone(e) {
//     this.removeErrorMessage(e.target.id);
//     let phone = this.refs.phone.value;
//     this.setState({ phone });
//   }

//   setIsPhone(val) {
//     this.removeErrorMessage('phone');
//     this.removeErrorMessage('email');
//     this.setState({ isPhone: val });
//   }

//   setEmail(e) {
//     this.removeErrorMessage(e.target.id);
//     let email = this.refs.email.value;
//     this.setState({ email });
//   }

//   setPassword(e) {
//     this.removeErrorMessage(e.target.id);
//     this.removeErrorMessage('repassword');
//     let password = this.refs.password.value;
//     this.setState({ password });
//   }

//   setRepassword(e) {
//     this.removeErrorMessage(e.target.id);
//     let repassword = this.refs.repassword.value;
//     this.setState({ repassword });
//   }

//   setModalContentName(val) {
//     this.props.setModalContentName(val);
//   }

//   fetchVerifyCode() {
//     let $el;
//     if (this.state.isPhone) {
//       $el = $('#phone');
//     } else {
//       $el = $('#email');
//     }
//     if (validator.validate($el)) {
//       this.timer();
//       this.setIsSendVerifyCode(true);
//       this.fetchVerifyCodeApi(this.state.username)
//         .then(res => {
//           if (res.code === 0) {
//             // Utils.stopSpin('spin-loader');
//           } else {
//             if (res.msg) {
//               if (this.state.isPhone) {
//                 $el = $('#phone');
//               } else {
//                 $el = $('#email');
//               }
//               if (!$el.parent().siblings('.my-validator-message').length) {
//                 validator.createMessage($el.parent(), res.msg, 'error');
//               }
//             }
//           }
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     }
//   }

//   fetchVerifyCodeApi(user) {
//     return new Promise((resolve, reject) => {
//       $.ajax({
//         url: '/api/users/send-verify-code',
//         data: { user },
//         type: 'post',
//         success: data => {
//           resolve(data);
//         },
//         error: error => {
//           reject(error);
//         }
//       });
//     });
//   }

//   timer() {
//     let counter = this.state.counter;
//     this.time = setInterval(() => {
//       counter--;
//       if (counter < 0) {
//         this.clearTime();
//       } else {
//         this.setState({ counter });
//       }
//     }, 1000);
//   }

//   clearTime() {
//     this.setState({ counter: 60 });
//     clearInterval(this.time);
//     this.props.setIsSendVerifyCode(false);
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

//   signup(e) {
//     if (validator.isValidForm($('#signup'))) {
//       let {
//         nickname,
//         role,
//         phone,
//         email,
//         verifyCode,
//         password,
//         avatar,
//         captchaCode
//       } = this.state;
//       this.props.signup(
//         '',
//         nickname,
//         role,
//         phone,
//         email,
//         verifyCode,
//         password,
//         avatar,
//         captchaCode
//       );
//     }
//     e.preventDefault();
//   }

//   handleImageLoaded() {
//     Utils.stopSpin('avatar-spin-loader');
//   }

//   render() {
//     let { locale, captcha } = this.props;
//     let {
//       counter,
//       nickname,
//       phone,
//       email,
//       // password,
//       // repassword,
//       isPhone,
//       verifyCode,
//       isSendVerifyCode,
//       avatar,
//       captchaCode
//       // isUploading,
//     } = this.state;
//     let LANG_USER = require('../../../../../locales/' + locale + '/user');
//     let phoneHtml;
//     let emailHtml;
//     let methodHtml;
//     if (isPhone) {
//       phoneHtml = (
//         <div className="input-group" style={{ width: '75%' }}>
//           <span className="input-title">
//             {LANG_USER['phone']}
//           </span>
//           <input
//             type="text"
//             id="phone"
//             ref="phone"
//             className="form-control input-sm"
//             value={phone}
//             data-my-validator="true"
//             data-my-validator-required="true"
//             data-my-validator-name=""
//             data-my-validator-type="number"
//             placeholder={LANG_USER.phone}
//             onBlur={this.onBlur.bind(this)}
//             style={{ float: 'none', display: 'inline-block' }}
//             onChange={this.setPhone.bind(this)}
//             autoComplete="off"
//           />
//         </div>
//       );
//       methodHtml = (
//         <div
//           className="verify-method"
//           onClick={this.setIsPhone.bind(this, false)}
//         >
//           {LANG_USER['use']}
//           {LANG_USER['email']}
//         </div>
//       );
//     } else {
//       emailHtml = (
//         <div className="input-group" style={{ width: '75%' }}>
//           <span className="input-title">
//             {LANG_USER['email']}
//           </span>
//           <input
//             type="text"
//             id="email"
//             ref="email"
//             className="form-control input-sm"
//             value={email}
//             data-my-validator="true"
//             data-my-validator-required="true"
//             data-my-validator-name=""
//             data-my-validator-type="email"
//             placeholder={LANG_USER.email}
//             onBlur={this.onBlur.bind(this)}
//             style={{ float: 'none', display: 'inline-block' }}
//             onChange={this.setEmail.bind(this)}
//             autoComplete="off"
//           />
//         </div>
//       );
//       methodHtml = (
//         <div
//           className="verify-method"
//           onClick={this.setIsPhone.bind(this, true)}
//         >
//           {LANG_USER['use']}
//           {LANG_USER['phone']}
//         </div>
//       );
//     }
//     let verifyCodeHtml = (
//       <div className="row-wrapper">
//         <div className="input-group" style={{ width: '48%' }}>
//           <span className="input-title">
//             {LANG_USER['verify-code']}
//           </span>
//           <input
//             type="text"
//             id="verify-code"
//             ref="verify-code"
//             className="form-control input-sm"
//             value={verifyCode}
//             data-my-validator="true"
//             data-my-validator-required="true"
//             data-my-validator-name=""
//             data-my-validator-length="6"
//             data-my-validator-type="number"
//             onBlur={this.onBlur.bind(this)}
//             style={{ float: 'none', display: 'inline-block' }}
//             onChange={this.setVerifyCode.bind(this)}
//             autoComplete="off"
//           />
//         </div>
//         <div
//           className={
//             !isSendVerifyCode
//               ? `fetch-verify-code my-button my-button--gray-border`
//               : `fetch-verify-code my-button my-button--gray-border disabled`
//           }
//           onClick={!isSendVerifyCode ? this.fetchVerifyCode.bind(this) : ``}
//         >
//           <div className="spin-loader" id="verify-code-spin-loader" />
//           {!isSendVerifyCode
//             ? LANG_USER['fetch-verify-code']
//             : `${counter}s${LANG_USER['re-fetch-verify-code']}`}
//         </div>
//       </div>
//     );
//     // TODO: when I have money;
//     verifyCodeHtml = '';
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
//               autoComplete="off"
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
//     // let avatarHtml;
//     // let avatarImageHtml;
//     // let previewClass;
//     // let cameraHtml = (<div className="camera-mask"><span className="icon icon-camera-alt"></span></div>);
//     // if (!isUploading && avatar != ''){
//     // avatarImageHtml = (<img className="" src={`${avatar}?imageView/1/w/${100}/h/${100}`} style={{'width':'100%'}} onLoad={this.handleImageLoaded.bind(this)}/>);
//     // previewClass = 'preview';
//     // }
//     {
//       /*    avatarHtml = (
//       <div className={`avatar-holder ${previewClass}`}>
//         <div className="spin-loader" id="avatar-spin-loader" style={{'zIndex':'999'}}></div>
//         {avatarImageHtml}
//         {cameraHtml}
//       </div>
//     );*/
//     }
//     return (
//       <div className="modal-content">
//         <div className="modal-header">
//           <span className="modal-title" id="exampleModalLabel">
//             {LANG_USER.signup}
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
//           <form
//             className="signup"
//             id="signup"
//             onSubmit={this.signup.bind(this)}
//             autoComplete="off"
//           >
//             <div className="input-wapper">
//               {/*<div id="container" className="avatar-container">
//                               <div className="avatar-picker" id="pickfiles">
//                                 {avatarHtml}
//                               </div>
//                             </div>*/}
//               <div className="row-wrapper">
//                 <div className="input-group width-100pc">
//                   <span className="input-title">
//                     {LANG_USER['nickname']}
//                   </span>
//                   <input
//                     type="text"
//                     id="nickname"
//                     ref="nickname"
//                     className="form-control input-sm"
//                     value={nickname}
//                     data-my-validator="true"
//                     data-my-validator-required="true"
//                     data-my-validator-name=""
//                     data-my-validator-type="text"
//                     placeholder={LANG_USER.nickname}
//                     onBlur={this.onBlur.bind(this)}
//                     style={{ float: 'none', display: 'inline-block' }}
//                     onChange={this.setNickname.bind(this)}
//                     autoComplete="off"
//                   />
//                 </div>
//               </div>
//               <div className="row-wrapper">
//                 {phoneHtml}
//                 {emailHtml}
//                 {methodHtml}
//               </div>
//               {verifyCodeHtml}
//               <div className="row-wrapper">
//                 <div className="input-group width-100pc">
//                   <span className="input-title">
//                     {LANG_USER['password']}
//                   </span>
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
//                     placeholder={LANG_USER['password']}
//                     onBlur={this.onBlur.bind(this)}
//                     style={{ float: 'none', display: 'inline-block' }}
//                     onChange={this.setPassword.bind(this)}
//                     autoComplete="off"
//                   />
//                 </div>
//               </div>
//               <div className="row-wrapper">
//                 <div className="input-group width-100pc">
//                   <span className="input-title">
//                     {LANG_USER['repeat-password']}
//                   </span>
//                   <input
//                     type="password"
//                     id="repassword"
//                     ref="repassword"
//                     className="form-control input-sm"
//                     data-my-validator="true"
//                     data-my-validator-required="true"
//                     data-my-validator-name={LANG_USER['passwords']}
//                     data-my-validator-min-length="6"
//                     data-my-validator-max-length="20"
//                     data-my-validator-type="password"
//                     placeholder={LANG_USER['password']}
//                     onBlur={this.onBlur.bind(this)}
//                     data-my-validator-compare-id="password"
//                     style={{ float: 'none', display: 'inline-block' }}
//                     onChange={this.setRepassword.bind(this)}
//                     autoComplete="off"
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
//             className="my-button my-button--red width-100pc"
//             onClick={this.signup.bind(this)}
//           >
//             {LANG_USER.signup}
//           </div>
//           <div className="height-15" />
//           <div className="border-h" />
//           <div className="height-15" />
//           <div
//             className="my-button my-button--blue width-100pc"
//             onClick={this.setModalContentName.bind(this, 'Login')}
//           >
//             {LANG_USER.login}
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
//     signup: (
//       id,
//       nickname,
//       role,
//       phone,
//       email,
//       verifyCode,
//       password,
//       avatar,
//       captchaCode
//     ) => {
//       dispatch(
//         signup(
//           id,
//           nickname,
//           role,
//           phone,
//           email,
//           verifyCode,
//           password,
//           avatar,
//           captchaCode
//         )
//       );
//     },
//     setModalContentName: val => {
//       dispatch(setModalContentName(val));
//     },
//     changeCaptcha: () => {
//       dispatch(changeCaptcha());
//     }
//   };
// }

// Signup.contextTypes = {
//   router: PropTypes.object
// };

// Signup.propTypes = {
//   locale: PropTypes.string,
//   isSendVerifyCode: PropTypes.bool,
//   captcha: PropTypes.string,
//   signup: PropTypes.func,
//   setModalContentName: PropTypes.func,
//   changeCaptcha: PropTypes.func,
//   setIsSendVerifyCode: PropTypes.func
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Signup);
