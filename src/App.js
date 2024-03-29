import React from "react";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.moodImg = [
      "tami-norm",
      "51tami",
      "tami-sick",
      "tami-sleep",
      "tami-died",
      "tami-escape"
    ];

    this.state = {
      inputName: "",
      name: false,
      health: 0,
      healthBtnState: "",
      fullness: 0,
      fullnessBtnState: "",
      happiness: 0,
      happinessBtnState: "",
      wisdom: 0,
      wisdomBtnState: "",
      workout: 0,
      workoutBtnState: "",
      sleep: false,
      sleepBtnState: "",
      lifeTime: 0,
      mood: 0
    };
    this.lastCureAction = 0;
    this.dayTime = 3600; //1Day === 1 hour rial
  }

  inputChangeHandler = event => {
    const wrong = /[!@#$%^&*(),.?":{}|<>]/g;
    if (!wrong.test(event.target.value)) {
      this.setState({
        inputName: event.target.value
      });
    }
  };

  createTami(e) {
    e.preventDefault();
    this.setState({
      inputName: "",
      name:
        this.state.inputName.length > 0
          ? this.state.inputName.length
          : "Anonymous",
      health: 100,
      healthBtnState: "",
      fullness: 100,
      fullnessBtnState: "",
      happiness: 100,
      happinessBtnState: "",
      wisdom: 0,
      wisdomBtnState: "",
      workout: 0,
      workoutBtnState: "",
      sleep: false,
      sleepBtnState: "",
      killBtnState: "",
      lifeTime: 0,
      mood: 0
    });
    this.lifeTimer();
  }

  lifeTimer() {
    this.timer = setInterval(() => {
      this.setState({
        lifeTime: this.state.lifeTime + 1
      });
      this.feedControl();
      this.moodControl();
      this.happinessControl();
      this.wisdomControl();
      this.healthControl();
      this.workoutControl();
      this.cureControl();
      console.log("heartbeat " + JSON.stringify(this.state));
    }, 1000);
  }

  feedControl(amount, btn = false) {
    let curState = this.state.fullness;
    if (
      this.state.lifeTime % ((this.dayTime * 0.25) / 100) === 0 &&
      !this.state.sleep
    ) {
      curState -= 1;
    }
    if (this.state.lifeTime % (this.dayTime / 100) === 0 && this.state.sleep) {
      curState -= 1;
      console.log("feedControl by sleep");
    }
    if (btn) {
      curState += amount;
    }
    this.setState({ fullness: curState });
  }

  moodControl() {
    if (
      (this.state.fullness >= 30 && this.state.fullness < 50) ||
      (this.state.happiness >= 30 && this.state.happiness < 50) ||
      (this.state.health >= 30 && this.state.health < 50)
    ) {
      this.setState({ mood: 1 });
    } else if (
      this.state.fullness >= 50 &&
      this.state.happiness >= 50 &&
      this.state.health >= 50
    ) {
      this.setState({ mood: 0 });
    } else {
      this.setState({ mood: 2 });
    }
    if (this.state.health <= 0) {
      this.setState({ mood: 4 });
    }
    if (this.state.sleep) {
      this.setState({ mood: 3 });
    }
    if (this.state.wisdom === 100) {
      this.setState({ mood: 5 });
    }
  }

  happinessControl(amount, btn = false) {
    let curState = this.state.happiness;
    if (this.state.lifeTime % (this.dayTime / 100) === 0) {
      if (this.state.sleep) {
        curState += 1;
      } else {
        curState -= 1;
        if (this.state.fullness < 30) {
          curState -= 4;
        }
        if (this.state.health < 50) {
          curState -= 4;
        }
      }
    }
    if (btn) {
      curState += amount;
    }
    this.setState({ happiness: curState });
  }

  healthControl(amount, btn = false) {
    let curState = this.state.health;
    if (
      this.state.fullness <= 0 ||
      this.state.happiness <= 0 ||
      this.state.fullness > 110
    ) {
      curState -= 1;
    }
    if (btn) {
      curState += amount;
    }
    if (this.state.health <= 0) {
      this.setState({
        wisdomBtnState: " disabled",
        healthBtnState: " disabled",
        fullnessBtnState: " disabled",
        happinessBtnState: " disabled",
        workoutBtnState: " disabled",
        sleepBtnState: " disabled"
      });
      clearTimeout(this.timer);
    }
    this.setState({
      health: curState < 100 ? (curState >= 0 ? curState : 0) : 100
    });
  }

  cureControl() {
    if (
      this.lastCureAction === 0 ||
      this.lifeTime - this.lastCureAction > this.dayTime
    ) {
      if (!this.state.sleep) {
        this.setState({ healthBtnState: "" });
      }
    }
  }

  wisdomControl(amount, btn = false) {
    if (
      this.state.fullness >= 100 &&
      this.state.health >= 100 &&
      this.state.happiness >= 100
    ) {
      this.setState({ wisdomBtnState: "" });
      if (btn) {
        this.setState({
          wisdom: (this.state.wisdom += 5),
          happiness: (this.state.happiness -= 20)
        });
      }
    } else {
      this.setState({ wisdomBtnState: " disabled" });
    }
    let toHappy = this.state.happiness - 100;
    let tofullness = this.state.fullness - 100;

    if (this.state.wisdom === 100) {
      console.log("100");
      if (toHappy < 0) {
        this.gameAction();
      }

      if (this.state.workout === 0 || this.state.workout === 50) {
        this.workoutAction();
      }

      if (this.state.health < 100) {
        this.cureAction();
      }

      this.feedControl(tofullness * -1, true);
      this.setState({
        wisdomBtnState: " disabled",
        healthBtnState: " disabled",
        fullnessBtnState: " disabled",
        happinessBtnState: " disabled",
        workoutBtnState: " disabled",
        sleepBtnState: " disabled",
        killBtnState: " disabled"
      });
    } else if (this.state.wisdom >= 75) {
      if (toHappy < 0) {
        this.gameAction();
      }

      if (this.state.workout === 0 || this.state.workout === 50) {
        this.workoutAction();
      }
      if (this.state.health < 100) {
        this.cureAction();
      }
    } else if (this.state.wisdom >= 50) {
      console.log("50");
      if (toHappy < 0) {
        this.gameAction();
      }
      if (this.state.workout === 0 || this.state.workout === 50) {
        this.workoutAction();
      }
    } else {
      if (toHappy < 0) {
        this.gameAction();
      }
    }
  }

  workoutControl(amount, btn = false) {
    let curState = this.state.workout;
    if (this.state.lifeTime % this.dayTime === 0) {
      switch (curState) {
        case 0:
          this.healthControl(-1, true);
          this.happinessControl(5, true);
          break;
        case 50:
          break;
        case 100:
          this.healthControl(1, true);
          this.happinessControl(5, true);
          break;
        default:
          break;
      }
      if (this.state.workout > 100) {
        let owerWorkout = (curState / 50) * -1;
        this.happinessControl(owerWorkout, true);
      }
      curState = 0;
    }
    if (btn) {
      curState += amount;
    }
    this.setState({ workout: curState });
  }

  killTami() {
    this.setState({
      name: false,
      health: 0,
      fullness: 0,
      happiness: 0,
      lifeTime: 0,
      mood: 0
    });
    clearTimeout(this.timer);
  }

  feedAction() {
    if (!this.state.sleep) {
      this.feedControl(30, true);
    }
  }

  gameAction() {
    if (!this.state.sleep) {
      this.happinessControl(20, true);
      this.feedControl(-20, true);
    }
  }

  workoutAction() {
    if (!this.state.sleep) {
      this.workoutControl(50, true);
      this.feedControl(-20, true);
    }
  }

  cureAction() {
    if (this.state.healthBtnState === "" && !this.state.sleep) {
      this.happinessControl(-20, true);
      this.healthControl(20, true);
      this.lastCureAction = this.lifeTime;
      this.setState({ healthBtnState: " disabled" });
      console.log("cure");
    }
  }

  wisdomAction() {
    this.wisdomControl("", true);
  }

  sleepAction() {
    this.setState({});
    if (!this.state.sleep) {
      this.setState({
        sleep: true,
        wisdomBtnState: " disabled",
        healthBtnState: " disabled",
        fullnessBtnState: " disabled",
        happinessBtnState: " disabled",
        workoutBtnState: " disabled",
        sleepBtnState: " sleeping-btn"
      });
    } else {
      this.setState({
        sleep: false,
        wisdomBtnState: "",
        fullnessBtnState: "",
        happinessBtnState: "",
        workoutBtnState: "",
        sleepBtnState: ""
      });
    }
  }

  render() {
    if (!this.state.name) {
      return (
        <div className="welcomeScreen">
          <div className="iconWrap">
            <img src="./img/tami-norm.png" alt="welcome tami" />
          </div>
          <h1>HI,</h1>
          <p>
            Now I’m your new little friend and I need your attention and care.
            First of all choose a name for me:
          </p>
          <input
            type="text"
            placeholder="Funny Bunny"
            name="new-tami"
            onChange={this.inputChangeHandler}
            value={this.state.inputName}
          ></input>
          <button type="submit" onClick={this.createTami.bind(this)}>
            Start to care
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="action-menu">
            {/* <button className="add-new">Add a new friend</button> */}
            <button
              className={"circle-btn feed-btn" + this.state.fullnessBtnState}
              onClick={this.feedAction.bind(this)}
            >
              <span className="hint">Feed</span>
            </button>
            <button
              className={"circle-btn cure-btn" + this.state.healthBtnState}
              onClick={this.cureAction.bind(this)}
            >
              <span className="hint">Cure</span>
            </button>
            <button
              className={"circle-btn fun-btn" + this.state.happinessBtnState}
              onClick={this.gameAction.bind(this)}
            >
              <span className="hint">Joy</span>
            </button>
            <button
              className={"circle-btn teach-btn" + this.state.wisdomBtnState}
              onClick={this.wisdomAction.bind(this)}
            >
              <span className="hint">Teach</span>
            </button>
            <button
              className={"circle-btn walk-btn" + this.state.workoutBtnState}
              onClick={this.workoutAction.bind(this)}
            >
              <span className="hint">Workout</span>
            </button>
            <button
              className={"circle-btn sleep-btn" + this.state.sleepBtnState}
              onClick={this.sleepAction.bind(this)}
            >
              <span className="hint">Sleep</span>
            </button>
            <button
              className={"circle-btn kill-btn" + this.state.killBtnState}
              onClick={this.killTami.bind(this)}
            >
              <span className="hint">Kill</span>
            </button>
          </div>
          <ul className="tami-list">
            <li className={`tami ${this.state.active}`} key="{this.props.key}">
              <img
                src={`./img/${this.moodImg[this.state.mood]}.png`}
                className={this.state.wisdom === 100 ? "escape" : ""}
                alt="tami mood"
              />
              <div className="tami-name">{this.state.name}</div>
              <div className="tami-time">
                {Math.floor(this.state.lifeTime / 3600)} day
              </div>
              <ul className="indicators">
                <li className="health">{this.state.health}</li>
                <li className="fullness">{this.state.fullness}</li>
                <li className="happiness">{this.state.happiness}</li>
                <li className="wisdom">{this.state.wisdom}</li>
                <li className="workout">{this.state.workout}</li>
              </ul>
            </li>
          </ul>
        </div>
      );
    }
  }
}

export default App;
