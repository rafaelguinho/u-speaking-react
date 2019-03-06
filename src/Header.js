import React, { Component } from 'react';
import './Header.css';
import logo from './logo.png';
import back from './icons/back.svg';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      backPath: props.backPath
    };
  }

  render() {
    return (<header>
      <div className="header-container">
        <div className="logo">

          {
            this.state.backPath != null ?

              <Link to={this.state.backPath}>
                <button className="icon-btn"><img src={back}></img></button>
              </Link>
              : <span></span>
          }


          <img src={logo} width="45" height="45"></img>
          <span className="logo-about">{this.state.title}</span></div>
        <div className="header-nav"></div>

      </div>
    </header>);
  }
}

export default Header;