import './App.css';
import React from 'react';
import BoundingCurve from './Services/BoundingCurve';
import TokenGraph from './Screens/TokenGraph';
import MintingGraph from './Screens/MintingGraph';
import BurningGraph from './Screens/BurningGraph';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      slope: 0.0005,
      maxSupply: 100000000,
      userBalance: 1000000000,
      artistFee: 0.12,
      adminFee: 0.03
    }
  }

  updateBoundingCurveVariables = () => {

  }

  render() {
    return (
      <div className="App">
        <div style={{ marginBottom: 30, borderStyle: "solid", padding: 5 }}>
          <div style={{ marginTop: 20, marginBottom: 10 }}>
            <span style={{ margin: 10 }}>
              <label>Token Max Supply : </label>
              <input type="number" value={this.state.maxSupply} onChange={(e) => this.setState({ maxSupply: e.target.value })} />
            </span>
            <span style={{ margin: 10 }}>
              <label>Slope : </label>
              <input type="number" step="0.0001" value={this.state.slope} onChange={(e) => this.setState({ slope: e.target.value })} />
            </span>
            <span style={{ margin: 10 }}>
              <label> User Balance ($) : </label>
              <input type="number" value={this.state.userBalance} onChange={(e) => this.setState({ userBalance: e.target.value })} />
            </span>
            <span style={{ margin: 10 }}>
              <label>Artist Fee : </label>
              <input type="number" value={this.state.artistFee} onChange={(e) => this.setState({ artistFee: e.target.value })} />
            </span>
            <span style={{ margin: 10 }}>
              <label>Admin Fee : </label>
              <input type="number" value={this.state.adminFee} onChange={(e) => this.setState({ adminFee: e.target.value })} />
            </span>
          </div>

          <div >
            <input type="button" value={"Update Values"} onChange={this.updateBoundingCurveVariables} />
          </div>

        </div>

        <div>
          <TokenGraph />
        </div>
        <div>
          <div>
            <MintingGraph />
          </div>
          <div>
            <BurningGraph />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
