import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import STYLES from './styles.css';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { show: props.show };
    this.pageClick = this.pageClick.bind(this);
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.show != this.state.show) {
      this.toggleShow(nextProps.show);
    }
  }

  pageClick(e) {
    if (this.wrapper.contains(e.target)) {
      return;
    }
    this.setState({
      show: false
    });
  }

  onClose() {
    const { onClose } = this.prosp;
    onClose && onClose();
  }

  onOpen() {
    const { onOpen } = this.prosp;
    onOpen && onOpen();
  }

  toggleShow(show) {
    this.setState({ show });
  }

  render() {
    let { show } = this.state;
    let { content, classNameMask, classNameWrapper, customStyleMask, customStyleWrapper } = this.props;
    let modalMaskClass = cx(classNameMask, show && STYLES['visible'], STYLES['modal-mask']);
    let modalWrapperClass = cx(classNameWrapper || STYLES['modal-wrapper'], show && STYLES['visible'], show && classNameWrapperShow);
    return (
      <div className={`${modalMaskClass}`} style={customStyleMask}>
        <div className={`${modalWrapperClass}`} ref={ref => (this.wrapper = ref)} style={customStyleWrapper}>
          {content}
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  show: PropTypes.bool,
  classNameMask: PropTypes.string,
  classNameWrapper: PropTypes.string,
  classNameWrapperShow: PropTypes.string,
  customStyleMask: PropTypes.object,
  customStyleWrapper: PropTypes.object,
  content: PropTypes.any,
  onClose: PropTypes.func,
  onOpen: PropTypes.func
};

Index.defaultProps = {
  show: false,
  classNameMask: '',
  classNameWrapper: '',
  classNameWrapperShow: '',
  customStyleMask: {},
  customStyleWrapper: {},
  content: '',
  onClose: () => {},
  onOpen: () => {}
};

export default Index;
