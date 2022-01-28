import logo from './logo.svg';
import './App.css';
import React from 'react';
import BoundingCurve from './Services/BoundingCurve';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userTempBalance: 0,
      userActualBlance: 0,
      userTempTokens: 0,
      userActualtokens: 0,
    }

    this.boudningCurve = new BoundingCurve()
  }


  showBlanace = () => {
    let { userBalance, userTokens } = this.boudningCurve.showUserBalance()
    this.setState({ userActualBlance: userBalance, userActualtokens: userTokens })
  }

  setUserBalance = () => {
    this.boudningCurve.setUserBalance(this.state.userTempBalance)
  }

  purchaseTokens = () => {
    this.boudningCurve.purchaseToken(this.state.userTempTokens)
  }


  render() {
    return (
      <div className="App">
        <p>
          <label>User Balance : </label>
          <input type="text" value={this.state.userTempBalance} onChange={(e) => this.setState({ userTempBalance: e.target.value })} />
          <input type="button" value={"Update Balance"} onClick={this.setUserBalance} />
        </p>

        <p>
          <span>
            <label>User Balance = </label>
            <label>{this.state.userActualBlance}</label>
          </span>
          &nbsp; &nbsp;
          <span>
            <label>User Tokens = </label>
            <label>{this.state.userActualtokens}</label>
          </span>
        </p>

        <p>
          <input type="button" value={"Update Balance"} onClick={this.showBlanace} />
        </p>

        <p>
          <label>Amount ($) : </label>
          <input type="text" value={this.state.userTempTokens} onChange={(e) => this.setState({ userTempTokens: e.target.value })} />
          <input type="button" value={"Purchase"} onClick={this.purchaseTokens} />
        </p>


      </div>
    );
  }
}

export default App;
