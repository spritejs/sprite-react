# Sprite-React

Render spritejs elements using [React](https://reactjs.org/)

## Example

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {Scene} from 'sprite-react';

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'green'};
  }

  handleClick() {
    this.setState({
      color: 'blue',
    });
  }

  render() {
    return (
      <sprite pos={[100, 100]} bgcolor={this.state.color} size={[50, 50]} onClick={this.handleClick.bind(this)}></sprite>
    );
  }
}


ReactDOM.render(
  <Scene>
    <layer id="fglayer" handleEvent={true}>
      <group>
        <sprite pos={[200, 100]} size={[50, 50]} bgcolor="red" onClick={function () { this.attr('bgcolor', 'blue') } }></sprite>
        <Block/>
      </group>
    </layer>
  </Scene>,
  document.getElementById('app')
);
```