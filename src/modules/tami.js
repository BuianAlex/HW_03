class Tami {
  constructor(name, id, parentData) {
    this.parentData = parentData;
    this.id = id;
    this.name = name;
    this.health = 100;
    this.fullness = 120;
    this.happiness = 100;
    this.wisdom = 0;
    this.workout = 0;
    this.sleep = false;
    this.mood = 0;
    this.lifeTime = 0;
    this.active = false;
    // this.dayTime = 3600;
  }

  lifeTimer() {
    this.timer = setInterval(() => {
      this.lifeTime += 1;
      const ThisTami = this.parentData.state.tamiList.map(item => {
        if (item.id === this.id) {
          const tempData = item;
          tempData.lifeTime = this.lifeTime;
          tempData.name = this.name;
          tempData.health = this.healthControl();
          tempData.mood = this.moodControl();
          tempData.fullness = this.feedControl();
          tempData.happiness = this.happinessControl();
          tempData.workout = this.workoutControl();
          tempData.wisdom = this.wisdomControl();
          return tempData;
        }
        return item;
      });
      this.parentData.setState({
        tamiList: ThisTami
      });
    }, 1000);
  }

  healthControl(amount, btn = false) {
    if (this.fullness <= 0 || this.happiness <= 0 || this.fullness > 110) {
      this.health -= 1;
    }
    if (btn) {
      this.health += amount;
    }
    if (this.health <= 0) {
      clearTimeout(this.timer);
    }
    if (this.health <= 0) {
      this.health = 0;
    }
    if (this.health > 100) {
      this.health = 100;
    }
    return this.health;
  }

  // control tami icon
  moodControl() {
    if (
      (this.fullness >= 30 && this.fullness < 50) ||
      (this.happiness >= 30 && this.happiness < 50) ||
      (this.health >= 30 && this.health < 50)
    ) {
      this.mood = 1;
    } else if (
      this.fullness >= 50 &&
      this.happiness >= 50 &&
      this.health >= 50
    ) {
      this.mood = 0;
    } else {
      this.mood = 2;
    }
    if (this.health <= 0) {
      this.mood = 4;
    }
    if (this.sleep) {
      this.mood = 3;
    }
    if (this.wisdom === 100) {
      this.mood = 5;
    }
    return this.mood;
  }

  feedControl(amount, btn = false) {
    if (
      this.lifeTime % ((this.parentData.dayTime * 0.25) / 100) === 0 &&
      !this.sleep
    ) {
      this.fullness -= 1;
    }
    if (this.lifeTime % (this.parentData.dayTime / 100) === 0 && this.sleep) {
      this.fullness -= 1;
    }
    if (btn) {
      this.fullness += amount;
    }
    return this.fullness;
  }

  happinessControl(amount, btn = false) {
    if (this.lifeTime % (this.dayTime / 100) === 0) {
      if (this.sleep) {
        this.happiness += 1; // when sleeping
      } else {
        this.happiness -= 1; // when not sleeping
        if (this.fullness < 30) {
          this.happiness -= 4; // energy less 30%
        }
        if (this.health < 50) {
          this.happiness -= 4; // health less 50%
        }
      }
    }
    // if user push button
    if (btn) {
      this.happiness += amount;
    }
    return this.happiness;
  }

  workoutControl(amount, btn = false) {
    // will checked 1 time by day, one action +50%
    if (this.lifeTime % this.parentData.dayTime === 0) {
      switch (this.workout) {
        // hasn't workout action
        case 0:
          this.healthControl(-1, true);
          this.happinessControl(5, true);
          break;
        case 50: // has workout action 1 time
          break;
        case 100: // has workout action 2 time
          this.healthControl(1, true);
          this.happinessControl(5, true);
          break;
        default:
          break;
      }
      // if has too much workout
      if (this.workout > 100) {
        const owerWorkout = (this.workout / 50) * -1;
        this.happinessControl(owerWorkout, true);
      }
      this.workout = 0; // and of day set 0
    }
    if (btn) {
      this.workout += 50;
    }
    return this.workout;
  }

  wisdomControl(btn = false) {
    const toHappy = this.happiness - 100;
    const tofullness = this.fullness - 100;

    if (this.wisdom === 100) {
      if (toHappy < 0) {
        this.gameAction();
      }

      if (this.workout === 0 || this.workout === 50) {
        this.workoutAction();
      }

      if (this.health < 100) {
        this.cureAction();
      }
      this.feedControl(tofullness * -1, true);
    } else if (this.wisdom >= 75) {
      if (toHappy < 0) {
        this.gameAction();
      }

      if (this.workout === 0 || this.workout === 50) {
        this.workoutAction();
      }

      if (this.health < 100) {
        this.cureAction();
      }
    } else if (this.wisdom >= 50) {
      if (toHappy < 0) {
        this.gameAction();
      }
      if (this.workout === 0 || this.workout === 50) {
        this.workoutAction();
      }
    } else if (toHappy < 0) {
      this.gameAction();
    }
    if (btn) {
      this.wisdom += 5;
      this.happiness -= 20;
    }
    return this.wisdom;
  }

  killTami() {
    clearTimeout(this.timer);
  }
}

export default Tami;
