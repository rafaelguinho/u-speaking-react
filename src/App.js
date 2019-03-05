import React, { Component } from 'react';
import PhraseReader from './PhraseReader';
import Similarity from './Similarity';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import db from './db';
import Header from './Header';
import mic from './icons/mic.svg';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);

    this.state = {
      todos: [],
      allPhrases: [],
      currentPhrase: null,
      saidSentenceCorrectly: false,
      saidByTheUser: null,
      praticing: false,
      saidByTheUserStyle: { color: 'rgb(137, 151, 156)' },
      cardStyles: 'card',
      btnPraticeButton: 'round-button btn-pratice'
    };

    this.phraseReader = new PhraseReader(this.state.allPhrases);

  }

  componentWillMount() {
    db.table('phrases')
      .toArray()
      .then((allPhrases) => {
        var randonPhrase = this.selectRandonPhrase(allPhrases);
        this.setState({ allPhrases, currentPhrase: randonPhrase });

      });
  }

  componentDidUpdate() {
    if (this.state.praticing) return;

    this.readCurrentPhase();
  }

  selectRandonPhrase(allPhrases) {
    var phraseIndex = Math.floor((Math.random() * allPhrases.length) + 0);
    return allPhrases[phraseIndex];
  }

  nextPhase() {
    this.setState({
      currentPhrase: this.selectRandonPhrase(this.state.allPhrases),
      saidByTheUser: '', saidSentenceCorrectly: false, praticing: false,
      saidByTheUserStyle: { color: 'rgb(137, 151, 156)' }
    });
  }

  readCurrentPhaseSlowly() {
    this.phraseReader.decreaseSpeechVelocity();
    this.phraseReader.readPhrase(this.state.currentPhrase.content);
  }

  readCurrentPhase() {
    this.phraseReader.normalSpeechVelocity();
    this.phraseReader.readPhrase(this.state.currentPhrase.content);
  }

  praticeCurrentPhase() {
    let that = this;

    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    recognition.start();

    recognition.onaudiostart = function () {
      console.log('Listening...');
      that.setState({ saidByTheUser: '', praticing: true, btnPraticeButton: 'round-button btn-pratice listening-button', saidByTheUserStyle: { color: 'rgb(137, 151, 156)' }, cardStyles: 'card' });
    };

    recognition.onresult = function (event) {

      let appUnderstood = event.results[0][0].transcript;

      var similarity = Similarity.getSimilarity(appUnderstood, that.state.currentPhrase.content);

      if (similarity >= 0.9) {
        that.setState({ saidByTheUser: appUnderstood, saidSentenceCorrectly: true, btnPraticeButton: 'round-button btn-pratice', saidByTheUserStyle: { color: 'rgb(13, 165, 68)' }, cardStyles: 'card' });
        recognition.stop();
      }
      else {
        recognition.stop();
        that.setState({ saidByTheUser: appUnderstood, saidSentenceCorrectly: false, btnPraticeButton: 'round-button btn-pratice', saidByTheUserStyle: { color: '#e84118' }, cardStyles: 'card card-error' });
      }

    }

    recognition.onerror = function (error) {
      that.setState({ btnPraticeButton: 'round-button btn-pratice' });
    };
  }

  handleButtonPress() {
    this.buttonPressTimer = setTimeout(() => this.readCurrentPhaseSlowly(), 1000);
  }

  handleButtonRelease() {
    clearTimeout(this.buttonPressTimer);
  }

  render() {
    return (

      this.state.currentPhrase ? (<div className="App">

      <Header></Header>

        <div className="container">

          <p className="instructions"><strong>Speak</strong> the sentence below</p>

          <div className={this.state.cardStyles}>
            <div className="card-container">

              <div className="card-content">
                <p className="current-phrase" onClick={() => this.readCurrentPhaseSlowly()}>{this.state.currentPhrase.content}</p>
                <p className="said-by-the-user" style={this.state.saidByTheUserStyle}>{this.state.saidByTheUser}</p>
              </div>

              <div className="card-botton">
                <div>
                  <button className={this.state.btnPraticeButton} onClick={() => this.praticeCurrentPhase()} disabled={this.state.saidSentenceCorrectly}>
                    <img src={mic} width="50px" height="50px" />
                  </button>
                </div>



              </div>
              <button className="flat-button next-button" onClick={() => this.nextPhase()} disabled={!this.state.saidSentenceCorrectly}>Next</button>
            </div>
          </div>

          <Link to="/myphrases">Manage phrases</Link>
        </div>

      </div>
      ) : (<div></div>)


    );
  }
}

export default App;
