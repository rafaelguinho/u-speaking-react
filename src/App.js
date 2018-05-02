import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allPhrases: ["What airline am I flying?",
        "Where is the restroom?",
        "How much does the magazine cost?",
        "May I purchase headphones?",
        "How do I access the Internet?",
        "Where can I find a restaurant?",
        "I have lost my passport.",
        "Someone stole my money.",
        "Where is the hospital?",
        "Where can I find a grocery store?",
        "My room is messy, and I would like it cleaned.",
        "I would like two double beds, please.",
        "How many beds are in the room?",
        "Do you know where this hotel is?",
        "Didn't even last a minute"
      ],
      currentPhrase: null
    };

    this.speechSynthesisUtterance = null;

    var voices = window.speechSynthesis.getVoices();
    this.speechSynthesisUtterance = new SpeechSynthesisUtterance();
    this.speechSynthesisUtterance.voiceURI = 'native';
    this.speechSynthesisUtterance.volume = 1;
    this.speechSynthesisUtterance.rate = 1.1;
    this.speechSynthesisUtterance.pitch = 1;

    this.speechSynthesisUtterance.lang = 'en-US';

  }

  componentWillMount(){
    this.setState({ currentPhrase: this.selectRandonPhrase() });
  }

  componentDidMount() {
    this.readCurrentPhase();
  }

  componentDidUpdate(){
    this.readCurrentPhase();
  }

  selectRandonPhrase() {
    var phraseIndex = Math.floor((Math.random() * this.state.allPhrases.length) + 0);
    return this.state.allPhrases[phraseIndex];
  }

  nextPhase() {
    this.setState({ currentPhrase: this.selectRandonPhrase() });
  }

  readCurrentPhaseSlowly(){
    this.speechSynthesisUtterance.rate = 0.6;
    this.readCurrentPhase();
  }

  readCurrentPhase(){
    this.speechSynthesisUtterance.rate = 1.1;
    this.readPhrase(this.state.currentPhrase);
  }

  readPhrase(phrase) {
    this.speechSynthesisUtterance.text = phrase;
    window.speechSynthesis.speak(this.speechSynthesisUtterance);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <p>{this.state.currentPhrase}</p>
          <button onClick={() => this.readCurrentPhase()}>Read</button>
          <button onClick={() => this.readCurrentPhaseSlowly()}>Read slowly</button>
          <button onClick={() => this.nextPhase()}>Next</button>
        </p>
      </div>
    );
  }
}

export default App;
