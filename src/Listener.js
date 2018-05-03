class Listener {
    static listen() {


        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
         recognition.maxAlternatives = 4;
        recognition.continuous = true;


        return recognition;
    }
}

export default Listener;