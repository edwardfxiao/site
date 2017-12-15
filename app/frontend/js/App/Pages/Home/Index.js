import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { post } from '../../../api/request-utils';
import { setPortfolioType, setSlideModalContentName } from '../../../actions/home.js';

import APP_STYLES from '../../../../css/app.css';
import STYLES from '../../../../css/home.css';

import { fabric } from 'fabric';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { src: '' };
    this.submit = this.submit.bind(this);
    this.previewFile = this.previewFile.bind(this);
  }

  componentDidMount() {
    this.initCanvas();
  }

  initCanvas() {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.backgroundColor = 'red';
    let canvasHeight = this.canvas.height;
    let canvasWidth = this.canvas.width;
  }

  previewFile() {
    let file = this.file.files[0]; //sames as here
    let reader = new FileReader();

    reader.onloadend = () => {
      // this.setState({ src: reader.result });
      let imgObj = new Image();
      imgObj.src = reader.result;
      imgObj.onload = () => {
        let image = new fabric.Image(imgObj);
        image.set({
          angle: 0,
          padding: 10,
          cornersize: 10,
          height: 110,
          width: 110
        });
        this.canvas.centerObject(image);
        this.canvas.add(image);
        this.canvas.renderAll();
      };
    };

    if (file) {
      reader.readAsDataURL(file); //reads the data as a URL
    } else {
      this.setState({ src: '' });
    }
  }

  submit(e) {
    // const formData = new FormData();
    // formData.append('ee', 1);
    // formData.append('file', this.file.files[0]);
    // post('/api/image', formData, 'multipart/form-data');
    this.setState({
      src: canvas.toDataURL({
        format: 'jpeg'
      })
    });
    e.preventDefault();
  }

  render() {
    const { src } = this.state;
    let imagePreview;
    if (!_.isEmpty(src)) {
      imagePreview = <img src={src} style={{ width: '100%', height: '100%' }} />;
    }
    return (
      <form onSubmit={this.submit}>
        <div className={`${APP_STYLES['route']}`}>
          <div>
            <div style={{ width: '80%', margin: '0 auto' }}>
              <canvas id="canvas" style={{ width: '100%', height: '100%', border: '2px solid black' }} />
            </div>
          </div>
          <div style={{ height: '10px', width: '100%' }} />
          <div>
            <input ref={ref => (this.file = ref)} type="file" onChange={this.previewFile} accept="image/*" style={{ display: 'none' }} />
            <div onClick={() => this.file.click()}>选择图片</div>
          </div>
          <div style={{ height: '10px', width: '100%' }} />
          <div>
            <input type="submit" style={{ display: 'none' }} />
            <div onClick={this.submit}>生成图片</div>
          </div>
          <div style={{ width: '80%', margin: '0 auto' }}>{imagePreview}</div>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ app, home }) {
  return {
    app,
    home
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPortfolioType: val => {
      dispatch(setPortfolioType(val));
    },
    setSlideModalContentName: val => {
      dispatch(setSlideModalContentName(val));
    }
  };
}

Index.contextTypes = {
  router: PropTypes.object
};

Index.propTypes = {
  app: PropTypes.object,
  home: PropTypes.object,
  setPortfolioType: PropTypes.func,
  setSlideModalContentName: PropTypes.func,
  locale: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
