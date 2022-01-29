import logo from './logo.svg';
import './App.css';
import React from 'react';
import BoundingCurve from './Services/BoundingCurve';
import Chart from 'react-apexcharts'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userTempBalance: 0,
      userActualBlance: 10000,
      userTempTokens: 0,
      userActualtokens: 0,
      mintPrice: 0,
      mintingAmount: 0,
      burningPrice: 0,
      burningAmount: 0,

      series: [{
        name: "Price",
        data: []
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Token Graph',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: [],
        }
      }

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

  mintTokens = () => {
    if (this.state.userActualBlance - this.state.mintPrice >= 0) {
      this.boudningCurve.mintToken(this.state.mintingAmount, this.state.mintPrice);
      this.updateData()
    } else {
      alert("Enough Balance, kindly get some $")
    }
  }

  burnTokens = () => {
    debugger;
    if (this.state.userActualtokens - this.state.burningAmount >= 0) {
      this.boudningCurve.burnToken(this.state.burningAmount);
      this.updateData()
    } else {
      alert("Enough Tokens, kindly get some Token")
    }
  }


  updateMintPrice = (amount) => {
    let mintPrice = this.boudningCurve.getMintPrice(amount);
    this.setState({ mintPrice, mintingAmount: amount })
  }

  updateBurningPrice = (amount) => {
    let burningPrice = this.boudningCurve.getBurnPrice(amount);
    this.setState({ burningPrice, burningAmount: amount })
  }

  updateData = () => {
    this.showBlanace();
    //let chartData = this.state.chartData;

    let options = this.state.options;
    let series = this.state.series;

    let newCategories = options.xaxis.categories.push(options.xaxis.categories.length);

    let mintPrice = this.boudningCurve.getMintPrice(1);

    series[0].data.push(mintPrice)

    this.setState({ series, options: { ...this.state.options, xaxis: { categories: newCategories } } })
  }

  render() {
    return (
      <div className="App">
        <p>
          <label>User Balance : </label>
          <input type="text" value={this.state.userTempBalance} onChange={(e) => this.setState({ userTempBalance: e.target.value })} />
          <input type="button" value={"Add USD"} onClick={this.setUserBalance} />
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
          <label>Mint Tokens : </label>
          <input type="text" value={this.state.mintingAmount} onChange={(e) => this.updateMintPrice(e.target.value)} />
          &nbsp; &nbsp;
          <label>You will pay: ${this.state.mintPrice}</label>
          <input type="button" value={"Mint"} onClick={this.mintTokens} />
        </p>

        <p>
          <label>Burn Tokens : </label>
          <input type="text" value={this.state.burningAmount} onChange={(e) => this.updateBurningPrice(e.target.value)} />
          &nbsp; &nbsp;
          <label>You will get: ${this.state.burningPrice}</label>
          <input type="button" value={"Burn"} onClick={this.burnTokens} />
        </p>

        <Chart options={this.state.options} series={this.state.series} type="line" height={350} />

      </div>
    );
  }
}

export default App;
