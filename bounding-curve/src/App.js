import logo from './logo.svg';
import './App.css';
import React from 'react';
import BoundingCurve from './Services/BoundingCurve';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userBalance: 0,
      userTokens: 0
    }

    this.boudningCurve = new BoundingCurve()
  }


  showBlanace = () => {
    let { userBalance, userTokens } = this.boudningCurve.showUserBalance()

    this.setState({ userBalance, userTokens })
  }


  render() {
    return (
      <div className="App">
        <p>
          <label>User Balance : </label>
          <input type="text" value={this.state.userBalance} onChange={(e) => this.setState({ userBalance: e.target.value })} />
        </p>

        <p>
          <span>
            <label>User Balance = </label>
            <label>{this.state.userBalance}</label>
          </span>
          &nbsp; &nbsp;
          <span>
            <label>User Tokens = </label>
            <label>{this.state.userTokens}</label>
          </span>
        </p>

        <p>
          <input type="button" value={"Update Balance"} onClick={this.showBlanace} />
        </p>
      </div>
    );
  }
}

export default App;
