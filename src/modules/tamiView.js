/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import PropTypes from "prop-types";
// import "./tami.scss";

export default class TamiView extends React.Component {
  constructor() {
    super();
    this.moodImg = [
      "tami-norm",
      "51tami",
      "tami-sick",
      "tami-sleep",
      "tami-died",
      "tami-escape"
    ];
  }

  render() {
    return (
      <ul className="tami-list">
        {this.props.list.map(item => (
          <li
            className={`tami ${item.active}`}
            key={item.id}
            onClick={() => {
              this.props.active(item.id);
            }}
          >
            <img
              src={`./img/${this.moodImg[item.mood]}.png`}
              className={item.wisdom === 100 ? "escape" : ""}
              alt="mood"
            />
            <div className="tami-name">{item.name}</div>
            <div className="tami-time">
              {/* {Math.floor(item.lifeTime / 3600)} */}
              {item.lifeTime}
              day
            </div>
            <ul className="indicators">
              <li className="health">{item.health}</li>
              <li className="fullness">{item.fullness}</li>
              <li className="happiness">{item.happiness}</li>
              <li className="wisdom">{item.wisdom}</li>
              <li className="workout">{item.workout}</li>
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}

TamiView.propTypes = {
  list: PropTypes.array
};
