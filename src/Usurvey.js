import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyDmMrc6iQSeLw3pIe7Mjs5T3sZFa1YeHgk",
    authDomain: "usurvey-b78c4.firebaseapp.com",
    databaseURL: "https://usurvey-b78c4.firebaseio.com",
    projectId: "usurvey-b78c4",
    storageBucket: "usurvey-b78c4.appspot.com",
    messagingSenderId: "120498575395"
  };
  firebase.initializeApp(config);

export default class Usurvey extends Component {

		nameSubmit(event){
			var studentName = this.refs.name.value;
			this.setState({studentName: studentName}, function () {
				console.log(this.state)
				// body...
			})
		}

		answerSelected(event){
			var answers = this.state.answers;
			if (event.target.name==='answer1') {
				answers.answer1 = event.target.value;
			} else if (event.target.name==='answer2') {
				answers.answer2 = event.target.value;
			} else if (event.target.name==='answer3') {
				answers.answer3 = event.target.value;
			}


			this.setState({answers:answers},function(){
				console.log(this.state)
			})
		}

		questionSubmit(){
			firebase.database().ref('uSurvey' + this.state.uid).set({
				studentName:this.state.studentName,
				answers:this.state.answers
			})
 			this.setState({isSumitted:true})
		}


		constructor(props){
			super(props);
			this.state = {
				uid:uuid.v1(),
				studentName:'',
				answers:{
					answer1:'',
					answer2:'',
					answer3:''
				},
				isSumitted:false



			};

			this.nameSubmit = this.nameSubmit.bind(this)
			this.answerSelected = this.answerSelected.bind(this)
			this.questionSubmit = this.questionSubmit.bind(this)
		}
	



	render() {
		var studentName;
		var questions;

		if(this.state.studentName === '' && this.state.isSumitted === false){
			studentName = <div>
				<h1>Hey sutdent, tell me your name: </h1>
				<form onSubmit={this.nameSubmit}>
					<input className="nameInput" type="text" placeholder="Enter your name" ref="name"/>
				</form>

			</div>
				questions = ''
		} else if (this.state.studentName !== '' && this.state.isSumitted ===false) {
			studentName =<h1>Welcome to sursevy, {this.state.studentName}</h1>

				questions = <div>
					<h2>Here is some questions:</h2>
					<form onSubmit={this.questionSubmit}>
						<div className="card">
							<label>What kind of course you like the most: </label><br/>
							<input type="radio" name="answer1" value="Tech" onChange={this.answerSelected}/>Tech
							<input type="radio" name="answer1" value="Design" onChange={this.answerSelected}/>Design
							<input type="radio" name="answer1" value="Market" onChange={this.answerSelected}/>Market
						</div>

						<div className="card">
							<label>What color do u like: </label><br/>
							<input type="radio" name="answer2" value="Blue" onChange={this.answerSelected}/>Blue
							<input type="radio" name="answer2" value="White" onChange={this.answerSelected}/>White
							<input type="radio" name="answer2" value="Yellow" onChange={this.answerSelected}/>Yellow
						</div>

						<div className="card">
							<label>What car do u drive: </label><br/>
							<input type="radio" name="answer3" value="BMW" onChange={this.answerSelected}/>BMW
							<input type="radio" name="answer3" value="Benz" onChange={this.answerSelected}/>Benz
							<input type="radio" name="answer3" value="TESLA" onChange={this.answerSelected}/>TESLA
						</div>

						<input className="feedback-button" type="submit" value="submit"/>

					</form>
				</div>
		} else if (this.state.isSumitted === true) {
			studentName = <h1>Thanks, {this.state.studentName}</h1>
		}

		return (
			<div>
				{studentName}
				---------------------------------------------
				{questions}
			</div>
		);
	}
}
