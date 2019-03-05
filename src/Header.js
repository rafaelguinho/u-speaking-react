import React, { Component } from 'react';
import './Header.css';
import logo from './logo.png';

class Header extends Component {
    render() {
        return (<header>
            <div class="header-container">
              <div class="logo"><img src={logo} width="45" height="45"></img> <span className="logo-about">USpeaking</span></div>
              <div class="header-nav"></div>
                
            </div>
          </header>);
    }
}

export default Header;