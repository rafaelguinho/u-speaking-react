class PhraseReader {
    constructor(allPhrases) {
        this.allPhrases = allPhrases;

        this.speechSynthesisUtterance = null;

        var voices = window.speechSynthesis.getVoices();
        this.speechSynthesisUtterance = new SpeechSynthesisUtterance();
        this.speechSynthesisUtterance.voiceURI = 'native';
        this.speechSynthesisUtterance.volume = 1;
        this.speechSynthesisUtterance.rate = 1.1;
        this.speechSynthesisUtterance.pitch = 1;

        this.speechSynthesisUtterance.lang = 'en-US';
    }

    normalSpeechVelocity(){
        this.speechSynthesisUtterance.rate = 1.1;
    }

    decreaseSpeechVelocity(){
        this.speechSynthesisUtterance.rate = 0.5;
    }

    readPhrase(phrase) {
        this.speechSynthesisUtterance.text = phrase;
        window.speechSynthesis.speak(this.speechSynthesisUtterance);
    }
}

export default PhraseReader;