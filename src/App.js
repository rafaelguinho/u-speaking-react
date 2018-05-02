import React, { Component } from 'react';
import logo from './logo.svg';
import PhraseReader from './PhraseReader';
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

    this.phraseReader = new PhraseReader(this.state.allPhrases);

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
    this.phraseReader.decreaseSpeechVelocity();
    this.phraseReader.readPhrase(this.state.currentPhrase);
  }

  readCurrentPhase(){
    this.phraseReader.normalSpeechVelocity();
    this.phraseReader.readPhrase(this.state.currentPhrase);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <p>{this.state.currentPhrase}</p>
          <button onClick={() => this.readCurrentPhase()}>Read</button>
          <button onClick={() => this.readCurrentPhaseSlowly()}>Read slowly</button>
          <button onClick={() => this.nextPhase()}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
