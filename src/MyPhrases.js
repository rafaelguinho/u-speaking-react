import React, { Component } from 'react';
import Header from './Header';
import db from './db';
import './input.css';
import './list.css';

class MyPhrases extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allPhrases: null,
            inputValue: ''
        };

        this.updateInputValue = this.updateInputValue.bind(this);
    }

    componentWillMount() {
        this.getPhrases();
    }

    getPhrases() {
        db.table('phrases')
            .toArray()
            .then((allPhrases) => {
                this.setState({ allPhrases });
            });
    }

    async deletePhrase(phrase) {
        if (!window.confirm(`Do you want to remove "${phrase.content}"?`)) return;

        await db.table('phrases')
            .where({ id: phrase.id })
            .delete();

        this.getPhrases();
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    async saveNewPhrase(value) {

        if (!window.confirm(`Do you want to save "${value}"?`)) return;

        await db.table('phrases').add({ content: value, lastPratice: null, quantityOfPratices: 0 });

        this.setState({
            inputValue: ''
        });

        this.getPhrases();
    }

    render() {
        return (
            <div className="App">

                <Header backPath="/" title="Manage phrases"></Header>

                <div className="container">

                    <label for="inp" className="inp">
                        <input type="text" id="inp" placeholder="&nbsp;" value={this.state.inputValue} onChange={this.updateInputValue}>
                            
                        </input>
                    </label>

                    <button className="flat-button" disabled={this.state.inputValue == ''} onClick={() => this.saveNewPhrase(this.state.inputValue)}>New phrase</button>

                    {
                        this.state.allPhrases ? (

                            <ol>
                                {
                                    this.state.allPhrases.map((phrase, k) => {
                                        return (<li key={k} onClick={() => this.deletePhrase(phrase)}>{phrase.content}</li>)
                                    })
                                }
                            </ol>) : (<span></span>)
                    }

                </div>

            </div>
        )
    }
}

export default MyPhrases;