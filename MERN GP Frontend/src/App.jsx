import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 

///routes
import NavMenu from './Pages/NavMenu';
import Home from './Pages/Home';
import Gallery from './Pages/Gallery';
import UserPage from './components/GalleryManager/index';

import './App.css';

class App extends Component {
  render() {
    return (  
      <Router>
        <div className="container">
          <NavMenu/>
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/user" component={UserPage} />  
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;


