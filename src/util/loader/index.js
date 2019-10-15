import React, { Component } from 'react';
import { Container, Header, Content, Spinner } from 'native-base';
export default class Loader extends Component {

  constructor(props) {
    super(props);
    this.abcd = this.abc.bind(this);
   }
    abcd(){
      alert('Hello World');
    }


  static abc(show) {
    debugger
    return (
      <View>
        <Modal visible={state.show}>
          <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
      </View>
    );
    /* this.state.show = show;
    alert("Hello World");*/
  }

  render() {
    return (
      <View>
        <Modal visible={state.show}>
          <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
      </View>
    );
  }
}