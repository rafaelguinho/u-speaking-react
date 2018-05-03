import React, { Component } from 'react';
import logo from './logo.svg';
import PhraseReader from './PhraseReader';
import Similarity from './Similarity';
import Listener from './Listener';
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
      currentPhrase: null,
      saidSentenceCorrectly: false
    };

    this.phraseReader = new PhraseReader(this.state.allPhrases);

  }

  componentWillMount() {
    this.setState({ currentPhrase: this.selectRandonPhrase() });
  }

  componentDidMount() {
    this.readCurrentPhase();
  }

  componentDidUpdate() {
    this.setState({ saidSentenceCorrectly: false });
    this.readCurrentPhase();
  }

  selectRandonPhrase() {
    var phraseIndex = Math.floor((Math.random() * this.state.allPhrases.length) + 0);
    return this.state.allPhrases[phraseIndex];
  }

  nextPhase() {
    this.setState({ currentPhrase: this.selectRandonPhrase() });
  }

  readCurrentPhaseSlowly() {
    this.phraseReader.decreaseSpeechVelocity();
    this.phraseReader.readPhrase(this.state.currentPhrase);
  }

  readCurrentPhase() {
    this.phraseReader.normalSpeechVelocity();
    this.phraseReader.readPhrase(this.state.currentPhrase);
  }

  isSimilar(similarity) {
    if (similarity >= 0.9)
      return true;

    return false;
  }

  praticeCurrentPhase() {
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

        return;
      }


      appUnderstood = event.results[0][0].transcript;
      interimResult = '';


      var similarity = Similarity.getSimilarity(appUnderstood, this.state.currentPhrase);

      if (this.isSimilar(similarity)) {
        recognition.stop();
        /*$scope.success = true;
        $scope.determinateValue += 1;*/

        //if ($scope.determinateValue >= 100) $scope.showSimpleToast('You did!');
      }
      else
        //$scope.fail = true;

        recognition.stop();

      //$scope.$apply();
    }

    recognition.onerror = function (error) {
      //$scope.listening = false;
      //$scope.error = true;
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <button onClick={() => this.readCurrentPhase()}>Read</button>
          <button onClick={() => this.readCurrentPhaseSlowly()}>Read slowly</button>

          <p>{this.state.currentPhrase}</p>
          <button onClick={() => this.praticeCurrentPhase()}>Pratice</button>
          <button onClick={() => this.nextPhase()} disabled={!this.state.saidSentenceCorrectly}>Next</button>
        </div>
      </div>
    );
  }
}

export default App;
