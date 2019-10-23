import React from 'react';
import './tami.scss';

export default class Tami extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          active: "active", 
          id: props.id,
          name: props.dataProps.name,
          lifeTime: props.dataProps.lifeTime,
          health: props.dataProps.health,
          fullness: props.dataProps.fullness,
          happiness: props.dataProps.happiness,
          mood: props.dataProps.mood, 
      }
      this.moodImg = ["tami-norm","tami-sick","tami-sleep","tami-died"]
    }  
    // componentDidMount(){
    //     this.lifeTimer();   
    // }
      
    // lifeTimer() {
    //     this.timer = setInterval(() =>{
    //       this.setState({
    //         lifeTime: this.state.lifeTime + 1
    //       })
    //       this.feedControl();
    //       this.happinessControl();
    //       this.moodControl();
    //       console.log("this.state.mood" + this.state.mood 
    //       + "\n this.state.lifeTime"+ this.state.lifeTime / 3600 
    //       +"\n this.state.happiness" + this.state.happiness 
    //       +"\n this.state.fullness" + this.state.fullness 
    //       +"\n this.state.health" +this.state.health 
    //       +"\n ---------------------------------------------------------"
    //       );
          
    //     }, 1000 )
    // }
    componentWillUnmount(){
        clearTimeout(this.timer);
    }
    kill() {

    }
    feedControl() {
        if(this.state.lifeTime % 60 === 0){
            this.setState({fullness: this.state.fullness -1 });
        }
    }
    happinessControl(){
        if(this.state.lifeTime % 60 === 0){
            this.setState({happiness: this.state.happiness -1 });
        }
        if(this.state.fullness <  30){
            this.setState({happiness: this.state.happiness -3 });
        }
    }
    moodControl() {
        if(this.state.fullness <  30 || this.state.fullness < 30 || this.state.health <30){
            this.setState({mood: 1 });
        }
    }

    render() {
        return (
            <li className = {`tami ${this.state.active}`} key='{this.props.key}' onClick={() => this.isActive()}>
                <img src={`./img/${this.moodImg[this.state.mood]}.png`}></img>
                <div className="tami-name">{this.state.name}</div>
                <div className="tami-time">{Math.floor(this.state.lifeTime / 3600)} day</div>
                <ul className="indicators">
                    <li className="health">{this.state.health}</li>
                    <li className="fullness">{this.state.fullness}</li>
                    <li className="happiness">{this.state.happiness}</li>
                </ul>
            </li>
        )
    }
}