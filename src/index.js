import React from 'react';
import PropTypes from 'prop-types';

export default class Slider3d extends React.Component {

  static propTypes = {
    children: PropTypes.array.isRequired,
    width: PropTypes.any,
    height: PropTypes.any,
    defaultPage: PropTypes.number,
    autoPlay: PropTypes.number,
    speed: PropTypes.number,
    onWillChange: PropTypes.func,
  };

  static defaultProps = {
    defaultPage: 0,
    width: 200,
    height: 200,
    autoPlay: 0,
    speed: 1000,
    onWillChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      positive: props.defaultPage,
    };
    this.pageNum = props.children.length;
    this.rotation = 360 / props.children.length;
  }

  componentDidMount() {
    this.autoPlay();
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }

  autoPlay() {
    const { autoPlay, speed } = this.props;
    if (this.timer) clearTimeout(this.timer);
    if (autoPlay) {
      const timeout = autoPlay < speed ? speed : autoPlay;
      this.timer = setTimeout(() => {
        this.switchPage('next');
        this.autoPlay();
      }, timeout);
    }
  }

  get scaleTranslateZ() {
    let scaleTranslateZObj = {
      3: 0.2875,
      4: 0.5,
      5: 0.6875,
      6: 0.8675,
      7: 1.0375,
      8: 1.205,
    };
    return scaleTranslateZObj[this.pageNum];
  }

  get scale() {
    // todo 展示的页面会放大，出了四边形，其他的缩小比还未计算
    let scaleObj = {
      // 3: 0.2875,
      4: 0.74,
      // 5: 0.6875,
      // 6: 0.8675,
      // 7: 1.0375,
      // 8: 1.205,
    };
    return scaleObj[this.pageNum];
  }

  /**
   *
   * @param direction {'prev' | 'next'}
   */
  switchPage(direction) {
    const { positive } = this.state;
    let nextChangePositive = positive;

    if (direction === 'prev') {
      nextChangePositive = positive - 1;
      this.setState({
        positive: nextChangePositive
      });
    }

    if (direction === 'next') {
      nextChangePositive = positive + 1;
      this.setState({
        positive: nextChangePositive
      });
    }

    let nextPageIndex = nextChangePositive < 0 ?
      nextChangePositive % this.pageNum + 4 :
      nextChangePositive % this.pageNum;

    if (nextPageIndex === 4) nextPageIndex = 0;

    this.props.onWillChange(nextPageIndex);
    this.autoPlay();
  }

  render() {
    const {width, height, children, speed} = this.props;
    const { rotation } = this;
    const { positive } = this.state;

    const boxProps = {
      className: 'slider3d-layout',
      style: {
        width, height,
        transform: `scale(${this.scale})`
      },
    };

    let translateZ = width * this.scaleTranslateZ;


    return (
      <div {...boxProps}>
        <div
          className="slider3d-itemBox"
          style={{
            width, height,
            transform: `rotateY(${-positive * rotation}deg)`,
            transition: `transform ${speed}ms linear`,
          }}
        >
          {
            children.map((item, index) => {
              const props = {
                className: 'slider3d-item',
                key: `slider3d_page${index}`,
                style: {
                  width,
                  height,
                  transform: `rotateY(${index * rotation}deg) translateZ(${translateZ}px)`,
                }
              };
              return (
                <div {...props}>{item}</div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
