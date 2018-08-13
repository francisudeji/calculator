import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: 0,
      isEqualToClicked: false,
      isWaitingForOperand: false,
      operator: null,
      prevValue: null,
      nextValue: null
    };
  }

  plusMinus = () => {
    const { displayValue } = this.state;
    if (displayValue === "") return false;

    if (displayValue.indexOf("-") === -1) {
      this.setState({
        displayValue: `-${displayValue}`
      });
    } else {
      this.setState({
        displayValue: displayValue.substr(1, displayValue.length)
      });
    }
  };

  clear = () => {
    this.setState({
      displayValue: 0,
      isEqualToClicked: false,
      isWaitingForOperand: false,
      operator: null,
      prevValue: null,
      nextValue: null
    });
  };

  displayChange = e => {
    this.setState({ displayValue: e.target.value });
  };

  punch = digit => {
    const { displayValue, isWaitingForOperand } = this.state;

    if (isWaitingForOperand) {
      this.setState({
        prevValue: displayValue,
        displayValue: digit,
        isWaitingForOperand: false
      });
    }
    if (!isWaitingForOperand) {
      this.setState({
        displayValue: `${displayValue}${digit}`
      });
    }

    if (displayValue.toString().charAt(0) === "0") {
      this.setState({
        displayValue: displayValue + digit
      });
    }
  };

  percent = () => {
    const { displayValue } = this.state;
    if (parseFloat(displayValue) !== null) {
      const percentage = displayValue / 100;
      this.setState({ displayValue: String(percentage) });
    }
  };

  dot = dot => {
    const { displayValue } = this.state;

    if (displayValue.toString().indexOf(".") !== -1) {
      return;
    }

    this.setState({ displayValue: `${displayValue}${dot}` });
  };

  operation = operator => {
    this.setState({
      operator,
      isWaitingForOperand: true
    });
  };

  compute = () => {
    let answer = null;

    if (this.state.operator === null || this.state.prevValue === null)
      return false;

    const { displayValue, operator, prevValue } = this.state;
    let nextValue = displayValue;

    switch (operator) {
      case "*":
        answer = parseFloat(prevValue) * parseFloat(nextValue);
        // console.log(answer);
        break;
      case "-":
        answer = parseFloat(prevValue) - parseFloat(nextValue);
        // console.log(answer);
        break;
      case "+":
        answer = parseFloat(prevValue) + parseFloat(nextValue);
        // console.log(answer);
        break;
      case "/":
        answer = parseFloat(prevValue) / parseFloat(nextValue);
        // console.log(answer);
        break;
      default:
        return;
    }

    this.setState({
      displayValue: String(answer),
      isEqualToClicked: true,
      prevValue: 0
    });
  };

  render() {
    return (
      <div className="calculator">
        <div className="display">
          <input
            type="text"
            value={this.state.displayValue}
            onChange={this.displayChange}
            readOnly
          />
        </div>
        <div className="keys">
          <div className="row">
            <button onClick={() => this.clear()}>C</button>
            <button onClick={() => this.plusMinus()}>+/-</button>
            <button onClick={() => this.percent()}>%</button>
            <button onClick={() => this.operation("/")}>/</button>
          </div>
          <div className="row">
            <button onClick={() => this.punch(7)}>7</button>
            <button onClick={() => this.punch(8)}>8</button>
            <button onClick={() => this.punch(9)}>9</button>
            <button onClick={() => this.operation("*")}>x</button>
          </div>
          <div className="row">
            <button onClick={() => this.punch(4)}>4</button>
            <button onClick={() => this.punch(5)}>5</button>
            <button onClick={() => this.punch(6)}>6</button>
            <button onClick={() => this.operation("-")}>-</button>
          </div>
          <div className="row">
            <button onClick={() => this.punch(1)}>1</button>
            <button onClick={() => this.punch(2)}>2</button>
            <button onClick={() => this.punch(3)}>3</button>
            <button onClick={() => this.operation("+")}>+</button>
          </div>
          <div className="row">
            <button className="zero" onClick={() => this.punch(0)}>
              0
            </button>
            <button onClick={() => this.dot(".")}>.</button>
            <button onClick={() => this.compute()}>=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
