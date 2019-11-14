import React, { Component } from 'react';
import './App.css';
import Home from '@views/home/home'  
class App extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (<div>
      <Home></Home>
    </div>)
  }
}

export default App;
