import React, { Component } from 'react';
import logo from './logo.svg';
import PhraseReader from './PhraseReader';
import Similarity from './Similarity';
import Listener from './Listener';
import './App.css';
import db from './db';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);

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
    this.setState({ currentPhrase: this.selectRandonPhrase() });
  }

  componentDidMount() {

    //   db.on("populate", function () {
    //     db.phrases.add({ content: "What airline am I flying?", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "Where is the restroom?", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "How much does the magazine cost?", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "May I purchase headphones?", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "How do I access the Internet?", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "Where can I find a restaurant?", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "I have lost my passport.", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "Someone stole my money.", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "Where is the hospital?", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "Where can I find a grocery store?", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "My room is messy, and I would like it cleaned.", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "I would like two double beds, please.", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "How many beds are in the room?", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "Do you know where this hotel is?", lastPratice: null, quantityOfPratices: 0 });
    //     db.phrases.add({ content: "Didn't even last a minute", lastPratice: null, quantityOfPratices: 0 });
    // });

    // db.table('phrases')
    //   .toArray()
    //   .then((phrases) => {
    //     //this.setState({ allPhrases });
    //   });

    // let todo = {
    //   title: 'ok',
    //   done: false,
    // };
    // db.table('todos')
    //   .add(todo)
    //   .then((id) => {
    //     const newList = [...this.state.todos, Object.assign({}, todo, { id })];
    //     console.log(newList);
    //   });

    this.readCurrentPhase();
  }

  componentDidUpdate() {

    if (this.state.praticing) return;

    this.readCurrentPhase();
  }

  selectRandonPhrase() {
    var phraseIndex = Math.floor((Math.random() * this.state.allPhrases.length) + 0);
    return this.state.allPhrases[phraseIndex];
  }

  nextPhase() {
    this.setState({ currentPhrase: this.selectRandonPhrase(), saidByTheUser: '', saidSentenceCorrectly: false, praticing: false, saidByTheUserStyle: { color: 'rgb(137, 151, 156)' } });
  }

  readCurrentPhaseSlowly() {
    this.phraseReader.decreaseSpeechVelocity();
    this.phraseReader.readPhrase(this.state.currentPhrase);
  }

  readCurrentPhase() {
    this.phraseReader.normalSpeechVelocity();
    this.phraseReader.readPhrase(this.state.currentPhrase);
  }

  praticeCurrentPhase() {
    let that = this;
    that.setState({ saidByTheUser: '', praticing: true, btnPraticeButton: 'round-button btn-pratice listening-button', saidByTheUserStyle: { color: 'rgb(137, 151, 156)' }, cardStyles: 'card' });

    var recognition = Listener.listen();

    recognition.start();


    recognition.onstart = function () {
      console.log('Listening...');
    };

    var two_line = /\n\n/g;
    var one_line = /\n/g;
    function linebreak(s) {
      return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }


    recognition.onresult = function (event) {


      var isFinalResult = event.results[0].isFinal;

      let interimResult = '';
      let appUnderstood = '';

      if (!isFinalResult) {

        for (var i = event.resultIndex; i < event.results.length; ++i) {
          interimResult += event.results[i][0].transcript;
        }

        that.setState({ saidByTheUser: interimResult });

        return;
      }


      appUnderstood = event.results[0][0].transcript;
      interimResult = '';


      var similarity = Similarity.getSimilarity(appUnderstood, that.state.currentPhrase);

      if (similarity >= 0.9) {
        that.setState({ saidSentenceCorrectly: true, btnPraticeButton: 'round-button btn-pratice', saidByTheUserStyle: { color: 'rgb(13, 165, 68)' }, cardStyles: 'card' });
        recognition.stop();
      }
      else {
        recognition.stop();
        that.setState({ saidSentenceCorrectly: false, btnPraticeButton: 'round-button btn-pratice', saidByTheUserStyle: { color: '#e84118' }, cardStyles: 'card card-error' });
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
      <div className="App">
         {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <div className="container">
          <progress value="50" max="100"></progress>

        <p className="instructions"><strong>Speak</strong> this sentence</p>

          <div className={this.state.cardStyles}>
            <div className="card-container">

              <div className="card-content">
                <p className="current-phrase" onClick={() => this.readCurrentPhaseSlowly()}>{this.state.currentPhrase}</p>
                <p className="said-by-the-user" style={this.state.saidByTheUserStyle}>{this.state.saidByTheUser}</p>
              </div>

              <div className="card-botton">
                <div>
                  <button className={this.state.btnPraticeButton} onClick={() => this.praticeCurrentPhase()} disabled={this.state.saidSentenceCorrectly}>
                    <img src="icons/mic.svg" width="50px" height="50px" />
                  </button>
                </div>



              </div>
              <button className="flat-button next-button" onClick={() => this.nextPhase()} disabled={!this.state.saidSentenceCorrectly}>Next</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
