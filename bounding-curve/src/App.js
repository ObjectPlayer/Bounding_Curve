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

      chartData: {
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

  updateMintPrice = (amount) => {
    let mintPrice = this.boudningCurve.getMintPrice(amount);
    this.setState({ mintPrice, mintingAmount: amount })
  }

  updateData = () => {
    this.showBlanace();
    let tokenPrice = this.getTokenPrice();
    let totalSupply = this.boudningCurve.totalSupply


    let chartData = this.state.chartData;
    // chartData.options.xaxis.categories.push(totalSupply)

    // chartData.series[0].data.push(tokenPrice)

    this.setState({ currentPrice: tokenPrice, chartData })
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
          <label>Mint Token : </label>
          <input type="text" value={this.state.mintingAmount} onChange={(e) => this.updateMintPrice(e.target.value)} />
          <label>You will pay: ${this.state.mintPrice}</label>
          <input type="button" value={"Mint"} onClick={this.mintTokens} />
        </p>


        {/* <Chart options={this.state.chartData.options} series={this.state.chartData.series} type="line" height={350} /> */}

      </div>
    );
  }
}

export default App;
