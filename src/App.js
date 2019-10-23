import React from 'react';
import './App.scss';
import Tami from './modules/tami'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      inputName: '',
      tami: {id: 1, name: "dfdfdfd", health: 100, fullness: 100,happiness: 100, lifeTime: 1000, mood: 0},

      // allTami: [
      //    {id: 1, name: "dfdfdfd", health: 100, fullness: 100,happiness: 100, , mood: 0},
      //   // {name: "Qiqi", health: 99, fullness: 80,happiness: 100, lifeTime: 1000, mood: 1},
      //   // {name: "MimiMimiMimiMimiMimi", health: 50, fullness: 60,happiness: 101, lifeTime: 999, mood: 2},
      //   // {name: "Mimi", health: 50, fullness: 60,happiness: 101, lifeTime: 999, mood: 3},
      //   // {name: "Mimi", health: 50, fullness: 60,happiness: 101, lifeTime: 999, mood: 0},
      //   // {name: "Mimi", health: 50, fullness: 60,happiness: 101, lifeTime: 999, mood: 2},
      // ], 
    };
  }
  inputChangeHandler = (event) => {
    const wrong = /[!@#$%^&*(),.?":{}|<>]/g
    if (!wrong.test(event.target.value)) {
       this.setState({
        inputName: event.target.value,
        }); 
    }
  }
  componentDidMount(){
    if(this.state.tami.name !== " "){
      this.lifeTimer();   
  }
    }
      
  
  createTami(e){
    e.preventDefault();
    this.setState({
      tami: {
        id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
        name: this.state.inputName,
        health: 100, 
        fullness: 100,
        happiness: 100, 
        lifeTime: 3000, 
        mood: 0}
    })
    this.lifeTimer();
  }
  lifeTimer() {
    this.timer = setInterval(() =>{
      let temp =  Object.assign(this.state.tami);
      temp.lifeTime += 1;
      console.log(temp  );
      this.setState({
        tami: temp,
      })
      console.log("hard bit"+this.state.tami);
    }, 1000 )
  }

  killTami(){
    this.setState({
      tami: {},
    })
    clearTimeout(this.timer);
  }

  render() {
    if(Object.entries(this.state.tami).length === 0) {
      return (
        <div className="welcomeScreen">
          <div className="iconWrap">
            <img src="./img/tami-norm.png"></img>
          </div>
          <h1>HI,</h1>
          <p>
          Now I’m your new little friend and I need your attention and care.
                First of all choose a name for me:
          </p>
          <input type="text" placeholder="Funny Bunny" name="new-tami" onChange={this.inputChangeHandler} value={this.state.inputName}></input>
          <button type="submit" onClick={ this.createTami.bind(this)}>Start to care</button>

          </div>
        );
    }
    else{
      return (
        <div>
          <div className="action-menu">
            {/* <button className="add-new">Add a new friend</button> */}
            <button className="circle-btn feed-btn"></button>
            <button className="circle-btn cure-btn"></button>
            <button className="circle-btn fun-btn"></button>
            <button className="circle-btn teach-btn"></button>
            <button className="circle-btn walk-btn"></button>
            <button className="circle-btn sleep-btn"></button>
            <button className="circle-btn kill-btn"  onClick={this.killTami.bind(this)}></button>
          </div>
          <ul className="tami-list">
            <Tami dataProps = {this.state.tami}></Tami>
          </ul>
             
        </div>
        
        );
    }
    
  }
  
}

export default App;
