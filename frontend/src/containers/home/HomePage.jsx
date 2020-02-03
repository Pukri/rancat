import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import _ from 'lodash';

import { getCat } from '../../actions/content';
import TouchButton from '../../components/TouchButton';

class HomePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    cat: PropTypes.shape({
      Path: PropTypes.string
    }),
    error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  constructor() {
    super();
    this.state = {
      catImageSrc: null,
      imageHash: Date.now(),
      time: new Date().toLocaleString(),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCat());
    this.interval = setInterval(() => this.setState({ time: new Date().toLocaleString() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getNewCat = () => {
    const { dispatch } = this.props;
    dispatch(getCat());
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps);
    if(nextProps.cat) {
      this.setState({
        catImageSrc: `${process.env.ENDPOINT}${nextProps.cat.Path}`,
        imageHash: Date.now(),
      });
    }
  }

  render() {
    const { error, loading } = this.props;
    const { catImageSrc, imageHash, time } = this.state; 

    return (
      <div className="main-wrapper">
        <h1>Random cat picture</h1>
        {error == '' ? (
          <div>
            <div style={{padding: '20px'}}>
              <TouchButton
                  className="styled-button"
                  clickwait={500}
                  onClick={() => this.getNewCat()}
                  value={loading ? 'Loading...' : 'Refresh'}
              />
            </div>
            {catImageSrc && 
              <img src={`${catImageSrc}?${imageHash}`} alt='cat' style={{opacity: loading ? '0.6' : '1'}} />
            }
          </div>
          ) : (
            <p>
              <b>Error while loading new random cat </b>
              {error}
            </p>
          )
        }
        <div className="footer">
          {time}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  cat: state.content.cat,
  loading: state.content.loading,
  error: state.content.error,
});

export default connect(mapStateToProps)(HomePage);

