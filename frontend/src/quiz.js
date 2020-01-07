import React, { Component } from 'react';
import Data from './data';
import Answers from './Answers';
import Popup from './Popup'
import { Route, NavLink,HashRouter } from 'react-router-dom';
import './quiz.css'

var shuffle = array => {
   for(var i = array.length - 1 ; i > 0 ; i--){
       var j = Math.floor(Math.random()*(i+1));
       var temp = array[i];
       array[i] = array[j];
       array[j] = temp;
   }    
   return array;
}
var data = shuffle(Data);

class quiz extends Component{

    constructor(props) {
        super(props);
        this.state = {
            nr: 0,
            total: data.length,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex'
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);

        this.answerElement = React.createRef();
    }

    pushData(nr) {
        this.setState({
            question: data[nr].question,
            answers: [data[nr].answers[0], data[nr].answers[1], data[nr].answers[2], data[nr].answers[3] ],
            correct: data[nr].correct,
            nr: this.state.nr + 1
        });
    }

    componentWillMount() {
        let { nr } = this.state;
        this.pushData(nr);
    }

    nextQuestion() {
        let { nr, total, score } = this.state;

        if(nr === total){
            this.setState({
                displayPopup: 'flex'
            });
        } else {
            this.answerElement.current.handleClassNames();
            this.pushData(nr);
            this.setState({
                showButton: false,
                questionAnswered: false
            });
        }

    }

    handleShowButton() {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
            nr: 1
        });
    }

    handleIncreaseScore() {
        this.setState({
            score: this.state.score + 1
        });
    }

    render() {
        let { nr, total, question, answers, correct, showButton, questionAnswered, displayPopup, score} = this.state;
        
        if(localStorage.getItem(localStorage.getItem("code")+"quiz") != "true"){
        return (
            <div>

                <Popup style={{display: displayPopup}} score={score} total={total} startQuiz={this.handleStartQuiz}/>

                <div>
                    <div className="quizWrap">
                        <div id="question">
                            <h4>Question {nr}/{total}</h4>
                            <p>{question}</p>
                        </div>
                        <Answers ref={this.answerElement} answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}/>
                        <div id="submit">
                            {showButton ? <button className="fancy-btn" onClick={this.nextQuestion} >{nr===total ? 'Finish quiz' : 'Next question'}</button> : null}
                        </div>
                    </div>
                </div>
                
            </div>
        );
        }
        else{
            return(
                <div></div>
            )
        }
    }

}

export default quiz;