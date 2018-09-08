### 1. install
npm install wj-slider3d

### 2. import
import Slider3d from 'wj-slider3d'

### 3. props

 props | type | isRequired | default | desc 
 ------- | :-------: | :-------: | :-------: | :-------: 
 defaultPage | number | false | 0 | 默认展示页面 
 width | number | false | 200 |
 height | number | false | 200 |
 autoPlay | number | false | 200 | 不自动轮播，该值设置成0
 speed | number | false | 1000 | 轮播速度
 onWillChange | func | false | (nextPage) => {} | 将要切换页面的回调

### 4. 可用方法
#### 切换轮播页
```js
 // direction oneOf(['prev', 'next'])
  Slider3dRef.switchPage(direction);
```


### 5. 示例

```js
import React from 'react';
import PropTypes from 'prop-types';
import Slider3d from 'wj-slider3d';
import 'wj-slider3d/dist/index.css';

export default class Layout extends React.Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const itemStyle = {
      width: '100%',
      height: '100%',
    };
    const props = {
      // defaultPage: 0,
      width: 600,
      height: 400,
      autoPlay: 3000,
      speed: 1000,
      onWillChange: (nextPage) => {
        console.log('nextPage==', nextPage);
      },
    };
    return (
      <div>
        <Slider3d {...props}>
          <div style={{...itemStyle, background: 'red'}}>1</div>
          <div style={{...itemStyle, background: 'green'}}>2</div>
          <div style={{...itemStyle, background: 'red'}}>3</div>
          <div style={{...itemStyle, background: 'blue'}}>4</div>
        </Slider3d>
      </div>
    );
  }
}
```
