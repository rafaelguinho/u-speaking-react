import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Phrases from './MyPhrases';
import registerServiceWorker from './registerServiceWorker';


const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/myphrases" component={Phrases} />
      </div>
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))

registerServiceWorker();
